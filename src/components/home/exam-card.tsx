import type { CourseProps } from "@/types"
import { RiTimeLine, RiUserLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import { twMerge } from "tailwind-merge"

interface Props {
	course: CourseProps
	className?: string
}

export const ExamCard = ({ course, className }: Props) => {
	return (
		<Link
			href={`/dashboard/courses/${course.id}`}
			className={twMerge(
				"flex w-full flex-1 flex-col gap-4 rounded-lg border bg-white p-4 transition-all duration-700 hover:shadow-2xl",
				className
			)}>
			<Image
				src={course.image}
				alt="desginer color"
				width={318}
				height={172}
				className="h-52 w-full rounded-md object-cover"
			/>
			<div className="flex items-center justify-between gap-1">
				<h5 className="font-medium capitalize">{course.title}</h5>

				<p className="text-sm font-bold">N 29,999</p>
			</div>

			<div className="flex items-center gap-4 border-t border-neutral-200 pt-4 text-neutral-400">
				<div className="flex items-center gap-1">
					<RiTimeLine size={18} />
					<span className="text-sm">{course.quiz} hrs</span>
				</div>
				<div className="flex items-center gap-1">
					<RiUserLine size={18} />
					<span className="text-sm">23,894 Enrolled</span>
				</div>

				<p className="ml-auto text-sm">4.8 (1,509)</p>
			</div>
		</Link>
	)
}
