import { useQuery } from "@tanstack/react-query";

import type { TestCenterProps, TestCenterDetailProps, TestQuestionsProps } from "@/types/test";
import type { HttpResponse, PaginatedResponse, PaginationProps } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

export interface TestSubmissionPayload {
	test_id: string;
	answers: TestAnswerDto[];
}

export interface TestAnswerDto {
	question: string;
	option?: string;
	input_content?: string;
	media_upload?: File | null;
}

const getTests = async (params?: PaginationProps & { search?: string }) => {
	if (params) {
		for (const key in params) {
			if (!params[key as keyof typeof params] || params[key as keyof typeof params] === undefined) {
				delete params[key as keyof typeof params];
			}
		}
	}
	return axios
		.get<HttpResponse<PaginatedResponse<TestCenterProps>>>(endpoints().test_center.get_all, {
			params,
		})
		.then((res) => res.data);
};

export const useGetTests = (params?: PaginationProps & { search?: string }) => {
	return useQuery({
		queryKey: ["get-tests", { params }],
		queryFn: () => getTests(params),
		staleTime: Infinity,
		gcTime: Infinity,
		select: (data) => data.data,
	});
};

const getSections = async (id: string) => {
	return axios
		.get<HttpResponse<TestCenterDetailProps>>(endpoints(id).test_center.get_one)
		.then((res) => res.data);
};

export const useGetSections = (id: string) => {
	return useQuery({
		queryKey: ["get-sections", id],
		queryFn: () => getSections(id),
		staleTime: Infinity,
		gcTime: Infinity,
		select: (data) => data.data,
	});
};

const getQuestions = async (sectionId: string, params?: PaginationProps) => {
	if (params) {
		for (const key in params) {
			if (!params[key as keyof typeof params] || params[key as keyof typeof params] === undefined) {
				delete params[key as keyof typeof params];
			}
		}
	}
	return axios
		.get<
			HttpResponse<PaginatedResponse<TestQuestionsProps>>
		>(endpoints(sectionId).test_center.get_questions, { params })
		.then((res) => res.data);
};

export const useGetQuestions = (sectionId: string, params?: PaginationProps) => {
	return useQuery({
		queryKey: ["get-questions", sectionId, { params }],
		queryFn: () => getQuestions(sectionId, params),
		enabled: !!sectionId,
		staleTime: Infinity,
		gcTime: Infinity,
		select: (data) => data.data,
	});
};

const submitTest = async (payload: TestSubmissionPayload) => {
	const formData = new FormData();
	formData.append("test_id", payload.test_id);
	payload.answers.forEach((answer, index) => {
		formData.append(`answers[${index}][question]`, answer.question);
		if (answer.input_content) {
			formData.append(`answers[${index}][input_content]`, answer.input_content);
		}
		if (answer.media_upload) {
			formData.append(`answers[${index}][media_upload]`, answer.media_upload);
		}
		if (answer.option) {
			formData.append(`answers[${index}][option]`, answer.option);
		}
	});
	return axios.post<HttpResponse<string>>(endpoints().test_center.submit, formData);
};

export { getQuestions, getSections, getTests, submitTest };
