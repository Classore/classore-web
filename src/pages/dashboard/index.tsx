import { useQueries } from "@tanstack/react-query";
import Link from "next/link";

import {
	Challenge,
	ExplorePopularExams,
	Leaderboard,
	Learning,
	MyCourses,
} from "@/components/home";
import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/z-store";
import type { ChallengeProps } from "@/types";

const challenges: ChallengeProps[] = [];

function greetUser() {
	let greeting: string;
	const hour = new Date().getHours();

	if (hour >= 5 && hour < 12) {
		greeting = "Good morning";
	} else if (hour >= 12 && hour < 18) {
		greeting = "Good afternoon";
	} else if (hour >= 18 && hour < 22) {
		greeting = "Good evening";
	} else {
		greeting = "Good night";
	}

	return greeting;
}

const Page = () => {
	const { user } = useUserStore();

	const [] = useQueries({ queries: [] });

	return (
		<>
			<Seo title="Dashboard" />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 overflow-y-auto px-8 py-6">
					<div className="flex w-full items-center justify-between gap-[177px] rounded-2xl bg-dashboard bg-cover bg-center bg-no-repeat px-10 py-[52px] text-white">
						<div className="flex min-w-[323px] flex-col gap-2">
							<h1 className="font-medium capitalize lg:text-[32px]">
								{greetUser()}, {user?.first_name}
							</h1>
							<p className="">
								Welcome to your dashboard-let&apos;s make progress today. Check your latest
								achievements, track ongoing courses, and take on new challenges to keep learning
								strong!
							</p>
						</div>
						<Button className="w-[182px] px-6 py-3" variant="primary">
							<Link href="/dashboard/categories">Browse Categories</Link>
						</Button>
					</div>

					<div className="flex w-full flex-col gap-4">
						<p className="text-xl font-medium">Overview</p>
						<div className="grid grid-cols-3 gap-4">
							<Learning exam_type="JAMB" />
							<Challenge challenges={challenges} />
							<Leaderboard position={1} />
						</div>
					</div>

					<div className="flex flex-col gap-10 pb-10">
						<MyCourses />
						<ExplorePopularExams />
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
