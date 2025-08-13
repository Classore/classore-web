import Image from "next/image";
import Link from "next/link";

import designer from "@/assets/illustrations/designer.svg";
import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import { BrowseCategories } from "@/components/categories";
import { getExamsQueryOptions } from "@/queries/school";
import type { GetStaticProps } from "next";
import { ScrollArea } from "@/components/ui/scroll-area";

export const getStaticProps = (async () => {
	const queryClient = new QueryClient();
	let dehydratedState = {};

	try {
		const resp = await Promise.allSettled([queryClient.ensureQueryData(getExamsQueryOptions)]);

		if (resp[0].status === "rejected") {
			return {
				props: {},
			};
		}

		dehydratedState = dehydrate(queryClient);
		queryClient.clear();
	} catch {
		return {
			props: {},
		};
	}

	return {
		props: {
			dehydratedState,
		},
	};
}) satisfies GetStaticProps;

const Page = () => {
	return (
		<>
			<Seo title="Categories" />
			<DashboardLayout>
				<ScrollArea hideScrollbar>
				<div className="relative mb-6 lg:mb-8 flex md:min-h-[297px] w-[96vw] md:w-full flex-col items-center justify-between gap-4 overflow-x-hidden overflow-y-hidden rounded-2xl border border-[#E2E4E9] bg-gradient-to-r from-white to-[#F8F5FF] p-6 text-black md:flex-row md:gap-[177px] md:px-10 md:py-[52px]">
					<div className="flex max-w-[559px] flex-col gap-4">
						<h1 className="text-2xl font-bold lg:text-4xl">
							Let&apos;s get started with your learning journey
						</h1>
						<p className="text-sm text-neutral-400 md:text-base">
							Explore available categories and unlock your potential. Earn point rewards as you learn.
						</p>
						<Button className="mt-4 rounded-lg text-sm md:w-fit" variant="dark">
							<Link href="/dashboard/courses">See All Categories</Link>
						</Button>
					</div>

					<div className="hidden md:block lg:absolute lg:right-8 lg:top-1/2 lg:aspect-square lg:h-[340px] lg:-translate-y-1/2">
						<Image
							src={designer}
							alt="designer color"
							fill
							sizes="(max-width:1024px)100%"
							className="object-contain"
						/>
					</div>
				</div>
				{/* /> */}
				{/* <FeaturedCategories /> */}
				<BrowseCategories />
				</ScrollArea>
			</DashboardLayout>
		</>
	);
};

export default Page;
