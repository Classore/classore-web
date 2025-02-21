import { RiArrowRightSLine } from "@remixicon/react";
import Image from "next/image";
import React from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DashboardLayout } from "@/components/layouts";
import { Information } from "@/components/test-center";
import { Seo } from "@/components/shared";

const Page = () => {
	return (
		<>
			<Seo title="Test Center" />
			<DashboardLayout>
				<div className="flex h-full w-full p-8">
					<div className="flex h-full w-full flex-col gap-y-8 overflow-y-auto">
						<div className="flex h-[251px] w-full items-center justify-between">
							<div className="ml-6 space-y-2 lg:max-w-[480px]">
								<h2 className="text-[40px] font-bold leading-[100%]">
									Welcome to the Classore Test Center
								</h2>
								<p className="text-neutral-400">Get ready to take your exam with confidence</p>
							</div>
							<div className="relative right-4 top-1/2 aspect-square h-[369px] -translate-y-1/2">
								<Image src="/assets/images/home-office.png" alt="home office" fill sizes="100%" />
							</div>
						</div>
						<div className="space-y-4">
							<p className="text-xl font-medium">Available Tests</p>
							<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
								{[...Array(12)].map((_, index) => (
									<div key={index} className="aspect-square w-full border p-4">
										<div className="flex w-full items-center justify-between">
											<div></div>
											<Dialog>
												<DialogTrigger className="text-neutral-400">
													<RiArrowRightSLine size={18} />
												</DialogTrigger>
												<DialogContent className="w-[400px]">
													<Information />
												</DialogContent>
											</Dialog>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
