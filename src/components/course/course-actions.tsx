import { RiArrowRightSLine } from "@remixicon/react";
import { toast } from "sonner";
import React from "react";

import { QuizAlertModal, TakeQuizModal } from "../modals";
import type { SingleCourseResp } from "@/types";
import { Button } from "../ui/button";

type CourseActionsProps = {
	chapters: SingleCourseResp["chapters"] | undefined;
	currentChapterId: string;
	currentModuleId: string;
	currentModuleProgress: number;
	hasNextModule: boolean;
	onNext: () => void;
	isQuizPassed: boolean;
	setChapter: (chapterId: string) => void;
	setModule: (moduleId: string) => void;
};

export const CourseActions = React.memo(
	({
		currentChapterId,
		currentModuleId,
		currentModuleProgress,
		isQuizPassed,
		onNext,
	}: CourseActionsProps) => {
		const [openQuitQuiz, setOpenQuitQuiz] = React.useState(false);
		const [openTakeQuiz, setOpenTakeQuiz] = React.useState(false);

		const handleOpenTakeQuiz = React.useCallback(() => {
			if (isQuizPassed) {
				toast.error("You have passed the quiz. Please proceed to the next lesson");
				return;
			}
			setOpenTakeQuiz(true);
		}, [isQuizPassed]);

		const goToNextLesson = React.useCallback(() => {
			if (isQuizPassed && currentModuleProgress >= 50) {
				onNext();
			} else {
				setOpenQuitQuiz(true);
			}
		}, [currentModuleProgress, isQuizPassed, onNext]);

		return (
			<>
				<div className="flex items-center gap-4">
					<Button
						variant="inverse"
						size="sm"
						className="w-fit py-2"
						disabled={currentModuleProgress < 50}
						onClick={handleOpenTakeQuiz}>
						Take Quiz
					</Button>
					<Button
						onClick={goToNextLesson}
						disabled={currentModuleProgress < 50 || !isQuizPassed}
						size="sm"
						className="w-fit text-sm">
						<span>Go to Next Lesson</span>
						<RiArrowRightSLine className="size-4" />
					</Button>
				</div>

				<QuizAlertModal
					open={openQuitQuiz}
					setOpen={setOpenTakeQuiz}
					setOpenTakeQuiz={setOpenTakeQuiz}
				/>
				<TakeQuizModal
					currentChapterId={currentChapterId}
					currentModuleId={currentModuleId}
					open={openTakeQuiz}
					setOpen={setOpenTakeQuiz}
				/>
			</>
		);
	}
);

CourseActions.displayName = "CourseActions";
