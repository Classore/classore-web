import { useQuery } from "@tanstack/react-query";

import type { LeaderboardItemProps, NewQuestionProps, ViewCourseProps } from "@/types/course";
import type { ExamCourseProps } from "@/types/type";
import { endpoints } from "@/config";
import { axios } from "@/lib";
import type {
	HttpResponse,
	MyPlan,
	PaginatedResponse,
	PaginationProps,
	SinglePlan,
	UserProps,
} from "@/types";

interface StartCourseDto {
	chapter_id: string;
	current_progress: number;
}

interface SubmitQuizDto {
	module: string;
	answers: {
		question: string;
		option: string;
		input_content?: string;
	}[];
}

const getProfile = async () => {
	return axios.get<HttpResponse<UserProps>>(endpoints().auth.profile).then((res) => res.data);
};
export const useGetProfile = () => {
	return useQuery({
		queryKey: ["profile"],
		queryFn: () => getProfile(),
		staleTime: Infinity,
		gcTime: Infinity,
		select: (data) => data.data,
	});
};

const getMyCourses = async (
	params?: PaginationProps & {
		examination_bundle?: string;
	}
) => {
	if (params) {
		for (const key in params) {
			if (!params[key as keyof typeof params] || params[key as keyof typeof params] === undefined) {
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
			if (!params[key as keyof typeof params] || params[key as keyof typeof params] === undefined) {
				delete params[key as keyof typeof params];
			}
		}
	}
	return axios
		.get<HttpResponse<PaginatedResponse<ExamCourseProps>>>(endpoints().user.upcoming_events)
		.then((res) => res.data);
};

const viewLeaderboard = async (
	params?: PaginationProps & {
		examination_bundle: string;
		examination: string;
	}
) => {
	if (params) {
		for (const key in params) {
			if (!params[key as keyof typeof params] || params[key as keyof typeof params] === undefined) {
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

const fetchQuestions = async ({ module_id }: { module_id: string }) => {
	return axios
		.get<HttpResponse<PaginatedResponse<NewQuestionProps>>>(endpoints().user.fetch_questions, {
			params: {
				module_id,
				page: 1,
				limit: 100,
			},
		})
		.then((res) => res.data);
};

export type SubmitQuizResp = {
	user_id: string;
	module: string;
	chapter: string;
	attempts: number;
	course: string;
	bench_mark: number;
	isDeleted: boolean;
	isBlocked: boolean;
	score: number;
	is_recorded: boolean;
	id: string;
	createdOn: string;
	updatedOn: string;
	is_passed: boolean;
	details: Array<{
		question: {
			id: string;
			number: number;
		};
		chosen_option: {
			id: string;
			content: string;
		};
		is_correct: boolean;
	}>;
	attempts_left: number;
	attempts_limit: number;
	chapter_name: string;
	module_name: string;
};
const submitQuiz = async (data: SubmitQuizDto) => {
	return axios
		.post<HttpResponse<SubmitQuizResp>>(endpoints().user.submit_quiz, data)
		.then((res) => res.data);
};

// GET MY PLANS
const getMyPlans = async () => {
	return axios
		.get<HttpResponse<PaginatedResponse<MyPlan>>>(endpoints().user.get_my_plans, {
			params: {
				limit: 15,
				page: 1,
			},
		})
		.then((res) => res.data);
};

// Get single plan
const getSinglePlan = async (id: string) => {
	return axios
		.get<HttpResponse<SinglePlan>>(endpoints(id).user.get_single_plan)
		.then((res) => res.data);
};

// renew plan
type RenewPlanResp = {
	authorization_url: string;
	access_code: string;
	reference: string;
	amount: number;
};
const renewPlan = async (id: string) => {
	return axios
		.put<HttpResponse<RenewPlanResp>>(endpoints(id).user.renew_plan)
		.then((res) => res.data);
};

type UpdateModulePayload = {
	course_id: string;
	current_progress: number;
	module_id: string;
};
const updateModuleProgress = async ({
	course_id,
	current_progress,
	module_id,
}: UpdateModulePayload) => {
	return axios
		.put<HttpResponse<null>>(endpoints(course_id).user.update_course_progress, {
			current_progress,
			module_id,
		})
		.then((res) => res.data);
};

export {
	fetchQuestions,
	getMyCourses,
	getMyPlans,
	getSinglePlan,
	getUpcomingEvents,
	renewPlan,
	startCourse,
	submitQuiz,
	updateModuleProgress,
	viewCourse,
	viewLeaderboard,
};
