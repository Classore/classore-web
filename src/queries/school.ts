import { endpoints } from "@/config"
import { axios } from "@/lib"
import type { HttpResponse, PaginatedResponse } from "@/types"
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"

const params = {
	page: 1,
	limit: 100, // am using this apis in a select field, so i need everything
}

type ExamsResp = PaginatedResponse<{
	examination_id: string
	examination_name: string
}>
const getExams = async () => {
	return axios
		.get<HttpResponse<ExamsResp>>(endpoints().school.get_exams, { params })
		.then((res) => res.data)
}
export const getExamsQueryOptions = queryOptions({
	queryKey: ["exams"],
	queryFn: getExams,
	staleTime: Infinity,
	gcTime: Infinity,
	select: (data) => data.data.data,
})
export const useGetExams = () => {
	return useQuery(getExamsQueryOptions)
}

// <-- GET EXAM BUNDLES -->
type ExamBundlesResp = PaginatedResponse<{
	examinationbundle_id: string
	examinationbundle_name: string
	examinationbundle_amount: number
	examinationbundle_start_date: string
	examinationbundle_end_date: string
	examination_name: string
	examinationbundle_examination: string
	subject_count: number
}>
const getExamBundles = async () => {
	return axios
		.get<HttpResponse<ExamBundlesResp>>(endpoints().school.get_exam_bundles, { params })
		.then((res) => res.data)
}
export const getExamBundlesQueryOptions = queryOptions({
	queryKey: ["exam-bundles"],
	queryFn: getExamBundles,
	staleTime: Infinity,
	gcTime: Infinity,
	select: (data) => data.data.data,
})
export const useGetExamBundles = () => {
	return useQuery(getExamBundlesQueryOptions)
}

// <-- GET SUBJECTS -->
type SubjectsResp = PaginatedResponse<{
	subject_id: string
	subject_name: string
	subject_class: string
	subject_examination: string
	subject_examination_bundle: string
}>
const getSubjects = async () => {
	return axios
		.get<HttpResponse<SubjectsResp>>(endpoints().school.get_subjects, { params })
		.then((res) => res.data)
}
export const getSubjectsQueryOptions = queryOptions({
	queryKey: ["subjects"],
	queryFn: getSubjects,
	staleTime: Infinity,
	gcTime: Infinity,
	select: (data) => data.data.data,
})
export const useGetSubjects = () => {
	return useQuery(getSubjectsQueryOptions)
}

// <-- GET CLASSES -->
type ClassesResp = PaginatedResponse<{
	class_id: string
	class_name: string
	class_level: number
}>
const getClasses = async () => {
	return axios
		.get<HttpResponse<ClassesResp>>(endpoints().school.get_classes, { params })
		.then((res) => res.data)
}
export const useGetClasses = () => {
	return useQuery({
		queryKey: ["classes"],
		queryFn: getClasses,
		staleTime: Infinity,
		gcTime: Infinity,
		select: (data) => data.data.data,
	})
}

// <-- CREATE STUDY TIMELINE -->
type StudyTimelinePayload = {
	exam_type: string
	chosen_bundle: string
	subjects: Array<string>
}
type StudyTimelineResp = {
	payment_link: {
		authorization_url: string
		access_code: string
		reference: string
	}
}
const createStudyTimeline = async (payload: StudyTimelinePayload) => {
	return axios
		.post<HttpResponse<StudyTimelineResp>>(endpoints().school.create_study_timeline, payload)
		.then((res) => res.data)
}
export const useCreateStudyTimeline = () => {
	return useMutation({
		mutationKey: ["create-study-timeline"],
		mutationFn: createStudyTimeline,
		onSuccess: (data) => {
			toast.success(data.message)
		},
	})
}
