import DOMPurify from "isomorphic-dompurify";

import type { ReviewProps } from "@/types";

const SANITIZE_CONFIG = {
	ALLOWED_TAGS: ["b", "i", "em", "strong", "a"],
	ALLOWED_ATTR: ["href"],
};

const memoizedSanitize = new Map<string, string>();

export const sanitizeHtml = (html: string) => {
	if (!html || typeof html !== "string") {
		return "";
	}

	if (memoizedSanitize.has(html)) {
		return memoizedSanitize.get(html)!;
	}

	const sanitized = DOMPurify.sanitize(html, SANITIZE_CONFIG);
	memoizedSanitize.set(html, sanitized);

	if (memoizedSanitize.size > 1000) {
		const firstKey = memoizedSanitize.keys().next().value;
		if (firstKey !== undefined) {
			memoizedSanitize.delete(firstKey);
		}
	}

	return sanitized;
};

export const capitalize = (value?: string) => {
	if (!value) return "";
	return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formatEmail = (email: string | undefined) => {
	if (!email) {
		throw new Error("Email address is required");
	}

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(email?.trim())) {
		throw new Error("Invalid email format");
	}

	const [local, domain] = email.split("@");
	// Mask the local part except for the first two characters and last two characters
	const maskedLocal = local.length > 4 ? local.slice(0, 2) + "******" + local.slice(-2) : local;

	return `${maskedLocal}@${domain}`;
};

export const getInitials = (value: string) =>
	value
		.split(" ")
		.map((word) => word.substring(0, 1))
		.join("");

export const sanitize = (value: string) => value.toLowerCase().split("_").join(" ");

export const normalize = (path: string) => {
	let normalPath: string;
	if (path.split("/").length > 2) {
		const pathParts = `/${path.split("/")[1]}/${path.split("/")[2]}`;
		normalPath = pathParts;
	} else {
		normalPath = path;
	}
	return normalPath;
};

export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
		maximumFractionDigits: 2,
	}).format(amount);
};

export const formatTime = (seconds: number): string => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.floor(seconds % 60);
	return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const getContrastingColor = (color: string) => {
	const r = parseInt(color.substring(1, 3), 16);
	const g = parseInt(color.substring(3, 5), 16);
	const b = parseInt(color.substring(5, 7), 16);
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? "#000" : "#FFF";
};

export const fromSnakeCase = (str?: string) => {
	if (!str) return "";
	return str
		.split("_")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

export function generateRandomName(): string {
	const adjectives = [
		"Soaring",
		"Gentle",
		"Swift",
		"Bright",
		"Calm",
		"Dancing",
		"Elegant",
		"Fierce",
		"Glowing",
		"Harmonious",
		"Luminous",
		"Majestic",
		"Noble",
		"Radiant",
		"Serene",
		"Tranquil",
		"Valiant",
		"Whispering",
		"Zestful",
		"Agile",
		"Brave",
		"Crisp",
		"Dazzling",
		"Emerald",
		"Flowing",
		"Golden",
		"Hopeful",
		"Inspiring",
		"Jubilant",
		"Kind",
		"Lively",
	];

	const nouns = [
		"Dolphin",
		"Eagle",
		"Falcon",
		"Gazelle",
		"Hawk",
		"Jaguar",
		"Lion",
		"Owl",
		"Panther",
		"Raven",
		"Shark",
		"Tiger",
		"Wolf",
		"Whale",
		"Phoenix",
		"Pegasus",
		"Dragon",
		"Griffin",
		"Unicorn",
		"Cheetah",
		"Leopard",
		"Lynx",
		"Osprey",
		"Puma",
		"Sparrow",
		"Thunderbird",
		"Viper",
		"Wolverine",
		"Zebra",
		"Lynx",
	];

	const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

	return `${randomAdjective} ${randomNoun}`;
}

export function generateUniqueNames(count: number): string[] {
	if (count < 1 || count > 256) {
		throw new Error("Count must be between 1 and 256");
	}

	const uniqueNames = new Set<string>();

	while (uniqueNames.size < count) {
		uniqueNames.add(generateRandomName());
	}

	return Array.from(uniqueNames);
}

export const getAverageRating = (reviews: ReviewProps[]) => {
	const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
	const averageRating = totalRating / reviews.length;
	if (isNaN(averageRating)) {
		return "0.0";
	}
	return averageRating.toFixed(1);
};

export const paginate = <T>(data: T[], page: number, limit: number): T[] => {
	const start = (page - 1) * limit;
	const end = start + limit;
	return data.slice(start, end);
};

export const formatNumber = (number: number) => {
	return new Intl.NumberFormat("en-NG").format(number);
};

export const convertSecondsToMinSec = (totalSeconds: number) => {
	if (Number.isNaN(totalSeconds) || totalSeconds <= 0) {
		return "--:--";
	}

	const minutes = Math.floor(totalSeconds / 60);
	const seconds = Math.floor(totalSeconds % 60);

	const formattedSeconds = seconds.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");
	return `${formattedMinutes}:${formattedSeconds}`;
};

export const getTimeInSeconds = (hour: number, minutes: number): number => {
	if (hour < 0 || hour > 23 || minutes < 0 || minutes > 59) {
		throw new Error("Invalid time input");
	}

	const SECONDS_PER_HOUR = 3600;
	const SECONDS_PER_MINUTE = 60;

	return hour * SECONDS_PER_HOUR + minutes * SECONDS_PER_MINUTE;
};

export const getFormattedTime = (timeInSeconds: number) => {
	const SECONDS_PER_HOUR = 3600;
	const SECONDS_PER_MINUTE = 60;

	const hours = Math.floor(timeInSeconds / SECONDS_PER_HOUR);
	const remainingAfterHours = timeInSeconds % SECONDS_PER_HOUR;

	const minutes = Math.floor(remainingAfterHours / SECONDS_PER_MINUTE);
	const seconds = remainingAfterHours % SECONDS_PER_MINUTE;

	const formattedHours = hours.toString().padStart(2, "0");
	const formattedMinutes = minutes.toString().padStart(2, "0");
	const formattedSeconds = seconds.toString().padStart(2, "0");

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const generateRandomColor = (opacity: number = 1) => {
	const clampedOpacity = Math.max(0, Math.min(1, opacity));

	const hex = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	return `rgba(${r}, ${g}, ${b}, ${clampedOpacity})`;
};
