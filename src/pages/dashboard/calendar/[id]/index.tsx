import {
	RiArrowLeftLine,
	RiCalendarEventLine,
	RiLoaderLine,
	RiTimeLine,
	RiVideoLine,
} from "@remixicon/react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React from "react";

import type { CalendarEventItem } from "@/queries/student";
import { useGetUpcomingEvents } from "@/queries/student";
import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";
import { LiveSessionModal } from "@/components/modals/live-session-modal";
import { getEventTemporalStatus } from "@/lib/date";

// ─── Resilient Getters & Helpers ─────────────────────────────────────────────

const getNote = (e: any): string => e?.note || e?.notes || e?.description || "";
const getPlatform = (e: any): string => e?.platform || e?.meeting_platform || e?.meetingPlatform || "";
const getCategoryName = (e: any): string =>
	e?.category_id?.name || e?.category_id?.examination_name || (typeof e?.category_id === "string" ? e.category_id : "") || "";
const getSubCategoryName = (e: any): string =>
	e?.sub_category?.name || e?.sub_category?.examinationbundle_name || (typeof e?.sub_category === "string" ? e.sub_category : "") || "";
const getSubjectName = (e: any): string =>
	e?.subject?.name || e?.subject?.subject_name || (typeof e?.subject === "string" ? e.subject : "") || "";
const getEventDay = (e: any): number | undefined => e?.event_day ?? e?.eventDay ?? e?.day;

const formatHour = (hour: number): string => {
	const suffix = hour >= 12 ? "PM" : "AM";
	const display = hour % 12 === 0 ? 12 : hour % 12;
	return `${display}:00 ${suffix}`;
};

// ─── Event Card ──────────────────────────────────────────────────────────────

