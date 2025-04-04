import { Target04 } from "@untitled-ui/icons-react";
import { useRouter } from "next/router";
import { format } from "date-fns";
import React from "react";
import {
	RiArrowDownSLine,
	RiArrowLeftSLine,
	RiFlashlightLine,
	RiLoaderLine,
	RiTrophyLine,
	RiUserFollowLine,
} from "@remixicon/react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnalyticsCard } from "@/components/dashboard/analytics-card";
import { AddWardCourse } from "@/components/dashboard/add-course";
import { useGetExamBundles, useGetExams } from "@/queries/school";
import { useGetWard, useGetParentHome } from "@/queries/parent";
import { DeleteWard } from "@/components/dashboard/delete-ward";
import { Pagination } from "@/components/dashboard/pagination";
import { AnalyticsChart } from "@/components/dashboard/chart";
import { ParentDashboardLayout } from "@/components/layouts";
import { WardEvent } from "@/components/dashboard/event";
import type { Period } from "@/constants/period";
import { columns } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared";
import { getInitials } from "@/lib";

const Page = () => {
	const [timeLine, setTimeLine] = React.useState<Period>("THIS_WEEK");
	const [examination, setExamination] = React.useState("");
	const [bundle, setBundle] = React.useState("");
	const [page, setPage] = React.useState(1);
	const router = useRouter();
	const id = router.query.id as string;

	const { data: examinations } = useGetExams();
	const { data: bundles } = useGetExamBundles({ examination, limit: 10, page });
	const { data: ward, isLoading } = useGetWard(id);
	const { data: home } = useGetParentHome();

	const wards = React.useMemo(() => {
		if (!home) return [];
		return home.my_wards;
	}, [home]);

	const singleWard = React.useMemo(() => {
		if (!wards) return null;
		const ward = wards.find((ward) => ward.id === id);
		if (!ward) return null;
		return ward;
	}, [id, wards]);

	return (
		<ParentDashboardLayout title={``}>
			{isLoading ? (
				<div className="flex w-full items-center justify-center">
					<div className="flex items-center gap-x-2">
						<p className="text-sm text-primary-400">Fetching ward</p>
						<RiLoaderLine className="size-5 animate-spin" />
					</div>
				</div>
			) : (
				<div className="h-full w-full space-y-5 pb-6">
					<div className="w-full space-y-3 rounded-lg bg-white p-5">
						<div className="flex items-center gap-x-4">
							<Button className="w-fit" onClick={() => router.back()} size="sm" variant="outline">
								<RiArrowLeftSLine /> Back
							</Button>
							<p className="font-semibold">Ward Details</p>
						</div>
						<div className="flex w-full items-center justify-between">
							<div className="flex h-14 items-center gap-x-6 rounded-md bg-neutral-100 p-2">
								<div className="flex w-full items-center gap-x-2">
									<Avatar className="size-8 rounded-md border-2 border-white">
										<AvatarImage src={String(singleWard?.profile_image)} alt={singleWard?.first_name} />
										<AvatarFallback className="rounded-md bg-black text-white">
											{getInitials(`${singleWard?.first_name} ${singleWard?.last_name}`)}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-sm font-medium">
											{singleWard?.first_name} {singleWard?.last_name}
										</p>
										<p className="text-xs text-neutral-400">{singleWard?.email}</p>
									</div>
								</div>
								<div className="flex items-center gap-x-2">
									<div
										className={`rounded-md px-3 py-1.5 text-xs font-medium ${true ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>
										Active
									</div>
									<Popover>
										<PopoverTrigger asChild>
											<button className="grid size-4 place-items-center rounded-full border border-neutral-300">
												<RiArrowDownSLine className="size-3" />
											</button>
										</PopoverTrigger>
										<PopoverContent></PopoverContent>
									</Popover>
								</div>
							</div>
							<div className="flex items-center gap-x-4">
								<DeleteWard wardId={id} />
								<AddWardCourse wardId={id} />
							</div>
						</div>
					</div>

					{/* analytics */}
					<div className="w-full space-y-3 rounded-lg bg-white p-5">
						<p className="font-semibold">Analytics Report</p>
						<div className="w-full space-y-3">
							<div className="grid w-full grid-cols-4 gap-4">
								<AnalyticsCard icon={RiTrophyLine} label="Leaderboard Ranking" value="0" />
								<AnalyticsCard icon={RiUserFollowLine} label="Total Avg. Quiz Score" value="0" />
								<AnalyticsCard icon={RiFlashlightLine} label="Streak" value="0" />
								<AnalyticsCard icon={Target04} label="Quiz Points" value="0" />
							</div>
							<div className="grid w-full grid-cols-4 gap-4">
								<div className="col-span-3 rounded-md border p-4 lg:h-[286px]">
									<AnalyticsChart
										data={[]}
										hoursSpent={0}
										onTimeLineChange={setTimeLine}
										timeLine={timeLine}
									/>
								</div>
								<div className="space-y-6 rounded-md border p-4">
									<div className="flex flex-col items-center gap-y-2">
										<p className="text-3xl font-bold">0%</p>
										<div className="flex h-6 w-fit items-center rounded-xl bg-primary-100 px-3 text-center text-xs font-medium text-primary-400">
											Overall Performance
										</div>
									</div>
									<hr />
									<div className="w-full space-y-2 text-center">
										<p className="text-sm font-semibold text-neutral-500">Teacher&apos;s Remark</p>
										<div className="rounded-md bg-neutral-100 p-2">
											<p className="text-xs text-neutral-400"></p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* upcoming events */}
					<div className="w-full space-y-3 rounded-lg bg-white p-5">
						<div>
							<p className="font-semibold">Upcoming Events</p>
							<p className="text-sm text-neutral-400">{format(new Date(), "MMMM dd, yyyy")}</p>
						</div>
						{ward?.upcoming_events.length === 0 ? (
							<div className="flex h-[74px] w-full items-center justify-center">
								<p className="text-sm text-neutral-400">No upcoming events</p>
							</div>
						) : (
							<div className="grid w-full grid-cols-4 gap-4">
								{ward?.upcoming_events.map((event) => <WardEvent event={event} key={event.id} />)}
							</div>
						)}
					</div>

					{/* course progress */}
					<div className="w-full space-y-4 rounded-lg bg-white p-5">
						<div className="flex items-center gap-x-5">
							<p className="font-semibold">Course Progress</p>
							<div className="flex items-center gap-x-4">
								{examinations?.map((exam) => (
									<button
										key={exam.examination_id}
										className={`rounded-md px-4 py-1.5 text-sm capitalize ${exam.examination_id === examination ? "bg-primary-100 text-primary-400" : "text-neutral-400"}`}
										onClick={() => setExamination(exam.examination_id)}>
										{exam.examination_name}
									</button>
								))}
							</div>
						</div>
						<div className="flex h-14 w-full items-center justify-between border-b">
							<div className="flex h-full items-center gap-x-6">
								{bundles?.data.map((bund) => (
									<button
										key={bund.examinationbundle_id}
										onClick={() => setBundle(bund.examinationbundle_id)}
										className={`relative h-full text-sm font-medium uppercase before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-primary-400 ${bund.examinationbundle_id === bundle ? "text-primary-400 before:w-full" : "text-neutral-400 before:w-0"}`}>
										{bund.examinationbundle_name}
									</button>
								))}
							</div>
						</div>
						<div>
							<DataTable columns={columns} data={[]} headerClassName="bg-neutral-200" />
							<Pagination current={page} onPageChange={setPage} pageSize={10} total={0} />
						</div>
					</div>
				</div>
			)}
		</ParentDashboardLayout>
	);
};

export default Page;
