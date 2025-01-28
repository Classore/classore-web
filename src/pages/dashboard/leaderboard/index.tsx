import { RiFlashlightLine, RiFullscreenExitLine, RiFullscreenLine } from "@remixicon/react"
import { Target04, Trophy01 } from "@untitled-ui/icons-react"
import Image from "next/image"
import React from "react"
import { useForm } from "react-hook-form"

import trophy from "@/assets/illustrations/trophy.svg"
import bronze from "@/assets/images/award-bronze.png"
import gold from "@/assets/images/award-gold.png"
import silver from "@/assets/images/award-silver.png"
import { ChartLine } from "@/components/charts"
import { DashboardLayout } from "@/components/layouts"
import { Pagination, Seo, Spinner } from "@/components/shared"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectItem } from "@/components/ui/select"
import { getInitials } from "@/lib"
import { useUserStore } from "@/store/z-store"
import type { UserMetricProps } from "@/types"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { timeChart } from "@/mock"
import { getExamsQueryOptions, useGetExamBundles, useGetExams } from "@/queries/school"
import { useGetLeaderboard } from "@/queries/student"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import type { GetStaticProps } from "next"

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

const getPositionIcon = (index: number) => {
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

export const getStaticProps = (async () => {
	const queryClient = new QueryClient()
	let dehydratedState = {}

	try {
		const resp = await Promise.allSettled([queryClient.ensureQueryData(getExamsQueryOptions)])

		if (resp[0].status === "rejected") {
			return {
				props: {},
			}
		}

		dehydratedState = dehydrate(queryClient)
		queryClient.clear()
	} catch {
		return {
			props: {},
		}
	}

	return {
		props: {
			dehydratedState,
		},
	}
}) satisfies GetStaticProps

const Page = () => {
	const { data: exams } = useGetExams()
	const [exam, setExam] = React.useState(exams?.at(0)?.examination_id ?? "")

	const { data: bundles, isPending: isPendingBundles } = useGetExamBundles({
		examination: exam,
	})
	const [bundle, setBundle] = React.useState(bundles?.data.at(0)?.examinationbundle_id ?? "")

	const [screen, setScreen] = React.useState<Screens>("minimize")
	const [page, setPage] = React.useState(1)
	const { user } = useUserStore()

	const { data: leaderboard, isPending } = useGetLeaderboard({
		examination: exam,
		examination_bundle: bundle,
	})

	const { control } = useForm({
		defaultValues: { timeline: "today" },
	})

	const overall = React.useMemo(() => {
		return leaderboard?.data.map((data, index) => ({
			...data,
			position: index + 1,
			positionIcon: getPositionIcon(index),
		}))
	}, [leaderboard?.data])

	// const paginated = React.useMemo(() => {
	// 	return paginate(overall, page, 10)
	// }, [overall, page])

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

	const totalHours = React.useMemo(() => {
		const totalTimeInSeconds = timeChart.reduce((acc, cur) => acc + cur.time_spent, 0)
		return totalTimeInSeconds / 3600
	}, [])

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
						<Tabs value={exam} onValueChange={setExam}>
							<div className="flex w-full items-center justify-between">
								<TabsList>
									{exams?.map((exam) => (
										<TabsTrigger key={exam.examination_id} value={exam.examination_id}>
											{exam.examination_name} Exams
										</TabsTrigger>
									))}
								</TabsList>

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

							{exams?.map((exam) => (
								<TabsContent key={exam.examination_id} value={exam.examination_id}>
									{isPendingBundles ? (
										<Spinner variant="primary" />
									) : (
										<Tabs value={bundle} onValueChange={setBundle}>
											<TabsList className="w-full justify-normal gap-4 overflow-x-auto border-b border-b-neutral-200">
												{bundles?.data.map((bundle) => (
													<TabsTrigger
														className="relative px-2 font-normal data-[state=active]:bg-transparent data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=active]:after:bg-primary-300 data-[state=active]:after:transition-all"
														key={bundle.examinationbundle_id}
														value={bundle.examinationbundle_id}>
														{bundle.examinationbundle_name} Prep Bundle
													</TabsTrigger>
												))}
											</TabsList>

											{bundles?.data.map((bundle) => (
												<TabsContent
													className="py-2"
													key={bundle.examinationbundle_id}
													value={bundle.examinationbundle_id}>
													<div className="flex w-full items-start gap-6">
														{isPending ? (
															<div className="flex w-full flex-col items-center justify-center gap-4">
																<Spinner variant="primary" />
															</div>
														) : (
															<div className="flex w-full flex-col gap-4">
																{overall?.length ? (
																	<>
																		<div className="flex-1 rounded-lg border">
																			{overall?.map((item) => (
																				<div
																					key={item.leaderboard_id}
																					className="flex w-full items-center gap-4 border-b">
																					<div
																						className={`grid w-full gap-4 rounded-md px-3 py-4 transition-all ${background(item.position)} grid-cols-4`}>
																						<div className="col-span-2 flex w-full items-center gap-5">
																							{item.positionIcon}
																							<div className="flex items-center gap-2">
																								<div className="size-10 rounded-lg border-2 border-white"></div>
																								<div className="flex flex-col gap-1">
																									<p className="text-sm font-bold">
																										{item.user_first_name} {item.user_last_name}
																									</p>
																									<p className="text-xs text-neutral-400">Lagos</p>
																								</div>
																							</div>
																						</div>

																						<div className="flex w-full items-center">
																							<div className="flex w-fit items-center gap-1 rounded-lg border-2 bg-white px-3 py-[6px] text-sm text-neutral-500">
																								<span className="size-1 rounded-full bg-black" />
																								{item.leaderboard_points} Pts
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
																			total={overall?.length ?? 0}
																		/>
																	</>
																) : (
																	<p className="py-2 text-center text-sm text-neutral-400">
																		No leaderboard data for this bundle.
																	</p>
																)}
															</div>
														)}

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
																		<p className="font-bold">{totalHours.toFixed(2)} hours spent</p>
																		<Select control={control} name="timeline" className="h-[33px] text-sm">
																			{timeFilters.map((filter) => (
																				<SelectItem key={filter} value={filter}>
																					{filter}
																				</SelectItem>
																			))}
																		</Select>
																	</div>
																	<ChartLine data={timeChart} />
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
												</TabsContent>
											))}
										</Tabs>
									)}
								</TabsContent>
							))}
						</Tabs>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
