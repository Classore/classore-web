import Image from "next/image"
import Link from "next/link"
import React from "react"

import { classore } from "@/assets/images"
import { Button } from "../ui/button"

const links = [
	{ label: "Claim points", href: "/claim-points" },
	{ label: "Refer a friend", href: "/refer-a-friend" },
]

export const Appbar = () => {
	return (
		<nav className="container mx-auto py-[26px]">
			<div className="flex w-full items-center justify-between">
				<Link href="/" className="w-fit">
					<Image src={classore} alt="classore" width={140} height={32} />
				</Link>
				<div className="flex items-center gap-5">
					{links.map((link) => (
						<Link
							key={link.label}
							href={link.href}
							className="text-neutral-500 transition-colors hover:text-neutral-400">
							{link.label}
						</Link>
					))}
				</div>
				<Link href="/" className="w-fit">
					<Button>Join waitlist</Button>
				</Link>
			</div>
		</nav>
	)
}
