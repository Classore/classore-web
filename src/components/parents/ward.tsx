import { RiMoreLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { WardProps } from "@/types/parent";
import { getInitials } from "@/lib";

interface Props {
	ward: WardProps;
}

export const Ward = ({ ward }: Props) => {
	const width = React.useMemo(() => {
		const percentage = (ward.progress / 100) * 100;
		return `${percentage}%`;
	}, [ward.progress]);

	return (
		<div className="w-full space-y-3 bg-white p-3">
			<div className="relative h-32 w-full bg-white">
				<div className="h-16 w-full rounded-md bg-gradient-to-r from-secondary-50 via-primary-100 to-secondary-50"></div>
				<div className="absolute bottom-0 left-0 flex w-full flex-col items-center gap-y-1">
					<Avatar className="size-10 rounded-md">
						<AvatarImage src={ward.profile_image || ""} alt={ward.first_name} />
						<AvatarFallback className="rounded-md bg-black text-white">
							{getInitials(`${ward.first_name} ${ward.last_name}`)}
						</AvatarFallback>
					</Avatar>
					<p className="text-sm font-medium">
						{ward.first_name} {ward.last_name}
					</p>
					<p className="text-xs text-neutral-400">{ward.email}</p>
				</div>
			</div>
			<div className="flex w-full items-center justify-between gap-x-2">
				<p className="text-sm font-medium text-neutral-400">Progress</p>
				<div className="flex h-1 flex-1 items-center rounded-xl bg-primary-100">
					<div style={{ width }} className="bg-primary-400"></div>
				</div>
				<p className="text-sm font-medium">{width}</p>
			</div>
			<div className="flex w-full items-center gap-x-4">
				<Link
					href={`/parents/dashboard/ward/${ward.id}`}
					className="flex h-8 flex-1 items-center justify-center rounded-md border bg-neutral-100 text-sm text-neutral-500 transition-all duration-300 active:scale-95">
					View
				</Link>
				<button className="grid size-8 place-items-center rounded-md border text-neutral-400 transition-all duration-300 active:scale-95">
					<RiMoreLine className="size-4 rotate-90" />
				</button>
			</div>
		</div>
	);
};
