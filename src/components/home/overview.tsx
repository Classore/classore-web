import Image from "next/image";
import Link from "next/link";
import React from "react";

import listening from "@/assets/illustrations/listening.svg";
import solarsystem from "@/assets/illustrations/solar-system.svg";
import trophy from "@/assets/illustrations/trophy.svg";
import { Button } from "@/components/ui/button";
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
			<div className="relative flex aspect-[1.81/1] min-h-[210px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#e2e4e9] p-5 shadow-sm transition-all hover:shadow-md">
				<div className="pointer-events-none absolute -bottom-5 right-0 aspect-square w-[205px] opacity-80 lg:opacity-100">
					<Image
						src={listening}
						alt="listening"
						fill
						sizes="(max-width:1024px)100%"
						className="object-contain"
					/>
				</div>

				<div className="relative z-10 flex w-full max-w-[65%] flex-col gap-1">
					<p className="text-xs font-semibold text-primary-600">
						📚 Continue Where You Left Off
					</p>
					<h3
						className="text-base font-bold capitalize text-neutral-800 truncate"
						title={continueCourse.subject_name}>
						{continueCourse.subject_name}
					</h3>
					<p className="text-xs text-neutral-600 truncate">
						{continueCourse.chapter_name
							? `Chapter: ${continueCourse.chapter_name}`
							: continueCourse.examBundle_name}
					</p>

					{/* Progress bar */}
					<div className="flex w-full flex-col gap-1 mt-1.5">
						<div className="flex items-center justify-between text-xs font-medium text-neutral-600">
							<span className="text-primary-700 font-semibold">{progress}% completed</span>
						</div>
						<div className="h-2 w-full max-w-[200px] rounded-full bg-neutral-300/80 overflow-hidden">
							<div
								className="h-full rounded-full bg-primary-500 transition-all duration-500"
								style={{ width: `${progress}%` }}
							/>
						</div>
					</div>
				</div>

				<Button asChild className="relative z-10 w-fit px-5 py-2 text-sm shadow-sm" variant="dark">
					<Link
						href={`/dashboard/courses/${continueCourse.course_id}?bundle=${continueCourse.course_chosen_bundle}`}>
						Continue Learning
					</Link>
				</Button>
			</div>
		);
	}

	// Case 2: Subscribed user but no ongoing courses yet
	if (hasActiveSubscription && (!courses || courses.length === 0)) {
		return (
			<div className="relative flex aspect-[1.81/1] min-h-[210px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#e2e4e9] p-5 shadow-sm transition-all hover:shadow-md">
				<div className="pointer-events-none absolute -bottom-5 right-0 aspect-square w-[205px] opacity-80 lg:opacity-100">
					<Image
						src={listening}
						alt="listening"
						fill
						sizes="(max-width:1024px)100%"
						className="object-contain"
					/>
				</div>
				<div className="relative z-10 flex w-full max-w-[65%] flex-col gap-2">
					<p className="font-semibold text-neutral-800">My Learning</p>
					<p className="text-sm text-neutral-600">
						You haven&apos;t started your learning yet. Let&apos;s get started with your{" "}
						{exam_type || "exam"} courses!
					</p>
				</div>
				<Button asChild className="relative z-10 w-fit px-5 py-2 text-sm shadow-sm" variant="dark">
					<Link href="/dashboard/courses">Start Learning</Link>
				</Button>
			</div>
		);
	}

	// Case 3: Free / Unsubscribed user
	return (
		<div className="relative flex aspect-[1.81/1] min-h-[210px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#e2e4e9] p-5 shadow-sm transition-all hover:shadow-md">
			<div className="pointer-events-none absolute -bottom-5 right-0 aspect-square w-[205px] opacity-80 lg:opacity-100">
				<Image
					src={listening}
					alt="listening"
					fill
					sizes="(max-width:1024px)100%"
					className="object-contain"
				/>
			</div>
			<div className="relative z-10 flex w-full max-w-[65%] flex-col gap-2">
				<p className="font-semibold text-neutral-800 flex items-center gap-1.5">
					🚀 Unlock Premium Learning
				</p>
				<p className="text-sm text-neutral-600">
					Access full exam prep bundles, interactive quizzes, video lessons, and leaderboard rewards.
				</p>
			</div>
			<Button asChild className="relative z-10 w-fit px-5 py-2 text-sm shadow-sm" variant="dark">
				<Link href="/dashboard/categories">Get Premium</Link>
			</Button>
		</div>
	);
};

