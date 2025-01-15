import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import designer from "@/assets/illustrations/designer.svg"
import { CardLarge } from "@/components/home"
import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { BrowserCategories } from "@/components/categories"
import { categories } from "@/mock"

const Page = () => {
	const featured = categories.filter((category) => !!category.featured)

	return (
		<>
			<Seo title="Categories" />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-8 py-6">
					<div className="relative flex w-full items-center justify-between gap-[177px] overflow-hidden rounded-2xl bg-[#F8F5FF] px-10 py-[52px] text-black lg:h-[297px]">
						<div className="flex max-w-[559px] flex-col gap-4">
							<h1 className="font-bold lg:text-4xl">Let&apos;s get started with your learning journey</h1>
							<p className="text-neutral-400">
								Explore available categories and unlock your potential. Earn point rewards as you learn.
							</p>
							<Button className="mt-4 w-fit rounded-lg text-sm" variant="dark">
								<Link href="/dashboard/courses">See All Categories</Link>
							</Button>
						</div>
						<div className="absolute right-8 top-1/2 aspect-square h-[320px] -translate-y-1/2">
							<Image
								src={designer}
								alt="desginer color"
								fill
								sizes="(max-width:1024px)100%"
								className="object-contain"
							/>
						</div>
					</div>
					<div className="flex w-full flex-col gap-4">
						<div className="flex items-center justify-between">
							<p className="text-xl font-semibold">Featured</p>
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
							<ScrollArea className="h-[320px]">
								<div className="flex w-auto items-center gap-4 overflow-x-scroll">
									{featured.map((category) => (
										<CardLarge key={category.id} category={category} />
									))}
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>
					</div>

					<BrowserCategories />
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
