import { format } from "date-fns";

export type Period = "THIS_YEAR" | "THIS_MONTH" | "THIS_WEEK" | "TODAY";

export const PERIOD_OPTIONS: {
	label: string;
	value: Period;
}[] = [
	{ label: "12 months", value: "THIS_YEAR" },
	{ label: "30 days", value: "THIS_MONTH" },
	{ label: "7 days", value: "THIS_WEEK" },
	{ label: "24 hours", value: "TODAY" },
];

export const formatDate = (date: Date, period: Period): string => {
	switch (period) {
		case "THIS_YEAR":
			return format(new Date(date), "MMM");
		case "THIS_MONTH":
			return format(new Date(date), "dd");
		case "THIS_WEEK":
			return format(new Date(date), "eee");
		case "TODAY":
			return format(new Date(date), "HH:mm");
	}
};
