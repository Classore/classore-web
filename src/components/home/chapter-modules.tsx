import { convertSecondsToMinSec, sanitizeHtml } from "@/lib";
import { useGetChapter } from "@/queries/student";
import { setModule, useChapterStore } from "@/store/z-store/chapter";
import {
	RiCheckboxCircleFill,
	RiFileTextLine,
	RiFolderVideoLine,
	RiPlayCircleLine,
} from "@remixicon/react";
import * as React from "react";
import { QuizAlertModal, TakeQuizModal } from "../modals";
import { Spinner } from "../shared";

export const ChapterModules = () => {
	const [open, setOpen] = React.useState(false);
	const [openTakeQuiz, setOpenTakeQuiz] = React.useState(false);

	const currentChapter = useChapterStore((state) => state.chapter);
	const currentModule = useChapterStore((state) => state.module);

	const {
		data: chapter,
		isPending,
		isError,
	} = useGetChapter({
		chapter_id: currentChapter,
	});

	const hasPassedQuiz = React.useMemo(
		() =>
			chapter?.modules
				.find((module) => module.id === currentModule)
				?.quizes.some((quiz) => quiz.is_passed),
		[chapter, currentModule]
	);

	React.useEffect(() => {
		if (chapter) {
			const current_module = chapter.current_chapter_module ?? chapter.modules[0].id;

			setModule(current_module);
		}
	}, [chapter, currentModule]);

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
		<>
			<div className="flex flex-col gap-6 pt-4">
				<div
					className="text-sm leading-relaxed text-neutral-400 first-letter:capitalize"
					dangerouslySetInnerHTML={{
						__html: sanitizeHtml(chapter?.content).replace(/\n/g, "<br />"),
					}}
				/>

				<div className="w-full rounded-lg border border-neutral-200">
					<div className="flex items-center justify-between gap-4 border-b border-b-neutral-200 px-6 py-4">
						<div className="flex items-center gap-4">
							<div className="grid size-8 place-items-center rounded-md bg-neutral-100">
								<RiFolderVideoLine className="size-4 text-neutral-700" />
							</div>
							<div className="flex flex-col gap-1">
								<h3 className="font-semibold capitalize">{chapter?.name}</h3>
								<div className="flex flex-wrap items-center gap-2 text-sm text-neutral-400">
									<div className="flex items-center gap-1">
										<RiFileTextLine size={18} />
										<span>35 Resources</span>
									</div>
									<div className="flex items-center gap-1">
										<RiFileTextLine size={18} />
										<span>{chapter.no_of_quizes} Quizzes</span>
									</div>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<div className="flex h-[6px] w-16 items-center overflow-hidden rounded-3xl bg-[#efefef]">
								<div
									style={{
										width: `${chapter.current_chapter_progress_percentage}%`,
									}}
									className="h-full rounded-3xl bg-primary-400"
								/>
							</div>
							<p className="text-xs font-bold">{chapter.current_chapter_progress_percentage}%</p>
						</div>
					</div>

					{chapter?.modules.map((module) => (
						<button
							type="button"
							disabled={currentModule === module.id}
							key={module.id}
							onClick={() => {
								if (!hasPassedQuiz) {
									setOpen(true);
								} else {
									setModule(module.id);
								}
							}}
							className={`flex w-full items-center gap-4 border-b border-b-neutral-200 px-6 py-4 ${currentModule === module.id ? "border-l-4 border-l-primary-300" : ""}`}>
							<div
								className={`grid size-8 place-items-center rounded-md ${module.is_completed || currentModule === module.id ? "bg-[rgba(241,236,249,0.5)] text-primary-300" : "bg-neutral-100 text-neutral-400"}`}>
								<RiPlayCircleLine className="size-4" />
							</div>

							<div className="flex flex-col gap-1">
								<p className="text-left text-sm capitalize text-neutral-500">{module.title}</p>
								<p className="w-fit text-xs text-neutral-400">
									{module.video_array.length
										? `${convertSecondsToMinSec(module.video_array.at(0)?.duration ?? 0)} min`
										: "--:--"}
								</p>
							</div>

							<div className="ml-auto">
								<RiCheckboxCircleFill
									className={`size-5 ${module.is_completed ? "text-primary-300" : "text-neutral-200"}`}
								/>
							</div>
						</button>
					))}
				</div>
			</div>

			<QuizAlertModal open={open} setOpen={setOpen} setOpenTakeQuiz={setOpenTakeQuiz} />
			<TakeQuizModal open={openTakeQuiz} setOpen={setOpenTakeQuiz} />
		</>
	);
};
