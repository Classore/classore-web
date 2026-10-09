import {
	RiArrowRightLine,
	RiArticleLine,
	RiCalendarLine,
	RiCloseLine,
	RiSearchLine,
	RiSparklingLine,
	RiTimeLine,
} from "@remixicon/react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Footer, Navbar, Seo } from "@/components/shared";
import {
	useGetAllBlogs,
	useGetAllCategories,
	resolveCategoryTitle,
	formatReadingTime,
	type BlogCategory,
} from "@/queries/blog";

const BlogPage = () => {
	const [search, setSearch] = React.useState("");
	const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

	const { data: blogsResponse, isLoading } = useGetAllBlogs();
	const { data: categoriesData } = useGetAllCategories();

	const categories = React.useMemo<BlogCategory[]>(() => {
		if (!categoriesData) return [];
		if (Array.isArray(categoriesData)) return categoriesData;
		if (Array.isArray((categoriesData as any)?.data)) return (categoriesData as any).data as BlogCategory[];
		return [];
	}, [categoriesData]);

	const allArticles = blogsResponse?.data || [];

	const filteredArticles = React.useMemo(() => {
		return allArticles.filter((article) => {
			const categoryLabel = resolveCategoryTitle(article.category, categories);

			const matchesCategory =
				selectedCategory === "all" ||
				(article.category && article.category.toLowerCase() === selectedCategory.toLowerCase()) ||
				(categoryLabel && categoryLabel.toLowerCase() === selectedCategory.toLowerCase());

			const query = search.trim().toLowerCase();
			const matchesSearch =
				!query ||
				article.title.toLowerCase().includes(query) ||
				categoryLabel.toLowerCase().includes(query) ||
				article.excerpt?.toLowerCase().includes(query) ||
				article.article_body?.toLowerCase().includes(query);

			return matchesCategory && matchesSearch;
		});
	}, [allArticles, selectedCategory, search, categories]);

	const isDefaultView = !search.trim() && selectedCategory === "all";
	const featuredArticle = isDefaultView ? filteredArticles[0] : null;
	const regularArticles = isDefaultView ? filteredArticles.slice(1) : filteredArticles;

	return (
		<>
			<Seo
				title="Study Blog & Educational Insights – Classore"
				description="Actionable exam prep tips, WAEC, JAMB, & NECO strategies, study guides, and academic insights to help students excel."
			/>

			<Navbar />

			<main className="w-full font-geist min-h-screen bg-neutral-0">
				{/* Hero Header */}
				<section className="relative overflow-hidden bg-gradient-to-b from-primary-100/70 via-primary-50/40 to-neutral-0 pt-28 pb-14 sm:pt-36 sm:pb-20 border-b border-neutral-200/80">
					<div className="container mx-auto px-4 lg:px-8">
						<div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
							<div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 backdrop-blur-xs px-3.5 py-1 shadow-2xs">
								<RiSparklingLine className="size-3.5 text-primary-500" />
								<span className="text-[11px] font-bold uppercase tracking-wider text-primary-700">
									The Classore Blog
								</span>
							</div>

							<h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl leading-tight">
								Study Smarter, <span className="text-primary-400">Ace Your Exams</span>
							</h1>

							<p className="text-sm sm:text-base text-neutral-500 max-w-2xl leading-relaxed">
								Explore proven study methods, WAEC & JAMB exam hacks, and expert academic advice curated for students and parents.
							</p>

							{/* Search Input Bar */}
							<div className="w-full max-w-xl pt-4">
								<div className="relative flex items-center">
									<RiSearchLine className="absolute left-4 size-5 text-neutral-400" />
									<input
										type="text"
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										placeholder="Search study guides, past questions, exam tips..."
										className="h-12 w-full rounded-2xl border border-neutral-200 bg-white pl-12 pr-10 text-sm shadow-sm transition placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
									/>
									{search && (
										<button
											onClick={() => setSearch("")}
											aria-label="Clear search"
											className="absolute right-3.5 text-neutral-400 hover:text-neutral-700">
											<RiCloseLine className="size-5" />
										</button>
									)}
								</div>
							</div>

							{/* Categories Pills */}
							<div className="flex flex-wrap items-center justify-center gap-2 pt-2">
								<button
									onClick={() => setSelectedCategory("all")}
									className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all shadow-2xs ${selectedCategory === "all"
											? "bg-primary-600 text-white shadow-xs"
											: "border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
										}`}>
									All Topics
								</button>
								{categories.map((cat) => {
									if (!cat || !cat.title) return null;
									const isSelected = selectedCategory.toLowerCase() === cat.title.toLowerCase();
									return (
										<button
											key={cat.id || cat.title}
											onClick={() => setSelectedCategory(cat.title)}
											className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all shadow-2xs ${isSelected
													? "bg-primary-600 text-white shadow-xs"
													: "border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50"
												}`}>
											{cat.title}
										</button>
									);
								})}
							</div>
						</div>
					</div>
				</section>

				{/* Main Content Area */}
				<section className="py-12 sm:py-16">
					<div className="container mx-auto px-4 lg:px-8">
						{isLoading ? (
							/* Loading Skeleton */
							<div className="space-y-10">
								<div className="h-80 w-full rounded-3xl bg-neutral-100 animate-pulse" />
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
									{[1, 2, 3, 4, 5, 6].map((i) => (
										<div
											key={i}
											className="flex flex-col rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 space-y-4 animate-pulse">
											<div className="aspect-[16/10] w-full rounded-xl bg-neutral-200" />
											<div className="h-4 w-24 rounded bg-neutral-200" />
											<div className="h-5 w-full rounded bg-neutral-200" />
											<div className="h-4 w-3/4 rounded bg-neutral-200" />
										</div>
									))}
								</div>
							</div>
						) : filteredArticles.length === 0 ? (
							/* Empty Search / Filter State */
							<div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto space-y-4">
								<div className="size-16 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400">
									<RiArticleLine className="size-8" />
								</div>
								<h3 className="text-lg font-bold text-neutral-900">No articles found</h3>
								<p className="text-xs sm:text-sm text-neutral-500">
									{search
										? `We couldn't find any articles matching "${search}". Try searching with different keywords.`
										: `No articles available in the "${selectedCategory}" category yet.`}
								</p>
								<button
									onClick={() => {
										setSearch("");
										setSelectedCategory("all");
									}}
									className="rounded-xl bg-primary-600 px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-primary-700 transition">
									Reset Search & Filters
								</button>
							</div>
						) : (
							<div className="space-y-12">
								{/* Featured Article Hero Card */}
								{featuredArticle && (
									<div className="mb-12">
										<div className="flex items-center gap-2 mb-4">
											<span className="text-xs font-bold uppercase tracking-wider text-primary-600">
												Featured Insight
											</span>
										</div>

										<Link
											href={`/blog/${featuredArticle.slug || featuredArticle.id}`}
											className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 rounded-3xl border border-neutral-200 bg-white p-5 sm:p-7 shadow-xs hover:shadow-xl hover:border-primary-200 transition-all duration-300">
											{/* Featured Cover */}
											<div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:col-span-7 w-full overflow-hidden rounded-2xl bg-neutral-100">
												{featuredArticle.cover_photo ? (
													<Image
														src={featuredArticle.cover_photo}
														alt={featuredArticle.title}
														fill
														sizes="(max-width: 1024px) 100vw, 60vw"
														className="object-cover transition-transform duration-500 group-hover:scale-105"
														priority
													/>
												) : (
													<div className="flex h-full w-full min-h-[240px] items-center justify-center bg-gradient-to-br from-primary-100 to-neutral-100 text-primary-400">
														<RiArticleLine className="size-16 opacity-60" />
													</div>
												)}
												{(() => {
													const catLabel = resolveCategoryTitle(featuredArticle.category, categories);
													return catLabel ? (
														<span className="absolute left-4 top-4 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700 shadow-2xs">
															{catLabel}
														</span>
													) : null;
												})()}
											</div>

											{/* Featured Content */}
											<div className="flex flex-col justify-between lg:col-span-5 space-y-4">
												<div className="space-y-3">
													<div className="flex items-center gap-3 text-xs font-medium text-neutral-400">
														<span className="flex items-center gap-1.5 text-neutral-500">
															<RiTimeLine className="size-3.5 text-neutral-400" />
															<span>{formatReadingTime(featuredArticle.reading_time)}</span>
														</span>
														<span>•</span>
														<span className="flex items-center gap-1">
															<RiCalendarLine className="size-3.5" />
															{featuredArticle.createdOn
																? format(new Date(featuredArticle.createdOn), "MMMM d, yyyy")
																: "Recent"}
														</span>
													</div>

													<h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-neutral-900 group-hover:text-primary-600 transition-colors leading-tight">
														{featuredArticle.title}
													</h2>

													{featuredArticle.excerpt && (
														<p className="text-xs sm:text-sm text-neutral-500 leading-relaxed line-clamp-3 lg:line-clamp-4">
															{featuredArticle.excerpt}
														</p>
													)}
												</div>

												<div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
													<span className="text-xs font-semibold text-primary-600 group-hover:text-primary-700 flex items-center gap-1.5">
														Read Full Article
														<RiArrowRightLine className="size-4 transition-transform group-hover:translate-x-1" />
													</span>
												</div>
											</div>
										</Link>
									</div>
								)}

								{/* All Articles Section */}
								<div>
									{isDefaultView && (
										<div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-200">
											<h3 className="text-lg font-bold text-neutral-900">All Articles</h3>
											<span className="text-xs text-neutral-400">
												Showing {filteredArticles.length} {filteredArticles.length === 1 ? "post" : "posts"}
											</span>
										</div>
									)}

									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
										{regularArticles.map((article) => {
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
															<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-100 to-neutral-100 text-primary-400">
																<RiArticleLine className="size-10 opacity-60" />
															</div>
														)}

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

															<h4 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
																{article.title}
															</h4>

															{article.excerpt && (
																<p className="text-xs sm:text-sm text-neutral-500 line-clamp-2 leading-relaxed">
																	{article.excerpt}
																</p>
															)}
														</div>

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
								</div>
							</div>
						)}
					</div>
				</section>

				{/* Bottom CTA Section */}
				<section className="w-full bg-gradient-to-r from-primary-600 to-primary-700 py-14 sm:py-20 text-white">
					<div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl space-y-6">
						<span className="rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
							Start Today
						</span>
						<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
							Put Your Study Knowledge into Practice
						</h2>
						<p className="text-xs sm:text-sm text-primary-100 leading-relaxed">
							Solve past questions, watch video lessons with expert teachers, and track your streaks in the Classore student app.
						</p>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
							<Link
								href="/signin"
								className="w-full sm:w-auto rounded-xl bg-white px-6 py-3 text-xs font-bold text-primary-700 shadow-sm hover:bg-neutral-50 transition">
								Start Learning Free
							</Link>
							<Link
								href="/#frequently-asked-questions"
								className="w-full sm:w-auto rounded-xl border border-white/30 bg-primary-600/40 hover:bg-primary-600 px-6 py-3 text-xs font-bold text-white transition">
								Learn How It Works
							</Link>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export default BlogPage;
