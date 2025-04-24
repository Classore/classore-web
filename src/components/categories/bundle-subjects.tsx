import { FolderClosed, NotebookText, PlayCircle } from "lucide-react";
import * as React from "react";
import Link from "next/link";

import type { SingleBundleResp } from "@/types";

type Props = {
	subjects: SingleBundleResp["subjects"];
};

export const BundleSubjects = ({ subjects }: Props) => {
	const [value, setValue] = React.useState(subjects[0]?.id ?? "");

	return (
		<ul>
			{subjects?.map((subject) => (
				<li key={subject.id} className="flex flex-col gap-2 border-t border-t-neutral-200 py-4">
					<div className="flex items-center justify-between gap-1">
						<button
							type="button"
							onClick={() => setValue(subject.id)}
							className="flex items-center gap-2 text-base text-neutral-500">
							<FolderClosed className="size-4" />
							<p className="font-medium capitalize">{subject.name}</p>
						</button>

						{value === subject.id && (
							<Link
								href={`/dashboard/courses/preview/${subject.id}`}
								className="text-sm text-secondary-300 underline">
								Preview
							</Link>
						)}
					</div>

					{value === subject.id && (
						<div className="flex flex-col gap-4 rounded-md bg-neutral-100 px-4 py-3">
							<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
								<div className="flex items-center gap-2 text-sm text-neutral-400">
									<PlayCircle className="size-4" />
									<p>35hrs Chapters</p>
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
					)}
				</li>
			))}
		</ul>
	);
};
