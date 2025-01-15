import { endpoints } from "@/config"
import { axios } from "@/lib"
import type { HttpResponse, PaginatedResponse } from "@/types"
import { useQuery } from "@tanstack/react-query"

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
	chapter_id?: string
	chapter_name?: string
}>
type Params = {
	status?: string
}
const getMyCourses = async (params: Params) => {
	return axios
		.get<HttpResponse<MyCoursesResp>>(endpoints().school.get_my_courses, { params })
		.then((res) => res.data)
}
export const useGetMyCourses = (params: Params) => {
	return useQuery({
		queryKey: ["my-courses", { params }],
		queryFn: () => getMyCourses(params),
		select: (data) => data.data,
	})
}
