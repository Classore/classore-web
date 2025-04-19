import { useGetSingleExamBundleQuery } from "@/queries/school";
import type { SingleBundleResp } from "@/types";
import { NotebookText, PlayCircle } from "lucide-react";
import { useRouter } from "next/router";
import { Video } from "../shared/video";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

type Props = {
	subject: SingleBundleResp["subjects"][number];
};

export const CoursePreview = ({ subject }: Props) => {
	const router = useRouter();
	const { data: bundle } = useGetSingleExamBundleQuery({
		bundle_id: router.query.id as string,
	});

	return (
		<Dialog>
			<DialogTrigger type="button" className="text-sm text-secondary-300 underline">
				Preview
			</DialogTrigger>

			<DialogContent dialogContentClassName="max-w-lg" className="gap-10 px-1 md:p-4">
				<DialogHeader>
					<DialogDescription className="text-sm text-primary-300">Course Preview</DialogDescription>
					<DialogTitle className="font-bold capitalize">
						{bundle?.name} Exam Prep Bundle - {subject.name}
					</DialogTitle>
				</DialogHeader>

				<Video src={subject.videos[0].secure_url} className="w-full object-cover md:rounded-none" />
				<div className="flex justify-between gap-4 rounded-md bg-neutral-100 px-4 py-3">
					<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
						<div className="flex items-center gap-2 text-sm text-neutral-400">
							<PlayCircle className="size-4" />
							<p>35hrs</p>
						</div>
						<div className="flex items-center gap-2 text-sm text-neutral-400">
							<NotebookText className="size-4" />
							<p>{subject.number_of_chapters} Chapters</p>
						</div>
						<div className="flex items-center gap-2 text-sm text-neutral-400">
							<NotebookText className="size-4" />
							<p>{subject.number_of_materials} Materials</p>
						</div>
						<div className="flex items-center gap-2 text-sm text-neutral-400">
							<NotebookText className="size-4" />
							<p>{subject.total_quizes} Quizzes</p>
						</div>
					</div>

					{/* <div className="flex items-center gap-2">
								<div className="flex h-[6px] flex-1 items-center rounded-3xl bg-[#efefef]">
									<div style={{ width: `${50}%` }} className="h-full rounded-3xl bg-primary-400"></div>
								</div>

								<p className="text-sm text-neutral-400">30% Complete</p>
							</div> */}
				</div>
			</DialogContent>
		</Dialog>
	);
};
