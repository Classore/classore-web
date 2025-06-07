export const requiredEnvs = [
	"API_URL",
	"GETSTREAM_API_KEY",
	"GETSTREAM_API_SECRET",
	"NEXT_PUBLIC_API_URL",
	"NEXT_PUBLIC_FACEBOOK_APP_ID",
	"NEXT_PUBLIC_FACEBOOK_PIXEL_ID",
	"NEXT_PUBLIC_GETSTREAM_API_KEY",
	"NEXT_PUBLIC_GETSTREAM_API_SECRET",
	"NEXT_PUBLIC_GETSTREAM_APP_ID",
	"NEXT_PUBLIC_GOOGLE_CLIENT_ID",
	"NEXT_PUBLIC_GOOGLE_CLIENT_SECRET",
	"NEXT_PUBLIC_GOOGLE_ANALYTICS_ID",
	"NEXT_PUBLIC_NODE_ENV",
	"NEXT_PUBLIC_POSTHOG_HOST",
	"NEXT_PUBLIC_POSTHOG_KEY",
	"NEXT_PUBLIC_TESTING",
	"NODE_ENV",
	"TESTING",
] as const;

type RequiredEnvs = (typeof requiredEnvs)[number];

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Record<RequiredEnvs, string> {
			readonly API_URL: string;
			readonly GETSTREAM_API_KEY: string;
			readonly GETSTREAM_API_SECRET: string;
			readonly NEXT_PUBLIC_API_URL: string;
			readonly NEXT_PUBLIC_FACEBOOK_APP_ID: string;
			readonly NEXT_PUBLIC_FACEBOOK_PIXEL_ID: string;
			readonly NEXT_PUBLIC_GETSTREAM_API_KEY: string;
			readonly NEXT_PUBLIC_GETSTREAM_API_SECRET: string;
			readonly NEXT_PUBLIC_GETSTREAM_APP_ID: string;
			readonly NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
			readonly NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
			readonly NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: string;
			readonly NEXT_PUBLIC_NODE_ENV: "development" | "production";
			readonly NEXT_PUBLIC_POSTHOG_HOST: string;
			readonly NEXT_PUBLIC_POSTHOG_KEY: string;
			readonly NEXT_PUBLIC_TESTING: string;
			readonly NODE_ENV: "development" | "production" | "test";
			readonly TESTING: string;
		}
	}
}

export {};
