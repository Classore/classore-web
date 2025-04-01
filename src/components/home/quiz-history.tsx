import { RiCalendar2Line, RiCheckLine, RiCloseLine, RiFileHistoryLine } from "@remixicon/react";

import { useGetChapter } from "@/queries/student";
import { useChapterStore } from "@/store/z-store/chapter";
import { format } from "date-fns";
import { Spinner } from "../shared";

export const QuizHistory = () => {
	const currentChapter = useChapterStore((state) => state.chapter);
	const currentModule = useChapterStore((state) => state.module);

	const {
		data: chapter,
		isPending,
		isError,
	} = useGetChapter({
		chapter_id: currentChapter,
	});

	const lesson = chapter?.modules.find((module) => module.id === currentModule);

	if (isPending) {
		return (
			<div className="flex w-full items-center justify-center gap-2 p-4 text-primary-300">
				<Spinner variant="primary" />
				<p className="text-sm">Getting current lesson...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex w-full flex-col items-center justify-center gap-2 p-4">
				<p className="font-semibold">Error fetching chapter</p>
				<p className="text-sm text-neutral-400">Please refresh the page to try again</p>
			</div>
		);
	}

	return (
		<div className="mt-4 flex w-full flex-col rounded-lg border">
			<div className="flex items-center gap-4 p-4">
				<div className="grid size-8 place-items-center rounded-md bg-neutral-100">
					<RiCalendar2Line className="size-4 text-neutral-700" />
				</div>
				<div className="flex w-full flex-col">
					<p className="font-medium">Quiz History</p>
					<p className="text-xs text-neutral-400">View your quiz score here</p>
				</div>
			</div>
			<hr className="w-full bg-neutral-300" />
			{!lesson?.quizes.length ? (
				<div className="flex w-full flex-col items-center justify-center gap-2 p-4">
					<p className="text-sm text-neutral-400">You have no quiz history</p>
				</div>
			) : (
				<div className="flex w-full flex-col">
					{lesson?.quizes.map((quiz) => (
						<div
							key={quiz.id}
							className="flex w-full items-center justify-between border-b p-4 last:border-b-0">
							<div className="flex flex-1 items-center gap-2">
								<div className="grid size-6 place-items-center rounded-md bg-neutral-200 text-neutral-400">
									<RiFileHistoryLine size={16} />
								</div>
								<p className="text-sm text-neutral-400 hover:underline">
									You scored {quiz.score}% on {format(new Date(quiz.updatedOn), "do MMMM, yyyy")}
								</p>
							</div>

							<div
								className={`flex items-center gap-1 rounded-2xl px-3 py-1 text-xs ${quiz.is_passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
								{quiz.is_passed ? <RiCheckLine size={14} /> : <RiCloseLine size={14} />}
								{quiz.is_passed ? "Passed" : "Failed"}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
