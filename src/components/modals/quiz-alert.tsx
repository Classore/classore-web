import { useGetProfile } from "@/queries/student";
import { RiArrowRightSLine } from "@remixicon/react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export const QuizAlertModal = () => {
	const { data: profile } = useGetProfile();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="text-sm">
					<span>Go to Next Chapter</span>
					<RiArrowRightSLine className="size-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="flex w-[400px] flex-col gap-4">
				<DialogTitle className="text-2xl font-bold">Quiz Alert</DialogTitle>

				<p className="flex w-full flex-col gap-4 rounded-lg bg-neutral-100 p-4 text-sm text-neutral-400 transition-all duration-700">
					Hey {profile?.first_name}, you have to take a quiz after every chapter. Score 70% and
					above to qualify for the next Chapter
				</p>

				<div className="flex w-full items-center justify-end gap-4 border-t border-t-neutral-200 pt-4">
					<DialogClose asChild>
						<Button className="w-32 text-sm font-medium text-neutral-400" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button className="w-32 text-sm">Start Quiz</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
