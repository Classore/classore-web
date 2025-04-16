import { useMutation, useQuery } from "@tanstack/react-query";

import type { HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import type { NotificationProps } from "@/types/notification";
import { endpoints } from "@/config";
import { axios } from "@/lib";
import type { AxiosError } from "axios";
import type { ApiError } from "next/dist/server/api-utils";

const getNotifications = async (
	params: PaginationProps & { is_read?: "NO" | "YES"; search?: string }
) => {
	if (params) {
		for (const key in params) {
			if (!params[key as keyof typeof params] || params[key as keyof typeof params] === undefined) {
				delete params[key as keyof typeof params];
			}
		}
	}
	return axios
		.get<
			HttpResponse<PaginatedResponse<NotificationProps>>
		>(endpoints().notifications.get_all, { params })
		.then((res) => res.data);
};
export const useGetNotifications = (
	params: PaginationProps & { is_read?: "NO" | "YES"; search?: string }
) => {
	return useQuery({
		queryKey: ["notifications", params],
		queryFn: () => getNotifications(params),
		staleTime: Infinity,
		gcTime: Infinity,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 60 * 5,
	});
};

const clearNotifications = async () => {
	return axios.put<HttpResponse<string>>(endpoints().notifications.clear).then((res) => res.data);
};
export const useClearNotifications = ({
	onError,
	onSuccess,
}: {
	onError?: (error: AxiosError<ApiError, any>) => void;
	onSuccess?: (data: HttpResponse<string>) => void;
}) => {
	return useMutation({
		mutationFn: clearNotifications,
		mutationKey: ["clear-notifications"],
		onError,
		onSuccess,
	});
};
