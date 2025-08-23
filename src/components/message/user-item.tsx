import type { Socket } from "socket.io-client";
import { format } from "date-fns";
import React from "react";
import { RiCheckLine, RiCheckDoubleLine } from "@remixicon/react";

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

	// Extract actual message data from room
	const hasLastMessage = !!room.last_message;
	const lastMessage = hasLastMessage && room.last_message?.content 
		? room.last_message.content 
		: hasLastMessage && room.last_message && !room.last_message.content 
		? "Message sent" 
		: "No messages yet";
	const lastMessageTime = room.last_message?.createdOn || room.created_at;
	const isMessageRead = room.last_message?.is_read || false;
	const isMyLastMessage = room.last_message?.is_my_message || false;
	const unreadCount = room.unread_count || 0;
	
	// Determine timestamp color based on message status
	const getTimestampColor = (): string | undefined => {
		// Hide time when no lastMessage exists
		if (!hasLastMessage) return undefined;
		
		// When current user has unread messages, maintain purple color
		if (unreadCount > 0 && !isMyLastMessage) {
			return "#6F42C1";
		}
		
		// When there are both read and unread messages from receiver, use gray color
		// This applies to all other cases including read messages
		return "#525866";
	};
	
	// Determine message status indicator
	const getMessageStatusIndicator = () => {
		// If there are unread messages for the current user, show unread count
		if (unreadCount > 0 && !isMyLastMessage) {
			return (
				<span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F1ECF9] text-xs font-bold text-[#6F42C1]">
					{unreadCount}
				</span>
			);
		}
		
		// If it's my last message, show read/unread status
		if (isMyLastMessage) {
			if (isMessageRead) {
				// Message has been read by receiver
				return <RiCheckDoubleLine className="h-4 w-4 text-[#6F42C1]" />;
			} else {
				// Message sent but not read by receiver
				return <RiCheckLine className="h-4 w-4 text-[#868C98]" />;
			}
		}
		
		return null;
	};

	return (
		<div
			onClick={handleSelection}
			className={cn(
				"w-full cursor-pointer border-b border-[#E2E4E9] px-4 py-6 transition-colors hover:bg-gray-50",
				user.member_id === selected?.member_id ? "bg-blue-50" : ""
			)}>
			<div className="flex w-full items-start gap-x-3">
				<div className="relative">
					<Avatar className="h-12 w-12 rounded-full">
						<AvatarImage src={user?.profile_picture || ""} className="object-cover" />
						<AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 font-medium text-white uppercase">
							{getInitials(userName)}
						</AvatarFallback>
					</Avatar>
				</div>
				<div className="min-w-0 flex-1">
					<div className="mb-1 flex items-center justify-between">
						<h3 className="truncate text-base font-semibold capitalize text-[#525866]">{userName}</h3>
						{hasLastMessage && (
							<span 
								className="text-xs font-medium" 
								style={{ color: getTimestampColor() }}
							>
								{format(new Date(lastMessageTime), "h:mm a").toUpperCase()}
							</span>
						)}
					</div>
					<div className="flex items-center justify-between gap-2">
						<p className="line-clamp-1 text-sm text-[#868C98]">{lastMessage}</p>
						{getMessageStatusIndicator()}
					</div>
				</div>
			</div>
		</div>
	);
};
