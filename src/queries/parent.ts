import { useQuery } from "@tanstack/react-query";

import type { HttpResponse } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";
import type {
	ParentLeaderboard,
	ParentReferralProps,
	ParentWithdrawalProps,
	WardProps,
} from "@/types/parent";

export interface ParentHome {
	my_wards: WardProps[];
	referral_code: string;
	referral_points: {
		referral_points: number;
		monetary_value: number;
	};
	referral_history: {
		data: ParentReferralProps[];
		count: number;
	};
	withdrawal_history: {
		data: ParentWithdrawalProps[];
		count: number;
	};
}

interface GetWardResponse {
	analytic_report: {
		my_leader_board: [];
		data: ParentLeaderboard[];
		meta: {
			page: 1;
			take: 10;
			itemCount: 59;
			pageCount: 6;
			hasPreviousPage: false;
			hasNextPage: true;
		};
	};
	upcoming_events: [];
}

export interface ReferralProps {
	day_or_month: string;
	count: number;
}

export interface AddWardDto {
	first_name: string;
	last_name: string;
	email: string;
	examination: string;
	examination_bundle: string;
	subjects: string[];
}

export interface AddWardResponse {
	wards: [];
	total_amount: number;
	payment_link_data: {
		authorization_url: string;
		access_code: string;
		reference: string;
	};
}

const getParentHome = async () => {
	return axios.get<HttpResponse<ParentHome>>(endpoints().parents.home).then((res) => res.data);
};
export const useGetParentHome = () => {
	return useQuery({
		queryKey: ["get-parent-home"],
		queryFn: getParentHome,
		select: (data) => data.data,
		staleTime: Infinity,
		gcTime: Infinity,
	});
};

const addWard = async (payload: AddWardDto[]) => {
	return axios
		.post<HttpResponse<AddWardResponse>>(endpoints().parents.add_ward, payload)
		.then((res) => res.data);
};

const getWard = async (wardId: string) => {
	return axios
		.get<HttpResponse<GetWardResponse>>(endpoints(wardId).parents.get_ward)
		.then((res) => res.data);
};
export const useGetWard = (wardId: string) => {
	return useQuery({
		queryKey: ["get-ward", wardId],
		queryFn: () => getWard(wardId),
		enabled: !!wardId,
		select: (data) => data.data,
		staleTime: Infinity,
		gcTime: Infinity,
	});
};

export { addWard, getWard };
