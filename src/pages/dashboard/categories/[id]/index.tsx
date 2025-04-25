import { RiStarFill } from "@remixicon/react";
import { Devices } from "iconsax-react";
import {
	FolderArchive,
	List,
	NotebookText,
	PlayCircle,
	Share,
	Star,
	User,
	Wifi,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";

import { BundleSubjects } from "@/components/categories";
import { DashboardLayout } from "@/components/layouts";
import { AddMoreCourseModal, EnrollModal, RenewalModal, ShareReview } from "@/components/modals";
import { BackBtn, EmptyState, ReviewCard, Seo, Spinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useDeviceWidth } from "@/hooks";
import { capitalize, formatCurrency, formatNumber, sanitizeHtml } from "@/lib";
import { useGetSingleExamBundleQuery } from "@/queries/school";
import { useGetProfile } from "@/queries/student";

const PLAN_STATUS = {
	ONGOING: {
		text: "Active Plan",
		color: "bg-secondary-100 text-secondary-300",
	},
	EXPIRED: {
		text: "Plan Expired",
		color: "bg-red-100 text-red-600",
	},
};

const Page = () => {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const { isMobile } = useDeviceWidth();

	const { data: profile } = useGetProfile();
	const { data: bundle, isPending } = useGetSingleExamBundleQuery({
		bundle_id: router.query.id as string,
	});

	const currentBundle = profile?.time_line.find(
		(item) => item.exam_bundle_details.id === router.query.id
	);

	return (
		<>
			<Seo title={bundle?.name ? `${capitalize(bundle?.name)} Exam Prep Bundle` : "Bundle Details"} />

			<DashboardLayout>
				<>
					{isPending ? (
						<div className="flex w-full flex-col items-center justify-center gap-1 py-4">
							<Spinner variant="primary" />
							<p className="text-xs text-primary-300">Getting bundle details...</p>
						</div>
					) : (
						<>
							<div className="w-full max-w-full overflow-x-hidden">
								<header className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
									<div className="flex flex-col gap-2">
										<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
											<BackBtn />

											<h2 className="text-xl font-medium capitalize text-neutral-900">
												{bundle?.name} Exam Prep Bundle
											</h2>
										</div>

										<p className="text-xs capitalize text-neutral-400">
											Categories / {bundle?.name} Prep Bundle
										</p>
									</div>

									{!isMobile ? (
										<button
											type="button"
											className="flex items-center gap-2 self-start rounded-lg border bg-neutral-100 px-3 py-2 text-neutral-500">
											<span className="text-sm">Share</span>
											<Share className="size-4" />
										</button>
									) : null}
								</header>

								<section className="mb-5 flex flex-col gap-10 lg:grid lg:grid-cols-8">
									<div className="col-span-5 flex flex-col gap-4 overflow-y-auto">
										<div></div>
										<Image
											src={
												bundle?.banner ??
												"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
											}
											alt=""
											width={318}
											height={172}
											className="h-96 w-full rounded-md object-cover"
										/>

										<div className="flex flex-col gap-1">
											<h3 className="text-xl font-medium text-neutral-900">Summary</h3>
											<p
												className="text-sm text-neutral-400 first-letter:capitalize"
												dangerouslySetInnerHTML={{ __html: sanitizeHtml(bundle?.description) }}></p>
										</div>

										<div className="flex flex-col gap-1">
											<h3 className="text-sm font-medium text-neutral-900">Subject Includes:</h3>
										</div>

										<div className="flex flex-col items-center justify-between gap-2 rounded-xl border border-neutral-200 p-4 sm:flex-row">
											<div>
												<div className="flex items-center gap-2">
													<RiStarFill className="size-4 text-[#FFBB0A]" />
													<p className="text-sm text-neutral-500">
														<span className="font-medium">{bundle?.rating}</span> (
														{formatNumber(bundle?.raters ?? 0)} Reviews)
													</p>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<User className="size-4" />
												<p className="text-sm text-neutral-500">
													{formatNumber(bundle?.enrolled ?? 0)} Students Enrolled
												</p>
											</div>
										</div>

										<div className="flex flex-col gap-4">
											<div className="flex items-center justify-between gap-2">
												<h3 className="text-xl font-medium text-neutral-900">Reviews</h3>
												<ShareReview />
											</div>
											{bundle?.reviews.length ? (
												<ul className="grid gap-4 md:grid-cols-2">
													{bundle?.reviews.map((item) => (
														<ReviewCard
															review={item}
															key={item.rating_id}
															className="border border-neutral-200"
														/>
													))}
												</ul>
											) : (
												<EmptyState
													className="w-full"
													illustration={renderStars()}
													subtitle="No reviews here yet"
												/>
											)}
										</div>
									</div>

									{/* sidebar */}
									<div className="col-span-3 flex h-max flex-col gap-4 rounded-xl border border-neutral-200 p-4 md:p-6">
										<div className="flex items-center justify-between border-b border-b-neutral-200 pb-4">
											<p className="font-bold text-neutral-700">Bundle Highlight</p>

											{bundle?.is_bought ? (
												<p
													className={`rounded-full ${
														PLAN_STATUS[currentBundle?.status as keyof typeof PLAN_STATUS]?.color
													} px-4 py-1.5 text-sm`}>
													{PLAN_STATUS[currentBundle?.status as keyof typeof PLAN_STATUS]?.text}
												</p>
											) : (
												<p className="text-xl font-bold text-neutral-700">
													{formatCurrency(bundle?.amount ?? 0)}
												</p>
											)}
										</div>

										<div className="flex flex-col gap-2 border-b border-b-neutral-200 pb-4">
											{bundle?.is_bought ? (
												<>
													{currentBundle?.status === "EXPIRED" ? (
														<Button onClick={() => setOpen(true)}>Renew Plan</Button>
													) : (
														<Button onClick={() => router.push("/dashboard/courses")}>Continue Learning</Button>
													)}
													{bundle.allow_extra_subjects === "YES" ? (
														<AddMoreCourseModal
															chosenSubjects={currentBundle?.subjects}
															// disabled={
															// 	currentBundle &&
															// 	currentBundle.status === 'EXPIRED'
															// }
														/>
													) : null}
												</>
											) : (
												<EnrollModal />
											)}
										</div>

										<div className="flex flex-col gap-2 pt-4">
											<h4 className="font-bold text-neutral-700">Bundles Includes:</h4>

											<ul className="flex flex-col gap-4 rounded-xl bg-neutral-100 p-4">
												<li className="flex items-center gap-2 text-sm text-neutral-400">
													<PlayCircle className="size-4" />
													<span>35hrs on Demand Prerecorded Videos </span>
												</li>
												<li className="flex items-center gap-2 text-sm text-neutral-400">
													<FolderArchive className="size-4" />
													<span>{bundle?.number_of_subjects} Subjects from all departments </span>
												</li>
												<li className="flex items-center gap-2 text-sm text-neutral-400">
													<NotebookText className="size-4" />
													<span>
														{bundle?.average_downloadable_materials} Downloadable Material Per Subject{" "}
													</span>
												</li>
												<li className="flex items-center gap-2 text-sm text-neutral-400">
													<List className="size-4" />
													<span>Interactive Quizzes and Practice Tests </span>
												</li>
												<li className="flex items-center gap-2 text-sm text-neutral-400">
													<Devices className="size-4" />
													<span>Access on web and Mobile App</span>
												</li>
												<li className="flex items-center gap-2 text-sm text-neutral-400">
													<Wifi className="size-4" />
													<span>Full Time Access</span>
												</li>
											</ul>
										</div>

										<div className="flex flex-col gap-4 pt-4">
											<h4 className="font-bold text-neutral-700">All Courses:</h4>
											<BundleSubjects subjects={bundle?.subjects ?? []} />
										</div>
									</div>
								</section>
							</div>
						</>
					)}
				</>
			</DashboardLayout>
			{currentBundle && <RenewalModal open={open} setOpen={setOpen} bundle={currentBundle} />}
		</>
	);
};

const renderStars = () => {
	return (
		<div className="flex items-center gap-1 overflow-x-auto">
			{[...Array(5)].map((_, i) => (
				<Star key={i} className="size-4 text-[#FFC107]" />
			))}
		</div>
	);
};

export default Page;
