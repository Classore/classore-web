import { User03 } from "@untitled-ui/icons-react";
import React from "react";
import {
	RiCloseLine,
	RiLock2Line,
	RiNotification4Line,
	RiUser3Line,
	RiUserAddLine,
} from "@remixicon/react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserStore } from "@/store/z-store";
import Notification from "./notification";
import { TabPanel } from "../shared";
import { getInitials } from "@/lib";
import Security from "./security";
import Profile from "./profile";
import Points from "./points";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

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
					className="flex w-full items-center gap-2 border-b border-b-neutral-200 px-2 py-3 text-sm text-neutral-400">
					<User03 height={19} width={19} />
					<span>Edit profile</span>
				</button>
			</SheetTrigger>

			<SheetContent className="flex flex-col gap-4 rounded-2xl sm:max-w-xl md:w-3/5">
				<SheetHeader className="flex flex-row items-center justify-between">
					<SheetTitle className="text-xl font-bold">Account Setting</SheetTitle>

					<SheetClose className="rounded-full bg-neutral-100 p-1.5 transition-colors hover:bg-neutral-200">
						<RiCloseLine size={18} />
					</SheetClose>
				</SheetHeader>

				{/* <div className="flex "> */}
				<div>
					<div className="h-40 w-full rounded-lg bg-gradient-to-r from-secondary-100 from-10% to-primary-200 to-100%" />

					<div className="flex gap-4 px-4">
						<Avatar className="-mt-12 size-28 bg-primary-500">
							<AvatarImage src={user?.profile_image} />
							<AvatarFallback className="text-5xl font-semibold text-white">
								{getInitials(`${user?.first_name} ${user?.last_name}`)}
							</AvatarFallback>
						</Avatar>
						<div className="pt-1">
							<p className="font-bold capitalize">
								{user?.first_name} {user?.last_name}
							</p>
							<p className="text-sm text-neutral-400">{user?.email}</p>
						</div>
					</div>
				</div>

				<div className="pt-4">
					<div className="flex w-full items-center pb-4">
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
