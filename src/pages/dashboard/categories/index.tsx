import Image from "next/image"
import Link from "next/link"

import designer from "@/assets/illustrations/designer.svg"
import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"

import { BrowseCategories, FeaturedBundles } from "@/components/categories"
import { getExamsQueryOptions } from "@/queries/school"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import type { GetStaticProps } from "next"

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
					<FeaturedBundles />
					<BrowseCategories />
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
