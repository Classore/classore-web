import Image from "next/image";
import Link from "next/link";
import React from "react";

import listening from "@/assets/illustrations/listening.svg";
import solarsystem from "@/assets/illustrations/solar-system.svg";
import trophy from "@/assets/illustrations/trophy.svg";
import { Button } from "@/components/ui/button";
import { StreakProgressModal } from "@/components/modals";
import { useGetMyCourses, useGetProfile } from "@/queries/student";
import type { ChallengeProps } from "@/types";

export const getOrdinal = (n: number): string => {
	if (n <= 0) return "-";
	const s = ["th", "st", "nd", "rd"];
	const v = n % 100;
	return n.toString() + (s[(v - 20) % 10] || s[v] || s[0]);
};

const Learning = ({ exam_type }: { exam_type?: string }) => {
	const { data: profile } = useGetProfile();
	const { data: ongoingCoursesData } = useGetMyCourses({ status: "ONGOING" });

	const [lastWatched, setLastWatched] = React.useState<any>(null);

	React.useEffect(() => {
		try {
			const item = localStorage.getItem("last_watched_course");
			if (item) {
				setLastWatched(JSON.parse(item));
			}
		} catch (e) {
			// ignore
		}
	}, []);

	const timelines = profile?.time_line || (profile as any)?.timeline || [];
	const hasActiveSubscription = timelines.some((t: any) => t.is_paid === true);

	const courses = ongoingCoursesData?.data || [];

	const continueCourse = React.useMemo(() => {
		if (!courses.length && !lastWatched) return null;

		if (lastWatched?.courseId) {
			const match = courses.find((c) => c.course_id === lastWatched.courseId);
			if (match) {
				const effectiveProgress =
					typeof lastWatched.moduleProgress === "number" && lastWatched.moduleProgress > 0
						? lastWatched.moduleProgress
						: (match.course_current_progress_percentage ?? lastWatched.progress ?? 0);

				return {
					course_id: match.course_id,
					subject_name: match.subject_name || lastWatched.subjectName || "Subject",
					examBundle_name: match.examBundle_name || "Exam Prep",
					chapter_name: lastWatched.chapterName || match.chapter_name || "",
					course_current_progress_percentage: effectiveProgress,
					course_chosen_bundle: match.course_chosen_bundle || match.examBundle_id || "",
				};
			}
		}

		// Fallback: Pick ongoing course with highest progress (or first ongoing course)
		const sorted = [...courses].sort(
			(a, b) =>
				(b.course_current_progress_percentage ?? 0) -
				(a.course_current_progress_percentage ?? 0)
		);
		const top = sorted[0];
		if (!top) return null;
		return {
			course_id: top.course_id,
			subject_name: top.subject_name,
			examBundle_name: top.examBundle_name || "Exam Prep",
			chapter_name: top.chapter_name || "",
			course_current_progress_percentage: top.course_current_progress_percentage ?? 0,
			course_chosen_bundle: top.course_chosen_bundle || top.examBundle_id || "",
		};
	}, [courses, lastWatched]);

	// Case 1: Subscribed user with active/ongoing courses
	if (hasActiveSubscription && continueCourse) {
		const progress = Math.min(
			Math.max(Number(continueCourse.course_current_progress_percentage) || 0, 0),
			100
		);

		return (
			<div className="relative flex h-full min-h-[190px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#e2e4e9] p-5 shadow-sm transition-all hover:shadow-md">
				<div className="pointer-events-none absolute -bottom-2 -right-1 aspect-square w-[175px] opacity-85 sm:opacity-95 lg:opacity-100">
					<Image
						src={listening}
						alt="listening"
						fill
						sizes="(max-width:1024px)100%"
						className="object-contain"
					/>
				</div>

				<div className="relative z-10 flex w-full max-w-[65%] flex-col gap-1">
					<p className="text-sm font-bold text-primary-700">
						📚 Continue Where You Left Off
					</p>
					<h3
						className="text-lg sm:text-xl font-bold capitalize text-neutral-900 truncate"
						title={continueCourse.subject_name}>
						{continueCourse.subject_name}
					</h3>
					<p className="text-sm text-neutral-700 font-medium truncate">
						{continueCourse.chapter_name
							? `Chapter: ${continueCourse.chapter_name}`
							: continueCourse.examBundle_name}
					</p>

					{/* Progress bar */}
					<div className="flex w-full flex-col gap-1 mt-1">
						<div className="flex items-center justify-between text-sm font-bold text-primary-700">
							<span>{progress}% completed</span>
						</div>
						<div className="h-2.5 w-full max-w-[200px] rounded-full bg-neutral-300/80 overflow-hidden">
							<div
								className="h-full rounded-full bg-primary-600 transition-all duration-500"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				</div>

				<div className="relative z-10 mt-3">
					<Button asChild className="w-fit px-5 py-2 text-sm font-bold shadow-sm" variant="dark">
						<Link
							href={`/dashboard/courses/${continueCourse.course_id}?bundle=${continueCourse.course_chosen_bundle}`}>
							Continue Learning
						</Link>
					</Button>
				</div>
			</div>
		);
	}

	// Case 2: Subscribed user but no ongoing courses yet
	if (hasActiveSubscription && (!courses || courses.length === 0)) {
		return (
			<div className="relative flex h-full min-h-[190px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#e2e4e9] p-5 shadow-sm transition-all hover:shadow-md">
				<div className="pointer-events-none absolute -bottom-2 -right-1 aspect-square w-[175px] opacity-85 sm:opacity-95 lg:opacity-100">
					<Image
						src={listening}
						alt="listening"
						fill
						sizes="(max-width:1024px)100%"
						className="object-contain"
					/>
				</div>
				<div className="relative z-10 flex w-full max-w-[65%] flex-col gap-1.5">
					<p className="text-lg font-bold text-neutral-900">My Learning</p>
					<p className="text-sm text-neutral-700 leading-relaxed font-medium">
						You haven&apos;t started your learning yet. Let&apos;s get started with your{" "}
						{exam_type || "exam"} courses!
					</p>
				</div>
				<div className="relative z-10 mt-3">
					<Button asChild className="w-fit px-5 py-2 text-sm font-bold shadow-sm" variant="dark">
						<Link href="/dashboard/courses">Start Learning</Link>
					</Button>
				</div>
			</div>
		);
	}

	// Case 3: Free / Unsubscribed user
	return (
		<div className="relative flex h-full min-h-[190px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#e2e4e9] p-5 shadow-sm transition-all hover:shadow-md">
			<div className="pointer-events-none absolute -bottom-2 -right-1 aspect-square w-[175px] opacity-85 sm:opacity-95 lg:opacity-100">
				<Image
					src={listening}
					alt="listening"
					fill
					sizes="(max-width:1024px)100%"
					className="object-contain"
				/>
			</div>
			<div className="relative z-10 flex w-full max-w-[65%] flex-col gap-1.5">
				<p className="text-lg font-bold text-neutral-900 flex items-center gap-2">
					🚀 Unlock Premium Learning
				</p>
				<p className="text-sm text-neutral-700 leading-relaxed font-medium">
					Access full exam prep bundles, interactive quizzes, video lessons, and leaderboard rewards.
				</p>
			</div>
			<div className="relative z-10 mt-3">
				<Button asChild className="w-fit px-5 py-2 text-sm font-bold shadow-sm" variant="dark">
					<Link href="/dashboard/categories">Get Premium</Link>
				</Button>
			</div>
		</div>
	);
};

