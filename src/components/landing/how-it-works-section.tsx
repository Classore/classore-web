import {
	BarChart3,
	BookOpen,
	Download,
	GraduationCap,
	PlaySquare,
	Target,
	Trophy,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

interface HowItWorksSectionProps {
	onOpenDownloadModal: () => void;
}

const steps = [
	{
		number: 1,
		title: "Choose Your Goal",
		description: "Pick an exam or subject you want to master.",
		icon: Target,
		color: "bg-purple-600 text-white",
		ringColor: "ring-purple-200",
		badgeBg: "bg-purple-100 text-purple-700",
	},
	{
		number: 2,
		title: "Learn & Understand",
		description: "Watch video lessons and learn at your pace.",
		icon: PlaySquare,
		color: "bg-blue-600 text-white",
		ringColor: "ring-blue-200",
		badgeBg: "bg-blue-100 text-blue-700",
	},
	{
		number: 3,
		title: "Practice & Test",
		description: "Take CBTs and practice with real exam questions.",
		icon: BookOpen,
		color: "bg-amber-500 text-white",
		ringColor: "ring-amber-200",
		badgeBg: "bg-amber-100 text-amber-700",
	},
	{
		number: 4,
		title: "Track Progress",
		description: "Get detailed analytics and see your improvement.",
		icon: BarChart3,
		color: "bg-emerald-600 text-white",
		ringColor: "ring-emerald-200",
		badgeBg: "bg-emerald-100 text-emerald-700",
	},
	{
		number: 5,
		title: "Achieve Your Best",
		description: "Stay consistent and achieve your goals.",
		icon: Trophy,
		color: "bg-pink-600 text-white",
		ringColor: "ring-pink-200",
		badgeBg: "bg-pink-100 text-pink-700",
	},
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ onOpenDownloadModal }) => {
	return (
		<section className="py-16 sm:py-24 bg-white">
			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
					<span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400">
						HOW CLASSORE WORKS
					</span>
					<h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
						Simple Steps. Smarter Results.
					</h2>
					<p className="text-sm sm:text-base text-neutral-600">
						Everything you need to learn, practice and improve.
					</p>
				</div>

				{/* Desktop Steps Flow with Connecting Line */}
				<div className="hidden lg:block relative mb-20">
					{/* Connecting Dotted Line behind steps */}
					<div className="absolute top-10 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-neutral-200 -z-0" />

					<div className="grid grid-cols-5 gap-6 relative z-10">
						{steps.map((step) => {
							const Icon = step.icon;
							return (
								<div key={step.number} className="flex flex-col items-center text-center group">
									{/* Step Number & Icon Circle */}
									<div className="relative mb-5">
										<div
											className={`w-16 h-16 rounded-2xl ${step.badgeBg} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
											<Icon className="w-7 h-7" />
										</div>
										<span
											className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${step.color} text-[11px] font-bold flex items-center justify-center shadow-xs`}>
											{step.number}
										</span>
									</div>

									<h3 className="text-base font-bold text-neutral-900 mb-1.5">{step.title}</h3>
									<p className="text-xs text-neutral-500 leading-relaxed max-w-[190px]">
										{step.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* Mobile / Tablet Step Cards */}
				<div className="lg:hidden flex flex-col gap-4 sm:gap-5 mb-16">
					{steps.map((step) => {
						const Icon = step.icon;
						return (
							<div
								key={step.number}
								className="flex items-start gap-3 sm:gap-4 px-2">
								<div className="relative shrink-0 flex items-center justify-center">
									<span className="text-[11px] font-extrabold text-neutral-800 mr-2 sm:mr-3 w-3 text-right">
										{step.number}
									</span>
									<div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl ${step.badgeBg} flex items-center justify-center`}>
										<Icon className="w-4 h-4 sm:w-5 sm:h-5" />
									</div>
								</div>
								<div className="pt-0.5">
									<h4 className="text-[13px] sm:text-sm font-bold text-neutral-900">{step.title}</h4>
									<p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 leading-snug">{step.description}</p>
								</div>
							</div>
						);
					})}
				</div>

				{/* Mid-Page CTA Banner */}
				<div className="rounded-3xl bg-gradient-to-r from-[#281745] via-[#381C60] to-[#1E0F36] p-7 sm:p-10 text-white shadow-xl relative overflow-hidden">
					{/* Ambient glow */}
					<div className="absolute top-0 right-0 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
						{/* Left: 3D Illustration */}
						<div className="lg:col-span-3 flex justify-center lg:justify-start">
							<div className="relative flex items-center justify-center p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
								<GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 text-amber-300 drop-shadow-md" />
							</div>
						</div>

						{/* Center: Content */}
						<div className="lg:col-span-5 text-center lg:text-left space-y-2">
							<h3 className="text-2xl sm:text-3xl font-extrabold text-white">
								Ready to achieve your best?
							</h3>
							<p className="text-xs sm:text-sm text-primary-200">
								Join thousands of students learning, practicing and succeeding with Classore.
							</p>
						</div>

						{/* Right: CTA Buttons */}
						<div className="lg:col-span-4 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3">
							<Button
								asChild
								className="w-full sm:w-auto bg-[#F67F36] hover:bg-[#DE7231] text-white font-bold px-6 py-6 rounded-xl shadow-md transition-all">
								<Link href="/signup">Get Started Free</Link>
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={onOpenDownloadModal}
								className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white/20 text-white font-semibold px-5 py-6 rounded-xl flex items-center justify-center gap-2">
								<Download className="w-4 h-4 text-white" />
								<span>Download App</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
