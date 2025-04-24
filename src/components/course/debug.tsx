import { RiCloseLine } from "@remixicon/react";
import React from "react";

import type { ChapterModuleProps, ChapterResp } from "@/types";

interface Props {
	chapterId: string | null;
	chapterList: ChapterResp[];
	id: string;
	initialChapterId: string | null;
	initialModuleId: string | null;
	moduleId: string | null;
	moduleList: ChapterModuleProps[];
	onClose: () => void;
	open: boolean;
}

export const CourseDebugState = ({
	chapterId,
	chapterList,
	id,
	initialChapterId,
	initialModuleId,
	moduleId,
	moduleList,
	onClose,
	open,
}: Props) => {
	const storedProgress = React.useMemo(() => {
		if (typeof window !== "undefined") {
			try {
				const data = localStorage.getItem(`course_progress_${id}`);
				return data ? JSON.parse(data) : null;
			} catch (e) {
				return null;
			}
		}
		return null;
	}, []);

	return process.env.NODE_ENV === "development" && open ? (
		<div className="fixed bottom-4 right-4 z-50 max-w-sm rounded bg-black/80 p-4 text-xs text-white">
			<div className="flex w-full items-center justify-between">
				<h4 className="mb-2 font-bold">Course Debug</h4>
				<button onClick={onClose}>
					<RiCloseLine className="size-4" />
				</button>
			</div>
			<div className="grid grid-cols-2 gap-1">
				<span>ChapterId:</span>
				<span>{chapterId || "none"}</span>
				<span>ModuleId:</span>
				<span>{moduleId || "none"}</span>
				<span>Initial Chapter:</span>
				<span>{initialChapterId || "none"}</span>
				<span>Initial Module:</span>
				<span>{initialModuleId || "none"}</span>
				<span>Chapters Count:</span>
				<span>{chapterList?.length || 0}</span>
				<span>Modules Count:</span>
				<span>{moduleList?.length || 0}</span>
				<span>Stored Chapter:</span>
				<span>{storedProgress?.chapterId || "none"}</span>
				<span>Stored Module:</span>
				<span>{storedProgress?.moduleId || "none"}</span>
			</div>
		</div>
	) : null;
};
