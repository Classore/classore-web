import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import type { NotificationProps } from "@/types/notification";
import { endpoints } from "@/config";
import { axios } from "@/lib";
import type { AxiosError } from "axios";
import type { ApiError } from "next/dist/server/api-utils";

export const NOTIFICATION_QUERY_KEY = ["notifications"] as const;

const getNotifications = async (
	params?: PaginationProps & { is_read?: "NO" | "YES"; search?: string }
) => {
	let queryParams: Record<string, any> | undefined = undefined;
	if (params) {
		queryParams = { ...params };
		for (const key in queryParams) {
			if (
				queryParams[key] === undefined ||
				queryParams[key] === null ||
				queryParams[key] === ""
			) {
				delete queryParams[key];
			}
		}
		if (Object.keys(queryParams).length === 0) {
			queryParams = undefined;
		}
	}

	return axios
		.get<
			HttpResponse<PaginatedResponse<NotificationProps>>
		>(endpoints().notifications.get_all, { params: queryParams })
		.then((res) => res.data);
};

export const useGetNotifications = (
	params?: PaginationProps & { is_read?: "NO" | "YES"; search?: string }
) => {
	return useQuery({
		queryKey: [...NOTIFICATION_QUERY_KEY, params],
		queryFn: () => getNotifications(params),
		staleTime: 1000 * 15,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 45, // Poll every 45s
	});
};

const clearNotifications = async () => {
	return axios.put<HttpResponse<string>>(endpoints().notifications.clear).then((res) => res.data);
};

export const useClearNotifications = (options?: {
	onError?: (error: AxiosError<ApiError, any>) => void;
	onSuccess?: (data: HttpResponse<string>) => void;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: clearNotifications,
		mutationKey: ["clear-notifications"],
		onError: options?.onError,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY });
			options?.onSuccess?.(data);
		},
	});
};
