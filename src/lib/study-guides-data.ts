export type GuideCategory = "all" | "study tips" | "exam guides" | "updates";

import type { Article as ApiArticle } from "@/queries/blog";

export interface DisplayArticle {
	id: string;
	category: GuideCategory;
	title: string;
	excerpt: string;
	content: string;
	readTime: string;
	coverImage: string;
	author: {
		name: string;
		avatar?: string;
	};
	date: string;
}

export const mapApiToDisplay = (apiArticle: ApiArticle): DisplayArticle => ({
	id: apiArticle.id,
	category: (apiArticle.category || "study tips") as GuideCategory,
	title: apiArticle.title,
	excerpt: apiArticle.excerpt,
	content: apiArticle.article_body,
	readTime: apiArticle.reading_time || "5 min read",
	coverImage: apiArticle.cover_photo || "/placeholder.jpg",
	author: {
		name: "Classore Team",
	},
	date: apiArticle.createdOn || new Date().toISOString(),
});
