import { RiFileTextLine, RiFolderVideoLine, RiPlayCircleLine } from "@remixicon/react"

import { capitalize } from "@/lib"
import type { SingleCourseResp } from "@/types"

interface Props {
	// chapters: ChapterProps[]
	// setCurrent: (index: ChapterProps) => void
	chapters: SingleCourseResp["chapters"]
	current_chapter_id?: string
}

export const ChapterList = ({ chapters, current_chapter_id }: Props) => {
	const current_chapter = chapters.find((chapter) => chapter.id === current_chapter_id)

	return (
		<div className="flex flex-col gap-6 pt-4">
			<p className="text-sm leading-relaxed text-neutral-400">
				{capitalize(current_chapter?.content ?? "")}
			</p>

			<div className="w-full rounded-lg border border-neutral-200">
				<div className="flex items-center gap-4 border-b border-b-neutral-200 px-6 py-4">
					<div className="grid size-8 place-items-center rounded-md bg-neutral-100">
						<RiFolderVideoLine className="size-4 text-neutral-700" />
					</div>
					<div className="flex flex-col gap-1">
						<h3 className="font-semibold capitalize">{current_chapter?.name}</h3>
						<div className="flex items-center gap-2 text-sm text-neutral-400">
							<div className="flex items-center gap-1">
								<RiFileTextLine size={18} />
								<span>35 Resources</span>
							</div>
							<div className="flex items-center gap-1">
								<RiFileTextLine size={18} />
								<span>2 Quizzes</span>
							</div>
						</div>
					</div>
				</div>

				{current_chapter?.modules.map((module) => (
					<div
						key={module.id}
						className="flex items-center gap-4 border-b border-b-neutral-200 px-6 py-4">
						<div className="grid size-8 place-items-center rounded-md bg-[rgba(241,236,249,0.5)]">
							<RiPlayCircleLine className="size-4 text-primary-300" />
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-sm capitalize text-neutral-500">{module.title}</p>
							<p className="text-xs text-neutral-400">5:00 Min</p>
						</div>
					</div>
				))}
			</div>

			{/* {chapters.map((chapter) => (
				<div
					key={chapter.id}
					className={`flex w-full cursor-pointer items-center justify-between border-b p-4`}>
					<div className="flex w-full items-center gap-3">
						<button
							onClick={() => setCurrent(chapter)}
							className={`grid size-8 place-items-center rounded-md ${chapter === current ? "" : ""}`}>
							{chapter === current ? <RiFolderVideoLine /> : <RiPlayCircleLine />}
						</button>
						<div className="flex flex-1 flex-col gap-2">
							<h5 className={`${chapter === current ? "font-medium text-black" : "text-neutral-400"}`}>
								{chapter.title}
							</h5>
							{chapter === current ? (
								<div className="flex items-center gap-2 text-sm text-neutral-400">
									<div className="flex items-center gap-1">
										<RiFileTextLine size={18} /> {chapter.resources.length} Materials
									</div>
									<div className="flex items-center gap-1">
										<RiFileTextLine size={18} /> {chapter.quizzes.length} Quizzes
									</div>
								</div>
							) : (
								<div className="text-xs text-neutral-400">5:05 minutes</div>
							)}
						</div>
					</div>
					<div
						className={`grid size-4 place-items-center rounded-full text-white ${chapter.isRead ? "bg-primary-400" : "bg-neutral-400"}`}>
						<Check size={8} />
					</div>
				</div>
			))} */}
		</div>
	)
}
