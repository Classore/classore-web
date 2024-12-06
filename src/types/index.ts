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

export type PaginationProps = {
	limit?: number
	page?: number
}

export type Node = {
	__typename?: "Node"
	id: string
	createdOn?: Date | string
	deletedBy?: Maybe<string>
	deletedOn?: Date | string
	isDeleted?: boolean
	updatedBy?: Maybe<string>
	updatedOn?: Date | string
}

export type FiletypeProps = "doc" | "docx" | "pdf" | "pptx" | "txt"

export type UserProps = Node & {
	__typename?: "User"
	first_name: string
	last_name: string
	email: string
	image: string
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

export type AdminProps = Node & {
	__typename?: "Admin"
	email: string
	first_name: string
	image: string
	last_name: string
	password: string
	role: "ADMIN" | "SUPER_ADMIN" | "SUB_TEACHER" | "TEACHER"
}

export type SubjectProps = Node & {
	__typename?: "Subject"
	description: string
	title: string
}

export type CategoryProps = Node & {
	__typename?: "Categories"
	featured: boolean
	image: string
	name: string
	price: number
	reviews: ReviewProps[]
	summary: string
	subjects: CourseProps[]
}

export type CourseProps = Node & {
	__typename?: "Course"
	chapters: ChapterProps[]
	description: string
	image: string
	materials: number
	quiz: number
	tags: string[]
	title: string
}

export type ChapterProps = Node & {
	__typename?: "Chapter"
	description: string
	quizzes: QuizProps[]
	resources: ResourceProps[]
	summary: string
	title: string
	transcript: TranscriptProps[]
	isRead: boolean
}

export type TranscriptProps = Node & {
	__typename?: "Transcript"
	duration: number[]
	summary: string
	title: string
}

export type ResourceProps = Node & {
	__typename?: "Resource"
	description: string
	file: FiletypeProps
	title: string
	url: string
}

export type QuizProps = Node & {
	__typename?: "Quiz"
	date: Date | string
	questions: QuestionProps[]
	score: number
	title: string
}

export type QuestionProps = Node & {
	__typename?: "Question"
	answers: string[]
	correct_answer: string
	question: string
}

export type AnsweredQuestionProps = {
	questionId: string
	selectedAnswer: string
}

export type MessageProps = Node & {
	__typename?: "Message"
	content: string
	timestamp: number
	type: "media" | "system" | "text"
	userId: string
	edited?: boolean
	reactions?: Record<string, number>
}

export type ChannelProps = Node & {
	__typename?: "Channel"
	color: string
	description?: string
	isGeneral?: boolean
	locked: boolean
	messages: MessageProps[]
	name: string
	participants: UserProps[]
	type: "audio" | "text"
}

export type CommunityProps = Node & {
	__typename?: "Community"
	admins: string[]
	channels: ChannelProps[]
	description: string
	name: string
	members: UserProps[]
}

export type LeaderboardProps = Node & {
	__typename?: "Leaderboard"
	quiz: number
	referrals: number
	streak: number
	userId: string
}

export type ChallengeProps = Node & {
	__typename?: "Challenge"
	challenges_challenge_name: string
	challenges_challenge_is_completed: boolean
	challenges_challenge_points: number
}

export type EventProps = Node & {
	__typename?: "Event"
	date: (Date | string)[]
	title: string
	participants: string[]
}

export type ReviewProps = Node & {
	__typename?: "Review"
	rating: number
}

export type NotificationProps = Node & {
	content: string
	read: boolean
	title: string
}

export type WaitlistUserProps = {
	__typename?: "Waitlist User"
	waitlists_createdOn: Date | string
	waitlists_deletedBy: Maybe<string>
	waitlists_deletedOn?: Date | string
	waitlists_email: string
	waitlists_first_name: string
	waitlists_id: string
	waitlists_isDeleted?: boolean
	waitlists_last_name: string
	waitlists_phone_number: string
	waitlists_updateBy: Maybe<string>
	waitlists_updateOn?: Date | string
	waitlists_waitlist_type: string
}
