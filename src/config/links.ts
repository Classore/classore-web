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
				label: "categories",
				href: "/dashboard/categories",
			},
			{
				label: "my courses",
				href: "/dashboard/my-courses",
			},
		],
	},
	{
		label: "me",
		links: [
			{
				label: "messages",
				href: "/dashboard/messages",
			},
			{
				label: "community forum",
				href: "/dashboard/community-forum",
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
