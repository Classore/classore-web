import type { Maybe, BaseProps } from "./";

export type ChatEvent =
	| "new_chat_message"
	| "receive_chat_message"
	| "is_typing"
	| "message_delivered";

export type RoomProps = {
	id: string;
	name: string | null;
	is_group: "NO" | "YES";
	created_at: Date;
	members: UserItemProps[];
};

export type MessageProps = BaseProps & {
	content: string;
	sender: {
		id: string;
		first_name: string;
		last_name: string;
		profile_image: string;
		email: string;
		phone_number: Maybe<string>;
	};
	media: string[];
	room: string;
};

export type UserItemProps = {
	member_id: string;
	user_id: string;
	first_name: string;
	last_name: string;
	email: string;
	profile_picture: string | null;
	is_my_data: boolean;
};

export type NewChatMessageProps = {
	content: string;
	media: string[];
	roomId: string;
};

export type ReceiveChatMessageProps = {
	roomId: string;
};

export type MessageDeliveredProps = {
	roomId: string;
	messageId: string;
};

export type JoinedRoomProps = {
	userIds: string[];
};
