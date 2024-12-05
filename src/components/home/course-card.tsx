import { RiFileTextLine, RiPlayCircleLine, RiTimeLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import type { CourseProps } from "@/types"

interface Props {
	course: CourseProps
}

export const CourseCard = ({ course }: Props) => {
	return (
		<Link
			href={`/dashboard/courses/${course.id}`}
			key={course.id}
			className="flex aspect-[1.12/1] w-[350px] flex-col gap-5 rounded-lg border p-4 transition-all duration-700 hover:shadow-2xl">
			<div className="relative aspect-[1.96/1] w-full rounded-lg">
				<div className="absolute right-[10px] top-2 !z-[5] flex items-center gap-1 rounded bg-white p-1">
					<RiTimeLine size={18} />
					<span className="text-sm">15hrs</span>
				</div>
				<Image
					src={course.image}
					alt="desginer color"
					fill
					sizes="(max-width:1024px)100%"
					className="rounded-lg object-cover"
				/>
			</div>
			<div className="flex w-full flex-col">
				<h5 className="font-medium capitalize">{course.title}</h5>
				<p className="text-sm text-neutral-400">{course.description.substring(0, 45)}...</p>
			</div>
			<hr className="w-full bg-neutral-300" />
			<div className="flex w-full items-center justify-between">
				<div className="flex w-full items-center gap-2 text-neutral-400">
					<div className="flex items-center gap-1">
						<RiPlayCircleLine size={20} />
						<span className="text-sm">{course.quiz} Videos</span>
					</div>
					<div className="flex items-center gap-1">
						<RiFileTextLine size={20} />
						<span className="text-sm">{course.materials} Materials</span>
					</div>
				</div>
				<div className="flex h-[6px] w-16 items-center rounded-3xl bg-[#efefef]">
					<div style={{ width: `${50}%` }} className="h-full rounded-3xl bg-primary-400"></div>
				</div>
			</div>
		</Link>
	)
}