const Challenge = ({ challenges: _challenges }: { challenges?: ChallengeProps[] } = {}) => {
	const { data: profile } = useGetProfile();
	const points = profile?.classore_points ?? 0;

	return (
		<div className="relative flex h-full min-h-[190px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#e2e4e9] p-5 shadow-sm transition-all hover:shadow-md">
			<div className="pointer-events-none absolute -top-2 -right-1 aspect-square w-[135px] opacity-85 sm:opacity-95 lg:opacity-100">
				<Image
					src={solarsystem}
					alt="solarsystem"
					fill
					sizes="(max-width:1024px)100%"
					className="object-contain"
				/>
			</div>

			<div className="relative z-10 flex w-full flex-col gap-2">
				<div className="flex items-center gap-2">
					<span className="text-lg">🎯</span>
					<p className="text-lg font-bold text-neutral-900">Today&apos;s Mission</p>
				</div>

				<div className="flex w-full max-w-[65%] flex-col gap-1.5">
					<div className="flex items-start gap-2">
						<span className="text-base shrink-0 mt-0.5">🎁</span>
						<p className="text-sm font-medium leading-snug text-neutral-800">
							Complete a module & quiz to gain <span className="font-bold text-neutral-900">+5 XP</span>
						</p>
					</div>

					<div className="flex items-start gap-2">
						<span className="text-base shrink-0 mt-0.5">💰</span>
						<p className="text-sm font-medium leading-snug text-neutral-800">
							Invite friends to earn points & token rewards
						</p>
					</div>
				</div>
			</div>

			<div className="relative z-10 mt-3">
				<Link
					href="/dashboard/wallet"
					className="text-sm font-bold text-secondary-700 underline hover:text-secondary-800 transition-colors">
					{points > 0 ? `Claim / View ${points} Points →` : "View Wallet & Token Rewards →"}
				</Link>
			</div>
		</div>
	);
};

