import type { ExamCourseProps } from "./type";

export type Maybe<T> = T | null;

export type Undefined<T> = T | undefined;

export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};

export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};

export type ValueOf<T> = T[keyof T];

export type NonEmptyArray<T> = [T, ...T[]];

export type MustInclude<T, U extends T[]> = [T] extends [ValueOf<U>] ? U : never;

export interface HttpResponse<T> {
	error: string;
	data: T;
	message: string;
	success: boolean;
}

export type HttpError = {
	response: {
		data: {
			error: string;
			errorCode: string;
			message: string | string[];
			status: string;
			success: boolean;
		};
	};
};

export interface PaginatedResponse<T> {
	data: T[];
	meta: {
		page: number;
		take: number;
		itemCount: number;
		pageCount: number;
		hasPreviousPage: boolean;
		hasNextPage: boolean;
	};
}

export type PaginationProps = {
	limit?: number;
	page?: number;
};

export type Node = {
	__typename?: "Node";
	id: string;
	createdOn?: Date | string;
	deletedBy?: Maybe<string>;
	deletedOn?: Date | string;
	isBlocked?: boolean;
	isDeleted?: boolean;
	updatedBy?: Maybe<string>;
	updatedOn?: Date | string;
};

export type FiletypeProps = "doc" | "docx" | "pdf" | "pptx" | "txt";

export type UserProps = Node & {
	__typename?: "User";
	first_name: string;
	last_name: string;
	email: string;
	image: string;
	password: string;
	access_token: string;
	referral_code: string;
	profile_image: string;
	is_verified: boolean;
	chosen_study_plan: boolean;
	user_type: string;
	wallet_id: string;
	sign_up_channel: string;
	isBlocked: boolean;
};

export type AdminProps = Node & {
	__typename?: "Admin";
	email: string;
	first_name: string;
	image: string;
	last_name: string;
	password: string;
	role: "ADMIN" | "SUPER_ADMIN" | "SUB_TEACHER" | "TEACHER";
};

export type SubjectProps = Node & {
	__typename?: "Subject";
	description: string;
	title: string;
};

export type CategoryProps = Node & {
	__typename?: "Categories";
	featured: boolean;
	image: string;
	name: string;
	price: number;
	reviews: ReviewProps[];
	summary: string;
	subjects: ExamCourseProps[];
};

export type CourseProps = Node & {
	__typename?: "Course";
	chapters: ChapterProps[];
	description: string;
	image: string;
	materials: number;
	quiz: number;
	tags: string[];
	title: string;
};

export type ChapterProps = Node & {
	__typename?: "Chapter";
	description: string;
	quizzes: QuizProps[];
	resources: ResourceProps[];
	summary: string;
	title: string;
	transcript: TranscriptProps[];
	isRead: boolean;
};

export type TranscriptProps = Node & {
	__typename?: "Transcript";
	duration: number[];
	summary: string;
	title: string;
};

export type ResourceProps = Node & {
	__typename?: "Resource";
	description: string;
	file: FiletypeProps;
	title: string;
	url: string;
};

export type QuizProps = Node & {
	__typename?: "Quiz";
	date: Date | string;
	questions: QuestionProps[];
	score: number;
	title: string;
};

export type QuestionProps = Node & {
	__typename?: "Question";
	answers: string[];
	correct_answer: string;
	question: string;
};

export type AnsweredQuestionProps = {
	questionId: string;
	selectedAnswer: string;
};

export type MessageProps = Node & {
	__typename?: "Message";
	content: string;
	timestamp: number;
	type: "media" | "system" | "text";
	userId: string;
	edited?: boolean;
	reactions?: Record<string, number>;
};

export type ChannelProps = Node & {
	__typename?: "Channel";
	color: string;
	description?: string;
	isGeneral?: boolean;
	locked: boolean;
	messages: MessageProps[];
	name: string;
	participants: UserProps[];
	type: "audio" | "text";
};

export type CommunityProps = Node & {
	__typename?: "Community";
	admins: string[];
	channels: ChannelProps[];
	description: string;
	name: string;
	members: UserProps[];
};

export type LeaderboardProps = Node & {
	__typename?: "Leaderboard";
	quiz: number;
	streak: number;
	userId: string;
};

export type ChallengeProps = Node & {
	__typename?: "Challenge";
	challenges_challenge_name: string;
	challenges_challenge_is_completed: boolean;
	challenges_challenge_points: number;
};

export type EventProps = Node & {
	__typename?: "Event";
	date: (Date | string)[];
	title: string;
	participants: string[];
};

export type ReviewProps = Node & {
	__typename?: "Review";
	fullName: string;
	rating: number;
	review: string;
	userType: "student" | "parent";
};

export type NotificationProps = Node & {
	content: string;
	read: boolean;
	title: string;
};

export type WaitlistUserProps = {
	__typename?: "Waitlist User";
	waitlists_createdOn: Date | string;
	waitlists_deletedBy: Maybe<string>;
	waitlists_deletedOn?: Date | string;
	waitlists_email: string;
	waitlists_first_name: string;
	waitlists_id: string;
	waitlists_isDeleted?: boolean;
	waitlists_last_name: string;
	waitlists_phone_number: string;
	waitlists_updateBy: Maybe<string>;
	waitlists_updateOn?: Date | string;
	waitlists_waitlist_type: string;
};

export type UserMetricProps = {
	__typename?: "User Metric";
	icon: React.JSX.Element;
	label: string;
	value: string | number;
};

export type UserChartProps = {
	__typename?: "User Chart";
	date: string;
	time_spent: number;
};

