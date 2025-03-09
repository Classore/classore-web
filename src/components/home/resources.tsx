import {
	RiDownload2Line,
	RiFilePdf2Line,
	RiFilePpt2Line,
	RiFileTextLine,
	RiFileWordLine,
	RiFoldersLine,
	RiLoaderLine,
	type RemixiconComponentType,
} from "@remixicon/react";
import { toast } from "sonner";

import { useDownload } from "@/hooks";
import { getFileExtension } from "@/lib";
import { useGetChapter } from "@/queries/student";
import { useChapterStore } from "@/store/z-store/chapter";
import type { FiletypeProps } from "@/types";
import * as React from "react";
import { Spinner } from "../shared";

const fileIcon: Record<FiletypeProps | (string & {}), RemixiconComponentType> = {
	doc: RiFileWordLine,
	docx: RiFileWordLine,
	pptx: RiFilePpt2Line,
	pdf: RiFilePdf2Line,
	txt: RiFileTextLine,
};


export const Resources = () => {
	const currentChapter = useChapterStore((state) => state.chapter);
	const currentModule = useChapterStore((state) => state.module);

	const {
		data: chapter,
		isPending,
		isError,
	} = useGetChapter({
		chapter_id: currentChapter,
	});

	const current_module = React.useMemo(() => {
		return chapter?.modules.find((module) => module.id === currentModule);
	}, [chapter, currentModule]);

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
			<div className="flex w-full flex-col items-center justify-center gap-2 p-4">
				<p className="font-semibold">Error fetching chapter</p>
				<p className="text-sm text-neutral-400">Please refresh the page to try again</p>
			</div>
		);
	}

	return (
		<div className="mt-4 flex w-full flex-col rounded-lg border">
			<div className="flex items-center gap-4 p-4">
				<div className="grid size-8 place-items-center rounded-md bg-neutral-100">
					<RiFoldersLine className="size-4 text-neutral-700" />
				</div>
				<div>
					<p className="font-medium">Resources</p>
					<p className="text-xs text-neutral-400">
						Kindly note that all resources are provied here for learning purposes only
					</p>
				</div>
			</div>
			<hr className="w-full bg-neutral-300" />
			{!current_module?.attachments.length ? (
				<div className="flex w-full flex-col items-center justify-center gap-2 p-4">
					<p className="text-sm text-neutral-400">No resources found</p>
				</div>
			) : (
				<div className="flex w-full flex-col">
					{current_module.attachments.map((resource, index) => (
						<Resource key={index} index={index} resource={resource} />
					))}
				</div>
			)}
		</div>
	);
};

const Resource = ({ resource, index }: { resource: string; index: number }) => {
	const { download, loading } = useDownload({
		filename: `${resource}.pdf`,
		url: "/api/download",
		onSuccess: () => {
			toast.success("File downloaded successfully");
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : "Failed to download file");
		},
	});

	const Icon = fileIcon[getFileExtension(resource)];

	return (
		<div className="flex w-full items-center justify-between border-b p-4 last:border-b-0">
			<div className="flex flex-1 items-center gap-2">
				<div className="grid size-8 place-items-center rounded-md bg-neutral-200 text-neutral-400">
					<Icon size={20} />
				</div>

				<div>
					<p className="text-sm text-neutral-500">Resource 00{index + 1}</p>
					<p className="text-xs uppercase text-neutral-400">{getFileExtension(resource)}</p>
				</div>
				{/* <a
					href={resource}
					target="_blank"
					className="text-sm text-neutral-400 hover:underline">
					{resource}
				</a> */}
			</div>
			<button onClick={download}>
				{loading ? (
					<RiLoaderLine size={20} className="animate-spin text-neutral-400" />
				) : (
					<RiDownload2Line size={20} className="text-neutral-400" />
				)}
			</button>
		</div>
	);
};
