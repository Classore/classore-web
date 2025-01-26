import {
	RiCalendar2Line,
	RiFacebookCircleLine,
	RiGraduationCapLine,
	RiHome8Line,
	RiInstagramLine,
	RiLayoutGridLine,
	RiMessage3Line,
	RiSpeedUpLine,
	RiTeamLine,
	RiTrophyLine,
	RiTwitterXLine,
	RiYoutubeLine,
} from "@remixicon/react";

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
];

export const footer_links = [
	{
		label: "1",
		links: [
			{ name: "For Students", href: "/" },
			{ name: "For Parents", href: "/" },
			{ name: "For Agents", href: "/" },
		],
	},
	{
		label: "2",
		links: [
			{ name: "What We Offer", href: "/what-we-offer" },
			{ name: "Testimomnials", href: "/testimonials" },
			{ name: "FAQs", href: "/frequently-asked-questions" },
		],
	},
];

export const social_links = [
	{ label: "Instagram", url: "https://instagram.com/classoreapp", icon: RiInstagramLine },
	{
		label: "Facebook",
		url: "https://facebook.com/classoreapp",
		icon: RiFacebookCircleLine,
	},
	{ label: "X (Twitter)", url: "https://x.com/classore", icon: RiTwitterXLine },
	{ label: "YouTube", url: "https://youtube.com/@Classore", icon: RiYoutubeLine },
];
