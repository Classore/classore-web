import { formatCurrency, formatNumber } from "@/lib";
import type { ExamBundlesResp } from "@/queries/school";
import { RiStarFill, RiTimeLine, RiUserLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
	course: ExamBundlesResp["data"][number];
	className?: string;
}

export const ExamCard = ({ course, className }: Props) => {
	return (
		// className=""
		<Link
			href={`/dashboard/categories/${course.examinationbundle_id}`}
			className={twMerge(
				"flex w-full flex-col gap-3 rounded-lg border p-2.5 transition-all duration-700 hover:shadow-2xl md:min-w-[300px] md:p-3",
				className
			)}>
			<Image
				src={
					course.examinationbundle_banner ??
					"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				}
				alt={course.examinationbundle_name}
				width={318}
				height={172}
				className="h-52 w-full rounded-md object-cover"
			/>
			<div className="flex items-center justify-between gap-1">
				<h5 className="font-medium capitalize">
					{course.examinationbundle_name.toUpperCase()} Prep Bundle
				</h5>

				<p className="text-sm font-bold">{formatCurrency(course.examinationbundle_amount)}</p>
			</div>

			<div className="flex items-center gap-4 border-t border-neutral-200 pt-3 text-neutral-400">
				<div className="flex items-center gap-1">
					<RiTimeLine size={18} />
					<span className="text-sm">15 hrs</span>
				</div>
				<div className="flex items-center gap-1">
					<RiUserLine size={18} />
					<span className="text-sm">{formatNumber(course.enrolled)} Enrolled</span>
				</div>

				<div className="ml-auto flex items-center gap-1">
					<RiStarFill className="size-4 text-yellow-500" />
					<p className="text-sm">
						{course.examinationbundle_rating} ({formatNumber(course.raters ?? 0)})
					</p>
				</div>
			</div>
		</Link>
	);
};
