import React from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import {
	RiNotificationLine,
	RiNotificationOffLine,
	RiCheckDoubleLine,
	RiMessage3Line,
	RiCalendarLine,
	RiBookOpenLine,
	RiDiscussLine,
	RiArticleLine,
	RiArrowRightSLine,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetNotifications, useClearNotifications } from "@/queries/notification";
import { useNotificationStore, type LocalNotification } from "@/store/z-store/notifications";
import { normalizeNotification, type NormalizedNotification, type NotificationProps } from "@/types/notification";
import { cn } from "@/lib/utils";

const formatTimeAgo = (dateString: string | Date): string => {
	const date = new Date(dateString);
	const now = new Date();
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (isNaN(diffInSeconds) || diffInSeconds < 60) return "just now";
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
	const diffInHours = Math.floor(diffInMinutes / 60);
	if (diffInHours < 24) return `${diffInHours}h ago`;
	const diffInDays = Math.floor(diffInHours / 24);
	if (diffInDays < 7) return `${diffInDays}d ago`;
	return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const parseNotificationRoute = (
	path: string | null | undefined,
	category?: string,
): string | null => {
	if (!path) {
		const cat = (category || "").toUpperCase();
		if (cat === "CALENDAR") return "/dashboard/calendar";
		if (cat === "FORUM") return "/dashboard/community";
		if (cat === "BLOG") return "/dashboard/blog";
		if (cat === "CHAT" || cat === "MESSAGE") return "/dashboard/messages";
		return null;
	}

	// Remove mobile custom schemes like classore:// or exp://
	let clean = path.replace(/^(classore|exp):\/\//i, "/").replace(/^\/+/, "/");
	if (!clean.startsWith("/dashboard") && !clean.startsWith("/signin")) {
		clean = clean.startsWith("/") ? `/dashboard${clean}` : `/dashboard/${clean}`;
	}
	return clean;
};

const getCategoryIcon = (category: string) => {
	const cat = (category || "").toUpperCase();
	if (cat === "CHAT" || cat === "MESSAGE") return RiMessage3Line;
	if (cat === "CALENDAR" || cat === "EVENT") return RiCalendarLine;
	if (cat === "COURSE" || cat === "EXAM" || cat === "SUBJECT") return RiBookOpenLine;
	if (cat === "FORUM" || cat === "COMMUNITY") return RiDiscussLine;
	if (cat === "BLOG" || cat === "ARTICLE") return RiArticleLine;
	return RiNotificationLine;
};

export const NotificationPopover = () => {
	const router = useRouter();
	const [isOpen, setIsOpen] = React.useState(false);

	const { data, isLoading } = useGetNotifications();
	const {
		localNotifications,
		dismissedIds,
		dismissAllNotifications,
		clearLocalNotifications,
	} = useNotificationStore();

	// Extract server notifications from any possible API response shape
	const rawServerNotifications: NotificationProps[] = React.useMemo(() => {
		if (!data) return [];
		if (Array.isArray((data as any)?.data?.data)) return (data as any).data.data;
		if (Array.isArray((data as any)?.data)) return (data as any).data;
		if (Array.isArray(data)) return (data as any);
		if (Array.isArray((data as any)?.data?.notifications)) return (data as any).data.notifications;
		if (Array.isArray((data as any)?.notifications)) return (data as any).notifications;
		return [];
	}, [data]);

	const normalizedServerNotifications: NormalizedNotification[] = React.useMemo(() => {
		return rawServerNotifications
			.map(normalizeNotification)
			.filter((n) => !dismissedIds.includes(n.id));
	}, [rawServerNotifications, dismissedIds]);

	// Convert local notifications into normalized format and filter dismissed/duplicates
	const uniqueLocalNotifications: NormalizedNotification[] = React.useMemo(() => {
		return localNotifications
			.filter(
				(local) =>
					Boolean(local.message?.trim()) &&
					!dismissedIds.includes(local.id) &&
					!normalizedServerNotifications.some(
						(s) => s.title === local.title && s.message === local.message
					)
			)
			.map((l: LocalNotification) => ({
				id: l.id,
				title: l.title,
				message: l.message,
				category: l.category,
				path: l.path,
				isRead: l.isRead,
				createdOn: l.createdOn,
				type: "LOCAL",
			}));
	}, [localNotifications, dismissedIds, normalizedServerNotifications]);

	// Merge server + local notifications, newest-first (matching mobile)
	const notifications: NormalizedNotification[] = React.useMemo(() => {
		return [...uniqueLocalNotifications, ...normalizedServerNotifications].sort(
			(a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
		);
	}, [uniqueLocalNotifications, normalizedServerNotifications]);

	const unreadCount = React.useMemo(() => {
		return notifications.filter((n) => !n.isRead).length;
	}, [notifications]);

	const { mutate: clearNotificationsOnServer, isPending: isClearingServer } =
		useClearNotifications();

	const handleMarkAllAsRead = () => {
		const allIds = notifications.map((n) => n.id);
		dismissAllNotifications(allIds);
		clearLocalNotifications();
		clearNotificationsOnServer(undefined, {
			onSuccess: () => {
				toast.success("All marked as read");
			},
			onError: () => {
				toast.success("All marked as read");
			},
		});
	};

	const handleNotificationClick = (item: NormalizedNotification) => {
		const targetRoute = parseNotificationRoute(item.path, item.category);
		if (targetRoute) {
			setIsOpen(false);
			router.push(targetRoute);
		}
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					className="relative size-10 rounded-full border border-neutral-200 transition-colors hover:bg-neutral-50 active:scale-95"
					size="icon"
					variant="outline"
					aria-label="Open notifications"
				>
					<RiNotificationLine size={22} className="text-neutral-700" />
					{unreadCount > 0 && (
						<span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
							{unreadCount > 9 ? "9+" : unreadCount}
						</span>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent
				align="end"
				sideOffset={8}
				className="w-[360px] sm:w-[420px] rounded-2xl border border-neutral-200 bg-white p-0 shadow-2xl"
			>
				{/* Header */}
				<div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3.5">
					<div className="flex items-center gap-2">
						<h3 className="text-base font-bold text-neutral-900">Notifications</h3>
						{notifications.length > 0 && (
							<span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-600">
								{notifications.length}
							</span>
						)}
					</div>

					{notifications.length > 0 && (
						<button
							type="button"
							onClick={handleMarkAllAsRead}
							disabled={isClearingServer}
							className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary-100 disabled:opacity-50"
							title="Mark all as read"
						>
							<RiCheckDoubleLine size={15} />
							<span>Mark as read</span>
						</button>
					)}
				</div>

				{/* Notification List Body */}
				<div className="max-h-[420px] overflow-y-auto divide-y divide-neutral-100">
					{isLoading ? (
						<div className="flex flex-col gap-3 p-4">
							{[1, 2, 3].map((i) => (
								<div key={i} className="flex animate-pulse items-start gap-3 py-2">
									<div className="size-9 rounded-xl bg-neutral-200" />
									<div className="flex-1 space-y-2">
										<div className="h-3.5 w-3/4 rounded bg-neutral-200" />
										<div className="h-3 w-full rounded bg-neutral-100" />
									</div>
								</div>
							))}
						</div>
					) : notifications.length === 0 ? (
						<div className="flex flex-col items-center justify-center px-4 py-12 text-center">
							<div className="flex size-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400 mb-3">
								<RiNotificationOffLine size={24} />
							</div>
							<h4 className="text-sm font-semibold text-neutral-800">No Notifications</h4>
							<p className="mt-1 text-xs text-neutral-400 max-w-[240px]">
								You’re all caught up! You don’t have any new notifications.
							</p>
						</div>
					) : (
						notifications.map((item) => {
							const Icon = getCategoryIcon(item.category);
							const hasDeepLink = Boolean(parseNotificationRoute(item.path, item.category));

							return (
								<div
									key={item.id}
									onClick={() => handleNotificationClick(item)}
									className={cn(
										"flex items-start gap-3 p-3.5 transition-colors text-left",
										hasDeepLink && "cursor-pointer hover:bg-neutral-50",
										!item.isRead ? "bg-primary-50/30" : "bg-white"
									)}
								>
									{/* Icon Avatar with Unread Dot */}
									<div className="relative shrink-0 mt-0.5">
										<div
											className={cn(
												"flex size-9 items-center justify-center rounded-xl",
												!item.isRead
													? "bg-primary-100 text-primary-700"
													: "bg-neutral-100 text-neutral-500"
											)}
										>
											<Icon size={18} />
										</div>
										{!item.isRead && (
											<span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
										)}
									</div>

									{/* Content */}
									<div className="flex-1 min-w-0">
										<div className="flex items-center justify-between gap-2">
											<p
												className={cn(
													"text-sm capitalize truncate",
													!item.isRead
														? "font-semibold text-neutral-900"
														: "font-medium text-neutral-700"
												)}
											>
												{item.title}
											</p>
											<span className="shrink-0 text-[11px] text-neutral-400">
												{formatTimeAgo(item.createdOn)}
											</span>
										</div>
										<p className="mt-0.5 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
											{item.message}
										</p>
									</div>

									{/* Navigation Chevron */}
									{hasDeepLink && (
										<div className="self-center pl-1 text-neutral-300">
											<RiArrowRightSLine size={18} />
										</div>
									)}
								</div>
							);
						})
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
};
