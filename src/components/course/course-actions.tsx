import { RiArrowRightSLine } from "@remixicon/react";
import React from "react";
import { toast } from "sonner";

import type { SingleCourseResp } from "@/types";
import { QuizAlertModal, TakeQuizModal } from "../modals";
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
	isModuleCompleted?: boolean;
};

export const CourseActions = React.memo(
	({
		currentChapterId,
		currentModuleId,
		currentModuleProgress,
		isQuizPassed,
		onNext,
		hasNextModule,
		isModuleCompleted = false,
	}: CourseActionsProps) => {
		const [openQuitQuiz, setOpenQuitQuiz] = React.useState(false);
		const [openTakeQuiz, setOpenTakeQuiz] = React.useState(false);

		// Check if module meets completion requirements
		const meetsVideoRequirement = currentModuleProgress >= 96;
		const meetsQuizRequirement = isQuizPassed;
		const canAccessQuiz = currentModuleProgress >= 50;
		// Require BOTH 96% video completion AND quiz pass - no bypass for completed modules
		const canProceedToNext = meetsVideoRequirement && meetsQuizRequirement;

		const handleOpenTakeQuiz = React.useCallback(() => {
			if (isQuizPassed) {
				toast.error("You have passed the quiz. Please proceed to the next lesson");
				return;
			}
			if (!canAccessQuiz) {
				toast.error("You must watch at least 50% of the video to unlock the quiz");
				return;
			}
			setOpenTakeQuiz(true);
		}, [isQuizPassed, canAccessQuiz]);

		const goToNextLesson = React.useCallback(() => {
			// Check if user meets the 96% video completion requirement
			if (!meetsVideoRequirement) {
				toast.error("You must watch at least 96% of the video to proceed to the next module");
				return;
			}

			// Check if user has passed the quiz
			if (!meetsQuizRequirement) {
				toast.error("You must pass the module quiz to proceed to the next module");
				return;
			}

			// If all requirements are met, proceed to next module
			onNext();
		}, [currentModuleProgress, isQuizPassed, onNext, meetsVideoRequirement, meetsQuizRequirement]);

		return (
			<>
				<div className="flex items-center gap-4">
					<Button
				variant="inverse"
				size="sm"
				className="w-fit py-2"
				disabled={!isModuleCompleted && !canAccessQuiz}
				onClick={handleOpenTakeQuiz}>
				Take Quiz
			</Button>
				<Button
					onClick={goToNextLesson}
					disabled={!canProceedToNext}
					size="sm"
					className="w-fit text-sm">
					<span>{hasNextModule ? "Go to Next Module" : "Go to Next Chapter"}</span>
					<RiArrowRightSLine className="size-4" />
				</Button>
				</div>

				<QuizAlertModal
					open={openQuitQuiz}
					setOpen={setOpenQuitQuiz}
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
