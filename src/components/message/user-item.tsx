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
	const userName = `${user.first_name} ${user.last_name}`;

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
				<Avatar className="size-10 rounded-md border border-neutral-200 bg-primary-500">
					<AvatarImage src={user?.profile_picture || ""} className="objec" />
					<AvatarFallback className="bg-primary-500 text-sm uppercase text-white">
						{getInitials(userName)}
					</AvatarFallback>
				</Avatar>
				<div className="w-full">
					<div className="flex w-full items-center justify-between">
						<p className="text-sm font-medium capitalize">{userName}</p>
						<p className="text-xs font-medium text-primary-500">
							{format(new Date(room.created_at), "HH:mm a")}
						</p>
					</div>
					<div className="flex h-4 w-full items-center gap-x-2">
						<p className="flex-1 truncate text-xs text-neutral-500"></p>
					</div>
				</div>
			</div>
		</div>
	);
};
