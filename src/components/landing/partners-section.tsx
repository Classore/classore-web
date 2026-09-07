import { ChevronLeft, ChevronRight, GraduationCap, School, Shield, Trophy } from "lucide-react";
import React, { useState } from "react";

const partners = [
	{
		name: "Greenfield College",
		icon: Shield,
		iconColor: "text-emerald-700 bg-emerald-100",
		borderColor: "border-emerald-200",
	},
	{
		name: "Royal Scholars Academy",
		icon: School,
		iconColor: "text-blue-700 bg-blue-100",
		borderColor: "border-blue-200",
	},
	{
		name: "Excel High School",
		icon: GraduationCap,
		iconColor: "text-amber-700 bg-amber-100",
		borderColor: "border-amber-200",
	},
	{
		name: "Bright Future Academy",
		icon: Trophy,
		iconColor: "text-sky-700 bg-sky-100",
		borderColor: "border-sky-200",
	},
	{
		name: "Visionary College",
		icon: Shield,
		iconColor: "text-purple-700 bg-purple-100",
		borderColor: "border-purple-200",
	},
];

export const PartnersSection: React.FC = () => {
	const [startIndex, setStartIndex] = useState(0);

	const handlePrev = () => {
		setStartIndex((prev) => (prev > 0 ? prev - 1 : partners.length - 1));
	};

	const handleNext = () => {
		setStartIndex((prev) => (prev < partners.length - 1 ? prev + 1 : 0));
	};

	const visiblePartners = [...partners.slice(startIndex), ...partners.slice(0, startIndex)];

	return (
		<section className="py-14 bg-[#FAFAFC] border-y border-neutral-100">
			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
					<span className="text-xs font-bold uppercase tracking-widest text-primary-400">
						TRUSTED BY SCHOOLS & INSTITUTIONS
					</span>
					<h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
						Partnering for Better Education
					</h2>
					<p className="text-xs sm:text-sm text-neutral-500">
						We work with forward-thinking schools and organizations.
					</p>
				</div>

				{/* Desktop Strip with Navigation Chevrons */}
				<div className="flex items-center justify-center gap-2 sm:gap-4">
					<button
						onClick={handlePrev}
						className="hidden sm:flex w-9 h-9 rounded-full border border-neutral-200 bg-white items-center justify-center text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 shadow-xs transition-colors shrink-0"
						aria-label="Previous partners">
						<ChevronLeft className="w-4 h-4" />
					</button>

					<div className="flex overflow-x-auto snap-x snap-mandatory pb-4 sm:pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-nowrap items-center sm:justify-center gap-3 sm:gap-6 w-full">
						{visiblePartners.map((partner, idx) => {
							const Icon = partner.icon;
							return (
								<div
									key={idx}
									className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-neutral-200 shadow-2xs hover:shadow-xs transition-shadow shrink-0 snap-center">
									<div
										className={`w-9 h-9 rounded-xl ${partner.iconColor} flex items-center justify-center`}>
										<Icon className="w-5 h-5" />
									</div>
									<span className="text-xs sm:text-sm font-bold text-neutral-800 whitespace-nowrap">
										{partner.name}
									</span>
								</div>
							);
						})}
					</div>

					<button
						onClick={handleNext}
						className="hidden sm:flex w-9 h-9 rounded-full border border-neutral-200 bg-white items-center justify-center text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 shadow-xs transition-colors shrink-0"
						aria-label="Next partners">
						<ChevronRight className="w-4 h-4" />
					</button>
				</div>
				
				{/* Mobile Dots */}
				<div className="flex sm:hidden items-center justify-center gap-2 mt-4">
					{[0, 1, 2, 3].map((dot) => (
						<div
							key={dot}
							className={`h-1.5 rounded-full transition-all ${
								dot === 0 ? "w-5 bg-primary-400" : "w-1.5 bg-neutral-200"
							}`}
						/>
					))}
				</div>
			</div>
		</section>
	);
};
