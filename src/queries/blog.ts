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

const GetAllCategories = async () => {
	const response = await axios.get<BlogCategory[]>(`/blog-categories/all-blog-category`);
	return response.data;
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
