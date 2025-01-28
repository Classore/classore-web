import {
	RiDownload2Line,
	RiFilePdf2Line,
	RiFilePpt2Line,
	RiFileTextLine,
	RiFileWordLine,
	RiFoldersLine,
	RiLoaderLine,
	type RemixiconComponentType,
} from "@remixicon/react"
import { toast } from "sonner"

import { useDownload } from "@/hooks"
import type { FiletypeProps, ResourceProps } from "@/types"

interface Props {
	resources?: ResourceProps[]
}

const fileIcon: Record<FiletypeProps, RemixiconComponentType> = {
	doc: RiFileWordLine,
	docx: RiFileWordLine,
	pptx: RiFilePpt2Line,
	pdf: RiFilePdf2Line,
	txt: RiFileTextLine,
}

export const Resources = ({ resources }: Props) => {
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
			{!resources ? (
				<div className="flex w-full flex-col items-center justify-center gap-2 p-4">
					<p className="text-sm text-neutral-400">No resources found</p>
				</div>
			) : (
				<div className="flex w-full flex-col">
					{resources.map((resource) => (
						<Resource key={resource.id} resource={resource} />
					))}
				</div>
			)}
		</div>
	)
}

const Resource = ({ resource }: { resource: ResourceProps }) => {
	const { download, loading } = useDownload({
		filename: `${resource.title}.pdf`,
		url: "/api/download",
		onSuccess: () => {
			toast.success("File downloaded successfully")
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : "Failed to download file")
		},
	})

	const Icon = fileIcon[resource.file]

	return (
		<div className="flex w-full items-center justify-between border-b p-4 last:border-b-0">
			<div className="flex flex-1 items-center gap-2">
				<div className="grid size-8 place-items-center rounded-md bg-neutral-200 text-neutral-400">
					<Icon size={20} />
				</div>
				<a href={resource.url} target="_blank" className="text-sm text-neutral-400 hover:underline">
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
	)
}
