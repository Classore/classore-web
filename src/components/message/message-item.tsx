import { RiChat3Line, RiFlagLine, RiForbid2Line, RiMore2Line } from "@remixicon/react";
import { format, isPast } from "date-fns";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "sonner";
import React from "react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useFindOrCreateRoom } from "@/queries/message";
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

	const { mutate } = useFindOrCreateRoom({
		onError: (error) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "Unable to create room";
			toast.error(message);
		},
		onSuccess: (data) => {
			const roomId = data.data.id;
			router.push(`/dashboard/message?roomId=${roomId}`);
		},
	});

	const isSender = user?.id === message.sender.id;
	const initials = getInitials(`${message.sender.first_name} ${message.sender.last_name}`);

	const options = (userId: string) => {
		return [
			{
				icon: RiChat3Line,
				label: "Send DM",
				onClick: () => mutate([userId]),
				bad: false,
			},
			{ icon: RiFlagLine, label: "Report User", onClick: () => {}, bad: false },
			{ icon: RiForbid2Line, label: "Block User", onClick: () => {}, bad: true },
		];
	};

	return (
		<div
			className={cn(
				"group flex w-1/2 items-start gap-x-2",
				isSender ? "flex-row-reverse self-end" : "self-start"
			)}>
			<Avatar className="size-10 rounded-lg">
				<AvatarImage src={message.sender.profile_image} />
				<AvatarFallback className="bg-primary-200 text-sm font-semibold">{initials}</AvatarFallback>
			</Avatar>
			<div
				className={cn(
					"min-w-40 space-y-2 rounded-lg p-3",
					isSender ? "rounded-tr-none bg-primary-100 text-right" : "rounded-tl-none bg-secondary-100"
				)}>
				<p className="text-sm">{message.content}</p>
				{message.media.length > 0 && (
					<div className="flex w-full items-center gap-x-2">
						{message.media.map((image, index) => (
							<Image src={image} alt={`image-${index}`} key={index} width={40} height={40} />
						))}
					</div>
				)}
				<div className="flex w-full items-center justify-end">
					{isPast(message.updatedOn) ? (
						<p className="text-[10px] text-neutral-500">
							{format(message.updatedOn, "dd/MM/yyyy hh:mm a")}
						</p>
					) : (
						<p className="text-[10px] text-neutral-500">{format(message.updatedOn, "hh:mm a")}</p>
					)}
				</div>
			</div>
			{isGroup && !isSender && (
				<Popover>
					<PopoverTrigger asChild>
						<button className="my-auto hidden group-hover:block">
							<RiMore2Line className="size-3" />
						</button>
					</PopoverTrigger>
					<PopoverContent>
						<div className="w-[150px] space-y-2 p-2">
							{options(message.sender.id).map(({ bad, icon: Icon, label, onClick }, index) => (
								<button
									key={index}
									className={cn(
										"flex w-full items-center gap-x-1 rounded p-1 text-xs font-medium hover:bg-neutral-200",
										bad ? "text-red-500" : "text-neutral-500"
									)}
									onClick={onClick}>
									<Icon className="size-3" />
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
