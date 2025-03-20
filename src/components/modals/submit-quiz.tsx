import { Spinner } from "../shared";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";

type SubmitQuizModalProps = {
	handleSubmission: () => void;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isSubmitting: boolean;
	noOfQuestions: number;
	noOfAnswered: number;
};

export const SubmitQuizModal = ({
	handleSubmission,
	open,
	setOpen,
	isSubmitting,
	noOfQuestions,
	noOfAnswered,
}: SubmitQuizModalProps) => {
	const unansweredCount = noOfQuestions - noOfAnswered;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex w-[400px] flex-col gap-4">
				<DialogTitle className="text-2xl font-bold">Submit Quiz</DialogTitle>

				{unansweredCount > 0 ? (
					<p className="flex w-full flex-col gap-4 rounded-lg bg-neutral-100 p-4 text-sm text-neutral-400 transition-all duration-700">
						You have {unansweredCount} question${unansweredCount > 1 ? "s" : ""} unanswered. Are you sure
						you want to submit now?
					</p>
				) : (
					<p className="flex w-full flex-col gap-4 rounded-lg bg-neutral-100 p-4 text-sm text-neutral-400 transition-all duration-700">
						Are you sure you want to submit your quiz now? You will not be able to edit after submission.
					</p>
				)}

				<div className="flex w-full items-center justify-end gap-4 border-t border-t-neutral-200 pt-4">
					<DialogClose asChild>
						<Button className="w-32 text-sm font-medium text-neutral-400" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button className="w-32 text-sm" disabled={isSubmitting} onClick={handleSubmission}>
						{isSubmitting ? <Spinner /> : "Submit"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
