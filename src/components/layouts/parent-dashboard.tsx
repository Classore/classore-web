import { RiUserAddLine } from "@remixicon/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import meeting from "@/assets/illustrations/meeting.svg";
import { useGetParentHome } from "@/queries/parent";
import { parents_dashboard_links } from "@/config";
import { WardItem } from "../dashboard/ward-item";
import { ReviewToast } from "../dashboard/review";
import { MobileAppbar } from "./mobile-appbar";
import { useUserStore } from "@/store/z-store";
import { cn, normalize } from "@/lib";
import { useInterval } from "@/hooks";
import { Invite } from "../invite";
import { Appbar } from "./appbar";
import { Seo } from "../shared";

type DashboardLayoutProps = {
	children: React.ReactNode;
	className?: string;
	title?: string;
};

export function ParentDashboardLayout({ children, className, title }: DashboardLayoutProps) {
	const [open, setOpen] = React.useState(false);
	const { user } = useUserStore();
	const router = useRouter();

	const isOnRoute = (href: string) => normalize(router.pathname, 3) === href;

	const { data: parentHome } = useGetParentHome();

	React.useEffect(() => {
		if (user && user.user_type === "STUDENT") {
			router.push("/parent/dashboard");
		}
	}, [router, user]);

	useInterval(
		() => {
			setOpen(true);
		},
		100 * 60 * 60 * 3
	);

	return (
		<>
			<Seo title={title} />
			<main className="hidden overflow-hidden lg:flex lg:h-screen lg:w-screen lg:items-center lg:bg-white">
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
								{parents_dashboard_links.map(({ label, links }) => (
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
						{/* WARDS */}
						<div className="w-full space-y-4 border-t px-6 py-5">
							<div className="flex w-full items-center justify-between">
								<p className="text-sm text-neutral-400">My Wards</p>
								<button className="grid size-6 place-items-center rounded-md bg-neutral-200">
									<RiUserAddLine className="size-4" />
								</button>
							</div>
							<div className="w-full space-y-2">
								{parentHome?.my_wards.map((ward) => <WardItem key={ward.id} ward={ward} />)}
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
				<section className="flex h-screen max-w-[calc(100vw-256px)] flex-1 flex-col bg-[#F6F8FA]">
					<Appbar />
					<div
						className={cn(
							"flex h-[calc(100vh-80px)] w-full flex-col gap-6 overflow-y-auto bg-[#F6F8FA] px-3 py-6 md:px-8",
							className
						)}>
						{children}
					</div>
				</section>
			</main>

			{/* MOBILE NAVBAR */}
			<main className="w-full bg-[#F6F8FA] lg:hidden">
				<MobileAppbar />
				<section
					className={cn(
						"flex h-full w-full flex-col gap-6 overflow-y-auto bg-[#F6F8FA] px-3 py-6 md:px-8",
						className
					)}>
					{children}
				</section>
			</main>
			<ReviewToast isOpen={open} onOpenChange={setOpen} />
		</>
	);
}
