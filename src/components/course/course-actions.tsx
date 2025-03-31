import { RiArrowRightSLine } from "@remixicon/react";
import * as React from "react";

import { setChapter, setModule, useChapterStore } from "@/store/z-store/chapter";
import { QuizAlertModal, TakeQuizModal } from "../modals";
// import { useGetChapter } from "@/queries/student";
import type { SingleCourseResp } from "@/types";
import { Button } from "../ui/button";

type CourseActionsProps = {
	chapters: SingleCourseResp["chapters"] | undefined;
};

export const CourseActions = ({ chapters }: CourseActionsProps) => {
	const currentChapter = useChapterStore((state) => state.chapter);
	const currentModule = useChapterStore((state) => state.module);

	const [openQuitQuiz, setOpenQuitQuiz] = React.useState(false);
	const [openTakeQuiz, setOpenTakeQuiz] = React.useState(false);

	/**
	 * Checks if any quiz has been passed in the current module. If yes, navigates to next lesson.
	 * If no quiz has been passed, shows a quiz alert sheet.
	 */
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const goToNextLesson = React.useCallback(() => {
		// check if any quiz has been passed in the current module
		const hasPassedQuiz = chapters
			?.find((chapter) => chapter.id === currentChapter)
			?.modules.find((module) => module.id === currentModule)
			?.quizes.some((quiz) => quiz.is_passed);

		if (hasPassedQuiz) {
			const nextModuleId = chapters
				?.find((chapter) => chapter.id === currentChapter)
				?.modules.find((module, index, modules) => {
					return module.id === currentModule && modules[index + 1];
				})?.id;

			const nextChapterId = chapters?.find(
				(chapter, index, chapters) => chapter.id === currentChapter && chapters[index + 1]
			)?.id;

			if (nextModuleId) {
				setModule(nextModuleId);
			} else {
				setChapter(String(nextChapterId));
			}
		} else {
			setOpenQuitQuiz(true);
		}
	}, [chapters, currentChapter, currentModule]);

	return (
		<>
			<div className="flex items-center gap-4">
				<Button variant="inverse" disabled className="w-36 py-2" onClick={() => setOpenTakeQuiz(true)}>
					Take Quiz
				</Button>

				<Button onClick={goToNextLesson} className="w-48 text-sm">
					<span>Go to Next Lesson</span>
					<RiArrowRightSLine className="size-4" />
				</Button>
			</div>

			<QuizAlertModal
				open={openQuitQuiz}
				setOpen={setOpenQuitQuiz}
				setOpenTakeQuiz={setOpenTakeQuiz}
			/>
			<TakeQuizModal open={openTakeQuiz} setOpen={setOpenTakeQuiz} />
		</>
	);
};
