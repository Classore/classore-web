import {
	RiArrowLeftLine,
	RiArticleLine,
	RiCalendarLine,
	RiFacebookFill,
	RiFileCopyLine,
	RiShareForwardLine,
	RiTimeLine,
	RiTwitterXFill,
	RiWhatsappFill,
} from "@remixicon/react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";

import { Footer, Navbar, Seo, Spinner } from "@/components/shared";
import {
	useGetAllBlogs,
	useGetAllCategories,
	useGetBlogBySlug,
	resolveCategoryTitle,
	formatReadingTime,
	type BlogCategory,
} from "@/queries/blog";

const ArticleDetailPage = () => {
	const router = useRouter();
	const slug = (router.query.id as string) || "";

	const { data: blogResponse, isLoading } = useGetBlogBySlug(slug);
	const { data: allBlogsResponse } = useGetAllBlogs();
	const { data: categoriesData } = useGetAllCategories();

	const categories = React.useMemo<BlogCategory[]>(() => {
		if (!categoriesData) return [];
		if (Array.isArray(categoriesData)) return categoriesData;
		if (Array.isArray((categoriesData as any)?.data)) return (categoriesData as any).data as BlogCategory[];
		return [];
	}, [categoriesData]);

	// Support matching either direct slug or ID from either single response or all-blogs list
	const article = React.useMemo(() => {
		if (blogResponse?.data) return blogResponse.data;
		const list = allBlogsResponse?.data || [];
		return list.find((a) => a.slug === slug || a.id === slug) || null;
	}, [blogResponse, allBlogsResponse, slug]);

	// Filter related articles strictly to the same category as the active article
	const relatedArticles = React.useMemo(() => {
		if (!article || !article.category) return [];
		const list = allBlogsResponse?.data || [];
		const currentCatTitle = resolveCategoryTitle(article.category, categories).toLowerCase();

		return list
			.filter((a) => {
				if (a.id === article.id || (article.slug && a.slug === article.slug)) {
					return false;
				}
				const aCatTitle = resolveCategoryTitle(a.category, categories).toLowerCase();
				const isSameId = a.category && a.category.toLowerCase() === article.category.toLowerCase();
				const isSameTitle = Boolean(currentCatTitle && aCatTitle && aCatTitle === currentCatTitle);
				return isSameId || isSameTitle;
			})
			.slice(0, 3);
	}, [allBlogsResponse, article, categories]);

	const canonicalUrl = `https://classore.com/blog/${article?.slug || slug}`;

	const shareUrl = React.useMemo(() => {
		if (typeof window === "undefined") return canonicalUrl;
		if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
			return canonicalUrl;
		}
		return window.location.href;
	}, [canonicalUrl]);

	const currentUrl = typeof window !== "undefined" ? window.location.href : canonicalUrl;

	const handleCopyLink = () => {
		if (typeof window !== "undefined") {
			navigator.clipboard.writeText(currentUrl);
			toast.success("Article link copied to clipboard!");
		}
	};

	const handleShare = async () => {
		if (typeof window !== "undefined" && navigator.share) {
			try {
				await navigator.share({
					title: article?.title || "Classore Blog",
					text: article?.excerpt || "Check out this article on Classore",
					url: currentUrl,
				});
			} catch {
				handleCopyLink();
			}
		} else {
			handleCopyLink();
		}
	};

	return (
		<>
			<Seo
				title={article?.title ? `${article.title} – Classore Blog` : "Blog Article – Classore"}
				description={article?.excerpt || "Read educational insights and exam tips on Classore."}
				ogImage={article?.cover_photo}
				canonical={canonicalUrl}
				ogType="article"
			/>

			<Navbar />

			<main className="w-full font-geist min-h-screen bg-white">
				{/* Top spacing for fixed navbar */}
				<div className="pt-24 sm:pt-32 pb-16">
					<div className="container mx-auto px-4 lg:px-8 max-w-4xl">
						{/* Back link and Share row */}
						<div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
							<Link
								href="/blog"
								className="group inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-primary-600 transition">
								<RiArrowLeftLine className="size-4 transition-transform group-hover:-translate-x-1" />
								<span>Back to All Articles</span>
							</Link>

							<button
								onClick={handleShare}
								className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-2xs hover:border-primary-300 hover:text-primary-600 transition">
								<RiShareForwardLine className="size-4 text-neutral-400" />
								<span>Share</span>
							</button>
						</div>

						{isLoading ? (
							<div className="flex flex-col items-center justify-center py-24 space-y-4">
								<Spinner size="lg" />
								<p className="text-xs text-neutral-400">Loading article...</p>
							</div>
						) : !article ? (
							<div className="flex flex-col items-center justify-center py-20 text-center space-y-4 rounded-3xl border border-dashed border-neutral-200 p-8">
								<RiArticleLine className="size-12 text-neutral-300" />
								<h2 className="text-xl font-bold text-neutral-900">Article Not Found</h2>
								<p className="text-xs sm:text-sm text-neutral-500 max-w-md">
									The article you are looking for may have been removed or the URL may be incorrect.
								</p>
								<Link
									href="/blog"
									className="rounded-xl bg-primary-600 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-primary-700 transition">
									Return to Blog Directory
								</Link>
							</div>
						) : (
							<article className="space-y-8">
								{/* Article Header */}
								<div className="space-y-4">
									{/* Category, Date & Read Time */}
									<div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
										{(() => {
											const catLabel = resolveCategoryTitle(article.category, categories);
											return catLabel ? (
												<span className="rounded-full bg-primary-50 border border-primary-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
													{catLabel}
												</span>
											) : null;
										})()}
										<span className="flex items-center gap-1.5 font-medium text-neutral-600">
											<RiTimeLine className="size-3.5 text-neutral-400" />
											<span>{formatReadingTime(article.reading_time)}</span>
										</span>
										<span>•</span>
										<span className="flex items-center gap-1.5 font-medium text-neutral-600">
											<RiCalendarLine className="size-3.5 text-neutral-400" />
											<span>
												{article.createdOn
													? format(new Date(article.createdOn), "MMMM d, yyyy")
													: "Recent"}
											</span>
										</span>
									</div>

									{/* Main Title */}
									<h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight tracking-tight">
										{article.title}
									</h1>

									{/* Excerpt / Lead */}
									{article.excerpt && (
										<p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed pt-1">
											{article.excerpt}
										</p>
									)}
								</div>

								{/* Cover Image */}
								{article.cover_photo && (
									<div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-xs border border-neutral-200">
										<Image
											src={article.cover_photo}
											alt={article.title}
											fill
											priority
											sizes="(max-width: 1024px) 100vw, 850px"
											className="object-cover"
										/>
									</div>
								)}

								{/* Article Body Content */}
								<div
									className="prose prose-neutral max-w-none text-neutral-800 text-sm sm:text-base leading-relaxed pt-4
										[&>p]:mb-5 [&>p]:leading-relaxed
										[&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-neutral-900 [&>h2]:mt-8 [&>h2]:mb-4
										[&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-neutral-900 [&>h3]:mt-6 [&>h3]:mb-3
										[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul>li]:mb-2
										[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol>li]:mb-2
										[&>blockquote]:border-l-4 [&>blockquote]:border-primary-400 [&>blockquote]:pl-4 [&>blockquote]:py-1 [&>blockquote]:italic [&>blockquote]:text-neutral-600 [&>blockquote]:my-6
										[&>img]:rounded-2xl [&>img]:my-6 [&>img]:shadow-xs
										[&>a]:text-primary-600 [&>a]:underline [&>a]:hover:text-primary-700"
									dangerouslySetInnerHTML={{ __html: article.article_body }}
								/>

								{/* Social Share & Author Footer */}
								<div className="pt-8 border-t border-neutral-200 space-y-6">
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-neutral-50 p-4 sm:p-5 rounded-2xl border border-neutral-200">
										<div>
											<p className="text-xs font-bold text-neutral-900">Found this article helpful?</p>
											<p className="text-[11px] text-neutral-500">Share it with your classmates or fellow students.</p>
										</div>

										<div className="flex items-center gap-2">
											<button
												onClick={handleCopyLink}
												title="Copy link"
												className="size-9 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:border-primary-300 transition shadow-2xs">
												<RiFileCopyLine className="size-4" />
											</button>
											<a
												href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
													`${article.title} - ${shareUrl}`
												)}`}
												target="_blank"
												rel="noopener noreferrer"
												title="Share on WhatsApp"
												className="size-9 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-emerald-600 hover:border-emerald-300 transition shadow-2xs">
												<RiWhatsappFill className="size-4" />
											</a>
											<a
												href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
													article.title
												)}&url=${encodeURIComponent(shareUrl)}`}
												target="_blank"
												rel="noopener noreferrer"
												title="Share on X (Twitter)"
												className="size-9 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-neutral-800 hover:border-neutral-400 transition shadow-2xs">
												<RiTwitterXFill className="size-4" />
											</a>
											<a
												href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
													shareUrl
												)}`}
												target="_blank"
												rel="noopener noreferrer"
												title="Share on Facebook"
												className="size-9 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-blue-600 hover:border-blue-300 transition shadow-2xs">
												<RiFacebookFill className="size-4" />
											</a>
										</div>
									</div>

									{/* Author Box */}
									<div className="flex items-center gap-4 p-5 rounded-2xl border border-primary-100 bg-primary-50/40">
										<div className="size-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0">
											C
										</div>
										<div>
											<p className="text-xs font-bold text-neutral-900">
												Classore Academic Editorial Team
											</p>
											<p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">
												Created by experienced educators and curriculum specialists dedicated to helping students master national exams with confidence.
											</p>
										</div>
									</div>
								</div>

								{/* Related Articles */}
								{relatedArticles.length > 0 && (
									<div className="pt-10 border-t border-neutral-200 space-y-6">
										<div className="flex items-center justify-between">
											<h3 className="text-lg sm:text-xl font-bold text-neutral-900">
												Related Study Guides
											</h3>
											<Link
												href="/blog"
												className="text-xs font-semibold text-primary-600 hover:text-primary-700">
												View All →
											</Link>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
											{relatedArticles.map((rel) => {
												const relHref = `/blog/${rel.slug || rel.id}`;
												const relDate = rel.createdOn
													? format(new Date(rel.createdOn), "MMM d, yyyy")
													: "Recent";
												const relCat = resolveCategoryTitle(rel.category, categories);

												return (
													<Link
														key={rel.id}
														href={relHref}
														className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-3.5 shadow-2xs hover:shadow-md hover:border-primary-200 transition-all duration-300 hover:-translate-y-0.5">
														<div>
															{/* Cover Image Container */}
															<div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-100 mb-3">
																{rel.cover_photo ? (
																	<Image
																		src={rel.cover_photo}
																		alt={rel.title}
																		fill
																		sizes="(max-width: 640px) 100vw, 280px"
																		className="object-cover transition-transform duration-500 group-hover:scale-105"
																	/>
																) : (
																	<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-neutral-100 text-primary-400">
																		<RiArticleLine className="size-8 opacity-50" />
																	</div>
																)}
																{relCat && (
																	<span className="absolute left-2.5 top-2.5 rounded-full bg-white/95 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-700 shadow-2xs">
																		{relCat}
																	</span>
																)}
															</div>

															{/* Meta: Read time & Date */}
															<div className="flex items-center gap-2 text-[10px] font-medium text-neutral-400 mb-1.5">
																<span className="flex items-center gap-1">
																	<RiTimeLine className="size-3" />
																	{formatReadingTime(rel.reading_time)}
																</span>
																<span>•</span>
																<span className="flex items-center gap-1">
																	<RiCalendarLine className="size-3" />
																	{relDate}
																</span>
															</div>

															{/* Title */}
															<h4 className="font-bold text-xs sm:text-sm text-neutral-900 group-hover:text-primary-600 transition line-clamp-2 leading-snug">
																{rel.title}
															</h4>

															{/* Excerpt */}
															{rel.excerpt && (
																<p className="mt-1 text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
																	{rel.excerpt}
																</p>
															)}
														</div>

														<div className="pt-3 mt-3 border-t border-neutral-100 text-[11px] font-semibold text-primary-600 group-hover:text-primary-700 flex items-center justify-between">
															<span>Read Article</span>
															<span className="transition-transform group-hover:translate-x-1">→</span>
														</div>
													</Link>
												);
											})}
										</div>
									</div>
								)}

								{/* Bottom Next-step Banner */}
								<div className="mt-12 rounded-3xl bg-gradient-to-r from-primary-600 to-primary-700 p-6 sm:p-10 text-white text-center space-y-4 shadow-sm">
									<h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
										Ready to Practice for Your Exam?
									</h3>
									<p className="text-xs sm:text-sm text-primary-100 max-w-lg mx-auto">
										Access thousands of verified WAEC, JAMB, and NECO past questions, AI-powered study assistance, and structured video lessons.
									</p>
									<div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
										<Link
											href="/signin"
											className="w-full sm:w-auto rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-primary-700 hover:bg-neutral-50 transition shadow-2xs">
											Start Learning Free
										</Link>
										<Link
											href="/blog"
											className="w-full sm:w-auto rounded-xl border border-white/30 bg-primary-600/40 px-6 py-2.5 text-xs font-bold text-white hover:bg-primary-600 transition">
											More Articles
										</Link>
									</div>
								</div>
							</article>
						)}
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};

export default ArticleDetailPage;
