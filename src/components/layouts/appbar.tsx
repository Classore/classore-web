import { RiArrowDropDownLine } from "@remixicon/react";
import Image from "next/image";
import * as React from "react";

import { User03 } from "@untitled-ui/icons-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppStore, PlayStore } from "../shared/app-download";
import MobileAppImg from "@/assets/images/mobile-img.webp";
import { Separator } from "@/components/ui/separator";
import { ClaimPoints } from "../home/claim-points";
import { NotificationPopover } from "../notifications";
import { useUserStore } from "@/store/z-store";
import { Search } from "@/components/shared";
import { LogoutModal, StreakProgressModal } from "../modals";
import { getInitials } from "@/lib";
import { useGetProfile } from "@/queries/student";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export const Appbar = () => {
	const { user } = useUserStore();
	const { data: profile } = useGetProfile();
	const [streakModalOpen, setStreakModalOpen] = React.useState(false);
	const streakCount = profile?.current_streak ?? profile?.streak ?? 0;

	return (
		<>
			<nav className="flex h-20 w-full items-center justify-between border-b border-b-neutral-200 bg-white/75 px-8 py-6 backdrop-blur-sm">
				<Search />
				<div className="flex w-fit items-center gap-x-3">
					<button
						type="button"
						onClick={() => setStreakModalOpen(true)}
						className="flex h-10 w-fit items-center gap-x-1.5 rounded-md border border-amber-200 bg-amber-50/70 px-3 text-sm font-bold text-amber-900 transition-all duration-300 hover:bg-amber-100 active:scale-95 cursor-pointer shadow-2xs">
						<span>🔥</span>
						<span>{streakCount}d</span>
					</button>

					<Dialog>
						<DialogTrigger asChild>
							<button className="flex h-10 w-fit items-center gap-x-2 rounded-md border border-neutral-200 px-3 text-sm text-primary-700 font-medium transition-all duration-300 hover:bg-primary-50 active:scale-95">
								Download App
							</button>
						</DialogTrigger>
						<DialogContent className="md:w-[400px]">
							<div className="flex w-full flex-col gap-6">
								<DialogHeader className="space-y-1">
									<DialogTitle>Download Mobile App</DialogTitle>
									<DialogDescription>
										Download the mobile app for a seamless experience on the go.
									</DialogDescription>
								</DialogHeader>
								<div className="flex items-center justify-center">
									<Image
										src={MobileAppImg}
										alt="mobile-app"
										width={200}
										height={200}
										// fill
										// sizes='100%'
										className="object-cover"
									/>
								</div>
								<div className="flex w-full items-center gap-x-5">
									<AppStore />
									<PlayStore />
								</div>
							</div>
						</DialogContent>
					</Dialog>
					<ClaimPoints />
					<Separator orientation="vertical" className="h-11 bg-neutral-300" />
					<NotificationPopover />
					<Popover>
						<PopoverTrigger className="flex items-center gap-2">
							<Avatar className="size-10 bg-black">
								<AvatarImage src={user?.profile_image} alt={user?.first_name} />
								<AvatarFallback className="uppercase text-white">
									{getInitials(`${user?.first_name} ${user?.last_name}`)}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col items-start">
								<p className="text-sm font-medium capitalize leading-none">
									{user?.first_name} {user?.last_name}
								</p>
								<p className="text-xs text-neutral-400">{user?.email}</p>
							</div>
							<RiArrowDropDownLine size={24} />
						</PopoverTrigger>
						<PopoverContent className="w-44 rounded-xl p-2 shadow-lg border border-neutral-200 bg-white">
							<Link
								href="/dashboard/settings"
								className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors">
								<User03 height={18} width={18} className="text-neutral-500" />
								<span>Edit Profile</span>
							</Link>
							<div className="my-1 border-t border-neutral-100" />
							<LogoutModal />
						</PopoverContent>
					</Popover>
				</div>
			</nav>
			<StreakProgressModal open={streakModalOpen} setOpen={setStreakModalOpen} />
		</>
	);
};
