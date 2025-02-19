import type { RemixiconComponentType } from "@remixicon/react";
import {
	RiCameraLine,
	RiCloseLine,
	RiLock2Line,
	RiNotification4Line,
	RiUser3Line,
	RiUserAddLine,
} from "@remixicon/react";
import Image from "next/image";
import React from "react";

import Notification from "@/components/settings/notification";
import Points from "@/components/settings/points";
import Profile from "@/components/settings/profile";
import Security from "@/components/settings/security";
import { useFileHandler } from "@/hooks";
import { getInitials } from "@/lib";
import { useUserStore } from "@/store/z-store";
import { User03 } from "@untitled-ui/icons-react";
import { TabPanel } from "../shared";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

type TabNames = "profile" | "notification" | "security" | "points";

type TabList = {
	label: string;
	name: TabNames;
	icon: RemixiconComponentType;
};

const tabs: TabList[] = [
	{
		label: "My Profile",
		name: "profile",
		icon: RiUser3Line,
	},
	{
		label: "Notifications",
		name: "notification",
		icon: RiNotification4Line,
	},
	{
		label: "Security",
		name: "security",
		icon: RiLock2Line,
	},
	{
		label: "Points and Referral",
		name: "points",
		icon: RiUserAddLine,
	},
];

export const SettingsDrawer = () => {
	const [current, setCurrent] = React.useState<TabNames>("profile");
	const [backgroundImage, setBackgroundImage] = React.useState("");
	const { user } = useUserStore();

	const { handleClick, handleFileChange, inputRef } = useFileHandler({
		onFilesChange: (files) => {
			const file = files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setBackgroundImage(reader.result as string);
			};
		},
	});

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button
					type="button"
					className="flex w-full items-center gap-2 border-b border-b-neutral-200 px-2 py-3 text-sm text-neutral-400">
					<User03 height={19} width={19} />
					<span>Edit profile</span>
				</button>
			</SheetTrigger>

			<SheetContent className="flex w-3/5 flex-col gap-4 sm:max-w-2xl">
				<div className="flex w-full flex-row items-center justify-between">
					<SheetTitle className="text-xl font-bold">Account Setting</SheetTitle>

					<SheetClose className="rounded-full bg-neutral-100 p-1.5 transition-colors hover:bg-neutral-200">
						<RiCloseLine size={18} />
					</SheetClose>
				</div>
				<div className="flex h-[244px] w-full flex-col gap-8">
					<div className="relative w-full">
						<div className="aspect-[3.73/1] w-full rounded-lg bg-gradient-to-r from-secondary-100 from-10% to-primary-200 to-100%">
							{backgroundImage ? (
								<div className="relative h-full w-full rounded-lg">
									<Image
										src={backgroundImage}
										alt="cover"
										fill
										sizes="(max-width:1024px)100%"
										className="rounded-lg object-cover"
									/>
								</div>
							) : (
								<label htmlFor="cover" className="h-full w-full bg-transparent">
									<input
										ref={inputRef}
										onChange={handleFileChange}
										type="file"
										name="cover"
										className="hidden"
									/>
								</label>
							)}
						</div>
						<div className="-mt-[60px] flex w-full items-start justify-between px-5">
							<div className="flex items-center gap-4">
								<Avatar className="size-[120px] bg-primary-500">
									<AvatarImage src="" />
									<AvatarFallback className="text-5xl font-semibold text-white">
										{getInitials(`${user?.first_name} ${user?.last_name}`)}
									</AvatarFallback>
								</Avatar>
								<div className="flex min-w-36 translate-y-6 flex-col gap-1">
									<h6 className="font-bold capitalize">
										{user?.first_name} {user?.last_name}
									</h6>
									<h6 className="text-sm text-neutral-400">{user?.email}</h6>
								</div>
							</div>
							<Button onClick={handleClick} className="w-fit p-2 text-sm" variant="primary">
								<RiCameraLine size={24} />
								Update cover
							</Button>
						</div>
					</div>
					<div className="flex h-[calc(100vh-366px)] w-full flex-col gap-4">
						<div className="flex w-full items-center">
							{tabs.map(({ icon: Icon, label, name }) => (
								<button
									key={label}
									onClick={() => setCurrent(name)}
									className={`flex items-center justify-center gap-1 rounded-lg px-4 py-[6px] text-sm ${name === current ? "bg-primary-100 font-medium text-primary-600" : "text-neutral-400"}`}>
									<Icon size={18} /> {label}
								</button>
							))}
						</div>
						<div className="w-full overflow-hidden">
							<ScrollArea className="h-full w-full">
								<TabPanel selected={current} value="profile">
									<Profile />
								</TabPanel>
								<TabPanel selected={current} value="notification">
									<Notification />
								</TabPanel>
								<TabPanel selected={current} value="security">
									<Security />
								</TabPanel>
								<TabPanel selected={current} value="points">
									<Points />
								</TabPanel>
							</ScrollArea>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};
