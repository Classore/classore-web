import { Copy03, MessageChatCircle, Share07 } from "@untitled-ui/icons-react"
import Image from "next/image"
import React from "react"

import { arrow, learn } from "@/assets/illustrations"
import { Appbar, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/waitlist"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

const Page = () => {
	const [open, setOpen] = React.useState(false)

	const footers = [
		{ label: "Copy link", icon: Copy03, action: () => {} },
		{ label: "Invite friends", icon: Share07, action: () => {} },
		{ label: "Contact us", icon: MessageChatCircle, action: () => {} },
	]

	return (
		<>
			<Seo title="Join the Classore waitlist" />
			<div className="bg-squiggly bg-right-bottom bg-no-repeat lg:h-screen">
				<Appbar />
				<main className="container mx-auto h-auto lg:h-[calc(100vh-187px)]">
					<div className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
						<div className="flex h-full w-full flex-col justify-center gap-3">
							<div className="flex w-fit items-center gap-1 rounded-3xl border-white bg-white/60 px-5 py-3">
								<p className="text-sm">Join over 2500 learners today</p>
								<div className="flex items-center">
									{[...Array(4)].map((_, index) => (
										<div
											key={index}
											style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}
											className={`relative size-6 rounded-full border-2 border-white ${index > 0 ? "-ml-1" : ""}`}>
											<Image
												src={`/assets/images/avatar-${index}.png`}
												alt={`avatar ${index}`}
												fill
												sizes="(max-width:1024px)100%"
												className="rounded-full"
											/>
										</div>
									))}
								</div>
							</div>
							<div className="flex flex-col gap-3">
								<div className="flex flex-wrap items-center">
									<h1 className="text-7xl font-semibold leading-[82px]">Learn Anywhere, Anytime with</h1>
									<h1 className="text-7xl font-semibold leading-[82px] text-secondary">Classore</h1>
									<Image src={arrow} alt="arrow" width={82} height={61} className="ml-8" />
								</div>
								<p className="w-[381px] text-xl text-neutral-500">
									Learning made easy and fun - don&apos;t miss early access to a new way of learning
								</p>
								<Dialog open={open} onOpenChange={setOpen}>
									<DialogTrigger asChild>
										<Button className="w-fit" size="lg" onClick={() => setOpen(true)}>
											Click here to join waitlist
										</Button>
									</DialogTrigger>
									<DialogContent className="w-[500px] p-4">
										<DialogTitle hidden>Join the waitlist</DialogTitle>
										<DialogDescription hidden>Join the waitlist</DialogDescription>
										<Modal onClose={() => setOpen(false)} />
									</DialogContent>
								</Dialog>
							</div>
						</div>
						<div className="grid h-full w-full place-items-center">
							<div className="relative aspect-[0.97/1] w-full lg:w-4/5">
								<Image
									src={learn}
									alt="learn illustration"
									fill
									sizes="(max-width: 1200px) 100%"
									className="object-cover"
								/>
							</div>
						</div>
					</div>
					<div className="grid h-[95px] w-full grid-cols-2">
						<div className="flex h-full w-full items-center gap-2">
							{footers.map(({ action, icon: Icon, label }, index) => (
								<button
									key={index}
									onClick={action}
									className="flex items-center gap-1 rounded-xl bg-white px-4 py-2">
									<Icon className="size-5" /> {label}
								</button>
							))}
						</div>
						<div></div>
					</div>
				</main>
			</div>
		</>
	)
}

export default Page
