import Image from "next/image"
import React from "react"
import {
	RiFlashlightLine,
	RiFullscreenExitLine,
	RiFullscreenLine,
	RiUserAddLine,
} from "@remixicon/react"

import trophy from "@/assets/illustrations/trophy.svg"
import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

import { leaderboard } from "@/mock"

const filters = ["all", "quiz", "referrals", "streak"] as const
type Filters = (typeof filters)[number]

const screens = [
	{ label: "minimize", icon: RiFullscreenExitLine },
	{ label: "maximize", icon: RiFullscreenLine },
] as const
type Screens = "minimize" | "maximize"

const Page = () => {
	const [screen, setScreen] = React.useState<Screens>("minimize")
	const [filter, setFilter] = React.useState<Filters>("all")
	const [visible] = React.useState(10)

	const overall = React.useMemo(() => {
		return leaderboard.map((user) => ({
			...user,
			all: user.quiz + user.referrals + user.streak,
		}))
	}, [])

	const filtered = React.useMemo(() => {
		return overall.sort((a, b) => b[filter] - a[filter])
	}, [filter, overall])

	// const handleLoadMore = () => {
	// 	setVisible((prev) => Math.min(prev + 10, filtered.length))
	// }

	const background = (index: number) => {
		if (index === 0) return "bg-gradient-to-r from-yellow-100 to-white"
		if (index === 1) return "bg-gradient-to-r from-neutral-100 to-white"
		if (index === 2) return "bg-gradient-to-r from-orange-100 to-white"
		return "bg-neutral-50"
	}

	return (
		<>
			<Seo title="Leaderboard" />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-8 px-8 py-9">
					<div className="relative flex h-[329px] w-full flex-col items-center overflow-hidden rounded-lg border bg-gradient-to-r from-white to-primary-100 py-8">
						<div className="flex max-w-[448px] flex-col items-center gap-2">
							<h2 className="text-[40px] font-bold">Leaderboard</h2>
							<p className="text-center text-neutral-500">
								Explore available categories and unlock your potential. Earn point reward as you win.
							</p>
						</div>
						<div className="absolute left-1/2 top-[120px] aspect-square w-[402px] -translate-x-1/2">
							<Image
								src={trophy}
								alt="trophy"
								fill
								sizes="(max-width:1024px)100%"
								className="object-top"
							/>
						</div>
					</div>
					<div className="flex w-full flex-col gap-4">
						<div className="flex w-full items-center justify-between">
							<div className="flex items-center gap-2">
								{filters.map((f) => (
									<button
										key={f}
										className={`flex h-9 w-[94px] items-center justify-center rounded-md text-sm font-medium capitalize transition-all ${
											filter === f ? "bg-primary-100 font-bold text-primary-500" : "text-neutral-500"
										}`}
										onClick={() => setFilter(f)}>
										{f.charAt(0).toUpperCase() + f.slice(1)}
									</button>
								))}
							</div>
							<div className="flex items-center gap-2">
								{screens.map(({ icon: Icon, label }) => (
									<button
										key={label}
										className={`grid h-10 w-10 place-items-center rounded-md transition-all ${screen === label ? "bg-neutral-200" : "hover:bg-neutral-100"}`}
										onClick={() => setScreen(label)}>
										<Icon size={20} />
									</button>
								))}
							</div>
						</div>
						<div className="flex w-full items-start gap-6">
							<div className="flex-1 rounded-lg border">
								{filtered.slice(0, visible).map((user, index) => (
									<div key={index} className="flex w-full items-center gap-4 border-b last:border-b-0">
										<div
											className={`grid w-full gap-4 rounded-md px-3 py-4 transition-all ${background(index)} ${screen === "maximize" ? "grid-cols-5" : "grid-cols-3"}`}>
											<div className="col-span-2 flex w-full items-center gap-5">
												<div className="size-6"></div>
												<div className="flex items-center gap-2">
													<div className="size-10 rounded-lg border-2 border-white"></div>
													<div className="flex flex-col gap-1">
														<p className="text-sm font-bold">{user.userId}</p>
														<p className="text-xs text-neutral-400">Lagos</p>
													</div>
												</div>
											</div>
											<div className={`w-full items-center ${screen === "minimize" ? "hidden" : "flex"}`}>
												<div className="flex w-fit items-center gap-1 rounded-lg border-2 bg-white px-3 py-[6px] text-sm text-neutral-500">
													<RiUserAddLine size={16} />
													{user.referrals} Referrals
												</div>
											</div>
											<div className={`w-full items-center ${screen === "minimize" ? "hidden" : "flex"}`}>
												<div className="flex w-fit items-center gap-1 rounded-lg border-2 bg-white px-3 py-[6px] text-sm text-neutral-500">
													<RiFlashlightLine size={16} />
													{user.streak} Days
												</div>
											</div>
											<div className="flex w-full items-center">
												<div className="flex w-fit items-center gap-1 rounded-lg border-2 bg-white px-3 py-[6px] text-sm text-neutral-500">
													<span className="size-1 rounded-full bg-black" />
													{user.quiz} Pts
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							<div
								className={`w-[350px] flex-col gap-6 transition-all ${screen === "minimize" ? "flex" : "hidden"}`}>
								<div className="w-full rounded-md border p-4"></div>
								<div className="w-full space-y-2">
									<p className="text-sm font-medium text-neutral-500">Analytics</p>
									<div className="w-full rounded-md border p-4"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
