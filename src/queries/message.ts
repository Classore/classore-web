import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import type { HttpError, HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import type { MessageProps, RoomProps } from "@/types/message";
import { endpoints } from "@/config";
import { axios } from "@/lib";

// type NessageResponse = {
// 	data: MessageProps[];
// 	meta: {
// 		page: number;
// 		take: number;
// 		itemCount: number;
// 		pageCount: number;
// 		hasPreviousPage: boolean;
// 		hasNextPage: boolean;
// 	};
// };

const findOrCreateRoom = async (members: string[]) => {
	return axios
		.post<HttpResponse<RoomProps>>(endpoints().message.create_room, {
			members,
		})
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

const uploadMedia = async (media: File) => {
	const formData = new FormData();
	formData.append("nedia", media);
	return axios
		.post<HttpResponse<string>>(endpoints().message.upload, formData)
		.then((res) => res.data);
};

const getMessages = async (params: PaginationProps & { roomId: string }) => {
	return axios
		.get<
			HttpResponse<PaginatedResponse<MessageProps>>
		>(endpoints().message.fetch_messages, { params })
		.then((res) => res.data.data);
};

export const useGetMessages = (params: PaginationProps & { roomId: string }) => {
	return useQuery({
		queryKey: ["messages", params.roomId],
		queryFn: () => getMessages(params),
		enabled: !!params.roomId,
		staleTime: Infinity,
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 10,
	});
};

export const useGetInfiniteMessages = ({
	roomId,
	limit = 20,
}: {
	roomId: string;
	limit?: number;
}) => {
	return useInfiniteQuery({
		queryKey: ["infinite_messages", roomId],
		queryFn: ({ pageParam }) =>
			getMessages({
				roomId,
				page: pageParam as number,
				limit,
			}),
		enabled: !!roomId,
		initialPageParam: 1,
		getNextPageParam: (lastPage: PaginatedResponse<MessageProps>) => {
			// For loading older messages (going backwards in time)
			if (lastPage.meta.hasNextPage) {
				return lastPage.meta.page + 1;
			}
			return undefined;
		},
		getPreviousPageParam: (firstPage: PaginatedResponse<MessageProps>) => {
			// For loading newer messages (going forwards in time)
			if (firstPage.meta.page > 1) {
				return firstPage.meta.page - 1;
			}
			return undefined;
		},
		// Keep data fresh for real-time messaging
		refetchInterval: 30000, // 30 seconds
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

// Alternative implementation for bidirectional infinite scroll
export const useGetBidirectionalMessages = ({
	roomId,
	limit = 20,
	initialPage = 1,
}: {
	roomId: string;
	limit?: number;
	initialPage?: number;
}) => {
	return useInfiniteQuery({
		queryKey: ["bidirectional_messages", roomId],
		queryFn: ({ pageParam }) => {
			const page = pageParam as number;
			return getMessages({ roomId, page, limit });
		},
		enabled: !!roomId,
		initialPageParam: initialPage,
		getNextPageParam: (lastPage: PaginatedResponse<MessageProps>) => {
			if (lastPage.meta.hasNextPage) {
				return lastPage.meta.page + 1;
			}
			return undefined;
		},
		getPreviousPageParam: (firstPage: PaginatedResponse<MessageProps>) => {
			if (firstPage.meta.page > 1) {
				return firstPage.meta.page - 1;
			}
			return undefined;
		},
		maxPages: 50, // Limit memory usage
		refetchInterval: 30000,
		staleTime: 1000 * 60 * 5,
	});
};

export const useRealtimeMessages = ({
	roomId,
}: {
	roomId: string;
	onNewMessage?: (message: MessageProps) => void;
}) => {
	return useQuery({
		queryKey: ["realtime_messages", roomId],
		queryFn: () => getMessages({ roomId, page: 1, limit: 1 }),
		enabled: !!roomId,
		refetchInterval: 5000,
		refetchIntervalInBackground: true,
	});
};

const getUserRooms = async () => {
	return axios
		.get<HttpResponse<RoomProps[]>>(endpoints().message.get_user_rooms)
		.then((res) => res.data.data);
};
export const useGetUserRooms = () => {
	return useQuery({
		queryKey: ["user_rooms"],
		queryFn: () => getUserRooms(),
		staleTime: Infinity,
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 10,
	});
};

export { findOrCreateRoom, uploadMedia };
