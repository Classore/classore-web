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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface AddBankDto {
	account_number: string;
	bank_id: string;
}

export type VerifyBankDetailsParams = {
	bank_id: string;
	account_number: string;
};

export type VerifyBankDetailsResp = {
	account_number: string;
	account_name: string;
	bank: string;
};

export type PointsResp = {
	total_converted_points: number;
	total_available_points: number;
	data: Array<{
		classore_point_id: string;
		classore_point_user_id: string;
		classore_point_purpose: string;
		classore_point_verified: boolean;
		classore_point_redeemed: boolean;
		classore_point_conversion_factor: string;
		classore_point_points: number;
		classore_point_currency_value: number;
	}>;
};

export type ReferralResp = PaginatedResponse<{
	referral_id: string;
	referral_referrer_id: string;
	referral_referee_id: string;
	referral_type: string;
	referral_referee_type: string;
	referral_verified: boolean;
	referral_redeemed: boolean;
	referral_referral_code: string;
	referral_points: number;
	user_first_name: string;
	user_last_name: string;
	user_email: string;
	user_profile_image: string;
}>;

// ─── Get Banks ──────────────────────────────────────────────────────────────
const getBanks = async (params?: PaginationProps & { search?: string }) => {
	return axios
		.get<HttpResponse<PaginatedResponse<BankProps>>>(endpoints().bank.get_banks, {
			params: { page: 1, limit: 200, ...params },
		})
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

// ─── Verify Bank Details ───────────────────────────────────────────────────
const verifyBankDetails = async (params: VerifyBankDetailsParams) => {
	return axios
		.get<HttpResponse<VerifyBankDetailsResp>>(endpoints().bank.verify_bank_details, {
			params,
		})
		.then((res) => res.data);
};

export const useVerifyBankDetails = () => {
	return useMutation({
		mutationFn: verifyBankDetails,
		mutationKey: ["verify-bank-details"],
	});
};

// ─── Get Account Details ───────────────────────────────────────────────────
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

// ─── Add Account Details ───────────────────────────────────────────────────
const addAccountDetails = async (payload: AddBankDto) => {
	return axios
		.post<HttpResponse<AccountDetailsProps>>(endpoints().bank.add_account_details, payload)
		.then((res) => res.data);
};

export const useAddAccountDetails = (
	onSuccess?: (data: HttpResponse<AccountDetailsProps>) => void,
	onError?: (error: HttpError) => void,
	onSettled?: () => void
) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addAccountDetails,
		onSuccess: (data) => {
			toast.success("Bank details saved successfully");
			queryClient.invalidateQueries({ queryKey: ["account-details"] });
			onSuccess?.(data);
		},
		onError: (err: HttpError) => {
			toast.error(err.response?.data?.message || "Failed to save bank details");
			onError?.(err);
		},
		onSettled,
	});
};

// ─── Get Withdrawal History ────────────────────────────────────────────────
export interface GetWithdrawalHistoryPayload extends PaginationProps {
	txn_status?: "PENDING" | "SUCCESSFUL" | "FAILED" | (string & {});
}

const getWithdrawalHistory = async (params?: GetWithdrawalHistoryPayload) => {
	return axios
		.get<HttpResponse<PaginatedResponse<WithdrawalHistoryProps>>>(
			endpoints().bank.get_withdrawal_history,
			{ params }
		)
		.then((res) => res.data);
};

export const useGetWithdrawalHistory = (params?: GetWithdrawalHistoryPayload) => {
	return useQuery({
		queryKey: ["withdrawal-history", { params }],
		queryFn: () => getWithdrawalHistory(params),
		select: (data) => data.data,
	});
};

// ─── Make Withdrawal Request ───────────────────────────────────────────────
export type MakeWithdrawalPayload = {
	amount: number;
};

const makeWithdrawal = async (payload: MakeWithdrawalPayload) => {
	return axios
		.post<HttpResponse<unknown>>(endpoints().bank.request_withdrawal, payload)
		.then((res) => res.data);
};

export const useMakeWithdrawal = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: makeWithdrawal,
		mutationKey: ["make-withdrawal"],
		onSuccess: () => {
			toast.success("Withdrawal request submitted successfully");
			queryClient.invalidateQueries({ queryKey: ["withdrawal-history"] });
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "Failed to request withdrawal");
		},
	});
};

// ─── Get Referral Points ───────────────────────────────────────────────────
const getPoints = async () => {
	return axios
		.get<HttpResponse<PointsResp>>(endpoints().bank.get_points)
		.then((res) => res.data);
};

export const useGetReferralPoints = () => {
	return useQuery({
		queryKey: ["classore-points"],
		queryFn: getPoints,
		select: (data) => data.data,
	});
};

// ─── Redeem Points ─────────────────────────────────────────────────────────
type RedeemPointsResponse = {
	total: number;
	total_points: number;
};

const redeemPoints = async () => {
	return axios
		.put<HttpResponse<RedeemPointsResponse>>(endpoints().bank.redeem_points)
		.then((res) => res.data);
};

export const useRedeemPoints = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: redeemPoints,
		mutationKey: ["redeem-points"],
		onSuccess: () => {
			toast.success("Points redeemed successfully to your wallet!");
			queryClient.invalidateQueries({ queryKey: ["classore-points"] });
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		},
		onError: (error: any) => {
			toast.error(error?.response?.data?.message || "Failed to redeem points");
		},
	});
};

// ─── Get Referrals ─────────────────────────────────────────────────────────
const getReferrals = async () => {
	return axios
		.get<HttpResponse<ReferralResp>>(endpoints().bank.get_referrals)
		.then((res) => res.data);
};

export const useGetReferrals = () => {
	return useQuery({
		queryKey: ["referrals"],
		queryFn: getReferrals,
		select: (data) => data.data,
	});
};
