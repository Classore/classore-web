import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const articles = [
	{
		title: "5 Smart Ways to Prepare for JAMB and Score High",
		category: "EDUCATION TIPS",
		date: "May 12, 2025",
		readTime: "5 min read",
		image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80",
		href: "/blog",
	},
	{
		title: "IELTS Writing Tips to Get Band 7.0 and Above",
		category: "IELTS GUIDE",
		date: "May 9, 2025",
		readTime: "6 min read",
		image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
		href: "/blog",
	},
	{
		title: "New Feature: AI Tutor is Now on Classore",
		category: "PLATFORM UPDATE",
		date: "May 5, 2025",
		readTime: "3 min read",
		image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
		href: "/blog",
	},
];

export const InsightsSection: React.FC = () => {
	return (
		<section id="blog" className="py-16 sm:py-24 bg-[#FAFAFC]">
			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
					<div className="space-y-3">
						<span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400">
							LATEST FROM CLASSORE
						</span>
						<h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
							Tips, Updates & Insights
						</h2>
						<p className="text-sm sm:text-base text-neutral-600">
							Stay informed with the latest education tips and platform updates.
						</p>
					</div>

					<Link
						href="/blog"
						className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary-400 hover:text-primary-600 transition-colors shrink-0">
						<span>View all articles</span>
						<ArrowRight className="w-4 h-4" />
					</Link>
				</div>

				{/* Articles Grid (Desktop 3 columns / Mobile list view) */}
				<div className="flex flex-col md:grid md:grid-cols-3 gap-4 sm:gap-6">
					{articles.map((article, idx) => (
						<Link
							key={idx}
							href={article.href}
							className="group flex flex-row md:flex-col rounded-2xl md:rounded-3xl bg-white border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-md md:hover:shadow-xl hover:-translate-y-0.5 md:hover:-translate-y-1 transition-all duration-200">
							{/* Image Banner */}
							<div className="relative h-24 w-28 shrink-0 md:h-52 md:w-full overflow-hidden bg-neutral-100 m-3 md:m-0 rounded-xl md:rounded-none">
								<Image
									src={article.image}
									alt={article.title}
									fill
									sizes="(max-width: 768px) 112px, 33vw"
									className="object-cover group-hover:scale-105 transition-transform duration-300"
								/>
							</div>

							{/* Article Content */}
							<div className="p-3 md:p-6 flex flex-col flex-1 justify-center md:justify-between space-y-2 md:space-y-4">
								<div className="space-y-1.5 md:space-y-2.5">
									<span className="inline-block text-[9px] md:text-[10px] font-bold uppercase tracking-wider bg-primary-100 text-primary-700 px-2 py-0.5 md:px-2.5 md:py-1 rounded-md">
										{article.category}
									</span>
									<h3 className="text-[13px] sm:text-base md:text-lg font-bold text-neutral-900 group-hover:text-primary-400 transition-colors line-clamp-2 leading-snug">
										{article.title}
									</h3>
								</div>

								{/* Meta */}
								<div className="pt-2 md:pt-3 border-t-0 md:border-t border-neutral-100 flex items-center gap-1.5 md:gap-2 text-[10px] md:text-xs text-neutral-400 font-medium">
									<span>{article.date}</span>
									<span>•</span>
									<div className="flex items-center gap-1">
										<Clock className="w-3 h-3 hidden md:block" />
										<span>{article.readTime}</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
};
