import type { HttpResponse } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

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

const addWard = async (payload: AddWardDto) => {
	return axios.post<HttpResponse<AddWardResponse>>(endpoints().parents.add_ward, payload);
};

export { addWard };
