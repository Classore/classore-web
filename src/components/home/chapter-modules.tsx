import { useMutation } from "@tanstack/react-query";
import * as React from "react";

import { convertSecondsToMinSec, sanitizeHtml } from "@/lib";
import { QuizAlertModal, TakeQuizModal } from "../modals";
import { updateModuleProgress } from "@/queries/user";
import { useGetChapter } from "@/queries/student";
import { queryClient } from "@/providers";
import { Spinner } from "../shared";
import {
	RiCheckboxCircleFill,
	RiFileTextLine,
	RiFolderVideoLine,
	RiPlayCircleLine,
} from "@remixicon/react";

interface Props {
	chapterProgress: number;
	courseId: string;
	currentChapterId: string;
	currentModuleId: string;
	isQuizPassed: (moduleId: string) => boolean;
	nextChapterId: string;
	nextModuleId: string;
	onSelectModule: (moduleId: string) => void;
}

export const ChapterModules = ({
	chapterProgress,
	courseId,
	currentChapterId,
	currentModuleId,
	isQuizPassed,
	nextChapterId,
	nextModuleId,
	onSelectModule,
}: Props) => {
	const [openTakeQuiz, setOpenTakeQuiz] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	const { isPending: isUpdatingProgress, mutate } = useMutation({
		mutationFn: updateModuleProgress,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["course"] });
			queryClient.invalidateQueries({ queryKey: ["chapter"] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const {
		data: chapter,
		isPending,
		isError,
	} = useGetChapter({
		chapter_id: currentChapterId,
		enabled: !!currentChapterId,
	});

	const modules = React.useMemo(() => {
		if (!chapter) return [];
		return chapter.modules;
	}, [chapter]);

	const passedQuiz = isQuizPassed(currentModuleId);

	React.useEffect(() => {
		mutate({
			course_id: courseId,
			current_progress: 0,
			...(nextChapterId !== "" && { currentChapterId: nextChapterId }),
			...(nextModuleId !== "" && { currentModuleId: nextModuleId }),
		});
	}, [nextChapterId, nextModuleId]);

	const canProceedToNextLesson = React.useMemo(() => {
		return chapterProgress > 50 && passedQuiz;
	}, [chapterProgress, isQuizPassed]);

	const handleSelectModule = (moduleId: string) => {
		if (!passedQuiz && chapterProgress < 50) {
			setOpen(true);
		} else {
			onSelectModule(moduleId);
		}
	};

	if (isPending || isUpdatingProgress) {
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
					className="markdown-content text-sm leading-relaxed text-neutral-400 first-letter:capitalize"
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
										width: `${chapterProgress}%`,
									}}
									className="h-full rounded-3xl bg-primary-400"
								/>
							</div>
							<p className="text-xs font-bold">{chapterProgress}%</p>
						</div>
					</div>
					{modules
						.sort((a, b) => a.sequence - b.sequence)
						.map((module) => (
							<button
								type="button"
								disabled={!canProceedToNextLesson}
								key={module.id}
								onClick={() => handleSelectModule(module.id)}
								className={`flex w-full items-center gap-4 border-b border-b-neutral-200 px-6 py-4 ${currentModuleId === module.id ? "border-l-4 border-l-primary-300" : ""}`}>
								<div
									className={`grid size-8 place-items-center rounded-md ${module.is_completed || currentModuleId === module.id ? "bg-[rgba(241,236,249,0.5)] text-primary-300" : "bg-neutral-100 text-neutral-400"}`}>
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
			{currentChapterId && currentModuleId && (
				<TakeQuizModal
					currentChapterId={currentChapterId}
					currentModuleId={currentModuleId}
					open={openTakeQuiz}
					setOpen={setOpenTakeQuiz}
				/>
			)}
		</>
	);
};
