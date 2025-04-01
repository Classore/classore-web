import { RiArrowRightSLine } from "@remixicon/react";
import { toast } from "sonner";
import React from "react";

import { setChapter, setModule, useChapterStore } from "@/store/z-store/chapter";
import { QuizAlertModal, TakeQuizModal } from "../modals";
import type { ChapterResp, SingleCourseResp } from "@/types";
import { Button } from "../ui/button";

type CourseActionsProps = {
	canProceed: boolean;
	chapters: SingleCourseResp["chapters"] | undefined;
	hasNextModule: boolean;
	isQuizPassed: boolean;
};

export const CourseActions = React.memo(
	({ canProceed, chapters, isQuizPassed }: CourseActionsProps) => {
		const currentChapter = useChapterStore((state) => state.chapter);
		const currentModule = useChapterStore((state) => state.module);

		const [openQuitQuiz, setOpenQuitQuiz] = React.useState(false);
		const [openTakeQuiz, setOpenTakeQuiz] = React.useState(false);

		const findNextChapter = (chapters: ChapterResp[]): string | undefined => {
			const chapterIndex = chapters.findIndex((chapter) => chapter.id === currentChapter);
			return chapters[chapterIndex + 1]?.id;
		};

		const findNextModule = (chapters: ChapterResp[]): string | undefined => {
			const currentChapterData = chapters.find((chapter) => chapter.id === currentChapter);
			if (!currentChapterData) return undefined;
			const moduleIndex = currentChapterData.modules.findIndex(
				(module) => module.id === currentModule
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
			const currentChapterObj = chapters.find((chapter) => chapter.id === currentChapter);
			if (!currentChapterObj) return;
			if (isQuizPassed) {
				navigateToNextSection();
			} else {
				setOpenQuitQuiz(true);
			}
		}, [chapters, currentChapter, currentModule, isQuizPassed]);

		const handleTakeQuiz = () => setOpenTakeQuiz(true);
		const handleCloseQuitQuiz = () => setOpenQuitQuiz(false);

		return (
			<>
				<div className="flex items-center gap-4">
					<Button
						variant="inverse"
						size="sm"
						className="w-fit py-2"
						disabled={!canProceed}
						onClick={handleTakeQuiz}>
						Take Quiz
					</Button>
					<Button onClick={goToNextLesson} size="sm" className="w-fit text-sm">
						<span>Go to Next Lesson</span>
						<RiArrowRightSLine className="size-4" />
					</Button>
				</div>

				<QuizAlertModal
					open={openQuitQuiz}
					setOpen={handleCloseQuitQuiz}
					setOpenTakeQuiz={setOpenTakeQuiz}
				/>
				{openTakeQuiz && <TakeQuizModal open={openTakeQuiz} setOpen={setOpenTakeQuiz} />}
			</>
		);
	}
);

CourseActions.displayName = "CourseActions";
