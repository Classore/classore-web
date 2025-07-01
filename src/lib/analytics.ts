import posthog from "posthog-js";

import { env } from "@/config";

const ENV = {
	isDevelopment: process.env.NODE_ENV === "development",
	isBrowser: typeof window !== "undefined",
} as const;

const config = {
	posthog_host: env.NEXT_PUBLIC_POSTHOG_HOST,
	posthog_key: env.NEXT_PUBLIC_POSTHOG_KEY,
} as const;

if (ENV.isBrowser && config.posthog_key) {
	posthog.init(config.posthog_key, {
		api_host: config.posthog_host ?? "https://us.i.posthog.com",
		person_profiles: "always",
		loaded: (posthog) => {
			if (ENV.isDevelopment) posthog.debug();
		},
	});
}

declare global {
	interface Window {
		gtag: (...args: unknown[]) => void;
		dataLayer: unknown[];
	}
}

const analytics = {
	track(event: string, properties?: Record<string, unknown>) {
		if (!ENV.isBrowser || !event) return;

		const eventData = properties ? { ...properties } : undefined;

		if (window.gtag) {
			window.gtag("event", event, {
				event_category: "engagement",
				event_label: "web",
				value: eventData,
			});
		}

		if (window.dataLayer) {
			window.dataLayer.push({
				event,
				data: eventData,
			});
		}

		posthog.capture(event, properties);
	},

	pageView(path: string) {
		if (!ENV.isBrowser) return;

		if (window.dataLayer) {
			window.dataLayer.push({
				event: "page_view",
				page: path,
			});
		}

		if (window.gtag) {
			window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, {
				page_path: path,
			});
		}

		posthog?.capture("$pageview");
	},

	error(err: { message: string }, fatal = false) {
		if (!ENV.isBrowser) return;

		if (window.gtag) {
			window.gtag("event", "exception", {
				description: err.message,
				fatal,
			});
		}
	},
} as const;

export { analytics };
