import * as React from "react";
import { toast } from "sonner";
import {
	RiCheckboxCircleFill,
	RiFileTextLine,
	RiFolderVideoLine,
	RiPlayCircleLine,
} from "@remixicon/react";

import { convertSecondsToMinSec, sanitizeHtml } from "@/lib";
import type { ChapterModuleProps, ChapterResp } from "@/types";
import { QuizAlertModal, TakeQuizModal } from "../modals";
import { Spinner } from "../shared";

interface Props {
	chapter: ChapterResp | null;
	chapterProgress: number;
	currentChapterId: string;
	currentModuleId: string;
	hasNextChapter: boolean;
	hasNextModule: boolean;
	hasPreviousChapter: boolean;
	hasPreviousModule: boolean;
	isError: boolean;
	isPending: boolean;
	moduleList: ChapterModuleProps[];
	nextChapterId: string;
	nextModuleId: string;
	onSelectChapter: (chapterId: string) => void;
	onSelectModule: (moduleId: string) => void;
	previousModule: ChapterModuleProps | null;
}

export const ChapterModules = ({
	chapter,
	chapterProgress,
	currentChapterId,
	currentModuleId,
	moduleList,
	isError,
	isPending,
	onSelectModule,
}: Props) => {
	const [activeModuleId, setActiveModuleId] = React.useState(currentModuleId);
	const [openTakeQuiz, setOpenTakeQuiz] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		setActiveModuleId(currentModuleId);
	}, [currentModuleId]);

	const handleSelectModule = (module: ChapterModuleProps) => {
		const moduleId = module.id;
		const isPassed = module.is_passed;
		const hasPreviousModule = module.sequence > 1;
		const previousModule = moduleList[module.sequence - 2];
		console.log({ previousModule });
		if (hasPreviousModule && (previousModule?.progress || 0) < 50) {
			toast.error("Please complete the previous module first");
			return;
		}
		if (!isPassed && chapterProgress < 50 && moduleId !== moduleList[0].id) {
			setOpen(true);
			return;
		}
		onSelectModule(moduleId);
	};

	React.useEffect(() => {
		if (openTakeQuiz) {
			setOpenTakeQuiz(false);
		}
	}, [currentChapterId]);

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
					className="prose-sm text-neutral-400 prose-headings:first-letter:uppercase prose-p:my-0 prose-p:first-letter:capitalize prose-a:underline prose-a:hover:text-primary-300 prose-ol:list-decimal prose-ul:list-disc prose-li:first-letter:uppercase prose-hr:my-1"
					dangerouslySetInnerHTML={{
						__html: sanitizeHtml(chapter?.content),
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
										<span>{chapter?.no_of_quizes} Quizzes</span>
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
					{moduleList
						.sort((a, b) => a.sequence - b.sequence)
						.map((module) => (
							<button
								type="button"
								key={module.id}
								onClick={() => handleSelectModule(module)}
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
			{openTakeQuiz && (
				<TakeQuizModal
					currentChapterId={currentChapterId}
					currentModuleId={activeModuleId}
					open={openTakeQuiz}
					setOpen={setOpenTakeQuiz}
				/>
			)}
		</>
	);
};
