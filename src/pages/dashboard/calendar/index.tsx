import { RiArrowLeftSLine, RiCalendarEventLine } from "@remixicon/react"
import { addMonths, format, subMonths } from "date-fns"
import Link from "next/link"
import React from "react"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { DashboardLayout } from "@/components/layouts"
import { AvatarGroup, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import type { EventProps } from "@/types"

import { events } from "@/mock"

type DayEventProps = EventProps & {
	status: "past" | "upcoming" | "current"
}

type DayProps = {
	day: number | null
	events: DayEventProps[]
}

const EventStatusColor: Record<DayEventProps["status"], string> = {
	past: "bg-neutral-200 text-neutral-700 border-neutral-700",
	upcoming: "bg-blue-100 text-blue-700 border-blue-700",
	current: "bg-green-100 text-green-700 border-green-700",
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const Page = () => {
	const [current, setCurrent] = React.useState(new Date())

	const getEventStatus = React.useCallback((event: EventProps) => {
		const today = new Date()
		const firstDate = new Date(event.date[0])
		const lastDate = new Date(event.date[event.date.length - 1])

		if (lastDate < today) return "past"
		if (firstDate > today) return "upcoming"
		return "current"
	}, [])

	const getDaysInMonth = (year: number, month: number) => {
		return new Date(year, month + 1, 0).getDate()
	}

	const getFirstDayOfMonth = (year: number, month: number) => {
		return new Date(year, month, 1).getDay()
	}

	const processedEvents = React.useMemo(() => {
		const monthEvents: Record<string, EventProps[]> = {}
		events.forEach((event) => {
			event.date.forEach((dateItem) => {
				const eventDate = new Date(dateItem)
				if (
					eventDate.getFullYear() === current.getFullYear() &&
					eventDate.getMonth() === current.getMonth()
				) {
					const dateKey = eventDate.getDate().toString()
					if (!monthEvents[dateKey]) {
						monthEvents[dateKey] = []
					}
					monthEvents[dateKey].push(event)
				}
			})
		})

		return monthEvents
	}, [current])

	const goToPreviousMonth = () => setCurrent(subMonths(current, 1))

	const goToNextMonth = () => setCurrent(addMonths(current, 1))

	const calendarDays = React.useMemo(() => {
		const year = current.getFullYear()
		const month = current.getMonth()
		const daysInMonth = getDaysInMonth(year, month)
		const firstDay = getFirstDayOfMonth(year, month)
		const days: DayProps[] = []

		for (let i = 0; i < firstDay; i++) {
			days.push({
				day: null,
				events: [],
			})
		}

		for (let day = 1; day <= daysInMonth; day++) {
			const eventForDay = processedEvents[day] || []

			days.push({
				day,
				events: eventForDay.map((event) => ({
					...event,
					status: getEventStatus(event),
				})),
			})
		}

		return days
	}, [current, getEventStatus, processedEvents])

	const isFirstDayOfEvent = (event: EventProps, currentDate: number) => {
		const firstDate = new Date(event.date[0])
		return firstDate.getDate() === currentDate
	}

	const isLastDayOfEvent = (event: EventProps, currentDate: number) => {
		const lastDate = new Date(event.date[event.date.length - 1])
		return lastDate.getDate() === currentDate
	}

	const images = (count: number) => {
		const created = Array(count).map(
			() =>
				"https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
		)
		return created
	}

	return (
		<>
			<Seo title="Calendar" />
			<DashboardLayout>
				<div className="flex h-full w-full flex-col gap-2 px-8 py-4">
					<div className="flex h-[69px] w-full items-center justify-between">
						<button
							onClick={goToPreviousMonth}
							className="grid size-5 place-items-center rounded bg-neutral-200">
							<RiArrowLeftSLine className="size-4 rotate-0" />
						</button>
						<div className="flex items-center">
							<h4 className="text-xl font-medium">{format(current, "MMMM yyyy")}</h4>
						</div>
						<button
							onClick={goToNextMonth}
							className="grid size-5 place-items-center rounded bg-neutral-200">
							<RiArrowLeftSLine className="size-4 rotate-180" />
						</button>
					</div>
					<div className="flex w-full flex-col border">
						<div className="grid w-full grid-cols-7 border-b">
							{daysOfWeek.map((day, index) => (
								<div
									key={index}
									className={`flex h-[49px] w-full items-center justify-center border-r text-sm last:border-r-0 ${day.toLowerCase() === format(new Date(), "EEEE").toLowerCase() ? "bg-primary-100 font-semibold text-primary-500" : "text-neutral-500"}`}>
									{day}
								</div>
							))}
						</div>
						<div className="grid w-full grid-cols-7">
							{calendarDays.map((dayItem, index) => {
								const isToday =
									dayItem.day === new Date().getDate() &&
									current.getMonth() === new Date().getMonth() &&
									current.getFullYear() === new Date().getFullYear()

								return (
									<div
										key={index}
										className={`flex aspect-[1.08/1] w-full flex-col overflow-hidden border-b ${index % 7 === 6 ? "" : "border-r"} ${isToday ? "font-semibold" : "text-neutral-500"}`}>
										<div
											className={`flex w-full items-center px-3 pt-3 ${dayItem.events.length < 1 ? "justify-end" : "justify-between"}`}>
											{dayItem.events.length && (
												<Link
													href={`/dashboard/calendar/${dayItem.day}`}
													className="link flex items-center gap-1 text-xs">
													{dayItem.events.length < 2 ? "View Event" : "View Events"} ({dayItem.events.length})
												</Link>
											)}
											<p className="text-sm">{dayItem.day}</p>
										</div>
										<div className="mt-1 flex flex-col gap-1 overflow-y-auto">
											{dayItem.events.map((event, eventIndex) => {
												const isFirstDay = isFirstDayOfEvent(event, dayItem.day!)
												const isLastDay = isLastDayOfEvent(event, dayItem.day!)
												const isMultiDay = event.date.length > 1

												return (
													<HoverCard key={`${event.id}-${eventIndex}`}>
														<HoverCardTrigger
															className={`group relative flex min-h-9 items-center truncate px-1 py-0.5 text-xs ${EventStatusColor[event.status]} ${isMultiDay ? "rounded-none" : "rounded"} ${isFirstDay ? "ml-2 rounded-l border-l-2" : "-ml-1"} ${isLastDay ? "rounded-r" : "pr-0"} ${!isFirstDay && !isLastDay && isMultiDay ? "pl-0" : ""} `}>
															<div className="flex w-full cursor-pointer items-center gap-2 truncate">
																{isFirstDay && (
																	<>
																		<RiCalendarEventLine className="mr-1 size-4 text-inherit" />
																		<div className="flex flex-col pl-1">
																			<span className={`truncate font-medium ${!isFirstDay ? "pl-1" : ""}`}>
																				{event.title}
																			</span>
																			<span className="text-[10px] text-neutral-500">
																				{format(event.date[0], "hh:mm a")} | {format(event.date[0], "EEEE")} -{" "}
																				{format(event.date[event.date.length - 1], "EEEE")}
																			</span>
																		</div>
																	</>
																)}
																{event.status === "current" && (
																	<div className="animate-pulse rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-medium text-red-100">
																		Live
																	</div>
																)}
															</div>
														</HoverCardTrigger>
														<HoverCardContent className="flex flex-col gap-2 text-wrap">
															<p className="text-lg font-medium">{event.title}</p>
															<div className="flex flex-col gap-1">
																{event.date.map((dateItem, dateIndex) => (
																	<div key={dateIndex} className="flex items-center gap-1">
																		<span className="text-xs text-neutral-500">{format(dateItem, "EEEE")}</span>
																		<span className="text-xs text-neutral-500">{format(dateItem, "hh:mm a")}</span>
																	</div>
																))}
															</div>
															<AvatarGroup
																images={images(event.participants.length)}
																count={event.participants.length}
																shape="round"
																size={20}
															/>
															{event.status === "current" && (
																<Button className="w-fit" size="sm">
																	Join
																</Button>
															)}
														</HoverCardContent>
													</HoverCard>
												)
											})}
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
