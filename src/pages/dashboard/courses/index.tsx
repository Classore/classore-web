<<<<<<< HEAD
import Image from "next/image"
import Link from "next/link"

import consultation from "@/assets/illustrations/consultation.svg"
import { Bundle } from "@/components/course"
import { DashboardLayout } from "@/components/layouts"
import { Seo, Spinner } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { useGetProfile } from "@/queries/student"

const Page = () => {
	const { data, isPending } = useGetProfile()
=======
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
	RiArrowLeftSLine,
	RiFileTextLine,
	RiLoaderLine,
	RiPlayCircleLine,
} from "@remixicon/react";

import consultation from "@/assets/illustrations/consultation.svg";
import { DashboardLayout } from "@/components/layouts";
import type { ExamCourseProps } from "@/types/type";
import { Button } from "@/components/ui/button";
import { getMyCourses } from "@/queries/user";
import { Seo } from "@/components/shared";

const Page = () => {
	const ref = React.useRef<HTMLDivElement>(null);

	const handleScroll = (direction: "left" | "right") => {
		if (ref.current) {
			ref.current.scrollBy({
				left: direction === "left" ? -ref.current.clientWidth : ref.current.clientWidth,
				behavior: "smooth",
			});
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ["my-courses"],
		queryFn: () => getMyCourses(),
		select: (data) => ({
			courses: data.data.data,
			meta: data.data.meta,
		}),
	});

	const aggregatedProgress = React.useMemo(() => {
		if (data) {
			return data.courses.reduce((acc, course) => {
				acc += course.course_progress;
				return acc;
			}, 0);
		}
		return 0;
	}, [data]);
>>>>>>> a03d8721612b1bb4894dd39ae3a94863d840d471

	return (
		<>
			<Seo title="My Courses" />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-8 py-6">
					<div className="relative flex w-full items-center justify-between gap-[177px] overflow-hidden rounded-2xl bg-[#F8F5FF] px-10 py-[52px] text-black lg:h-[297px]">
						<div className="flex max-w-[559px] flex-col gap-4">
							<h1 className="font-bold lg:text-4xl">My Courses</h1>
							<p className="text-neutral-400">
								Explore available categories and unlock your potential. Earn point rewards as you
								learn.
							</p>
							<Button className="mt-4 w-fit rounded-lg text-sm" variant="dark" asChild>
								<Link href="/dashboard/courses">
									{aggregatedProgress > 0 ? "Continue Learning" : "Start Learning"}
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
<<<<<<< HEAD

					<div className="flex flex-col gap-10">
						{isPending ? (
							<div className="mx-auto py-4">
								<Spinner variant="primary" />
							</div>
						) : (
							data?.time_line.map((bundle) => <Bundle key={bundle.id} bundle={bundle} />)
						)}
					</div>
=======
					{isLoading ? (
						<div className="grid h-[400px] w-full place-items-center">
							<RiLoaderLine className="animate-spin text-primary-400" />
						</div>
					) : (
						<div className="w-full space-y-12">
							<div className="w-full space-y-4">
								<div className="flex w-full items-center justify-between">
									<div className="flex items-center gap-x-4">
										<p className="text-xl font-medium uppercase">
											{data?.courses[0].examBundle_name}
										</p>
									</div>
									<div className="flex items-center gap-x-4">
										<button
											onClick={() => handleScroll("left")}
											className="grid size-8 place-items-center rounded-full border bg-white">
											<RiArrowLeftSLine className="size-5" />
										</button>
										<button
											onClick={() => handleScroll("right")}
											className="grid size-8 place-items-center rounded-full border bg-white">
											<RiArrowLeftSLine className="size-5 rotate-180" />
										</button>
									</div>
								</div>
								<div className="w-full">
									<div ref={ref} className="flex w-auto items-center gap-x-4 overflow-x-auto pb-4">
										{data?.courses.map((course) => <Item key={course.course_id} course={course} />)}
									</div>
								</div>
							</div>
						</div>
					)}
>>>>>>> a03d8721612b1bb4894dd39ae3a94863d840d471
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;

const Item = ({ course }: { course: ExamCourseProps }) => {
	return (
		<Link
			href={`/dashboard/courses/${course.course_id}`}
			className="w-[350px] flex-shrink-0 space-y-4 rounded-2xl border p-4 transition-all duration-500 hover:shadow-lg">
			<div className="relative aspect-[1.96/1] w-full rounded-xl border"></div>
			<div className="w-full">
				<h5 className="font-medium capitalize">{course.subject_name}</h5>
				<p className="text-sm text-neutral-400"></p>
			</div>
			<hr />
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-x-4">
					<div className="flex items-center gap-x-2">
						<RiPlayCircleLine className="size-4" />
						<p className="text-sm text-neutral-400">Videos</p>
					</div>
					<div className="flex items-center gap-x-2">
						<RiFileTextLine className="size-4" />
						<p className="text-sm text-neutral-400">Materials</p>
					</div>
				</div>
				<div className="h-1.5 w-16 rounded-md bg-primary-100">
					<div
						style={{ width: `${course.course_progress}%` }}
						className="h-full rounded-md bg-primary-400"></div>
				</div>
			</div>
		</Link>
	);
};
