import type { Socket } from "socket.io-client";
import { format } from "date-fns";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { RoomProps, UserItemProps } from "@/types/message";
import { cn, getInitials, joinRoom } from "@/lib";

interface Props {
	onSelect: (userId: UserItemProps) => void;
	onSelectRoom: (roomId: string) => void;
	room: RoomProps;
	selected: UserItemProps | null;
	socket: Socket | null;
}

export const UserItem = ({ onSelect, onSelectRoom, room, selected, socket }: Props) => {
	const user = room.members[0];
	const userName =
		!user?.first_name && !user?.last_name
			? "Unknown User"
			: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim();

	const handleSelection = () => {
		onSelectRoom(room.id);
		onSelect(user);
		if (!socket) return;
		joinRoom(socket, String(user.member_id));
	};

	return (
		<div
			onClick={handleSelection}
			className={cn(
				"w-full cursor-pointer border-b border-neutral-200 p-3",
				user.member_id === selected?.member_id ? "bg-primary-100" : ""
			)}>
			<div className="flex w-full items-center gap-x-3 p-5">
				<Avatar className="size-5 rounded-md border border-neutral-200 bg-primary-500 lg:size-10">
					<AvatarImage src={user?.profile_picture || ""} className="objec" />
					<AvatarFallback className="bg-primary-500 text-xs uppercase text-white lg:text-sm">
						{getInitials(userName)}
					</AvatarFallback>
				</Avatar>
				<div className="w-full">
					<div className="flex w-full items-center justify-between">
						<p className="text-xs font-medium capitalize lg:text-sm">{userName}</p>
						<p className="text-[10px] font-medium text-primary-500 lg:text-xs">
							{format(new Date(room.created_at), "HH:mm a")}
						</p>
					</div>
					<div className="flex h-4 w-full items-center gap-x-2">
						<p className="flex-1 truncate text-[10px] text-neutral-500 lg:text-xs"></p>
					</div>
				</div>
			</div>
		</div>
	);
};
