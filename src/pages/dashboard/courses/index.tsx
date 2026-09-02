import Image from "next/image";
import Link from "next/link";

import consultation from "@/assets/illustrations/consultation.svg";
import { Bundle } from "@/components/course";
import { DashboardLayout } from "@/components/layouts";
import { Seo, Spinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useGetProfile } from "@/queries/student";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = () => {
	const { data: profile, isPending, isError } = useGetProfile();

	return (
		<>
			<Seo title="My Courses" />

			<DashboardLayout>
				<ScrollArea hideScrollbar>

					<div className="relative flex md:min-h-[297px] w-[96vw] md:w-full flex-col items-center justify-between gap-4 rounded-2xl border border-[#E2E4E9] bg-gradient-to-r from-white to-[#F8F5FF] p-6 text-black md:flex-row md:gap-[177px] md:px-10 md:py-[52px]">
						<div className="flex max-w-[559px] flex-col gap-4">
							<h1 className="text-2xl font-bold lg:text-4xl">My Courses</h1>
							<p className="max-w-[30rem] text-sm text-neutral-500 md:text-base">
								Explore available categories and unlock your potential. Earn point rewards as you learn.
							</p>
							<Button className="z-[1] mt-2 rounded-lg md:w-fit" variant="dark">
								<Link href="/dashboard/courses" className="text-sm">
									Continue Learning
								</Link>
							</Button>
						</div>

						<div className="hidden md:block lg:absolute lg:right-4 lg:top-1/2 lg:aspect-square lg:h-[400px] lg:-translate-y-1/2 lg:max-w-[400px]">
							<Image
								src={consultation}
								alt="designer color"
								fill
								sizes="(max-width:1024px)100%"
								className="object-contain"
							/>
						</div>

						<div className="relative z-0 -mt-[1.8rem] md:hidden">
							<Image
								src={consultation}
								alt="designer color"
								width={210}
								height={210}
								className="object-contain"
							/>
						</div>
					</div>

					<div className="flex flex-col gap-10 py-6 pb-10 lg:w-[78vw]">
						{isPending ? (
							<div className="mx-auto py-4">
								<Spinner variant="primary" />
							</div>
						) : isError ? (
							<div className="mx-auto flex w-full max-w-96 flex-col items-center justify-center gap-2 p-4">
								<p className="font-semibold">Error fetching profile</p>
								<p className="text-sm text-neutral-400">Please refresh the page to try again</p>
							</div>
						) : profile?.time_line.length ? (
							profile?.time_line?.map((bundle) => <Bundle key={bundle.id} bundle={bundle} />)
						) : (
							<div className="mx-auto flex flex-col gap-2 py-4">
								<p className="text-neutral-400">You don&apos;t have a study plan yet.</p>

								<Link
									href="/signup/student/studying-for"
									className="text-center text-sm text-primary-300 underline">
									Set Up Study Plan
								</Link>
							</div>
						)}
					</div>
				</ScrollArea>
			</DashboardLayout>
		</>
	);
};

export default Page;
