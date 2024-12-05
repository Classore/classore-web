import type { RemixiconComponentType } from "@remixicon/react"
import Image from "next/image"
import React from "react"
import {
	RiCameraLine,
	RiCloseLine,
	RiLock2Line,
	RiNotification4Line,
	RiUser3Line,
	RiUserAddLine,
} from "@remixicon/react"

import Notification from "@/components/settings/notification"
import Security from "@/components/settings/security"
import Profile from "@/components/settings/profile"
import Points from "@/components/settings/points"
import { ScrollArea } from "../ui/scroll-area"
import { useFileHandler } from "@/hooks"
import { Button } from "../ui/button"
import { TabPanel } from "../shared"

interface Props {
	onClose: () => void
}

type TabNames = "profile" | "notification" | "security" | "points"

type TabList = {
	label: string
	name: TabNames
	icon: RemixiconComponentType
}

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
]

export const Settings = ({ onClose }: Props) => {
	const [current, setCurrent] = React.useState<TabNames>("profile")
	const [backgroundImage, setBackgroundImage] = React.useState("")

	const { handleClick, handleFileChange, inputRef } = useFileHandler({
		onFilesChange: (files) => {
			const file = files[0]
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
				setBackgroundImage(reader.result as string)
			}
		},
	})

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="absolute right-2 top-2 flex h-[calc(100vh-16px)] w-[600px] flex-col gap-4 rounded-lg bg-white p-4">
			<div className="flex w-full items-center justify-between">
				<h5 className="text-xl font-bold">Account Setting</h5>
				<button onClick={onClose}>
					<RiCloseLine size={18} />
				</button>
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
							<div className="relative size-[120px] rounded-full bg-primary-500"></div>
							<div className="flex min-w-36 translate-y-6 flex-col gap-1">
								<h6 className="font-bold capitalize">pablo clueless</h6>
								<h6 className="text-sm text-neutral-400">smsnmicheal@gmail.com</h6>
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
							<TabPanel selected={current} tabValue="profile">
								<Profile />
							</TabPanel>
							<TabPanel selected={current} tabValue="notification">
								<Notification />
							</TabPanel>
							<TabPanel selected={current} tabValue="security">
								<Security />
							</TabPanel>
							<TabPanel selected={current} tabValue="points">
								<Points />
							</TabPanel>
						</ScrollArea>
					</div>
				</div>
			</div>
		</div>
	)
}
