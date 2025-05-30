import { queryOptions, skipToken, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import type { HttpResponse, PaginatedResponse, SingleBundleResp } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

const params = {
	page: 1,
	limit: 100, // am using this apis in a select field, so i need everything
};

type ExamsResp = PaginatedResponse<{
	examination_id: string;
	examination_name: string;
}>;
const getExams = async () => {
	return axios
		.get<HttpResponse<ExamsResp>>(endpoints().school.get_exams, { params })
		.then((res) => res.data);
};
export const getExamsQueryOptions = queryOptions({
	queryKey: ["exams"],
	queryFn: getExams,
	staleTime: Infinity,
	gcTime: Infinity,
	select: (data) => data.data.data,
});
export const useGetExams = () => {
	return useQuery(getExamsQueryOptions);
};

// <-- GET EXAM BUNDLES -->
export type ExamBundlesResp = PaginatedResponse<{
	examinationbundle_id: string;
	examinationbundle_examination: string;
	examinationbundle_name: string;
	examinationbundle_amount: number;
	examinationbundle_start_date: Date | string;
	examinationbundle_end_date: Date | string;
	examinationbundle_allowed_subjects: number;
	examinationbundle_max_subjects: number;
	examinationbundle_extra_charge: number;
	examinationbundle_amount_per_subject: number;
	examinationbundle_allow_extra_subjects: string;
	examinationbundle_rating: number;
	examination_name: string;
	examinationbundle_banner: string;
	subject_count: number;
	enrolled: number;
	raters: number;
}>;
type Params = Partial<
	typeof params & {
		search: string;
		examination: string;
		is_popular: boolean;
	}
>;
const getExamBundles = async (params: Params) => {
	if (params) {
		Object.keys(params).forEach((key) => {
			if (
				!params[key as keyof Params] ||
				String(params[key as keyof Params]).toLowerCase() === "all"
			) {
				delete params[key as keyof Params];
			}
		});
	}
	return axios
		.get<HttpResponse<ExamBundlesResp>>(endpoints().school.get_exam_bundles, {
			params,
		})
		.then((res) => res.data);
};
export const useGetExamBundles = (params: Params) => {
	return useQuery({
		queryKey: ["exam-bundles", { params }],
		queryFn: () => getExamBundles(params),
		staleTime: Infinity,
		gcTime: Infinity,
		select: (data) => data.data,
	});
};

// <-- GET SUBJECTS -->
type SubjectsResp = PaginatedResponse<{
	subject_id: string;
	subject_name: string;
	subject_class: string;
	subject_examination: string;
	subject_examination_bundle: string;
}>;
const getSubjects = async () => {
	return axios
		.get<HttpResponse<SubjectsResp>>(endpoints().school.get_subjects, { params })
		.then((res) => res.data);
};
export const getSubjectsQueryOptions = queryOptions({
	queryKey: ["subjects"],
	queryFn: getSubjects,
	staleTime: Infinity,
	gcTime: Infinity,
	select: (data) => data.data.data,
});
export const useGetSubjects = () => {
	return useQuery(getSubjectsQueryOptions);
};

// GET A SUBJECT
type SubjectResp = {
	subject_id: string;
	subject_name: string;
	subject_class: string;
	subject_examination: string;
	subject_examination_bundle: string;
};
const getSubject = async (id: string) => {
	return axios
		.get<HttpResponse<SubjectResp>>(endpoints(id).school.get_subject)
		.then((res) => res.data);
};
export const useGetSubject = (id: string) => {
	return useQuery({
		queryKey: ["subject", { id }],
		queryFn: () => getSubject(id),
		select: (data) => data.data,
		staleTime: Infinity,
		gcTime: Infinity,
	});
};

// <-- GET CLASSES -->
type ClassesResp = PaginatedResponse<{
	class_id: string;
	class_name: string;
	class_level: number;
}>;
const getClasses = async () => {
	return axios
		.get<HttpResponse<ClassesResp>>(endpoints().school.get_classes, { params })
		.then((res) => res.data);
};
export const useGetClasses = () => {
	return useQuery({
		queryKey: ["classes"],
		queryFn: getClasses,
		staleTime: Infinity,
		gcTime: Infinity,
		select: (data) => data.data.data,
	});
};

// <-- CREATE STUDY TIMELINE -->
type StudyTimelinePayload = {
	exam_type: string;
	chosen_bundle: string;
	subjects: Array<string>;
};
type StudyTimelineResp = {
	payment_link: {
		authorization_url: string;
		access_code: string;
		reference: string;
	};
};
const createStudyTimeline = async (payload: StudyTimelinePayload) => {
	return axios
		.post<HttpResponse<StudyTimelineResp>>(endpoints().school.create_study_timeline, payload)
		.then((res) => res.data);
};
export const useCreateStudyTimeline = () => {
	return useMutation({
		mutationKey: ["create-study-timeline"],
		mutationFn: createStudyTimeline,
		onSuccess: () => {},
	});
};

// <-- VET STUDY PACK -->
type VetStudyPackPayload = {
	vettings: Array<{
		chosen_bundle: string;
		subject_length: number;
	}>;
};
type VetStudyPackResp = {
	summary: {
		base_amount: number;
		number_of_extra_subjects_added: number;
		grand_total: number;
	};
	vettings: Array<{
		base_amount: number;
		allowed_subjects: number;
		allow_extra_subjects: string;
		number_of_extra_subjects_added: number;
		grand_total: number;
	}>;
};
const vetStudyPack = async (payload: VetStudyPackPayload) => {
	return axios
		.post<HttpResponse<VetStudyPackResp>>(endpoints().school.vet_study_pack, payload)
		.then((res) => res.data);
};
export const useVetStudyPack = () => {
	return useMutation({
		mutationKey: ["vet-study-pack"],
		mutationFn: vetStudyPack,
		onSuccess: () => {
			// fake
			toast.success("Your study timeline has been created!");
		},
	});
};

// <-- GET SINGLE BUNDLE -->
const getExamBundle = async (id: string) => {
	return axios
		.get<HttpResponse<SingleBundleResp>>(endpoints(id).school.get_single_exam_bundle)
		.then((res) => res.data);
};
export const useGetSingleExamBundleQuery = ({ bundle_id }: { bundle_id: string }) => {
	return useQuery({
		queryKey: ["exam-bundle", { bundle_id }],
		queryFn: bundle_id ? () => getExamBundle(bundle_id) : skipToken,
		staleTime: Infinity,
		gcTime: Infinity,
		select: (data) => data.data,
	});
};

// <-- PAYMENT CALLBACK -->
export interface PaymentCallbackDto {
	event: "charge.success";
	data: {
		metadata: {
			narration_id: string;
			narration: "RESERVATION";
		};
		reference: string;
	};
}
export const paymentCallback = async (payload: PaymentCallbackDto) => {
	return axios
		.post<HttpResponse<null>>(endpoints().school.payment_callback, payload)
		.then((res) => res.data);
};

// <----- REVIEWS ------->
export interface CreateReviewDto {
	id: string;
	purpose: "EXAMINATION" | "EXAM_BUNDLE" | "COURSE";
	rating: number;
	comment: string;
}
export const createReview = async (payload: CreateReviewDto) => {
	return axios
		.post<HttpResponse<string>>(endpoints().school.create_review, payload)
		.then((res) => res.data);
};
