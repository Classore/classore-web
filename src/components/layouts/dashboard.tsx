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

type DashboardLayoutProps = {
	children: React.ReactNode;
	className?: string;
};

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
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
			<main className="hidden w-screen overflow-hidden lg:flex lg:h-screen lg:w-screen lg:items-center lg:bg-white">
				<aside className="flex h-full w-[256px] min-w-[256px] flex-col justify-between border-r border-neutral-300 py-8">
					<div className="flex w-full flex-col gap-8">
						<div className="relative h-[30px] w-[135px] px-6">
							<Image
								src="/assets/images/classore.png"
								alt="classore"
								fill
								sizes="(max-width:1024px)100%"
							/>
						</div>
						<div className="flex w-full flex-col">
							<p className="ml-6 text-xs text-neutral-500">MENU</p>
							<div className="flex w-full flex-col">
								{dashboard_links.map(({ label, links }) => (
									<div
										key={label}
										className="flex w-full flex-col gap-2 border-b border-neutral-200 px-6 py-2 last:border-b-0">
										{links.map(({ href, icon: Icon, name }) => (
											<Link
												key={name}
												href={href}
												className={`flex items-center gap-2 rounded px-3 py-2 text-sm capitalize ${isOnRoute(href) ? "border border-primary-500 font-bold text-primary-500 shadow-primary transition-all" : "font-medium text-neutral-400 transition-all hover:bg-primary-300/10 hover:text-primary-500"}`}>
												<Icon /> {name}
											</Link>
										))}
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="w-full p-4">
						<div className="relative h-[145px] w-full overflow-hidden rounded-lg border bg-gradient-to-r from-white to-secondary-100 px-3 py-4">
							<div className="absolute -bottom-4 -right-4 aspect-square w-[138px]">
								<Image
									src={meeting}
									alt="meeting"
									fill
									sizes="(max-width:1024px)100%"
									className="object-contain"
								/>
							</div>
							<div className="flex h-full w-full flex-col justify-between gap-y-4">
								<div>
									<h6 className="text-sm font-medium">Invite</h6>
									<p className="w-32 text-xs text-neutral-400">Earn 550 points from inviting a friend</p>
								</div>
								<Invite />
							</div>
						</div>
					</div>
				</aside>

				<section className="flex h-screen w-full flex-col overflow-hidden">
					<Appbar />

					<div
						className={cn(
							"flex h-[calc(100vh-80px)] w-full flex-col gap-6 overflow-y-auto px-3 pt-6 md:px-8",
							className
						)}>
						{children}
					</div>
				</section>
			</main>

			{/* MOBILE NAVBAR */}
			<main className="w-full bg-white lg:hidden">
				<MobileAppbar />
				<section
					className={cn(
						"flex h-full w-full flex-col gap-6 overflow-y-auto px-2 py-6 md:px-8",
						className
					)}>
					{children}
				</section>
			</main>
			<ReviewToast isOpen={openReview} onOpenChange={setOpenReview} />
			<CompleteKyc onOpenChange={setOpensheet} open={openSheet} />
		</>
	);
}
