import Image from "next/image"
import React from "react"

import trophy from "@/assets/illustrations/trophy.svg"
import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const filters = ["all", "quiz", "referral", "streak"] as const
type Filters = (typeof filters)[number]

const Page = () => {
	const [filter, setFilter] = React.useState<Filters>("all")

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
							<div className="flex items-center gap-2"></div>
						</div>
						<div className="flex w-full items-start gap-6">
							<div className="flex-1 rounded-lg border">
								{[...Array(20)].map((_, index) => (
									<div key={index} className="w-full border-b px-3 py-4 last:border-b-0"></div>
								))}
							</div>
							<div className="flex w-[350px] flex-col gap-6">
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
