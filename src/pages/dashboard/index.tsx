import { useQueries } from "@tanstack/react-query"
import Link from "next/link"
import React from "react"

import { Challenge, Leaderboard, Learning } from "@/components/home"
import { DashboardLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/z-store"
import { Seo } from "@/components/shared"

import { challenges } from "@/mock"

const Page = () => {
	const { user } = useUserStore()

	const [] = useQueries({ queries: [] })

	return (
		<>
			<Seo title="Dashboard" />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-8 py-6">
					<div className="flex w-full items-center justify-between gap-[177px] rounded-2xl bg-dashboard bg-cover bg-center bg-no-repeat px-10 py-[52px] text-white">
						<div className="flex min-w-[323px] flex-col gap-2">
							<h1 className="font-medium capitalize lg:text-[32px]">Good Morning, {user?.firstName}</h1>
							<p className="">
								Welcome to your dashboard-let&apos;s make progress today. Check your latest achievements,
								track ongoing courses, and take on new challenges to keep learning strong!
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
					<div className="flex w-full flex-col gap-4">
						<div className="flex items-center">
							<p className="text-xl font-medium">My Courses</p>
						</div>
						<div className="flex w-auto items-center gap-4 overflow-x-auto"></div>
					</div>
					<div className="flex w-full flex-col gap-4">
						<div className="flex items-center">
							<p className="text-xl font-medium">Explore Popular Exams</p>
						</div>
						<div className="flex w-auto items-center gap-4 overflow-x-auto"></div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
