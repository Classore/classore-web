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
	return axios
		.post<HttpResponse<SignupProps>>(endpoints().auth.signup, payload)
		.then((res) => res.data);
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
	profile_image: string | File;
};

const UpdateProfileMutation = async (payload: UpdateProfilePayload) => {
	const formdata = new FormData();

	formdata.append("first_name", payload.first_name);
	formdata.append("last_name", payload.last_name);
	formdata.append("email", payload.email);
	formdata.append("phone_number", payload.phone_number);
	formdata.append("description", payload.description);
	formdata.append("birthday", payload.birthday);
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

export {
	AddWardsMutation,
	ChangePasswordMutation,
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

