import type { Socket } from "socket.io-client";
import { format } from "date-fns";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { RoomProps, UserItemProps } from "@/types/message";
import { useUserStore } from "@/store/z-store";
import { cn, getInitials, joinRoom } from "@/lib";

interface Props {
	onSelect: (user: UserItemProps) => void;
	onSelectRoom: (roomId: string) => void;
	room: RoomProps;
	selected: UserItemProps | null;
	socket: Socket | null;
}

export const UserItem = ({ onSelect, onSelectRoom, room, selected, socket }: Props) => {
	const { user: currentUser } = useUserStore();

	// In 1-on-1 direct rooms, find the member that is NOT the current logged-in user
	const partner =
		room.members?.find((m) => {
			const memberId = m.user_id || (m as any).id;
			return memberId && currentUser?.id && String(memberId) !== String(currentUser.id);
		}) || room.members?.[0];

	const partnerFirstName =
		partner?.first_name ||
		(partner as any)?.firstName ||
		(partner as any)?.user?.first_name ||
		"";

	const partnerLastName =
		partner?.last_name ||
		(partner as any)?.lastName ||
		(partner as any)?.user?.last_name ||
		"";

	const userName =
		`${partnerFirstName} ${partnerLastName}`.trim() ||
		(partner as any)?.name ||
		partner?.email ||
		"Classmate";

	const partnerImage =
		partner?.profile_picture ||
		(partner as any)?.profile_image ||
		(partner as any)?.profilePicture ||
		(partner as any)?.user?.profile_picture ||
		"";

	const isSelected = Boolean(
		selected &&
			partner &&
			(selected.user_id === partner.user_id ||
				(selected as any).id === (partner as any).id ||
				selected.member_id === partner.member_id)
	);

	const handleSelection = () => {
		onSelectRoom(room.id);
		if (partner) onSelect(partner);
		if (!socket || !partner) return;
		joinRoom(socket, String(partner.member_id || partner.user_id || room.id));
	};

	return (
		<div
			onClick={handleSelection}
			className={cn(
				"w-full cursor-pointer border-b border-neutral-100 p-3 transition-colors hover:bg-neutral-50",
				isSelected ? "bg-primary-50 hover:bg-primary-100" : ""
			)}>
			<div className="flex w-full items-center gap-x-3 p-2">
				<Avatar className="size-10 rounded-xl border border-neutral-200 bg-primary-100 shrink-0">
					<AvatarImage src={partnerImage} className="object-cover" />
					<AvatarFallback className="bg-primary-100 text-xs font-bold uppercase text-primary-700">
						{getInitials(userName)}
					</AvatarFallback>
				</Avatar>
				<div className="w-full min-w-0">
					<div className="flex w-full items-center justify-between gap-1">
						<p className="truncate text-xs font-bold capitalize text-neutral-900 lg:text-sm">
							{userName}
						</p>
						<p className="shrink-0 text-[10px] font-medium text-neutral-400">
							{room.created_at ? format(new Date(room.created_at), "HH:mm a") : ""}
						</p>
					</div>
					<p className="truncate text-[11px] text-neutral-500 mt-0.5">
						{partner?.email || "Direct Message"}
					</p>
				</div>
			</div>
		</div>
	);
};
