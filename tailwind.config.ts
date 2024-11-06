/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss"

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			screens: {
				"2xl": "1200px",
			},
		},
		fontFamily: {
			body: ["var(--body)"],
			heading: ["var(--heading)"],
		},
		extend: {
			backgroundImage: {
				squiggly: "url('/assets/images/squiggly.png')",
			},
			colors: {
				primary: "#6f42c1",
				secondary: "#f67f36",
				neutral: {
					0: "#ffffff",
					100: "#f6f8fa",
					200: "#e2e4e9",
					300: "#cdd0d5",
					400: "#868c98",
					500: "#525866",
					600: "#3c4353",
					700: "#20232d",
					800: "#14161a",
					900: "#0a0d14",
				},
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}

export default config
