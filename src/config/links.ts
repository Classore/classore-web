import {
	RiCalendar2Line,
	RiFacebookBoxLine,
	RiFacebookCircleLine,
	RiGraduationCapLine,
	RiHome8Line,
	RiInstagramLine,
	RiLayoutGridLine,
	RiLinkedinBoxLine,
	RiLinksLine,
	RiMessage3Line,
	RiSpeedUpLine,
	RiTeamLine,
	RiTrophyLine,
	RiTwitterXLine,
	RiWhatsappLine,
	RiYoutubeLine,
} from "@remixicon/react";

export const share_links = (url: string) => {
	return [
		{
			icon: RiLinksLine,
			label: "Copy referral link",
			href: url,
			action: "copy",
		},
		{
			icon: RiFacebookBoxLine,
			label: "Share to Facebook",
			href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
			action: "share",
		},
		{
			icon: RiTwitterXLine,
			label: "Share to Twitter",
			href: `https://twitter.com/intent/tweet?url=${url}`,
			action: "share",
		},
		{
			icon: RiLinkedinBoxLine,
			label: "Share to LinkedIn",
			href: `https://www.linkedin.com/shareArticle?url=${url}`,
			action: "share",
		},
		{
			icon: RiWhatsappLine,
			label: "Share on WhatsApp",
			href: `https://wa.me/${url}`,
			action: "share",
		},
	];
};

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

export const parents_dashboard_links = [
	{
		label: "main",
		links: [
			{
				name: "home",
				href: "/parents/dashboard",
				icon: RiHome8Line,
			},
			{
				name: "messages",
				href: "/parents/dashboard/messages",
				icon: RiMessage3Line,
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
			{ name: "What We Offer", href: "/#what-we-offer" },
			{ name: "Testimonials", href: "/#testimonials" },
			{ name: "FAQs", href: "/#frequently-asked-questions" },
			{ name: "Privacy Policy", href: "/privacy-policy" },
		],
	},
];

export const social_links = [
	{
		label: "Instagram",
		url: "https://instagram.com/classoreapp",
		icon: RiInstagramLine,
	},
	{
		label: "Facebook",
		url: "https://facebook.com/classoreapp",
		icon: RiFacebookCircleLine,
	},
	{ label: "X (Twitter)", url: "https://x.com/classore", icon: RiTwitterXLine },
	{
		label: "YouTube",
		url: "https://youtube.com/@Classore",
		icon: RiYoutubeLine,
	},
];
