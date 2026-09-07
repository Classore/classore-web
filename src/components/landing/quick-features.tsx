import {
	Bot,
	ClipboardCheck,
	LineChart,
	PlaySquare,
	Users,
} from "lucide-react";
import React from "react";

const features = [
	{
		title: "Video Lessons",
		description: "Learn with easy-to-understand video lessons.",
		icon: PlaySquare,
		color: "text-primary-600 bg-primary-100/70",
	},
	{
		title: "CBT Practice",
		description: "Practice unlimited questions with real exam simulation.",
		icon: ClipboardCheck,
		color: "text-primary-600 bg-primary-100/70",
	},
	{
		title: "AI Tutor",
		description: "Get AI-powered explanations and personalized help.",
		icon: Bot,
		color: "text-primary-600 bg-primary-100/70",
	},
	{
		title: "Community",
		description: "Learn with others, ask questions and get help.",
		icon: Users,
		color: "text-primary-600 bg-primary-100/70",
	},
	{
		title: "Track Progress",
		description: "Monitor your progress and improve every day.",
		icon: LineChart,
		color: "text-primary-600 bg-primary-100/70",
	},
];

export const QuickFeatures: React.FC = () => {
	return (
		<section id="features" className="py-8 bg-white">
			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="rounded-3xl bg-[#F8F5FB] p-6 sm:p-8 lg:p-10">
					<div className="flex flex-wrap justify-center gap-x-2 gap-y-6 sm:grid sm:grid-cols-3 lg:grid-cols-5 sm:gap-6">
						{features.map((feature, idx) => {
							const Icon = feature.icon;
							return (
								<div
									key={idx}
									className={`flex flex-col items-center text-center w-[30%] sm:w-auto group`}>
									<div
										className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 sm:mb-3.5 group-hover:scale-110 transition-transform ${feature.color}`}>
										<Icon className="w-6 h-6" />
									</div>
									<h3 className="text-[11px] sm:text-sm md:text-base font-bold text-neutral-900 mb-1 sm:mb-1.5 leading-tight">
										{feature.title}
									</h3>
									<p className="hidden sm:block text-xs text-neutral-500 leading-relaxed max-w-[180px]">
										{feature.description}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};
