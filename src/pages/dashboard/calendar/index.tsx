import {
	RiArrowLeftSLine,
	RiArrowRightSLine,
	RiCalendarEventLine,
	RiCalendarLine,
} from "@remixicon/react";
import { addMonths, format, isSameDay, subMonths } from "date-fns";
import Link from "next/link";
import * as React from "react";

import type { CalendarEventItem } from "@/queries/student";
import { useGetUpcomingEvents } from "@/queries/student";
import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";
import { LiveSessionModal } from "@/components/modals/live-session-modal";
import { getEventTemporalStatus } from "@/lib/date";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type DayCell = {
	day: number | null;
	events: CalendarEventItem[];
};

// ─── Page ────────────────────────────────────────────────────────────────────

const Page = () => {
	const [current, setCurrent] = React.useState(new Date());
	const [selectedEvent, setSelectedEvent] = React.useState<CalendarEventItem | null>(null);
	const [modalOpen, setModalOpen] = React.useState(false);

	const month = current.getMonth();
	const year = current.getFullYear();
	const { data: responseData } = useGetUpcomingEvents({ month, year });

	const dayGroups = responseData?.events ?? [];

	// Build a lookup: day-of-month → events[]
	const eventsByDay = React.useMemo(() => {
		const map: Record<number, CalendarEventItem[]> = {};
		dayGroups.forEach((dayGroup) => {
			(dayGroup.events || []).forEach((event) => {
				const eventDate = new Date(event.date);
				if (
					eventDate.getFullYear() === current.getFullYear() &&
					eventDate.getMonth() === current.getMonth()
				) {
					const dayNum = eventDate.getUTCDate();
					if (!map[dayNum]) map[dayNum] = [];
					map[dayNum].push(event);
				}
			});
		});
		return map;
	}, [dayGroups, current]);

	// Build all events list for statistics
	const allMonthEvents = React.useMemo(() => {
		return dayGroups.flatMap((g) => g.events || []).filter((e) => e && e.is_active);
	}, [dayGroups]);

	const liveCount = React.useMemo(() => {
		return allMonthEvents.filter((e) => getEventTemporalStatus(e) === "LIVE").length;
	}, [allMonthEvents]);

	const upcomingCount = React.useMemo(() => {
		return allMonthEvents.filter((e) => getEventTemporalStatus(e) === "UPCOMING").length;
	}, [allMonthEvents]);

	// Build 7-column grid cells
	const calendarDays = React.useMemo((): DayCell[] => {
		const yr = current.getFullYear();
		const mo = current.getMonth();
		const daysInMonth = new Date(yr, mo + 1, 0).getDate();
		const firstDay = new Date(yr, mo, 1).getDay();
		const days: DayCell[] = [];

		for (let i = 0; i < firstDay; i++) {
			days.push({ day: null, events: [] });
		}
		for (let day = 1; day <= daysInMonth; day++) {
			const rawEvents = eventsByDay[day] || [];
			days.push({
				day,
				events: rawEvents,
			});
		}
		return days;
	}, [current, eventsByDay]);

	const goToPreviousMonth = () => setCurrent(subMonths(current, 1));
	const goToNextMonth = () => setCurrent(addMonths(current, 1));

	const openEventModal = (event: CalendarEventItem) => {
		setSelectedEvent(event);
		setModalOpen(true);
	};

	return (
		<>
			<Seo title="Live Classes & Calendar" noIndex />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-4 py-4 md:px-8">
					{/* ── Header ── */}
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-2xl font-bold tracking-tight text-neutral-900">
								Academic Calendar & Live Classes
							</h1>
							<p className="mt-0.5 text-xs text-neutral-500">
								Join live tutoring sessions and track upcoming subject lectures.
							</p>
						</div>

						{/* Quick Month Switcher */}
						<div className="flex items-center gap-2">
							<button
								onClick={goToPreviousMonth}
								className="grid size-9 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50 active:scale-95">
								<RiArrowLeftSLine className="size-5" />
							</button>

							<div className="min-w-[150px] rounded-xl border border-neutral-200 bg-white px-4 py-2 text-center text-sm font-bold text-neutral-900 shadow-2xs">
								{format(current, "MMMM yyyy")}
							</div>

							<button
								onClick={goToNextMonth}
								className="grid size-9 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-50 active:scale-95">
								<RiArrowRightSLine className="size-5" />
							</button>
						</div>
					</div>

					{/* ── Summary Stats ── */}
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<div className="flex items-center gap-3.5 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
							<div className="grid size-11 place-items-center rounded-xl bg-primary-50 text-primary-600">
								<RiCalendarLine className="size-5" />
							</div>
							<div>
								<p className="text-xs font-medium text-neutral-500">Total Classes This Month</p>
								<p className="text-xl font-bold text-neutral-900 mt-0.5">{allMonthEvents.length}</p>
							</div>
						</div>

						<div className="flex items-center gap-3.5 rounded-2xl border border-red-100 bg-red-50/40 p-4 shadow-2xs">
							<div className="grid size-11 place-items-center rounded-xl bg-red-100 text-red-600">
								<span className="size-3 rounded-full bg-red-500 animate-pulse" />
							</div>
							<div>
								<p className="text-xs font-semibold text-red-800">Ongoing Live Classes</p>
								<p className="text-xl font-bold text-red-900 mt-0.5">{liveCount}</p>
							</div>
						</div>

						<div className="flex items-center gap-3.5 rounded-2xl border border-blue-100 bg-blue-50/40 p-4 shadow-2xs">
							<div className="grid size-11 place-items-center rounded-xl bg-blue-100 text-blue-600">
								<RiCalendarEventLine className="size-5" />
							</div>
							<div>
								<p className="text-xs font-semibold text-blue-800">Upcoming Scheduled</p>
								<p className="text-xl font-bold text-blue-900 mt-0.5">{upcomingCount}</p>
							</div>
						</div>
					</div>

					{/* ── Calendar Grid ── */}
					<div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs">
						{/* Weekday headers */}
						<div className="grid grid-cols-7 border-b border-neutral-200 bg-neutral-50/80 text-center text-xs font-bold uppercase tracking-wider text-neutral-500">
							{WEEKDAYS.map((d) => (
								<div key={d} className="py-3">
									{d}
								</div>
							))}
						</div>

						{/* Days grid */}
						<div className="grid grid-cols-7 divide-x divide-y divide-neutral-100">
							{calendarDays.map((cell, idx) => {
								const isToday =
									cell.day !== null &&
									isSameDay(new Date(year, month, cell.day), new Date());

								return (
									<div
										key={idx}
										className={`min-h-[115px] p-2 transition hover:bg-neutral-50/40 ${
											!cell.day ? "bg-neutral-50/20" : ""
										}`}>
										{cell.day && (
											<div className="mb-1.5 flex items-center justify-between">
												<Link
													href={`/dashboard/calendar/${cell.day}?month=${month}&year=${year}`}
													className={`flex size-6 items-center justify-center rounded-full text-xs font-bold transition hover:bg-primary-100 hover:text-primary-700 ${
														isToday
															? "bg-primary-600 text-white shadow-xs"
															: "text-neutral-700"
													}`}>
													{cell.day}
												</Link>

												{cell.events.length > 0 && (
													<Link
														href={`/dashboard/calendar/${cell.day}?month=${month}&year=${year}`}
														className="text-[10px] font-semibold text-neutral-400 hover:text-primary-600">
														{cell.events.length} {cell.events.length === 1 ? "class" : "classes"}
													</Link>
												)}
											</div>
										)}

										{/* Event items in cell */}
										<div className="flex flex-col gap-1">
											{cell.events.slice(0, 3).map((event) => {
												const tempStatus = getEventTemporalStatus(event);
												const isLiveNow = tempStatus === "LIVE" && event.is_active;
												const isUpcoming = tempStatus === "UPCOMING" && event.is_active;

												return (
													<button
														key={event.id}
														type="button"
														onClick={() => openEventModal(event)}
														className={`flex w-full items-center gap-1.5 truncate rounded-lg border-l-3 px-2 py-1 text-left text-[11px] font-semibold transition hover:shadow-xs active:scale-98 ${
															isLiveNow
																? "border-l-red-500 bg-red-50 text-red-900"
																: isUpcoming
																	? "border-l-blue-500 bg-blue-50/70 text-blue-900"
																	: "border-l-neutral-300 bg-neutral-100 text-neutral-700"
														}`}>
														{isLiveNow ? (
															<span className="size-2 shrink-0 animate-pulse rounded-full bg-red-500" />
														) : (
															<RiCalendarEventLine className="size-3 shrink-0 opacity-70" />
														)}
														<span className="truncate">{event.title || "Live Class"}</span>
													</button>
												);
											})}

											{/* Overflow indicator */}
											{cell.events.length > 3 && cell.day && (
												<Link
													href={`/dashboard/calendar/${cell.day}?month=${month}&year=${year}`}
													className="px-1 text-[10px] font-bold text-primary-600 hover:underline">
													+{cell.events.length - 3} more
												</Link>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* ── Legend ── */}
					<div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600">
						<span className="flex items-center gap-2 font-medium">
							<span className="size-2.5 rounded-full bg-red-500 animate-pulse" />
							Ongoing Live Class
						</span>
						<span className="flex items-center gap-2 font-medium">
							<span className="size-2.5 rounded-full bg-blue-500" />
							Upcoming Class
						</span>
						<span className="flex items-center gap-2 font-medium">
							<span className="size-2.5 rounded-full bg-neutral-300" />
							Class Concluded
						</span>
					</div>
				</div>

				{/* ── Interactive Live Session Modal ── */}
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
