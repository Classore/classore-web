import { Target04, Trophy01 } from "@untitled-ui/icons-react"
import { useForm } from "react-hook-form"
import Image from "next/image"
import React from "react"
import { RiFlashlightLine, RiFullscreenExitLine, RiFullscreenLine } from "@remixicon/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectItem } from "@/components/ui/select"
import trophy from "@/assets/illustrations/trophy.svg"
import { DashboardLayout } from "@/components/layouts"
import bronze from "@/assets/images/award-bronze.png"
import silver from "@/assets/images/award-silver.png"
import { Pagination, Seo } from "@/components/shared"
import gold from "@/assets/images/award-gold.png"
import { ChartLine } from "@/components/charts"
import { useUserStore } from "@/store/z-store"
import type { UserMetricProps } from "@/types"
import { getInitials, paginate } from "@/lib"

const filters = ["all", "quiz", "streak"] as const
type Filters = (typeof filters)[number]

const timeFilters = [
	"today",
	"yesterday",
	"this week",
	"this month",
	"last 3 months",
	"last 6 months",
	"this year",
] as const

const screens = [
	{ label: "minimize", icon: RiFullscreenExitLine },
	{ label: "maximize", icon: RiFullscreenLine },
] as const
type Screens = "minimize" | "maximize"

export const getPositionIcon = (index: number) => {
	if (index === 0) {
		return (
			<div className="relative size-6">
				<Image src={gold} alt="award-gold" fill sizes="100%" />
			</div>
		)
	}
	if (index === 1) {
		return (
			<div className="relative size-6">
				<Image src={silver} alt="award-silver" fill sizes="100%" />
			</div>
		)
	}
	if (index === 2) {
		return (
			<div className="relative size-6">
				<Image src={bronze} alt="award-bronze" fill sizes="100%" />
			</div>
		)
	}
	return (
		<div className="grid size-6 place-items-center rounded-full bg-neutral-100 text-neutral-500">
			{index + 1}
		</div>
	)
}

const leaderboard: {
	userId: string
	position: number
	id: string
	streak: number
	quiz: number
}[] = []

const Page = () => {
	const [screen, setScreen] = React.useState<Screens>("minimize")
	const [filter, setFilter] = React.useState<Filters>("all")
	const [page, setPage] = React.useState(1)
	const { user } = useUserStore()

	const { control } = useForm({
		defaultValues: { timeline: "today" },
	})

	const paginated = React.useMemo(() => {
		return paginate(leaderboard, page, 10)
	}, [page])

	const background = (index: number) => {
		if (index === 1) return "bg-gradient-to-r from-[#fcf4d5] to-white"
		if (index === 2) return "bg-gradient-to-r from-[#f4f5f5] to-white"
		if (index === 3) return "bg-gradient-to-r from-[#f6f2ec] to-white"
		return "bg-transparent"
	}

	const metrics: UserMetricProps[] = [
		{
			icon: <Trophy01 />,
			label: "Ranking",
			value: "N/A",
		},
		{
			icon: <RiFlashlightLine />,
			label: "Streak",
			value: "N/A",
		},
		{
			icon: <Target04 />,
			label: "Quiz Points",
			value: "N/A",
		},
	]

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
							<div className="flex w-full flex-col gap-4">
								<div className="flex-1 rounded-lg border">
									{paginated.map((user) => (
										<div key={user.id} className="flex w-full items-center gap-4 border-b">
											<div
												className={`grid w-full gap-4 rounded-md px-3 py-4 transition-all ${background(user.position)} grid-cols-4`}>
												<div className="col-span-2 flex w-full items-center gap-5">
													{/* {user.positionIcon} */}
													<div className="flex items-center gap-2">
														<div className="size-10 rounded-lg border-2 border-white"></div>
														<div className="flex flex-col gap-1">
															<p className="text-sm font-bold">{user.userId}</p>
															<p className="text-xs text-neutral-400">Lagos</p>
														</div>
													</div>
												</div>
												<div className={`flex w-full items-center`}>
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
								<Pagination
									current={page}
									onPageChange={setPage}
									pageSize={10}
									total={leaderboard.length}
								/>
							</div>
							<div
								className={`w-[350px] min-w-[350px] flex-col gap-6 transition-all ${screen === "minimize" ? "flex" : "hidden"}`}>
								<div className="flex w-full flex-col items-center gap-4 rounded-md border p-4">
									<div className="flex w-full flex-col items-center gap-2">
										<div className="flex flex-col items-center gap-2">
											<Avatar className="size-12 rounded bg-[#bfdbfe]">
												<AvatarImage src={user?.image} alt={user?.first_name} />
												<AvatarFallback className="text-xl font-semibold">
													{getInitials(`${user?.first_name} ${user?.last_name}`)}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col gap-1">
												<p className="font-bold capitalize">
													{user?.first_name} {user?.last_name}
												</p>
												<p className="text-xs text-neutral-400">{user?.email}</p>
											</div>
										</div>
									</div>
									<div className="grid w-full grid-cols-2 gap-3">
										{metrics.map(({ icon, label, value }) => (
											<div key={label} className="flex items-start gap-4 rounded-lg border p-3">
												<div className="grid size-7 place-items-center rounded-full border">
													{React.cloneElement(icon, { className: "size-[18px]" })}
												</div>
												<div className="">
													<p className="font-bold">{value}</p>
													<p className="text-sm text-neutral-400">{label}</p>
												</div>
											</div>
										))}
									</div>
								</div>
								<div className="w-full space-y-2">
									<p className="text-sm font-medium text-neutral-500">Analytics</p>
									<div className="flex w-full flex-col gap-6 rounded-md border p-4">
										<div className="flex w-full items-center justify-between">
											<p className="font-bold">{0} hours spent</p>
											<Select control={control} name="timeline" className="h-[33px] text-sm">
												{timeFilters.map((filter) => (
													<SelectItem key={filter} value={filter}>
														{filter}
													</SelectItem>
												))}
											</Select>
										</div>
										<ChartLine data={[]} />
									</div>
								</div>
								<div className="w-full space-y-2">
									<p className="text-sm font-medium text-neutral-500">Remarks</p>
									<div className="flex w-full flex-col items-center gap-3 rounded-md border p-4">
										<p className="text-2xl font-bold">0%</p>
										<div className="w-fit rounded-full bg-primary-100 px-4 py-1 text-sm text-primary-400">
											Overall Perfomance
										</div>
										<div className="w-full text-center text-sm text-neutral-400"></div>
									</div>
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
