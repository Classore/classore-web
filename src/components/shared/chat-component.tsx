import type { Channel as StreamChannel, UserSort } from "stream-chat";
import { StreamChat } from "stream-chat";
import React from "react";
import {
	Chat,
	Channel,
	ChannelHeader,
	MessageInput,
	MessageList,
	Thread,
	Window,
} from "stream-chat-react";

import type { AdminProps, UserProps } from "@/types";
import { Loading } from "./loader";

interface User {
	id: string;
	name: string;
}

interface UserListProps {
	client: StreamChat;
	currentUserId: string;
	onSelectUser: (userId: string) => void;
	selectedUserId: string | null;
	predefinedUsers?: AdminProps[];
	onStartNewChat?: () => void;
}

interface Props {
	user: UserProps;
	initialOtherUserId?: string;
}

const ChatComponent = ({ user, initialOtherUserId }: Props) => {
	const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
	const [channel, setChannel] = React.useState<StreamChannel | null>(null);
	const [client, setClient] = React.useState<StreamChat | null>(null);

	const createDirectChannel = React.useCallback(
		async (otherUserId: string) => {
			if (!client) return;

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
				});

				if (!response.ok) {
					throw new Error("Failed to create direct chat");
				}

				const { channelId } = await response.json();
				const newChannel = client.channel("messaging", channelId, {
					members: [user.id, otherUserId],
				});

				await newChannel.watch();
				setChannel(newChannel);
				setSelectedUserId(otherUserId);
			} catch (error) {
				console.error("Error creating direct channel:", error);
			}
		},
		[client, user.id]
	);

	const initializeChat = React.useCallback(async () => {
		try {
			const response = await fetch(`/api/get-token?userId=${user.id}`);
			if (!response.ok) {
				throw new Error("Failed to get token");
			}

			const { token } = await response.json();
			const apiKey = process.env.GETSTREAM_API_KEY || "p5ybpcffwqxp";

			if (!apiKey) {
				throw new Error("Stream API key is not defined");
			}

			const newClient = StreamChat.getInstance(apiKey);
			await newClient.connectUser(
				{
					id: user.id,
					name: `User ${user.first_name}`,
				},
				token
			);

			setClient(newClient);

			if (initialOtherUserId && initialOtherUserId !== "") {
				await createDirectChannel(initialOtherUserId);
			}
		} catch (error) {
			console.error("Chat initialization error:", error);
		}
	}, [user.id, user.first_name, initialOtherUserId, createDirectChannel]);

	React.useEffect(() => {
		initializeChat();

		return () => {
			if (client) {
				client.disconnectUser();
			}
		};
	}, [client, initializeChat]);

	const handleStartNewChat = React.useCallback(() => {
		console.log("open new chat");
	}, []);

	if (!client || !channel) return <Loading />;

	return (
		<div className="flex h-full w-full items-start">
			<Chat client={client} theme="messaging light">
				<div className="h-full w-[300px] border-r">
					<UserList
						client={client}
						currentUserId={user.id}
						onSelectUser={createDirectChannel}
						selectedUserId={selectedUserId}
						onStartNewChat={handleStartNewChat}
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
						<div className="h-full w-full border border-red-500"></div>
					)}
				</div>
			</Chat>
		</div>
	);
};

const UserList: React.FC<UserListProps> = React.memo(
	({ client, currentUserId, onSelectUser, onStartNewChat, predefinedUsers = [] }) => {
		const [users, setUsers] = React.useState<User[]>([]);
		const [loading, setLoading] = React.useState(true);

		React.useEffect(() => {
			const fetchUsers = async () => {
				try {
					const filter = { id: { $ne: currentUserId } };
					const sort: UserSort = { last_active: -1 };
					const options = {
						limit: 50,
						presence: true,
					};

					const { users } = await client.queryUsers(filter, sort, options);

					const formattedUsers = users.map((user) => ({
						id: user.id,
						name: user.name || user.id,
					}));

					const formattedPredefinedUsers = predefinedUsers!.map((user) => ({
						id: user.id,
						name: user.first_name,
					}));

					const combinedUsers = [
						...formattedPredefinedUsers,
						...formattedUsers.filter(
							(fetchedUser) => !formattedPredefinedUsers.some((predefined) => predefined === fetchedUser)
						),
					];

					setUsers(combinedUsers);
				} catch (error) {
					console.error("Error fetching users:", error);
				} finally {
					setLoading(false);
				}
			};

			if (client) {
				fetchUsers();
			}
		}, [client, currentUserId, predefinedUsers]);

		if (loading) return <Loading />;

		return (
			<div className="flex h-full w-full flex-col gap-4 overflow-y-auto">
				<div className="flex items-center justify-between">
					<h2>Direct Messages</h2>
					{users.length === 0 && onStartNewChat && (
						<button
							onClick={onStartNewChat}
							className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
							Start New Chat
						</button>
					)}
				</div>
				{users.length > 0 ? (
					<div className="flex w-full flex-col gap-2">
						{users.map((user) => (
							<li
								key={user.id}
								onClick={() => onSelectUser(user.id)}
								className="user-item cursor-pointer rounded p-2 hover:bg-gray-100">
								{user.name}
							</li>
						))}
					</div>
				) : (
					<p className="text-center text-gray-500">No chats available</p>
				)}
			</div>
		);
	}
);

UserList.displayName = "UserList";

export default React.memo(ChatComponent);
