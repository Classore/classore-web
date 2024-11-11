import { MessageChatCircle, Share07 } from "@untitled-ui/icons-react"
import Image from "next/image"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { classore } from "@/assets/images"
import { Contact } from "../waitlist"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

export const Appbar = () => {
	const [open, setOpen] = React.useState(false)

	const copyText = () => {
		navigator.clipboard.writeText("https://classore.com")
		toast.success("Copied!")
	}

	return (
		<nav className="container mx-auto px-4 py-[26px] lg:px-0">
			<div className="flex w-full items-center justify-between">
				<Link href="/" className="relative aspect-[4.4/1] w-[100px] lg:w-[140px]">
					<Image src={classore} alt="classore" fill sizes="(max-width:1024px)100%" />
				</Link>
				<div className="flex items-center gap-5">
					<button
						className="flex items-center gap-0.5 rounded-xl bg-white px-1 py-1 text-sm lg:gap-2 lg:px-4 lg:py-2 lg:text-base"
						onClick={copyText}>
						<Share07 className="size-4 lg:size-6" />
						Invite Friends
					</button>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<button
								className="flex items-center gap-0.5 rounded-xl bg-white px-1 py-1 text-sm lg:gap-2 lg:px-4 lg:py-2 lg:text-base"
								onClick={() => setOpen(true)}>
								<MessageChatCircle className="size-4 lg:size-6" />
								Contact Us
							</button>
						</DialogTrigger>
						<DialogContent className="w-[90%] rounded-xl p-4 lg:w-[500px]">
							<DialogTitle hidden>Get in touch</DialogTitle>
							<DialogDescription hidden>Get in touch</DialogDescription>
							<Contact onClose={() => setOpen(false)} />
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</nav>
	)
}
