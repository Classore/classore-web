import React from "react";
import {
	RiAiGenerate,
	RiHashtag,
	RiLoaderLine,
	RiMore2Line,
	RiVolumeUpLine,
} from "@remixicon/react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetInfiniteMessages, useGetRoom } from "@/queries/message";
import { DashboardLayout } from "@/components/layouts";
import { MessageItem } from "@/components/message";
import { Seo } from "@/components/shared";

const Page = () => {
	const [roomId, setRoomId] = React.useState("");
	const [open, setOpen] = React.useState(false);

	const { data: room } = useGetRoom(roomId);

	const { data: messages, isFetchingNextPage } = useGetInfiniteMessages({ roomId });
	messages?.pages.map((page) =>
		page.data.map((message) => <MessageItem key={message.id} message={message} />)
	);

	return (
		<>
			<Seo title="Community Forum" />
			<DashboardLayout className="px-0 py-0 lg:px-0 lg:py-0">
				<div className="grid h-full w-full grid-cols-1 lg:grid-cols-4">
					<div className="hidden flex-col border-r border-neutral-200 lg:flex">
						<div className="h-[76px] w-full border-b border-neutral-200">
							<p className="font-medium lg:text-xl"></p>
						</div>
						<div className="h-[calc(100%-76px)] w-full">
							<div className="flex h-16 w-full items-center px-5">
								<button
									onClick={() => setRoomId("")}
									className="flex h-10 w-full items-center justify-between rounded-md px-3 text-sm font-medium text-neutral-400 hover:bg-neutral-200">
									<span className="flex items-center gap-x-2">
										<RiAiGenerate className="size-4" /> General Forum
									</span>
									<button>
										<RiVolumeUpLine className="size-4" />
									</button>
								</button>
							</div>
							<div className="w-full"></div>
						</div>
					</div>
					<div className="col-span-3">
						<div className="flex h-[76px] w-full items-center justify-between border-b border-neutral-200 px-8">
							<div className="flex items-center">
								<div className="rounded-lg bg-green-500 p-2 text-white">
									{!room || room?.data.name?.includes("general") ? <RiAiGenerate /> : <RiHashtag />}
								</div>
								<div>
									<p className="font-medium"></p>
									<p className="text-[10px] text-neutral-400 lg:text-xs"></p>
								</div>
							</div>
							<Popover onOpenChange={setOpen} open={open}>
								<PopoverTrigger asChild>
									<button onClick={() => setOpen(true)}>
										<RiMore2Line className="size-5 text-neutral-400" />
									</button>
								</PopoverTrigger>
								<PopoverContent></PopoverContent>
							</Popover>
						</div>
						{!roomId ? (
							<div className="grid h-[calc(100%-76px)] w-full place-items-center">
								<p className="text-center text-sm text-neutral-400">Select a room to start chatting</p>
							</div>
						) : (
							<div className="flex h-[calc(100%-76px)] w-full flex-col gap-y-4">
								{messages?.pages.map((page) =>
									page.data.map((message) => <MessageItem key={message.id} message={message} />)
								)}

								{isFetchingNextPage && (
									<div className="flex w-full items-center justify-center">
										<RiLoaderLine />
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