export type AddWardsProps = {
	wards: Array<{
		first_name: string;
		last_name: string;
		email: string;
		password: string;
		parent: string;
		isDeleted: boolean;
		isBlocked: boolean;
		profile_image: string;
		wallet_id: string;
		// my_wards: Array<any>
		id: string;
		createdOn: string;
		updatedOn: string;
		is_verified: boolean;
		chosen_study_plan: boolean;
		user_type: string;
		sign_up_channel: string;
		student_timeline: {
			user_id: string;
			exam_type: string;
			chosen_bundle: string;
			subjects: Array<string>;
			end_date: string;
			updatedBy: string;
			deletedBy: string;
			isDeleted: boolean;
			isBlocked: boolean;
			id: string;
			createdOn: string;
			updatedOn: string;
			deletedOn: string;
			status: string;
			is_paid: boolean;
		};
	}>;
	total_amount: number;
	payment_link_data: {
		authorization_url: string;
		access_code: string;
		reference: string;
	};
};

export type SingleBundleResp = {
	id: string;
	name: string;
	description: string;
	enrolled: number;
	raters: number;
	amount: number;
	is_bought: boolean;
	start_date: string;
	end_date: string;
	examination: {
		id: string;
		name: string;
	};
	max_subjects: number;
	extra_charge: number;
	amount_per_subject: number;
	allow_extra_subjects: string;
	rating: string;
	number_of_subjects: number;
	average_downloadable_materials: number;
	subjects: Array<{
		id: string;
		createdOn: string;
		updatedOn: string;
		updatedBy: string;
		deletedOn: string;
		deletedBy: string;
		isDeleted: boolean;
		isBlocked: boolean;
		name: string;
		class?: string;
		examination: string;
		examination_bundle: string;
		bench_mark: number;
		number_of_chapters: number;
		number_of_materials: number;
		total_quizes: number;
		chapters: Array<{
			id: string;
			createdOn: string;
			updatedOn: string;
			updatedBy: string;
			deletedOn: string;
			deletedBy: string;
			isDeleted: boolean;
			isBlocked: boolean;
			subject_id: string;
			name: string;
			sequence: number;
			images: Array<string>;
			videos: Array<string>;
			content: string;
			bench_mark: number;
			modules: Array<{
				id: string;
				createdOn: string;
				updatedOn: string;
				updatedBy: string;
				deletedOn: string;
				deletedBy: string;
				isDeleted: boolean;
				isBlocked: boolean;
				chapter: string;
				title: string;
				sequence: number;
				images: Array<string>;
				videos: Array<string>;
				content: string;
				tutor: string;
				attachments: Array<string>;
			}>;
		}>;
	}>;
	reviews: Array<{
		rating_id: string;
		rating_comment: string;
		rating_rating: number;
		rating_examination: string;
		rating_examination_bundle: string;
		rating_subject: string;
		rating_user: string;
		rating_purpose: string;
		user_first_name: string;
		user_last_name: string;
		user_profile_image: string;
		rating_createdon: string;
	}>;
};

export type UserProfileResp = {
	id: string;
	createdOn: string;
	updatedOn: string;
	isDeleted: boolean;
	isBlocked: boolean;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	password: string;
	description: string;
	access_token: string;
	referral_code: string;
	profile_image: string;
	is_verified: boolean;
	chosen_study_plan: boolean;
	user_type: string;
	wallet_id: string;
	leaderboard_id: string;
	sign_up_channel: string;
	my_wards: Array<string>;
	parent: string;
	birthday: string;
	time_line: Array<{
		id: string;
		createdOn: string;
		updatedOn: string;
		isDeleted: boolean;
		isBlocked: boolean;
		user_id: string;
		exam_type: string;
		chosen_bundle: string;
		subjects: Array<{
			id: string;
			name: string;
		}>;
		end_date: string;
		status: string;
		is_paid: boolean;
		amount_paid: number;
		exam_bundle_details: {
			id: string;
			name: string;
		};
	}>;
};

export type SingleCourseResp = {
	id: string;
	user_id: string;
	subject_id: {
		id: string;
		name: string;
		description: string;
		banner: string;
	};
	chosen_bundle: string;
	progress: number;
	status: string;
	current_chapter: {
		id: string;
		name: string;
	};
	current_progress_percentage: number;
	current_chapter_progress_percentage: number;
	current_chapter_module: string;
	current_module_progress_percentage: number;
	score: number;
	cut_off: number;
	quiz_attempts_limit: number;
	chapters: Array<{
		id: string;
		createdOn: string;
		updatedOn: string;
		isDeleted: boolean;
		isBlocked: boolean;
		subject_id: string;
		name: string;
		sequence: number;
		banner: string;
		images: Array<string>;
		videos: Array<string>;
		content: string;
		bench_mark: number;
		shuffle_questions: string;
		skip_questions: string;
		timer_minute: number;
		timer_hour: number;
		attempt_limit: number;
		attempt_reset: number;
		current_chapter_module: string;
		modules: Array<{
			id: string;
			createdOn: string;
			updatedOn: string;
			chapter: string;
			title: string;
			sequence: number;
			images: Array<string>;
			video_array: Array<{
				duration: number;
				secure_url: string;
			}>;
			content: string;
			tutor?: {
				first_name: string;
				last_name: string;
				phone_number: string;
				email: string;
			};
			attachments: Array<string>;
			progress: number;
			is_completed: boolean;
		}>;
		is_completed: boolean;
		quizes: Array<{
			id: string;
			createdOn: string;
			updatedOn: string;
			isDeleted: boolean;
			isBlocked: boolean;
			sequence: number;
			content: string;
			question_type: string;
			images: Array<string>;
			videos: Array<string>;
			subject: string;
			chapter: string;
			module: string;
			score: number;
		}>;
		no_of_quizes: number;
		overall_attempts: number;
		attempts: number;
		quiz_attempts_limit: number;
		quiz_attempts_left: number;
	}>;
};
