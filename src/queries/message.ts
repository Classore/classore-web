import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import type { HttpError, HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import type { MessageProps, RoomProps, UserItemProps } from "@/types/message";
import { endpoints } from "@/config";
import { axios } from "@/lib";

// ── Find or Create Room ────────────────────────────────────────────────────
const findOrCreateRoom = async (members: string[]) => {
	return axios
		.post<HttpResponse<RoomProps>>(endpoints().message.create_room, { members })
		.then((res) => res.data);
};
export const useFindOrCreateRoom = ({
	onError,
	onSettled,
	onSuccess,
}: {
	onError?: (error: HttpError) => void;
	onSettled?: () => void;
	onSuccess?: (data: HttpResponse<RoomProps>) => void;
}) => {
	return useMutation({
		mutationKey: ["create_room"],
		mutationFn: findOrCreateRoom,
		onError,
		onSettled,
		onSuccess,
	});
};

// ── Get Single Room ────────────────────────────────────────────────────────
const getRoom = async (roomId: string) => {
	return axios
		.get<HttpResponse<RoomProps>>(endpoints(roomId).message.get_room)
		.then((res) => res.data);
};
export const useGetRoom = (roomId: string) => {
	return useQuery({
		queryKey: ["room", roomId],
		queryFn: () => getRoom(roomId),
		enabled: !!roomId,
		staleTime: Infinity,
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 10,
	});
};

// ── Upload Media ───────────────────────────────────────────────────────────
const uploadMedia = async (media: File[]) => {
	const formData = new FormData();
	for (let i = 0; i < media.length; i++) {
		formData.append("media", media[i]);
	}
	return axios
		.post<HttpResponse<string[]>>(endpoints().message.upload, formData)
		.then((res) => res.data);
};
export const useUploadMedia = ({
	onError,
	onSettled,
	onSuccess,
}: {
	onError?: (error: HttpError) => void;
	onSettled?: () => void;
	onSuccess?: (data: HttpResponse<string[]>) => void;
}) => {
	return useMutation({
		mutationKey: ["upload_media"],
		mutationFn: uploadMedia,
		onError,
		onSettled,
		onSuccess,
	});
};

// ── Send Message (REST) ────────────────────────────────────────────────────
// Matches mobile: POST /chat/send-message with { room, content }
// The backend reads the sender from the JWT token — no userId field needed.
const sendMessageRest = async (data: { room: string; content: string }) => {
	return axios
		.post<HttpResponse<MessageProps>>(endpoints().message.send_message, data)
		.then((res) => res.data);
};
export const useSendMessage = () => {
	return useMutation({
		mutationKey: ["send_message"],
		mutationFn: sendMessageRest,
	});
};

// ── Get Messages (infinite) ────────────────────────────────────────────────
// Response shape: { data: { data: MessageProps[], meta: { page, limit, hasNextPage, ... } } }
const getMessages = async (params: PaginationProps & { roomId: string; user_id: string }) => {
	return axios
		.get<HttpResponse<PaginatedResponse<MessageProps>>>(endpoints().message.fetch_messages, {
			params,
		})
		.then((res) => res.data.data);
};

export const useGetMessages = (params: PaginationProps & { roomId: string; user_id: string }) => {
	return useQuery({
		queryKey: ["messages", params.roomId],
		queryFn: () => getMessages(params),
		enabled: !!params.roomId && !!params.user_id,
		staleTime: Infinity,
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 10,
	});
};

export const useGetInfiniteMessages = ({
	roomId,
	user_id,
	limit = 20,
}: {
	roomId: string;
	user_id: string;
	limit?: number;
}) => {
	return useInfiniteQuery({
		queryKey: ["infinite_messages", roomId],
		queryFn: ({ pageParam }) =>
			getMessages({
				roomId,
				user_id,
				page: pageParam as number,
				limit,
			}),
		enabled: !!roomId && !!user_id,
		initialPageParam: 1,
		getNextPageParam: (lastPage: PaginatedResponse<MessageProps>) => {
			if (lastPage.meta.hasNextPage) {
				return lastPage.meta.page + 1;
			}
			return undefined;
		},
		// Keep data fresh; socket notifications will also trigger refetches
		refetchInterval: 30000,
		staleTime: 1000 * 60 * 5,
	});
};

// ── Get User Rooms ─────────────────────────────────────────────────────────
const getUserRooms = async (user_id: string) => {
	return axios
		.get<HttpResponse<RoomProps[]>>(endpoints().message.get_user_rooms, { params: { user_id } })
		.then((res) => res.data.data);
};
export const useGetUserRooms = (user_id: string) => {
	return useQuery({
		queryKey: ["user_rooms"],
		queryFn: () => getUserRooms(user_id),
		enabled: !!user_id,
		staleTime: Infinity,
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 10,
	});
};

// ── Get Forums ─────────────────────────────────────────────────────────────
const getForums = async () => {
	return axios
		.get<HttpResponse<RoomProps[]>>(endpoints().message.get_forums)
		.then((res) => res.data.data ?? []);
};
export const useGetForums = () => {
	return useQuery({
		queryKey: ["forums"],
		queryFn: getForums,
		staleTime: 30 * 1000,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 30,
	});
};

// ── Get Room Members ───────────────────────────────────────────────────────
const getRoomMembers = async (roomId: string) => {
	return axios
		.get<HttpResponse<UserItemProps[]>>(endpoints().message.fetch_room_members, {
			params: { roomId },
		})
		.then((res) => res.data.data ?? []);
};
export const useGetRoomMembers = (roomId: string | null | undefined) => {
	return useQuery({
		queryKey: ["room_members", roomId],
		queryFn: () => (roomId ? getRoomMembers(roomId) : Promise.resolve([])),
		enabled: !!roomId,
		staleTime: 60 * 1000,
	});
};

// ── Join Subject Forum ─────────────────────────────────────────────────────
const joinSubjectForum = async (subject_id: string) => {
	return axios
		.post<HttpResponse<{ message: string }>>(endpoints().message.join_subject_forum, {
			subject_id,
		})
		.then((res) => res.data);
};
export const useJoinSubjectForum = () => {
	return useMutation({
		mutationKey: ["join_subject_forum"],
		mutationFn: joinSubjectForum,
	});
};

export { findOrCreateRoom, uploadMedia };
