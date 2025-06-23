import { type Socket, io } from "socket.io-client";
import { toast } from "sonner";
import React from "react";
import {
	RiAiGenerate,
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
import { DashboardLayout } from "@/components/layouts";
import { MessageItem } from "@/components/message";
import type { RoomProps } from "@/types/message";
import { useUserStore } from "@/store/z-store";
import { Seo } from "@/components/shared";
import { useFileHandler } from "@/hooks";
import { cn, sendMessage } from "@/lib";

type FormProps = {
	content: string;
	media: File[];
};

const isDev = process.env.NODE_ENV === "development";
const initialValues: FormProps = {
	content: "",
	media: [],
};

const Page = () => {
	const [shouldAutoScroll, setShouldAutoScroll] = React.useState(false);
	const [formValues, setFormValues] = React.useState(initialValues);
	const [room, setRoom] = React.useState<RoomProps | null>(null);
	const [, setIsLoadingOlder] = React.useState(false);
	const [isTyping, setIsTyping] = React.useState(false);
	const { user } = useUserStore();

	const socket = React.useRef<Socket | null>(null);
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const url = isDev
			? process.env.NEXT_PUBLIC_WSS_URL
			: "wss://classore-be-june-224829194037.europe-west1.run.app";

		socket.current = io(url, {
			transports: ["websocket"],
		});
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

	const {
		data: messagesData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		isLoading,
		refetch,
	} = useGetInfiniteMessages({
		roomId: String(room?.id),
		user_id: String(user?.id),
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

	const { handleClick, handleFileChange, inputRef } = useFileHandler({
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

	// Handle scroll to load older messages
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
				<div className="grid h-full w-full grid-cols-1 lg:grid-cols-4">
					<div className="hidden flex-col border-r border-neutral-200 lg:flex">
						<div className="h-[76px] w-full border-b border-neutral-200">
							<p className="font-medium lg:text-xl"></p>
						</div>
						<div className="h-[calc(100%-76px)] w-full space-y-4">
							{forums?.data?.map((forum) => (
								<div key={forum.id} className="flex h-16 w-full items-center px-5">
									<div
										onClick={() => setRoom(forum)}
										className={cn(
											"flex h-10 w-full cursor-pointer items-center justify-between rounded-md px-3 text-sm font-medium text-neutral-400 hover:bg-neutral-200",
											room?.id === forum.id && "bg-neutral-300"
										)}>
										<span className="flex items-center gap-x-2">
											{forum.bundle_name.includes("general") ? (
												<RiAiGenerate className="size-4" />
											) : (
												<RiHashtag className="size-4" />
											)}
											<span className="uppercase">{forum.bundle_name}</span>
										</span>
										<button onClick={(e) => handleMuteRoom(e, forum.id)}>
											<RiVolumeUpLine className="size-4" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="col-span-3">
						{room && (
							<div className="flex h-[76px] w-full items-center justify-between border-b border-neutral-200 px-8">
								<div className="flex items-center gap-x-4">
									<div className="rounded-lg bg-green-500 p-2 text-white">
										{!room || room.bundle_name?.includes("general") ? <RiAiGenerate /> : <RiHashtag />}
									</div>
									<div>
										<p className="font-medium uppercase">{room.bundle_name}</p>
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
													"flex h-8 w-full items-center gap-x-2 rounded-md px-3 text-sm capitalize transition-colors duration-300",
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
							className="flex h-[calc(100%-184px)] w-full flex-col gap-y-5 overflow-y-auto bg-[#F6F8FA] px-5 py-2">
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
								messages.map((message) => <MessageItem key={message.id} message={message} />)
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
										<button onClick={handleClick} className="size-6" type="button">
											<RiImageAddLine className="text-neutral-500" />
										</button>
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
