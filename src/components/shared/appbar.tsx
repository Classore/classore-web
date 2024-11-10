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
				<Link href="/" className="w-fit">
					<Image src={classore} alt="classore" width={140} height={32} />
				</Link>
				<div className="hidden items-center gap-5 lg:flex">
					<button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2" onClick={copyText}>
						<Share07 />
						Invite Friends
					</button>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<button
								className="flex items-center gap-2 rounded-xl bg-white px-4 py-2"
								onClick={() => setOpen(true)}>
								<MessageChatCircle />
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
