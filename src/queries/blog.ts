import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

// Match the API response structure exactly
export interface Article {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	article_body: string;
	category: string;
	cover_photo: string;
	reading_time?: string;
	createdOn: string;
}

// API response wrapper (matches admin's HttpResponse type)
export interface BlogResponse {
	error: string;
	data: Article[];
	message: string;
	success: boolean;
}

export interface SingleBlogResponse {
	error: string;
	data: Article;
	message: string;
	success: boolean;
}

export interface BlogCategory {
	id: string;
	title: string;
	createdOn: string;
	updatedOn: string;
}

/**
 * Resolves a category ID or title to a human-readable title.
 * Prevents displaying raw UUIDs to users if no matching category exists.
 */
export const resolveCategoryTitle = (
	categoryIdOrTitle: string | undefined | null,
	categories: BlogCategory[] = []
): string => {
	if (!categoryIdOrTitle) return "";
	const trimmed = categoryIdOrTitle.trim();

	// Check if matching by ID
	const byId = categories.find((c) => c.id?.toLowerCase() === trimmed.toLowerCase());
	if (byId) return byId.title;

	// Check if already a category title
	const byTitle = categories.find((c) => c.title?.toLowerCase() === trimmed.toLowerCase());
	if (byTitle) return byTitle.title;

	// If it is a raw UUID and wasn't found in categories, suppress showing the ugly UUID
	const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(trimmed);
	if (isUuid) return "";

	return trimmed;
};

/**
 * Normalizes reading time into an explicit, human-readable string.
 * e.g. "5" -> "5 min read"
 *      "5 min" -> "5 min read"
 *      "5 min read" -> "5 min read"
 */
export const formatReadingTime = (readingTime?: string | number | null): string => {
	if (!readingTime) return "5 min read";
	const raw = String(readingTime).trim();
	if (!raw) return "5 min read";

	if (raw.toLowerCase().includes("read")) {
		return raw;
	}

	if (/mins?/i.test(raw)) {
		return `${raw} read`;
	}

	return `${raw} min read`;
};

// Fetch all blogs
const GetAllBlogs = async () => {
	const response = await axios.get<BlogResponse>("/blog/all-blogs");
	return response.data;
};

// Fetch single blog by slug
const GetBlogBySlug = async (slug: string) => {
	const response = await axios.get<SingleBlogResponse>(`/blog/${slug}`);
	return response.data;
};

const GetBlog = async (blogId: string) => {
	const response = await axios.get<SingleBlogResponse>(`/blog/${blogId}`);
	return response.data;
};

export interface BlogCategoryResponse {
	error?: string;
	data?: BlogCategory[];
	message?: string;
	success?: boolean;
}

const GetAllCategories = async (): Promise<BlogCategory[]> => {
	const response = await axios.get<BlogCategory[] | BlogCategoryResponse>(`/blog-categories/all-blog-category`);
	const resData = response.data;
	if (Array.isArray(resData)) {
		return resData;
	}
	if (resData && Array.isArray((resData as BlogCategoryResponse).data)) {
		return (resData as BlogCategoryResponse).data as BlogCategory[];
	}
	return [];
};

// React Query hooks for use in components
export const useGetAllBlogs = () => {
	return useQuery({
		queryKey: ["blogs"],
		queryFn: GetAllBlogs,
		retry: false,
	});
};

export const useGetAllCategories = () => {
	return useQuery({
		queryKey: ["blog-categories"],
		queryFn: GetAllCategories,
		retry: false,
	});
};

export const useGetBlogBySlug = (slug: string) => {
	return useQuery({
		queryKey: ["blog", slug],
		queryFn: () => GetBlogBySlug(slug),
		enabled: !!slug,
		retry: false,
	});
};

export const useGetBlog = (blogId: string | undefined) => {
	return useQuery({
		queryKey: ["blog", blogId],
		queryFn: () => GetBlog(blogId as string),
		enabled: !!blogId,
		retry: false,
	});
};
