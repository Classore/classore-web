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

export type BaseProps = {
	__typename?: "BaseProps";
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

export type UserProps = BaseProps & {
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	description: string;
	access_token: string;
	referral_code: string;
	profile_image?: string;
	is_verified: boolean;
	chosen_study_plan: boolean;
	leaderboard_id: string | null;
	sign_up_channel: "DEFAULT";
	my_wards: [];
	parent: string;
	birthday: string;
	reason_for_account_delete: string | null;
	password: string;
	player_id: string | null;
	classore_points: number;
	ranking: number;
	quiz_points: number;
	streak: number;
	timeline: {
		amount_paid: number;
		chosen_bundle: string;
		createdOn: string;
		deletedBy: string;
		deletedOn: string;
		end_date: string;
		exam: {
			id: string;
			name: string;
		};
		exam_bundle_details: {
			id: string;
			name: string;
		};
		exam_type: string;
		id: string;
		isBlocked: boolean;
		isDeleted: boolean;
		is_paid: boolean;
		renewal_amount: number;
		status: string;
		subjects: {
			id: string;
			name: string;
		}[];
		updatedBy: string;
		updatedOn: string;
		user_id: string;
	}[];
	user_type: "STUDENT" | "PARENT";
	wallet_id: string;
};

export type AdminProps = BaseProps & {
	__typename?: "Admin";
	email: string;
	first_name: string;
	image: string;
	last_name: string;
	password: string;
	role: "ADMIN" | "SUPER_ADMIN" | "SUB_TEACHER" | "TEACHER";
};

export type SubjectProps = BaseProps & {
	__typename?: "Subject";
	description: string;
	title: string;
};

export type CategoryProps = BaseProps & {
	__typename?: "Categories";
	featured: boolean;
	image: string;
	name: string;
	price: number;
	reviews: ReviewProps[];
	summary: string;
	subjects: ExamCourseProps[];
};

export type CourseProps = BaseProps & {
	__typename?: "Course";
	chapters: ChapterProps[];
	description: string;
	image: string;
	materials: number;
	quiz: number;
	tags: string[];
	title: string;
};

export type ChapterProps = BaseProps & {
	__typename?: "Chapter";
	description: string;
	quizzes: QuizProps[];
	resources: ResourceProps[];
	summary: string;
	title: string;
	transcript: TranscriptProps[];
	isRead: boolean;
};

export type TranscriptProps = BaseProps & {
	__typename?: "Transcript";
	duration: number[];
	summary: string;
	title: string;
};

export type ResourceProps = BaseProps & {
	__typename?: "Resource";
	description: string;
	file: FiletypeProps;
	title: string;
	url: string;
};

export type QuizProps = BaseProps & {
	__typename?: "Quiz";
	date: Date | string;
	questions: QuestionProps[];
	score: number;
	title: string;
};

export type QuestionProps = {
	id: string;
	answers: string[];
	correct_answer: string;
	question: string;
};

export type AnsweredQuestionProps = {
	questionId: string;
	selectedAnswer: string;
	input_content?: string;
};

export type MessageProps = BaseProps & {
	__typename?: "Message";
	content: string;
	timestamp: number;
	type: "media" | "system" | "text";
	userId: string;
	edited?: boolean;
	reactions?: Record<string, number>;
};

export type ChannelProps = BaseProps & {
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

export type CommunityProps = BaseProps & {
	__typename?: "Community";
	admins: string[];
	channels: ChannelProps[];
	description: string;
	name: string;
	members: UserProps[];
};

export type LeaderboardProps = BaseProps & {
	__typename?: "Leaderboard";
	quiz: number;
	streak: number;
	userId: string;
};

export type ChallengeProps = BaseProps & {
	__typename?: "Challenge";
	challenges_challenge_name: string;
	challenges_challenge_is_completed: boolean;
	challenges_challenge_points: number;
};

export type EventProps = BaseProps & {
	__typename?: "Event";
	date: (Date | string)[];
	title: string;
	participants: string[];
};

export type ReviewProps = BaseProps & {
	__typename?: "Review";
	fullName: string;
	rating: number;
	review: string;
	userType: "student" | "parent";
};

export type NotificationProps = BaseProps & {
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
		profile_image?: string;
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
	banner: string;
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
		videos: Array<{
			duration: number;
			secure_url: string;
			derived_url: string;
		}>;
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
	first_name: string;
	last_name: string;
	email: string;
	access_token: string;
	referral_code: string;
	profile_image?: string;
	is_verified: boolean;
	isDeleted: boolean;
	user_type: string;
	wallet_balance: number;
	sign_up_channel: string;
	classore_points: number;
	password: string;
	ranking: number;
	referrals: number;
	streak: number;
	quiz_points: number;
	createdOn: Date;
	updatedOn: Date;
	isBlocked: boolean;
	phone_number: string;
	description: string;
	chosen_study_plan: boolean;
	leaderboard_id: string | null;
	my_wards: [];
	parent: string;
	birthday: string;
	reason_for_account_delete: string | null;
	player_id: string | null;
	courses: {
		id: string;
		createdOn: Date;
		updatedOn: Date;
		subjects: {
			id: string;
			createdOn: Date;
			name: string;
		}[];
		exam: string;
		exam_bundle: {
			id: string;
			createdOn: Date;
			updatedOn: Date;
			name: string;
			amount: number;
			start_date: Date;
			end_date: Date;
		};
	}[];
	referral_list: {
		referral_id: string;
		referral_copied_from: null;
		referral_createdOn: Date;
		referral_updatedOn: Date;
		referral_updatedBy: null;
		referral_deletedOn: null;
		referral_deletedBy: null;
		referral_isDeleted: boolean;
		referral_isBlocked: boolean;
		referral_referrer_id: string;
		referral_referee_id: string;
		referral_type: null;
		referral_referee_type: string;
		referral_verified: boolean;
		referral_redeemed: boolean;
		referral_referral_code: null;
		referral_points: number;
		user_first_name: string;
		user_last_name: string;
		user_email: string;
		user_id: string;
	}[];
	leaderboard: {
		leaderboard_id: string;
		leaderboard_user: string;
		leaderboard_points: number;
		leaderboard_examination: string;
		leaderboard_examination_bundle: string;
		examination_bundle_name: string;
		examination_name: string;
		user_id: string;
		user_first_name: string;
		user_last_name: string;
		user_email: string;
		user_profile_image: null;
		position: string;
	}[];
	time_line: {
		id: string;
		createdOn: Date;
		updatedOn: Date;
		updatedBy: string | null;
		deletedOn: Date | null;
		deletedBy: string | null;
		isDeleted: boolean;
		isBlocked: boolean;
		user_id: string;
		exam_type: string;
		chosen_bundle: string;
		subjects: {
			id: string;
			name: string;
		}[];
		end_date: Date;
		status: string;
		is_paid: boolean;
		amount_paid: number;
		exam_bundle_details: {
			id: string;
			name: string;
		};
		exam: {
			id: string;
			name: string;
		};
		renewal_amount: number;
	}[];
};

export type SingleCourseResp = {
	id: string;
	user_id: string;
	subject_id: {
		id: string;
		name: string;
		description: string;
		banner: string;
		chapter_dripping: "YES" | "NO";
	};
	chosen_bundle: string;
	progress: number;
	status: string;
	current_chapter: {
		id: string;
		name: string;
		shuffle_questions: "YES" | "NO";
		skip_questions: "YES" | "NO";
		timer_minute: number;
		timer_hour: number;
		attempt_limit: number;
		attempt_reset: number;
	};
	current_progress_percentage: number;
	current_chapter_progress_percentage: number;
	current_chapter_module: string;
	current_module_progress_percentage: number;
	score: number;
	cut_off: number;
	quiz_attempts_limit: number;
	chapters: ChapterResp[];
};

export type ChapterResp = {
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
	is_completed: boolean;
	current_chapter_progress_percentage: number;
	current_module_progress_percentage: number;
	current_chapter_module_details: {
		id: string;
		title: string;
		sequence: number;
		content: string;
		attachments: Array<string>;
		progress: number;
	};
	modules: Array<ChapterModuleProps>;
	quizes: Array<{
		id: string;
		createdOn: string;
		updatedOn: string;
		isDeleted: boolean;
		isBlocked: boolean;
		user_id: string;
		course: string;
		chapter: string;
		module: string;
		score: number;
		bench_mark: number;
		is_passed: boolean;
		attempts: number;
		is_recorded: boolean;
	}>;
	no_of_quizes: number;
	overall_attempts: number;
};

export type ChapterModuleProps = {
	attachments: Array<string>;
	attempts: number;
	chapter: string;
	content: string;
	createdOn: string;
	id: string;
	images: Array<string>;
	is_completed?: boolean;
	is_passed?: boolean;
	overall_attempts: number;
	progress?: number;
	quiz_attempts_left: number;
	quiz_attempts_limit: number;
	quizes: Array<{
		id: string;
		createdOn: string;
		updatedOn: string;
		isDeleted: boolean;
		isBlocked: boolean;
		user_id: string;
		course: string;
		chapter: string;
		module: string;
		score: number;
		bench_mark: number;
		is_passed: boolean;
		attempts: number;
		is_recorded: boolean;
	}>;
	sequence: number;
	title: string;
	tutor?: {
		first_name: string;
		last_name: string;
		phone_number: string;
		email: string;
	};
	updatedOn: string;
	video_array: Array<{
		duration: number;
		secure_url: string;
		derived_url: string;
	}>;
};

export type MyPlan = {
	id: string;
	user_id: string;
	time_line_id: string;
	status: string;
	exam_type: {
		id: string;
		name: string;
	};
	chosen_bundle: {
		id: string;
		name: string;
		banner: string;
	};
	number_of_subjects: number;
	start_date: string;
	end_date: string;
	amount_paid: number;
	renewal_amount: number;
};

export type SinglePlan = {
	id: string;
	createdOn: string;
	user_id: string;
	exam_type: {
		id: string;
		name: string;
	};
	chosen_bundle: {
		id: string;
		name: string;
		banner: string;
		amount: number;
		max_subjects: number;
		allowed_subjects: number;
		amount_per_subject: number;
	};
	study_timeline: string;
	timelines: Array<string>;
	transaction_log: string;
	subjects: Array<{
		id: string;
		name: string;
		banner: string;
		rating: string;
	}>;
	start_date: string;
	end_date: string;
	status: string;
	is_paid: boolean;
	amount_paid: number;
	renewal_amount: number;
};

export type ReferralProps = BaseProps & {
	__typename?: "Referral";
	fullName: string;
	email: string;
	points: number;
	status: "active" | "inactive";
};

export type WithdrawalProps = BaseProps & {
	__typename?: "Withdrawal";
	amount: number;
	date: Date | string;
	status: "pending" | "successful" | "failed";
};

export type BankProps = {
	bank_id: string;
	bank_copied_from: Maybe<string>;
	bank_createdOn: Maybe<Date>;
	bank_updatedOn: Maybe<Date>;
	bank_updatedBy: Maybe<string>;
	bank_deletedOn: Maybe<Date>;
	bank_deletedBy: Maybe<string>;
	bank_isDeleted: boolean;
	bank_isBlocked: boolean;
	bank_name: string;
	bank_slug: string;
	bank_code: string;
	bank_longcode: string;
};

export type AccountDetailsProps = {
	bank_details: Array<{
		bank_detail_id: string;
		bank_detail_copied_from: string | null;
		bank_detail_createdOn: string;
		bank_detail_updatedOn: string;
		bank_detail_updatedBy: string | null;
		bank_detail_deletedOn: Date | null;
		bank_detail_deletedBy: string | null;
		bank_detail_isDeleted: boolean;
		bank_detail_isBlocked: boolean;
		bank_detail_account_number: string;
		bank_detail_account_name: string;
		bank_detail_user_id: string;
		bank_detail_bank_id: string;
		bank_detail_bank_name: string;
	}>;
	wallet: {
		id: string;
		copied_from: string | null;
		createdOn: string;
		updatedOn: string;
		updatedBy: string | null;
		deletedOn: Date | null;
		deletedBy: string | null;
		isDeleted: boolean;
		isBlocked: boolean;
		user_id: string;
		admin_id: string | null;
		current_balance: number;
		currency: string;
	};
};

export type WithdrawalHistoryProps = {
	withdrawal_id: string;
	withdrawal_copied_from: string | null;
	withdrawal_createdOn: string;
	withdrawal_updatedOn: string;
	withdrawal_updatedBy: string | null;
	withdrawal_deletedOn: Date | null;
	withdrawal_deletedBy: string | null;
	withdrawal_isDeleted: boolean;
	withdrawal_isBlocked: boolean;
	withdrawal_amount: number;
	withdrawal_account_name: string;
	withdrawal_account_nullable: string | null;
	withdrawal_account_number: string;
	withdrawal_user_id: string;
	withdrawal_bank_detail_id: string;
	withdrawal_bank_id: string;
	withdrawal_status: string;
};
