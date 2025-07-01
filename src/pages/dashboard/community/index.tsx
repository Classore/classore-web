import { type Socket, io } from "socket.io-client";
import { useRouter } from "next/router";
import { toast } from "sonner";
import React from "react";
import {
	RiAiGenerate,
	RiArrowLeftSLine,
	RiEmojiStickerLine,
	RiForbid2Line,
	RiHashtag,
	RiImageAddLine,
	RiMore2Line,
	RiSearchLine,
	RiSendPlaneLine,
	RiVolumeMuteLine,
	RiVolumeUpLine,
} from "@remixicon/react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetInfiniteMessages, useGetForums } from "@/queries/message";
import { useDeviceWidth, useFileHandler } from "@/hooks";
import { DashboardLayout } from "@/components/layouts";
import { MessageItem } from "@/components/message";
import type { RoomProps } from "@/types/message";
import { useUserStore } from "@/store/z-store";
import { Seo } from "@/components/shared";
import { cn, sendMessage } from "@/lib";

type FormProps = {
	content: string;
	media: File[];
};

const initialValues: FormProps = {
	content: "",
	media: [],
};

const Page = () => {
	const router = useRouter();

	const [shouldAutoScroll, setShouldAutoScroll] = React.useState(false);
	const [formValues, setFormValues] = React.useState(initialValues);
	const [room, setRoom] = React.useState<RoomProps | null>(null);
	const [isTyping, setIsTyping] = React.useState(false);
	const [, setIsLoadingOlder] = React.useState(false);
	const { isMobile } = useDeviceWidth();
	const { user } = useUserStore();
	const [open, setOpen] = React.useState(isMobile);

	const socket = React.useRef<Socket | null>(null);
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		setOpen(isMobile);
	}, [isMobile]);

	React.useEffect(() => {
		socket.current = io(
			process.env.NEXT_PUBLIC_WSS_URL || "wss://classore-be-june-224829194037.europe-west1.run.app",
			{
				transports: ["websocket"],
			}
		);
		socket.current.on("connect", () => {
			console.info("Socket connected");
		});
		socket.current.on("error", (error) => {
			console.error("Socket error", error);
		});
		socket.current.on("receive_chat_message", (data) => {
			console.log("received:", data);
		});
		socket.current.on("is_typing", () => setIsTyping(true));
		socket.current.on("message_delivered", (data) => {
			console.log("delivered:", data);
		});

		return () => {
			socket.current?.off("connect");
			socket.current?.off("error");
			socket.current?.off("receive_chat_message");
			socket.current?.off("is_typing");
			socket.current?.off("message_delivered");
			socket.current?.disconnect();
		};
	}, [user]);

	const { data: forums } = useGetForums(String(user?.id));
	const roomId = router.query.roomId as string;

	React.useEffect(() => {
		if (roomId && forums?.data && !room) {
			const foundRoom = forums.data.find((forum) => forum.id === roomId);
			if (foundRoom) {
				setRoom(foundRoom);
			}
		}
	}, [roomId, forums?.data, room]);

	const {
		data: messagesData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		isLoading,
		refetch,
	} = useGetInfiniteMessages({
		roomId: room?.id || "",
		user_id: user?.id || "",
		limit: 100,
	});

	const messages = React.useMemo(() => {
		if (!messagesData?.pages) return [];
		return messagesData.pages.flatMap((page) => page.data).reverse();
	}, [messagesData]);

	const handleMuteRoom = (e: React.MouseEvent, roomId: string) => {
		e.stopPropagation();
		console.log("mute", roomId);
	};

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const { handleFileChange, inputRef } = useFileHandler({
		onFilesChange: (files) => {
			setFormValues({ ...formValues, media: files });
		},
		onError: (error) => toast.error(error.message),
	});

	const options = [
		{ icon: RiVolumeMuteLine, label: "mute chat", destructive: false },
		{ icon: RiSearchLine, label: "search chat", destructive: false },
		{ icon: RiForbid2Line, label: "leave rom", destructive: true },
	];

	const scrollToBottom = () => {
		if (ref.current) {
			ref.current.scrollTop = ref.current.scrollHeight;
		}
	};

	const checkIfShouldAutoScroll = () => {
		if (!ref.current) return;

		const { scrollTop, scrollHeight, clientHeight } = ref.current;
		const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
		setShouldAutoScroll(isNearBottom);
	};

	const handleScroll = React.useCallback(() => {
		if (!ref.current) return;
		const { scrollTop } = ref.current;

		if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
			setIsLoadingOlder(true);
			const currentScrollHeight = ref.current.scrollHeight;

			fetchNextPage().then(() => {
				setTimeout(() => {
					if (ref.current) {
						const newScrollHeight = ref.current.scrollHeight;
						ref.current.scrollTop = newScrollHeight - currentScrollHeight;
					}
					setIsLoadingOlder(false);
				}, 100);
			});
		}

		checkIfShouldAutoScroll();
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!socket.current) {
			toast.error("Socket not connected");
			return;
		}
		if (!room?.id) {
			toast.error("Please select a chat");
			return;
		}
		if (!formValues.content) {
			toast.error("Please enter a message");
			return;
		}
		sendMessage(socket.current, {
			roomId: String(room?.id),
			userId: String(user?.id),
			message: formValues.content,
		});
		console.log("message sent", new Date().toDateString());

		await refetch();
		setFormValues(initialValues);
		setShouldAutoScroll(true);
	};

	React.useEffect(() => {
		if (shouldAutoScroll) {
			scrollToBottom();
		}
	}, [shouldAutoScroll, messages]);

	React.useEffect(() => {
		setShouldAutoScroll(true);
		setTimeout(scrollToBottom, 100);
	}, [room]);

	React.useEffect(() => {
		const chatElement = ref.current;
		if (chatElement) {
			chatElement.addEventListener("scroll", handleScroll);
			return () => chatElement.removeEventListener("scroll", handleScroll);
		}
	}, [handleScroll]);

	return (
		<>
			<Seo title="Community Forum" />
			<DashboardLayout className="px-0 py-0 lg:px-0 lg:py-0">
				<div className="relative flex h-full w-full items-start">
					<aside className="hidden h-full w-[280px] flex-col border-r border-neutral-200 lg:flex">
						<div className="h-[76px] w-full border-b border-neutral-200">
							<p className="font-medium lg:text-xl"></p>
						</div>
						<div className="h-[calc(100%-76px)] w-full space-y-4 overflow-y-auto p-5">
							{forums?.data?.map((forum) => (
								<div
									key={forum.id}
									onClick={() => setRoom(forum)}
									className={cn(
										"flex h-10 w-full cursor-pointer items-center gap-x-1 rounded-md px-3 text-neutral-400 hover:bg-neutral-200",
										room?.id === forum.id && "bg-neutral-300"
									)}>
									<span className="flex flex-1 items-center gap-x-2">
										{forum.bundle_name.includes("general") ? (
											<RiAiGenerate className="size-4" />
										) : (
											<RiHashtag className="size-4" />
										)}
										<span className="truncate text-[10px] font-medium uppercase lg:text-xs">
											{forum.bundle_name}
										</span>
									</span>
									<button onClick={(e) => handleMuteRoom(e, forum.id)}>
										<RiVolumeUpLine className="size-4" />
									</button>
								</div>
							))}
						</div>
					</aside>
					{open && (
						<aside className="absolute left-0 top-0 !z-[5] h-full w-full space-y-2 overflow-y-auto bg-white lg:hidden">
							{forums?.data?.map((forum) => (
								<div
									key={forum.id}
									onClick={() => {
										setRoom(forum);
										setOpen(false);
									}}
									className="flex h-12 w-full cursor-pointer items-center gap-x-1 border-b border-neutral-300 px-3 text-neutral-400 last:border-b-0 hover:bg-neutral-200">
									<span className="flex flex-1 items-center gap-x-2">
										{forum.bundle_name.includes("general") ? (
											<RiAiGenerate className="size-4" />
										) : (
											<RiHashtag className="size-4" />
										)}
										<span className="truncate text-xs font-medium uppercase">{forum.bundle_name}</span>
									</span>
									<button onClick={(e) => handleMuteRoom(e, forum.id)}>
										<RiVolumeUpLine className="size-4" />
									</button>
								</div>
							))}
						</aside>
					)}
					<div className="h-full flex-1">
						{room && (
							<div className="flex h-10 w-full items-center justify-between border-b border-neutral-200 px-8 lg:h-[76px]">
								<div className="flex items-center gap-x-2 lg:gap-x-4">
									<button className="block lg:hidden" onClick={() => setOpen(true)}>
										<RiArrowLeftSLine />
									</button>
									<div className="rounded-lg bg-green-500 p-2 text-white">
										{!room || room.bundle_name?.includes("general") ? (
											<RiAiGenerate className="size-3 lg:size-6" />
										) : (
											<RiHashtag className="size-3 lg:size-6" />
										)}
									</div>
									<div>
										<p className="text-sm font-medium uppercase lg:text-base">{room.bundle_name}</p>
										{isTyping ? (
											<p className="text-[10px] text-neutral-400 lg:text-xs">someone is typing...</p>
										) : (
											<p className="text-[10px] text-neutral-400 lg:text-xs">{room.members.length} members</p>
										)}
									</div>
								</div>
								<Popover>
									<PopoverTrigger asChild>
										<button className="grid size-8 place-items-center rounded-md bg-neutral-100 hover:bg-neutral-200">
											<RiMore2Line className="size-5 text-neutral-500" />
										</button>
									</PopoverTrigger>
									<PopoverContent className="mr-10 w-[180px] space-y-2 p-2">
										{options.map(({ destructive, icon: Icon, label }, index) => (
											<button
												key={index}
												className={cn(
													"flex h-4 w-full items-center gap-x-2 rounded-md px-3 text-xs capitalize transition-colors duration-300 lg:h-8 lg:text-sm",
													destructive ? "text-red-500 hover:bg-red-100" : "text-neutral-500 hover:bg-neutral-200"
												)}>
												<Icon className="size-4" /> {label}
											</button>
										))}
									</PopoverContent>
								</Popover>
							</div>
						)}
						<div
							ref={ref}
							className="flex h-[calc(100%-148px)] w-full flex-col gap-y-5 overflow-y-auto bg-[#F6F8FA] px-5 py-2 lg:h-[calc(100%-184px)]">
							{isFetchingNextPage && (
								<div className="flex justify-center py-2">
									<div className="text-sm text-neutral-500">Loading older messages...</div>
								</div>
							)}
							{isLoading ? (
								<div className="flex h-full items-center justify-center">
									<div className="text-sm text-neutral-500">Loading messages...</div>
								</div>
							) : messages.length > 0 ? (
								messages.map((message) => <MessageItem key={message.id} message={message} isGroup />)
							) : (
								<div className="flex h-full items-center justify-center">
									<div className="text-sm text-neutral-500">No messages yet. Start the conversation!</div>
								</div>
							)}
							{isFetchingPreviousPage && (
								<div className="flex justify-center py-2">
									<div className="text-sm text-neutral-500">Loading new messages...</div>
								</div>
							)}
						</div>
						{room && (
							<div className="h-[108px] w-full px-8 py-2">
								<form
									onSubmit={handleSubmit}
									className="flex h-full w-full items-center gap-x-4 rounded-lg bg-neutral-200 px-4 py-1">
									<div className="h-full flex-1">
										<textarea
											value={formValues.content}
											name="content"
											onChange={handleChange}
											className="h-full w-full resize-none rounded-lg border-0 bg-transparent text-sm outline-none"
											placeholder="Type your message..."
										/>
										<input
											type="file"
											ref={inputRef}
											onChange={handleFileChange}
											className="sr-only hidden appearance-none"
											multiple
											accept="image/*,video/*"
										/>
									</div>
									<div className="flex items-center gap-x-4">
										<label htmlFor="image" className="flex size-6 cursor-pointer items-center justify-center">
											<input
												type="file"
												id="image"
												className="sr-only"
												onChange={handleFileChange}
												multiple={false}
												accept="image/*"
											/>
											<RiImageAddLine className="text-neutral-500" />
										</label>
										<button className="size-6" type="button">
											<RiEmojiStickerLine className="text-neutral-500" />
										</button>
										<button className="size-6" type="submit">
											<RiSendPlaneLine className="text-neutral-500" />
										</button>
									</div>
								</form>
							</div>
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
