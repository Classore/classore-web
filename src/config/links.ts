import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import {
	RiCalendar2Line,
	RiGraduationCapLine,
	RiHome8Line,
	RiLayoutGridLine,
	RiMessage3Line,
	RiSpeedUpLine,
	RiTeamLine,
	RiTrophyLine,
} from "@remixicon/react"

export const dashboard_links = [
	{
		label: "main",
		links: [
			{
				name: "home",
				href: "/dashboard",
				icon: RiHome8Line,
			},
			{
				name: "categories",
				href: "/dashboard/categories",
				icon: RiLayoutGridLine,
			},
			{
				name: "my courses",
				href: "/dashboard/courses",
				icon: RiGraduationCapLine,
			},
		],
	},
	{
		label: "me",
		links: [
			{
				name: "messages",
				href: "/dashboard/messages",
				icon: RiMessage3Line,
			},
			{
				name: "community forum",
				href: "/dashboard/community",
				icon: RiTeamLine,
			},
			{
				name: "leaderboard",
				href: "/dashboard/leaderboard",
				icon: RiTrophyLine,
			},
		],
	},
	{
		label: "others",
		links: [
			{
				name: "calendar",
				href: "/dashboard/calendar",
				icon: RiCalendar2Line,
			},
			{
				name: "test center",
				href: "/dashboard/test-center",
				icon: RiSpeedUpLine,
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
