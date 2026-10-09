import {
	RiArrowRightLine,
	RiArticleLine,
	RiCalendarLine,
	RiTimeLine,
} from "@remixicon/react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import {
	useGetAllBlogs,
	useGetAllCategories,
	resolveCategoryTitle,
	formatReadingTime,
	type BlogCategory,
} from "@/queries/blog";
import { useMemo } from "react";

export const BlogSection = () => {
	const { data: blogsResponse, isLoading } = useGetAllBlogs();
	const { data: categoriesData } = useGetAllCategories();

	const categories = useMemo<BlogCategory[]>(() => {
		if (!categoriesData) return [];
		if (Array.isArray(categoriesData)) return categoriesData;
		if (Array.isArray((categoriesData as any)?.data)) return (categoriesData as any).data as BlogCategory[];
		return [];
	}, [categoriesData]);

	const articles = useMemo(() => {
		const list = blogsResponse?.data || [];
		return list.slice(0, 3);
	}, [blogsResponse]);

	// Don't render the section if loading is complete and no articles exist
	if (!isLoading && articles.length === 0) {
		return null;
	}

	return (
		<section className="w-full bg-white py-16 lg:py-24 border-t border-neutral-200" id="blog">
			<div className="container mx-auto px-4 lg:px-8">
				{/* Section Header */}
				<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14">
					<div className="space-y-3 max-w-xl">
						<div className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1">
							<RiArticleLine className="size-3.5 text-primary-500" />
							<span className="text-[11px] font-bold uppercase tracking-wider text-primary-700">
								Study Hub & Insights
							</span>
						</div>
						<h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
							Latest from Our <span className="text-primary-400">Blog</span>
						</h2>
						<p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
							Actionable study tips, WAEC & JAMB exam strategies, and educational insights to help you excel.
						</p>
					</div>

					<Link
						href="/blog"
						className="group hidden sm:inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-white px-4 py-2.5 text-xs font-semibold text-neutral-800 shadow-2xs hover:border-primary-300 hover:text-primary-600 transition-all">
						<span>View All Articles</span>
						<RiArrowRightLine className="size-4 text-neutral-500 group-hover:text-primary-600 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>

				{/* Articles Grid */}
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-4 animate-pulse">
								<div className="aspect-[16/10] w-full rounded-xl bg-neutral-200" />
								<div className="h-4 w-24 rounded bg-neutral-200" />
								<div className="h-5 w-full rounded bg-neutral-200" />
								<div className="h-4 w-3/4 rounded bg-neutral-200" />
								<div className="h-4 w-1/3 rounded bg-neutral-200" />
							</div>
						))}
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{articles.map((article) => {
							const articleHref = `/blog/${article.slug || article.id}`;
							const formattedDate = article.createdOn
								? format(new Date(article.createdOn), "MMM d, yyyy")
								: "Recent";

							return (
								<Link
									key={article.id}
									href={articleHref}
									className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg">
									{/* Cover Image Container */}
									<div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-100">
										{article.cover_photo ? (
											<Image
												src={article.cover_photo}
												alt={article.title}
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
												className="object-cover transition-transform duration-500 group-hover:scale-105"
											/>
										) : (
											<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 via-primary-50 to-neutral-100 text-primary-400">
												<RiArticleLine className="size-10 opacity-60" />
											</div>
										)}

										{/* Category Badge over image */}
										{(() => {
											const catLabel = resolveCategoryTitle(article.category, categories);
											return catLabel ? (
												<span className="absolute left-3 top-3 rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-700 shadow-2xs">
													{catLabel}
												</span>
											) : null;
										})()}
									</div>

									{/* Article Info */}
									<div className="flex flex-1 flex-col justify-between pt-4">
										<div className="space-y-2">
											{/* Meta: Read time & Date */}
											<div className="flex items-center gap-3 text-[11px] font-medium text-neutral-400">
												<span className="flex items-center gap-1.5 text-neutral-500">
													<RiTimeLine className="size-3.5 text-neutral-400" />
													<span>{formatReadingTime(article.reading_time)}</span>
												</span>
												<span>•</span>
												<span className="flex items-center gap-1">
													<RiCalendarLine className="size-3.5" />
													{formattedDate}
												</span>
											</div>

											{/* Title */}
											<h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
												{article.title}
											</h3>

											{/* Excerpt */}
											{article.excerpt && (
												<p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 leading-relaxed">
													{article.excerpt}
												</p>
											)}
										</div>

										{/* Card Action Link */}
										<div className="pt-4 mt-2 border-t border-neutral-100 flex items-center justify-between">
											<span className="text-xs font-semibold text-primary-600 group-hover:text-primary-700 flex items-center gap-1">
												Read Article
												<RiArrowRightLine className="size-3.5 transition-transform group-hover:translate-x-1" />
											</span>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				)}

				{/* Mobile-only View All Button */}
				<div className="mt-8 flex sm:hidden justify-center">
					<Link
						href="/blog"
						className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-neutral-50 py-3 text-xs font-semibold text-neutral-800 shadow-2xs hover:bg-white active:bg-neutral-100">
						<span>View All Articles</span>
						<RiArrowRightLine className="size-4 text-neutral-500" />
					</Link>
				</div>
			</div>
		</section>
	);
};
