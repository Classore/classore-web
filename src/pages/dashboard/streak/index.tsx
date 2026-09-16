import React from "react";
import Link from "next/link";
import { format, startOfWeek, addDays, isSameDay, getDaysInMonth, startOfMonth, getDay } from "date-fns";
import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useGetProfile, useGetStreakTimeline } from "@/queries/student";

import type { StreakTimelineItem } from "@/types";

const MILESTONES = [3, 7, 14, 21, 30, 45, 60, 90, 100, 150, 200, 365];

const StreakPage = () => {
	const [viewMode, setViewMode] = React.useState<"week" | "month">("week");

	const { data: profile } = useGetProfile();
	const userId = profile?.id;

	const { data: todayStreakData } = useGetStreakTimeline({
		user_id: userId,
		timeline: "TODAY",
	});

	const { data: weekStreakData } = useGetStreakTimeline({
		user_id: userId,
		timeline: "THIS_WEEK",
	});

	const { data: monthStreakData } = useGetStreakTimeline({
		user_id: userId,
		timeline: "THIS_MONTH",
	});

	// Core metrics
	const currentStreak = profile?.current_streak ?? profile?.streak ?? 0;
	const longestStreak = profile?.longest_streak ?? currentStreak;
	const activeDaysMonth = profile?.active_days_this_month ?? 0;
	const hoursStudied = profile?.hours_studied ?? 0;

	// Today's minute progress
	const todayHours = Number(todayStreakData?.hour_summary) || 0;
	const todayStreakGaps = (todayStreakData?.streaks || []).reduce(
		(acc: number, s: StreakTimelineItem) => acc + (Number(s.streak?.gap) || 0),
		0
	);
	const todayCalculatedMins = Math.round(Math.max(todayHours, todayStreakGaps) * 60);
	const todayMinutes = Math.min(Math.max(todayCalculatedMins, 0), 10);
	const isTodaySecured =
		todayMinutes >= 10 ||
		todayHours >= 0.16 ||
		(todayStreakData?.streaks?.some((s: StreakTimelineItem) => (Number(s.streak?.gap) || 0) > 0) ?? false);

	// Streak status
	const streakState: "active" | "at_risk" | "broken" = React.useMemo(() => {
		if (isTodaySecured) return "active";
		if (currentStreak > 0) return "at_risk";
		return "broken";
	}, [isTodaySecured, currentStreak]);

	// Milestones & Personal Best
	const nextMilestone = MILESTONES.find((m) => m > currentStreak) ?? currentStreak + 10;
	const daysToMilestone = Math.max(nextMilestone - currentStreak, 1);
	const isLongestStreakRecord = currentStreak >= longestStreak && currentStreak > 0;
	const daysToBeatRecord = Math.max(longestStreak - currentStreak + 1, 1);

	// Week data (Mon -> Sun)
	const now = new Date();
	const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
	const weekDays = React.useMemo(() => {
		const activeDates = new Set(
			(weekStreakData?.streaks || [])
				.filter((s: StreakTimelineItem) => (Number(s.streak?.gap) || 0) > 0)
				.map((s: StreakTimelineItem) => {
					const d = new Date(s.raw_date || s.start || s.day);
					return format(d, "yyyy-MM-dd");
				})
		);

		return Array.from({ length: 7 }, (_, i) => {
			const dayDate = addDays(startOfCurrentWeek, i);
			const dateKey = format(dayDate, "yyyy-MM-dd");
			const isToday = isSameDay(dayDate, now);
			const isPast = dayDate < now && !isToday;
			const isFuture = dayDate > now && !isToday;
			const hasStudied = activeDates.has(dateKey) || (isToday && isTodaySecured);

			return {
				date: dayDate,
				label: format(dayDate, "EEE"),
				dayNum: format(dayDate, "d"),
				isToday,
				isPast,
				isFuture,
				hasStudied,
			};
		});
	}, [startOfCurrentWeek, weekStreakData, now, isTodaySecured]);

	// Month data
	const monthDays = React.useMemo(() => {
		const totalDays = getDaysInMonth(now);
		const firstDayOfMonth = startOfMonth(now);
		const startDayOffset = (getDay(firstDayOfMonth) + 6) % 7; // Mon = 0
		const activeMonthDates = new Set(
			(monthStreakData?.streaks || [])
				.filter((s: StreakTimelineItem) => (Number(s.streak?.gap) || 0) > 0)
				.map((s: StreakTimelineItem) => {
					const d = new Date(s.raw_date || s.start || s.day);
					return format(d, "yyyy-MM-dd");
				})
		);

		const days = [];
		for (let i = 0; i < startDayOffset; i++) {
			days.push({ empty: true, key: `empty-${i}` });
		}
		for (let d = 1; d <= totalDays; d++) {
			const dayDate = new Date(now.getFullYear(), now.getMonth(), d);
			const dateKey = format(dayDate, "yyyy-MM-dd");
			const isToday = isSameDay(dayDate, now);
			const isPast = dayDate < now && !isToday;
			const hasStudied = activeMonthDates.has(dateKey) || (isToday && isTodaySecured);
			days.push({
				empty: false,
				key: `day-${d}`,
				dayNum: d,
				isToday,
				isPast,
				hasStudied,
			});
		}
		return days;
	}, [monthStreakData, now, isTodaySecured]);

	return (
		<>
			<Seo title="Streak Progress | Classore" />
			<DashboardLayout>
				<div className="mx-auto max-w-4xl p-6 sm:p-10 space-y-8">
					{/* Header Row */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div>
							<h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
								🔥 Your Streak Progress
							</h1>
							<p className="text-sm text-neutral-500 mt-1">
								Track your daily consistency, unlock learning records, and keep your study fire burning!
							</p>
						</div>

						<Button asChild variant="dark" className="w-fit font-bold text-xs shadow-sm">
							<Link href="/dashboard/courses">Continue Learning →</Link>
						</Button>
					</div>

					{/* SECTION 1: HERO */}
					<div
						className={`rounded-3xl p-8 text-center border transition-all ${
							streakState === "active"
								? "bg-amber-500/10 border-amber-300"
								: streakState === "at_risk"
								? "bg-amber-500/15 border-amber-300"
								: "bg-neutral-100 border-neutral-300"
						}`}>
						<div className="flex justify-center">
							<div className="size-20 rounded-full bg-white shadow-md flex items-center justify-center text-5xl animate-bounce">
								{streakState === "broken" ? "💤" : "🔥"}
							</div>
						</div>

						<h2 className="text-3xl sm:text-4xl font-black text-neutral-900 mt-4 tracking-tight">
							{currentStreak} DAY STREAK
						</h2>

						<div className="mt-3 flex justify-center">
							<span
								className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold ${
									streakState === "active"
										? "bg-emerald-100 text-emerald-800 border border-emerald-300"
										: streakState === "at_risk"
										? "bg-amber-100 text-amber-900 border border-amber-300"
										: "bg-neutral-200 text-neutral-700 border border-neutral-300"
								}`}>
								<span>{streakState === "active" ? "✅" : streakState === "at_risk" ? "⏳" : "🎯"}</span>
								<span>
									{streakState === "active"
										? "Today's streak secured!"
										: streakState === "at_risk"
										? "Grace Period — Study today to protect your streak"
										: "Start day 1 of your streak today!"}
								</span>
							</span>
						</div>

						<p className="text-sm text-neutral-600 mt-3 max-w-md mx-auto leading-relaxed">
							{streakState === "active"
								? "Incredible work! You have completed your daily study requirement today."
								: streakState === "at_risk"
								? "Protect your streak! Complete at least 10 minutes of learning before midnight."
								: "Top students build daily habits. Spend 10 minutes studying today to ignite your streak."}
						</p>
					</div>

					{/* SECTION 2: 3 STATS BADGES */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-xs">
							<div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-amber-50 text-xl">
								🏆
							</div>
							<p className="text-2xl font-black text-neutral-900">
								{longestStreak} {longestStreak === 1 ? "Day" : "Days"}
							</p>
							<p className="text-xs text-neutral-500 font-semibold mt-0.5">Longest Streak / Personal Best</p>
						</div>

						<div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-xs">
							<div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-primary-50 text-xl">
								📚
							</div>
							<p className="text-2xl font-black text-neutral-900">
								{activeDaysMonth} {activeDaysMonth === 1 ? "Day" : "Days"}
							</p>
							<p className="text-xs text-neutral-500 font-semibold mt-0.5">Active Days This Month</p>
						</div>

						<div className="rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-xs">
							<div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-emerald-50 text-xl">
								⏱️
							</div>
							<p className="text-2xl font-black text-neutral-900">
								{hoursStudied} {hoursStudied === 1 ? "Hr" : "Hrs"}
							</p>
							<p className="text-xs text-neutral-500 font-semibold mt-0.5">Hours Studied This Month</p>
						</div>
					</div>

					{/* 2-Column Section: Week/Month Grid on Left, Goal & Milestones on Right */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* SECTION 3: LEARNING WEEK & CONSISTENCY CALENDAR */}
						<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs space-y-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2 font-bold text-base text-neutral-900">
									<span>🗓️</span>
									<span>
										{viewMode === "week"
											? "Your Learning Week"
											: `${format(now, "MMMM yyyy")} Consistency`}
									</span>
								</div>

								<button
									onClick={() => setViewMode((prev) => (prev === "week" ? "month" : "week"))}
									className="text-xs font-bold text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors">
									{viewMode === "week" ? "Monthly View →" : "← Weekly View"}
								</button>
							</div>

							{viewMode === "week" ? (
								<>
									<div className="grid grid-cols-7 gap-2 pt-2">
										{weekDays.map((item) => (
											<div
												key={item.label}
												className={`flex flex-col items-center justify-center p-3 rounded-2xl text-center transition-all ${
													item.isToday
														? "bg-primary-50 border-2 border-primary-400 shadow-xs"
														: "bg-neutral-50"
												}`}>
												<span
													className={`text-xs font-bold uppercase ${
														item.isToday ? "text-primary-700" : "text-neutral-500"
													}`}>
													{item.label}
												</span>
												<div className="my-2 flex size-8 items-center justify-center text-lg">
													{item.hasStudied ? (
														<span>{item.isToday ? "🔥" : "✅"}</span>
													) : item.isToday ? (
														<span>⏳</span>
													) : item.isPast ? (
														<span className="text-neutral-300 font-bold">—</span>
													) : (
														<span className="text-neutral-300">○</span>
													)}
												</div>
												<span
													className={`text-xs font-medium ${
														item.isToday ? "text-primary-700 font-bold" : "text-neutral-400"
													}`}>
													{item.dayNum}
												</span>
											</div>
										))}
									</div>

									<div className="flex items-center gap-2.5 rounded-xl bg-neutral-50 px-4 py-3 text-xs text-neutral-600">
										<span className="text-base">{isTodaySecured ? "🔥" : "💡"}</span>
										<span>
											{isTodaySecured
												? "Today's streak is safe and locked in for the day!"
												: "Study 10 minutes today to light up today's flame!"}
										</span>
									</div>
								</>
							) : (
								<>
									<div className="pt-2 space-y-2">
										<div className="grid grid-cols-7 text-center text-xs font-bold text-neutral-400">
											{["M", "T", "W", "T", "F", "S", "S"].map((h, i) => (
												<span key={i}>{h}</span>
											))}
										</div>

										<div className="grid grid-cols-7 gap-1.5">
											{monthDays.map((item) => {
												if (item.empty) {
													return <div key={item.key} className="aspect-square" />;
												}

												return (
													<div
														key={item.key}
														className="aspect-square flex items-center justify-center">
														<div
															className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
																item.hasStudied
																	? "bg-amber-500 text-white shadow-xs"
																	: item.isToday
																	? "border-2 border-primary-500 bg-primary-50 text-primary-700"
																	: "bg-neutral-100 text-neutral-600"
															}`}>
															{item.hasStudied ? "🔥" : item.dayNum}
														</div>
													</div>
												);
											})}
										</div>
									</div>

									<div className="flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3 text-xs text-neutral-600">
										<span>Monthly Consistency:</span>
										<span className="font-bold text-neutral-900">
											{activeDaysMonth} active days in {format(now, "MMMM")}
										</span>
									</div>
								</>
							)}
						</div>

						{/* Right Column: Goal & Milestones */}
						<div className="space-y-6">
							{/* SECTION 4: TODAY'S PROGRESS */}
							<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2 font-bold text-base text-neutral-900">
										<span>🎯</span>
										<span>Daily Streak Goal</span>
									</div>
									<span className="text-xs font-bold text-primary-600">
										{todayMinutes} / 10 mins
									</span>
								</div>

								{/* Progress Bar */}
								<div className="h-3.5 w-full rounded-full bg-neutral-100 overflow-hidden border border-neutral-200/60">
									<div
										className={`h-full rounded-full transition-all duration-500 ${
											isTodaySecured ? "bg-emerald-500" : "bg-primary-600"
										}`}
										style={{ width: `${Math.min((todayMinutes / 10) * 100, 100)}%` }}
									/>
								</div>

								<div className="flex items-center gap-2 text-xs text-neutral-600">
									<span>{isTodaySecured ? "🎉" : "⏱️"}</span>
									<span>
										{isTodaySecured
											? "Today's goal complete! Streak secured & extended!"
											: `Just ${Math.max(10 - todayMinutes, 1)} more ${
													10 - todayMinutes === 1 ? "minute" : "minutes"
											  } of study to secure today's streak!`}
									</span>
								</div>

								<Button
									asChild
									className="w-full bg-neutral-900 text-white hover:bg-neutral-800 font-bold text-sm shadow-xs py-3 rounded-xl">
									<Link href="/dashboard/courses">Continue Learning →</Link>
								</Button>
							</div>

							{/* SECTION 5: MOTIVATION & MILESTONES */}
							<div className="rounded-2xl border border-primary-100 bg-gradient-to-r from-primary-50/70 to-amber-50/70 p-6 shadow-xs space-y-3.5">
								<div className="flex items-center gap-2 font-bold text-base text-neutral-900">
									<span>🌟</span>
									<span>Milestone Tracker</span>
								</div>

								{/* Next Milestone */}
								<div className="flex items-center justify-between rounded-xl border border-primary-200/60 bg-white/80 p-3.5">
									<div>
										<p className="text-xs font-medium text-neutral-500">Next Milestone</p>
										<p className="text-base font-bold text-neutral-900 mt-0.5">
											🎯 {nextMilestone} Days Streak
										</p>
									</div>
									<span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-bold text-amber-800">
										{daysToMilestone} {daysToMilestone === 1 ? "day" : "days"} away
									</span>
								</div>

								{/* Personal Best Record */}
								<div className="flex items-center gap-3 rounded-xl border border-primary-200/60 bg-white/80 p-3.5 text-xs text-neutral-700">
									<span className="text-2xl">{isLongestStreakRecord ? "🔥" : "🚀"}</span>
									<p className="leading-snug">
										{isLongestStreakRecord
											? "You're currently on your longest streak ever! Setting a new record every single day."
											: longestStreak > 0
											? `Only ${daysToBeatRecord} ${
													daysToBeatRecord === 1 ? "day" : "days"
											  } away from beating your personal best of ${longestStreak} days!`
											: "Start studying consistently to build your all-time personal best record!"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default StreakPage;
