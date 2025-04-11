import { endpoints } from "@/config";
import { axios } from "@/lib";
import type {
	HttpResponse,
	PaginatedResponse,
	PaginationProps,
	SingleCourseResp,
	UserProfileResp,
} from "@/types";
import { skipToken, useQuery } from "@tanstack/react-query";

// <-- PROFILE -->
const getProfile = async () => {
	return axios.get<HttpResponse<UserProfileResp>>(endpoints().auth.profile).then((res) => res.data);
};
export const useGetProfile = () => {
	return useQuery({
		queryKey: ["profile"],
		queryFn: getProfile,
		staleTime: Infinity,
		gcTime: Infinity,
		select: (data) => data.data,
	});
};

export type MyCoursesResp = PaginatedResponse<{
	course_id: string;
	course_createdOn: string;
	course_user_id: string;
	course_subject_id: string;
	course_chosen_bundle: string;
	course_progress: number;
	course_status: string;
	course_current_chapter?: string;
	course_current_progress_percentage: number;
	subject_id: string;
	subject_name: string;
	subject_banner: string;
	examBundle_id: string;
	examBundle_name: string;
	examBundle_start_date: string;
	examBundle_end_date: string;
	subject_description: string;
	chapter_id?: string;
	chapter_name?: string;
	no_of_videos: number;
	no_of_attachments: number;
	examBundle_banner: string;
	total_hours: number;
}>;
type Params = Partial<
	PaginationProps & {
		status: "PENDING" | "ONGOING" | "COMPLETED";
		examination_bundle: string;
		examination: string;
	}
>;
const getMyCourses = async (params: Params) => {
	return axios
		.get<HttpResponse<MyCoursesResp>>(endpoints().student.get_my_courses, {
			params: {
				...params,
				...(params?.status && { status: params.status }),
				...(params?.examination_bundle && {
					examination_bundle: params.examination_bundle,
				}),
				...(params?.examination && { examination: params.examination }),
			},
		})
		.then((res) => res.data);
};
export const useGetMyCourses = (params: Params) => {
	return useQuery({
		queryKey: ["my-courses", { params }],
		queryFn: () => getMyCourses(params),
		select: (data) => data.data,
	});
};

// <-- GET COURSE -->
const getCourse = async (id: string) => {
	return axios
		.get<HttpResponse<SingleCourseResp>>(endpoints(id).student.get_course)
		.then((res) => res.data);
};
export const useGetCourse = ({
	course_id,
	enabled,
	refetchIntervalInBackground,
	refetchInterval,
}: {
	course_id: string;
	enabled?: boolean;
	refetchIntervalInBackground?: boolean;
	refetchInterval?: number;
}) => {
	return useQuery({
		queryKey: ["course", { course_id }],
		queryFn: () => getCourse(course_id),
		select: (data) => data.data,
		enabled,
		refetchIntervalInBackground,
		refetchInterval,
	});
};

// <-- GET SINGLE COURSE -->
const getChapter = async (id: string) => {
	return axios
		.get<HttpResponse<SingleCourseResp["chapters"][number]>>(endpoints(id).student.get_chapter)
		.then((res) => res.data);
};
export const useGetChapter = ({
	chapter_id,
	enabled,
	refetchIntervalInBackground,
	refetchInterval,
}: {
	chapter_id: string;
	enabled?: boolean;
	refetchIntervalInBackground?: boolean;
	refetchInterval?: number;
}) => {
	return useQuery({
		queryKey: ["chapter", { chapter_id }],
		queryFn: chapter_id ? () => getChapter(chapter_id) : skipToken,
		select: (data) => data.data,
		enabled,
		staleTime: 10 * 1000, // 10 seconds
		gcTime: 10 * 1000, // 10 seconds
		refetchIntervalInBackground,
		refetchInterval,
	});
};

// <-- UPCOMING EVENTS -->
type EventParams = Partial<{
	timeline: "THIS_MONTH" | "THIS_WEEK" | "THIS_YEAR" | "TODAY";
	month: number;
}>;
export type EventsResp = Array<{
	date: string;
	day: number;
	events: Array<{
		id: string;
		createdOn: string;
		category_id: {
			id: string;
			name: string;
		};
		sub_category: {
			id: string;
			name: string;
		};
		subject: {
			id: string;
			name: string;
		};
		event_day: number;
		date: string;
		start_hour: number;
		end_hour: number;
		is_active: boolean;
		title: string;
	}>;
}>;
const getUpcomingEvents = async (params: EventParams) => {
	return axios
		.get<HttpResponse<MyCoursesResp>>(endpoints().student.get_upcoming_events, {
			params: {
				...(params?.month && { examination_bundle: params.month }),
				...(params?.timeline && { examination: params.timeline }),
			},
		})
		.then((res) => res.data);
};
export const useGetUpcomingEvents = (params: EventParams) => {
	return useQuery({
		queryKey: ["upcoming-events", { params }],
		queryFn: () => getUpcomingEvents(params),
		select: (data) => data.data,
	});
};

// <-- LEADER BOARD -->
type LeaderboardResp = PaginatedResponse<{
	leaderboard_id: string;
	leaderboard_user: string;
	leaderboard_points: number;
	leaderboard_examination: string;
	leaderboard_examination_bundle: string;
	user_id: string;
	user_first_name: string;
	user_last_name: string;
	user_email: string;
	user_profile_image: null;
}>;
type LeaderboardParams = Partial<
	PaginationProps & {
		examination: string;
		examination_bundle: string;
	}
>;
const getLeaderboard = async (params: LeaderboardParams) => {
	return axios
		.get<HttpResponse<LeaderboardResp>>(endpoints().student.get_leaderboard, {
			params: {
				...params,
				...(params?.examination && { examination_bundle: params.examination }),
				...(params?.examination_bundle && {
					examination: params.examination_bundle,
				}),
			},
		})
		.then((res) => res.data);
};
export const useGetLeaderboard = (params: LeaderboardParams) => {
	return useQuery({
		queryKey: ["leaderboard", { params }],
		queryFn: () => getLeaderboard(params),
		select: (data) => data.data,
	});
};
