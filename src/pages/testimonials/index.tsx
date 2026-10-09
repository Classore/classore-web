import React from "react";

import { MasonryLayout } from "@/components/layouts";
import { Footer, Navbar, ReviewCard, Seo } from "@/components/shared";
import { TESTIMONIALS } from "@/constants";
import { useDeviceWidth } from "@/hooks/use-device-width";

const Page = () => {
	const { isMobile } = useDeviceWidth();

	return (
		<>
			<Seo
				title="Student & Parent Testimonials – Classore"
				description="Read real stories and exam success reviews from students and parents using Classore across Nigeria."
			/>
			<Navbar />
			<main className="w-full min-h-screen bg-neutral-100 font-geist">
				<section className="bg-gradient-to-b from-primary-100/70 via-primary-50/40 to-neutral-100 pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-neutral-200">
					<div className="container mx-auto flex flex-col items-center justify-center text-center px-4 max-w-2xl space-y-3">
						<p className="text-xs font-bold uppercase tracking-wider text-primary-700">
							Testimonials
						</p>
						<h1 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl lg:text-5xl tracking-tight">
							Real Stories. <span className="text-primary-500">Real Impact.</span>
						</h1>
						<p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
							Discover how students and parents achieve academic excellence, 300+ JAMB scores, and straight A’s in WAEC with Classore.
						</p>
					</div>
				</section>

				<section className="py-12 sm:py-16">
					<div className="container mx-auto px-4 lg:px-8">
						<MasonryLayout breakpointCols={isMobile ? 1 : 3}>
							{TESTIMONIALS.map((review) => (
								<ReviewCard key={review.rating_id} review={review} />
							))}
						</MasonryLayout>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Page;
