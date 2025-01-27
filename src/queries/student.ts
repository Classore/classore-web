import { endpoints } from "@/config"
import { axios } from "@/lib"
import type { HttpResponse, PaginatedResponse, PaginationProps, UserProfileResp } from "@/types"
import { useQuery } from "@tanstack/react-query"

// <-- PROFILE -->
const getProfile = async () => {
	return axios.get<HttpResponse<UserProfileResp>>(endpoints().auth.profile).then((res) => res.data)
}
export const useGetProfile = () => {
	return useQuery({
		queryKey: ["profile"],
		queryFn: getProfile,
		staleTime: Infinity,
		gcTime: Infinity,
		select: (data) => data.data,
	})
}

export type MyCoursesResp = PaginatedResponse<{
	course_id: string
	course_createdOn: string
	course_user_id: string
	course_subject_id: string
	course_chosen_bundle: string
	course_progress: number
	course_status: string
	course_current_chapter?: string
	course_current_progress_percentage: number
	subject_id: string
	subject_name: string
	examBundle_id: string
	examBundle_name: string
	examBundle_start_date: string
	examBundle_end_date: string
	subject_description: string
	chapter_id?: string
	chapter_name?: string
	no_of_videos: number
	no_of_attachments: number
	examBundle_banner: string
}>
type Params = Partial<
	PaginationProps & {
		status: "PENDING" | "ONGOING" | "COMPLETED"
		examination_bundle: string
		examination: string
	}
>
const getMyCourses = async (params: Params) => {
	return axios
		.get<HttpResponse<MyCoursesResp>>(endpoints().student.get_my_courses, {
			params: {
				...params,
				...(params?.status && { status: params.status }),
				...(params?.examination_bundle && { examination_bundle: params.examination_bundle }),
				...(params?.examination && { examination: params.examination }),
			},
		})
		.then((res) => res.data)
}
export const useGetMyCourses = (params: Params) => {
	return useQuery({
		queryKey: ["my-courses", { params }],
		queryFn: () => getMyCourses(params),
		select: (data) => data.data,
	})
}

// <-- UPCOMING EVENTS -->
type EventParams = Partial<{
	timeline: "THIS_MONTH" | "THIS_WEEK" | "THIS_YEAR" | "TODAY"
	month: number
}>
export type EventsResp = Array<{
	date: string
	day: number
	events: Array<{
		id: string
		createdOn: string
		category_id: {
			id: string
			name: string
		}
		sub_category: {
			id: string
			name: string
		}
		subject: {
			id: string
			name: string
		}
		event_day: number
		date: string
		start_hour: number
		end_hour: number
		is_active: boolean
		title: string
	}>
}>
const getUpcomingEvents = async (params: EventParams) => {
	return axios
		.get<HttpResponse<MyCoursesResp>>(endpoints().student.get_upcoming_events, {
			params: {
				...(params?.month && { examination_bundle: params.month }),
				...(params?.timeline && { examination: params.timeline }),
			},
		})
		.then((res) => res.data)
}
export const useGetUpcomingEvents = (params: EventParams) => {
	return useQuery({
		queryKey: ["upcoming-events", { params }],
		queryFn: () => getUpcomingEvents(params),
		select: (data) => data.data,
	})
}
