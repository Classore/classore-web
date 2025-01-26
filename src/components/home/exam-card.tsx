import { formatCurrency, formatNumber } from "@/lib";
import type { ExamBundlesResp } from "@/queries/school";
import { RiTimeLine, RiUserLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
	course: ExamBundlesResp["data"][number];
	className?: string;
}

export const ExamCard = ({ course, className }: Props) => {
	return (
		<Link
			href={`/dashboard/courses/${course.examinationbundle_id}`}
			className={twMerge(
				"flex w-full flex-1 flex-col gap-4 rounded-lg border bg-white p-4 transition-all duration-700 hover:shadow-2xl",
				className
			)}>
			<Image
				src="https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt=""
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

			<div className="flex items-center gap-4 border-t border-neutral-200 pt-4 text-neutral-400">
				<div className="flex items-center gap-1">
					<RiTimeLine size={18} />
					<span className="text-sm">15 hrs</span>
				</div>
				<div className="flex items-center gap-1">
					<RiUserLine size={18} />
					<span className="text-sm">{formatNumber(course.enrolled)} Enrolled</span>
				</div>

				<p className="ml-auto text-sm">4.8 (1,509)</p>
			</div>
		</Link>
	);
};
