import { RiAwardLine, RiLoaderLine } from "@remixicon/react";
import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";

import { DashboardLayout } from "@/components/layouts";
import { useGetTests } from "@/queries/test-center";
import { Card } from "@/components/test-center";
import { Seo } from "@/components/shared";

const Page = () => {
	const router = useRouter();

	React.useEffect(() => {
		router.replace("/dashboard");
	}, [router]);

	const { data, isLoading } = useGetTests({ limit: 50, page: 1 });

	return (
		<>
			<Seo title="Test Center – Classore" />
			<DashboardLayout>
				<div className="flex h-full w-full flex-col gap-y-8 overflow-y-auto px-4 py-4 md:px-6">
					{/* Banner */}
					<div className="flex flex-col gap-4 rounded-3xl bg-neutral-900 p-6 text-white md:flex-row md:items-center md:justify-between">
						<div className="space-y-2 lg:max-w-[480px]">
							<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
								Welcome to the Classore Test Center
							</h2>
							<p className="text-xs sm:text-sm text-neutral-400">
								Practice Computer-Based Tests (CBT) and past examination questions with timed scoring.
							</p>
						</div>
						<div className="relative aspect-square size-36 shrink-0 self-center md:size-44">
							<Image
								src="/assets/images/home-office.png"
								alt="Test preparation"
								fill
								className="object-contain"
							/>
						</div>
					</div>

					{/* Available Tests */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<p className="text-lg font-bold text-neutral-900">Available Practice Tests</p>
							{data?.data?.length ? (
								<span className="text-xs text-neutral-500 font-medium">
									{data.data.length} test{data.data.length !== 1 ? "s" : ""} available
								</span>
							) : null}
						</div>

						{isLoading ? (
							<div className="grid min-h-[260px] place-items-center py-12">
								<div className="flex flex-col items-center gap-2 text-neutral-400">
									<RiLoaderLine className="size-8 animate-spin" />
									<p className="text-xs font-medium">Loading test assessments…</p>
								</div>
							</div>
						) : !data?.data?.length ? (
							<div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-200 py-16 text-center">
								<div className="grid size-14 place-items-center rounded-2xl bg-neutral-100 text-neutral-400">
									<RiAwardLine className="size-7" />
								</div>
								<div>
									<p className="font-semibold text-neutral-800 text-sm">No tests available yet</p>
									<p className="text-xs text-neutral-500 mt-0.5">
										Check back soon for new CBT mock exams and practice assessments.
									</p>
								</div>
							</div>
						) : (
							<div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
								{data.data.map((test) => (
									<Card key={test.id} test={test} />
								))}
							</div>
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
