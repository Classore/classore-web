import { RiShareLine, RiStarFill, RiUserLine } from "@remixicon/react";
import { Devices } from "iconsax-react";
import {
	ArrowRight,
	BookOpen,
	FolderArchive,
	List,
	NotebookText,
	PlayCircle,
	Star,
	Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";

import { BundleSubjects } from "@/components/categories";
import { DashboardLayout } from "@/components/layouts";
import { AddMoreCourseModal, EnrollModal, RenewalModal, ShareReview, UpgradePlanModal } from "@/components/modals";
import { BackBtn, EmptyState, ReviewCard, Seo, Spinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { capitalize, formatCurrency, formatNumber, sanitizeHtml } from "@/lib";
import { useGetBundleSubjects, useGetSingleExamBundleQuery } from "@/queries/school";
import { useGetProfile } from "@/queries/student";

export const Page = () => {
	const router = useRouter();
	const bundleId = router.query.id as string;
	const [renewalModalOpen, setRenewalModalOpen] = React.useState(false);
	const [upgradeModalOpen, setUpgradeModalOpen] = React.useState(false);
	const [enrollModalOpen, setEnrollModalOpen] = React.useState(false);

	const { data: profile } = useGetProfile();
	const { data: bundle, isPending, isError } = useGetSingleExamBundleQuery({
		bundle_id: bundleId,
	});
	const { data: bundleSubjectsData, isLoading: isSubjectsLoading } = useGetBundleSubjects({
		bundle_id: bundleId,
	});

	// Normalize and merge all subjects from bundle and dedicated fetch-all endpoint
	const allSubjects = React.useMemo(() => {
		const map = new Map<string, any>();

		if (bundle?.subjects && Array.isArray(bundle.subjects)) {
			for (const s of bundle.subjects) {
				const id = (s.id || (s as any).subject_id || "").trim();
				if (id) {
					map.set(id, {
						id,
						name: (s.name || (s as any).subject_name || "").trim(),
						number_of_materials: s.number_of_materials,
						total_quizes: s.total_quizes,
						examination_bundle: bundleId,
						videos: s.videos,
					});
				}
			}
		}

		if (bundleSubjectsData && Array.isArray(bundleSubjectsData)) {
			for (const s of bundleSubjectsData) {
				const id = (s.subject_id || (s as any).id || "").trim();
				if (id) {
					const existing = map.get(id) || {};
					map.set(id, {
						...existing,
						id,
						name: (s.subject_name || (s as any).name || existing.name || "").trim(),
						number_of_materials: (s as any).number_of_materials || existing.number_of_materials || 0,
						total_quizes: (s as any).total_quizes || existing.total_quizes || 0,
						examination_bundle: bundleId,
					});
				}
			}
		}

		return Array.from(map.values());
	}, [bundle?.subjects, bundleSubjectsData, bundleId]);

	// Timeline matching (exact mobile parity)
	const currentBundle = profile?.time_line?.find(
		(item) =>
			item.chosen_bundle === bundleId ||
			item.exam_bundle_details?.id === bundleId ||
			item.id === bundleId ||
			(item.chosen_bundle as any)?.id === bundleId
	);

	const isEnrolled = Boolean(currentBundle);
	const isPaid = currentBundle?.is_paid === true;
	const isExpired = currentBundle?.status === "EXPIRED";

	const handleShare = async () => {
		const shareData = {
			title: `${capitalize(bundle?.name ?? "")} Exam Prep Bundle`,
			text: `Prepare and practice effectively for your ${capitalize(
				bundle?.name ?? ""
			)} Exam with Classore. Access comprehensive study materials and expert guidance to excel in your exams.`,
			url: typeof window !== "undefined" ? window.location.href : "",
		};

		if (typeof navigator !== "undefined" && navigator.share) {
			try {
				await navigator.share(shareData);
			} catch {
				// share cancelled
			}
		} else if (typeof navigator !== "undefined" && navigator.clipboard) {
			await navigator.clipboard.writeText(window.location.href);
			toast.success("Link copied to clipboard!");
		}
	};

	return (
		<>
			<Seo title={bundle?.name ? `${capitalize(bundle?.name)} Exam Prep Bundle` : "Bundle Details"} />
			<DashboardLayout>
				{isPending ? (
					<div className="flex w-full flex-col items-center justify-center gap-1 py-12">
						<Spinner variant="primary" />
						<p className="text-xs text-primary-300">Getting bundle details...</p>
					</div>
				) : isError || !bundle ? (
					<div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
						<p className="font-bold text-neutral-800">Unable to load bundle details</p>
						<p className="text-xs text-neutral-500">Please check your internet connection or try again.</p>
						<Button onClick={() => router.reload()} variant="outline" className="text-xs">
							Retry
						</Button>
					</div>
				) : (
					<div className="w-full max-w-full overflow-x-hidden space-y-6">
						{/* Header */}
						<header className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
							<div className="flex flex-col gap-1.5">
								<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
									<BackBtn />
									<h2 className="text-xl font-bold capitalize text-neutral-900">
										{bundle?.name} Exam Prep Bundle
									</h2>
								</div>
								<p className="text-xs capitalize text-neutral-400">
									Categories / {bundle?.name} Prep Bundle
								</p>
							</div>

							<button
								type="button"
								onClick={handleShare}
								className="flex items-center gap-1.5 self-start rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-2xs">
								<RiShareLine className="size-3.5" />
								<span>Share</span>
							</button>
						</header>

						<section className="mb-5 flex flex-col gap-8 lg:grid lg:grid-cols-8">
							{/* Main Left Content */}
							<div className="col-span-5 flex flex-col gap-6 overflow-y-auto">
								<div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-2xl bg-neutral-100">
									<Image
										src={
											bundle?.banner ??
											"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop"
										}
										alt={bundle?.name ?? "Exam Bundle"}
										fill
										sizes="(max-width: 1024px) 100vw, 60vw"
										className="object-cover"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end text-white">
										<p className="text-xs uppercase tracking-widest text-white/70 font-semibold">
											{bundle?.examination?.name || "Target Exam"}
										</p>
										<h1 className="text-2xl sm:text-3xl font-bold capitalize text-white mt-1">
											{bundle?.name} Exam Prep Bundle
										</h1>
										<div className="flex items-center gap-5 mt-3 text-xs sm:text-sm text-white/90">
											<div className="flex items-center gap-1.5">
												<RiStarFill className="size-4 text-[#FFBB0A]" />
												<span>{bundle?.rating ?? 0} ({formatNumber(bundle?.raters ?? 0)})</span>
											</div>
											<div className="flex items-center gap-1.5">
												<RiUserLine className="size-4 text-white" />
												<span>{formatNumber(bundle?.enrolled ?? 0)} Students Enrolled</span>
											</div>
										</div>
									</div>
								</div>

								{/* Summary */}
								<div className="space-y-1.5">
									<h3 className="text-lg font-bold text-neutral-900">Summary</h3>
									<div
										className="text-sm text-neutral-600 leading-relaxed first-letter:capitalize"
										dangerouslySetInnerHTML={{ __html: sanitizeHtml(bundle?.description) }}
									/>
								</div>

								{/* Subjects Included Tags */}
								<div className="space-y-2">
									<h3 className="text-sm font-bold text-neutral-900">Departments Included</h3>
									<div className="flex flex-wrap items-center gap-2.5">
										<span className="rounded-xl border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-2xs">
											Sciences
										</span>
										<span className="rounded-xl border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-2xs">
											Arts & Humanities
										</span>
										<span className="rounded-xl border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-2xs">
											Commercial
										</span>
									</div>
								</div>

								{/* Courses in this Bundle with Full Preview Links */}
								<div className="space-y-3 pt-2">
									<div className="flex items-center justify-between gap-2">
										<div>
											<h3 className="text-lg font-bold text-neutral-900">Courses in this Bundle</h3>
											<p className="text-xs text-neutral-500">
												Preview video lessons, syllabus, and study materials across all {allSubjects.length || 10} subjects
											</p>
										</div>
										<span className="rounded-full bg-primary-50 border border-primary-200 px-3 py-1 text-xs font-bold text-primary-700">
											{allSubjects.length || 10} Subjects
										</span>
									</div>

									{isSubjectsLoading && !allSubjects.length ? (
										<div className="flex items-center justify-center py-8">
											<Spinner variant="primary" />
										</div>
									) : (
										<div className="grid gap-3 sm:grid-cols-2">
											{allSubjects.map((subject) => (
												<div
													key={subject.id}
													className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:border-primary-300 hover:shadow-sm">
													<div className="flex items-start justify-between gap-2 mb-3">
														<div className="flex items-center gap-2.5">
															<div className="flex size-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
																<BookOpen className="size-4" />
															</div>
															<div>
																<h4 className="font-bold text-sm text-neutral-900 capitalize group-hover:text-primary-600 transition-colors">
																	{subject.name}
																</h4>
																<p className="text-[11px] text-neutral-400">
																	35hrs Video Lessons
																</p>
															</div>
														</div>
													</div>

													<div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-xs">
														<div className="flex items-center gap-3 text-neutral-500 text-[11px]">
															{Boolean(subject.number_of_materials) && (
																<span>{subject.number_of_materials} Materials</span>
															)}
															{Boolean(subject.total_quizes) && (
																<span>{subject.total_quizes} Quizzes</span>
															)}
														</div>
														<Link
															href={`/dashboard/categories/${bundleId}/preview/${subject.id}`}
															className="inline-flex items-center gap-1 font-bold text-xs text-primary-600 hover:text-primary-700 group-hover:translate-x-0.5 transition-all">
															<span>Preview Course</span>
															<ArrowRight className="size-3.5" />
														</Link>
													</div>
												</div>
											))}
										</div>
									)}
								</div>

								{/* Reviews Section matching mobile */}
								<div className="space-y-4 pt-2">
									<div className="flex items-center justify-between gap-2">
										<div>
											<h3 className="text-lg font-bold text-neutral-900">Student Reviews</h3>
											<p className="text-xs text-neutral-500">Feedback from learners enrolled in this prep bundle</p>
										</div>
										<ShareReview />
									</div>

									{/* Overall Rating card */}
									<div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50/60 p-4">
										<div className="flex items-center gap-3">
											<span className="text-2xl font-bold text-neutral-900">
												{bundle?.rating ? Number(bundle.rating).toFixed(1) : "0.0"}
											</span>
											<div className="flex items-center gap-1">
												{[1, 2, 3, 4, 5].map((s) => (
													<RiStarFill
														key={s}
														className={`size-4 ${
															s <= Math.round(Number(bundle?.rating ?? 0))
																? "text-[#FFBB0A]"
																: "text-neutral-200"
														}`}
													/>
												))}
											</div>
										</div>
										<span className="text-xs text-neutral-500 font-medium">
											({formatNumber(bundle?.raters ?? 0)} reviews)
										</span>
									</div>

									{bundle?.reviews?.length ? (
										<ul className="grid gap-3 md:grid-cols-2">
											{bundle.reviews.map((item) => (
												<ReviewCard
													review={item}
													key={item.rating_id}
													className="border border-neutral-200 rounded-2xl p-4 bg-white"
												/>
											))}
										</ul>
									) : (
										<EmptyState
											className="w-full py-8"
											illustration={renderStars()}
											subtitle="No reviews yet. Be the first to share your experience!"
										/>
									)}
								</div>
							</div>

							{/* Sidebar / Checkout Card */}
							<div className="col-span-3 flex h-max flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-5 md:p-6 shadow-xs sticky top-4">
								<div className="flex items-center justify-between border-b border-neutral-100 pb-4">
									<div>
										<p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
											Bundle Highlight
										</p>
										<p className="text-lg font-bold text-neutral-900 capitalize mt-0.5">
											{bundle?.name} Prep
										</p>
									</div>

									{isEnrolled ? (
										isExpired ? (
											<span className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-bold text-red-600">
												Expired
											</span>
										) : isPaid ? (
											<span className="rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-bold text-green-700">
												Active Plan
											</span>
										) : (
											<span className="rounded-full bg-primary-50 border border-primary-200 px-3 py-1 text-xs font-bold text-primary-700">
												Free Preview
											</span>
										)
									) : (
										<p className="text-xl font-bold text-primary-700">
											{formatCurrency(bundle?.amount ?? 0)}
										</p>
									)}
								</div>

								{/* State-Aware Action Buttons (Exact Mobile Parity) */}
								<div className="flex flex-col gap-2.5">
									{!isEnrolled ? (
										<div className="flex flex-col gap-2">
											<Button
												onClick={() => setEnrollModalOpen(true)}
												className="w-full h-11 font-bold text-sm bg-primary-600 hover:bg-primary-700">
												Start Learning Free
											</Button>
											<p className="text-center text-[11px] text-neutral-400">
												Instant free access to the first module of every course
											</p>
										</div>
									) : isExpired ? (
										<div className="flex flex-col gap-2">
											<Button
												onClick={() => setRenewalModalOpen(true)}
												className="w-full h-11 font-bold text-sm bg-red-600 hover:bg-red-700 text-white">
												Renew Plan
											</Button>
											<p className="text-center text-[11px] text-neutral-400">
												Renew your subscription to regain access to all video lessons
											</p>
										</div>
									) : !isPaid ? (
										<div className="flex flex-col gap-2">
											<div className="grid grid-cols-2 gap-2">
												<Button
													variant="outline"
													onClick={() => router.push("/dashboard/courses")}
													className="w-full text-xs font-bold">
													Continue Free
												</Button>
												<Button
													onClick={() => setUpgradeModalOpen(true)}
													className="w-full text-xs font-bold bg-primary-600 hover:bg-primary-700 text-white">
													Upgrade Plan
												</Button>
											</div>
											<p className="text-center text-[11px] text-neutral-400">
												Unlock full curriculum with Tokens or Paystack
											</p>
										</div>
									) : (
										<div className="flex flex-col gap-2">
											{bundle?.allow_extra_subjects === "YES" ? (
												<AddMoreCourseModal chosenSubjects={currentBundle?.subjects} />
											) : null}
											<Button
												onClick={() => router.push("/dashboard/courses")}
												className="w-full font-bold text-sm bg-primary-600 hover:bg-primary-700">
												Continue Learning
											</Button>
										</div>
									)}
								</div>

								{/* Bundle Includes List */}
								<div className="space-y-2.5 pt-2 border-t border-neutral-100">
									<h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
										Bundle Includes:
									</h4>
									<ul className="flex flex-col gap-3 rounded-xl bg-neutral-50 p-3.5 text-xs text-neutral-600">
										<li className="flex items-center gap-2.5">
											<PlayCircle className="size-4 text-primary-600 shrink-0" />
											<span>35hrs on Demand Prerecorded Videos</span>
										</li>
										<li className="flex items-center gap-2.5">
											<FolderArchive className="size-4 text-primary-600 shrink-0" />
											<span>{bundle?.number_of_subjects || 4} Subjects from all departments</span>
										</li>
										<li className="flex items-center gap-2.5">
											<NotebookText className="size-4 text-primary-600 shrink-0" />
											<span>{bundle?.average_downloadable_materials || 0} Downloadable Materials per Subject</span>
										</li>
										<li className="flex items-center gap-2.5">
											<List className="size-4 text-primary-600 shrink-0" />
											<span>Interactive Quizzes & Practice Tests</span>
										</li>
										<li className="flex items-center gap-2.5">
											<Devices className="size-4 text-primary-600 shrink-0" />
											<span>Access on Web and Mobile App</span>
										</li>
										<li className="flex items-center gap-2.5">
											<Wifi className="size-4 text-primary-600 shrink-0" />
											<span>Full Time Access</span>
										</li>
									</ul>
								</div>

								{/* All Courses in this Bundle */}
								<div className="space-y-2 pt-2 border-t border-neutral-100">
									<div className="flex items-center justify-between">
										<h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
											Included Courses:
										</h4>
										<span className="text-[11px] font-semibold text-primary-600">
											{allSubjects.length} subjects
										</span>
									</div>
									<BundleSubjects subjects={allSubjects} bundleId={bundleId} />
								</div>
							</div>
						</section>
					</div>
				)}
			</DashboardLayout>

			{/* Dialog Modals */}
			<EnrollModal
				open={enrollModalOpen}
				setOpen={setEnrollModalOpen}
				bundleId={bundleId}
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
				courseTitle={bundle?.name}
				bundle={currentBundle ?? null}
			/>
		</>
	);
};

const renderStars = () => {
	return (
		<div className="flex items-center gap-1 justify-center py-2">
			{[...Array(5)].map((_, i) => (
				<Star key={i} className="size-4 text-[#FFC107]" />
			))}
		</div>
	);
};

export default Page;
