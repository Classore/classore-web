import { Controller, useForm } from "react-hook-form";
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

export const ShareReview = () => {
	const { control } = useForm();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button type="button" className="text-sm text-secondary-300 underline">
					Write a review
				</button>
			</DialogTrigger>

			<DialogContent className="flex max-w-sm flex-col gap-6">
				<header className="flex flex-col gap-2 text-center">
					<h3 className="text-2xl font-bold">Share Your Feedback </h3>
					<p className="text-pretty text-sm text-neutral-400">
						Your opinion matters! Please take a moment to rate your experience and share any
						thoughts. Your feedback helps us improve and serve you better
					</p>
				</header>

				<form className="flex flex-col gap-6 font-body font-normal">
					<Controller
						name="rating"
						control={control}
						render={({ field: { value, onChange } }) => (
							<div>
								<div className="flex justify-between gap-2 pb-3 pt-6">
									{ratings.map((rating) => (
										<div key={rating.id} className="flex flex-col gap-2">
											<button
												onClick={() => onChange(rating.id)}
												type="button"
												className={`items-center justify-center rounded-full border border-neutral-200 ${value === rating.id ? "size-16 text-2xl" : "size-12 text-xl"}`}>
												{rating.emoji}
											</button>
											{/* background: linear-gradient(180deg, rgba(111, 66, 193, 0.15) 0%, rgba(246, 127, 54, 0.15)
											100%); */}
											{value === rating.id && (
												<p className="text-center text-xs capitalize text-neutral-400">
													{rating.name}
												</p>
											)}
										</div>
									))}
								</div>
							</div>
						)}
					/>
					<Textarea control={control} name="bio" label="Write a review" />

					<Button>Submit Review</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};
