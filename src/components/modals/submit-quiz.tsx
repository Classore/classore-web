import { RiArrowRightSLine } from "@remixicon/react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export const QuitQuizModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-48 text-sm">
					<span>Go to Next Chapter</span>
					<RiArrowRightSLine className="size-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex w-[400px] flex-col gap-4">
				<DialogTitle className="text-2xl font-bold">Submit Quiz</DialogTitle>

				<p className="flex w-full flex-col gap-4 rounded-lg bg-neutral-100 p-4 text-sm text-neutral-400 transition-all duration-700">
					Are you sure you want to submit your quiz now? You will not be able to edit after
					submission.
				</p>

				<div className="flex w-full items-center justify-end gap-4 border-t border-t-neutral-200 pt-4">
					<DialogClose asChild>
						<Button className="w-32 text-sm font-medium text-neutral-400" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button className="w-32 text-sm">Submit Quiz</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
