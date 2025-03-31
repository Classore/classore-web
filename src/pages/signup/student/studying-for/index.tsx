import { AuthLayout } from "@/components/layouts/auth";
import { Seo, Spinner } from "@/components/shared";

import { StudyingGraphic } from "@/assets/icons";
import { CheckoutModal } from "@/components/modals";
import { SignupStepper } from "@/components/signup-stepper";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select, SelectItem } from "@/components/ui/select";
import { formatCurrency } from "@/lib";
import { useGetExamBundles, useGetExams, useGetSubjects, useVetStudyPack } from "@/queries/school";
import { useMiscStore } from "@/store/z-store/misc";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

const studyingForSchema = z.object({
	exam_type: z
		.string({
			required_error: "Please select an option",
		})
		.min(1, { message: "Please select an option" }),
	chosen_bundle: z
		.string({
			required_error: "Please select an option",
		})
		.min(1, { message: "Please select an option" }),
	subjects: z
		.string({
			required_error: "Please select at least one subject",
			invalid_type_error: "Please select at least one subject",
		})
		.min(1, { message: "Please select at least one subject" })
		.transform((value) => {
			return value.split(", ");
		}),
});

type StudyingForFormValues = z.infer<typeof studyingForSchema>;

const Page = () => {
	const setMiscStore = useMiscStore((state) => state.setMisc);

	const [open, setOpen] = React.useState(false);
	const { control, handleSubmit, resetField } = useForm<StudyingForFormValues>({
		resolver: zodResolver(studyingForSchema),
		defaultValues: {
			exam_type: "",
			chosen_bundle: "",
			subjects: [],
		},
	});

	const form = useWatch({
		control,
	});

	const { data: exams } = useGetExams();
	const { data: bundles } = useGetExamBundles({ examination: form.exam_type });
	const { data: subjects } = useGetSubjects();

	const bundleSubjects = subjects
		?.filter((subject) => subject.subject_examination_bundle === form.chosen_bundle)
		?.map((subject) => ({
			label: subject.subject_name,
			value: subject.subject_id,
		}));

	const maxBundleSubject = React.useMemo(() => {
		if (!form.chosen_bundle) return 0;
		const bundle = bundles?.data.find((b) => b.examinationbundle_id === form.chosen_bundle);
		if (!bundle) return 0;
		return bundle.examinationbundle_max_subjects;
	}, [bundles, form.chosen_bundle]);

	const { isPending, mutate } = useVetStudyPack();
	const onSubmit = (values: StudyingForFormValues) => {
		const payload = [
			{
				chosen_bundle: values.chosen_bundle,
				subject_length: values.subjects.length,
			},
		];
		mutate(
			{ vettings: payload },
			{
				onSuccess: (data) => {
					const payload = {
						...values,
						...data.data,
					};
					setMiscStore(payload);
					setOpen(true);
				},
			}
		);
	};

	React.useEffect(() => {
		// if (form.chosen_bundle) {
		resetField("subjects");
	}, [form.chosen_bundle, form.exam_type, resetField]);

	return (
		<>
			<Seo title="Studying For" />

			<AuthLayout screen="signup">
				<div className="flex max-w-96 flex-col gap-10 lg:gap-20">
					<SignupStepper />
					<div className="flex flex-col gap-6">
						<header className="flex flex-col gap-4">
							<StudyingGraphic />
							<h2 className="font-body text-2xl font-bold text-neutral-900">What are you studying for</h2>
						</header>

						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 font-body font-normal">
							<Select label="I am studying for" control={control} name="exam_type">
								{exams?.map((exam) => (
									<SelectItem key={exam.examination_id} value={exam.examination_id}>
										{exam.examination_name}
									</SelectItem>
								))}
							</Select>

							<Select label="Select prep bundle" control={control} name="chosen_bundle">
								{bundles?.data?.map((bundle) => (
									<SelectItem key={bundle.examinationbundle_id} value={bundle.examinationbundle_id}>
										{bundle.examinationbundle_name} Exam Prep Bundle (
										{formatCurrency(bundle.examinationbundle_amount)})
									</SelectItem>
								))}
							</Select>

							<MultiSelect
								control={control}
								name="subjects"
								label="Select subjects"
								placeholder="Select subjects..."
								options={bundleSubjects ?? []}
								maxSelectable={maxBundleSubject ?? 0}
							/>

							<div className="col-span-full">
								<Button type="submit" disabled={isPending}>
									{isPending ? <Spinner /> : `Continue`}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</AuthLayout>

			<CheckoutModal open={open} setOpen={setOpen} />
		</>
	);
};

export default Page;
