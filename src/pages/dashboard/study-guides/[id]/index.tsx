import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RiTimeLine, RiShareForwardLine } from "@remixicon/react";

import { DashboardLayout } from "@/components/layouts";
import { Seo, BackBtn } from "@/components/shared";
import { useGetBlog, useGetAllBlogs, useGetAllCategories, type BlogCategory } from "@/queries/blog";
import { mapApiToDisplay } from "@/lib/study-guides-data";

export default function StudyGuideArticlePage() {
	const router = useRouter();
	const { id } = router.query;

	// Fetch single article
	// const { data: blogResponse, isLoading } = useGetBlogBySlug(slug as string);
	const { data: blogResponse } = useGetBlog(id as string);

	// Map to display format - this is now a single article, not array
	// const article = blogResponse?.data ? mapApiToDisplay(blogResponse.data) : null;
	const article = blogResponse?.data ? mapApiToDisplay(blogResponse.data) : null;

	// For related articles, you need to fetch ALL articles and filter
	const { data: allBlogsResponse } = useGetAllBlogs();
	// const allArticles = allBlogsResponse?.data?.map(mapApiToDisplay) || [];
	const allArticles = React.useMemo(() => {
		const raw = allBlogsResponse?.data || [];
		return raw.map(mapApiToDisplay);
	}, [allBlogsResponse]);

	const { data: categoriesResponse } = useGetAllCategories();

	const categories = React.useMemo(() => {
		const raw = categoriesResponse;
		if (!raw) return [];
		return Array.isArray(raw) ? raw : (raw as any)?.data || [];
	}, [categoriesResponse]);

	const categoryMap = React.useMemo(
		() =>
			categories.reduce(
				(acc: Record<string, string>, cat: BlogCategory) => ({ ...acc, [cat.id]: cat.title }),
				{} as Record<string, string>
			),
		[categories]
	);

	const relatedArticles = React.useMemo(() => {
		if (!article) return [];
		return allArticles.filter((a) => a.id !== id && a.category === article.category).slice(0, 4);
	}, [allArticles, article, id]);

	if (!article) {
		return (
			<DashboardLayout>
				<div className="flex h-full items-center justify-center">
					<p className="text-neutral-500">Article not found.</p>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<>
			<Seo title={article.title} />
			<DashboardLayout className="px-0 pt-0 md:px-0">
				{/* Use inner container so the layout remains consistent but this page might need specific spacing */}
				<div className="flex w-full flex-col gap-6 px-4 pb-10 pt-6 md:px-8">
					{/* Header actions */}
					<div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-4">
							<BackBtn />
							<h1 className="text-lg font-bold text-neutral-900 md:text-2xl">{article.title}</h1>
						</div>

						<button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-50">
							<span>Share</span>
							<RiShareForwardLine className="size-4" />
						</button>
					</div>

					{/* Breadcrumbs */}
					<div className="flex items-center gap-2 text-sm text-neutral-400">
						<Link href="/dashboard" className="transition-colors hover:text-neutral-700">
							Home
						</Link>
						<span>/</span>
						<Link href="/dashboard/study-guides" className="transition-colors hover:text-neutral-700">
							Study Guides & Tips
						</Link>
					</div>

					{/* Main Grid Layout */}
					<div className="mt-4 flex flex-col gap-8 xl:flex-row">
						{/* Left Content Area */}
						<div className="flex flex-1 flex-col font-body">
							{/* Hero Image */}
							<div className="relative h-[250px] w-full overflow-hidden rounded-2xl md:h-[400px]">
								<Image
									src={article.coverImage}
									alt={article.title}
									fill
									className="object-cover"
									priority
								/>
							</div>
							<span className="text-sm font-medium capitalize text-primary-300">
								{categoryMap[article.category] || article.category}
							</span>

							<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">{article.title}</h2>
								<div className="flex shrink-0 items-center gap-2 self-start rounded-full bg-neutral-100 px-4 py-1.5 text-sm text-neutral-600 sm:self-auto">
									<RiTimeLine className="size-4" />
									<span>{article.readTime}</span>
								</div>
							</div>

							{/* Article Body */}
							<div
								className="prose prose-neutral mt-8 max-w-none prose-headings:font-bold prose-headings:text-neutral-900 prose-p:leading-relaxed prose-p:text-neutral-600 prose-a:text-primary-300 hover:prose-a:text-primary-400"
								dangerouslySetInnerHTML={{ __html: article.content }}
							/>
						</div>

						{/* Right Sidebar - Related Articles */}
						<div className="w-full shrink-0 xl:w-[350px]">
							<h3 className="mb-6 text-lg font-semibold text-neutral-900">Related Articles</h3>
							<div className="flex flex-col gap-4">
								{relatedArticles.map((related) => (
									<Link
										key={related.id}
										href={`/dashboard/study-guides/${related.id}`}
										className="group flex gap-4 rounded-xl border border-neutral-100 bg-white p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-100 hover:shadow-md">
										<div className="relative h-[85px] w-[120px] shrink-0 overflow-hidden rounded-lg">
											<Image
												src={related.coverImage}
												alt={related.title}
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										</div>
										<div className="flex flex-col py-1">
											<h4 className="line-clamp-2 text-sm font-semibold text-neutral-900 transition-colors group-hover:text-primary-300">
												{related.title}
											</h4>
											<p className="mt-1 line-clamp-2 text-xs text-neutral-500">{related.excerpt}</p>
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
