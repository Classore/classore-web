import { RiCloseLine } from "@remixicon/react"
import { format } from "date-fns"
import React from "react"

import { EventStatusColor } from "../../config"
import type { EventProps } from "../../types"

type DayEventProps = EventProps & {
	status: "past" | "upcoming" | "current"
}

interface Props {
	day: Date
	dayEvents: DayEventProps[] | null
	onClose?: () => void
}

export const DayView = ({ day, dayEvents, onClose }: Props) => {
	return (
		<div
			onClick={onClose}
			className="fixed inset-0 left-0 top-0 !z-20 grid h-full w-full place-items-center bg-black/50 backdrop-blur-sm">
			<div
				onClick={(e) => e.stopPropagation()}
				className="container mx-auto flex max-h-[80vh] max-w-[50%] flex-col gap-4 overflow-y-auto rounded-lg bg-white p-6">
				<div className="flex w-full items-center justify-between">
					<h5 className="text-xl font-medium">{format(day, "PPP")}</h5>
					<button onClick={onClose}>
						<RiCloseLine />
					</button>
				</div>
				<div className="flex w-full flex-col gap-4">
					{!dayEvents || dayEvents?.length < 0 ? (
						<div className="flex w-full items-center justify-center">
							<p className="text-sm text-neutral-500">No events for this day</p>
						</div>
					) : (
						dayEvents?.map((event) => (
							<div
								key={event.id}
								className={`flex flex-col gap-2 rounded-lg border-l-4 ${EventStatusColor[event.status]} p-4`}>
								<h5 className="text-lg font-medium">{event.title}</h5>
								<div className="flex flex-col gap-1">
									{event.date.map((dateItem, dateIndex) => (
										<div key={dateIndex} className="flex items-center gap-1">
											<span className="text-xs text-neutral-500">{format(dateItem, "EEEE")}</span>
											<span className="text-xs text-neutral-500">{format(dateItem, "hh:mm a")}</span>
										</div>
									))}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}
