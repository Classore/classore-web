import { RiArrowDropDownLine, RiFolderVideoLine, RiLockLine } from "@remixicon/react";
import * as React from "react";

import type { SingleCourseResp } from "@/types";

type CourseChaptersProps = {
	chapters: SingleCourseResp["chapters"];
	dripping: string;
	progress: number;
	setChapter: (chapterId: string) => void;
	current_chapter_id?: string;
};

const MIN_CHAPTERS = 5;

export const CourseChapters = ({
	chapters,
	dripping,
	progress,
	setChapter,
	current_chapter_id,
}: CourseChaptersProps) => {
	const [showAllChapters, setShowAllChapters] = React.useState(false);

	const displayedChapters = showAllChapters ? chapters : chapters.slice(0, MIN_CHAPTERS);

	const hasMoreChapters = chapters.length > MIN_CHAPTERS;
	const Component = dripping === "YES" ? "button" : "div";

	const clampPercentage = (value: number) => {
		return Math.max(0, Math.min(value, 100));
	};

	return (
		<>
			<div className="flex w-full items-center justify-between rounded-lg border p-4">
				<p className="text-sm text-neutral-400">ALL CHAPTERS</p>
				<div className="flex items-center gap-2">
					<div className="flex h-[6px] w-16 items-center overflow-hidden rounded-3xl bg-[#efefef]">
						<div
							style={{ width: `${clampPercentage(progress)}%` }}
							className="h-full rounded-3xl bg-primary-400"
						/>
					</div>
					<p className="text-xs font-bold">{clampPercentage(progress)}%</p>
				</div>
			</div>

			<div
				className={`w-full rounded-lg border ${showAllChapters ? "rounded-b-lg" : "rounded-b-none"}`}>
				{displayedChapters
					.sort((a, b) => a.sequence - b.sequence)
					.map((chapter, index) => (
						<Component
							{...(dripping === "YES"
								? {
										onClick: () => setChapter(chapter.id),
									}
								: {})}
							type="button"
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
								) : chapter.is_completed ? (
									<div className="flex items-center gap-1 rounded border border-primary-300 px-2 py-0.5 text-[10px] tracking-wide text-primary-300">
										<span className="size-1 rounded-full bg-primary-300" />
										COMPLETED
									</div>
								) : dripping === "NO" ? (
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
						</Component>
					))}

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
