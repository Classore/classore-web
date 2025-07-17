import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import meeting from "@/assets/illustrations/meeting.svg";
import { CompleteKyc } from "../dashboard/complete-kyc";
import { ReviewToast } from "../dashboard/review";
import { MobileAppbar } from "./mobile-appbar";
import { useUserStore } from "@/store/z-store";
import { dashboard_links } from "@/config";
import { cn, normalize } from "@/lib";
import { useInterval } from "@/hooks";
import { Invite } from "../invite";
import { KYC } from "../dashboard";
import { Appbar } from "./appbar";
import { AIBar } from "./ai-bar";
import { AiMobileAppbar } from "./mobile-ai-bar";

type AILayoutProps = {
	children: React.ReactNode;
	className?: string;
};

export function AILayout({ children, className }: AILayoutProps) {
	const [openReview, setOpenReview] = React.useState(false);
	const [openSheet, setOpensheet] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const { user } = useUserStore();
	const router = useRouter();

	const isOnRoute = (href: string) => normalize(router.pathname) === href;

	React.useEffect(() => {
		if (user && user.user_type === "PARENT") {
			router.push("/parent/dashboard");
		}
	}, [router, user]);

	React.useEffect(() => {
		if (user && user.user_type === "STUDENT") {
			if (!user.birthday) {
				setOpensheet(true);
			} else if (!user.parent) {
				const today = new Date();
				const age = today.getFullYear() - new Date(user.birthday).getFullYear();
				if (age < 18) {
					setOpen(true);
				}
			}
		}
	}, [user]);

	useInterval(
		() => {
			setOpenReview(true);
		},
		100 * 60 * 60 * 30
	);

	return (
		<>
			<KYC onOpenChange={setOpen} open={open} />
			<main className="hidden w-screen overflow-hidden lg:flex lg:h-screen lg:w-screen lg:items-center">
				<section className="flex h-screen w-full flex-col overflow-hidden">
					<AIBar />
					<div
						className={cn("flex h-[calc(100vh-80px)] w-full flex-col gap-6 overflow-y-auto", className)}>
						{children}
					</div>
				</section>
			</main>

			{/* MOBILE NAVBAR */}
			<main className="h-screen w-full lg:hidden">
				<AiMobileAppbar />
				<div
					className={cn(
						"flex h-[calc(100%-62px)] w-full flex-col gap-6 overflow-y-auto px-2 py-6 md:px-8",
						className
					)}>
					{children}
				</div>
			</main>
		</>
	);
}
