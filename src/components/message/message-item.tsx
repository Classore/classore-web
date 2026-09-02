import { RiChat3Line, RiFlagLine, RiForbid2Line, RiMore2Line } from "@remixicon/react";
import { format, isPast } from "date-fns";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "sonner";
import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useFindOrCreateRoom, useGetUserRooms } from "@/queries/message";
import type { MessageProps } from "@/types/message";
import { useUserStore } from "@/store/z-store";
import { cn, getInitials } from "@/lib";

interface Props {
	isGroup: boolean;
	message: MessageProps;
}

export const MessageItem = ({ isGroup, message }: Props) => {
	const { user } = useUserStore();
	const router = useRouter();

	const { data: userRooms } = useGetUserRooms(String(user?.id ?? ""));

	const findOrCreateRoomMutation = useFindOrCreateRoom({
		onError: (error) => {
			const errorMessage = Array.isArray(error.response?.data?.message)
				? error.response.data.message[0]
				: error.response?.data?.message;
			toast.error(errorMessage || "Unable to start direct conversation");
		},
		onSuccess: (data) => {
			const roomId = data.data.id;
			router.push(`/dashboard/messages?roomId=${roomId}`);
		},
	});

	const senderId =
		(message.sender as any)?.id ||
		(message.sender as any)?.user_id ||
		(message.sender as any)?.userId;

	const senderEmail = (message.sender as any)?.email;

	// Check if this message is from the logged-in user
	const isSender = Boolean(
		message.is_my_message === true ||
		(senderId && user?.id && String(senderId) === String(user.id)) ||
		(senderEmail && user?.email && senderEmail.toLowerCase() === user.email.toLowerCase())
	);

	const senderFirstName =
		(message.sender as any)?.first_name ||
		(message.sender as any)?.firstName ||
		(message.sender as any)?.user?.first_name ||
		(message.sender as any)?.user?.firstName ||
		(message.sender as any)?.user_first_name ||
		(isSender ? user?.first_name : "") ||
		"";

	const senderLastName =
		(message.sender as any)?.last_name ||
		(message.sender as any)?.lastName ||
		(message.sender as any)?.user?.last_name ||
		(message.sender as any)?.user?.lastName ||
		(message.sender as any)?.user_last_name ||
		(isSender ? user?.last_name : "") ||
		"";

	const senderFullName =
		`${senderFirstName} ${senderLastName}`.trim() ||
		(message.sender as any)?.name ||
		(isSender ? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() : "") ||
		"Classmate";

	const profileImage =
		(message.sender as any)?.profile_image ||
		(message.sender as any)?.profile_picture ||
		(message.sender as any)?.profilePicture ||
		(message.sender as any)?.profileImage ||
		(message.sender as any)?.user?.profile_image ||
		(message.sender as any)?.user?.profile_picture ||
		(isSender ? user?.profile_image : "") ||
		"";

	const initials = getInitials(senderFullName);

	const handleOpenDM = React.useCallback(
		(targetUserId: string) => {
			if (!user?.id || targetUserId === user.id) return;

			// Fast path: check if 1-on-1 direct room already exists
			const existingRoom = Array.isArray(userRooms)
				? userRooms.find((r) => {
					if (r.is_group === "YES") return false;
					const membersList = Array.isArray(r.members) ? r.members : [];
					return membersList.some((m: any) => {
						if (typeof m === "string") return m === targetUserId;
						return m?.id === targetUserId || m?.user_id === targetUserId;
					});
				})
				: null;

			if (existingRoom?.id) {
				router.push(`/dashboard/messages?roomId=${existingRoom.id}`);
				return;
			}

			toast.loading("Starting private chat...", { id: "open-dm" });
			findOrCreateRoomMutation.mutate([targetUserId], {
				onSettled: () => toast.dismiss("open-dm"),
			});
		},
		[user?.id, userRooms, findOrCreateRoomMutation, router]
	);

	const options = (userId: string) => {
		return [
			{
				icon: RiChat3Line,
				label: "Send DM",
				onClick: () => handleOpenDM(userId),
				bad: false,
			},
			{ icon: RiFlagLine, label: "Report User", onClick: () => toast.info("User reported"), bad: false },
			{ icon: RiForbid2Line, label: "Block User", onClick: () => toast.info("User blocked"), bad: true },
		];
	};

	return (
		<div
			className={cn(
				"group flex max-w-[85%] md:max-w-[70%] items-start gap-x-2",
				isSender ? "flex-row-reverse self-end" : "self-start"
			)}>
			{/* Avatar with click-to-DM for other users */}
			<Avatar
				onClick={() => !isSender && senderId && handleOpenDM(senderId)}
				className={cn(
					"size-9 shrink-0 rounded-lg",
					!isSender ? "cursor-pointer transition-transform hover:scale-105" : ""
				)}
				title={!isSender ? `Message ${senderFullName}` : undefined}
			>
				<AvatarImage src={profileImage} />
				<AvatarFallback className={cn(
					"text-xs font-semibold uppercase",
					isSender ? "bg-primary-700 text-white" : "bg-primary-100 text-primary-700"
				)}>
					{initials}
				</AvatarFallback>
			</Avatar>

			<div
				className={cn(
					"min-w-40 space-y-1 rounded-2xl p-3.5 shadow-2xs",
					isSender
						? "rounded-tr-none bg-primary-600 text-white"
						: "rounded-tl-none bg-white border border-neutral-100 text-neutral-900"
				)}>
				{/* Sender name in group channels (only for received messages) */}
				{isGroup && !isSender && (
					<div className="flex items-center justify-between gap-2 pb-0.5">
						<button
							onClick={() => senderId && handleOpenDM(senderId)}
							className="truncate text-xs font-bold text-primary-600 hover:underline text-left capitalize"
						>
							{senderFullName}
						</button>
						<span className="shrink-0 text-[10px] text-neutral-400 font-normal">
							Student
						</span>
					</div>
				)}

				<p className={cn("text-sm whitespace-pre-wrap leading-relaxed", isSender ? "text-white" : "text-neutral-800")}>
					{message.content}
				</p>

				{message.media && message.media.length > 0 && (
					<div className="flex flex-wrap gap-2 pt-1">
						{message.media.map((image, index) => (
							<div key={index} className="relative size-16 overflow-hidden rounded-lg border border-neutral-200">
								<Image src={image} alt={`attachment-${index}`} fill className="object-cover" />
							</div>
						))}
					</div>
				)}

				<div className={cn("flex w-full items-center justify-end pt-1", isSender ? "text-white/70" : "text-neutral-400")}>
					<p className="text-[10px]">
						{message.updatedOn
							? isPast(new Date(message.updatedOn))
								? format(new Date(message.updatedOn), "dd/MM/yyyy hh:mm a")
								: format(new Date(message.updatedOn), "hh:mm a")
							: ""}
					</p>
				</div>
			</div>

			{/* Options Popover */}
			{isGroup && !isSender && senderId && (
				<Popover>
					<PopoverTrigger asChild>
						<button className="my-auto opacity-0 group-hover:opacity-100 transition-opacity p-1 text-neutral-400 hover:text-neutral-600 rounded">
							<RiMore2Line className="size-4" />
						</button>
					</PopoverTrigger>
					<PopoverContent className="w-40 p-1.5 shadow-md">
						<div className="space-y-1">
							{options(senderId).map(({ bad, icon: Icon, label, onClick }, index) => (
								<button
									key={index}
									className={cn(
										"flex w-full items-center gap-x-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
										bad
											? "text-red-600 hover:bg-red-50"
											: "text-neutral-700 hover:bg-neutral-100"
									)}
									onClick={onClick}>
									<Icon className="size-3.5" />
									{label}
								</button>
							))}
						</div>
					</PopoverContent>
				</Popover>
			)}
		</div>
	);
};
