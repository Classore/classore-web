import { type Socket, io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "sonner";
import React from "react";
import {
	RiArrowDownSLine,
	RiArrowLeftSLine,
	RiArrowUpSLine,
	RiChat3Line,
	RiCloseLine,
	RiEmojiStickerLine,
	RiGroupLine,
	RiHashtag,
	RiImageAddLine,
	RiLockLine,
	RiSearchLine,
	RiShareForwardLine,
	RiUser3Line,
} from "@remixicon/react";

import {
	useFindOrCreateRoom,
	useGetInfiniteMessages,
	useGetForums,
	useGetRoomMembers,
	useGetUserRooms,
	useJoinSubjectForum,
	useSendMessage,
} from "@/queries/message";
import { useGetBundleSubjects } from "@/queries/school";
import { useGetProfile } from "@/queries/student";
import { useDeviceWidth, useFileHandler } from "@/hooks";
import { DashboardLayout } from "@/components/layouts";
import { MessageItem } from "@/components/message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { MessageProps, RoomProps } from "@/types/message";
import { useUserStore } from "@/store/z-store";
import { Seo } from "@/components/shared";
import { cn, getInitials, axios } from "@/lib";
import { endpoints } from "@/config";

// ─── Types ───────────────────────────────────────────────────────────────────

type SubjectChannel = {
	id: string;      // subject UUID (for join-subject-forum)
	forumId: string; // actual forum entity ID (for messages)
	name: string;
	memberCount: number;
	isPaid: boolean;
};

type BundleForum = {
	bundleId: string;
	bundleName: string;
	isSubscribed: boolean;
	isPaid: boolean;
	selectedSubjects: SubjectChannel[];
	lockedSubjects: SubjectChannel[];
	generalChannel?: { id: string; memberCount: number };
};

type ActiveRoomState = RoomProps & {
	subject_id?: string;
	isPaid?: boolean;
	isGeneral?: boolean;
};

type FormProps = { content: string; media: File[] };
const initialValues: FormProps = { content: "", media: [] };

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isUuid = (str?: string | null) =>
	Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str.trim()));

const normalize = (str?: string | null) =>
	(str || "").toLowerCase().replace(/channel/gi, "").replace(/[^a-z0-9]/g, "").trim();

