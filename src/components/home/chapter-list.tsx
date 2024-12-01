import { RiFileTextLine, RiFolderVideoLine, RiPlayCircleLine } from "@remixicon/react"
import { Check } from "lucide-react"
import React from "react"

import type { ChapterProps } from "@/types"

interface Props {
	chapters: ChapterProps[]
	setCurrent: (index: ChapterProps) => void
	current?: ChapterProps
}

export const ChapterList = ({ chapters, setCurrent, current }: Props) => {
	return (
		<div className="w-full rounded-lg border">
			{chapters.map((chapter) => (
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
			))}
		</div>
	)
}
