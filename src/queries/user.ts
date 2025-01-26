import type { HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import type { ExamCourseProps } from "@/types/type";
import { endpoints } from "@/config";
import { axios } from "@/lib";
import type {
	LeaderboardItemProps,
	NewQuestionProps,
	ViewCourseProps,
} from "@/types/course";

interface StartCourseDto {
	chapter_id: string;
	current_progress: number;
}

interface SubmitQuizDto {
	chapter: string;
	answers: {
		question: string;
		option: string;
	}[];
}

const getMyCourses = async (
	params?: PaginationProps & {
		examination_bundle?: string;
	}
) => {
	if (params) {
		for (const key in params) {
			if (
				!params[key as keyof typeof params] ||
				params[key as keyof typeof params] === undefined
			) {
				delete params[key as keyof typeof params];
			}
		}
	}
	return axios
		.get<HttpResponse<PaginatedResponse<ExamCourseProps>>>(endpoints().user.my_courses)
		.then((res) => res.data);
};

const viewCourse = async (id: string) => {
	return axios
		.get<HttpResponse<ViewCourseProps>>(endpoints(id).user.view_course)
		.then((res) => res.data);
};

const startCourse = async (courseId: string, data: StartCourseDto) => {
	return axios
		.put<HttpResponse<ViewCourseProps>>(endpoints(courseId).user.start_course, data)
		.then((res) => res.data);
};

const getUpcomingEvents = async (params: { month?: number; timeLine?: string }) => {
	if (params) {
		for (const key in params) {
			if (
				!params[key as keyof typeof params] ||
				params[key as keyof typeof params] === undefined
			) {
				delete params[key as keyof typeof params];
			}
		}
	}
	return axios
		.get<HttpResponse<PaginatedResponse<ExamCourseProps>>>(endpoints().user.upcoming_events)
		.then((res) => res.data);
};

const viewLeaderboard = async (
	params?: PaginationProps & { examination_bundle: string; examination: string }
) => {
	if (params) {
		for (const key in params) {
			if (
				!params[key as keyof typeof params] ||
				params[key as keyof typeof params] === undefined
			) {
				delete params[key as keyof typeof params];
			}
		}
	}
	return axios
		.get<
			HttpResponse<PaginatedResponse<LeaderboardItemProps>>
		>(endpoints().user.leaderboard, { params })
		.then((res) => res.data);
};

const fetchQuestions = async (params?: PaginationProps & { chapter_id: string }) => {
	if (params) {
		for (const key in params) {
			if (
				!params[key as keyof typeof params] ||
				params[key as keyof typeof params] === undefined
			) {
				delete params[key as keyof typeof params];
			}
		}
	}
	return axios
		.get<
			HttpResponse<PaginatedResponse<NewQuestionProps>>
		>(endpoints().user.fetch_questions)
		.then((res) => res.data);
};

const submitQuiz = async (data: SubmitQuizDto) => {
	return axios
		.post<HttpResponse<{ message: string }>>(endpoints().user.submit_quiz, data)
		.then((res) => res.data);
};

export {
	getMyCourses,
	getUpcomingEvents,
	fetchQuestions,
	startCourse,
	submitQuiz,
	viewCourse,
	viewLeaderboard,
};
