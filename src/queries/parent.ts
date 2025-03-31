import { useQuery } from "@tanstack/react-query";

import type { HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";
import type {
	ParentLeaderboard,
	ParentReferralProps,
	ParentWithdrawalProps,
	WardAnalyticsProps,
	WardEventProps,
	WardProps,
	WardSubjectProps,
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
		report: WardAnalyticsProps[];
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
	upcoming_events: WardEventProps[];
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

export type StudyPackDto = {
	chosen_bundle: string;
	subject_length: number;
};

export interface VetStudyPackDto {
	vettings: StudyPackDto[];
}

export interface VetStudyPackResponse {
	summary: {
		base_amount: number;
		number_of_extra_subjects_added: number;
		grand_total: number;
	};
	vettings: {
		base_amount: number;
		allowed_subjects: number;
		allow_extra_subjects: "YES" | "NO";
		number_of_extra_subjects_added: number;
		grand_total: number;
	}[];
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

const getSubjects = async (params: PaginationProps & { examination_bundle: string }) => {
	return axios
		.get<
			HttpResponse<PaginatedResponse<WardSubjectProps>>
		>(endpoints().parents.get_subjects, { params })
		.then((res) => res.data);
};
export const useGetSubjects = (params: PaginationProps & { examination_bundle: string }) => {
	return useQuery({
		queryKey: ["get-subjects", params],
		queryFn: () => getSubjects(params),
		enabled: !!params.examination_bundle,
		select: (data) => data.data,
		staleTime: Infinity,
		gcTime: Infinity,
	});
};

const vetStudyPack = async (payload: VetStudyPackDto) => {
	return axios
		.post<HttpResponse<VetStudyPackResponse>>(endpoints().parents.vet_pack, payload)
		.then((res) => res.data);
};

export { addWard, getParentHome, getSubjects, getWard, vetStudyPack };
