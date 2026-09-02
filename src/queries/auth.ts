import { useMutation, useQuery } from "@tanstack/react-query";

import { endpoints } from "@/config";
import { axios } from "@/lib";
import type {
	AddWardsProps,
	HttpResponse,
	PaginatedResponse,
	PaginationProps,
	UserProps,
	WaitlistUserProps,
} from "@/types";

export interface WaitlistDto {
	email: string;
	first_name: string;
	last_name: string;
	phone_number: string;
	waitlist_type: "STUDENT" | "PARENT" | (string & {});
}

export interface SignInDto {
	email: string;
	password: string;
}

export interface SignUpDto {
	first_name: string;
	last_name: string;
	email: string;
	phone_number?: string;
	sign_up_channel: "DEFAULT" | "GOOGLE";
	password: string;
	user_type: "STUDENT" | "PARENT";
	referral_code: string;
}

export interface ResetPasswordDto {
	otp: string;
	new_password: string;
}

type ForgotPasswordDto = {
	email_or_phone_number: string;
};

const SignInMutation = async (payload: SignInDto) => {
	return axios
		.post<HttpResponse<UserProps>>(endpoints().auth.signin, payload)
		.then((res) => res.data);
};

const GoogleSignInQuery = async (access_token: string) => {
	return axios
		.post<HttpResponse<UserProps>>(endpoints().auth.google_signin, { access_token })
		.then((res) => res.data);
};

interface SignupProps {
	user_details: UserProps;
}
const SignUpMutation = async (payload: SignUpDto) => {
	// Uses native fetch (not the custom axios instance) so the path stays
	// relative and hits /api/auth/signup (our Next.js proxy) rather than
	// being prefixed with the backend baseURL.
	const res = await fetch("/api/auth/signup", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	const data = await res.json();
	if (!res.ok) {
		// Throw so react-query's onError handler fires normally
		const err = new Error(data?.message ?? "Signup failed") as Error & {
			response: { data: typeof data };
		};
		err.response = { data };
		throw err;
	}
	return data as HttpResponse<SignupProps>;
};
type VerifyEmailDto = {
	verification_code: string;
};
const VerifyEmailMutation = async (payload: VerifyEmailDto) => {
	return axios
		.post<HttpResponse<UserProps>>(endpoints().auth.verify, payload)
		.then((res) => res.data);
};

const ResendVerificationCodeMutation = async () => {
	return axios.get<HttpResponse<UserProps>>(endpoints().auth.resend_code).then((res) => res.data);
};

const ForgotPasswordMutation = async (payload: ForgotPasswordDto) => {
	return axios
		.post<HttpResponse<null>>(endpoints().auth.forgot_password, payload)
		.then((res) => res.data);
};

const ResetPasswordMutation = async (payload: ResetPasswordDto) => {
	return axios
		.put<HttpResponse<null>>(endpoints().auth.reset_password, payload)
		.then((res) => res.data);
};

export type AddGuardianDto = {
	first_name: string;
	last_name: string;
	phone_number: string;
	email?: string;
};
const AddGuardian = async (payload: AddGuardianDto) => {
	return axios
		.post<HttpResponse<string>>(endpoints().auth.add_guardian, payload)
		.then((res) => res.data);
};

export type AddWardsDto = Array<{
	first_name: string;
	last_name: string;
	email: string;
	examination: string;
	examination_bundle: string;
	subjects: Array<string>;
}>;
const AddWardsMutation = async (payload: AddWardsDto) => {
	return axios
		.post<HttpResponse<AddWardsProps>>(endpoints().auth.add_wards, payload)
		.then((res) => res.data);
};

const WaitlistMutation = async (payload: WaitlistDto) => {
	return axios.post<HttpResponse<null>>(endpoints().waitlist.join, payload).then((res) => res.data);
};

const GetWaitlistQuery = async (params: PaginationProps) => {
	return axios
		.get<HttpResponse<PaginatedResponse<WaitlistUserProps>>>(endpoints().waitlist.get, { params })
		.then((res) => res.data);
};

type UpdateProfilePayload = {
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	description: string;
	birthday: string;
	class: string;
	profile_image: string | File;
};

const UpdateProfileMutation = async (payload: Partial<UpdateProfilePayload>) => {
	const formdata = new FormData();

	if (payload.first_name) {
		formdata.append("first_name", payload.first_name);
	}
	if (payload.last_name) {
		formdata.append("last_name", payload.last_name);
	}
	if (payload.email) {
		formdata.append("email", payload.email);
	}
	if (payload.phone_number) {
		formdata.append("phone_number", payload.phone_number);
	}
	if (payload.description) {
		formdata.append("description", payload.description);
	}
	if (payload.class) {
		formdata.append("class", payload.class);
	}
	if (payload.birthday) {
		formdata.append("birthday", payload.birthday);
	}
	if (payload.profile_image instanceof File) {
		formdata.append("profile_image", payload.profile_image);
	}

	return axios
		.put<HttpResponse<null>>(endpoints().auth.update_profile, formdata, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
		.then((res) => res.data);
};

type ChangePasswordPayload = {
	old_password: string;
	new_password: string;
};
const ChangePasswordMutation = async (payload: ChangePasswordPayload) => {
	return axios
		.put<HttpResponse<null>>(endpoints().auth.change_password, payload)
		.then((res) => res.data);
};

const googleCallback = async () => {
	return axios.get<HttpResponse<string>>(endpoints().auth.google_callback).then((res) => res.data);
};
export const useGoogleCallback = () => {
	return useQuery({
		queryKey: ["google_callback"],
		queryFn: googleCallback,
		enabled: false,
	});
};

export type DeleteAccountParams = {
	id: string;
	reason_for_account_delete: string;
};
const deleteAccount = async (params: DeleteAccountParams) => {
	return axios
		.put<HttpResponse<null>>(endpoints().auth.delete_entity, {
			type: "USER",
			id: params.id,
			reason_for_account_delete: params.reason_for_account_delete,
		})
		.then((res) => res.data);
};
export const useDeleteAccountMutation = () => {
	return useMutation({
		mutationFn: deleteAccount,
		mutationKey: ["delete-account"],
	});
};

export {
	AddGuardian,
	AddWardsMutation,
	ChangePasswordMutation,
	deleteAccount,
	ForgotPasswordMutation,
	GetWaitlistQuery,
	GoogleSignInQuery,
	ResendVerificationCodeMutation,
	ResetPasswordMutation,
	SignInMutation,
	SignUpMutation,
	UpdateProfileMutation,
	VerifyEmailMutation,
	WaitlistMutation,
};
