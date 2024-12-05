import type { Channel as StreamChannel, ChannelSort } from "stream-chat"
import { RiHashtag } from "@remixicon/react"
import { StreamChat } from "stream-chat"
import React from "react"
import {
	Chat,
	Channel,
	ChannelHeader,
	MessageInput,
	MessageList,
	Thread,
	Window,
} from "stream-chat-react"

import type { UserProps } from "@/types"
import { fromSnakeCase } from "@/lib"
import { Loading } from "./loader"

interface ChannelListProps {
	currentChannel: StreamChannel
	client: StreamChat
	userId: string
	onChannelSelect: (channel: StreamChannel) => void
}

interface Props {
	user: UserProps
}

const ChannelsComponent = ({ user }: Props) => {
	const [channel, setChannel] = React.useState<StreamChannel | null>(null)
	const [client, setClient] = React.useState<StreamChat | null>(null)

	React.useEffect(() => {
		const initialize = async () => {
			try {
				const response = await fetch(`/api/get-token?userId=${user.id}`)
				const { token } = await response.json()

				const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_GETSTREAM_API_KEY)
				await client.connectUser({ id: user.id, name: user.first_name }, token)
				const channel = client.channel("messaging", "general", {
					name: "General Channel",
					members: [user.id],
				})
				await channel.watch()

				setClient(client)
				setChannel(channel)
			} catch (error) {
				console.error("Error initializing chat:", error)
			}
		}

		initialize()

		return () => {
			if (client) {
				client.disconnectUser()
			}
		}
	}, [client, user.first_name, user.id])

	if (!client || !channel) return <Loading />

	return (
		<div className="flex h-full w-full items-start">
			<Chat client={client} theme="messaging light">
				<div className="h-full w-[300px] border-r">
					<ChannelList
						currentChannel={channel}
						client={client}
						userId={user.id}
						onChannelSelect={setChannel}
					/>
				</div>
				<div className="h-full flex-1">
					{channel ? (
						<div className="h-full w-full">
							<Channel channel={channel}>
								<Window>
									<ChannelHeader />
									<MessageList />
									<MessageInput />
								</Window>
								<Thread />
							</Channel>
						</div>
					) : (
						<Loading />
					)}
				</div>
			</Chat>
		</div>
	)
}

export default ChannelsComponent

const ChannelList = ({ currentChannel, client, userId, onChannelSelect }: ChannelListProps) => {
	const [channels, setChannels] = React.useState<StreamChannel[]>([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		const fetchChannels = async () => {
			try {
				const filter = {
					type: "messaging",
					members: { $in: [userId] },
				}
				const sort: ChannelSort = [{ last_message_at: -1 }]

				const channelResult = await client.queryChannels(filter, sort, {
					watch: true,
					state: true,
				})

				setChannels(channelResult)
				setLoading(false)
			} catch (error) {
				console.error("Error fetching channels:", error)
				setLoading(false)
			}
		}

		if (client) {
			fetchChannels()
		}
	}, [client, userId])

	// const handleCreateChannel = async (channelName: string) => {
	// 	try {
	// 		const channel = client.channel("messaging", channelName, {
	// 			name: channelName,
	// 			members: [userId],
	// 		})

	// 		await channel.create()
	// 		await channel.watch()

	// 		setChannels((prevChannels) => [...prevChannels, channel])
	// 		onChannelSelect(channel)
	// 	} catch (error) {
	// 		console.error("Error creating channel:", error)
	// 	}
	// }

	if (loading) return <Loading />

	return (
		<div className="flex w-full flex-col">
			<div className="flex h-[76px] w-full items-center border-b px-5"></div>
			<div className="w-ful flex flex-col gap-2 px-5 py-3">
				{channels.map((channel) => (
					<button
						key={channel.id}
						onClick={() => onChannelSelect(channel)}
						className={`flex w-full items-center gap-2 rounded px-3 py-2 hover:bg-neutral-100 ${currentChannel.id === channel.id ? "bg-neutral-200 text-neutral-500" : "text-neutral-400"}`}>
						<div className="relative grid size-6 place-items-center capitalize">
							<RiHashtag className="size-5" />
						</div>
						{fromSnakeCase(channel.data?.name) || fromSnakeCase(channel.id)}
					</button>
				))}
			</div>
		</div>
	)
}
