import {
	RiCheckboxCircleFill,
	RiFileTextLine,
	RiFolderVideoLine,
	RiLock2Line,
	RiPlayCircleLine,
} from "@remixicon/react";
import * as React from "react";
import { toast } from "sonner";

import { convertSecondsToMinSec, sanitizeHtml } from "@/lib";
import type { ChapterModuleProps, ChapterResp, SingleCourseResp } from "@/types";
import { isModuleFree } from "@/lib/free-trial";
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
	/** Whether the student has a paid subscription for this bundle */
	isPaid?: boolean;
	/** All chapters in this course — used for free-trial gating */
	chapters?: SingleCourseResp["chapters"];
	/** Called when a locked module is clicked — opens the UpgradePlanModal */
	onClickLocked?: () => void;
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
	isPaid = false,
	chapters = [],
	onClickLocked,
}: Props) => {
	const [activeModuleId, setActiveModuleId] = React.useState(currentModuleId);
	const [openTakeQuiz, setOpenTakeQuiz] = React.useState(false);
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		setActiveModuleId(currentModuleId);
	}, [currentModuleId]);

	const handleSelectModule = (module: ChapterModuleProps) => {
		const moduleId = module.id;

		// Free-trial gating: if the student is unpaid, only the first module is accessible
		if (!isPaid && chapters.length > 0) {
			const free = isModuleFree(currentChapterId, moduleId, chapters);
			if (!free) {
				onClickLocked?.();
				return;
			}
		}

		// Allow immediate access to completed or passed modules (unrestricted navigation for reviews)
		if (module.is_completed || module.is_passed) {
			if (typeof window !== "undefined") {
				window.dispatchEvent(new CustomEvent("manual-module-selection"));
			}
			onSelectModule(moduleId);
			return;
		}

		// Allow access to any module that has been unlocked (progress > 0) for review purposes
		if ((module.progress || 0) > 0) {
			if (typeof window !== "undefined") {
				window.dispatchEvent(new CustomEvent("manual-module-selection"));
			}
			onSelectModule(moduleId);
			return;
		}

		// For completely new modules, enforce sequential access
		const moduleIndex = moduleList.findIndex((m) => m.id === moduleId);
		if (moduleIndex === 0) {
			// First module is always accessible
			onSelectModule(moduleId);
			return;
		}

		const previousModule = moduleList[moduleIndex - 1];
		if (!previousModule) return;

		// Check if previous module is completed (progress >= 50%)
		if ((previousModule.progress || 0) < 50) {
			toast.error("Please complete the previous module first and take the quiz.");
			return;
		}

		// Check chapter progress for modules other than the first
		if ((chapterProgress || 0) < 50) {
			toast.error("Please complete the previous module first and take the quiz.");
			return;
		}

		onSelectModule(moduleId);
	};

	React.useEffect(() => {
		if (openTakeQuiz) {
			setOpenTakeQuiz(false);
		}
	}, [currentChapterId, openTakeQuiz]);

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
			<div className="flex w-full items-center justify-center p-4">
				<p className="text-sm text-red-500">Failed to load chapter modules</p>
			</div>
		);
	}

	return (
		<>
			<div className="flex w-full flex-col gap-6">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<div className="flex size-8 items-center justify-center rounded-md bg-[rgba(241,236,249,0.5)] text-primary-300">
							<RiFolderVideoLine className="size-4" />
						</div>
						<p className="text-sm capitalize font-bold text-neutral-800">
							{chapter?.name ?? (chapter as any)?.title ?? "Loading..."}
						</p>
					</div>

					{(chapter?.content || (chapter as any)?.description) && (
						<p
							dangerouslySetInnerHTML={{
								__html: sanitizeHtml(chapter?.content || (chapter as any)?.description || ""),
							}}
							className="text-xs text-neutral-400"
						/>
					)}

					<div className="flex items-center justify-between gap-4">
						<div className="flex items-center gap-2">
							<RiFileTextLine className="size-4 text-neutral-400" />
							<p className="text-xs font-bold text-neutral-400">
								{moduleList.length} Lesson{moduleList.length === 1 ? "" : "s"}
							</p>
						</div>

						{(chapter as any)?.quiz_id && (
							<button
								type="button"
								onClick={() => setOpenTakeQuiz(true)}
								className="flex items-center gap-1 rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
							>
								Take Quiz
							</button>
						)}
					</div>
				</div>

				<div className="flex w-full flex-col">
					<div className="flex items-center justify-between border-b border-b-neutral-200 p-6">
						<p className="text-xs text-neutral-400">Lessons</p>
						<div className="flex items-center gap-2">
							<div className="h-1.5 w-24 rounded-3xl bg-neutral-200">
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
						.map((module) => {
							// A module is locked when the student is unpaid AND it's not the free (first) module
							const isLocked =
								!isPaid && chapters.length > 0 && !isModuleFree(currentChapterId, module.id, chapters);

							return (
								<button
									type="button"
									key={module.id}
									onClick={() => handleSelectModule(module)}
									className={`flex w-full items-center gap-4 border-b border-b-neutral-200 px-6 py-4 transition-colors ${
										currentModuleId === module.id ? "border-l-4 border-l-primary-300" : ""
									} ${isLocked ? "opacity-60 hover:bg-orange-50" : "hover:bg-neutral-50"}`}
								>
									<div
										className={`grid size-8 place-items-center rounded-md ${
											module.is_completed || currentModuleId === module.id
												? "bg-[rgba(241,236,249,0.5)] text-primary-300"
												: "bg-neutral-100 text-neutral-400"
										}`}
									>
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
										{isLocked ? (
											<RiLock2Line className="size-4 text-orange-400" />
										) : (
											<RiCheckboxCircleFill
												className={`size-5 ${module.is_completed ? "text-primary-300" : "text-neutral-200"}`}
											/>
										)}
									</div>
								</button>
							);
						})}
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
