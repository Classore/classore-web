import { RiLoaderLine } from "@remixicon/react";
import Image from "next/image";
import React from "react";

import { DashboardLayout } from "@/components/layouts";
import { useGetTests } from "@/queries/test-center";
import { Card } from "@/components/test-center";
import { Seo } from "@/components/shared";

const Page = () => {
	const { data, isLoading } = useGetTests({ limit: 50, page: 1 });

	return (
		<>
			<Seo title="Test Center" />
			<DashboardLayout>
				<div className="flex h-full w-full flex-col gap-y-8 overflow-y-auto">
					<div className="relative mb-6 lg:mb-8 flex md:min-h-[297px] w-[96vw] md:w-full lg:w-[calc(100vw-280px)] xl:w-[calc(100vw-280px)] flex-col items-center justify-between gap-4 rounded-2xl border border-[#E2E4E9] bg-gradient-to-r from-white to-[#F8F5FF] p-6 text-black md:flex-row md:gap-[177px] md:px-10 md:py-[52px]">
						<div className="ml-6 space-y-2 lg:max-w-[480px]">
							<h2 className="text-[40px] font-bold leading-[100%]">Welcome to the Classore Test Center</h2>
							<p className="text-neutral-400">Get ready to take your exam with confidence</p>
						</div>
						<div className="relative right-4 bottom-0 aspect-square h-[440px]">
							<Image
								src="/assets/images/home-office.png"
								alt="home office"
								fill
								sizes="100%"
								className="object-contain"
							/>
						</div>
					</div>
					<div className="space-y-4">
						<p className="text-xl font-medium">Available Tests</p>
						{isLoading ? (
							<div className="w-ful grid min-h-[4000px] place-items-center">
								<RiLoaderLine className="size-10 animate-spin" />
							</div>
						) : (
							<>
								{!data?.data.length ? (
									<div className="w-ful grid min-h-[4000px] place-items-center">
										<RiLoaderLine className="size-10 animate-spin" />
									</div>
								) : (
									<>
										<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
											{data.data.map((test) => (
												<Card key={test.id} test={test} />
											))}
										</div>
									</>
								)}
							</>
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
