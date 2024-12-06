import type { AxiosError } from "axios"

interface ApiError {
	status: string
	error: string
	success: boolean
	message: string
	errorCode: string
}

declare module "@tanstack/react-query" {
	interface Register {
		defaultError: AxiosError<ApiError>
	}
}
