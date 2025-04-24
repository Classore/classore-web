import DOMPurify from "isomorphic-dompurify";

import type { ReviewProps } from "@/types";

export const SANITIZE_CONFIG = {
	ALLOWED_TAGS: ["b", "i", "em", "strong", "a"],
	ALLOWED_ATTR: ["href"],
};

export const memoizedSanitize = new Map<string, string>();

interface SanitizeOptions {
	ALLOWED_TAGS?: string[];
	ALLOWED_ATTR?: string[];
	ALLOW_DATA_ATTR?: boolean;
	USE_PROFILES?: {
		html?: boolean;
		svg?: boolean;
		svgFilters?: boolean;
	};
}

const defaultOptions: SanitizeOptions = {
	ALLOWED_TAGS: [
		"p",
		"div",
		"span",
		"br",
		"hr",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"h6",
		"b",
		"strong",
		"i",
		"em",
		"u",
		"strike",
		"sub",
		"sup",
		"ul",
		"ol",
		"li",
		"table",
		"thead",
		"tbody",
		"tr",
		"td",
		"th",
		"blockquote",
		"pre",
		"code",
	],
	ALLOWED_ATTR: ["id", "class", "style", "align", "dir", "colspan", "rowspan", "aria-label", "role"],
	ALLOW_DATA_ATTR: true,
	USE_PROFILES: {
		html: true,
		svg: false,
		svgFilters: false,
	},
};

export const sanitizeHtml = (
	html: string | undefined | null,
	options: SanitizeOptions = defaultOptions
) => {
	if (!html) return "";

	try {
		const sanitized = DOMPurify.sanitize(html, {
			...options,
			RETURN_DOM: false,
			RETURN_DOM_FRAGMENT: false,
			RETURN_TRUSTED_TYPE: true,
			SANITIZE_DOM: true,
		}).toString();

		const parser = new DOMParser();
		const doc = parser.parseFromString(sanitized, "text/html");

		const removeEmptyElements = (node: Node) => {
			const children = Array.from(node.childNodes);

			children.forEach((child) => {
				if (child.nodeType === Node.ELEMENT_NODE) {
					removeEmptyElements(child);

					const element = child as HTMLElement;
					const tagName = element.tagName.toLowerCase();

					if (
						tagName !== "br" &&
						tagName !== "hr" &&
						!element.textContent?.trim() &&
						!element.querySelector("img, br, hr")
					) {
						element.remove();
					}
				}
			});
		};

		removeEmptyElements(doc.body);

		const convertToListItems = (node: Node) => {
			const children = Array.from(node.childNodes);

			children.forEach((child) => {
				if (child.nodeType === Node.TEXT_NODE) {
					const pattern = /^(\d+\.|\.|\s*o)\s+(.+)$/;
					const text = child.textContent?.trim() || "";
					if (pattern.test(text)) {
						const li = doc.createElement("li");
						li.textContent = text.replace(pattern, "$2");
						let list = child.previousSibling;
						if (!list || !(list instanceof Element) || (list.tagName !== "UL" && list.tagName !== "OL")) {
							if (text.match(/^\d+\./)) {
								list = doc.createElement("ol");
							} else {
								list = doc.createElement("ul");
							}
							child.parentNode?.insertBefore(list, child);
						}

						list.appendChild(li);
						child.remove();
					}
				} else if (child.nodeType === Node.ELEMENT_NODE) {
					convertToListItems(child);
				}
			});
		};

		convertToListItems(doc.body);

		const normalizeWhitespace = (node: Node) => {
			const children = Array.from(node.childNodes);

			children.forEach((child) => {
				if (child.nodeType === Node.TEXT_NODE) {
					child.textContent = child.textContent?.replace(/\s+/g, " ").trim() ?? "";
				} else if (child.nodeType === Node.ELEMENT_NODE) {
					normalizeWhitespace(child);
				}
			});
		};

		normalizeWhitespace(doc.body);

		return doc.body.innerHTML;
	} catch (error) {
		console.error("Error sanitizing HTML:", error);
		return "";
	}
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

export const normalize = (path: string, parts = 2): string => {
	if (!path) {
		return "";
	}

	const pathSegments = path.split("/").filter(Boolean);
	return pathSegments.length >= parts ? "/" + pathSegments.slice(0, parts).join("/") : path;
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

export const isDeviceMobileSafari = () => {
	if (typeof window === undefined) return false;

	const ua = navigator.userAgent;
	const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
	const isIOS =
		/iPad|iPhone|iPod/.test(ua) ||
		(navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

	return isSafari && isIOS;
};

export const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
