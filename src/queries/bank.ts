import type { BankProps, HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "@/config";
import { axios } from "@/lib";

interface AddBankdto {
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

export const addDetails = async (payload: AddBankdto) => {
	return axios.post(endpoints().bank.add_details, payload).then((res) => res.data);
};
