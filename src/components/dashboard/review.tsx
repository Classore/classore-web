import { RiCloseLine, RiLoaderLine, RiStarLine } from "@remixicon/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import React from "react";
import * as z from "zod";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useGetExamBundles } from "@/queries/school";
import { IconLabel, RatingInput } from "../shared";
import { Select, SelectItem } from "../ui/select";
import { createReview } from "@/queries/school";
import { useGetExams } from "@/queries/school";
import { Textarea } from "../ui/textarea";
import type { HttpError } from "@/types";
import { Button } from "../ui/button";
import { cn } from "@/lib";

interface Props {
	onOpenChange: (open: boolean) => void;
	isOpen: boolean;
}

const schema = z.object({
	rating: z.number().min(1).max(5),
	comment: z.string().min(1, "Please enter your review comment"),
	examination: z.string(),
	id: z.string().min(1, "Please select an exam bundle"),
	purpose: z.enum(["EXAMINATION", "EXAM_BUNDLE", "COURSE"]),
});

type FormValues = z.infer<typeof schema>;

export const ReviewToast = ({ onOpenChange, isOpen }: Props) => {
	const [open, setOpen] = React.useState(false);

	const { isPending, mutate } = useMutation({
		mutationFn: createReview,
		mutationKey: ["add-review"],
		onSuccess: () => {
			setOpen(false);
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "Something went wrong";
			toast.error(message);
		},
	});

	const { control, handleSubmit, reset, watch } = useForm<FormValues>({
		defaultValues: {
			rating: 0,
			comment: "",
			examination: "",
			id: "",
			purpose: "EXAMINATION",
		},
		resolver: zodResolver(schema),
	});

	const examination = watch("examination");
	const { data: exams } = useGetExams();
	const { data: bundles } = useGetExamBundles({ examination });

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		mutate(data);
	};

	React.useEffect(() => {
		if (!open) {
			reset({
				rating: 0,
				comment: "",
				examination: "",
				id: "",
				purpose: "EXAMINATION",
			});
		}
	}, [open]);

	return (
		<div
			hidden={!isOpen}
			className={cn(
				"fixed bottom-4 right-4 !z-20 max-w-80 space-y-4 rounded-lg border border-neutral-300 bg-white p-4 shadow-2xl transition-all duration-100 hover:scale-105",
				isOpen ? "block" : "hidden"
			)}>
			<div className="flex w-full items-center justify-end">
				<button onClick={() => onOpenChange(false)}>
					<RiCloseLine className="size-4" />
				</button>
			</div>
			<p className="text-sm">
				Hope you are enjoying the app! Please leave a review to help us improve.
			</p>
			<div className="flex w-full items-center justify-end">
				<Dialog onOpenChange={setOpen} open={open}>
					<DialogTrigger asChild>
						<Button className="w-fit text-[10px]" size="sm">
							Add Review
						</Button>
					</DialogTrigger>
					<DialogContent className="space-y-3">
						<IconLabel icon={RiStarLine} />
						<div>
							<DialogTitle>Add Review</DialogTitle>
							<DialogDescription></DialogDescription>
						</div>
						<form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
							<RatingInput max={5} control={control} name="rating" />
							<Textarea control={control} name="comment" label="Comment" />
							<Select control={control} name="examination" className="uppercasd">
								{exams?.map((exam) => (
									<SelectItem key={exam.examination_id} className="uppercase" value={exam.examination_id}>
										{exam.examination_name}
									</SelectItem>
								))}
							</Select>
							<Select control={control} name="id" className="uppercase">
								{bundles?.data.map((bundle) => (
									<SelectItem
										key={bundle.examinationbundle_id}
										className="uppercase"
										value={bundle.examinationbundle_id}>
										{bundle.examinationbundle_name}
									</SelectItem>
								))}
							</Select>
							<Button type="submit">
								{isPending ? <RiLoaderLine className="animate-spin" /> : "submit"}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
