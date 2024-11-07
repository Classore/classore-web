import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export const dashboard_links = [
	{
		label: "main",
		links: [
			{
				label: "dashboard",
				href: "/dashboard",
			},
			{
				label: "courses",
				href: "/dashboard/courses",
			},
			{
				label: "computer-based testing",
				href: "/dashboard/cbt",
			},
			{
				label: "leaderboard",
				href: "/dashboard/leaderboard",
			},
		],
	},
	{
		label: "others",
		links: [
			{
				label: "account",
				href: "/dashboard/account",
			},
			{
				label: "settings",
				href: "/dashboard/settings",
			},
		],
	},
]

export const footer_links = []

export const social_links = [
	{ label: "Facebook", url: "https://facebook.com/classoreapp", icon: Facebook },
	{ label: "Instagram", url: "https://instagram.com/classoreapp", icon: Instagram },
	{ label: "X (Twitter)", url: "https://x.com/classore", icon: Twitter },
	{ label: "YouTube", url: "https://youtube.com/@Classore", icon: Youtube },
]
