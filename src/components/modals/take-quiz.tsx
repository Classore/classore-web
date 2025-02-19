import { useGetCourse } from "@/queries/student";
import { fetchQuestions } from "@/queries/user";
import { RiMessage2Line } from "@remixicon/react";
import { skipToken, usePrefetchQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Progress } from "../shared";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export const TakeQuizModal = () => {
	const router = useRouter();

	const { data } = useGetCourse({
		course_id: String(router.query.id),
	});
	const chapter = data?.chapters.find((chapter) => chapter.id === data.current_chapter.id);

	// Prefetch this chapter quiz. Might change this since quiz might be moving to modules.
	usePrefetchQuery({
		queryKey: ["questions", { chapter_id: chapter?.id }],
		queryFn: chapter?.id
			? () => fetchQuestions({ chapter_id: String(chapter?.id) })
			: skipToken,
		staleTime: Infinity,
		gcTime: Infinity,
	});

	if (!chapter || !data) return null;

	const attempts_percentage =
		((chapter?.quiz_attempts_limit - chapter.quiz_attempts_left) /
			(data.quiz_attempts_limit ?? 3)) *
		100;

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="inverse" className="w-36">
					Take Quiz
				</Button>
			</DialogTrigger>
			<DialogContent className="flex w-[400px] flex-col gap-4">
				<div>
					<DialogTitle className="text-2xl font-bold capitalize">
						{chapter?.name} Quiz
					</DialogTitle>
					<DialogDescription className="font-neutral-400 text-sm">
						Ready to take your quiz?
					</DialogDescription>
				</div>
				<div className="flex w-full items-center gap-2 rounded-lg border bg-white px-4 py-6">
					<div className="w-[156px] flex-1">
						<Progress label="Previous Score" value={data?.score} color="var(--primary-400)">
							{data?.score}%
						</Progress>
					</div>
					<hr className="h-9 w-[1px] bg-neutral-300" />
					<div className="w-[156px] flex-1">
						<Progress label="Attempts" value={attempts_percentage} color="var(--secondary-400)">
							{chapter.quiz_attempts_limit - chapter.quiz_attempts_left}/
							{data.quiz_attempts_limit ?? 3}
						</Progress>
					</div>
				</div>
				<div className="flex w-full items-center gap-2 rounded-lg border px-4 py-3 text-neutral-400">
					<RiMessage2Line className="size-4" />
					<p className="max-w-[85%] text-xs">
						Remark -{" "}
						{data.score !== 0 && data.score < chapter.bench_mark
							? `You need to score above ${chapter.bench_mark}% to qualify for next chapter`
							: chapter.quiz_attempts_left < 0
								? `You have reached the maximum number of quiz attempts for this chapter. Please try again after ${chapter.attempt_reset} hour${chapter.attempt_reset > 1 ? "s" : ""}`
								: "N/A"}
					</p>
				</div>
				<div className="flex w-full flex-col gap-3 rounded-lg bg-neutral-100 p-4 transition-all duration-700">
					<p className="text-sm font-medium text-neutral-500">Instructions</p>

					<ul className="list-outside list-disc space-y-2 pl-4 text-xs text-neutral-400">
						<li>
							Attempts: You have {data.quiz_attempts_limit} attempts for every{" "}
							{chapter.attempt_reset} hours.
						</li>
						<li>
							Passing Score: Score {chapter.bench_mark}% or higher to unlock the next chapter.
						</li>
						<li>
							Time Limit: Complete the quiz within{" "}
							{chapter?.timer_hour ? `${chapter.timer_hour}hr` : ""} {chapter?.timer_minute}min.
						</li>
						<li>Quiz will be submitted automatically after the time limit expires.</li>
					</ul>
				</div>

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