const Challenge = ({ challenges: _challenges }: { challenges?: ChallengeProps[] } = {}) => {
	const { data: profile } = useGetProfile();
	const points = profile?.classore_points ?? 0;

	return (
		<div className="relative flex aspect-[1.81/1] min-h-[210px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#e2e4e9] p-5 shadow-sm transition-all hover:shadow-md">
			<div className="pointer-events-none absolute -top-4 -right-2 aspect-square w-[135px] opacity-75 lg:opacity-90">
				<Image
					src={solarsystem}
					alt="solarsystem"
					fill
					sizes="(max-width:1024px)100%"
					className="object-contain"
				/>
			</div>

			<div className="relative z-10 flex w-full flex-col gap-2.5">
				<div className="flex items-center gap-1.5">
					<span className="text-base">🎯</span>
					<p className="font-semibold text-neutral-800">Today&apos;s Mission</p>
				</div>

				<div className="flex w-full max-w-[62%] flex-col gap-2">
					<div className="flex items-start gap-2">
						<span className="text-sm shrink-0">🎁</span>
						<p className="text-xs leading-snug text-neutral-700">
							Complete a module & quiz to gain <span className="font-semibold text-neutral-900">+5 XP</span>
						</p>
					</div>

					<div className="flex items-start gap-2">
						<span className="text-sm shrink-0">💰</span>
						<p className="text-xs leading-snug text-neutral-700">
							Invite friends to earn points & token rewards
						</p>
					</div>
				</div>
			</div>

			<div className="relative z-10 flex items-center justify-between pt-1">
				<Link
					href="/dashboard/wallet"
					className="text-xs font-semibold text-secondary-600 underline hover:text-secondary-700 transition-colors">
					{points > 0 ? `Claim / View ${points} Points →` : "View Wallet & Token Rewards →"}
				</Link>
			</div>
		</div>
	);
};

const Leaderboard = ({ position }: { position?: number } = {}) => {
	const { data: profile } = useGetProfile();

	// Use real ranking from profile or position prop
	const rank = profile?.ranking ?? position ?? 0;
	const rankText = rank > 0 ? getOrdinal(rank) : "Unranked";

	return (
		<div className="relative flex aspect-[1.81/1] min-h-[210px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#e2e4e9] p-5 shadow-sm transition-all hover:shadow-md">
			<div className="pointer-events-none absolute -bottom-5 right-0 aspect-square w-[170px] opacity-70 lg:opacity-100">
				<Image
					src={trophy}
					alt="trophy"
					fill
					sizes="(max-width:1024px)100%"
					className="object-contain"
				/>
			</div>

			<div className="relative z-10 flex w-full max-w-[65%] flex-col gap-1.5">
				<p className="font-semibold text-neutral-800">Leaderboard</p>
				<p className="text-xs text-neutral-600">
					🏆 Boost your leaderboard ranking by completing quizzes and chapters to stay on top!
				</p>
			</div>

			<div className="relative z-10 flex flex-col gap-1">
				<div className="flex items-center gap-1.5 text-sm text-neutral-700">
					Position:{" "}
					<span className="text-base font-bold text-primary-600">
						{rankText}
					</span>
					{profile?.classore_points ? (
						<span className="text-xs text-neutral-500 font-normal">
							({profile.classore_points} pts)
						</span>
					) : null}
				</div>

				<Link
					href="/dashboard/leaderboard"
					className="text-xs font-semibold text-primary-600 underline hover:text-primary-700 transition-colors">
					View Full Leaderboard →
				</Link>
			</div>
		</div>
	);
};

export { Challenge, Leaderboard, Learning };
