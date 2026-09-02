import {
	RiArrowLeftLine,
	RiArticleLine,
	RiCalendarLine,
	RiShareForwardLine,
	RiTimeLine,
} from "@remixicon/react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";

import { DashboardLayout } from "@/components/layouts";
import { Seo, Spinner } from "@/components/shared";
import { useGetAllBlogs, useGetBlogBySlug } from "@/queries/blog";

const Page = () => {
	const router = useRouter();
	const slug = (router.query.id as string) || "";

	const { data: blogResponse, isLoading } = useGetBlogBySlug(slug);
	const { data: allBlogsResponse } = useGetAllBlogs();

	const article = blogResponse?.data;
	const relatedArticles = React.useMemo(() => {
		return (allBlogsResponse?.data || [])
			.filter((a) => a.id !== article?.id && a.slug !== slug)
			.slice(0, 3);
	}, [allBlogsResponse, article, slug]);

	const handleShare = () => {
		if (typeof window !== "undefined") {
			navigator.clipboard.writeText(window.location.href);
			toast.success("Article link copied to clipboard!");
		}
	};

	return (
		<>
			<Seo
				title={article?.title ? `${article.title} – Classore Blog` : "Blog Article – Classore"}
				description={article?.excerpt}
				noIndex
			/>
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-4 py-4 md:px-8 max-w-5xl mx-auto">
					{/* Back link */}
					<div className="flex items-center justify-between">
						<button
							onClick={() => router.push("/dashboard/blog")}
							className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition">
							<RiArrowLeftLine className="size-4" />
							Back to Articles
						</button>

						<button
							onClick={handleShare}
							className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-2xs hover:bg-neutral-50 transition">
							<RiShareForwardLine className="size-4 text-neutral-500" />
							Share Article
						</button>
					</div>

					{isLoading ? (
						<div className="flex items-center justify-center py-20">
							<Spinner size="lg" />
						</div>
					) : !article ? (
						<div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-200 py-20 text-center">
							<RiArticleLine className="size-10 text-neutral-300" />
							<p className="font-semibold text-neutral-800 text-sm">Article not found</p>
							<p className="text-xs text-neutral-500">The requested blog post could not be loaded.</p>
							<button
								onClick={() => router.push("/dashboard/blog")}
								className="mt-2 rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white">
								Return to Blog Feed
							</button>
						</div>
					) : (
						<article className="flex flex-col gap-6">
							{/* Header metadata */}
							<div className="flex flex-col gap-3">
								<div className="flex items-center gap-2 text-xs text-neutral-500">
									{article.category && (
										<span className="rounded-full bg-primary-50 border border-primary-100 px-3 py-1 text-xs font-bold text-primary-700 uppercase tracking-wider">
											{article.category}
										</span>
									)}
									<span className="flex items-center gap-1">
										<RiTimeLine className="size-3.5" />
										{article.reading_time || "4 min read"}
									</span>
									<span>•</span>
									<span className="flex items-center gap-1">
										<RiCalendarLine className="size-3.5" />
										{article.createdOn
											? format(new Date(article.createdOn), "MMMM d, yyyy")
											: "Recent"}
									</span>
								</div>

								<h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight">
									{article.title}
								</h1>

								{article.excerpt && (
									<p className="text-sm font-medium text-neutral-600 leading-relaxed">
										{article.excerpt}
									</p>
								)}
							</div>

							{/* Cover photo */}
							{article.cover_photo && (
								<div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-xs">
									<Image
										src={article.cover_photo}
										alt={article.title}
										fill
										className="object-cover"
										priority
									/>
								</div>
							)}

							{/* Article Body */}
							<div
								className="prose prose-neutral max-w-none text-neutral-800 text-sm leading-relaxed sm:text-base [&>p]:mb-4 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-semibold [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
								dangerouslySetInnerHTML={{ __html: article.article_body }}
							/>

							{/* Related Articles Footer */}
							{relatedArticles.length > 0 && (
								<div className="mt-10 border-t border-neutral-200 pt-8">
									<h3 className="text-lg font-bold text-neutral-900 mb-4">Related Insights</h3>
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
										{relatedArticles.map((rel) => (
											<Link
												key={rel.id}
												href={`/dashboard/blog/${rel.slug || rel.id}`}
												className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xs hover:shadow-md transition">
												<p className="text-[10px] font-bold text-primary-600 uppercase tracking-wider">
													{rel.category || "Article"}
												</p>
												<h4 className="font-bold text-neutral-900 group-hover:text-primary-600 transition text-xs mt-1 line-clamp-2">
													{rel.title}
												</h4>
												<p className="text-[11px] text-neutral-500 line-clamp-2 mt-1">
													{rel.excerpt}
												</p>
											</Link>
										))}
									</div>
								</div>
							)}
						</article>
					)}
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
