import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import solarsystem from "@/assets/illustrations/solar-system.svg";
import listening from "@/assets/illustrations/listening.svg";
import trophy from "@/assets/illustrations/trophy.svg";
import { Button } from "@/components/ui/button";
import type { ChallengeProps } from "@/types";

const Learning = ({ exam_type }: { exam_type: string }) => {
	return (
		<div className="relative flex aspect-[1.81/1] w-full flex-col justify-between overflow-hidden rounded-2xl border bg-[#e2e4e9] p-5">
			<div className="absolute -bottom-5 right-0 aspect-square w-[205px]">
				<Image
					src={listening}
					alt="listening"
					fill
					sizes="(max-width:1024px)100%"
					className="object-contain"
				/>
			</div>
			<div className="flex w-full flex-col gap-3">
				<p className="font-medium">My Learning</p>
				<p className="text-sm">
					You haven&apos;t started your learning yet. Let&apos;s get started with {exam_type} this
					morning
				</p>
			</div>
			<Button className="w-fit" variant="dark">
				<Link href="/dashboard/courses">Start Learning</Link>
			</Button>
		</div>
	);
};

const Challenge = ({ challenges }: { challenges: ChallengeProps[] }) => {
	const acquiredPoints = React.useMemo(() => {
		// get completed challenges and add the points
		return challenges.reduce((acc, challenge) => {
			if (challenge.challenges_challenge_is_completed) {
				return acc + challenge.challenges_challenge_points;
			}
			return acc;
		}, 0);
	}, [challenges]);

	return (
		<div className="relative flex aspect-[1.81/1] w-full flex-col gap-6 overflow-hidden rounded-2xl border bg-[#e2e4e9] p-5">
			<div className="absolute -top-5 right-0 aspect-square w-[158px]">
				<Image
					src={solarsystem}
					alt="solarsystem"
					fill
					sizes="(max-width:1024px)100%"
					className="object-contain"
				/>
			</div>
			<p className="font-medium">Daily Challenge</p>
			<div className="flex w-full flex-col">
				<div className="flex w-full flex-col gap-5">
					{challenges.map((challenge) => (
						<div key={challenge.id} className="flex items-center gap-2">
							<div
								className={`grid size-4 place-items-center rounded-full text-white ${challenge.challenges_challenge_is_completed ? "bg-secondary-400" : "bg-neutral-400"}`}>
								<Check className="size-2" />
							</div>
							<p className="text-sm">{challenge.challenges_challenge_name}</p>
						</div>
					))}
				</div>
				<Link href="/dashboard" className="ml-6 text-sm text-secondary-400 underline">
					Claim {acquiredPoints} Points
				</Link>
			</div>
		</div>
	);
};

const Leaderboard = ({ position }: { position: number }) => {
	return (
		<div className="relative flex aspect-[1.81/1] w-full flex-col justify-between overflow-hidden rounded-2xl border bg-[#e2e4e9] p-5">
			<div className="absolute -bottom-5 right-0 aspect-square w-[170px]">
				<Image
					src={trophy}
					alt="trophy"
					fill
					sizes="(max-width:1024px)100%"
					className="object-contain"
				/>
			</div>
			<div className="flex w-full flex-col gap-3">
				<p className="font-medium">Leaderboard</p>
				<p className="text-sm">
					Complete Quizzes with high accuracy to rank higher and earn point rewards
				</p>
			</div>
			<div className="flex items-center gap-2">
				Position: <span className="font-bold">{position}</span>
			</div>
			<Link href="/dashboard/leaderboard" className="text-sm text-primary-400 underline">
				View Leaderboard
			</Link>
		</div>
	);
};

export { Challenge, Leaderboard, Learning };
