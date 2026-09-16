import { ModalArt } from "@/assets/illustrations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { dashboard_links } from "@/config";
import { getInitials, normalize } from "@/lib";
import { useUserStore } from "@/store/z-store";
import { RiMenu3Fill } from "@remixicon/react";
import { User03, XClose } from "@untitled-ui/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { LogoutModal, StreakProgressModal } from "../modals";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { useGetProfile } from "@/queries/student";

/**
 * MobileAppbar component renders a responsive app bar for mobile devices.
 * It includes a logo, a menu trigger button, and a user avatar with details.
 * The menu is displayed in a sheet with navigational links, utilizing the
 * dashboard_links configuration. The component also checks the current route
 * to highlight the active link. The user's avatar and information are fetched
 * from the user store.
 */
export const MobileAppbar = () => {
	const router = useRouter();
	const isOnRoute = (href: string) => normalize(router.pathname) === href;

	const { user } = useUserStore();
	const { data: profile } = useGetProfile();
	const [streakModalOpen, setStreakModalOpen] = React.useState(false);
	const streakCount = profile?.current_streak ?? profile?.streak ?? 0;

	return (
		<>
			<nav className="flex w-full shrink-0 items-center justify-between border-b border-b-neutral-200 bg-white px-3 py-3 backdrop-blur-sm">
				<Image
					src="/assets/images/classore.png"
					alt="classore"
					width={141.375}
					height={30}
					className="w-28 sm:w-32"
				/>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => setStreakModalOpen(true)}
						className="flex h-8 items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 text-xs font-bold text-amber-900 transition-all active:scale-95 cursor-pointer shadow-2xs">
						<span>🔥</span>
						<span>{streakCount}d</span>
					</button>

					<Sheet>
						<SheetTrigger asChild>
							<button type="button" className="p-1.5 rounded-lg hover:bg-neutral-100">
								<RiMenu3Fill size={20} />
							</button>
						</SheetTrigger>

				<SheetContent className="modal-primary flex w-[90%] flex-col gap-4 overflow-x-hidden px-0 py-4">
					<div className="absolute -top-80 left-0 z-30">
						<ModalArt />
					</div>

					<SheetClose className="z-30 mx-4 ml-auto grid size-7 place-items-center rounded-full bg-white">
						<XClose height={18} width={18} />
					</SheetClose>

					<div className="flex w-full flex-col gap-2 p-4">
						<p className="text-xs text-neutral-500">MENU</p>
						<ul className="relative z-50 flex w-full flex-col">
							{dashboard_links.map(({ label, links }) => (
								<li
									key={label}
									className="flex w-full flex-col gap-2 border-b border-neutral-200 py-2 last:border-b-0">
									{links.map(({ href, icon: Icon, name }) => (
										<Link
											key={name}
											href={href}
											className={`flex items-center gap-2 rounded px-3 py-2 text-sm capitalize ${isOnRoute(href) ? "border border-primary-500 font-bold text-primary-500 shadow-primary transition-all" : "font-medium text-neutral-400 transition-all hover:bg-primary-300/10 hover:text-primary-500"}`}>
											<Icon className="size-5" />
											<span>{name}</span>
										</Link>
									))}
								</li>
							))}

							<li>
								<LogoutModal />
							</li>
						</ul>
					</div>

					<div className="mt-auto flex w-full items-center justify-between gap-2 rounded-md bg-neutral-50 px-2 py-3">
						<div className="flex items-center gap-2">
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

						<Link
							href="/dashboard/settings"
							className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 shadow-2xs">
							<User03 height={15} width={15} />
							<span>Edit Profile</span>
						</Link>
					</div>
				</SheetContent>
			</Sheet>
				</div>
		</nav>
		<StreakProgressModal open={streakModalOpen} setOpen={setStreakModalOpen} />
	</>
	);
};