const getMemberCount = (forum?: RoomProps | null) => {
	if (!forum) return 0;
	if (Array.isArray(forum.members)) return forum.members.length;
	return 0;
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const Page = () => {
	const router = useRouter();
	const { isMobile } = useDeviceWidth();
	const { user } = useUserStore();
	const queryClient = useQueryClient();

	// Active room for chat panel
	const [activeRoom, setActiveRoom] = React.useState<ActiveRoomState | null>(null);
	const [showChat, setShowChat] = React.useState(false);
	const [showMembers, setShowMembers] = React.useState(false);
	const [membersSearchQuery, setMembersSearchQuery] = React.useState("");

	const [formValues, setFormValues] = React.useState(initialValues);
	const [localMessages, setLocalMessages] = React.useState<MessageProps[]>([]);
	const [, setIsLoadingOlder] = React.useState(false);
	const [shouldAutoScroll, setShouldAutoScroll] = React.useState(false);
	const [expandedBundles, setExpandedBundles] = React.useState<Record<string, boolean>>({});
	const [collapsedLocked, setCollapsedLocked] = React.useState<Record<string, boolean>>({});

	const socket = React.useRef<Socket | null>(null);
	const messagesEndRef = React.useRef<HTMLDivElement>(null);
	const ref = React.useRef<HTMLDivElement>(null);

	const typingTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
	const [isTyping, setIsTyping] = React.useState(false);

	// Guard for auto-join mutation
	const isJoiningForumRef = React.useRef(false);

	// ── Profile (for time_line) ──────────────────────────────────────────────
	const { data: profile } = useGetProfile();

	const timelineList = React.useMemo(() => {
		const raw =
			(profile as any)?.time_line ||
			(profile as any)?.timeline ||
			(user as any)?.time_line ||
			(user as any)?.timeline ||
			[];
		return Array.isArray(raw) ? raw : [];
	}, [profile, user]);

	// Active paid bundle ID (to fetch all bundle subjects for LOCKED section)
	const activeBundleId = React.useMemo(() => {
		if (!timelineList.length) return "";
		const t =
			timelineList.find(
				(tl: any) => tl.is_paid && (tl.status === "ACTIVE" || tl.status === "ONGOING")
			) || timelineList[0];
		return t?.exam_bundle_details?.id ?? t?.chosen_bundle ?? "";
	}, [timelineList]);

	const { data: rawBundleSubjects } = useGetBundleSubjects({
		bundle_id: activeBundleId || undefined,
	});

	const bundleSubjects = React.useMemo(() => {
		if (!rawBundleSubjects || !Array.isArray(rawBundleSubjects)) return [];
		return rawBundleSubjects
			.map((s: any) => ({
				subject_id: (s.subject_id || s.id || "").trim(),
				subject_name: (s.subject_name || s.name || "").trim(),
			}))
			.filter((s) => Boolean(s.subject_id && s.subject_name));
	}, [rawBundleSubjects]);

	// ── Forums ───────────────────────────────────────────────────────────────
	const { data: forums } = useGetForums();

	// ── Room Members ──────────────────────────────────────────────────────────
	const { data: roomMembers, isLoading: isLoadingMembers } = useGetRoomMembers(
		activeRoom?.id
	);

	// ── User Rooms (for fast DM check) ────────────────────────────────────────
	const { data: userRooms } = useGetUserRooms(String(user?.id ?? ""));

	// ── Join Subject Forum Mutation ───────────────────────────────────────────
	const joinSubjectForumMutation = useJoinSubjectForum();

	// Auto-join background call when student opens a subscribed subject channel
	React.useEffect(() => {
		if (
			!activeRoom ||
			activeRoom.isGeneral ||
			!activeRoom.isPaid ||
			!activeRoom.subject_id
		)
			return;

		if (isJoiningForumRef.current) return;
		isJoiningForumRef.current = true;

		joinSubjectForumMutation.mutate(activeRoom.subject_id, {
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["forums"] });
				queryClient.invalidateQueries({ queryKey: ["room_members", activeRoom.id] });
			},
			onSettled: () => {
				isJoiningForumRef.current = false;
			},
		});
	}, [activeRoom?.id, activeRoom?.subject_id, activeRoom?.isPaid, activeRoom?.isGeneral]);

	// ── Find or Create Room Mutation ──────────────────────────────────────────
	const findOrCreateRoomMutation = useFindOrCreateRoom({
		onError: (error) => {
			const errorMessage = Array.isArray(error.response?.data?.message)
				? error.response.data.message[0]
				: error.response?.data?.message;
			toast.error(errorMessage || "Unable to start direct conversation");
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["user_rooms"] });
			const roomId = data.data.id;
			router.push(`/dashboard/messages?roomId=${roomId}`);
		},
	});

	// Direct message handler matching mobile
	const handleDirectMessage = React.useCallback(
		(targetMember: any) => {
			const targetUserId =
				targetMember.user_id ||
				targetMember.userId ||
				targetMember.id ||
				targetMember.user?.id ||
				targetMember.member_id;

			if (!targetUserId || !user?.id || String(targetUserId) === String(user.id)) return;

			setShowMembers(false);

			const firstName =
				targetMember.first_name ||
				targetMember.firstName ||
				targetMember.user?.first_name ||
				targetMember.user?.firstName ||
				targetMember.user_first_name ||
				"";

			const lastName =
				targetMember.last_name ||
				targetMember.lastName ||
				targetMember.user?.last_name ||
				targetMember.user?.lastName ||
				targetMember.user_last_name ||
				"";

			const fullName =
				`${firstName} ${lastName}`.trim() ||
				targetMember.name ||
				targetMember.email ||
				"Classmate";

			const profilePic =
				targetMember.profile_picture ||
				targetMember.profile_image ||
				targetMember.profilePicture ||
				targetMember.profileImage ||
				targetMember.user?.profile_picture ||
				targetMember.user?.profile_image ||
				"";

			// Check if a direct room already exists
			const existingRoom = Array.isArray(userRooms)
				? userRooms.find((r) => {
						if (r.is_group === "YES") return false;
						if (
							(r as any).participant &&
							((r as any).participant.id === targetUserId ||
								(r as any).participant.user_id === targetUserId)
						) {
							return true;
						}
						const membersList = Array.isArray(r.members) ? r.members : [];
						return membersList.some((m: any) => {
							if (typeof m === "string") return m === targetUserId;
							return m?.id === targetUserId || m?.user_id === targetUserId;
						});
				  })
				: null;

			if (existingRoom?.id) {
				router.push(
					`/dashboard/messages?roomId=${existingRoom.id}&recipient_name=${encodeURIComponent(
						fullName
					)}&recipient_image=${encodeURIComponent(
						profilePic
					)}&recipient_id=${targetUserId}`
				);
				return;
			}

			toast.loading("Starting private chat...", { id: "create-dm" });
			findOrCreateRoomMutation.mutate([targetUserId], {
				onSuccess: (data) => {
					queryClient.invalidateQueries({ queryKey: ["user_rooms"] });
					router.push(
						`/dashboard/messages?roomId=${data.data.id}&recipient_name=${encodeURIComponent(
							fullName
						)}&recipient_image=${encodeURIComponent(
							profilePic
						)}&recipient_id=${targetUserId}`
					);
				},
				onSettled: () => toast.dismiss("create-dm"),
			});
		},
		[user?.id, userRooms, findOrCreateRoomMutation, router, queryClient]
	);

	// ── Socket ───────────────────────────────────────────────────────────────
	React.useEffect(() => {
		socket.current = io(
			process.env.NEXT_PUBLIC_WSS_URL || "wss://classore-be-june-224829194037.europe-west1.run.app",
			{ transports: ["websocket"] }
		);
		socket.current.on("connect", () => {
			if (user?.id) socket.current?.emit("join_user_rooms", { userId: String(user.id) });
		});
		socket.current.on("receive_chat_message", () => {
			queryClient.invalidateQueries({ queryKey: ["infinite_messages"], exact: false });
			setShouldAutoScroll(true);
		});
		socket.current.on("is_typing", () => {
			setIsTyping(true);
			if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
			typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
		});
		return () => {
			if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
			socket.current?.disconnect();
		};
	}, [user, queryClient]);

	// ── Build bundleForums (matches mobile forum.tsx bundleForums useMemo) ───
	const bundleForums = React.useMemo((): BundleForum[] => {
		if (!forums) return [];

		const result: BundleForum[] = [];
		const processedBundleNames = new Set<string>();

		const findMatchingForum = (
			subjectName: string,
			subjectId?: string,
			normBundleName?: string
		): RoomProps | undefined => {
			if (subjectId) {
				const direct = forums.find(
					(f) => f.name === subjectId || f.id === subjectId || (f as any).subject_id === subjectId
				);
				if (direct) return direct;
			}
			const normSub = normalize(subjectName);
			return forums.find((f) => {
				const normFName = normalize(f.name);
				const normSubName = normalize((f as any).subject_name);
				const matchesName =
					(normSubName && (normSubName === normSub || normSubName.includes(normSub) || normSub.includes(normSubName))) ||
					(!isUuid(f.name) && (normFName === normSub || normFName.includes(normSub) || normSub.includes(normFName)));

				if (!matchesName) return false;
				if (normBundleName && f.bundle_name) {
					return normalize(f.bundle_name) === normBundleName;
				}
				return true;
			});
		};

		// 1. Walk user's subscription timelines
		if (timelineList.length > 0) {
			for (const timeline of timelineList) {
				const bundleName = timeline.exam_bundle_details?.name;
				if (!bundleName || processedBundleNames.has(bundleName)) continue;
				processedBundleNames.add(bundleName);

				const isPaid = timeline.is_paid === true;
				const isActive = timeline.status === "ACTIVE" || timeline.status === "ONGOING";
				const isSubscribed = isActive && isPaid;
				const normBundleName = normalize(bundleName);
				const bundleId = timeline.exam_bundle_details?.id ?? timeline.chosen_bundle ?? "";

				const allSubjectIdsInBundle = new Set<string>([
					...(timeline.subjects || []).map((s: any) => s.id),
					...bundleSubjects.map((s) => s.subject_id),
				]);

				// General channel: is_group === "NO" OR name contains "general" OR matches bundle name OR fallback
				const generalForum = forums.find((f) => {
					const fBundle = normalize(f.bundle_name);
					const matchesBundle =
						!f.bundle_name ||
						fBundle === normBundleName ||
						fBundle.includes(normBundleName) ||
						normBundleName.includes(fBundle) ||
						f.bundle_name === bundleId;

					if (!matchesBundle) return false;

					if (f.is_group === "NO") return true;
					if (f.name && normalize(f.name).includes("general")) return true;
					if (f.name && (normalize(f.name) === normBundleName || normalize(f.name).includes(normBundleName))) return true;
					if (!f.name) return true;
					if (f.name === bundleId || f.id === bundleId) return true;
					if (isUuid(f.name) && !allSubjectIdsInBundle.has(f.name)) return true;

					return false;
				});

				const generalChannel = {
					id: generalForum?.id ?? bundleId ?? "general",
					memberCount: getMemberCount(generalForum),
				};

				// Selected subjects (user enrolled in)
				const selectedSubjects: SubjectChannel[] = (timeline.subjects || []).map((s: any) => {
					const matchingForum = findMatchingForum(s.name, s.id, normBundleName);
					return {
						id: s.id,
						forumId: matchingForum?.id ?? s.id,
						name: s.name,
						isPaid,
						memberCount: getMemberCount(matchingForum),
					};
				});

				const selectedSubjectNames = new Set(selectedSubjects.map((s) => normalize(s.name)));
				const selectedForumIds = new Set(selectedSubjects.map((s) => s.forumId));

				// Locked subjects: all bundle subjects not yet selected
				let lockedSubjects: SubjectChannel[] = [];
				if (bundleSubjects.length > 0 && timeline.exam_bundle_details?.id === activeBundleId) {
					lockedSubjects = bundleSubjects
						.filter((s) => !selectedSubjectNames.has(normalize(s.subject_name)))
						.map((s) => {
							const mf = findMatchingForum(s.subject_name, s.subject_id, normBundleName);
							return {
								id: s.subject_id,
								forumId: mf?.id ?? s.subject_id,
								name: s.subject_name,
								isPaid: false,
								memberCount: getMemberCount(mf),
							};
						});
				} else {
					lockedSubjects = forums
						.filter((f) => {
							if (normalize(f.bundle_name) !== normBundleName && f.bundle_name !== bundleId) return false;
							if (generalForum && f.id === generalForum.id) return false;
							if (selectedForumIds.has(f.id)) return false;
							if (isUuid(f.name) || !f.name || normalize(f.name) === normBundleName) return false;
							return true;
						})
						.map((f) => ({
							id: f.id,
							forumId: f.id,
							name: f.name ?? "Subject",
							isPaid: false,
							memberCount: getMemberCount(f),
						}));
				}

				result.push({
					bundleId,
					bundleName,
					isSubscribed,
					isPaid,
					selectedSubjects,
					lockedSubjects,
					generalChannel,
				});
			}
		}

		// 2. Show forum bundles the user has no timeline for (fully locked)
		for (const forum of forums) {
			if (forum.bundle_name && !processedBundleNames.has(forum.bundle_name)) {
				processedBundleNames.add(forum.bundle_name);
				const generalForum = forum.is_group === "NO" ? forum : undefined;

				result.push({
					bundleId: "",
					bundleName: forum.bundle_name,
					isSubscribed: false,
					isPaid: false,
					selectedSubjects: [],
					lockedSubjects: [
						{
							id: forum.id,
							forumId: forum.id,
							name: !isUuid(forum.name) && forum.name ? forum.name : "Subject Channel",
							isPaid: false,
							memberCount: getMemberCount(forum),
						},
					],
					generalChannel: {
						id: generalForum?.id ?? forum.id,
						memberCount: getMemberCount(generalForum),
					},
				});
			}
		}

		return result;
	}, [forums, timelineList, bundleSubjects, activeBundleId]);

	// Expand first (or subscribed) bundle by default
	React.useEffect(() => {
		if (bundleForums.length > 0 && Object.keys(expandedBundles).length === 0) {
			const initial: Record<string, boolean> = {};
			bundleForums.forEach((b, i) => {
				initial[b.bundleName] = i === 0 || b.isSubscribed;
			});
			setExpandedBundles(initial);
		}
	}, [bundleForums, expandedBundles]);

	// ── Messages for active room ─────────────────────────────────────────────
	const {
		data: messagesData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		isLoading: isLoadingMessages,
		refetch,
	} = useGetInfiniteMessages({
		roomId: activeRoom?.id || "",
		user_id: user?.id || "",
		limit: 100,
	});

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

	React.useEffect(() => {
		setLocalMessages([]);
		setShowMembers(false);
		setMembersSearchQuery("");
	}, [activeRoom?.id]);

	// ── Scroll ───────────────────────────────────────────────────────────────
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	React.useEffect(() => {
		if (shouldAutoScroll) { scrollToBottom(); setShouldAutoScroll(false); }
	}, [shouldAutoScroll, messages]);
	React.useEffect(() => {
		setShouldAutoScroll(true);
	}, [activeRoom?.id]);

	const handleScroll = React.useCallback(() => {
		if (!ref.current) return;
		const { scrollTop, scrollHeight, clientHeight } = ref.current;
		if (scrollTop === 0 && hasNextPage && !isFetchingNextPage) {
			setIsLoadingOlder(true);
			const prev = ref.current.scrollHeight;
			fetchNextPage().then(() => {
				setTimeout(() => {
					if (ref.current) ref.current.scrollTop = ref.current.scrollHeight - prev;
					setIsLoadingOlder(false);
				}, 100);
			});
		}
		const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
		setShouldAutoScroll(isNearBottom);
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	React.useEffect(() => {
		const el = ref.current;
		if (el) {
			el.addEventListener("scroll", handleScroll);
			return () => el.removeEventListener("scroll", handleScroll);
		}
	}, [handleScroll]);

	// ── Send ─────────────────────────────────────────────────────────────────
	const sendMessageMutation = useSendMessage();
	const { handleFileChange, inputRef } = useFileHandler({
		onFilesChange: (files) => setFormValues((v) => ({ ...v, media: files })),
		onError: (err) => toast.error(err.message),
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!activeRoom?.id) return;
		const text = formValues.content.trim();
		if (!text && !formValues.media.length) return;

		if (formValues.media.length > 0) {
			try {
				const fd = new FormData();
				fd.append("room", activeRoom.id);
				if (text) fd.append("content", text);
				formValues.media.forEach((f) => fd.append("files", f));
				await axios.post(endpoints().message.send_message, fd);
				await refetch();
				setFormValues(initialValues);
				setShouldAutoScroll(true);
			} catch (err: any) {
				toast.error(err?.response?.data?.message || "Failed to send");
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
				room: activeRoom.id,
				isDeleted: false,
			};
			setLocalMessages((prev) => [...prev, optimistic]);
			setFormValues(initialValues);
			setShouldAutoScroll(true);

			sendMessageMutation.mutate(
				{ room: activeRoom.id, content: text },
				{
					onSuccess: () => refetch(),
					onError: () => {
						toast.error("Failed to send message.");
						setLocalMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
					},
				}
			);
		}
	};

	// ── Navigate to a channel ─────────────────────────────────────────────
	const openChannel = (
		room: RoomProps,
		name: string,
		options?: { subject_id?: string; isPaid?: boolean; isGeneral?: boolean }
	) => {
		setActiveRoom({
			...room,
			name,
			subject_id: options?.subject_id,
			isPaid: options?.isPaid ?? true,
			isGeneral: options?.isGeneral ?? false,
		});
		setShowChat(true);
		if (socket.current?.connected) {
			socket.current.emit("join_room", { roomId: room.id });
		}
	};

	// Filter room members by search query
	const filteredMembers = React.useMemo(() => {
		if (!roomMembers) return [];
		if (!membersSearchQuery.trim()) return roomMembers;
		const q = membersSearchQuery.toLowerCase().trim();
		return roomMembers.filter((m) => {
			const fullName = `${m.first_name || ""} ${m.last_name || ""}`.toLowerCase();
			const email = (m.email || "").toLowerCase();
			return fullName.includes(q) || email.includes(q);
		});
	}, [roomMembers, membersSearchQuery]);

	// ── Bundle card ──────────────────────────────────────────────────────────
	const renderBundleCard = (bundle: BundleForum) => {
		const isExpanded = expandedBundles[bundle.bundleName] ?? true;
		const isLockedCollapsed = collapsedLocked[bundle.bundleName] ?? false;
		const cardTitle = bundle.bundleName.endsWith("Forum")
			? bundle.bundleName
			: `${bundle.bundleName} Forum`;

		const accentColor = bundle.bundleName.toLowerCase().includes("jamb")
			? "bg-emerald-500"
			: "bg-orange-400";

		return (
			<div
				key={bundle.bundleId || bundle.bundleName}
				className="rounded-2xl bg-neutral-50 p-4 space-y-3"
			>
				{/* Bundle header */}
				<button
					onClick={() =>
						setExpandedBundles((p) => ({ ...p, [bundle.bundleName]: !isExpanded }))
					}
					className="flex w-full items-center gap-3 text-left"
				>
					<div
						className={cn(
							"flex size-10 shrink-0 items-center justify-center rounded-xl",
							accentColor
						)}
					>
						<RiShareForwardLine className="size-5 text-white" />
					</div>
					<span className="flex-1 text-base font-bold text-neutral-900 capitalize">{cardTitle}</span>
					{isExpanded ? (
						<RiArrowUpSLine className="size-5 text-neutral-400" />
					) : (
						<RiArrowDownSLine className="size-5 text-neutral-400" />
					)}
				</button>

				{/* Expanded channels */}
				{isExpanded && (
					<div className="rounded-xl border border-neutral-100 bg-white p-4 shadow-sm space-y-3">
						{/* FOR YOU section */}
						{(bundle.selectedSubjects.length > 0 || bundle.generalChannel) && (
							<div className="space-y-1">
								<p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
									For You
								</p>

								{/* General Channel */}
								{bundle.generalChannel && (() => {
									const gRoom =
										forums?.find((f) => f.id === bundle.generalChannel!.id) || {
											id: bundle.generalChannel!.id,
											name: "General Channel",
											is_group: "NO" as const,
											created_at: new Date(),
											members: [],
											bundle_name: bundle.bundleName,
										};
									return (
										<button
											onClick={() =>
												openChannel(gRoom, "General Channel", {
													isGeneral: true,
													isPaid: true,
												})
											}
											className="flex w-full items-center justify-between rounded-lg px-1 py-2.5 transition-colors hover:bg-neutral-50 active:bg-neutral-100"
										>
											<div className="flex items-center gap-2.5 min-w-0">
												<RiShareForwardLine className="size-5 shrink-0 text-neutral-400" />
												<span className="text-sm font-medium text-neutral-800 capitalize">
													General Channel
												</span>
											</div>
											<span className="shrink-0 rounded-md bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
												{bundle.generalChannel.memberCount}
											</span>
										</button>
									);
								})()}

								{/* Subject channels (enrolled) */}
								{bundle.selectedSubjects.map((subject) => {
									const sRoom =
										forums?.find((f) => f.id === subject.forumId) || {
											id: subject.forumId,
											name: subject.name,
											is_group: "YES" as const,
											created_at: new Date(),
											members: [],
											bundle_name: bundle.bundleName,
										};
									return (
										<button
											key={subject.id}
											onClick={() =>
												openChannel(sRoom, `${subject.name} Channel`, {
													subject_id: subject.id,
													isPaid: true,
													isGeneral: false,
												})
											}
											className="flex w-full items-center justify-between rounded-lg px-1 py-2.5 transition-colors hover:bg-neutral-50 active:bg-neutral-100"
										>
											<div className="flex items-center gap-2.5 min-w-0">
												<RiHashtag className="size-5 shrink-0 text-neutral-400" />
												<span className="truncate text-sm font-medium text-neutral-800 capitalize">
													{subject.name} Channel
												</span>
											</div>
											<span className="shrink-0 rounded-md bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
												{subject.memberCount}
											</span>
										</button>
									);
								})}
							</div>
						)}

						{/* LOCKED section */}
						{bundle.lockedSubjects.length > 0 && (
							<div className="space-y-1 pt-1">
								<button
									onClick={() =>
										setCollapsedLocked((p) => ({
											...p,
											[bundle.bundleName]: !isLockedCollapsed,
										}))
									}
									className="flex w-full items-center justify-between py-1"
								>
									<p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
										Locked
									</p>
									{isLockedCollapsed ? (
										<RiArrowDownSLine className="size-3.5 text-neutral-400" />
									) : (
										<RiArrowUpSLine className="size-3.5 text-neutral-400" />
									)}
								</button>

								{!isLockedCollapsed &&
									bundle.lockedSubjects.map((subject) => {
										const sRoom =
											forums?.find((f) => f.id === subject.forumId) || {
												id: subject.forumId,
												name: subject.name,
												is_group: "YES" as const,
												created_at: new Date(),
												members: [],
												bundle_name: bundle.bundleName,
											};
										return (
											<button
												key={subject.id}
												onClick={() =>
													openChannel(sRoom, `${subject.name} Channel`, {
														subject_id: subject.id,
														isPaid: false,
														isGeneral: false,
													})
												}
												className="flex w-full items-center justify-between rounded-lg px-1 py-2.5 transition-colors hover:bg-neutral-50 active:bg-neutral-100 text-left"
											>
												<div className="flex items-center gap-2.5 min-w-0">
													<RiLockLine className="size-5 shrink-0 text-neutral-400" />
													<span className="truncate text-sm font-medium text-neutral-500 capitalize">
														{subject.name} Channel
													</span>
												</div>
											</button>
										);
									})}
							</div>
						)}
					</div>
				)}
			</div>
		);
	};

	// ── Chat panel ────────────────────────────────────────────────────────────
	const renderChatPanel = () => {
		const totalMembersCount = roomMembers?.length ?? activeRoom?.members?.length ?? 0;
		const canSendMessages = Boolean(activeRoom?.isGeneral || activeRoom?.isPaid);

		return (
			<div className="relative flex h-full flex-col overflow-hidden">
				{/* Header */}
				<div className="flex h-[76px] shrink-0 items-center justify-between border-b border-neutral-200 px-6 bg-white z-10">
					<div className="flex items-center gap-x-3 min-w-0">
						<button onClick={() => setShowChat(false)} className="text-neutral-500 hover:text-neutral-700">
							<RiArrowLeftSLine className="size-5" />
						</button>
						<div className={cn(
							"flex size-9 shrink-0 items-center justify-center rounded-lg",
							activeRoom?.isGeneral ? "bg-emerald-100 text-emerald-600" : activeRoom?.isPaid ? "bg-primary-100 text-primary-600" : "bg-neutral-100 text-neutral-500"
						)}>
							{activeRoom?.isGeneral ? (
								<RiShareForwardLine className="size-5" />
							) : activeRoom?.isPaid ? (
								<RiHashtag className="size-5" />
							) : (
								<RiLockLine className="size-5" />
							)}
						</div>
						<div className="min-w-0">
							<p className="truncate text-sm font-bold capitalize text-neutral-900">
								{activeRoom?.name}
							</p>
							{isTyping ? (
								<p className="text-xs text-primary-500 font-medium">Someone is typing…</p>
							) : (
								<button
									onClick={() => setShowMembers((v) => !v)}
									className="text-xs text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1"
								>
									<span>{totalMembersCount} {totalMembersCount === 1 ? "member" : "members"}</span>
									<span className="text-[10px] text-primary-500 underline font-medium">View all</span>
								</button>
							)}
						</div>
					</div>

					{/* Header Right Actions */}
					<div className="flex items-center gap-x-2">
						<button
							onClick={() => setShowMembers((v) => !v)}
							className={cn(
								"flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
								showMembers
									? "bg-primary-600 text-white"
									: "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
							)}
							title="View Channel Members & Direct Message"
						>
							<RiGroupLine className="size-4" />
							<span className="hidden sm:inline">Members</span>
						</button>
					</div>
				</div>

				{/* Main Chat Body + Slide-out Members Panel */}
				<div className="relative flex flex-1 overflow-hidden">
					{/* Messages Area */}
					<div className="flex flex-1 flex-col overflow-hidden">
						<div
							ref={ref}
							className="flex flex-1 flex-col gap-y-4 overflow-y-auto bg-[#F6F8FA] px-6 py-4"
						>
							{isFetchingNextPage && (
								<p className="py-2 text-center text-xs text-neutral-400">Loading older…</p>
							)}
							{isLoadingMessages ? (
								<div className="flex h-full items-center justify-center">
									<p className="text-sm text-neutral-400">Loading messages…</p>
								</div>
							) : messages.length > 0 ? (
								messages.map((msg) => (
									<MessageItem key={msg.id} message={msg} isGroup />
								))
							) : (
								<div className="flex h-full items-center justify-center">
									<p className="text-sm text-neutral-400">
										No messages yet. Start the conversation!
									</p>
								</div>
							)}
							{isFetchingPreviousPage && (
								<p className="py-2 text-center text-xs text-neutral-400">Loading…</p>
							)}
							<div ref={messagesEndRef} />
						</div>

						{/* Bottom Bar: Active Input or Locked Banner */}
						{canSendMessages ? (
							<div className="shrink-0 border-t border-neutral-200 bg-white px-6 py-3">
								<form
									onSubmit={handleSubmit}
									className="flex items-end gap-x-3 rounded-xl bg-neutral-100 px-4 py-2"
								>
									<textarea
										name="content"
										value={formValues.content}
										onChange={(e) =>
											setFormValues((v) => ({ ...v, content: e.target.value }))
										}
										rows={1}
										placeholder="Type your message…"
										className="max-h-32 min-h-[36px] flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
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
										<button type="button" className="text-neutral-400 hover:text-neutral-600">
											<RiEmojiStickerLine className="size-5" />
										</button>
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
						) : (
							<div className="shrink-0 border-t border-neutral-200 bg-white px-6 py-4">
								<div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4">
									<div className="flex items-center gap-3">
										<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
											<RiLockLine className="size-5" />
										</div>
										<div>
											<p className="text-xs sm:text-sm font-bold text-amber-900">
												Locked Subject Channel
											</p>
											<p className="text-[11px] sm:text-xs text-amber-700">
												Subscribe to this subject to join the discussion and send messages.
											</p>
										</div>
									</div>
									<Link
										href="/dashboard/categories"
										className="shrink-0 rounded-lg bg-primary-600 px-4 py-2 text-xs font-bold text-white hover:bg-primary-700 transition-colors shadow-sm"
									>
										Enroll in Subject
									</Link>
								</div>
							</div>
						)}
					</div>

					{/* ── Channel Members Panel (Matching Mobile ChannelMembersSheet) ── */}
					{showMembers && (
						<aside className="absolute inset-y-0 right-0 z-20 w-full sm:w-[320px] bg-white border-l border-neutral-200 shadow-xl flex flex-col transition-transform">
							{/* Members Header */}
							<div className="flex h-14 items-center justify-between border-b border-neutral-200 px-4">
								<div className="flex items-center gap-2">
									<RiGroupLine className="size-5 text-primary-600" />
									<p className="text-sm font-bold text-neutral-900">Channel Members</p>
									<span className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-bold text-primary-600">
										{totalMembersCount}
									</span>
								</div>
								<button
									onClick={() => setShowMembers(false)}
									className="p-1 text-neutral-400 hover:text-neutral-600 rounded-md"
								>
									<RiCloseLine className="size-5" />
								</button>
							</div>

							{/* Search Bar */}
							<div className="p-3 border-b border-neutral-100">
								<div className="flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs text-neutral-700">
									<RiSearchLine className="size-4 text-neutral-400 shrink-0" />
									<input
										type="text"
										value={membersSearchQuery}
										onChange={(e) => setMembersSearchQuery(e.target.value)}
										placeholder="Search members by name..."
										className="w-full bg-transparent outline-none placeholder:text-neutral-400 text-xs"
									/>
									{membersSearchQuery && (
										<button onClick={() => setMembersSearchQuery("")}>
											<RiCloseLine className="size-3.5 text-neutral-400" />
										</button>
									)}
								</div>
							</div>

							{/* Members List */}
							<div className="flex-1 overflow-y-auto divide-y divide-neutral-50 p-2">
								{isLoadingMembers ? (
									<div className="py-12 text-center text-xs text-neutral-400">
										Loading members…
									</div>
								) : filteredMembers.length === 0 ? (
									<div className="py-12 px-4 text-center">
										<RiUser3Line className="size-10 text-neutral-200 mx-auto mb-2" />
										<p className="text-xs font-semibold text-neutral-700">
											{membersSearchQuery ? "No members matching search" : "No members found"}
										</p>
										<p className="text-[11px] text-neutral-400 mt-1">
											Students who join this channel will appear here.
										</p>
									</div>
								) : (
									filteredMembers.map((member: any, index: number) => {
										const firstName =
											member.first_name ||
											member.firstName ||
											member.user?.first_name ||
											member.user?.firstName ||
											member.user_first_name ||
											"";

										const lastName =
											member.last_name ||
											member.lastName ||
											member.user?.last_name ||
											member.user?.lastName ||
											member.user_last_name ||
											"";

										const email =
											member.email ||
											member.user?.email ||
											member.user_email ||
											"";

										const profilePic =
											member.profile_picture ||
											member.profile_image ||
											member.profilePicture ||
											member.profileImage ||
											member.user?.profile_picture ||
											member.user?.profile_image ||
											"";

										const memberUserId =
											member.user_id ||
											member.userId ||
											member.id ||
											member.user?.id ||
											member.member_id ||
											"";

										const isMe = Boolean(
											member.is_my_data === true ||
											(memberUserId && user?.id && String(memberUserId) === String(user.id)) ||
											(email && user?.email && email.toLowerCase() === user.email.toLowerCase())
										);

										const fullName =
											`${firstName} ${lastName}`.trim() ||
											member.name ||
											(isMe ? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim() : "") ||
											(isMe ? "You" : "Classmate");

										const displayEmail = email || (isMe ? user?.email : "");
										const displayPic = profilePic || (isMe ? user?.profile_image : "");
										const initials = getInitials(fullName);

										return (
											<div
												key={memberUserId || member.member_id || `member-${index}`}
												className="flex items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-neutral-50 transition-colors"
											>
												<div className="flex items-center gap-2.5 min-w-0">
													<Avatar className="size-9 rounded-lg shrink-0">
														<AvatarImage src={displayPic} />
														<AvatarFallback className="bg-primary-100 text-xs font-semibold uppercase text-primary-700">
															{initials}
														</AvatarFallback>
													</Avatar>
													<div className="min-w-0">
														<p className="truncate text-xs font-bold capitalize text-neutral-900">
															{fullName} {isMe ? "(You)" : ""}
														</p>
														{displayEmail && (
															<p className="truncate text-[10px] text-neutral-400">
																{displayEmail}
															</p>
														)}
													</div>
												</div>

												{/* Direct Message button */}
												{!isMe && (
													<button
														onClick={() => handleDirectMessage(member)}
														className="shrink-0 flex items-center gap-1 rounded-lg bg-primary-50 px-2.5 py-1 text-[11px] font-bold text-primary-600 hover:bg-primary-100 transition-colors border border-primary-200"
														title={`Send direct message to ${fullName}`}
													>
														<RiChat3Line className="size-3.5" />
														<span>Message</span>
													</button>
												)}
											</div>
										);
									})
								)}
							</div>
						</aside>
					)}
				</div>
			</div>
		);
	};

	const subscribedCount = bundleForums.filter((b) => b.isSubscribed).length;

	// ── Render ────────────────────────────────────────────────────────────────
	return (
		<>
			<Seo title="Community Forum" />
			<DashboardLayout className="px-0 py-0 lg:px-0 lg:py-0">
				<div className="relative flex h-full w-full overflow-hidden">

					{/* ── Forum list panel (left on desktop, full-screen on mobile when not in chat) ── */}
					<div
						className={cn(
							"flex h-full flex-col overflow-y-auto",
							"w-full lg:w-[360px] lg:shrink-0 lg:border-r lg:border-neutral-200",
							showChat && isMobile ? "hidden" : "flex"
						)}
					>
						{/* Header */}
						<div className="flex h-[76px] shrink-0 items-center border-b border-neutral-200 px-6">
							<p className="text-xl font-bold text-neutral-900">Community Forum</p>
						</div>

						{/* Bundle list */}
						<div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
							{bundleForums.length === 0 ? (
								<div className="flex flex-col items-center justify-center py-16 gap-3">
									<RiHashtag className="size-12 text-neutral-200" />
									<p className="text-sm text-neutral-400 text-center">
										No forums available yet.
									</p>
									<p className="text-xs text-neutral-400 text-center">
										Enroll in a course to access community channels.
									</p>
								</div>
							) : (
								<>
									{bundleForums.map(renderBundleCard)}
									<p className="pt-2 pb-4 text-center text-xs text-neutral-400">
										You are subscribed to {subscribedCount}{" "}
										{subscribedCount === 1 ? "forum" : "forums"}
									</p>
								</>
							)}
						</div>
					</div>

					{/* ── Chat panel (right on desktop, full-screen on mobile when in chat) ── */}
					<div
						className={cn(
							"flex-1 h-full",
							!showChat && isMobile ? "hidden" : "flex",
							"flex-col"
						)}
					>
						{activeRoom ? (
							renderChatPanel()
						) : (
							<div className="hidden h-full items-center justify-center lg:flex">
								<div className="flex flex-col items-center gap-3">
									<RiHashtag className="size-12 text-neutral-200" />
									<p className="text-sm text-neutral-400">
										Select a channel to start chatting
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
