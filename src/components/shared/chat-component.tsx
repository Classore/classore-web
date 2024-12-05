import type { Channel as StreamChannel, UserSort } from "stream-chat"
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

import type { AdminProps, UserProps } from "@/types"
import { Loading } from "./loader"

interface User {
	id: string
	name: string
}

interface UserListProps {
	client: StreamChat
	currentUserId: string
	onSelectUser: (userId: string) => void
	selectedUserId: string | null
	predefinedUsers?: AdminProps[]
}

interface Props {
	user: UserProps
}

const ChatComponent = ({ user }: Props) => {
	const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null)
	const [channel, setChannel] = React.useState<StreamChannel | null>(null)
	const [client, setClient] = React.useState<StreamChat | null>(null)

	const createDirectChannel = React.useCallback(
		async (otherUserId: string) => {
			if (!client) return

			try {
				const response = await fetch("/api/create-direct-chat", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						currentUserId: user.id,
						otherUserId,
					}),
				})

				if (!response.ok) {
					throw new Error("Failed to create direct chat")
				}

				const { channelId } = await response.json()
				const newChannel = client.channel("messaging", channelId, {
					members: [user.id, otherUserId],
				})

				await newChannel.watch()
				setChannel(newChannel)
				setSelectedUserId(otherUserId)
			} catch (error) {
				console.error("Error creating direct channel:", error)
			}
		},
		[client, user.id]
	)

	const initializeChat = React.useCallback(async () => {
		try {
			const response = await fetch(`/api/get-token?userId=${user.id}`)
			if (!response.ok) {
				throw new Error("Failed to get token")
			}

			const { token } = await response.json()
			const apiKey = process.env.NEXT_PUBLIC_GETSTREAM_API_KEY

			if (!apiKey) {
				throw new Error("Stream API key is not defined")
			}

			const newClient = StreamChat.getInstance(apiKey)
			await newClient.connectUser(
				{
					id: user.id,
					name: `User ${user.firstName}`,
				},
				token
			)

			setClient(newClient)
		} catch (error) {
			console.error("Chat initialization error:", error)
		}
	}, [user.id, user.firstName])

	React.useEffect(() => {
		initializeChat()

		return () => {
			if (client) {
				client.disconnectUser()
			}
		}
	}, [client, initializeChat])

	if (!client || !channel) return <Loading />

	return (
		<div className="flex h-full w-full items-start">
			<Chat client={client} theme="messaging light">
				<div className="h-full w-[300px] border-r">
					<UserList
						client={client}
						currentUserId={user.id}
						onSelectUser={createDirectChannel}
						selectedUserId={selectedUserId}
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

const UserList: React.FC<UserListProps> = React.memo(
	({ client, currentUserId, onSelectUser, predefinedUsers = [] }) => {
		const [users, setUsers] = React.useState<User[]>([])
		const [loading, setLoading] = React.useState(true)

		React.useEffect(() => {
			const fetchUsers = async () => {
				try {
					const filter = { id: { $ne: currentUserId } }
					const sort: UserSort = { last_active: -1 }
					const options = {
						limit: 50,
						presence: true,
					}

					const { users } = await client.queryUsers(filter, sort, options)

					const formattedUsers = users.map((user) => ({
						id: user.id,
						name: user.name || user.id,
					}))

					const formattedPredefinedUsers = predefinedUsers!.map((user) => ({
						id: user.id,
						name: user.firstName,
					}))

					const combinedUsers = [
						...formattedPredefinedUsers,
						...formattedUsers.filter(
							(fetchedUser) => !formattedPredefinedUsers.some((predefined) => predefined === fetchedUser)
						),
					]

					setUsers(combinedUsers)
				} catch (error) {
					console.error("Error fetching users:", error)
				} finally {
					setLoading(false)
				}
			}

			if (client) {
				fetchUsers()
			}
		}, [client, currentUserId, predefinedUsers])

		if (loading) return <Loading />

		return (
			<div className="flex h-full w-full flex-col gap-4 overflow-y-auto">
				<h2>Direct Messages</h2>
				<div className="flex w-full flex-col gap-2">
					{users.map((user) => (
						<li key={user.id} onClick={() => onSelectUser(user.id)} className="user-item">
							{user.name}
						</li>
					))}
				</div>
			</div>
		)
	}
)

UserList.displayName = "UserList"

export default React.memo(ChatComponent)
