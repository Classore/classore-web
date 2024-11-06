export const requiredEnvs = [
	"API_URL",
	"NEXT_PUBLIC_API_URL",
	"NEXT_PUBLIC_FACEBOOK_APP_ID",
	"NEXT_PUBLIC_GOOGLE_CLIENT_ID",
	"NEXT_PUBLIC_GOOGLE_CLIENT_SECRET",
	"NEXT_PUBLIC_TESTING",
	"NODE_ENV",
	"TESTING",
] as const

type RequiredEnvs = (typeof requiredEnvs)[number]

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Record<RequiredEnvs, string> {
			readonly API_URL: string
			readonly NEXT_PUBLIC_API_URL: string
			readonly NEXT_PUBLIC_FACEBOOK_APP_ID: string
			readonly NEXT_PUBLIC_GOOGLE_CLIENT_ID: string
			readonly NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string
			readonly NODE_ENV: "development" | "production" | "test"
			readonly NEXT_PUBLIC_TESTING: "true" | "false"
			readonly TESTING: "true" | "false"
		}
	}
}

export {}