const EventCard = ({
	event,
	onInspect,
}: {
	event: CalendarEventItem;
	onInspect: (event: CalendarEventItem) => void;
}) => {
	const temporalStatus = getEventTemporalStatus(event);
	const isLive = temporalStatus === "LIVE" && event.is_active;
	const isUpcoming = temporalStatus === "UPCOMING" && event.is_active;
	const isEnded = temporalStatus === "ENDED";

	const title = event.title || "Live Class Session";
	const subject = getSubjectName(event);
	const subCategory = getSubCategoryName(event);
	const category = getCategoryName(event);
	const platform = getPlatform(event);
	const note = getNote(event);
	const eventDay = getEventDay(event);
	const durationHours =
		(event.end_hour ?? 0) > (event.start_hour ?? 0)
			? (event.end_hour ?? 0) - (event.start_hour ?? 0)
			: 0;

	return (
		<div
			onClick={() => onInspect(event)}
			className={`flex flex-col justify-between gap-4 rounded-2xl border p-5 shadow-2xs transition hover:shadow-md cursor-pointer ${
				isLive
					? "border-red-200 bg-red-50/20"
					: isUpcoming
						? "border-neutral-200/80 bg-white"
						: "border-neutral-200/50 bg-neutral-50/50 opacity-80"
			}`}>
			<div className="flex flex-col gap-4">
				{/* Header */}
				<div className="flex items-start justify-between gap-3">
					<div className="flex items-center gap-3">
						<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50">
							<RiCalendarEventLine className="size-5 text-primary-600" />
						</div>
						<div>
							<div className="flex items-center gap-2">
								{eventDay ? (
									<span className="rounded-md bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-800">
										Day {eventDay}
									</span>
								) : null}
								<p className="font-bold text-neutral-900 text-sm leading-snug">{title}</p>
							</div>
							<p className="text-xs text-neutral-500 font-medium capitalize mt-0.5">
								{subject || "General Subject"}
							</p>
						</div>
					</div>

					{isLive ? (
						<span className="flex shrink-0 items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
							<span className="size-1.5 rounded-full bg-red-500 animate-pulse" />
							LIVE
						</span>
					) : isUpcoming ? (
						<span className="flex shrink-0 items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
							Upcoming
						</span>
					) : (
						<span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500">
							Ended
						</span>
					)}
				</div>

				{/* Details grid */}
				<div className="grid grid-cols-2 gap-2.5 rounded-xl bg-neutral-50/90 p-3 text-xs">
					<div>
						<p className="text-neutral-400 font-medium">Category</p>
						<p className="font-semibold text-neutral-800 capitalize mt-0.5">{category || "General"}</p>
					</div>
					<div>
						<p className="text-neutral-400 font-medium">Target Exam</p>
						<p className="font-semibold text-orange-600 uppercase mt-0.5">{subCategory || "All Exams"}</p>
					</div>
					<div>
						<p className="text-neutral-400 font-medium">Schedule</p>
						<p className="flex items-center gap-1 font-semibold text-neutral-800 mt-0.5">
							<RiTimeLine className="size-3.5 text-neutral-400" />
							{formatHour(event.start_hour)} - {formatHour(event.end_hour)}
							{durationHours > 0 ? ` (${durationHours}h)` : ""}
						</p>
					</div>
					<div>
						<p className="text-neutral-400 font-medium">Platform</p>
						<p className="font-semibold capitalize text-neutral-800 mt-0.5">{platform || "Online"}</p>
					</div>
				</div>

				{/* Session Note */}
				{note ? (
					<div className="rounded-xl border border-primary-100 bg-primary-50/40 px-3.5 py-2.5 text-xs leading-relaxed text-neutral-700">
						<p className="font-bold text-[10px] uppercase text-primary-800 mb-0.5">
							Session Note:
						</p>
						<p className="line-clamp-2 font-medium">{note}</p>
					</div>
				) : null}
			</div>

			{/* Action Button */}
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					onInspect(event);
				}}
				className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-2xs transition active:scale-98 ${
					isLive
						? "bg-emerald-600 hover:bg-emerald-700"
						: isEnded
							? "bg-neutral-300 text-neutral-600 cursor-not-allowed"
							: "bg-primary-600 hover:bg-primary-700"
				}`}>
				<RiVideoLine className="size-4" />
				{isLive ? "Join Live Session Now" : isEnded ? "View Session Summary" : "View Session Details"}
			</button>
		</div>
	);
};

// ─── Page ────────────────────────────────────────────────────────────────────

const Page = () => {
	const router = useRouter();
	const day = Number(router.query.id);
	const month = router.query.month !== undefined ? Number(router.query.month) : new Date().getMonth();
	const year = Number(router.query.year) || new Date().getFullYear();

	const [selectedEvent, setSelectedEvent] = React.useState<CalendarEventItem | null>(null);
	const [modalOpen, setModalOpen] = React.useState(false);

	const { data: responseData, isLoading } = useGetUpcomingEvents({ month, year });
	const dayGroups = responseData?.events ?? [];

	// Find events for this specific day
	const dayEvents = React.useMemo((): CalendarEventItem[] => {
		if (!dayGroups.length || !day) return [];
		const matched: CalendarEventItem[] = [];
		dayGroups.forEach((dayGroup) => {
			(dayGroup.events || []).forEach((event) => {
				const eventDate = new Date(event.date);
				if (
					eventDate.getUTCDate() === day &&
					eventDate.getMonth() === month &&
					eventDate.getFullYear() === year
				) {
					matched.push(event);
				}
			});
		});
		return matched;
	}, [dayGroups, day, month, year]);

	// Build display date
	const displayDate = React.useMemo(() => {
		if (!day) return "";
		try {
			return format(new Date(year, month, day), "EEEE, d MMMM yyyy");
		} catch {
			return "";
		}
	}, [day, month, year]);

	const openEventModal = (event: CalendarEventItem) => {
		setSelectedEvent(event);
		setModalOpen(true);
	};

	return (
		<>
			<Seo title={displayDate ? `Classes – ${displayDate}` : "Calendar Classes"} noIndex />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-4 py-4 md:px-8">
					{/* Back + Header */}
					<div className="flex flex-col gap-1">
						<button
							onClick={() => router.back()}
							className="flex w-fit items-center gap-1.5 text-sm text-neutral-500 transition hover:text-neutral-800">
							<RiArrowLeftLine className="size-4" />
							Back to Calendar
						</button>
						<h1 className="text-2xl font-bold tracking-tight text-neutral-900">
							{displayDate || "Classes on Selected Day"}
						</h1>
						{!isLoading && (
							<p className="text-sm text-neutral-500">
								{dayEvents.length === 0
									? "No classes scheduled for this day"
									: `${dayEvents.length} class${dayEvents.length !== 1 ? "es" : ""} scheduled`}
							</p>
						)}
					</div>

					{/* Content */}
					{isLoading ? (
						<div className="flex items-center justify-center py-20">
							<div className="flex flex-col items-center gap-3 text-neutral-400">
								<RiLoaderLine className="size-8 animate-spin" />
								<p className="text-sm font-medium">Loading events…</p>
							</div>
						</div>
					) : dayEvents.length === 0 ? (
						<div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/70 py-20 text-center">
							<div className="flex size-16 items-center justify-center rounded-2xl bg-neutral-100">
								<RiCalendarEventLine className="size-8 text-neutral-400" />
							</div>
							<div>
								<p className="font-semibold text-neutral-800 text-base">No classes on this day</p>
								<p className="mt-1 text-sm text-neutral-500">
									Check other days or browse the full monthly schedule.
								</p>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
							{dayEvents.map((event) => (
								<EventCard key={event.id} event={event} onInspect={openEventModal} />
							))}
						</div>
					)}
				</div>

				<LiveSessionModal
					open={modalOpen}
					setOpen={setModalOpen}
					event={selectedEvent}
				/>
			</DashboardLayout>
		</>
	);
};

export default Page;
