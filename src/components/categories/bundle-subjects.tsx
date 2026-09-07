import { ChevronDown, ChevronUp, FolderClosed, NotebookText, PlayCircle } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import type { SingleBundleResp } from "@/types";

type SubjectItem = Partial<SingleBundleResp["subjects"][number]> & {
	subject_id?: string;
	subject_name?: string;
	id?: string;
	name?: string;
};

type Props = {
	subjects: SubjectItem[];
	bundleId?: string;
};

export const BundleSubjects = ({ subjects, bundleId }: Props) => {
	const [expandedId, setExpandedId] = React.useState<string | null>(null);

	return (
		<ul className="divide-y divide-neutral-100">
			{subjects && subjects.length > 0 ? (
				subjects.map((subject, idx) => {
					const subId = subject.id || subject.subject_id || `subject-${idx}`;
					const subName = subject.name || subject.subject_name || "Course Subject";
					const examBundleId =
						bundleId ||
						(typeof subject.examination_bundle === "object"
							? (subject.examination_bundle as any)?.id
							: subject.examination_bundle);

					const isExpanded = expandedId === subId;

					return (
						<li key={subId} className="flex flex-col gap-2 py-3.5 first:pt-1">
							<div className="flex items-center justify-between gap-2">
								<button
									type="button"
									onClick={() => setExpandedId(isExpanded ? null : subId)}
									className="flex items-center gap-2 text-left text-sm font-medium text-neutral-800 hover:text-primary-700 transition-colors group">
									<FolderClosed className="size-4 text-primary-600 shrink-0 group-hover:scale-110 transition-transform" />
									<span className="capitalize">{subName}</span>
									{isExpanded ? (
										<ChevronUp className="size-3.5 text-neutral-400" />
									) : (
										<ChevronDown className="size-3.5 text-neutral-400" />
									)}
								</button>

								{examBundleId && subId && (
									<Link
										href={`/dashboard/categories/${examBundleId}/preview/${subId}`}
										className="shrink-0 inline-flex items-center gap-1 rounded-lg border border-primary-200 bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700 hover:bg-primary-100 transition-colors">
										<span>Preview</span>
									</Link>
								)}
							</div>

							{isExpanded && (
								<div className="flex flex-col gap-2.5 rounded-xl bg-neutral-50 px-3.5 py-2.5 text-xs text-neutral-500 mt-1">
									<div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
										<div className="flex items-center gap-1.5">
											<PlayCircle className="size-3.5 text-primary-600" />
											<span>35hrs Video Lessons</span>
										</div>
										{Boolean(subject.number_of_materials) && (
											<div className="flex items-center gap-1.5">
												<NotebookText className="size-3.5 text-primary-600" />
												<span>{subject.number_of_materials} Materials</span>
											</div>
										)}
										{Boolean(subject.total_quizes) && (
											<div className="flex items-center gap-1.5">
												<NotebookText className="size-3.5 text-primary-600" />
												<span>{subject.total_quizes} Quizzes</span>
											</div>
										)}
									</div>
								</div>
							)}
						</li>
					);
				})
			) : (
				<li className="text-xs text-neutral-400 py-3">Bundle has no subjects</li>
			)}
		</ul>
	);
};
