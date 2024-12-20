import { format, addHours, isSameDay } from "date-fns"
import { RiArrowLeftSLine } from "@remixicon/react"
import { useRouter } from "next/router"
import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { Seo } from "@/components/shared"
import type { EventProps } from "@/types"

import { events } from "@/mock"

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const TIME_HEIGHT = 48 // Height for each hour slot in pixels

type DayEventProps = EventProps & {
	status: "past" | "upcoming" | "current"
}

type DayProps = {
	day: number | null
	events: DayEventProps[]
}

const Page = () => {
	const router = useRouter()
	const { id } = router.query
	const scrollContainerRef = React.useRef<HTMLDivElement>(null)

	const current = React.useMemo(() => {
		const date = new Date()
		date.setDate(Number(id))
		return date
	}, [id])

	React.useEffect(() => {
		// Scroll to current time on load
		if (scrollContainerRef.current) {
			const currentHour = new Date().getHours()
			scrollContainerRef.current.scrollTop = currentHour * TIME_HEIGHT - 200
		}
	}, [])

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
	}, [getEventStatus, id, processedEvents])

	const dayItems = calendarDays.find((dayItem) => dayItem.day === Number(id))

	const getEventPosition = (event: DayEventProps) => {
		const startDate = new Date(event.date[0])
		if (!isSameDay(startDate, current)) return null

		const startHour = startDate.getHours()
		const startMinutes = startDate.getMinutes()
		const endDate = addHours(startDate, 1)
		const endHour = endDate.getHours()
		const endMinutes = endDate.getMinutes()

		const top = startHour * TIME_HEIGHT + (startMinutes / 60) * TIME_HEIGHT
		const height =
			(endHour - startHour) * TIME_HEIGHT + ((endMinutes - startMinutes) / 60) * TIME_HEIGHT

		return { top, height }
	}

	return (
		<>
			<Seo />
			<DashboardLayout>
				<div className="flex h-full w-full flex-col gap-2 px-8 py-4">
					<Button onClick={() => router.back()} size="cmd" variant="cmd">
						<RiArrowLeftSLine />
						Back
					</Button>
					<div className="flex h-full flex-col gap-6">
						<h3 className="text-xl font-medium">{format(current, "PPP")}</h3>
						<div ref={scrollContainerRef} className="relative flex flex-1 overflow-y-auto">
							{/* Time column */}
							<div className="sticky left-0 w-16 bg-white pr-2">
								{HOURS.map((hour) => (
									<div key={hour} className="relative h-12 border-r text-xs text-gray-500">
										{hour !== 0 && (
											<span className="absolute -top-2 right-2">
												{format(new Date().setHours(hour, 0), "ha")}
											</span>
										)}
									</div>
								))}
							</div>
							<div className="relative flex-1">
								{HOURS.map((hour) => (
									<div key={hour} className="h-12 border-b border-gray-100" />
								))}
								{isSameDay(current, new Date()) && (
									<div
										className="absolute left-0 right-0 border-t-2 border-red-500"
										style={{
											top: `${
												new Date().getHours() * TIME_HEIGHT + (new Date().getMinutes() / 60) * TIME_HEIGHT
											}px`,
										}}>
										<div className="absolute -left-2 -top-[7px] h-3 w-3 rounded-full bg-red-500" />
									</div>
								)}
								{dayItems?.events.map((event) => {
									const position = getEventPosition(event)
									if (!position) return null
									return (
										<div
											key={event.id}
											className="absolute left-1 right-1 rounded bg-blue-100 p-2 text-sm"
											style={{
												top: `${position.top}px`,
												height: `${position.height}px`,
											}}>
											<div className="font-medium">{event.title}</div>
											<div className="text-xs text-gray-600">
												{format(new Date(event.date[0]), "h:mm a")} -
												{format(addHours(new Date(event.date[0]), 1), "h:mm a")}
											</div>
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
