import { useRouter } from "next/router";
import Link from "next/link";
import {
	RiArrowDropDownLine,
	RiInformation2Line,
	RiThumbDownLine,
	RiThumbUpLine,
} from "@remixicon/react";
import Image from "next/image";
import * as React from "react";

import { DashboardLayout } from "@/components/layouts";
import { EnrollModal, UpgradePlanModal, RenewalModal } from "@/components/modals";
import { BackBtn, Seo, Spinner } from "@/components/shared";
import { Video } from "@/components/shared/video";
import { Button } from "@/components/ui/button";
import { capitalize, sanitizeHtml } from "@/lib";
import { useGetSubject } from "@/queries/course";
import { useGetSingleExamBundleQuery } from "@/queries/school";
import { useGetProfile } from "@/queries/student";

const MIN_CHAPTERS = 5;

const Page = () => {
	const router = useRouter();
	const bundle_id = router.query.id as string;
	const subject_id = router.query.slug as string;

	const [showAllChapters, setShowAllChapters] = React.useState(false);
	const [upgradeModalOpen, setUpgradeModalOpen] = React.useState(false);
	const [renewalModalOpen, setRenewalModalOpen] = React.useState(false);
	const [enrollModalOpen, setEnrollModalOpen] = React.useState(false);

	const { data: subject, isPending } = useGetSubject(subject_id);
	const { data: bundle } = useGetSingleExamBundleQuery({
		bundle_id,
	});
	const { data: profile } = useGetProfile();

	const safeChapters = Array.isArray(subject?.chapters) ? subject?.chapters : [];
	const displayedChapters = showAllChapters ? safeChapters : safeChapters.slice(0, MIN_CHAPTERS);
	const hasMoreChapters = safeChapters.length > MIN_CHAPTERS;

	// Timeline matching (matching mobile)
	const currentBundle = profile?.time_line?.find(
		(item) =>
			item.chosen_bundle === bundle_id ||
			item.exam_bundle_details?.id === bundle_id ||
			item.id === bundle_id
	);

	const isEnrolled = Boolean(currentBundle);
	const isPaid = currentBundle?.is_paid === true;
	const isExpired = currentBundle?.status === "EXPIRED";
	const hasBoughtCourse = currentBundle?.subjects?.some(
		(s: any) => s.id === subject_id || s.subject_id === subject_id
	);

	const videoUrl =
		subject?.videos?.[0]?.derived_url ||
		subject?.videos?.[0]?.secure_url ||
		"";

	return (
		<>
			<Seo title={subject?.name ? `${capitalize(subject?.name)} Preview` : "Course Preview"} />

			<DashboardLayout>
				<div className="h-full w-full select-none space-y-6">
					{isPending ? (
						<div className="flex w-full flex-col items-center justify-center gap-1 py-12">
							<Spinner variant="primary" />
							<p className="text-xs text-primary-300">Getting course details...</p>
						</div>
					) : (
						<>
							<div>
								<div className="flex items-center justify-between gap-x-4">
									<div className="flex items-center gap-x-3">
										<BackBtn />
										<h2 className="font-bold text-lg lg:text-xl capitalize text-neutral-900">
											{capitalize(subject?.name)} Preview
										</h2>
									</div>

									{/* Action Button */}
									<div>
										{!isEnrolled ? (
											<Button
												onClick={() => setEnrollModalOpen(true)}
												className="px-6 font-bold bg-primary-600 hover:bg-primary-700">
												Start Learning Free
											</Button>
										) : isExpired ? (
											<Button
												onClick={() => setRenewalModalOpen(true)}
												className="px-6 font-bold bg-red-600 hover:bg-red-700 text-white">
												Renew Plan
											</Button>
										) : hasBoughtCourse ? (
											<Button asChild className="px-6 font-bold bg-primary-600 hover:bg-primary-700">
												<Link href={`/dashboard/courses/${subject_id}?bundle=${bundle_id}`}>
													{isPaid ? "Start Learning" : "Continue Free Preview"}
												</Link>
											</Button>
										) : (
											<Button
												onClick={() => setUpgradeModalOpen(true)}
												className="px-6 font-bold bg-primary-600 hover:bg-primary-700 text-white">
												Unlock Subject
											</Button>
										)}
									</div>
								</div>
								<p className="text-xs capitalize text-neutral-400 mt-1">
									Categories / {bundle?.name} / {capitalize(subject?.name)}
								</p>
							</div>

							<div className="grid gap-6 lg:grid-cols-6">
								{/* Left: Video Player & Description */}
								<div className="sticky left-0 top-0 col-span-4 space-y-5 self-start">
									<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-md">
										{videoUrl ? (
											<Video
												src={videoUrl}
												className="h-full w-full object-cover"
											/>
										) : subject?.banner ? (
											<Image
												src={subject.banner}
												alt={subject.name || ""}
												fill
												sizes="100%"
												className="object-cover"
											/>
										) : (
											<div className="grid h-full w-full place-items-center text-xs text-neutral-400">
												No preview video available
											</div>
										)}
									</div>

									<div className="w-full space-y-4">
										<div className="flex w-full items-center justify-between border-b border-neutral-100 pb-4">
											<div className="space-y-1">
												<h3 className="font-bold text-lg capitalize text-neutral-900">
													{subject?.name}
												</h3>
												<div className="flex items-center gap-x-4 text-xs text-neutral-500">
													<span>
														Exam: <strong className="text-neutral-800 capitalize">{subject?.examination?.name}</strong>
													</span>
													<span>
														Bundle: <strong className="text-neutral-800 capitalize">{subject?.examination_bundle?.name}</strong>
													</span>
												</div>
											</div>

											<div className="flex items-center gap-2">
												<button
													type="button"
													className="grid size-8 place-items-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600">
													<RiThumbUpLine className="size-4" />
												</button>
												<button
													type="button"
													className="grid size-8 place-items-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600">
													<RiThumbDownLine className="size-4" />
												</button>
											</div>
										</div>

										<div className="space-y-1.5">
											<p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
												Course Description
											</p>
											<div
												className="text-sm text-neutral-600 leading-relaxed first-letter:capitalize"
												dangerouslySetInnerHTML={{ __html: sanitizeHtml(subject?.description) }}
											/>
										</div>
									</div>
								</div>

								{/* Right: Chapter Syllabus */}
								<div className="col-span-2 space-y-4">
									{bundle?.max_subjects === bundle?.number_of_subjects && !hasBoughtCourse ? (
										<div className="flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200 p-3 text-xs text-blue-700">
											<RiInformation2Line className="size-4 shrink-0" />
											<span>You have reached the maximum number of courses for this bundle.</span>
										</div>
									) : null}

									<div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-2xs">
										<div className="border-b border-neutral-100 bg-neutral-50/70 px-4 py-3">
											<p className="text-xs font-bold uppercase tracking-wider text-neutral-700">
												Course Syllabus ({safeChapters.length} Chapters)
											</p>
										</div>

										<div className="divide-y divide-neutral-100">
											{displayedChapters
												.sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0))
												.map((chapter, index) => (
													<div key={chapter?.id || index} className="px-4 py-3 hover:bg-neutral-50/50 transition">
														<p className="text-[11px] font-bold text-primary-700 uppercase">
															Chapter {index + 1}
														</p>
														<p className="text-xs font-semibold capitalize text-neutral-900 mt-0.5">
															{chapter.name}
														</p>
													</div>
												))}
										</div>

										{hasMoreChapters && (
											<button
												type="button"
												onClick={() => setShowAllChapters(!showAllChapters)}
												className="flex w-full items-center justify-center gap-1 border-t border-neutral-100 py-3 text-xs font-bold text-primary-600 hover:bg-primary-50 transition">
												<span>{showAllChapters ? "Show Less" : "See All Chapters"}</span>
												<RiArrowDropDownLine
													className={`size-5 transition-transform duration-300 ${
														showAllChapters ? "rotate-180" : ""
													}`}
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

			<EnrollModal
				open={enrollModalOpen}
				setOpen={setEnrollModalOpen}
				bundleId={bundle_id}
			/>

			{currentBundle && (
				<RenewalModal
					open={renewalModalOpen}
					setOpen={setRenewalModalOpen}
					bundle={currentBundle}
				/>
			)}

			<UpgradePlanModal
				open={upgradeModalOpen}
				setOpen={setUpgradeModalOpen}
				courseTitle={subject?.name}
				bundle={currentBundle ?? null}
			/>
		</>
	);
};

export default Page;
