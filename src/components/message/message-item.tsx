import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { MessageProps } from "@/types/message";
import { useUserStore } from "@/store/z-store";
import { cn, getInitials } from "@/lib";

interface Props {
	message: MessageProps;
}

export const MessageItem = ({ message }: Props) => {
	const { user } = useUserStore();

	const isSender = user?.id === message.sender.id;
	const initials = getInitials(`${message.sender.first_name} ${message.sender.last_name}`);
	const sender = `${message.sender.first_name} ${message.sender.last_name}`;

	return (
		<div
			className={cn(
				"flex w-1/2 items-start gap-x-2",
				isSender ? "flex-row-reverse self-end" : "self-start"
			)}>
			<Avatar className="size-10 rounded-lg">
				<AvatarImage src={message.sender.profile_image} />
				<AvatarFallback>{initials}</AvatarFallback>
			</Avatar>
			<div className={cn("flex-1 rounded-lg p-3", isSender ? "bg-pink-50" : "bg-white")}>
				<div
					className={cn("rounded-3xl px-2 py-1", isSender ? "bg-purple-900 text-white" : "bg-white")}>
					{isSender ? "You" : `${sender}`}
				</div>
				<div>
					<p>{message.content}</p>
				</div>
			</div>
		</div>
	);
};
