import { format } from "date-fns"
import Image from "next/image"
import React from "react"
import {
	RiAiGenerate,
	RiAtLine,
	RiCheckDoubleLine,
	RiEmotionHappyLine,
	RiHashtag,
	RiImageAddLine,
	RiLock2Line,
	RiMore2Line,
	RiSendPlaneLine,
} from "@remixicon/react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LockGraphic } from "@/assets/icons/lock-graphic"
import { DashboardLayout } from "@/components/layouts"
import { Button } from "@/components/ui/button"
import { getContrastingColor } from "@/lib"
import type { ChannelProps } from "@/types"
import { Seo } from "@/components/shared"

import { community } from "@/mock"

const Page = () => {
	const [current, setCurrent] = React.useState("")

	const chat_actions = [
		{ label: "tag-user", icon: RiAtLine, action: () => {} },
		{ label: "add-emoji", icon: RiEmotionHappyLine, action: () => {} },
		{ label: "add-image", icon: RiImageAddLine, action: () => {} },
		{ label: "send-message", icon: RiSendPlaneLine, action: () => {} },
	]

	const getIcon = (channel: ChannelProps) => {
		if (channel.isGeneral) return RiAiGenerate
		else if (channel.locked) return RiLock2Line
		else return RiHashtag
	}

	const categorized = React.useMemo(() => {
		const general = community.channels.filter((channel) => channel.isGeneral)
		const unlocked = community.channels.filter((channel) => !channel.isGeneral && !channel.locked)
		const locked = community.channels.filter((channel) => channel.locked)

		return [
			{ label: "", channels: general },
			{ label: "for you", channels: unlocked },
			{ label: "locked", channels: locked },
		]
	}, [])

	const channel = React.useMemo(() => {
		return community.channels.find((channel) => channel.id === current)
	}, [current])

	return (
		<>
			<Seo title="Community Forum" />
			<DashboardLayout>
				<div className="flex h-[calc(100vh-96px)] w-full items-start border-t bg-white">
					<div className="h-full w-[300px] border-r">
						<div className="flex h-[76px] w-full items-center border-b px-5">
							<h4 className="text-xl font-medium">{community.name}</h4>
						</div>
						<div className="flex w-full flex-1 flex-col overflow-y-auto px-5">
							{categorized.map(({ channels, label }, index) => (
								<div key={index} className="flex w-full flex-col py-3">
									<p
										className={`font-neutral-400 px-5 py-2 text-xs uppercase text-neutral-400 ${!label ? "hidden" : "block"}`}>
										{label}
									</p>
									<div className="flex w-full flex-col gap-2">
										{channels.map((channel) => (
											<button
												key={channel.id}
												onClick={() => setCurrent(channel.id)}
												className={`flex w-full items-center justify-start gap-2 rounded-md px-3 py-2 text-sm text-neutral-500 transition-colors duration-500 ${current === channel.id ? "bg-neutral-200" : "hover:bg-neutral-100"}`}>
												{React.createElement(getIcon(channel), { className: "size-5" })}
												{channel.name}
											</button>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="h-full flex-1">
						<div className="flex h-[76px] w-full items-center justify-between border-b px-8 py-[18px]">
							{channel && (
								<div className="flex items-center gap-2">
									<div
										style={{ background: channel.color }}
										className="grid size-10 place-items-center rounded-md">
										{React.createElement(getIcon(channel), {
											className: "size-5",
											style: { color: getContrastingColor(channel.color) },
										})}
									</div>
									<div className="flex flex-col gap-1">
										<h5 className="font-medium">{channel.name}</h5>
										<p className="text-xs font-medium text-neutral-400">{channel.participants.length}</p>
									</div>
								</div>
							)}
							<Popover>
								<PopoverTrigger asChild>
									<button
										className={`size-8 place-items-center rounded-md bg-neutral-200 ${!channel ? "hidden" : "grid"}`}>
										<RiMore2Line />
									</button>
								</PopoverTrigger>
								<PopoverContent className="w-[180px]"></PopoverContent>
							</Popover>
						</div>
						<div className="h-[calc(100vh-174px)] flex-1">
							{!channel ? (
								<div className="flex h-full flex-1 items-center justify-center">
									<div className="flex flex-col items-center justify-center gap-2">
										<h4 className="text-2xl font-medium">Welcome to {community.name}</h4>
										<p className="text-neutral-500">Select a channel to get started</p>
									</div>
								</div>
							) : (
								<div className="h-full w-full flex-1">
									{channel.locked ? (
										<div className="grid h-full flex-1 place-items-center bg-white/80 backdrop-blur backdrop-filter">
											<div className="flex max-w-[400px] flex-col gap-6">
												<LockGraphic />
												<h4 className="text-xl font-bold">
													This channel is locked because you didn&apos;t enroll for the subject
												</h4>
												<Button>Enroll Now</Button>
											</div>
										</div>
									) : (
										<div className="flex h-full w-full flex-col">
											<div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto bg-neutral-100 px-6">
												{channel.messages.map((message) => (
													<div
														key={message.id}
														className={`flex items-start gap-2 first:mt-6 last:mb-6 ${message.userId === "you" ? "flex-row-reverse" : "flex-row"}`}>
														<div className="relative size-10 rounded-md">
															<Image
																src={
																	"https://images.unsplash.com/photo-1485893086445-ed75865251e0?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
																}
																alt={message.userId}
																fill
																sizes="(max-width:1024px)100%"
																className="rounded-md"
															/>
														</div>
														<div
															className={`flex max-w-[400px] flex-col gap-2 rounded-md bg-white p-3 ${message.userId === "you" ? "items-end" : ""}`}>
															<div className="w-fit rounded-full bg-neutral-200 px-2 py-1 text-xs font-bold capitalize text-neutral-500">
																{message.userId === "you" ? "You" : message.userId}
															</div>
															<div className="w-full text-sm text-neutral-500">
																{message.type === "text" ? <p>{message.content}</p> : <p>Media</p>}
															</div>
															<div className="flex w-full items-center justify-end gap-1 text-sm">
																<span className="text-xs text-neutral-400">
																	{format(message.timestamp, "hh:mm a")}
																</span>
																<RiCheckDoubleLine className="size-4 text-primary-500" />
															</div>
														</div>
													</div>
												))}
											</div>
											<div className="flex max-h-[208px] min-h-[108px] w-full items-center bg-white p-8">
												<div className="flex h-full w-full items-center gap-10 rounded-lg bg-neutral-200 px-6 py-3 placeholder:text-neutral-500 focus:border-none">
													<div className="h-full flex-1">
														<textarea
															className="h-full w-full resize-none border-none bg-transparent text-sm outline-none"
															placeholder="Type message here"></textarea>
													</div>
													<div className="flex items-center gap-4">
														{chat_actions.map(({ action, icon }, index) => (
															<button key={index} onClick={action}>
																{React.createElement(icon, { className: "size-6 text-neutral-500" })}
															</button>
														))}
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
