import {
	RiCloseLine,
	RiLock2Line,
	RiNotification4Line,
	RiUser3Line,
	RiUserAddLine,
} from "@remixicon/react";
import { User03 } from "@untitled-ui/icons-react";
import React from "react";

import { getInitials } from "@/lib";
import { useUserStore } from "@/store/z-store";
import { TabPanel } from "../shared";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import Notification from "./notification";
import Points from "./points";
import Profile from "./profile";
import Security from "./security";

const tabs = [
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

export const AccountSettingsDrawer = () => {
	const [tab, setTab] = React.useState("profile");
	const { user } = useUserStore();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-2 rounded bg-primary-300 px-3 py-2 text-xs text-white md:w-full md:border-b md:border-b-neutral-200 md:bg-transparent md:px-2 md:py-3 md:text-sm md:text-neutral-400">
					<User03 height={19} width={19} className="hidden md:block" />
					<span>Edit Profile</span>
				</button>
			</SheetTrigger>

			<SheetContent className="flex w-[95%] flex-col gap-4 overflow-x-hidden p-4 md:max-w-xl md:p-6 lg:rounded-2xl">
				<SheetHeader className="flex flex-row items-center justify-between">
					<SheetTitle className="text-xl font-bold">Account Setting</SheetTitle>

					<SheetClose className="rounded-full bg-neutral-100 p-1.5 transition-colors hover:bg-neutral-200">
						<RiCloseLine size={18} />
					</SheetClose>
				</SheetHeader>

				{/* <div className="flex "> */}
				<div>
					<div className="h-40 w-full rounded-lg bg-gradient-to-r from-secondary-100 from-10% to-primary-200 to-100%" />

					<div className="flex gap-2.5 px-2 md:gap-4 md:px-4">
						<Avatar className="-mt-6 size-[72px] bg-primary-500 md:-mt-12 md:size-28">
							<AvatarImage src={user?.profile_image} />
							<AvatarFallback className="text-3xl font-semibold text-white md:text-5xl">
								{getInitials(`${user?.first_name} ${user?.last_name}`)}
							</AvatarFallback>
						</Avatar>
						<div className="pt-1">
							<p className="font-bold capitalize leading-tight">
								{user?.first_name} {user?.last_name}
							</p>
							<p className="text-sm text-neutral-400">{user?.email}</p>
						</div>
					</div>
				</div>

				<div className="pt-4">
					<div className="flex w-full items-center overflow-x-auto whitespace-nowrap pb-4">
						{tabs.map(({ label, name, icon: Icon }) => (
							<button
								key={name}
								onClick={() => setTab(name)}
								className={`flex h-8 items-center gap-2 rounded-md px-3 text-sm ${name === tab ? "bg-primary-100 text-primary-400" : "text-neutral-400"}`}>
								<Icon size={18} />
								<span>{label}</span>
							</button>
						))}
					</div>

					<TabPanel selected={tab} value="profile">
						<Profile />
					</TabPanel>
					<TabPanel selected={tab} value="notification">
						<Notification />
					</TabPanel>
					<TabPanel selected={tab} value="security">
						<Security />
					</TabPanel>
					<TabPanel selected={tab} value="points">
						<Points />
					</TabPanel>
				</div>
			</SheetContent>
		</Sheet>
	);
};
