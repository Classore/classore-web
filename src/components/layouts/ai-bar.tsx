import { RiArrowDropDownLine, RiArrowLeftLine, RiNotificationLine } from "@remixicon/react";
import Image from "next/image";
import { useRouter } from "next/router";

import classoreai from "@/assets/illustrations/ai.svg";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountSettingsDrawer } from "../settings/account-settings-drawer";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/z-store";
import { LogoutModal } from "../modals";
import { getInitials } from "@/lib";

export const AIBar = () => {
	const router = useRouter();
	const { user } = useUserStore();

	return (
		<>
			<nav className="flex h-20 w-full items-center justify-between border-b border-b-white bg-[#E5D7FF]/5 px-8 py-6 backdrop-blur-sm">
				<div className="flex items-center gap-x-3">
					<button
						onClick={() => router.back()}
						type="button"
						className="relative z-50 flex items-center gap-1 self-start rounded-full bg-neutral-100 px-3 py-2">
						<RiArrowLeftLine className="size-4" />
						<span className="text-sm text-neutral-700">Back</span>
					</button>
					<h1 className="text-xl font-medium text-neutral-900">Classore AI</h1>
				</div>
				<div className="flex w-1/2 items-center gap-x-2">
					<Image src={classoreai} alt="classoreai" width="36" height="36" />
					<h1 className="text-2xl font-medium -tracking-[0.03em] text-neutral-900">My AI Tutor</h1>
				</div>
				<div className="flex w-fit items-center gap-x-3">
					<Popover>
						<PopoverTrigger asChild>
							<Button className="size-10 rounded-full" size="icon" variant="outline">
								<RiNotificationLine className="text-neutral-900" size={24} />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="mr-32 w-[400px] p-4"></PopoverContent>
					</Popover>
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
