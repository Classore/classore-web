import { Quote, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const testimonials = [
	{
		name: "Amaka O.",
		achievement: "JAMB 2024 Top Scorer",
		avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
		quote:
			"Classore helped me go from guessing to understanding. The CBTs and explanations are unbeatable!",
		rating: 5,
	},
	{
		name: "David K.",
		achievement: "IELTS Band 8.0",
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
		quote:
			"The mock tests and AI feedback improved my writing and speaking so much. Highly recommended!",
		rating: 5,
	},
	{
		name: "Sarah U.",
		achievement: "WAEC 8 Distinctions",
		avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
		quote:
			"I love the video lessons and how easy it is to track my progress. Classore is the real deal!",
		rating: 5,
	},
];

export const TestimonialsSection: React.FC = () => {
	const [activeDot, setActiveDot] = useState(0);

	return (
		<section className="py-16 sm:py-24 bg-white">
			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
					<span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400">
						TOP STUDENTS, REAL RESULTS
					</span>
					<h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
						Loved by Thousands of Learners
					</h2>
					<p className="text-sm sm:text-base text-neutral-600">
						Here&apos;s what students are saying about Classore.
					</p>
				</div>

				{/* Testimonial Cards Grid / Scrollable on Mobile */}
				<div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6 gap-4 items-stretch">
					{testimonials.map((item, idx) => (
						<div
							key={idx}
							className="flex flex-col justify-between shrink-0 w-[85%] sm:w-auto snap-center p-6 sm:p-7 rounded-3xl bg-white border border-neutral-200/90 shadow-xs hover:shadow-lg transition-all duration-200">
							<div>
								{/* Header with Avatar and Quote Icon */}
								<div className="flex items-center justify-between mb-5">
									<div className="flex items-center gap-3">
										<div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary-100 shadow-xs">
											<Image
												src={item.avatar}
												alt={item.name}
												fill
												sizes="48px"
												className="object-cover"
											/>
										</div>
										<div>
											<h4 className="text-sm sm:text-base font-bold text-neutral-900">
												{item.name}
											</h4>
											<p className="text-[11px] sm:text-xs font-semibold text-primary-600">
												{item.achievement}
											</p>
										</div>
									</div>

									<div className="w-8 h-8 rounded-full bg-primary-50 text-primary-300 flex items-center justify-center shrink-0 ml-2">
										<Quote className="w-4 h-4 fill-primary-200" />
									</div>
								</div>

								{/* Quote text */}
								<p className="text-[13px] sm:text-sm text-neutral-600 leading-relaxed">
									"{item.quote}"
								</p>
							</div>

							{/* Rating Stars */}
							<div className="flex items-center gap-1 mt-6 pt-4 border-t border-neutral-100">
								{Array.from({ length: item.rating }).map((_, rIdx) => (
									<Star
										key={rIdx}
										className="w-4 h-4 text-amber-400 fill-amber-400"
									/>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Dot Indicators */}
				<div className="flex items-center justify-center gap-2 mt-8">
					{[0, 1, 2, 3, 4].map((dot) => (
						<button
							key={dot}
							onClick={() => setActiveDot(dot)}
							className={`h-2 rounded-full transition-all ${
								dot === activeDot
									? "w-6 bg-primary-400"
									: "w-2 bg-neutral-200 hover:bg-neutral-300"
							}`}
							aria-label={`Go to slide ${dot + 1}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
};
