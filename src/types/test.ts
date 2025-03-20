import type { Maybe, Node } from "./index";

export type TestCenterProps = {
	id: string;
	title: string;
	description: string;
	is_published: "YES" | "NO";
	banner: string;
	questions: number;
	minute: number;
	hour: number;
};

export type TestCenterDetailProps = Node & {
	attempt_limit: number;
	attempt_reset: number;
	attempts_left: number;
	banner: string;
	bench_mark: number;
	current_attempts: number;
	description: string;
	is_published: "YES" | "NO";
	shuffle_questions: "YES" | "NO";
	skip_questions: "YES" | "NO";
	test_sections: {
		id: string;
		title: string;
		description: string;
		test: {
			id: string;
			title: string;
		};
		banner: string;
		questions: number;
		minute: number;
		hour: number;
	}[];
	timer_hour: number;
	timer_minute: number;
	title: string;
	last_score?: {
		percentage: number;
		score_breakdown: {
			section_title: string;
			score: number;
			total: number;
		}[];
	};
};

export type TestQuestionsProps = Node & {
	id: string;
	title: string;
	description: string;
	bench_mark: number;
	skip_questions: string;
	timer_minute: number;
	timer_hour: number;
	attempt_limit: number;
	attempt_reset: number;
	current_attempts: number;
	attempts_left: number;
	test_sections: {
		id: string;
		title: string;
		description: string;
		banner: string;
		questions: QuestionProps[];
	}[];
};

export type QuestionTypeProps =
	| "FILL_IN_THE_GAP"
	| "LISTENING"
	| "MULTIPLE_CHOICE"
	| "SHORT_ANSWER"
	| "SPEAKING"
	| "YES_OR_NO";

export type QuestionProps = {
	id: string;
	test_section: string;
	instructions: string;
	content: string;
	sequence: number;
	question_type: QuestionTypeProps;
	media: Maybe<string>;
	images: string[];
	videos: string[];
	options: OptionProps[];
};

export type OptionProps = {
	id: string;
	sequence_number: number;
	content: string;
	images: string[];
	videos: [];
	media: Maybe<string>;
};
