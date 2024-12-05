import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import consultation from "@/assets/illustrations/consultation.svg"
import { DashboardLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/home"
import { Seo } from "@/components/shared"

import { categories } from "@/mock"

const Page = () => {
	return (
		<>
			<Seo title="My Courses" />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-8 py-6">
					<div className="relative flex w-full items-center justify-between gap-[177px] overflow-hidden rounded-2xl bg-[#F8F5FF] px-10 py-[52px] text-black lg:h-[297px]">
						<div className="flex max-w-[559px] flex-col gap-4">
							<h1 className="font-bold tracking-[4%] lg:text-4xl">My Courses</h1>
							<p className="text-neutral-400">
								Explore available categories and unlock your potential. Earn point rewards as you learn.
							</p>
							<Button className="mt-4 w-fit" variant="dark">
								<Link href="/dashboard/courses">Continue Learning</Link>
							</Button>
						</div>
						<div className="absolute right-8 top-1/2 aspect-square h-[468px] -translate-y-1/2">
							<Image
								src={consultation}
								alt="desginer color"
								fill
								sizes="(max-width:1024px)100%"
								className="object-contain"
							/>
						</div>
					</div>
					<div className="flex w-full flex-col gap-4">
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold">{categories[0].name}</p>
							<div className="flex items-center gap-4">
								<button className="grid size-8 place-items-center rounded-full border bg-white text-black hover:bg-neutral-100">
									<ChevronLeft className="size-3" />
								</button>
								<button className="grid size-8 place-items-center rounded-full border bg-white text-black hover:bg-neutral-100">
									<ChevronLeft className="size-3 rotate-180" />
								</button>
							</div>
						</div>
						<div className="w-full overflow-hidden">
							<ScrollArea className="h-[340px]">
								<div className="flex w-auto items-center gap-4 overflow-x-scroll">
									{categories[0].subjects.map((subject) => (
										<CourseCard key={subject.id} course={subject} />
									))}
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>
					</div>
					<div className="flex w-full flex-col gap-4">
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold">{categories[1].name}</p>
							<div className="flex items-center gap-4">
								<button className="grid size-8 place-items-center rounded-full border bg-white text-black hover:bg-neutral-100">
									<ChevronLeft className="size-3" />
								</button>
								<button className="grid size-8 place-items-center rounded-full border bg-white text-black hover:bg-neutral-100">
									<ChevronLeft className="size-3 rotate-180" />
								</button>
							</div>
						</div>
						<div className="w-full overflow-hidden">
							<ScrollArea className="h-[340px]">
								<div className="flex w-auto items-center gap-4 overflow-x-scroll">
									{categories[4].subjects.map((subject) => (
										<CourseCard key={subject.id} course={subject} />
									))}
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
