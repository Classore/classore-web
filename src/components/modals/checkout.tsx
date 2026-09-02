import { Lock02 } from "@untitled-ui/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";

import { Dialog, DialogContent } from "../ui/dialog";
import { useMiscStore } from "@/store/z-store/misc";
import { Button } from "../ui/button";
import { Spinner } from "../shared";
import {
	useCreateStudyTimeline,
	useGetExamBundles,
	useGetExams,
	useGetSubjects,
} from "@/queries/school";

type CheckoutModalProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CheckoutModal = ({ open, setOpen }: CheckoutModalProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const values = useMiscStore((state) => state.payload);

	const { data: bundles } = useGetExamBundles({});
	const { data: exams } = useGetExams();
	const { data: subjects } = useGetSubjects();

	const exam_type = exams?.find(
		(exam) => exam.examination_id === values.exam_type
	)?.examination_name;

	const prep_bundle = bundles?.data?.find(
		(bundle) => bundle.examinationbundle_id === values.chosen_bundle
	);

	const chosen_subjects =
		subjects
			?.filter((subject) => values?.subjects?.includes(subject.subject_id))
			?.map((subject) => subject.subject_name)
			.join(", ") ?? "";

	const chosen_bundle = prep_bundle?.examinationbundle_name ?? "";

	const { isPending, mutate } = useCreateStudyTimeline();

	const startLearning = () => {
		if (!values) {
			toast.error("Something went wrong, please try again");
			return;
		}

		const subjects =
			typeof values.subjects === "string"
				? String(values.subjects)
					.split(",")
					.map((s) => s.trim())
				: Array.isArray(values.subjects)
					? values.subjects
					: [];

		const payload = {
			...values,
			subjects,
		};

		mutate(payload, {
			onSuccess: () => {
				// Invalidate profile so dashboard reflects the new study plan
				queryClient.invalidateQueries({ queryKey: ["profile"] });
				toast.success("Welcome to Classore! 🎉", {
					description: "Your study plan is ready. Let's start learning!",
				});
				setOpen(false);
				router.push("/dashboard");
			},
			onError: (error) => {
				const errorMessage = Array.isArray(error?.response?.data.message)
					? error?.response?.data.message[0]
					: error?.response?.data.message;
				const message = errorMessage || "Something went wrong!";
				toast.error(message);
			},
		});
	};

	if (typeof window === "undefined") return null;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex w-96 flex-col gap-6">
				<h3 className="text-2xl font-bold">Confirm Your Study Plan</h3>
				<ul className="flex flex-col gap-4">
					<li>
						<p className="text-sm text-neutral-400">Exam type:</p>
						<p className="font-medium capitalize">{exam_type}</p>
					</li>
					<li>
						<p className="text-sm text-neutral-400">Prep bundle (allowed subjects):</p>
						<p className="font-medium capitalize">
							{chosen_bundle} Prep Bundle ({values?.vettings?.[0]?.allowed_subjects} subjects)
						</p>
					</li>
					<li>
						<p className="text-sm text-neutral-400">Chosen Subjects:</p>
						<p className="font-medium capitalize">{chosen_subjects}</p>
					</li>
				</ul>

				<div className="flex flex-col gap-3">
					<Button onClick={startLearning} type="submit" disabled={isPending}>
						{isPending ? <Spinner /> : "Start Learning →"}
					</Button>
					<div className="flex items-center gap-1.5 self-center text-neutral-500">
						<Lock02 width={18} />
						<p className="text-center text-sm">
							You&apos;ll be able to upgrade your plan anytime from the dashboard
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
