import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiTimeLine, RiArrowRightLine } from "@remixicon/react";
import { format, isValid } from "date-fns";

import { DashboardLayout } from "@/components/layouts";
import { Seo, BackBtn } from "@/components/shared";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllBlogs, type Article, useGetAllCategories } from "@/queries/blog";
import type { BlogCategory } from "@/queries/blog";
import { mapApiToDisplay } from "@/lib/study-guides-data";
import { Separator } from "@/components/ui/separator";

const formatDate = (dateStr?: string) => {
	if (!dateStr) return "";
	try {
		const d = new Date(dateStr);
		return isValid(d) ? format(d, "MMM d, yyyy") : "";
	} catch {
		return "";
	}
};

export default function EducationHubPage() {
	const { data: blogsResponse, isLoading } = useGetAllBlogs();
	const { data: categoriesResponse } = useGetAllCategories();

	const categories = React.useMemo(() => {
		const raw = categoriesResponse || [];
		if (!raw) return [];
		const arr = Array.isArray(raw) ? raw : (raw as any)?.data || [];
		return arr as BlogCategory[];
	}, [categoriesResponse]);

	const categoryMap = React.useMemo(
		() =>
			categories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.title }), {} as Record<string, string>),
		[categories]
	);

	const allArticles = React.useMemo(() => {
		const raw = blogsResponse?.data;
		if (!raw) return [];
		const arr = Array.isArray(raw) ? raw : (raw as any)?.data || [];
		return (arr as Article[]).map(mapApiToDisplay);
	}, [blogsResponse]);

	const [activeTab, setActiveTab] = React.useState("all");
	const [sortBy, setSortBy] = React.useState<"recent" | "popular" | "oldest">("recent");

	const filteredArticles = React.useMemo(() => {
		const filtered = allArticles.filter((article) => {
			if (activeTab === "all") return true;
			return article.category === activeTab;
		});

		return [...filtered].sort((a, b) => {
			if (sortBy === "recent") {
				const timeA = new Date(a.date).getTime() || 0;
				const timeB = new Date(b.date).getTime() || 0;
				return timeB - timeA;
			}
			if (sortBy === "oldest") {
				const timeA = new Date(a.date).getTime() || 0;
				const timeB = new Date(b.date).getTime() || 0;
				return timeA - timeB;
			}
			return 0;
		});
	}, [allArticles, activeTab, sortBy]);

	return (
		<>
			<Seo title="Education Hub" />
			<DashboardLayout>
				{isLoading ? (
					<div className="flex w-full flex-col gap-8 pb-10">
						{/* Header */}
						<div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
							<div className="flex items-center gap-4">
								<BackBtn />
								<h1 className="text-xl font-bold text-neutral-900 md:text-2xl">Education Hub</h1>
							</div>
						</div>

						{/* Skeleton Cards Grid */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div
									key={i}
									className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm animate-pulse">
									<div className="h-48 w-full rounded-lg bg-neutral-100" />
									<div className="mt-3 h-4 w-24 rounded bg-neutral-100" />
									<div className="mt-2 h-5 w-3/4 rounded bg-neutral-100" />
									<div className="mt-2 space-y-1.5">
										<div className="h-3.5 w-full rounded bg-neutral-100" />
										<div className="h-3.5 w-4/5 rounded bg-neutral-100" />
									</div>
									<Separator className="my-4 bg-neutral-200" />
									<div className="mt-auto flex items-center justify-between">
										<div className="h-4 w-28 rounded bg-neutral-100" />
										<div className="h-4 w-20 rounded bg-neutral-100" />
									</div>
								</div>
							))}
						</div>
					</div>
				) : (
					<div className="flex w-full flex-col gap-8 pb-10">
						{/* Header */}
						<div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
							<div className="flex items-center gap-4">
								<BackBtn />
								<h1 className="text-xl font-bold text-neutral-900 md:text-2xl">Education Hub</h1>
							</div>

							<div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2 text-sm text-neutral-600 shadow-sm">
								<label htmlFor="sort" className="sr-only hidden">
									Sort by
								</label>
								<select
									id="sort"
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value as any)}
									aria-label="Sort articles"
									className="cursor-pointer border-none bg-transparent outline-none focus:border-none focus:outline-none active:border-none active:outline-none">
									<option value="recent">Sort by</option>
									<option value="popular">Popular</option>
									<option value="oldest">Oldest</option>
								</select>
							</div>
						</div>

						{/* Breadcrumbs */}
						<div className="-mt-4 flex items-center gap-2 text-sm text-neutral-400 md:mt-6">
							<Link href="/dashboard" className="transition-colors hover:text-neutral-700">
								Home
							</Link>
							<span>/</span>
							<span className="text-neutral-700">Education Hub</span>
						</div>

						{/* Tabs */}
						<div className="w-full">
							<Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
								<div className="flex w-full items-center justify-between">
									<TabsList className="space-x-2 border-b border-transparent bg-white p-0">
										<TabsTrigger value="all">All</TabsTrigger>
										{categories.map((category) => (
											<TabsTrigger key={category.id} value={category.id}>
												{category.title}
											</TabsTrigger>
										))}
									</TabsList>
								</div>

								<div className="mt-8">
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
										{filteredArticles.map((article) => {
											const formattedDate = formatDate(article.date);

											return (
												<Link
													key={article.id}
													href={`/dashboard/education-hub/${article.id}`}
													className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1">
													<div className="flex flex-1 flex-col p-4">
														<div className="relative h-48 w-full overflow-hidden">
															<Image
																src={article.coverImage}
																alt={article.title}
																fill
																className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
															/>
														</div>
														<span className="mt-3 text-sm font-medium capitalize text-primary-300">
															{categoryMap[article.category] || article.category}
														</span>
														<h3 className="mt-2 line-clamp-2 text-lg font-bold text-neutral-900 transition-colors group-hover:text-primary-300">
															{article.title}
														</h3>
														<p className="mt-2 line-clamp-2 text-sm text-neutral-500">{article.excerpt}</p>

														<Separator className="my-4 bg-neutral-200" />

														<div className="mt-auto flex items-center justify-between">
															<div className="flex items-center gap-2 text-xs text-neutral-400">
																<div className="flex items-center gap-1">
																	<RiTimeLine className="size-3.5" />
																	<span>{article.readTime}</span>
																</div>
																{formattedDate ? (
																	<>
																		<span>•</span>
																		<span>{formattedDate}</span>
																	</>
																) : null}
															</div>
															<div className="flex items-center gap-1 text-sm font-medium text-orange-500 transition-transform group-hover:translate-x-1">
																<span>Read article</span>
																<RiArrowRightLine className="size-4" />
															</div>
														</div>
													</div>
												</Link>
											);
										})}
									</div>
								</div>
							</Tabs>
						</div>
					</div>
				)}
			</DashboardLayout>
		</>
	);
}
