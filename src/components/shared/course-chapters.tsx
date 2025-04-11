import { RiArrowDropDownLine, RiFolderVideoLine, RiLockLine } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { toast } from "sonner";

import { updateModuleProgress } from "@/queries/user";
import type { SingleCourseResp } from "@/types";
import { queryClient } from "@/providers";

type CourseChaptersProps = {
	chapters: SingleCourseResp["chapters"];
	courseId: string;
	dripping: string;
	progress: number;
	setChapter: (chapterId: string) => void;
	current_chapter_id?: string;
};

const MIN_CHAPTERS = 5;

export const CourseChapters = ({
	chapters,
	courseId,
	dripping,
	progress,
	setChapter,
	current_chapter_id,
}: CourseChaptersProps) => {
	const [showAllChapters, setShowAllChapters] = React.useState(false);

	const { mutate } = useMutation({
		mutationFn: updateModuleProgress,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["course"] });
			queryClient.invalidateQueries({ queryKey: ["chapter"] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const displayedChapters = showAllChapters ? chapters : chapters.slice(0, MIN_CHAPTERS);

	const hasMoreChapters = chapters.length > MIN_CHAPTERS;

	const nextChapterId = React.useMemo(() => {
		const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === current_chapter_id);
		if (currentChapterIndex === -1) return "";
		return chapters[currentChapterIndex + 1]?.id || "";
	}, [chapters, current_chapter_id]);

	const canAccessNextChapter = progress > 75;

	const isChapterLocked = (chapterId: string) => {
		if (chapterId === nextChapterId && canAccessNextChapter) return false;

		if (dripping === "NO") return false;
		if (chapterId === current_chapter_id) return false;
		const chapterIndex = chapters.findIndex((chapter) => chapter.id === chapterId);
		const currentChapterIndex = chapters.findIndex((chapter) => chapter.id === current_chapter_id);
		if (chapterIndex < currentChapterIndex) return false;
		if (chapterIndex === currentChapterIndex + 1 && canAccessNextChapter) return false;
		return true;
	};

	const onSelectChapter = (chapterId: string) => {
		const locked = isChapterLocked(chapterId);
		if (locked) {
			toast.error("Chapter is locked. Complete previous chapter to unlock");
			return;
		}
		setChapter(chapterId);
		mutate({ course_id: courseId, current_progress: 0, current_chapter_id: chapterId });
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
						const locked = isChapterLocked(chapter.id);

						return (
							<button
								onClick={() => !locked && onSelectChapter(chapter.id)}
								type="button"
								disabled={locked || chapter.id === current_chapter_id}
								key={index}
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