const Leaderboard = ({ position }: { position?: number } = {}) => {
	const { data: profile } = useGetProfile();
	const [streakModalOpen, setStreakModalOpen] = React.useState(false);

	// A student is only ranked if they have accumulated quiz points > 0
	const hasPoints = (profile?.quiz_points ?? 0) > 0;
	const rank = hasPoints ? (profile?.ranking ?? position ?? 0) : 0;
	const rankText = rank > 0 ? getOrdinal(rank) : "Unranked";
	const streak = profile?.current_streak ?? profile?.streak ?? 0;
	const points = profile?.quiz_points ?? 0;

	return (
		<>
			<div className="relative flex h-full min-h-[190px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#e2e4e9] p-5 shadow-sm transition-all hover:shadow-md">
				<div className="pointer-events-none absolute -bottom-2 -right-1 aspect-square w-[155px] opacity-85 sm:opacity-95 lg:opacity-100">
					<Image
						src={trophy}
						alt="trophy"
						fill
						sizes="(max-width:1024px)100%"
						className="object-contain"
					/>
				</div>

				<div className="relative z-10 flex w-full max-w-[65%] flex-col gap-1.5">
					<div className="flex items-center gap-2">
						<p className="text-lg font-bold text-neutral-900">Leaderboard</p>
						{streak > 0 && (
							<button
								type="button"
								onClick={() => setStreakModalOpen(true)}
								className="cursor-pointer rounded-full bg-amber-100 border border-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-800 transition-all hover:bg-amber-200 hover:scale-105 active:scale-95">
								🔥 {streak}d streak
							</button>
						)}
					</div>
					<p className="text-sm font-medium text-neutral-700 leading-snug">
						🏆 Boost your leaderboard ranking by completing quizzes and chapters to stay on top!
					</p>
				</div>

				<div className="relative z-10 flex flex-col gap-1 mt-3">
					<div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-800">
						Position:{" "}
						<span className="text-lg font-black text-primary-700">
							{rankText}
						</span>
						{points > 0 ? (
							<span className="text-sm text-neutral-600 font-normal">
								({points} pts)
							</span>
						) : null}
					</div>

					<div className="flex items-center gap-3">
						<Link
							href="/dashboard/leaderboard"
							className="text-sm font-bold text-primary-700 underline hover:text-primary-800 transition-colors">
							View Full Leaderboard →
						</Link>
						{streak > 0 && (
							<button
								type="button"
								onClick={() => setStreakModalOpen(true)}
								className="text-xs font-bold text-amber-700 hover:text-amber-800 underline transition-colors">
								Streak Details
							</button>
						)}
					</div>
				</div>
			</div>

			<StreakProgressModal open={streakModalOpen} setOpen={setStreakModalOpen} />
		</>
	);
};

export { Challenge, Leaderboard, Learning };
