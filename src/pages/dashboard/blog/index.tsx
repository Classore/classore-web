import {
	RiArticleLine,
	RiCalendarLine,
	RiSearchLine,
	RiTimeLine,
} from "@remixicon/react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { DashboardLayout } from "@/components/layouts";
import { Seo, Spinner } from "@/components/shared";
import { useGetAllBlogs, useGetAllCategories } from "@/queries/blog";

const Page = () => {
	const [search, setSearch] = React.useState("");
	const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

	const { data: blogsResponse, isLoading } = useGetAllBlogs();
	const { data: categories } = useGetAllCategories();

	const articles = React.useMemo(() => {
		const list = blogsResponse?.data || [];
		return list.filter((article) => {
			const matchesCat =
				selectedCategory === "all" ||
				article.category?.toLowerCase() === selectedCategory.toLowerCase();
			const matchesSearch =
				!search.trim() ||
				article.title.toLowerCase().includes(search.toLowerCase()) ||
				article.excerpt?.toLowerCase().includes(search.toLowerCase());
			return matchesCat && matchesSearch;
		});
	}, [blogsResponse, selectedCategory, search]);

	const featuredArticle = articles[0];
	const restArticles = articles.slice(1);

	return (
		<>
			<Seo title="Study Blog & Educational Insights – Classore" noIndex />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-4 py-4 md:px-8">
					{/* Header */}
					<div>
						<h1 className="text-2xl font-bold tracking-tight text-neutral-900">
							Study Blog & Insights
						</h1>
						<p className="mt-0.5 text-xs text-neutral-500">
							Exam preparation tips, educational articles, and academic success strategies.
						</p>
					</div>

					{/* Search & Category Filter */}
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						{/* Search Bar */}
						<div className="relative flex-1 max-w-md">
							<RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search articles and guides..."
								className="h-10 w-full rounded-xl border border-neutral-200 pl-10 pr-4 text-xs placeholder:text-neutral-400"
							/>
						</div>

						{/* Categories Pills */}
						<div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
							<button
								onClick={() => setSelectedCategory("all")}
								className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
									selectedCategory === "all"
										? "bg-primary-600 text-white shadow-2xs"
										: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
								}`}>
								All Topics
							</button>
							{categories?.map((cat) => (
								<button
									key={cat.id}
									onClick={() => setSelectedCategory(cat.title)}
									className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
										selectedCategory.toLowerCase() === cat.title.toLowerCase()
											? "bg-primary-600 text-white shadow-2xs"
											: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
									}`}>
									{cat.title}
								</button>
							))}
						</div>
					</div>

					{/* Content */}
					{isLoading ? (
						<div className="flex items-center justify-center py-20">
							<Spinner size="lg" />
						</div>
					) : articles.length === 0 ? (
						<div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-200 py-16 text-center">
							<RiArticleLine className="size-10 text-neutral-300" />
							<p className="font-semibold text-neutral-700 text-sm">No articles found</p>
							<p className="text-xs text-neutral-400">Try changing your search query or category filter.</p>
						</div>
					) : (
						<div className="flex flex-col gap-6">
							{/* Featured Article */}
							{featuredArticle && !search && selectedCategory === "all" && (
								<Link
									href={`/dashboard/blog/${featuredArticle.slug || featuredArticle.id}`}
									className="group grid grid-cols-1 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-xs transition hover:shadow-md md:grid-cols-2">
									<div className="relative h-60 w-full md:h-full min-h-[220px] bg-neutral-100">
										{featuredArticle.cover_photo ? (
											<Image
												src={featuredArticle.cover_photo}
												alt={featuredArticle.title}
												fill
												className="object-cover transition duration-300 group-hover:scale-105"
											/>
										) : (
											<div className="grid size-full place-items-center bg-primary-50 text-primary-600">
												<RiArticleLine className="size-12 opacity-50" />
											</div>
										)}
										<span className="absolute left-4 top-4 rounded-full bg-primary-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
											Featured Article
										</span>
									</div>

									<div className="flex flex-col justify-between p-6 md:p-8">
										<div className="flex flex-col gap-2">
											<div className="flex items-center gap-3 text-xs text-neutral-400">
												{featuredArticle.category && (
													<span className="font-bold text-primary-600 uppercase tracking-wider">
														{featuredArticle.category}
													</span>
												)}
												<span>•</span>
												<span className="flex items-center gap-1">
													<RiTimeLine className="size-3.5" />
													{featuredArticle.reading_time || "4 min read"}
												</span>
											</div>

											<h2 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition leading-snug">
												{featuredArticle.title}
											</h2>

											<p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
												{featuredArticle.excerpt}
											</p>
										</div>

										<div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-400">
											<span className="flex items-center gap-1.5">
												<RiCalendarLine className="size-3.5" />
												{featuredArticle.createdOn
													? format(new Date(featuredArticle.createdOn), "MMMM d, yyyy")
													: "Recent"}
											</span>
											<span className="font-bold text-primary-600 group-hover:underline">
												Read Full Article →
											</span>
										</div>
									</div>
								</Link>
							)}

							{/* Articles Grid */}
							<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
								{(search || selectedCategory !== "all" ? articles : restArticles).map((article) => (
									<Link
										key={article.id}
										href={`/dashboard/blog/${article.slug || article.id}`}
										className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xs transition hover:shadow-md">
										<div className="relative h-44 w-full bg-neutral-100 overflow-hidden">
											{article.cover_photo ? (
												<Image
													src={article.cover_photo}
													alt={article.title}
													fill
													className="object-cover transition duration-300 group-hover:scale-105"
												/>
											) : (
												<div className="grid size-full place-items-center bg-primary-50 text-primary-600">
													<RiArticleLine className="size-8 opacity-40" />
												</div>
											)}
											{article.category && (
												<span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-neutral-800 backdrop-blur-xs shadow-2xs">
													{article.category}
												</span>
											)}
										</div>

										<div className="flex flex-1 flex-col justify-between p-5">
											<div className="flex flex-col gap-2">
												<div className="flex items-center gap-2 text-[11px] text-neutral-400">
													<RiTimeLine className="size-3" />
													<span>{article.reading_time || "3 min read"}</span>
													<span>•</span>
													<span>
														{article.createdOn
															? format(new Date(article.createdOn), "MMM d, yyyy")
															: ""}
													</span>
												</div>

												<h3 className="font-bold text-neutral-900 group-hover:text-primary-600 transition leading-snug text-sm line-clamp-2">
													{article.title}
												</h3>

												<p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
													{article.excerpt}
												</p>
											</div>

											<div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3 text-xs">
												<span className="font-bold text-primary-600 group-hover:underline">
													Read article
												</span>
												<span className="text-neutral-400 group-hover:translate-x-0.5 transition">
													→
												</span>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					)}
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
