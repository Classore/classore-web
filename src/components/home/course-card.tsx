import { RiFileTextLine, RiPlayCircleLine, RiTimeLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"

import { formatNumber } from "@/lib"
import type { MyCoursesResp } from "@/queries/course"

interface Props {
	course: MyCoursesResp["data"][number]
}

export const CourseCard = ({ course }: Props) => {
	return (
		<Link
			href={`/dashboard/courses/${course.course_id}`}
			className="flex min-w-[340px] flex-col gap-5 rounded-lg border p-4 transition-all duration-700 hover:shadow-2xl">
			<div className="relative aspect-[1.96/1] w-full rounded-lg">
				<div className="absolute right-[10px] top-2 !z-[5] flex items-center gap-1 rounded bg-white p-1">
					<RiTimeLine size={18} />
					<span className="text-sm">15hrs</span>
				</div>
				<Image
					src="https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt={course.subject_name}
					fill
					sizes="(max-width:1024px)100%"
					className="rounded-lg object-cover"
				/>
			</div>
			<div className="flex w-full flex-col">
				<h5 className="font-medium capitalize">{course.subject_name}</h5>
				{/* <p className="truncate text-sm text-neutral-400">{course.description}.</p> */}
			</div>
			<hr className="w-full bg-neutral-300" />
			<div className="flex w-full items-center justify-between">
				<div className="flex w-full items-center gap-2 text-neutral-400">
					<div className="flex items-center gap-1">
						<RiPlayCircleLine size={20} />
						<span className="text-sm">{formatNumber(course.no_of_videos)} Videos</span>
					</div>
					<div className="flex items-center gap-1">
						<RiFileTextLine size={20} />
						<span className="text-sm">{formatNumber(course.no_of_attachments)} Materials</span>
					</div>
				</div>
				<div className="flex h-[6px] w-16 items-center rounded-3xl bg-[#efefef]">
					<div style={{ width: `${50}%` }} className="h-full rounded-3xl bg-primary-400"></div>
				</div>
			</div>
		</Link>
	)
}
