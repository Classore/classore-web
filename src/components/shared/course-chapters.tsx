import { RiArrowDropDownLine, RiFolderVideoLine, RiLockLine } from "@remixicon/react";
import * as React from "react";
import { toast } from "sonner";

import type { ChapterResp, SingleCourseResp } from "@/types";

type CourseChaptersProps = {
	chapters: SingleCourseResp["chapters"];
	courseId: string;
	dripping: string;
	hasNextChapter: boolean;
	hasPreviousChapter: boolean;
	progress: number;
	current_chapter_id?: string;
	currentChapter: ChapterResp | null;
	setCurrentChapterId: (chapterId: string) => void;
};

const MIN_CHAPTERS = 5;

export const CourseChapters = ({
	chapters = [],
	dripping: chapter_dripping,
	progress,
	setCurrentChapterId,
	current_chapter_id,
	currentChapter,
}: CourseChaptersProps) => {
	const [showAllChapters, setShowAllChapters] = React.useState(false);
	const safeChapters = React.useMemo(() => {
		return Array.isArray(chapters) ? chapters : [];
	}, [chapters]);
	const displayedChapters = showAllChapters ? safeChapters : safeChapters.slice(0, MIN_CHAPTERS);
	const hasMoreChapters = safeChapters.length > MIN_CHAPTERS;

	const nextChapter = React.useMemo(() => {
		if (!currentChapter?.id) return "";

		const currentChapterIndex = safeChapters.findIndex(
			(chapter) => chapter.id === currentChapter?.id
		);
		if (currentChapterIndex === -1) return "";

		return chapters[currentChapterIndex + 1]?.id || "";
	}, [currentChapter?.id, safeChapters, chapters]);

	const canAccessNextChapter = progress > 50;

	const isChapterLocked = React.useCallback(
		(chapterId: string) => {
			if (!chapterId || !currentChapter?.id) return true;

			if (chapterId === nextChapter && canAccessNextChapter) return false;

			const dripping = chapter_dripping ?? "NO";
			if (dripping === "NO") return false;
			if (chapterId === currentChapter?.id) return false;
			const chapterIndex = safeChapters.findIndex((chapter) => chapter.id === chapterId);
			const currentChapterIndex = safeChapters.findIndex(
				(chapter) => chapter.id === currentChapter?.id
			);

			if (chapterIndex < currentChapterIndex) return false;
			if (chapterIndex === currentChapterIndex + 1 && canAccessNextChapter) return false;

			// check if all previous chapter module ispassed is true
			const previousChapterModules = safeChapters
				.slice(0, chapterIndex)
				.flatMap((chapter) => chapter.modules)
				.every((module) => module.is_passed);
			if (previousChapterModules) return false;

			return true;
		},
		[currentChapter?.id, nextChapter, canAccessNextChapter, chapter_dripping, safeChapters]
	);

	const onSelectChapter = (chapterId: string) => {
		const chapterExists = safeChapters.some((chapter) => chapter.id === chapterId);
		if (!chapterExists) {
			toast.error("Chapter not found");
			return;
		}
		const locked = isChapterLocked(chapterId);
		if (locked) {
			toast.info("Chapter is locked. Complete previous chapter to unlock");
			return;
		}

		setCurrentChapterId(chapterId);
	};

	return (
		<>
			<div className="flex w-full items-center justify-between rounded-lg border p-4">
				<p className="text-sm text-neutral-400">ALL CHAPTERS</p>
				<div className="flex items-center gap-2">
					<div className="flex h-[6px] w-16 items-center overflow-hidden rounded-3xl bg-[#efefef]">
						<div style={{ width: `${progress}%` }} className="h-full rounded-3xl bg-primary-400" />
					</div>
					<p className="text-xs font-bold">{progress}%</p>
				</div>
			</div>

			<div
				className={`w-full rounded-lg border ${showAllChapters ? "rounded-b-lg" : "rounded-b-none"}`}>
				{displayedChapters
					.sort((a, b) => a.sequence - b.sequence)
					.map((chapter, index) => {
						if (!chapter || !chapter.id) return null;

						const locked = isChapterLocked(chapter.id);

						return (
							<button
								onClick={() => onSelectChapter(chapter.id)}
								type="button"
								disabled={locked || chapter.id === current_chapter_id}
								key={chapter.id || index}
								className={`flex w-full flex-col gap-1 border-b p-4 ${showAllChapters && hasMoreChapters ? "last:border-b" : "last:border-b-0"}`}>
								<div className="flex w-full items-center justify-between">
									<p
										className={`${current_chapter_id === chapter.id ? "text-black" : "text-neutral-400"} text-xs`}>
										CHAPTER {index + 1}
									</p>
									{current_chapter_id === chapter.id ? (
										<div className="flex items-center gap-1 rounded border border-secondary-300 px-2 py-0.5 text-[10px] tracking-wide text-secondary-300">
											<span className="size-1 rounded-full bg-secondary-300" />
											ONGOING
										</div>
									) : chapter.is_completed || progress >= 99 ? (
										<div className="flex items-center gap-1 rounded border border-primary-300 px-2 py-0.5 text-[10px] tracking-wide text-primary-300">
											<span className="size-1 rounded-full bg-primary-300" />
											COMPLETED
										</div>
									) : locked ? (
										<RiLockLine className="size-4 text-neutral-400" />
									) : null}
								</div>

								<div
									className={`flex items-center gap-1 ${
										current_chapter_id === chapter.id ? "text-neutral-500" : "text-neutral-400"
									}`}>
									<RiFolderVideoLine size={16} />
									<p className="truncate text-sm font-medium capitalize">{chapter.name}</p>
								</div>
							</button>
						);
					})}

				{hasMoreChapters && (
					<button
						onClick={() => setShowAllChapters(!showAllChapters)}
						className="flex w-full items-center justify-center gap-2 rounded-b-lg p-4 text-sm text-primary-400">
						{showAllChapters ? "Show Less" : "See All Chapters"}
						<RiArrowDropDownLine
							className={`transition-all duration-500 ${showAllChapters ? "rotate-180" : ""}`}
						/>
					</button>
				)}
			</div>
		</>
	);
};
