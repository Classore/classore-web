import { ModalArt } from "@/assets/illustrations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { parents_dashboard_links } from "@/config";
import { cn, getInitials, normalize } from "@/lib";
import { useUserStore } from "@/store/z-store";
import { RiMenu3Fill, RiUserAddLine } from "@remixicon/react";
import { XClose } from "@untitled-ui/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogoutModal } from "../modals";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { WardItem } from "../dashboard/ward-item";
import meeting from "@/assets/illustrations/meeting.svg";
import { useGetParentHome } from "@/queries/parent";
import { Invite } from "../invite";
import { Seo } from "../shared";
import React from "react";

type MobileParentDashboardLayoutProps = {
	children: React.ReactNode;
	className?: string;
	title?: string;
};

export function MobileParentDashboardLayout({
	children,
	className,
	title,
}: MobileParentDashboardLayoutProps) {
	const router = useRouter();
	const isOnRoute = (href: string) => normalize(router.pathname, 3) === href;
	const { user } = useUserStore();
	const { data: parentHome } = useGetParentHome();

	React.useEffect(() => {
		if (user && user.user_type === "STUDENT") {
			router.push("/parent/dashboard");
		}
	}, [router, user]);

	return (
		<>
			<Seo title={title} />
			<div className="flex flex-col lg:hidden">
				<nav className="flex w-full items-center justify-between border-b border-b-neutral-200 bg-white/75 px-3 py-4 backdrop-blur-sm">
					<Image
						src="/assets/images/classore.png"
						alt="classore"
						width={141.375}
						height={30}
						className="w-32"
					/>

					<Sheet>
						<SheetTrigger asChild>
							<button type="button">
								<RiMenu3Fill size={20} />
							</button>
						</SheetTrigger>

						<SheetContent className="modal-primary flex w-[90%] flex-col gap-4 py-4">
							<div className="absolute -top-80 left-0 z-30">
								<ModalArt />
							</div>

							<SheetClose className="z-30 ml-auto grid size-7 place-items-center rounded-full bg-white">
								<XClose height={18} width={18} />
							</SheetClose>

							<div className="flex w-full flex-col gap-2">
								<p className="text-xs text-neutral-500">MENU</p>
								<ul className="relative z-50 flex w-full flex-col">
									{parents_dashboard_links.map(({ label, links }) => (
										<li
											key={label}
											className="flex w-full flex-col gap-2 border-b border-neutral-200 py-2 last:border-b-0">
											{links.map(({ href, icon: Icon, name }) => (
												<Link
													key={name}
													href={href}
													className={`flex items-center gap-2 rounded px-3 py-2 text-sm capitalize ${
														isOnRoute(href)
															? "border border-primary-500 font-bold text-primary-500 shadow-primary transition-all"
															: "font-medium text-neutral-400 transition-all hover:bg-primary-300/10 hover:text-primary-500"
													}`}>
													<Icon className="size-5" />
													<span>{name}</span>
												</Link>
											))}
										</li>
									))}
								</ul>
							</div>

							{/* WARDS SECTION */}
							<div className="w-full space-y-4 border-t border-neutral-200 pt-4">
								<div className="flex w-full items-center justify-between">
									<p className="text-sm text-neutral-500">My Wards</p>
									<button className="grid size-6 place-items-center rounded-md bg-neutral-200">
										<RiUserAddLine className="size-4" />
									</button>
								</div>
								<div className="w-full space-y-2">
									{parentHome?.my_wards.map((ward) => <WardItem key={ward.id} ward={ward} />)}
								</div>
							</div>

							{/* INVITE SECTION */}
							<div className="mt-4 w-full">
								<div className="relative h-[120px] w-full overflow-hidden rounded-lg border bg-gradient-to-r from-white to-secondary-100 px-3 py-4">
									<div className="absolute -bottom-4 -right-4 aspect-square w-[100px]">
										<Image
											src={meeting}
											alt="meeting"
											fill
											sizes="(max-width:1024px)100%"
											className="object-contain"
										/>
									</div>
									<div className="flex h-full w-full flex-col justify-between gap-y-2">
										<div>
											<h6 className="text-sm font-medium">Invite</h6>
											<p className="w-28 text-xs text-neutral-400">Earn 550 points from inviting a friend</p>
										</div>
										<Invite />
									</div>
								</div>
							</div>

							{/* USER PROFILE */}
							<div className="mt-auto flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-3">
								<Avatar className="size-10 bg-black">
									<AvatarImage src={user?.profile_image} alt={user?.first_name} />
									<AvatarFallback className="text-white">
										{getInitials(`${user?.first_name} ${user?.last_name}`)}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col items-start">
									<p className="text-sm font-medium capitalize leading-none">
										{user?.first_name} {user?.last_name}
									</p>
									<p className="text-xs text-neutral-400">{user?.email}</p>
								</div>
							</div>

							<LogoutModal />
						</SheetContent>
					</Sheet>
				</nav>

				<div className={cn("flex-1 overflow-y-auto bg-[#F6F8FA] p-4", className)}>{children}</div>
			</div>
		</>
	);
}
