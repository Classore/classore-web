import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import type { HttpError, HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import type { MessageProps, RoomProps } from "@/types/message";
import { endpoints } from "@/config";
import { axios } from "@/lib";

const findOrCreateRoom = async (members: string[]) => {
	return axios
		.post<HttpResponse<RoomProps>>(endpoints().message.create_room, {
			members,
		})
		.then((res) => res.data);
};
export const useCreateRoom = (members: string[]) => {
	return useMutation({
		mutationKey: ["create_room"],
		mutationFn: () => findOrCreateRoom(members),
		onSuccess: (data) => {
			toast.success(data.message);
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "An error occurred";
			toast.error(message);
		},
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

export const useGetInfiniteMessages = ({ roomId }: { roomId: string }) => {
	return useInfiniteQuery({
		queryKey: ["messages", roomId],
		queryFn: () => getMessages({ roomId, limit: 100 }),
		enabled: !!roomId,
		initialPageParam: 1,
		getNextPageParam: (lastPage: PaginatedResponse<MessageProps>, allPages: any) => {
			if (lastPage.meta.hasNextPage) {
				return allPages.length + 1;
			}
			return undefined;
		},
		getPreviousPageParam: (lastPage: PaginatedResponse<MessageProps>, allPages: any) => {
			if (lastPage.meta.hasNextPage) {
				return allPages.length - 1;
			}
			return undefined;
		},
	});
};

export { findOrCreateRoom, uploadMedia };
