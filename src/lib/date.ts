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

export type ParsedDateParts = {
	year: number;
	month: number;
	day: number;
};

export const parseEventDate = (rawDate: any): ParsedDateParts | null => {
	if (!rawDate) return null;

	if (rawDate instanceof Date) {
		if (isNaN(rawDate.getTime())) return null;
		return {
			year: rawDate.getFullYear(),
			month: rawDate.getMonth(),
			day: rawDate.getDate(),
		};
	}

	if (typeof rawDate !== "string") {
		const d = new Date(rawDate);
		if (isNaN(d.getTime())) return null;
		return {
			year: d.getFullYear(),
			month: d.getMonth(),
			day: d.getDate(),
		};
	}

	const str = rawDate.trim();
	if (!str) return null;

	// 1. ISO format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
	if (/^\d{4}-\d{1,2}-\d{1,2}/.test(str)) {
		const parts = str.split("T")[0].split("-").map(Number);
		return {
			year: parts[0],
			month: parts[1] - 1,
			day: parts[2],
		};
	}

	// 2. YYYY/MM/DD
	if (/^\d{4}\/\d{1,2}\/\d{1,2}/.test(str)) {
		const parts = str.split("T")[0].split("/").map(Number);
		return {
			year: parts[0],
			month: parts[1] - 1,
			day: parts[2],
		};
	}

	// 3. Slash format: MM/DD/YYYY or DD/MM/YYYY
	if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(str)) {
		const parts = str.split("T")[0].split("/").map(Number);
		const p0 = parts[0];
		const p1 = parts[1];
		const p2 = parts[2];

		if (p0 > 12 && p1 <= 12) {
			return {
				year: p2,
				month: p1 - 1,
				day: p0,
			};
		}
		return {
			year: p2,
			month: p0 - 1,
			day: p1,
		};
	}

	// 4. Dash format: DD-MM-YYYY
	if (/^\d{1,2}-\d{1,2}-\d{4}/.test(str)) {
		const parts = str.split("T")[0].split("-").map(Number);
		const p0 = parts[0];
		const p1 = parts[1];
		const p2 = parts[2];

		if (p0 > 12 && p1 <= 12) {
			return {
				year: p2,
				month: p1 - 1,
				day: p0,
			};
		}
		return {
			year: p2,
			month: p0 - 1,
			day: p1,
		};
	}

	const d = new Date(str);
	if (!isNaN(d.getTime())) {
		return {
			year: d.getFullYear(),
			month: d.getMonth(),
			day: d.getDate(),
		};
	}

	return null;
};

export const getEventDateTime = (rawDate: any, hour?: number): number => {
	const parsed = parseEventDate(rawDate);
	if (!parsed) return 0;
	return new Date(parsed.year, parsed.month, parsed.day, hour ?? 0, 0, 0).getTime();
};

export const getEventTemporalStatus = (
	event: any,
	fallbackDate?: string
): EventTemporalStatus => {
	if (!event) return "ENDED";
	if (event.is_active === false) return "ENDED";

	try {
		const now = new Date();
		const rawDate = event.date || fallbackDate;
		if (!rawDate) return "ENDED";

		const parsed = parseEventDate(rawDate);
		if (!parsed) return "ENDED";

		const { year, month, day } = parsed;

		const parseHour = (val: any): number => {
			if (typeof val === "number") return val;
			if (typeof val === "string") {
				const num = parseInt(val, 10);
				return isNaN(num) ? 0 : num;
			}
			return 0;
		};

		const startHour = parseHour(event.start_hour);
		const endHour = parseHour(event.end_hour);

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
