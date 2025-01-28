import { zodResolver } from "@hookform/resolvers/zod";
import { Lock02 } from "@untitled-ui/icons-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as React from "react";
import { z } from "zod";
import {
	useCreateStudyTimeline,
	useGetExamBundles,
	useGetExams,
	useGetSingleExamBundleQuery,
	useGetSubjects,
} from "@/queries/school";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Select, SelectItem } from "../ui/select";
import { formatCurrency } from "@/lib";
import { Button } from "../ui/button";
import { Spinner } from "../shared";

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
	subject: z
		.string({
			required_error: "Please select an option",
		})
		.min(1, { message: "Please select an option" }),
	// subjects: z
	// 	.string({
	// 		required_error: "Please select at least one subject",
	// 		invalid_type_error: "Please select at least one subject",
	// 	})
	// 	.min(1, { message: "Please select at least one subject" })
	// 	.transform((value) => {
	// 		return value.split(", ")
	// 	}),
});

type FormData = z.infer<typeof schema>;

export const AddMoreCourseModal = () => {
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
			subject: "",
		},
	});

	const bundleSubjects = subjects?.filter(
		(subject) => subject.subject_examination_bundle === router.query.id
	);

	const { isPending, mutate } = useCreateStudyTimeline();
	const onSubmit = (data: FormData) => {
		console.log(data);
		mutate(
			{
				...data,
				subjects: [data.subject],
			},
			{
				onSuccess: (data) => {
					setOpen(true);
					window.open(data.data.payment_link.authorization_url, "_self");
				},
			}
		);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="bg-primary-100 font-medium text-primary-300 hover:bg-primary-200">
					Add More Courses
				</Button>
			</DialogTrigger>

			<DialogContent className="flex w-96 flex-col gap-6">
				<h3 className="text-2xl font-bold">Add New Course</h3>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-6 font-body font-normal">
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

					<Select label="Select prep bundle" control={control} name="subject">
						{bundleSubjects?.map((subject) => (
							<SelectItem key={subject.subject_id} value={subject.subject_id}>
								{subject.subject_name}
							</SelectItem>
						))}
					</Select>

					<div className="flex flex-col gap-1">
						<Button type="submit" disabled={isPending}>
							{isPending ? (
								<Spinner />
							) : (
								`Pay ${formatCurrency(Number(bundle?.extra_charge ?? 0))}`
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
							<p className="leading-tight">
								Please wait while we redirect you to the payment page...
							</p>
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
