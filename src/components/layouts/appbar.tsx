import { RiArrowDropDownLine, RiGiftLine, RiNotificationLine } from "@remixicon/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AppStore, PlayStore } from "../shared/app-download";
import { Separator } from "@/components/ui/separator";
import { SettingsDrawer } from "./settings-drawer";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/z-store";
import { Search } from "@/components/shared";
import { LogoutModal } from "../modals";
import { getInitials } from "@/lib";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export const Appbar = () => {
	const { user } = useUserStore();

	return (
		<>
			<nav className="flex h-20 w-full items-center justify-between border-b border-b-neutral-200 bg-white/75 px-8 py-6 backdrop-blur-sm">
				<Search />
				<div className="flex w-fit items-center gap-x-3">
					<Dialog>
						<DialogTrigger asChild>
							<button className="flex h-8 w-fit items-center gap-x-2 rounded-md border border-primary-400 px-3 text-sm text-primary-400 transition-all duration-300 hover:bg-primary-50 active:scale-95">
								Download App
							</button>
						</DialogTrigger>
						<DialogContent className="w-[400px]">
							<div className="w-full space-y-4">
								<div>
									<DialogTitle>Download Mobile App</DialogTitle>
									<DialogDescription>
										Download the mobile app for a seamless experience on the go.
									</DialogDescription>
								</div>
								<div className="h-[200px]"></div>
								<div className="flex w-full items-center gap-x-5">
									<AppStore />
									<PlayStore />
								</div>
							</div>
						</DialogContent>
					</Dialog>
					<button className="flex h-8 w-fit items-center gap-x-2 rounded-md border border-primary-400 px-3 text-sm text-primary-400 transition-all duration-300 hover:bg-primary-50 active:scale-95">
						<RiGiftLine size={16} /> Claim Points
					</button>
					<Separator orientation="vertical" className="h-11 bg-neutral-300" />

					<Popover>
						<PopoverTrigger asChild>
							<Button className="size-10 rounded-full" size="icon" variant="outline">
								<RiNotificationLine size={24} />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="mr-32 w-[400px] p-4"></PopoverContent>
					</Popover>

					<Popover>
						<PopoverTrigger className="flex items-center gap-2">
							<Avatar className="size-10 bg-black">
								<AvatarImage src={user?.image} alt={user?.first_name} />
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
							<RiArrowDropDownLine size={24} />
						</PopoverTrigger>

						<PopoverContent className="w-40 rounded-lg px-2">
							<SettingsDrawer />

							<LogoutModal />
						</PopoverContent>
					</Popover>
				</div>
			</nav>
		</>
	);
};
