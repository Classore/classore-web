import { RiSpeakLine } from "@remixicon/react"
import React from "react"

import type { TranscriptProps } from "@/types"
import { formatTime } from "@/lib"

interface Props {
	transcript?: TranscriptProps[]
}

export const Transcript = ({ transcript }: Props) => {
	return (
		<div className="flex w-full flex-col rounded-lg border">
			<div className="flex items-center gap-2 p-4">
				<div className="grid size-8 place-items-center rounded-md bg-neutral-200">
					<RiSpeakLine />
				</div>
				<p className="font-medium">Transcript</p>
			</div>
			<hr className="w-full bg-neutral-300" />
			<div className="max-h-[700px] w-full overflow-auto">
				{!transcript ? (
					<div className="flex h-full w-full items-center justify-center">
						<p className="text-neutral-500">No transcript available</p>
					</div>
				) : (
					<div className="flex w-full flex-col">
						{transcript.map((item) => (
							<div key={item.id} className="flex w-full flex-col gap-2 p-4">
								<div className="w-fit rounded bg-neutral-200 px-3 py-0.5 text-sm text-neutral-400">
									[{formatTime(item.duration[0])} - {formatTime(item.duration[1])}] <span>{item.title}</span>
								</div>
								<div className="w-full text-sm text-neutral-400">{item.summary}</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
