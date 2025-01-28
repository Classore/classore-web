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
import { useGetSingleCourse } from "@/queries/student";
import type { FiletypeProps, ResourceProps } from "@/types";
import { useRouter } from "next/router";

interface Props {
	chapter_id: string;
	current_module: string | undefined;
}

const fileIcon: Record<FiletypeProps, RemixiconComponentType> = {
	doc: RiFileWordLine,
	docx: RiFileWordLine,
	pptx: RiFilePpt2Line,
	pdf: RiFilePdf2Line,
	txt: RiFileTextLine,
};

// TODO: Not done with this
export const Resources = ({ chapter_id, current_module }: Props) => {
	const router = useRouter();
	const { id } = router.query;

	const { data: course } = useGetSingleCourse({
		course_id: id as string,
	});
	const chapter = course?.chapters.find((chapter) => chapter.id === chapter_id);
	const modules = chapter?.modules.find((module) => module.id === current_module);

	return (
		<div className="flex w-full flex-col rounded-lg border">
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
			{!modules?.attachments.length ? (
				<div className="flex w-full flex-col items-center justify-center gap-2 p-4">
					<p className="text-sm text-neutral-400">No resources found</p>
				</div>
			) : (
				<div className="flex w-full flex-col">
					{modules.attachments.map((resource, index) => (
						// <Resource key={resource.id} resource={resource} />
						<p key={index}>Attachement</p>
					))}
				</div>
			)}
		</div>
	);
};

const Resource = ({ resource }: { resource: ResourceProps }) => {
	const { download, loading } = useDownload({
		filename: `${resource.title}.pdf`,
		url: "/api/download",
		onSuccess: () => {
			toast.success("File downloaded successfully");
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : "Failed to download file");
		},
	});

	const Icon = fileIcon[resource.file];

	return (
		<div className="flex w-full items-center justify-between border-b p-4 last:border-b-0">
			<div className="flex flex-1 items-center gap-2">
				<div className="grid size-8 place-items-center rounded-md bg-neutral-200 text-neutral-400">
					<Icon size={20} />
				</div>
				<a
					href={resource.url}
					target="_blank"
					className="text-sm text-neutral-400 hover:underline">
					{resource.title}
				</a>
			</div>
			<button onClick={download}>
				{loading ? (
					<RiLoaderLine className="animate-spin text-neutral-400" />
				) : (
					<RiDownload2Line className="text-neutral-400" />
				)}
			</button>
		</div>
	);
};
