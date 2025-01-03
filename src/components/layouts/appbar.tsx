import { RiArrowDropDownLine, RiGiftLine, RiNotificationLine } from "@remixicon/react"
import React from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Backdrop, Search } from "@/components/shared"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/z-store"
import { Settings } from "./settings"
import { getInitials } from "@/lib"

export const Appbar = () => {
	const [open, setOpen] = React.useState(false)
	const { user } = useUserStore()

	return (
		<>
			<Backdrop open={open} onClose={() => setOpen(false)}>
				<Settings onClose={() => setOpen(false)} />
			</Backdrop>
			<nav className="flex h-24 w-full items-center justify-between border-b px-8">
				<Search />
				<div className="flex w-fit items-center gap-x-3">
					<Button className="w-fit" variant="outline">
						<RiGiftLine size={24} /> Claim Points
					</Button>
					<Separator orientation="vertical" className="h-11 bg-neutral-300" />
					<Popover>
						<PopoverTrigger asChild>
							<Button className="size-[46px] rounded-full" size="icon" variant="outline">
								<RiNotificationLine size={24} />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="mr-32 w-[400px] p-4"></PopoverContent>
					</Popover>
					<button onClick={() => setOpen(!open)} className="flex items-center gap-2">
						<Avatar className="size-[46px] bg-black">
							<AvatarImage src={user?.image} alt={user?.first_name} />
							<AvatarFallback className="text-white">
								{getInitials(`${user?.first_name} ${user?.last_name}`)}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col items-start">
							<p className="font-medium capitalize">
								{user?.first_name} {user?.last_name}
							</p>
							<p className="text-xs text-neutral-400">{user?.email}</p>
						</div>
						<RiArrowDropDownLine size={24} />
					</button>
				</div>
			</nav>
		</>
	)
}
