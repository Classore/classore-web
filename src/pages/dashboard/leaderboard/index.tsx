import {
	RiFlashlightLine,
	RiFullscreenExitLine,
	RiFullscreenLine,
	RiLoaderLine,
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
import { RenewalModal } from "@/components/modals";
import { Pagination, Seo } from "@/components/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib";
import { useGetExamBundles, useGetExams } from "@/queries/school";
import { useGetProfile, useGetLeaderboard } from "@/queries/student";
import { useUserStore } from "@/store/z-store";

const ITEMS_PER_PAGE = 10;

const screens = [
	{ label: "minimize", icon: RiFullscreenExitLine },
	{ label: "maximize", icon: RiFullscreenLine },
] as const;
type Screens = "minimize" | "maximize";

export const getPositionIcon = (index: number) => {
	if (index === 0) {
		return (
			<div className="relative size-6">
				<Image src={gold} alt="award-gold" fill sizes="100%" />
			</div>
		);
	}
	if (index === 1) {
		return (
			<div className="relative size-6">
				<Image src={silver} alt="award-silver" fill sizes="100%" />
			</div>
		);
	}
	if (index === 2) {
		return (
			<div className="relative size-6">
				<Image src={bronze} alt="award-bronze" fill sizes="100%" />
			</div>
		);
	}
	return (
		<div className="grid size-6 place-items-center rounded-full bg-neutral-100 text-xs font-bold text-neutral-500">
			{index + 1}
		</div>
	);
};

const Page = () => {
	const router = useRouter();
	const [examination_bundle, setExaminationBundle] = React.useState("");
	const [screen, setScreen] = React.useState<Screens>("minimize");
	const [examination, setExamination] = React.useState("");
	const [page, setPage] = React.useState(1);
	const [renewalModalOpen, setRenewalModalOpen] = React.useState(false);
	const { user } = useUserStore();
	const { data: profile } = useGetProfile();

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

	React.useEffect(() => {
		if (exams && !examination) {
			setExamination(exams[0]?.examination_id);
		}
	}, [examBundles, examination, examination_bundle, exams]);

	React.useEffect(() => {
		if (examination && examBundles && !examination_bundle) {
			setExaminationBundle(examBundles.data[0]?.examinationbundle_id);
		}
	}, [examBundles, examination_bundle, examination]);

	const { data: leaderboards, isLoading } = useGetLeaderboard({
		examination,
		examination_bundle,
		limit: ITEMS_PER_PAGE,
		page,
	});

	const userOrdinal = React.useCallback(
		(index: number) => {
			if (!leaderboards?.meta?.itemCount) return 0;
			const itemsPerPage = leaderboards.meta.take || 10;
			const currentPage = page;
			const position = (currentPage - 1) * itemsPerPage + index + 1;
			return position;
		},
		[leaderboards?.meta, page]
	);

	const userRank = React.useMemo(() => {
		if (!leaderboards?.data || !user?.id) return "--";
		const foundIndex = leaderboards.data.findIndex((item) => item.user_id === user.id);
		if (foundIndex !== -1) {
			return `#${(page - 1) * ITEMS_PER_PAGE + foundIndex + 1}`;
		}
		return "--";
	}, [leaderboards?.data, user?.id, page]);

	const background = (index: number) => {
		if (index === 1) return "bg-gradient-to-r from-[#fcf4d5] to-white";
		if (index === 2) return "bg-gradient-to-r from-[#f4f5f5] to-white";
		if (index === 3) return "bg-gradient-to-r from-[#f6f2ec] to-white";
		return "bg-transparent";
	};

	const streakVal = (profile as any)?.streak_count ?? (profile as any)?.streak ?? 0;
	const pointsVal = (profile as any)?.quiz_points ?? (profile as any)?.points ?? profile?.wallet?.token_balance ?? 0;

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
							{/* Soft decorative background glows */}
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
						<div className="flex w-full items-center justify-between">
							<div className="flex items-center gap-x-2 overflow-x-auto pb-1">
								{exams?.map((exam) => (
									<button
										key={exam.examination_id}
										className={`flex h-9 shrink-0 items-center rounded-xl px-4 py-0.5 text-xs font-semibold capitalize transition-all ${
											examination === exam.examination_id
												? "bg-primary-600 text-white shadow-xs"
												: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
										}`}
										onClick={() => setExamination(exam.examination_id)}>
										{exam.examination_name}
									</button>
								))}
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

						<div className="flex items-center gap-x-2 overflow-x-auto pb-1">
							{examBundles?.data?.map((bundle) => (
								<button
									key={bundle.examinationbundle_id}
									className={`flex h-8 shrink-0 items-center rounded-lg px-3 py-0.5 text-xs font-semibold uppercase transition-all ${
										examination_bundle === bundle.examinationbundle_id
											? "bg-primary-100 font-bold text-primary-700 border border-primary-200"
											: "text-neutral-500 hover:bg-neutral-100"
									}`}
									onClick={() => setExaminationBundle(bundle.examinationbundle_id)}>
									{bundle.examinationbundle_name}
								</button>
							))}
						</div>

						<div className="flex w-full flex-col items-start gap-6 lg:flex-row">
							<div className="flex flex-1 w-full flex-col gap-4">
								{isLoading ? (
									<div className="grid h-[360px] w-full place-items-center">
										<RiLoaderLine className="size-8 animate-spin text-primary-600" />
									</div>
								) : !leaderboards?.data?.length ? (
									<div className="grid h-[360px] w-full place-items-center rounded-2xl border border-dashed border-neutral-200 p-8 text-center text-xs text-neutral-400">
										No leaderboard participants found for this examination bundle.
									</div>
								) : (
									<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xs">
										{leaderboards.data.map((item, index) => (
											<div
												key={item.leaderboard_id}
												className={`flex items-center justify-between border-b border-neutral-100 p-3.5 sm:p-4 transition ${background(
													userOrdinal(index)
												)}`}>
												<div className="flex items-center gap-3 min-w-0">
													<div className="grid size-7 place-items-center">
														{getPositionIcon(userOrdinal(index) - 1)}
													</div>
													<div className="flex items-center gap-2.5 min-w-0">
														<Avatar className="size-9 rounded-xl border border-neutral-200 bg-primary-50">
															<AvatarImage src={item.user_profile_image || undefined} />
															<AvatarFallback className="text-xs font-bold text-primary-700 uppercase">
																{getInitials(`${item.user_first_name} ${item.user_last_name}`)}
															</AvatarFallback>
														</Avatar>
														<div className="truncate">
															<p className="font-bold text-xs capitalize text-neutral-900 truncate">
																{item.user_first_name} {item.user_last_name}
															</p>
															<p className="text-[10px] text-neutral-400">Student</p>
														</div>
													</div>
												</div>

												<div className="flex items-center gap-2 shrink-0">
													<div className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-white px-2.5 py-1 text-xs font-bold text-neutral-700 shadow-2xs">
														<RiFlashlightLine className="size-3.5 text-amber-500" />
														<span>{item.leaderboard_points} Days</span>
													</div>
													<div className="flex items-center gap-1 rounded-lg bg-primary-50 border border-primary-100 px-2.5 py-1 text-xs font-bold text-primary-800 shadow-2xs">
														<span>{item.leaderboard_points} Pts</span>
													</div>
												</div>
											</div>
										))}
									</div>
								)}

								<Pagination
									current={page}
									onPageChange={setPage}
									pageSize={10}
									total={leaderboards?.meta?.itemCount ?? 0}
								/>
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
										<div className="flex flex-col items-center rounded-xl bg-neutral-50 p-2 text-center">
											<RiFlashlightLine className="size-4 text-amber-500" />
											<p className="font-bold text-xs text-neutral-800 mt-1">{streakVal}d</p>
											<p className="text-[10px] text-neutral-400">Streak</p>
										</div>
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

								{/* Remarks */}
								<div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs space-y-3">
									<p className="text-xs font-bold text-neutral-700">Performance Summary</p>
									<div className="rounded-xl bg-primary-50/60 p-4 text-center">
										<p className="text-2xl font-black text-primary-900">{streakVal > 0 ? `${streakVal} Days` : "Active"}</p>
										<p className="text-xs font-semibold text-primary-700 mt-0.5">Study Consistency</p>
									</div>
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
			</DashboardLayout>
		</>
	);
};

export default Page;
