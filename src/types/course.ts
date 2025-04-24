import type { Maybe, Node } from "./index";

export type CourseStatus = "ONGOING" | "COMPLETED" | "FAILED";

export type ViewCourseProps = {
	__typename?: string;
	chapters: NewChapterProps[];
	chosen_bundle: string;
	current_progress_percentage: number;
	current_chapter: {
		id: string;
		name: string;
	};
	cut_off: number;
	id: string;
	progress: number;
	score: number;
	subject_id: {
		id: string;
		name: string;
	};
	status: CourseStatus;
	user_id: string;
};

export type NewChapterProps = {
	__typename: "Chapter";
	bench_mark: number;
	content: string;
	id: string;
	images: string[];
	modules: NewModuleProps[];
	name: string;
	quizzes: [];
	sequence: number;
	subject_id: string;
	videos: string[];
};

export type NewModuleProps = Node & {
	__typename: "Module";
	attachments: string[];
	chapter: string;
	content: string;
	images: string[];
	sequence: number;
	title: string;
	tutor: null;
	videos: string[];
};

export type LeaderboardItemProps = {
	__typename?: "Leaderboard";
	leaderboard_id: string;
	leaderboard_user: string;
	leaderboard_points: number;
	leaderboard_examination: string;
	leaderboard_examination_bundle: string;
	user_id: string;
	user_first_name: string;
	user_last_name: string;
	user_email: string;
	user_profile_image: string;
};

export type NewQuestionProps = {
	__typename?: "Question";
	question_id: string;
	question_createdOn: Maybe<Date>;
	question_updatedOn: Maybe<Date>;
	question_updatedBy: Maybe<string>;
	question_deletedOn: Maybe<Date>;
	question_deletedBy: Maybe<string>;
	question_isDeleted: boolean;
	question_isBlocked: boolean;
	question_sequence: 1;
	question_content: string;
	question_question_type: string;
	question_images: string[];
	question_videos: string[];
	question_subject: string;
	question_chapter: string;
	question_module: null;
	question_score: number;
	options: NewOptionProps[];
};

export type NewOptionProps = {
	__typename: "Option";
	id: string;
	sequence_number: number;
	content: string;
	images: string[];
	videos: string[];
	subject: string;
	chapter: string;
	question: string;
};

export type NewSubjectProps = {
	__typename?: "Subject";
	subject_id: string;
	subject_createdOn: Maybe<Date>;
	subject_updatedOn: Maybe<Date>;
	subject_updatedBy: Maybe<string>;
	subject_deletedOn: Maybe<Date>;
	subject_deletedBy: Maybe<string>;
	subject_isDeleted: boolean;
	subject_isBlocked: boolean;
	subject_name: string;
	subject_class: string;
	subject_examination: string;
	subject_examination_bundle: string;
};
