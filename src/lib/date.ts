import {
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	getDay,
	getDaysInMonth,
	startOfMonth,
	startOfWeek,
} from "date-fns";

export const getWeekDays = (date: Date) => {
	const weekStartDate = startOfWeek(date);
	const weekEndDate = endOfWeek(date);

	const weekStartDay = format(weekStartDate, "dd");
	const weekEndDay = format(weekEndDate, "dd");
	const month = format(date, "MMMM");
	const year = format(date, "yyyy");

	const formattedWeek = `${month} ${weekStartDay} - ${weekEndDay}, ${year}`;

	return formattedWeek;
};

export const getMonthDays = (date: Date) => {
	const daysInMonth = getDaysInMonth(date);
	const currentMonth = format(date, "MMMM");

	const year = format(date, "yyyy");

	return `${currentMonth} 1 - ${daysInMonth}, ${year}`;
};

export const generateCalendarDays = (date: Date) => {
	const firstDayOfMonth = startOfMonth(date);
	const lastDayOfMonth = endOfMonth(date);

	const daysInMonth = eachDayOfInterval({
		start: firstDayOfMonth,
		end: lastDayOfMonth,
	});

	const startDayIndex = getDay(firstDayOfMonth);

	const calendarDays = [...Array(startDayIndex).fill(null), ...daysInMonth];

	return calendarDays;
};
export type EventTemporalStatus = "LIVE" | "UPCOMING" | "ENDED";

export const getEventTemporalStatus = (event: any): EventTemporalStatus => {
	if (!event) return "ENDED";
	try {
		const now = new Date();
		const rawDate = event.date;
		if (!rawDate) return "ENDED";

		let year: number;
		let month: number;
		let day: number;

		if (typeof rawDate === "string" && /^\d{4}-\d{2}-\d{2}/.test(rawDate)) {
			const parts = rawDate.split("T")[0].split("-").map(Number);
			year = parts[0];
			month = parts[1] - 1;
			day = parts[2];
		} else {
			const d = new Date(rawDate);
			if (isNaN(d.getTime())) return "ENDED";
			year = d.getFullYear();
			month = d.getMonth();
			day = d.getDate();
		}

		const startHour = Number(event.start_hour) || 0;
		const endHour = Number(event.end_hour) || 0;

		const startTime = new Date(year, month, day, startHour, 0, 0, 0);
		const effectiveEndHour = endHour > startHour ? endHour : startHour + 1;
		const endTime = new Date(year, month, day, effectiveEndHour, 0, 0, 0);

		if (now >= startTime && now <= endTime) {
			return "LIVE";
		} else if (now < startTime) {
			return "UPCOMING";
		} else {
			return "ENDED";
		}
	} catch {
		return "ENDED";
	}
};
