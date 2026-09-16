import {
	RiFlashlightLine,
	RiFullscreenExitLine,
	RiFullscreenLine,
	RiLoaderLine,
	RiSearchLine,
} from "@remixicon/react";
import { Target04, Trophy01 } from "@untitled-ui/icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import trophy from "@/assets/illustrations/Classore_Golden_Trophy.svg";
import bronze from "@/assets/images/award-bronze.png";
import gold from "@/assets/images/award-gold.png";
import silver from "@/assets/images/award-silver.png";
import { DashboardLayout } from "@/components/layouts";
import { RenewalModal, StreakProgressModal } from "@/components/modals";
import { Pagination, Seo } from "@/components/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib";
import { useGetExamBundles, useGetExams } from "@/queries/school";
import {
	useGetProfile,
	useGetLeaderboard,
	type LeaderboardItem,
} from "@/queries/student";
import { useUserStore } from "@/store/z-store";

const ITEMS_PER_PAGE = 10;

const screens = [
	{ label: "minimize", icon: RiFullscreenExitLine },
	{ label: "maximize", icon: RiFullscreenLine },
] as const;
type Screens = "minimize" | "maximize";

export const getPositionIcon = (positionStr: string | number) => {
	const pos = typeof positionStr === "string" ? Number.parseInt(positionStr, 10) : positionStr;
	if (pos === 1) {
		return (
			<div className="relative size-6">
				<Image src={gold} alt="award-gold" fill sizes="100%" />
			</div>
		);
	}
	if (pos === 2) {
		return (
			<div className="relative size-6">
				<Image src={silver} alt="award-silver" fill sizes="100%" />
			</div>
		);
	}
	if (pos === 3) {
		return (
			<div className="relative size-6">
				<Image src={bronze} alt="award-bronze" fill sizes="100%" />
			</div>
		);
	}
	return (
		<div className="grid size-6 place-items-center rounded-full bg-neutral-100 text-xs font-bold text-neutral-500">
			{pos || "-"}
		</div>
	);
};

const WebLeaderboardPodium = ({ topThree }: { topThree: LeaderboardItem[] }) => {
	if (!topThree || topThree.length === 0) return null;

	const first = topThree[0];
	const second = topThree.length > 1 ? topThree[1] : null;
	const third = topThree.length > 2 ? topThree[2] : null;

	const renderPedestal = (item: LeaderboardItem | null, place: 1 | 2 | 3) => {
		if (!item) return <div className="flex-1" />;

		const isFirst = place === 1;
		const medal = isFirst ? gold : place === 2 ? silver : bronze;
		const borderColor = isFirst
			? "border-amber-400 shadow-amber-100"
			: place === 2
			? "border-slate-300 shadow-slate-100"
			: "border-amber-700/60 shadow-amber-50";

		const pedestalBg = isFirst
			? "bg-gradient-to-b from-amber-100/90 to-amber-50/40 border-amber-200"
			: place === 2
			? "bg-gradient-to-b from-slate-100/90 to-slate-50/40 border-slate-200"
			: "bg-gradient-to-b from-amber-100/60 to-orange-50/30 border-amber-200/60";

		const height = isFirst ? "h-32" : place === 2 ? "h-24" : "h-20";
		const badgeColor = isFirst
			? "bg-amber-500 text-white"
			: place === 2
			? "bg-slate-600 text-white"
			: "bg-amber-800 text-white";

		return (
			<div className="flex flex-1 flex-col items-center justify-end">
				<div className="relative mb-2 flex flex-col items-center">
					<div className={`relative rounded-full border-2 ${borderColor} p-0.5 shadow-sm`}>
						<Avatar className={`${isFirst ? "size-16 sm:size-20" : "size-12 sm:size-14"} rounded-full border border-white bg-primary-50`}>
							<AvatarImage src={item.user_profile_image || undefined} />
							<AvatarFallback className="text-xs font-bold uppercase text-primary-700">
								{getInitials(`${item.user_first_name} ${item.user_last_name}`)}
							</AvatarFallback>
						</Avatar>
						<div className="absolute -top-2 -right-1 size-6">
							<Image src={medal} alt={`award-${place}`} fill sizes="100%" />
						</div>
					</div>

					<p className="mt-2 text-xs font-bold capitalize text-neutral-900 truncate max-w-[110px] text-center">
						{item.user_first_name} {item.user_last_name}
					</p>
					<span className="mt-1 rounded-full bg-white border border-neutral-200 px-2.5 py-0.5 text-[10px] font-bold text-primary-700 shadow-2xs">
						{item.leaderboard_points} pts
					</span>
				</div>

				<div className={`w-full ${height} ${pedestalBg} rounded-t-2xl border-t border-x flex flex-col items-center pt-2.5 transition-all`}>
					<span className={`grid size-6 place-items-center rounded-full ${badgeColor} text-xs font-bold shadow-2xs`}>
						{item.position || place}
					</span>
				</div>
			</div>
		);
	};

	return (
		<div className="w-full rounded-2xl border border-neutral-200/80 bg-white/70 p-4 sm:p-6 shadow-2xs">
			<div className="flex items-end justify-center gap-3 sm:gap-6">
				{renderPedestal(second, 2)}
				{renderPedestal(first, 1)}
				{renderPedestal(third, 3)}
			</div>
		</div>
	);
};

