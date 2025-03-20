import { RiSpeakLine } from "@remixicon/react";
import React from "react";

import { sanitizeHtml } from "@/lib";
import { useGetChapter } from "@/queries/student";
import { useChapterStore } from "@/store/z-store/chapter";

export const Transcript = () => {
	const { chapter, module } = useChapterStore();

	const { data } = useGetChapter({
		chapter_id: chapter,
	});

	const currentModule = React.useMemo(() => {
		return data?.modules.find((item) => item.id === module);
	}, [data?.modules, module]);

	return (
		<div className="mt-4 flex w-full flex-col rounded-lg border">
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
				{!currentModule?.content ? (
					<div className="flex w-full flex-col items-center justify-center gap-2 p-4">
						<p className="text-sm text-neutral-400">No transcript available</p>
					</div>
				) : (
					<div
						className="transcript w-full p-4 text-sm first-letter:capitalize"
						dangerouslySetInnerHTML={{
							__html: sanitizeHtml(currentModule.content),
						}}></div>
				)}
			</div>
		</div>
	);
};
