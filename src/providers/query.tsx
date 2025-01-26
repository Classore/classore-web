import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { toast } from "sonner";

const staleTime = 1000 * 60; // 1 minute

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime,
			refetchOnWindowFocus: true,
			refetchOnMount: true,
			refetchOnReconnect: true,
			retry: true,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 3000),
		},
		mutations: {
			// This is a global error handler and can be can be overridden by each Mutation "onError". You can change this later to use Mutation Cache (which means this the global error will be called regardless of each Mutation onError), but for now this will do
			onError: (error) => {
				toast.error(error.response?.data.message || "Something went wrong");
			},
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onSuccess: (data: any) => {
				toast.success(data?.message);
			},
		},
	},
});

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
