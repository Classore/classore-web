import { skipToken, usePrefetchQuery } from "@tanstack/react-query";
import { RiMessage2Line } from "@remixicon/react";
import { useRouter } from "next/router";
import React from "react";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { useChapterStore } from "@/store/z-store/chapter";
import { useGetChapter } from "@/queries/student";
import { fetchQuestions } from "@/queries/user";
import { Button } from "../ui/button";
import { Progress } from "../shared";

type TakeQuizModal = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TakeQuizModal = ({ open, setOpen }: TakeQuizModal) => {
	const router = useRouter();
	const { id: course_id } = router.query;

	const currentChapter = useChapterStore((state) => state.chapter);
	const currentModule = useChapterStore((state) => state.module);

	const { data: chapter } = useGetChapter({
		chapter_id: currentChapter,
	});
	const lesson = chapter?.modules.find((module) => module.id === currentModule);

	// Prefetch this chapter quiz. Might change this since quiz might be moving to modules.
	usePrefetchQuery({
		queryKey: ["questions", { module_id: lesson?.id }],
		queryFn: lesson?.id ? () => fetchQuestions({ module_id: String(lesson?.id) }) : skipToken,
		staleTime: Infinity,
		gcTime: Infinity,
	});

	if (!chapter || !lesson) return null;

	const attempts_percentage =
		((lesson?.quiz_attempts_limit - lesson.quiz_attempts_left) / (lesson.quiz_attempts_limit ?? 3)) *
		100;

	const lastQuizAttempt = React.useMemo(() => {
		return lesson.quizes[lesson.quizes.length - 1];
	}, [lesson.quizes]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex flex-col gap-4">
				<div>
					<p className="text-[10px] uppercase tracking-widest text-neutral-400">{chapter.name}</p>
					<DialogTitle className="text-2xl font-bold capitalize">{lesson.title} Quiz</DialogTitle>
					<DialogDescription className="font-neutral-400 text-sm">
						Ready to take your quiz?
					</DialogDescription>
				</div>
				<div className="flex w-full items-center gap-2 rounded-lg border bg-white px-4 py-6">
					<div className="w-[156px] flex-1">
						<Progress
							label="Previous Score"
							value={lastQuizAttempt?.score ?? 0}
							color="#6F42C1"
							svgFill="#F1ECF9">
							{lastQuizAttempt?.score ?? 0}%
						</Progress>
					</div>
					<hr className="h-9 w-[1px] bg-neutral-300" />
					<div className="w-[156px] flex-1">
						<Progress label="Attempts" value={attempts_percentage} color="#F67F36" svgFill="#FEF3EB">
							{lesson.quiz_attempts_limit - lesson.quiz_attempts_left}/{lesson.quiz_attempts_limit ?? 3}
						</Progress>
					</div>
				</div>
				<div className="rounded-lg border px-4 py-3 text-neutral-400">
					<div className="flex w-full items-center gap-2">
						<RiMessage2Line className="size-4" />
						<p className="text-xs">Remark(s)</p>
					</div>

					<ul className="flex flex-col gap-1 pt-2">
						{lastQuizAttempt?.score !== 0 && Number(lastQuizAttempt?.score) < chapter.bench_mark ? (
							<li className="text-xs">
								You need to score above ${chapter.bench_mark}% to qualify for next chapter
							</li>
						) : null}

						{chapter.current_chapter_progress_percentage < 50 ? (
							<li className="text-xs">
								You must watch at least 50% of the video to unlock the current quiz
							</li>
						) : null}

						{lesson.quiz_attempts_left <= 0 ? (
							<li className="text-xs">
								You have reached the maximum number of quiz attempts for this chapter. Please try again
								after {chapter.attempt_reset} hour
								{chapter.attempt_reset > 1 ? "s" : ""}
							</li>
						) : null}
					</ul>
				</div>
				<div className="flex w-full flex-col gap-2 rounded-lg bg-neutral-100 p-4 transition-all duration-700">
					<p className="text-sm font-medium text-neutral-500">Instructions</p>

					<ul className="list-outside list-disc gap-2 pl-4 text-xs text-neutral-400">
						<li>
							Attempts: You have {lesson.quiz_attempts_limit} attempts for every {chapter.attempt_reset}{" "}
							hours.
						</li>
						<li>Passing Score: Score {chapter.bench_mark}% or higher to unlock the next chapter.</li>
						<li>
							Time Limit: Complete the quiz within {chapter?.timer_hour ? `${chapter.timer_hour}hr` : ""}{" "}
							{chapter?.timer_minute}min.
						</li>
						<li>Quiz will be submitted automatically after the time limit expires.</li>
					</ul>
				</div>

				<div className="flex w-full items-center justify-end gap-4 border-t border-t-neutral-200 pt-4">
					<DialogClose asChild>
						<Button className="w-32 text-sm font-medium text-neutral-400" size="sm" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button
						className="w-32 text-sm"
						disabled={lesson.quiz_attempts_left <= 0}
						size="sm"
						onClick={() =>
							router.push({
								pathname: "/dashboard/courses/[id]/quiz",
								query: { id: course_id, module_id: lesson.id },
							})
						}>
						Start Quiz
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
