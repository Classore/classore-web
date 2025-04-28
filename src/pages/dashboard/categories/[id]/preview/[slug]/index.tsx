import {
	RiArrowDropDownLine,
	RiInformation2Line,
	RiThumbDownLine,
	RiThumbUpLine,
} from "@remixicon/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { DashboardLayout } from "@/components/layouts";
import { EnrollModal } from "@/components/modals";
import { BackBtn, Seo, Spinner } from "@/components/shared";
import { Video } from "@/components/shared/video";
import { Button } from "@/components/ui/button";
import { capitalize, sanitizeHtml } from "@/lib";
import { useGetSubject } from "@/queries/course";
import { useCreateStudyTimeline, useGetSingleExamBundleQuery } from "@/queries/school";
import { useGetProfile } from "@/queries/student";
import Image from "next/image";
import * as React from "react";

const MIN_CHAPTERS = 5;

const Page = () => {
	const router = useRouter();
	const bundle_id = router.query.id as string;
	const subject_id = router.query.slug as string;

	const [open, setOpen] = React.useState(false);

	const [showAllChapters, setShowAllChapters] = React.useState(false);

	const { data: subject, isPending } = useGetSubject(subject_id);
	const { data: bundle } = useGetSingleExamBundleQuery({
		bundle_id,
	});
	const { data: profile } = useGetProfile();

	const safeChapters = Array.isArray(subject?.chapters) ? subject?.chapters : [];
	const displayedChapters = showAllChapters ? safeChapters : safeChapters.slice(0, MIN_CHAPTERS);
	const hasMoreChapters = safeChapters.length > MIN_CHAPTERS;
	const currentBundle =
		profile && profile?.time_line.find((item) => item.exam_bundle_details.id === bundle_id);
	const hasBoughtCourse = currentBundle?.subjects.find((subject) => subject.id === subject_id);

	const { isPending: createStudyPending, mutate } = useCreateStudyTimeline();
	const handleBuyCourse = () => {
		mutate(
			{
				chosen_bundle: bundle_id,
				exam_type: bundle?.examination.id as string,
				subjects: [subject_id],
			},
			{
				onSuccess: (data) => {
					setOpen(true);
					window.open(data.data.payment_link.authorization_url, "_self");
				},
			}
		);
	};

	return (
		<>
			<Seo title={subject?.name ? `${capitalize(subject?.name)} Preview` : "Course Preview"} />

			<DashboardLayout>
				<div className="h-full w-full select-none space-y-5">
					{isPending ? (
						<div className="flex w-full flex-col items-center justify-center gap-1 py-4">
							<Spinner variant="primary" />
							<p className="text-xs text-primary-300">Getting course details...</p>
						</div>
					) : (
						<>
							<div>
								<div className="flex items-center justify-between gap-x-4">
									<div className="flex items-center gap-x-4">
										<BackBtn />
										<h4 className="font-medium capitalize lg:text-xl">{capitalize(subject?.name)}</h4>
									</div>

									<div className="flex flex-col gap-2">
										{bundle?.is_bought ? (
											currentBundle?.status === "EXPIRED" ? (
												<Button className="px-6" onClick={() => router.back()}>
													Renew Plan
												</Button>
											) : hasBoughtCourse ? (
												<Button asChild className="px-6">
													<Link href={`/dashboard/courses/${bundle_id}`}>Start Learning</Link>
												</Button>
											) : (
												<Button
													onClick={handleBuyCourse}
													disabled={bundle.max_subjects === bundle.number_of_subjects || createStudyPending}>
													{createStudyPending ? <Spinner /> : "Buy Course"}
												</Button>
											)
										) : (
											<EnrollModal />
										)}
									</div>
								</div>
								<p className="text-xs capitalize text-neutral-400">
									Courses/ Preview / {capitalize(subject?.name)}
								</p>
							</div>

							<div className="grid gap-5 lg:grid-cols-6">
								<div className="sticky left-0 top-0 col-span-4 space-y-5 self-start">
									<div className="relative aspect-[2/1] w-full rounded-lg">
										{subject?.videos?.length ? (
											<Video
												src={subject?.videos[0].secure_url}
												className="w-full object-cover md:rounded-none"
											/>
										) : (
											<Image
												src={subject?.banner || ""}
												alt={subject?.name || ""}
												fill
												sizes="100%"
												className="rounded-lg"
											/>
										)}
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
									{bundle?.max_subjects === bundle?.number_of_subjects && !hasBoughtCourse ? (
										<div className="flex flex-col gap-1">
											<p className="flex items-center gap-2 rounded bg-blue-100 p-2 text-xs text-blue-600">
												<RiInformation2Line className="size-6" /> You have reached the maximum number of courses
												you can add for this bundle.
											</p>
										</div>
									) : null}
									<div className="w-full rounded-lg border p-4">
										<p className="text-sm text-neutral-400">ALL CHAPTERS</p>
									</div>
									<div className="w-full space-y-3 rounded-lg border">
										{displayedChapters
											.sort((a, b) => a.sequence - b.sequence)
											.map((chapter, index) => (
												<div key={chapter?.id} className="w-full border-b px-4 py-2 last:border-b-0">
													<p className="text-xs text-neutral-400">CHAPTER {index + 1}</p>
													<p className="text-sm font-medium capitalize">{chapter.name}</p>
												</div>
											))}

										{hasMoreChapters && (
											<button
												onClick={() => setShowAllChapters(!showAllChapters)}
												className="flex w-full items-center justify-center gap-2 rounded-b-lg p-4 pt-0 text-sm text-primary-400">
												{showAllChapters ? "Show Less" : "See All Chapters"}
												<RiArrowDropDownLine
													className={`transition-all duration-500 ${showAllChapters ? "rotate-180" : ""}`}
												/>
											</button>
										)}
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</DashboardLayout>

			{open ? (
				<div className="absolute inset-0 z-50 mx-auto grid place-items-center gap-4 rounded-md bg-black/50 p-10 text-center text-sm text-neutral-600 backdrop-blur-sm backdrop-filter">
					<div className="grid w-80 place-items-center gap-4 rounded-lg bg-white px-6 py-10">
						<Spinner variant="primary" size="lg" />
						<p className="leading-tight">Please wait while we redirect you to the payment page...</p>
						<p className="text-xs font-bold text-red-600">
							NB: <br />
							DO NOT CLOSE THIS WINDOW OR REFRESH THIS PAGE
						</p>
					</div>
				</div>
			) : null}
		</>
	);
};

export default Page;
