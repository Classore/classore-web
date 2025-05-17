import { endpoints } from "@/config";
import { axios } from "@/lib";
import type {
	AccountDetailsProps,
	BankProps,
	HttpError,
	HttpResponse,
	PaginatedResponse,
	PaginationProps,
	WithdrawalHistoryProps,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

interface AddBankDto {
	account_number: string;
	bank_id: string;
}

const getBanks = async (params?: PaginationProps & { search?: string }) => {
	return axios
		.get<HttpResponse<PaginatedResponse<BankProps>>>(endpoints().bank.get_banks, { params })
		.then((res) => res.data);
};
export const useGetBanks = (params?: PaginationProps & { search?: string }) => {
	return useQuery({
		queryKey: ["banks", { params }],
		queryFn: () => getBanks(params),
		select: (data) => data.data,
		gcTime: Infinity,
		staleTime: Infinity,
	});
};

const getAccountDetails = async () => {
	return axios
		.get<HttpResponse<AccountDetailsProps>>(endpoints().bank.get_account_details)
		.then((res) => res.data);
};
export const useGetAccountDetails = () => {
	return useQuery({
		queryKey: ["account-details"],
		queryFn: getAccountDetails,
		select: (data) => data.data,
		gcTime: Infinity,
		staleTime: Infinity,
	});
};

interface GetWithdrawalHistoryPayload extends PaginationProps {
	xn_status: "PENDING" | "SUCCESSFUL" | "FAILED";
}
const getWithdrawalHistory = async (params?: GetWithdrawalHistoryPayload) => {
	return axios
		.get<
			HttpResponse<PaginatedResponse<WithdrawalHistoryProps>>
		>(endpoints().bank.get_banks, { params })
		.then((res) => res.data);
};

export const useGetWithdrawalHistory = (params: GetWithdrawalHistoryPayload) => {
	return useQuery({
		queryKey: ["withdrawal-history"],
		queryFn: () => getWithdrawalHistory(params),
		select: (data) => data.data,
		gcTime: Infinity,
		staleTime: Infinity,
	});
};

const addAccountDetails = async (payload: AddBankDto) => {
	return axios
		.post<HttpResponse<AccountDetailsProps>>(endpoints().bank.add_account_details, payload)
		.then((res) => res.data);
};
export const useAddAccountDetails = (
	onSuccess: (data: HttpResponse<AccountDetailsProps>) => void,
	onError: (error: HttpError) => void,
	onSettled: () => void
) => {
	return useMutation({
		mutationFn: addAccountDetails,
		onSuccess,
		onError,
		onSettled,
	});
};
