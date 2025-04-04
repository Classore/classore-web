import { RiArrowRightSLine } from "@remixicon/react";
import { toast } from "sonner";
import React from "react";

import { QuizAlertModal, TakeQuizModal } from "../modals";
import type { ChapterResp, SingleCourseResp } from "@/types";
import { Button } from "../ui/button";

type CourseActionsProps = {
	canProceed: (moduleId: string) => boolean;
	chapters: SingleCourseResp["chapters"] | undefined;
	currentChapterId: string;
	currentModuleId: string;
	hasNextModule: boolean;
	isQuizPassed: boolean;
	setChapter: (chapterId: string) => void;
	setModule: (moduleId: string) => void;
};

export const CourseActions = React.memo(
	({
		canProceed,
		chapters,
		currentChapterId,
		currentModuleId,
		isQuizPassed,
		setChapter,
		setModule,
	}: CourseActionsProps) => {
		const [openQuitQuiz, setOpenQuitQuiz] = React.useState(false);
		const [openTakeQuiz, setOpenTakeQuiz] = React.useState(false);

		const canProceedToNextLesson = React.useMemo(() => {
			return canProceed(currentModuleId);
		}, [canProceed, currentModuleId]);

		const findNextChapter = (chapters: ChapterResp[]): string | undefined => {
			const chapterIndex = chapters.findIndex((chapter) => chapter.id === currentChapterId);
			return chapters[chapterIndex + 1]?.id;
		};

		const findNextModule = (chapters: ChapterResp[]): string | undefined => {
			const currentChapterData = chapters.find((chapter) => chapter.id === currentChapterId);
			if (!currentChapterData) return undefined;
			const moduleIndex = currentChapterData.modules.findIndex(
				(module) => module.id === currentModuleId
			);
			return moduleIndex !== -1 ? currentChapterData.modules[moduleIndex + 1]?.id : undefined;
		};

		const navigateToNextSection = () => {
			const nextModuleId = findNextModule(chapters ?? []);
			const nextChapterId = findNextChapter(chapters ?? []);
			if (!nextChapterId && !nextModuleId) {
				toast.error("No next module or chapter found");
				return;
			}
			if (nextModuleId) {
				setModule(nextModuleId);
			} else if (nextChapterId) {
				const firstModuleId =
					chapters?.find((chapter) => chapter.id === nextChapterId)?.modules[0]?.id ?? "";

				setChapter(nextChapterId);
				setModule(firstModuleId);
			}
		};

		const goToNextLesson = React.useCallback(() => {
			if (!chapters) return;
			const currentChapterObj = chapters.find((chapter) => chapter.id === currentChapterId);
			if (!currentChapterObj) return;
			if (isQuizPassed) {
				navigateToNextSection();
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
						disabled={!canProceedToNextLesson}
						onClick={handleTakeQuiz}>
						Take Quiz
					</Button>
					<Button
						onClick={goToNextLesson}
						disabled={!canProceedToNextLesson}
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
