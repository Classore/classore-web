import type { Socket } from "socket.io-client";

import type {
	IsTypingProps,
	MessageDeliveredProps,
	NewChatMessageProps,
	ReceiveChatMessageProps,
} from "@/types/message";

export const joinRoom = (socket: Socket, userId: string) => {
	socket.emit("join_user_rooms", { userId });
};

export const sendMessage = (socket: Socket, data: NewChatMessageProps) => {
	socket.emit("new_chat_message", data);
};

export const receiveChatMessage = (
	socket: Socket,
	callback: (data: ReceiveChatMessageProps) => void
) => {
	socket.on("receive_chat_message", callback);
};

export const isTyping = (socket: Socket, callback: (data: IsTypingProps) => void) => {
	socket.on("is_typing", callback);
};

export const messageDelivered = (
	socket: Socket,
	callback: (data: MessageDeliveredProps) => void
) => {
	socket.on("message_delivered", callback);
};
