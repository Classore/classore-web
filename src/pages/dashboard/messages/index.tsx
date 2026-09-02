import { type Socket, io } from "socket.io-client";
import { RiArrowLeftSLine, RiChat3Line, RiMore2Line, RiImageAddLine } from "@remixicon/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "sonner";
import React from "react";

import { useGetInfiniteMessages, useGetUserRooms, useSendMessage } from "@/queries/message";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { MessageProps, UserItemProps } from "@/types/message";
import { useDeviceWidth, useFileHandler } from "@/hooks";
import { MessageItem, UserItem } from "@/components/message";
import { DashboardLayout } from "@/components/layouts";
import { useUserStore } from "@/store/z-store";
import { Seo } from "@/components/shared";
import { cn, getInitials, axios } from "@/lib";
import { endpoints } from "@/config";

const options = [
	{ destructive: false, label: "View Profile", icon: RiMore2Line },
	{ destructive: true, label: "Block User", icon: RiMore2Line },
	{ destructive: true, label: "Report User", icon: RiMore2Line },
];

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
	const { isMobile } = useDeviceWidth();
	const { user } = useUserStore();
	const queryClient = useQueryClient();

	const [selected, setSelected] = React.useState<UserItemProps | null>(null);
	const [shouldAutoScroll, setShouldAutoScroll] = React.useState(false);
	const [formValues, setFormValues] = React.useState(initialValues);
	const [localMessages, setLocalMessages] = React.useState<MessageProps[]>([]);
	const [, setIsLoadingOlder] = React.useState(false);
	const [isTyping, setIsTyping] = React.useState(false);
	const typingTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
	const socket = React.useRef<Socket | null>(null);
	const ref = React.useRef<HTMLDivElement>(null);
	const [open, setOpen] = React.useState(isMobile);

	const [roomId, setRoomId] = React.useState((router.query.roomId as string) || "");

	const { data: rooms } = useGetUserRooms(String(user?.id ?? ""));

	// Reactively sync with router query roomId and recipient details
	React.useEffect(() => {
		const qRoomId = router.query.roomId as string;
		const recipientName = router.query.recipient_name as string;
		const recipientImage = router.query.recipient_image as string;
		const recipientId = router.query.recipient_id as string;

		if (qRoomId) {
			setRoomId(qRoomId);
			if (isMobile) {
				setOpen(false);
			}
			if (socket.current?.connected) {
				socket.current.emit("join_room", { roomId: qRoomId });
			}

			// Try to find the partner in the user's rooms list
			if (rooms && rooms.length > 0) {
				const found = rooms.find((r) => r.id === qRoomId);
				if (found) {
					const otherMember =
						found.members?.find((m) => {
							const mId = m.user_id || (m as any).id;
							return mId && user?.id && String(mId) !== String(user.id);
						}) || found.members?.[0];

					if (otherMember) {
						setSelected(otherMember);
						return;
					}
				}
			}

			// Fallback: construct partner from URL query params
			if (recipientId || recipientName) {
				const rawName = recipientName ? decodeURIComponent(recipientName) : "Classmate";
				const parts = rawName.split(" ");
				setSelected({
					member_id: recipientId || qRoomId,
					user_id: recipientId || qRoomId,
					first_name: parts[0] || "Classmate",
					last_name: parts.slice(1).join(" ") || "",
					email: "",
					profile_picture: recipientImage ? decodeURIComponent(recipientImage) : null,
					is_my_data: false,
				});
			}
		}
	}, [
		router.query.roomId,
		router.query.recipient_name,
		router.query.recipient_image,
		router.query.recipient_id,
		rooms,
		user?.id,
		isMobile,
	]);

	// Clear local optimistic messages when switching rooms
	React.useEffect(() => {
		setLocalMessages([]);
	}, [roomId]);

	// ── Socket ─────────────────────────────────────────────────────────────
	React.useEffect(() => {
		socket.current = io(
			process.env.NEXT_PUBLIC_WSS_URL || "wss://classore-be-june-224829194037.europe-west1.run.app",
			{ transports: ["websocket"] }
		);
		socket.current.on("connect", () => {
			if (user?.id) {
				socket.current?.emit("join_user_rooms", { userId: String(user.id) });
			}
		});
		socket.current.on("receive_chat_message", () => {
			queryClient.invalidateQueries({ queryKey: ["infinite_messages"], exact: false });
			queryClient.invalidateQueries({ queryKey: ["messages"], exact: false });
			setShouldAutoScroll(true);
		});
		socket.current.on("is_typing", () => {
			setIsTyping(true);
			if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
			typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
		});

		return () => {
			if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
			socket.current?.off("connect");
			socket.current?.off("receive_chat_message");
			socket.current?.off("is_typing");
			socket.current?.disconnect();
		};
	}, [user, queryClient]);

	const {
		data: messagesData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		isLoading,
		refetch,
	} = useGetInfiniteMessages({ roomId, user_id: String(user?.id), limit: 50 });

	// Flatten, deduplicate, and sort ascending by createdOn (matches mobile)
	const serverMessages = React.useMemo<MessageProps[]>(() => {
		if (!messagesData?.pages) return [];
		const flat = messagesData.pages.flatMap((page) => {
			const inner = (page as any)?.data ?? page;
			return Array.isArray(inner) ? inner : [];
		});
		const seen = new Set<string>();
		const unique: MessageProps[] = [];
		for (const msg of flat) {
			if (msg.id && !seen.has(msg.id)) {
				seen.add(msg.id);
				unique.push(msg);
			}
		}
		return unique.sort(
			(a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
		);
	}, [messagesData]);

	// Merge with optimistic local messages
	const messages = React.useMemo<MessageProps[]>(() => {
		const serverContents = new Set(
			serverMessages.map((m) => (m.content ?? "").trim().toLowerCase())
		);
		const uniqueLocal = localMessages.filter(
			(m) => !serverContents.has((m.content ?? "").trim().toLowerCase())
		);
		return [...serverMessages, ...uniqueLocal].sort(
			(a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
		);
	}, [serverMessages, localMessages]);

	// ── Auto-scroll ────────────────────────────────────────────────────────
	const scrollToBottom = () => {
		const chatElement = ref.current;
		if (chatElement) {
			chatElement.scrollTop = chatElement.scrollHeight;
		}
	};

	const handleScroll = React.useCallback(() => {
		const chatElement = ref.current;
		if (!chatElement) return;

		const { scrollTop, scrollHeight, clientHeight } = chatElement;
		if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
			setIsLoadingOlder(true);
			const previousScrollHeight = chatElement.scrollHeight;
			fetchNextPage().then(() => {
				setTimeout(() => {
					if (chatElement) {
						chatElement.scrollTop = chatElement.scrollHeight - previousScrollHeight;
					}
					setIsLoadingOlder(false);
				}, 100);
			});
		}

		const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
		setShouldAutoScroll(isNearBottom);
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	// ── Send Message ───────────────────────────────────────────────────────
	const sendMessageMutation = useSendMessage();

	const { handleFileChange, inputRef } = useFileHandler({
		onFilesChange: (files) => setFormValues((v) => ({ ...v, media: files })),
		onError: (err) => toast.error(err.message),
	});

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!roomId) return;
		const text = formValues.content.trim();
		if (!text && !formValues.media.length) return;

		if (formValues.media.length > 0) {
			try {
				const formData = new FormData();
				formData.append("room", roomId);
				if (text) formData.append("content", text);
				formValues.media.forEach((file) => {
					formData.append("files", file);
				});
				await axios.post(endpoints().message.send_message, formData);
				await refetch();
				setFormValues(initialValues);
				setShouldAutoScroll(true);
			} catch (error: any) {
				const message = error?.response?.data?.message || "Failed to send attachment";
				toast.error(message);
			}
		} else if (text) {
			const optimistic: MessageProps = {
				id: `local-${Date.now()}`,
				content: text,
				sender: {
					id: user?.id ?? "",
					first_name: (user as any)?.first_name ?? "",
					last_name: (user as any)?.last_name ?? "",
					profile_image: (user as any)?.profile_image ?? "",
					email: (user as any)?.email ?? "",
					phone_number: "",
				},
				media: [],
				is_my_message: true,
				createdOn: new Date() as unknown as Date,
				updatedOn: new Date() as unknown as Date,
				room: roomId,
				isDeleted: false,
			};
			setLocalMessages((prev) => [...prev, optimistic]);
			setFormValues(initialValues);
			setShouldAutoScroll(true);

			sendMessageMutation.mutate(
				{ room: roomId, content: text },
				{
					onSuccess: () => {
						refetch();
					},
					onError: () => {
						toast.error("Failed to send message. Please try again.");
						setLocalMessages((prev) =>
							prev.filter((m) => m.id !== optimistic.id)
						);
					},
				}
			);
		}
	};

	React.useEffect(() => {
		if (shouldAutoScroll) {
			scrollToBottom();
		}
	}, [shouldAutoScroll, messages]);

	React.useEffect(() => {
		setShouldAutoScroll(true);
		setTimeout(scrollToBottom, 100);
	}, [selected]);

	React.useEffect(() => {
		const chatElement = ref.current;
		if (chatElement) {
			chatElement.addEventListener("scroll", handleScroll);
			return () => chatElement.removeEventListener("scroll", handleScroll);
		}
	}, [handleScroll]);

	const handleSelectRoom = (rId: string) => {
		setRoomId(rId);
		setOpen(false);
		if (socket.current?.connected) {
			socket.current.emit("join_room", { roomId: rId });
		}
	};

	const partnerName = selected
		? `${selected.first_name || ""} ${selected.last_name || ""}`.trim() ||
		  (selected as any)?.name ||
		  "Classmate"
		: "";

	return (
		<>
			<Seo title="Messages" />
			<DashboardLayout className="p-0 md:px-0">
				<div className="relative flex h-full w-full items-start overflow-hidden">
					{/* ── Sidebar: Room list ── */}
					<aside
						className={cn(
							"h-full w-full lg:w-[325px] lg:shrink-0 border-r border-neutral-200 bg-white flex flex-col",
							!open && isMobile ? "hidden" : "flex"
						)}
					>
						<div className="flex h-[76px] shrink-0 items-center border-b border-neutral-200 px-6">
							<p className="text-xl font-bold text-neutral-900">Messages</p>
						</div>

						<div className="flex-1 overflow-y-auto">
							{!rooms?.length ? (
								<div className="flex flex-col items-center justify-center py-16 px-4 gap-2">
									<RiChat3Line className="size-10 text-neutral-300" />
									<p className="text-sm font-semibold text-neutral-600">No chats yet</p>
									<p className="text-xs text-neutral-400 text-center">
										Direct messages with classmates will appear here.
									</p>
								</div>
							) : (
								rooms
									.filter((room) => room.is_group === "NO")
									.map((room) => (
										<UserItem
											key={room.id}
											onSelect={setSelected}
											onSelectRoom={handleSelectRoom}
											selected={selected}
											room={room}
											socket={socket.current}
										/>
									))
							)}
						</div>
					</aside>

					{/* ── Chat area ── */}
					<div
						className={cn(
							"flex-1 h-full flex flex-col overflow-hidden bg-white",
							open && isMobile ? "hidden" : "flex"
						)}
					>
						{roomId || selected ? (
							<>
								{/* Header */}
								<div className="flex h-[76px] shrink-0 items-center justify-between border-b border-neutral-200 px-6 bg-white z-10">
									<div className="flex items-center gap-x-3 min-w-0">
										<button
											className="block lg:hidden text-neutral-500 hover:text-neutral-700 p-1"
											onClick={() => setOpen(true)}
										>
											<RiArrowLeftSLine className="size-5" />
										</button>
										<Avatar className="size-10 rounded-xl border border-neutral-200 bg-primary-100 shrink-0">
											<AvatarImage src={selected?.profile_picture || ""} />
											<AvatarFallback className="bg-primary-100 text-xs font-bold uppercase text-primary-700">
												{getInitials(partnerName)}
											</AvatarFallback>
										</Avatar>
										<div className="min-w-0">
											<p className="truncate text-sm font-bold capitalize text-neutral-900">
												{partnerName}
											</p>
											<p className="truncate text-xs text-neutral-400">
												{isTyping ? "typing..." : selected?.email || "Direct Message"}
											</p>
										</div>
									</div>

									<Popover>
										<PopoverTrigger asChild>
											<button className="grid size-8 place-items-center rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600">
												<RiMore2Line className="size-4" />
											</button>
										</PopoverTrigger>
										<PopoverContent className="w-44 p-1.5 shadow-md">
											<div className="space-y-1">
												{options.map(({ destructive, label }, idx) => (
													<button
														key={idx}
														onClick={() => toast.info(label)}
														className={cn(
															"flex h-8 w-full items-center rounded-md px-3 text-xs font-medium transition-colors",
															destructive
																? "text-red-600 hover:bg-red-50"
																: "text-neutral-700 hover:bg-neutral-100"
														)}
													>
														{label}
													</button>
												))}
											</div>
										</PopoverContent>
									</Popover>
								</div>

								{/* Messages Body */}
								<div
									ref={ref}
									className="flex flex-1 flex-col gap-y-4 overflow-y-auto bg-[#F6F8FA] px-6 py-4"
								>
									{isFetchingNextPage && (
										<p className="py-2 text-center text-xs text-neutral-400">
											Loading older messages...
										</p>
									)}
									{isLoading ? (
										<div className="flex h-full items-center justify-center">
											<p className="text-sm text-neutral-400">Loading messages...</p>
										</div>
									) : messages.length > 0 ? (
										messages.map((message) => (
											<MessageItem key={message.id} message={message} isGroup={false} />
										))
									) : (
										<div className="flex h-full items-center justify-center">
											<p className="text-sm text-neutral-400">
												No messages yet. Start the conversation!
											</p>
										</div>
									)}
									{isFetchingPreviousPage && (
										<p className="py-2 text-center text-xs text-neutral-400">
											Loading new messages...
										</p>
									)}
								</div>

								{/* Input Area */}
								<div className="shrink-0 border-t border-neutral-200 bg-white px-6 py-3">
									<form
										onSubmit={handleSubmit}
										className="flex items-end gap-x-3 rounded-xl bg-neutral-100 px-4 py-2"
									>
										<textarea
											value={formValues.content}
											name="content"
											onChange={handleChange}
											rows={1}
											className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
											placeholder="Type your message…"
											onKeyDown={(e) => {
												if (e.key === "Enter" && !e.shiftKey) {
													e.preventDefault();
													handleSubmit(e as unknown as React.FormEvent);
												}
											}}
										/>
										<input
											type="file"
											ref={inputRef}
											onChange={handleFileChange}
											className="sr-only"
											multiple
											accept="image/*,video/*"
										/>
										<div className="flex shrink-0 items-center gap-x-2 pb-1">
											<label className="cursor-pointer text-neutral-400 hover:text-neutral-600">
												<input
													type="file"
													className="sr-only"
													onChange={handleFileChange}
													accept="image/*"
												/>
												<RiImageAddLine className="size-5" />
											</label>
											<button
												type="submit"
												disabled={!formValues.content || sendMessageMutation.isPending}
												className="text-primary-600 hover:text-primary-700 disabled:opacity-40"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="currentColor"
													className="size-5"
												>
													<path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
												</svg>
											</button>
										</div>
									</form>
								</div>
							</>
						) : (
							<div className="hidden h-full items-center justify-center lg:flex">
								<div className="flex flex-col items-center gap-3">
									<RiChat3Line className="size-12 text-neutral-200" />
									<p className="text-sm text-neutral-400">
										Select a conversation to start messaging
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
