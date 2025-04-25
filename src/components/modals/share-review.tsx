import { createReview } from "@/queries/school";
import type { HttpError } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ErrorMessage, Spinner } from "../shared";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

const ratings = [
	{
		id: 1,
		name: "worse",
		emoji: "😔",
	},
	{
		id: 2,
		name: "bad",
		emoji: "😒",
	},
	{
		id: 3,
		name: "good",
		emoji: "😑",
	},
	{
		id: 4,
		name: "great",
		emoji: "😇",
	},
	{
		id: 5,
		name: "excellent",
		emoji: "🫡",
	},
];

const schema = z.object({
	rating: z.number({
		required_error: "Please select a rating",
	}),
	comment: z.string().min(1, { message: "Please enter your review" }).trim(),
});
type FormData = z.infer<typeof schema>;

export const ShareReview = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const { control, handleSubmit } = useForm<FormData>({
		shouldUnregister: true,
		resolver: zodResolver(schema),
		defaultValues: {
			rating: undefined,
			comment: "",
		},
	});

	const { isPending, mutate } = useMutation({
		mutationFn: createReview,
		mutationKey: ["add-review"],
		onSuccess: () => {
			toast.success("Review submitted successfully!");
			queryClient.invalidateQueries({
				queryKey: ["exam-bundle"],
			});
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

	const onSubmit = (data: FormData) => {
		mutate({
			comment: data.comment,
			rating: data.rating,
			purpose: "EXAM_BUNDLE",
			id: router.query.id as string,
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button type="button" className="text-sm text-secondary-300 underline">
					Write a review
				</button>
			</DialogTrigger>

			<DialogContent className="flex max-w-sm flex-col gap-6">
				<header className="flex flex-col gap-2 text-center">
					<h3 className="text-2xl font-bold">Share Your Feedback </h3>
					<p className="text-pretty text-sm text-neutral-400">
						Your opinion matters! Please take a moment to rate your experience and share any thoughts.
						Your feedback helps us improve and serve you better
					</p>
				</header>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 font-body font-normal">
					<Controller
						name="rating"
						control={control}
						render={({ field: { value, onChange }, fieldState: { error } }) => (
							<div>
								<div className="flex justify-between gap-2 pb-3 pt-6">
									{ratings.map((rating) => (
										<div key={rating.id} className="flex flex-col gap-2">
											<button
												onClick={() => onChange(rating.id)}
												type="button"
												className={`items-center justify-center rounded-full border border-neutral-200 transition-all ${value === rating.id ? "size-[72px] bg-[linear-gradient(180deg,rgba(111,66,193,0.15)_0%,rgba(246,127,54,0.15)_100%)] text-2xl" : "size-[54px] bg-white text-xl"}`}>
												{rating.emoji}
											</button>

											{value === rating.id && (
												<p className="text-center text-xs capitalize text-neutral-400">{rating.name}</p>
											)}
										</div>
									))}
								</div>

								{error ? <ErrorMessage message={error.message} /> : null}
							</div>
						)}
					/>
					<Textarea control={control} name="comment" label="Write a review" />

					<Button type="submit" disabled={isPending}>
						{isPending ? <Spinner /> : "Submit Review"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
