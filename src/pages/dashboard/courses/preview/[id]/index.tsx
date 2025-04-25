import { RiThumbDownLine, RiThumbUpLine } from "@remixicon/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { DashboardLayout } from "@/components/layouts";
import { BackBtn, Seo } from "@/components/shared";
import { useGetSubject } from "@/queries/course";
import { capitalize, sanitizeHtml } from "@/lib";
import { Button } from "@/components/ui/button";

const Page = () => {
	const router = useRouter();
	const id = router.query.id as string;

	const { data: subject } = useGetSubject(id);

	return (
		<>
			<Seo title={capitalize(`${""} Preview`)} />
			<DashboardLayout>
				<div className="h-full w-full select-none space-y-5">
					<div>
						<div className="flex items-center gap-x-4">
							<BackBtn />
							<h4 className="font-medium capitalize lg:text-xl">{capitalize(subject?.name)}</h4>
						</div>
						<p className="text-xs capitalize text-neutral-400">
							Courses/ Preview/ {capitalize(subject?.name)}
						</p>
					</div>
					<div className="grid grid-cols-6 gap-x-5">
						<div className="col-span-4 space-y-5">
							<div className="relative aspect-[2/1] w-full rounded-lg">
								<Image
									src={subject?.banner || ""}
									alt={subject?.name || ""}
									fill
									sizes="100%"
									className="rounded-lg"
								/>
							</div>
							<div className="w-full space-y-5">
								<div className="flex w-full items-center justify-between">
									<div className="space-y-1">
										<h4 className="font-medium capitalize lg:text-xl">{subject?.name}</h4>
										<div className="flex items-center gap-x-4">
											<div className="flex items-center gap-x-1">
												<p className="text-xs text-neutral-400">Examination:</p>
												<p className="text-xs font-medium capitalize text-neutral-400">
													{subject?.examination.name}
												</p>
											</div>
											<div className="flex items-center gap-x-1">
												<p className="text-xs text-neutral-400">Bundle:</p>
												<p className="text-xs font-medium capitalize text-neutral-400">
													{subject?.examination_bundle.name}
												</p>
											</div>
										</div>
									</div>
									<div className="flex items-center gap-x-4">
										<div className="flex items-center gap-x-4">
											<button>
												<RiThumbUpLine className="size-5 text-neutral-400" />
											</button>
										</div>
										<div className="flex items-center gap-x-4">
											<button>
												<RiThumbDownLine className="size-5 text-neutral-400" />
											</button>
										</div>
									</div>
								</div>
								<div className="space-y-1">
									<p className="text-sm font-medium text-neutral-400">Course Description</p>
									<p
										className="text-sm first-letter:capitalize"
										dangerouslySetInnerHTML={{ __html: sanitizeHtml(subject?.description) }}></p>
								</div>
							</div>
						</div>
						<div className="col-span-2 space-y-5">
							<Button asChild>
								{/* check for active subscription */}
								<Link href={`/dashboard/courses/${id}`}>Start Learning</Link>
							</Button>
							<div className="w-full rounded-lg border p-4">
								<p className="text-sm text-neutral-400">ALL CHAPTERS</p>
							</div>
							<div className="w-full space-y-3 rounded-lg border">
								{subject?.chapters.map((chapter, index) => (
									<div key={chapter?.id} className="w-full border-b px-4 py-2 last:border-b-0">
										<p className="text-xs text-neutral-400">CHAPTER {index + 1}</p>
										<p className="text-sm font-medium capitalize">{chapter.name}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
