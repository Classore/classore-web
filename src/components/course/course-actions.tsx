import { RiArrowRightSLine } from "@remixicon/react";
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
		chapters,
		currentChapterId,
		currentModuleId,
		currentModuleProgress,
		isQuizPassed,
		onNext,
	}: CourseActionsProps) => {
		const [openQuitQuiz, setOpenQuitQuiz] = React.useState(false);
		const [openTakeQuiz, setOpenTakeQuiz] = React.useState(false);

		const goToNextLesson = React.useCallback(() => {
			if (isQuizPassed && currentModuleProgress >= 50) {
				onNext();
			} else {
				setOpenQuitQuiz(true);
			}
		}, [chapters, currentChapterId, isQuizPassed]);

		const handleTakeQuiz = () => setOpenTakeQuiz(true);
		const handleCloseQuitQuiz = () => setOpenQuitQuiz(false);

		return (
			<>
				<div className="flex items-center gap-4">
					<Button
						variant="inverse"
						size="sm"
						className="w-fit py-2"
						disabled={currentModuleProgress < 50}
						onClick={handleTakeQuiz}>
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
					setOpen={handleCloseQuitQuiz}
					setOpenTakeQuiz={setOpenTakeQuiz}
				/>
				{openTakeQuiz && (
					<TakeQuizModal
						currentChapterId={currentChapterId}
						currentModuleId={currentModuleId}
						open={openTakeQuiz}
						setOpen={setOpenTakeQuiz}
					/>
				)}
			</>
		);
	}
);

CourseActions.displayName = "CourseActions";
