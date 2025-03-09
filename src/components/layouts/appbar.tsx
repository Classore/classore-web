import { RiArrowDropDownLine, RiGiftLine, RiNotificationLine } from "@remixicon/react";

import { Search } from "@/components/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib";
import { useUserStore } from "@/store/z-store";
import { LogoutModal } from "../modals";
import { AccountSettingsDrawer } from "../settings/account-settings-drawer";

export const Appbar = () => {
	const { user } = useUserStore();

	return (
		<>
			<nav className="flex h-20 w-full items-center justify-between border-b border-b-neutral-200 bg-white/75 px-8 py-6 backdrop-blur-sm">
				<Search />
				<div className="flex w-fit items-center gap-x-3">
					<Button className="w-fit" variant="outline">
						<RiGiftLine size={24} /> Claim Points
					</Button>
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
							<AccountSettingsDrawer />

							<LogoutModal />
						</PopoverContent>
					</Popover>
				</div>
			</nav>
		</>
	);
};
