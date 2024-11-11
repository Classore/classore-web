import type { HttpResponse, UserProps } from "@/types"
import { endpoints } from "@/config"
import { axios } from "@/lib"

export interface WaitlistDto {
	email: string
	first_name: string
	last_name: string
	phone_number: string
	waitlist_type: "STUDENT" | "PARENT" | (string & {})
}

export interface SignInDto {
	email: string
	password: string
}

export interface SignUpDto {
	email: string
	first_name: string
	last_name: string
	password: string
	referral_code: string
	role: "STUDENT" | "PARENT"
}

export interface ResetPasswordDto {
	email: string
	password: string
	token: string
}

const SignInMutation = async (payload: SignInDto) => {
	return axios.post<HttpResponse<UserProps>>("/auth/signin", payload).then((res) => res.data)
}

const SignUpMutation = async (payload: SignUpDto) => {
	return axios.post<HttpResponse<UserProps>>("/auth/signup", payload).then((res) => res.data)
}

const ForgotPasswordMutation = async (email: string) => {
	return axios.post<HttpResponse<null>>("/auth/forgot-password", { email }).then((res) => res.data)
}

const ResetPasswordMutation = async (payload: ResetPasswordDto) => {
	return axios.post<HttpResponse<null>>("/auth/reset-password", payload).then((res) => res.data)
}

const WaitlistMutation = async (payload: WaitlistDto) => {
	return axios.post<HttpResponse<null>>(endpoints().waitlist.join, payload).then((res) => res.data)
}

export {
	ForgotPasswordMutation,
	ResetPasswordMutation,
	SignInMutation,
	SignUpMutation,
	WaitlistMutation,
}
