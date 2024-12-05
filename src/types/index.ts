export type Maybe<T> = T | null

export type Undefined<T> = T | undefined

export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K]
}

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>
}

export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>
}

export type ValueOf<T> = T[keyof T]

export type NonEmptyArray<T> = [T, ...T[]]

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never

export interface HttpResponse<T> {
	error: string
	data: T
	message: string
	success: boolean
}

export type HttpError = {
	response: {
		data: {
			error: string
			errorCode: string
			message: string
			status: string
			success: boolean
		}
	}
}

export interface PaginatedResponse<T> {
	data: T[]
	meta: {
		page: number
		take: number
		itemCount: number
		pageCount: number
		hasPreviousPage: boolean
		hasNextPage: boolean
	}
}

export type PaginatedProps = {
	limit?: number
	page?: number
}

export type Node = {
	__typename?: "Node"
	id: string
	createdOn: Date | string
	deletedBy?: Maybe<string>
	deletedOn?: Maybe<Date | string>
	isDeleted?: boolean
	updatedBy?: Maybe<string>
	updatedOn?: Maybe<Date | string>
}

export type UserProps = Node & {
	__typename?: "User"
	first_name: string
	last_name: string
	email: string
	password: string
	access_token: string
	referral_code: string
	profile_image: string
	is_verified: boolean
	chosen_study_plan: boolean
	user_type: string
	wallet_id: string
	sign_up_channel: string
	isBlocked: boolean
}