const Page = () => {
	const router = useRouter();
	const [examination_bundle, setExaminationBundle] = React.useState("");
	const [screen, setScreen] = React.useState<Screens>("minimize");
	const [examination, setExamination] = React.useState("");
	const [page, setPage] = React.useState(1);
	const [search, setSearch] = React.useState("");
	const [debouncedSearch, setDebouncedSearch] = React.useState("");
	const [renewalModalOpen, setRenewalModalOpen] = React.useState(false);
	const [streakModalOpen, setStreakModalOpen] = React.useState(false);
	const { user } = useUserStore();
	const { data: profile } = useGetProfile();

	// Debounce search input
	React.useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search.trim());
		}, 350);
		return () => clearTimeout(timer);
	}, [search]);

	const hasActiveSub = React.useMemo(() => {
		if (!profile?.time_line || !profile.time_line.length) return false;
		return profile.time_line.some(
			(t: any) =>
				t.is_paid &&
				(t.status === "ACTIVE" || t.status === "ONGOING") &&
				(!t.end_date || new Date(t.end_date).getTime() > Date.now())
		);
	}, [profile?.time_line]);

	const expiredBundle = React.useMemo(() => {
		if (!profile?.time_line || !profile.time_line.length) return null;
		return (
			profile.time_line.find((t: any) => t.status === "EXPIRED") ||
			profile.time_line.find((t: any) => t.is_paid) ||
			profile.time_line[0] ||
			null
		);
	}, [profile?.time_line]);

	const isExpiredStudent = React.useMemo(() => {
		if (hasActiveSub) return false;
		if (!profile?.time_line || !profile.time_line.length) return false;
		return profile.time_line.some(
			(t: any) =>
				t.status === "EXPIRED" ||
				t.is_paid ||
				(t.end_date && new Date(t.end_date).getTime() <= Date.now())
		);
	}, [hasActiveSub, profile?.time_line]);

	const isNewStudent = !hasActiveSub && !isExpiredStudent;

	const handleSubscribe = () => {
		router.push("/dashboard/categories");
	};

	const handleRenew = () => {
		if (expiredBundle) {
			setRenewalModalOpen(true);
		} else {
			router.push("/dashboard/categories");
		}
	};

	const { data: exams } = useGetExams();
	const { data: examBundles } = useGetExamBundles({
		examination: examination,
		limit: 50,
	});

	// Smart-default exam
	React.useEffect(() => {
		if (exams?.length && !examination) {
			const enrolledExam = profile?.time_line?.[0]?.exam?.id;
			if (enrolledExam && exams.some((e) => e.examination_id === enrolledExam)) {
				setExamination(enrolledExam);
			} else {
				setExamination(exams[0]?.examination_id);
			}
		}
	}, [exams, examination, profile?.time_line]);

	// Smart-default bundle
	React.useEffect(() => {
		if (examination && examBundles?.data?.length && !examination_bundle) {
			const enrolledBundle = profile?.time_line?.[0]?.exam_bundle_details?.id;
			if (enrolledBundle && examBundles.data.some((b) => b.examinationbundle_id === enrolledBundle)) {
				setExaminationBundle(enrolledBundle);
			} else {
				setExaminationBundle(examBundles.data[0]?.examinationbundle_id);
			}
		}
	}, [examBundles, examination_bundle, examination, profile?.time_line]);

	const { data: leaderboards, isLoading } = useGetLeaderboard({
		examination,
		examination_bundle,
		limit: ITEMS_PER_PAGE,
		page,
		search: debouncedSearch,
	});

	const rawMyRank = leaderboards?.my_leader_board?.[0];
	const isUserRanked = (Number(rawMyRank?.leaderboard_points) || 0) > 0;
	const myRank = isUserRanked ? rawMyRank : null;

	const userRank = React.useMemo(() => {
		if (myRank?.position) return `#${myRank.position}`;
		return "Unranked";
	}, [myRank?.position]);

	const background = (positionStr: string | number) => {
		const pos = typeof positionStr === "string" ? Number.parseInt(positionStr, 10) : positionStr;
		if (pos === 1) return "bg-gradient-to-r from-[#fcf4d5] to-white";
		if (pos === 2) return "bg-gradient-to-r from-[#f4f5f5] to-white";
		if (pos === 3) return "bg-gradient-to-r from-[#f6f2ec] to-white";
		return "bg-transparent";
	};

	const streakVal = (profile as any)?.current_streak ?? (profile as any)?.streak_count ?? (profile as any)?.streak ?? 0;
	const pointsVal = React.useMemo(() => {
		if (typeof myRank?.leaderboard_points === "number") return myRank.leaderboard_points;
		return 0;
	}, [myRank?.leaderboard_points]);

	const isSearching = debouncedSearch.length > 0;
	const rankedData = (leaderboards?.data ?? []).filter(
		(item) => (Number(item.leaderboard_points) || 0) > 0
	);
	const topThree = page === 1 && !isSearching ? rankedData.slice(0, 3) : [];
	const listItems = page === 1 && !isSearching && rankedData.length > 3
		? rankedData.slice(3)
		: (page > 1 || isSearching ? rankedData : []);

	return (
		<>
			<Seo title="Leaderboard – Classore" />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-8 px-4 py-6 md:px-8 md:py-9">
					<div className="relative flex h-[329px] w-full flex-col items-center overflow-hidden rounded-3xl border bg-gradient-to-r from-white to-primary-100 py-8">
						<div className="flex max-w-[448px] flex-col items-center gap-2 text-center px-4">
							<h2 className="text-3xl sm:text-[40px] font-bold">Leaderboard</h2>
							<p className="text-xs sm:text-sm text-neutral-500">
								Compete with other students and track your academic ranking. Earn point rewards as you win!
							</p>
						</div>
						<div className="absolute top-[125px] left-1/2 aspect-[1487/1058] w-[260px] sm:w-[280px] -translate-x-1/2">
							<Image
								src={trophy}
								alt="trophy"
								fill
								priority
								sizes="(max-width:1024px)100%"
								className="object-contain"
							/>
						</div>
					</div>

					{/* Placement 1: Top Subscription Message Banner */}
					{!hasActiveSub && (
						<div className="relative overflow-hidden rounded-3xl border border-primary-200/80 bg-gradient-to-r from-primary-50/90 via-white to-amber-50/50 p-5 sm:p-6 md:p-7 shadow-xs">
							<div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-primary-200/30 blur-2xl" />
							<div className="pointer-events-none absolute -left-12 -bottom-12 size-48 rounded-full bg-amber-200/20 blur-2xl" />

							<div className="relative z-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
								<div className="flex items-start gap-4 max-w-2xl">
									<div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white shadow-2xs border border-primary-100 text-2xl">
										{isNewStudent ? "🏆" : "⏸️"}
									</div>
									<div className="space-y-1">
										<h3 className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
											{isNewStudent
												? "Ready to join the leaderboard? 🏆"
												: "Your leaderboard journey is paused"}
										</h3>
										<p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
											{isNewStudent
												? "Subscribe to a Classore plan, start learning and practicing, and earn your place among our top learners."
												: "Renew your subscription to continue competing and appear on the leaderboard again."}
										</p>
									</div>
								</div>

								<div className="shrink-0 w-full md:w-auto">
									{isNewStudent ? (
										<Button
											onClick={handleSubscribe}
											className="w-full md:w-auto px-6 py-3 text-xs sm:text-sm font-semibold shadow-xs"
											variant="default">
											Subscribe & Start Competing
										</Button>
									) : (
										<Button
											onClick={handleRenew}
											className="w-full md:w-auto px-6 py-3 text-xs sm:text-sm font-semibold shadow-xs"
											variant="default">
											Renew Subscription
										</Button>
									)}
								</div>
							</div>
						</div>
					)}

					<div className="flex w-full flex-col gap-y-4">
						{/* Exams and screen toggle */}
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex items-center gap-x-2 overflow-x-auto pb-1">
								{exams?.map((exam) => (
									<button
										key={exam.examination_id}
										className={`flex h-9 shrink-0 items-center rounded-xl px-4 py-0.5 text-xs font-semibold capitalize transition-all ${
											examination === exam.examination_id
												? "bg-primary-600 text-white shadow-xs"
												: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
										}`}
										onClick={() => {
											setExamination(exam.examination_id);
											setExaminationBundle("");
											setPage(1);
										}}>
										{exam.examination_name}
									</button>
								))}
							</div>

							<div className="flex items-center gap-3">
								{/* Search Input */}
								<div className="relative flex-1 sm:w-64">
									<RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
									<input
										type="text"
										value={search}
										onChange={(e) => {
											setSearch(e.target.value);
											setPage(1);
										}}
										placeholder="Search student..."
										className="w-full rounded-xl border border-neutral-200 bg-white py-2 pl-9 pr-3 text-xs placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none shadow-2xs"
									/>
								</div>

								<div className="flex items-center gap-2">
									{screens.map(({ icon: Icon, label }) => (
										<button
											key={label}
											className={`grid size-9 place-items-center rounded-xl transition-all ${screen === label ? "bg-neutral-200" : "hover:bg-neutral-100"}`}
											onClick={() => setScreen(label)}>
											<Icon size={18} />
										</button>
									))}
								</div>
							</div>
						</div>

						{/* Bundles Selection */}
						<div className="flex items-center gap-x-2 overflow-x-auto pb-1">
							{examBundles?.data?.map((bundle) => (
								<button
									key={bundle.examinationbundle_id}
									className={`flex h-8 shrink-0 items-center rounded-lg px-3 py-0.5 text-xs font-semibold uppercase transition-all ${
										examination_bundle === bundle.examinationbundle_id
											? "bg-primary-100 font-bold text-primary-700 border border-primary-200"
											: "text-neutral-500 hover:bg-neutral-100"
									}`}
									onClick={() => {
										setExaminationBundle(bundle.examinationbundle_id);
										setPage(1);
									}}>
									{bundle.examinationbundle_name}
								</button>
							))}
						</div>

						<div className="flex w-full flex-col items-start gap-6 lg:flex-row">
							<div className="flex flex-1 w-full flex-col gap-4">
								{/* Top 3 Podium (when on page 1 and not searching) */}
								{topThree.length > 0 && (
									<WebLeaderboardPodium topThree={topThree} />
								)}

								{isLoading ? (
									<div className="grid h-[360px] w-full place-items-center">
										<RiLoaderLine className="size-8 animate-spin text-primary-600" />
									</div>
								) : !rankedData.length ? (
									<div className="grid h-[360px] w-full place-items-center rounded-2xl border border-dashed border-neutral-200 p-8 text-center text-xs text-neutral-400">
										{isSearching
											? `No ranked students found matching "${debouncedSearch}"`
											: "No ranked learners found in this study pack yet. Pass quizzes to be the first to claim #1!"}
									</div>
								) : (
									<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xs">
										{listItems.map((item) => {
											const isCurrentUser = item.user_id === user?.id;
											return (
												<div
													key={item.leaderboard_id}
													className={`flex items-center justify-between border-b border-neutral-100 p-3.5 sm:p-4 transition ${
														isCurrentUser
															? "bg-primary-50/70 border-l-4 border-l-primary-500"
															: background(item.position)
													}`}>
													<div className="flex items-center gap-3 min-w-0">
														<div className="grid size-7 place-items-center">
															{getPositionIcon(item.position)}
														</div>
														<div className="flex items-center gap-2.5 min-w-0">
															<Avatar className="size-9 rounded-xl border border-neutral-200 bg-primary-50">
																<AvatarImage src={item.user_profile_image || undefined} />
																<AvatarFallback className="text-xs font-bold text-primary-700 uppercase">
																	{getInitials(`${item.user_first_name} ${item.user_last_name}`)}
																</AvatarFallback>
															</Avatar>
															<div className="truncate">
																<div className="flex items-center gap-1.5">
																	<p className="font-bold text-xs capitalize text-neutral-900 truncate">
																		{item.user_first_name} {item.user_last_name}
																	</p>
																	{isCurrentUser && (
																		<span className="rounded bg-primary-100 px-1.5 py-0.2 text-[9px] font-bold text-primary-700">
																			YOU
																		</span>
																	)}
																</div>
																<p className="text-[10px] text-neutral-400 truncate">
																	{item.examination_bundle_name || item.examination_name || "Student"}
																</p>
															</div>
														</div>
													</div>

													<div className="flex items-center gap-2 shrink-0">
														<div className="flex items-center gap-1 rounded-lg bg-primary-50 border border-primary-100 px-2.5 py-1 text-xs font-bold text-primary-800 shadow-2xs">
															<span>{item.leaderboard_points} Pts</span>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								)}

								{rankedData.length > 0 && (
									<Pagination
										current={page}
										onPageChange={setPage}
										pageSize={ITEMS_PER_PAGE}
										total={leaderboards?.meta?.itemCount ?? 0}
									/>
								)}
							</div>

							{/* Right Stats Column */}
							<div
								className={`w-full lg:w-[320px] shrink-0 flex-col gap-5 transition-all ${
									screen === "minimize" ? "flex" : "hidden"
								}`}>
								<div className="flex flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs">
									<Avatar className="size-16 rounded-2xl border-2 border-primary-200 bg-primary-50">
										<AvatarImage src={(profile as any)?.profile_image || (profile as any)?.profile_picture || undefined} />
										<AvatarFallback className="text-xl font-bold uppercase text-primary-700">
											{getInitials(`${profile?.first_name || "U"} ${profile?.last_name || ""}`)}
										</AvatarFallback>
									</Avatar>
									<div className="text-center">
										<p className="font-bold text-sm text-neutral-900 capitalize">
											{profile?.first_name} {profile?.last_name}
										</p>
										<p className="text-xs text-neutral-400 mt-0.5">{profile?.email}</p>
									</div>

									<div className="grid w-full grid-cols-3 gap-2 border-t border-neutral-100 pt-4">
										<div className="flex flex-col items-center rounded-xl bg-neutral-50 p-2 text-center">
											<Trophy01 className="size-4 text-amber-500" />
											<p className="font-bold text-xs text-neutral-800 mt-1">{userRank}</p>
											<p className="text-[10px] text-neutral-400">Rank</p>
										</div>
										<button
											type="button"
											onClick={() => setStreakModalOpen(true)}
											className="flex flex-col items-center rounded-xl bg-amber-50/70 hover:bg-amber-100/80 p-2 text-center transition-all cursor-pointer border border-amber-200/60 active:scale-95">
											<RiFlashlightLine className="size-4 text-amber-600" />
											<p className="font-bold text-xs text-amber-900 mt-1">{streakVal}d</p>
											<p className="text-[10px] text-amber-700 font-medium">Streak 🔥</p>
										</button>
										<div className="flex flex-col items-center rounded-xl bg-neutral-50 p-2 text-center">
											<Target04 className="size-4 text-primary-600" />
											<p className="font-bold text-xs text-neutral-800 mt-1">{pointsVal}p</p>
											<p className="text-[10px] text-neutral-400">Points</p>
										</div>
									</div>
								</div>

								{/* Placement 2: Contextual Status Card in Right Column */}
								{!hasActiveSub && (
									<div className="rounded-2xl border border-primary-200 bg-gradient-to-b from-primary-50/70 via-white to-white p-5 shadow-2xs space-y-3.5 text-center">
										<div className="mx-auto grid size-12 place-items-center rounded-2xl bg-white shadow-2xs border border-primary-100 text-2xl">
											{isNewStudent ? "🏆" : "⏸️"}
										</div>
										<div className="space-y-1.5">
											<h4 className="text-sm font-bold text-neutral-900 leading-snug">
												{isNewStudent
													? "Ready to join the leaderboard? 🏆"
													: "Your leaderboard journey is paused"}
											</h4>
											<p className="text-xs text-neutral-500 leading-relaxed">
												{isNewStudent
													? "Subscribe to a Classore plan, start learning and practicing, and earn your place among our top learners."
													: "Renew your subscription to continue competing and appear on the leaderboard again."}
											</p>
										</div>
										<Button
											onClick={isNewStudent ? handleSubscribe : handleRenew}
											className="w-full text-xs font-semibold shadow-xs"
											variant="default">
											{isNewStudent ? "Subscribe & Start Competing" : "Renew Subscription"}
										</Button>
									</div>
								)}

								{/* Performance Summary */}
								<div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs space-y-3">
									<p className="text-xs font-bold text-neutral-700">Performance Summary</p>
									<button
										type="button"
										onClick={() => setStreakModalOpen(true)}
										className="w-full rounded-xl bg-primary-50/60 hover:bg-primary-100/80 p-4 text-center transition-all cursor-pointer border border-primary-100 block">
										<p className="text-2xl font-black text-primary-900">{streakVal > 0 ? `${streakVal} Days` : "Active"}</p>
										<p className="text-xs font-semibold text-primary-700 mt-0.5">Study Consistency (View Streak →)</p>
									</button>
									<p className="text-[11px] text-neutral-500 text-center leading-relaxed">
										Complete daily video lessons and quizzes to increase your rank and earn Classore bonus points!
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{expiredBundle && (
					<RenewalModal
						open={renewalModalOpen}
						setOpen={setRenewalModalOpen}
						bundle={expiredBundle as any}
					/>
				)}

				<StreakProgressModal
					open={streakModalOpen}
					setOpen={setStreakModalOpen}
				/>
			</DashboardLayout>
		</>
	);
};

export default Page;
