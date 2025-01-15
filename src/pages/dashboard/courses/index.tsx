import Image from "next/image"
import Link from "next/link"

import consultation from "@/assets/illustrations/consultation.svg"
import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"

import { Bundle } from "@/components/course"

const Page = () => {
	return (
		<>
			<Seo title="My Courses" />

			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-8 py-6">
					<div className="relative flex w-full items-center justify-between gap-[177px] overflow-hidden rounded-2xl bg-[#F8F5FF] px-10 py-[52px] text-black lg:h-[297px]">
						<div className="flex max-w-[559px] flex-col gap-4">
							<h1 className="font-bold lg:text-4xl">My Courses</h1>
							<p className="text-neutral-400">
								Explore available categories and unlock your potential. Earn point rewards as you learn.
							</p>
							<Button className="mt-4 w-fit rounded-lg" variant="dark">
								<Link href="/dashboard/courses" className="text-sm">
									Continue Learning
								</Link>
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

					<div className="flex flex-col gap-10">
						<Bundle title="JAMB Prep Bundle" />
						<Bundle title="WAEC Prep Bundle" />
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
