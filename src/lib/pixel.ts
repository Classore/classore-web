type FacebookPixelEvent =
	| "PageView"
	| "ViewContent"
	| "AddToCart"
	| "Purchase"
	| "CompleteRegistration"
	| "Lead";

type FacebookPixelOptions = {
	content_name?: string;
	content_type?: string;
	content_ids?: string[];
	content_category?: string;
	value?: number;
	currency?: string;
	[key: string]: string | number | boolean | object | undefined | null;
};

declare global {
	interface Window {
		fbq: (
			type: "track" | "init",
			name: FacebookPixelEvent | string,
			options?: FacebookPixelOptions
		) => void;
	}
}

export const pageview = (): void => {
	if (window.fbq) {
		window.fbq("track", "PageView");
	}
};

export const event = (
	name: FacebookPixelEvent,
	options: FacebookPixelOptions = {}
): void => {
	if (window.fbq) {
		window.fbq("track", name, options);
	}
};
