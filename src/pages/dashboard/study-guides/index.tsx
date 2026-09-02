import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiTimeLine, RiArrowRightLine } from "@remixicon/react";

import { DashboardLayout } from "@/components/layouts";
import { Seo, BackBtn } from "@/components/shared";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { DUMMY_ARTICLES } from "./data";
import { useGetAllBlogs, type Article, useGetAllCategories } from "@/queries/blog";
import type { BlogCategory } from "@/queries/blog";
import { mapApiToDisplay } from "@/lib/study-guides-data";
import { Separator } from "@/components/ui/separator";

export default function StudyGuidesPage() {
	// const [activeTab, setActiveTab] = React.useState("all");

	// const filteredArticles = DUMMY_ARTICLES.filter((article) => {
	//     if (activeTab === "all") return true;
	//     return article.category === activeTab;
	// });

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

	// const allArticles = React.useMemo(() => {
	// 	const raw = blogsResponse?.data;
	// 	if (!raw) return [];
	// 	// Handle both direct array and paginated response
	// 	const arr: typeof raw extends (infer T)[] ? T[] : never = Array.isArray(raw)
	// 		? raw
	// 		: (raw as { data?: unknown[] }).data
	// 			? (
	// 					raw as {
	// 						data: {
	// 							id: string;
	// 							title: string;
	// 							slug: string;
	// 							excerpt: string;
	// 							article_body: string;
	// 							category: string;
	// 							cover_photo: string;
	// 							reading_time?: string;
	// 							createdOn: string;
	// 						}[];
	// 					}
	// 				).data
	// 			: [];
	// 	return arr.map(mapApiToDisplay);
	// }, [blogsResponse]);

	const allArticles = React.useMemo(() => {
		const raw = blogsResponse?.data;
		if (!raw) return [];
		const arr = Array.isArray(raw) ? raw : (raw as any)?.data || [];
		return (arr as Article[]).map(mapApiToDisplay);
	}, [blogsResponse]);

	const [activeTab, setActiveTab] = React.useState("all");

	const filteredArticles = allArticles.filter((article) => {
		if (activeTab === "all") return true;
		return article.category === activeTab;
	});

	return (
		<>
			<Seo title="Study Guides & Tips" />
			<DashboardLayout>
				{isLoading && (
					<div className="flex items-center justify-center py-20">
						<p className="text-neutral-500">Loading study guides...</p>
					</div>
				)}
				{!isLoading && (
					<div className="flex w-full flex-col gap-8 pb-10">
						{/* Header */}
						<div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
							<div className="flex items-center gap-4">
								<BackBtn />
								<h1 className="text-xl font-bold text-neutral-900 md:text-2xl">Study Guides & Tips</h1>
							</div>

							<div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2 text-sm text-neutral-600 shadow-sm">
								<label htmlFor="sort" className="sr-only hidden">
									Sort by
								</label>
								<select
									id="sort"
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
							<span className="text-neutral-700">Study Guides & Tips</span>
						</div>

						{/* Tabs */}
						<div className="w-full">
							<Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
								<div className="flex w-full items-center justify-between">
									<TabsList className="space-x-2 border-b border-transparent bg-white p-0">
										{/* <TabsTrigger
											value="all"
											className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-300">
											All
										</TabsTrigger>
										<TabsTrigger
											value="study tips"
											className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-300">
											Study Tips
										</TabsTrigger>
										<TabsTrigger
											value="exam guides"
											className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-300">
											Exam Guides
										</TabsTrigger>
										<TabsTrigger
											value="updates"
											className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-300">
											Updates
										</TabsTrigger> */}
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
										{filteredArticles.map((article) => (
											<Link
												key={article.id}
												href={`/dashboard/study-guides/${article.id}`}
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
														<div className="flex items-center gap-1.5 text-xs text-neutral-400">
															<RiTimeLine className="size-4" />
															<span>{article.readTime}</span>
														</div>
														<div className="flex items-center gap-1 text-sm font-medium text-orange-500 transition-transform group-hover:translate-x-1">
															<span>Read article</span>
															<RiArrowRightLine className="size-4" />
														</div>
													</div>
												</div>
											</Link>
										))}
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
