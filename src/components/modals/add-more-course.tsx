import {
	useCreateStudyTimeline,
	useGetExamBundles,
	useGetExams,
	useGetSingleExamBundleQuery,
	useGetSubjects,
} from "@/queries/school";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock02 } from "@untitled-ui/icons-react";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { formatCurrency } from "@/lib";
import { Spinner } from "../shared";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { MultiSelect } from "../ui/multi-select";
import { Select, SelectItem } from "../ui/select";

const schema = z.object({
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
	// subject: z
	// 	.string({
	// 		required_error: 'Please select an option',
	// 	})
	// 	.min(1, { message: 'Please select an option' }),
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

type FormData = z.infer<typeof schema>;

type AddCourseModalProps = {
	disabled?: boolean;
	chosenSubjects?: {
		id: string;
		name: string;
	}[];
};

const splitIntoArray = (value: string[] | string) => {
	return typeof value === "string" ? value.split(",").map((s) => s.trim()) : value;
};

export const AddMoreCourseModal = ({ disabled, chosenSubjects }: AddCourseModalProps) => {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);

	const { data: bundle } = useGetSingleExamBundleQuery({
		bundle_id: router.query.id as string,
	});

	const { data: bundles } = useGetExamBundles({});
	const { data: subjects } = useGetSubjects();
	const { data: exams } = useGetExams();

	const { control, handleSubmit } = useForm<FormData>({
		resolver: zodResolver(schema),
		shouldUnregister: true,
		defaultValues: {
			exam_type: bundle?.examination.id ?? "",
			chosen_bundle: (router.query.id as string) ?? "",
			subjects: [],
		},
	});
	const selectedSubjects = useWatch({
		control,
		name: "subjects",
	});
	const selectedSubjectsArray = selectedSubjects ? splitIntoArray(selectedSubjects) : [];

	/**
	 * Memoized array of subjects that belong to the current examination bundle
	 * and are not already chosen by the user.
	 */
	const bundleSubjects = React.useMemo(() => {
		return subjects
			?.filter((subject) => subject.subject_examination_bundle === router.query.id)
			?.filter((subject) => !chosenSubjects?.find((s) => s.id === subject.subject_id))
			.map((sub) => ({
				label: sub.subject_name,
				value: sub.subject_id,
			}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subjects, chosenSubjects]);

	const { isPending, mutate } = useCreateStudyTimeline();
	const onSubmit = (data: FormData) => {
		mutate(data, {
			onSuccess: (data) => {
				setOpen(true);
				window.open(data.data.payment_link.authorization_url, "_self");
			},
		});
	};

	if (!bundle) return;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="bg-primary-100 font-medium text-primary-300 enabled:hover:bg-primary-200"
					disabled={disabled}>
					Add More Courses
				</Button>
			</DialogTrigger>

			<DialogContent className="flex w-96 flex-col gap-6">
				<h3 className="text-2xl font-bold">Add New Course</h3>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 font-body font-normal">
					<Select disabled label="I am studying for" control={control} name="exam_type">
						{exams?.map((exam) => (
							<SelectItem key={exam.examination_id} value={exam.examination_id}>
								{exam.examination_name}
							</SelectItem>
						))}
					</Select>

					<Select disabled label="Select prep bundle" control={control} name="chosen_bundle">
						{bundles?.data.map((bundle) => (
							<SelectItem key={bundle.examinationbundle_id} value={bundle.examinationbundle_id}>
								{bundle.examinationbundle_name} Exam Prep Bundle
							</SelectItem>
						))}
					</Select>

					<MultiSelect
						control={control}
						name="subjects"
						label="Select subjects"
						placeholder="Select subjects..."
						options={bundleSubjects ?? []}
						maxSelectable={bundle?.max_subjects - (chosenSubjects?.length ?? 0)}
					/>

					<div className="flex flex-col gap-1">
						<Button type="submit" disabled={isPending}>
							{isPending ? (
								<Spinner />
							) : (
								`Pay ${formatCurrency(bundle.extra_charge * selectedSubjectsArray.length)}`
							)}
						</Button>
						<div className="flex items-center gap-1.5 self-center text-neutral-500">
							<Lock02 width={18} />
							<p className="text-center text-sm">Payment secured by Paystack</p>
						</div>
					</div>
				</form>

				{open ? (
					<div className="absolute inset-0 z-50 mx-auto grid place-items-center gap-4 rounded-md bg-white/50 p-10 text-center text-sm text-neutral-600 backdrop-blur-sm backdrop-filter">
						<div className="grid place-items-center gap-4 rounded-lg p-10">
							<Spinner variant="primary" size="md" />
							<p className="leading-tight">Please wait while we redirect you to the payment page...</p>
							<p className="text-xs font-bold">
								NB: <br />
								DO NOT CLOSE THIS WINDOW OR REFRESH THE PAGE
							</p>
						</div>
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	);
};
