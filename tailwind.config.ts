/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

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
			geist: ["var(--geist)"],
		},
		extend: {
			backgroundImage: {
				dashboard: "url('/assets/images/dashboard.png')",
				squiggly: "url('/assets/images/squiggly.png')",
				"vector-grid": "url('/assets/images/vector-grid.png')",
			},
			gridTemplateColumns: {
				fluid: "repeat(auto-fit, minmax(300px, 1fr))",
			},
			colors: {
				error: "#E33629",
				neutral: {
					"0": "#ffffff",
					"100": "#f6f8fa",
					"200": "#e2e4e9",
					"300": "#cdd0d5",
					"400": "#868c98",
					"500": "#525866",
					"600": "#3c4353",
					"700": "#20232d",
					"800": "#14161a",
					"900": "#0a0d14",
				},
				primary: {
					"50": "#F1ECF9",
					"100": "#E9E4F7",
					"200": "#D3C4EC",
					"300": "#6F42C1",
					"400": "#643BAE",
					"500": "#5A359A",
					"600": "#533291",
					"700": "#432874",
					"800": "#321E57",
					"900": "#281745",
				},
				secondary: {
					"50": "#FEF3EB",
					"100": "#FEEDE2",
					"200": "#FCD7C1",
					"300": "#F67F36",
					"400": "#DE7231",
					"500": "#C5672B",
					"600": "#B95F29",
					"700": "#944D1F",
					"800": "#6F3A17",
					"900": "#562C12",
				},
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			keyframes: {
				"caret-blink": {
					"0%,70%,100%": {
						opacity: "1",
					},
					"20%,50%": {
						opacity: "0",
					},
				},
				scale: {
					"0%, 50%, 100%": {
						scale: "1",
						opacity: "1",
					},
					"25%, 75%": {
						scale: "0.75",
						opacity: "0.5",
					},
				},
				"slide-from-bottom": {
					"0%": {
						transform: "translateY(100%)",
					},
					"100%": {
						transform: "translateY(0)",
					},
				},
				"slide-from-left": {
					"0%": {
						transform: "translateX(-100%)",
					},
					"100%": {
						transform: "translateX(0)",
					},
				},
				"slide-from-right": {
					"0%": {
						transform: "translateX(100%)",
					},
					"100%": {
						transform: "translateX(0)",
					},
				},
				"slide-from-top": {
					"0%": {
						transform: "translateY(-100%)",
					},
					"100%": {
						transform: "translateY(0)",
					},
				},
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"caret-blink": "caret-blink 1.25s ease-out infinite",
				scale: "scale 2500ms ease-in-out infinite",
				"slide-from-bottom": "slide-from-bottom 0.5s ease-out forwards",
				"slide-from-left": "slide-from-left 0.5s ease-out forwards",
				"slide-from-right": "slide-from-right 0.5s ease-out forwards",
				"slide-from-top": "slide-from-top 0.5s ease-out forwards",
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			boxShadow: {
				neomorphism: "inset 5px 5px 10px #eef0f2, inset -5px -5px 10px #f6f8fa",
				primary: "0 0 0 2px rgba(111,66,193,0.1),0px 0px 0px 3px rgba(111,66,193,0.1)",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
	],
};

export default config;
