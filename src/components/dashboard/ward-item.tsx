import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials, generateRandomColor } from "@/lib";
import type { WardProps } from "@/types/parent";

interface Props {
	ward: WardProps;
}

export const WardItem = ({ ward }: Props) => {
	const backgroundColor = React.useMemo(() => generateRandomColor(0.1), []);

	return (
		<Link
			href={`/parents/dashboard/ward/${ward.id}`}
			style={{ backgroundColor }}
			className="flex h-12 w-full items-center rounded-md p-2">
			<div className="flex w-full items-center gap-x-2">
				<Avatar className="size-8 rounded-md">
					<AvatarImage src={ward.profile_image || ""} alt={ward.first_name} />
					<AvatarFallback className="rounded-md bg-black text-white">
						{getInitials(`${ward.first_name} ${ward.last_name}`)}
					</AvatarFallback>
				</Avatar>
				<div>
					<p className="text-xs font-medium">
						{ward.first_name} {ward.last_name}
					</p>
					<p className="text-[10px] text-neutral-400">{ward.email}</p>
				</div>
			</div>
		</Link>
	);
};
