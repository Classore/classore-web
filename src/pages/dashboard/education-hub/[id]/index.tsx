import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RiTimeLine, RiShareForwardLine, RiArticleLine } from "@remixicon/react";
import { format, isValid } from "date-fns";

import { DashboardLayout } from "@/components/layouts";
import { Seo, BackBtn } from "@/components/shared";
import { useGetBlog, useGetAllBlogs, useGetAllCategories, type BlogCategory } from "@/queries/blog";
import { mapApiToDisplay } from "@/lib/study-guides-data";

const formatDate = (dateStr?: string) => {
	if (!dateStr) return "";
	try {
		const d = new Date(dateStr);
		return isValid(d) ? format(d, "MMM d, yyyy") : "";
	} catch {
		return "";
	}
};

const ArticleSkeleton = () => (
	<div className="flex w-full flex-col gap-6 px-4 pb-10 pt-6 md:px-8 animate-pulse">
		{/* Header actions skeleton */}
		<div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
			<div className="flex items-center gap-4">
				<div className="size-9 rounded-lg bg-neutral-100" />
				<div className="h-6 w-48 rounded-lg bg-neutral-100" />
			</div>
			<div className="h-9 w-24 rounded-lg bg-neutral-100" />
		</div>

		{/* Breadcrumbs skeleton */}
		<div className="flex items-center gap-2">
			<div className="h-4 w-12 rounded bg-neutral-100" />
			<span className="text-neutral-200">/</span>
			<div className="h-4 w-24 rounded bg-neutral-100" />
		</div>

		{/* Main Grid Layout */}
		<div className="mt-4 flex flex-col gap-8 xl:flex-row">
			{/* Left Content Area */}
			<div className="flex flex-1 flex-col">
				{/* Hero Image */}
				<div className="h-[250px] w-full rounded-2xl bg-neutral-100 md:h-[400px]" />

				{/* Category */}
				<div className="mt-4 h-4 w-28 rounded bg-neutral-100" />

				{/* Title and Time */}
				<div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="h-8 w-3/4 rounded-lg bg-neutral-100" />
					<div className="h-7 w-32 rounded-full bg-neutral-100" />
				</div>

				{/* Body Paragraphs */}
				<div className="mt-8 space-y-3">
					<div className="h-4 w-full rounded bg-neutral-100" />
					<div className="h-4 w-[95%] rounded bg-neutral-100" />
					<div className="h-4 w-[90%] rounded bg-neutral-100" />
					<div className="h-4 w-[85%] rounded bg-neutral-100" />
					<div className="h-4 w-full rounded bg-neutral-100 pt-2" />
					<div className="h-4 w-[92%] rounded bg-neutral-100" />
					<div className="h-4 w-[88%] rounded bg-neutral-100" />
				</div>
			</div>

			{/* Right Sidebar - Related Articles */}
			<div className="w-full shrink-0 xl:w-[350px]">
				<div className="mb-6 h-6 w-36 rounded bg-neutral-100" />
				<div className="flex flex-col gap-4">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className="flex gap-4 rounded-xl border border-neutral-100 bg-white p-3 shadow-xs">
							<div className="h-[85px] w-[120px] shrink-0 rounded-lg bg-neutral-100" />
							<div className="flex flex-1 flex-col justify-center gap-2 py-1">
								<div className="h-4 w-full rounded bg-neutral-100" />
								<div className="h-3 w-3/4 rounded bg-neutral-100" />
								<div className="h-3 w-1/2 rounded bg-neutral-100" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
);

export default function EducationHubArticlePage() {
	const router = useRouter();
	const { id } = router.query;

	const { data: blogResponse, isLoading } = useGetBlog(id as string);
	const isPageLoading = !router.isReady || (isLoading && !blogResponse);
	const article = blogResponse?.data ? mapApiToDisplay(blogResponse.data) : null;

	const { data: allBlogsResponse } = useGetAllBlogs();
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

	if (isPageLoading) {
		return (
			<>
				<Seo title="Loading Article – Classore Education Hub" />
				<DashboardLayout className="px-0 pt-0 md:px-0">
					<ArticleSkeleton />
				</DashboardLayout>
			</>
		);
	}

	if (!article) {
		return (
			<>
				<Seo title="Article Not Found – Classore Education Hub" />
				<DashboardLayout className="px-0 pt-0 md:px-0">
					<div className="flex w-full flex-col items-center justify-center gap-4 px-4 py-24 text-center">
						<div className="flex size-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
							<RiArticleLine className="size-7" />
						</div>
						<div className="max-w-sm">
							<h2 className="text-lg font-bold text-neutral-900">Article not found</h2>
							<p className="mt-1 text-xs text-neutral-500">
								The study guide you're looking for could not be found or may have been removed.
							</p>
						</div>
						<Link
							href="/dashboard/education-hub"
							className="mt-2 rounded-xl bg-primary-500 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-primary-600">
							Back to Education Hub
						</Link>
					</div>
				</DashboardLayout>
			</>
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
						<Link href="/dashboard/education-hub" className="transition-colors hover:text-neutral-700">
							Education Hub
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
							<span className="text-sm font-medium capitalize text-primary-300 mt-6">
								{categoryMap[article.category] || article.category}
							</span>

							<div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">{article.title}</h2>
								<div className="flex shrink-0 items-center gap-2 self-start rounded-full bg-neutral-100 px-4 py-1.5 text-sm text-neutral-600 sm:self-auto">
									<div className="flex items-center gap-1.5">
										<RiTimeLine className="size-4" />
										<span>{article.readTime}</span>
									</div>
									{formatDate(article.date) ? (
										<>
											<span>•</span>
											<span>{formatDate(article.date)}</span>
										</>
									) : null}
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
								{relatedArticles.map((related) => {
									const relatedFormattedDate = formatDate(related.date);

									return (
										<Link
											key={related.id}
											href={`/dashboard/education-hub/${related.id}`}
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
												{relatedFormattedDate ? (
													<span className="mt-1.5 text-[11px] text-neutral-400">
														{relatedFormattedDate}
													</span>
												) : null}
											</div>
										</Link>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
