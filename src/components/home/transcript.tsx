import { RiSpeakLine } from "@remixicon/react";

export const Transcript = () => {
	return (
		<div className="flex w-full flex-col rounded-lg border">
			<div className="flex items-center gap-4 p-4">
				<div className="grid size-8 place-items-center rounded-md bg-neutral-100">
					<RiSpeakLine className="size-4 text-neutral-700" />
				</div>
				<div>
					<p className="font-medium">Transcript</p>
				</div>
			</div>
			<hr className="w-full bg-neutral-300" />
			<div className="max-h-[700px] w-full overflow-auto">
				<div className="flex w-full flex-col items-center justify-center gap-2 p-4">
					<p className="text-sm text-neutral-400">No transcript available</p>
				</div>
				{/* {!transcript ? (
				) : (
					<div className="flex w-full flex-col">
						{transcript.map((item) => (
							<div key={item.id} className="flex w-full flex-col gap-2 p-4">
								<div className="w-fit rounded bg-neutral-200 px-3 py-0.5 text-sm text-neutral-400">
									[{formatTime(item.duration[0])} - {formatTime(item.duration[1])}]{" "}
									<span>{item.title}</span>
								</div>
								<div className="w-full text-sm text-neutral-400">{item.summary}</div>
							</div>
						))}
					</div>
				)} */}
			</div>
		</div>
	);
};
