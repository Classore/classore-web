import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

interface ExamItem {
	name: string;
	tag: string;
	desc: string;
	logo: string;
	color: string;
	borderColor: string;
	bgLight: string;
	href: string;
}

const exams: ExamItem[] = [
	{
		name: "JAMB",
		tag: "UTME Practice",
		desc: "Unified Tertiary Matriculation Examination",
		logo: "/assets/logos/jamb.png",
		color: "text-emerald-700",
		borderColor: "border-emerald-100",
		bgLight: "bg-emerald-50",
		href: "https://test.classore.com/contest/(tabs)/practice?exam=jamb",
	},
	{
		name: "WAEC",
		tag: "School Practice",
		desc: "West African Senior School Certificate Examination",
		logo: "/assets/logos/waec.png",
		color: "text-blue-700",
		borderColor: "border-blue-100",
		bgLight: "bg-blue-50",
		href: "https://test.classore.com/contest/(tabs)/practice?exam=waec",
	},
	{
		name: "IELTS",
		tag: "Academic Test",
		desc: "International English Language Testing System",
		logo: "/assets/logos/ielts.png",
		color: "text-amber-700",
		borderColor: "border-amber-100",
		bgLight: "bg-amber-50",
		href: "https://test.classore.com/contest/(tabs)/practice?exam=ielts",
	},
	{
		name: "TOEFL",
		tag: "Test Preparation",
		desc: "Test of English as a Foreign Language",
		logo: "/assets/logos/toefl.png",
		color: "text-purple-700",
		borderColor: "border-purple-100",
		bgLight: "bg-purple-50",
		href: "https://test.classore.com/contest/(tabs)/practice?exam=toefl",
	},
	{
		name: "NECO",
		tag: "School Practice",
		desc: "National Examinations Council Senior Certificate",
		logo: "/assets/logos/neco.png",
		color: "text-rose-700",
		borderColor: "border-rose-100",
		bgLight: "bg-rose-50",
		href: "https://test.classore.com/contest/(tabs)/practice?exam=neco",
	},
];

export const TestCenterSection: React.FC = () => {
	return (
		<section id="exams" className="py-16 sm:py-20 bg-white">
			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
					<span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400">
						TEST CENTER
					</span>
					<h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
						Prepare for Your Exams
					</h2>
					<p className="text-sm sm:text-base text-neutral-600">
						Practice with real exam simulations and detailed performance analysis.
					</p>
				</div>

				{/* Desktop & Tablet Cards Grid */}
				<div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
					{exams.map((exam, idx) => (
						<div
							key={idx}
							className={`flex flex-col justify-between p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group`}>
							<div className="space-y-4">
								<div className={`w-12 h-12 rounded-xl ${exam.bgLight} p-2 flex items-center justify-center relative overflow-hidden`}>
									<Image
										src={exam.logo}
										alt={`${exam.name} logo`}
										width={36}
										height={36}
										className="object-contain"
									/>
								</div>

								<div>
									<h3 className="text-lg font-bold text-neutral-900">{exam.name}</h3>
									<p className="text-xs text-neutral-500 font-medium mt-0.5">{exam.tag}</p>
								</div>
							</div>

							<div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between">
								<Link
									href={exam.href}
									className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-700 group-hover:text-primary-600 transition-colors">
									<span>Practice Now</span>
									<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
								</Link>
								<div className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 group-hover:border-primary-200 group-hover:text-primary-600 transition-colors">
									<ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Mobile List View matching design */}
				<div className="sm:hidden flex flex-col gap-3">
					{exams.map((exam, idx) => (
						<Link
							key={idx}
							href={exam.href}
							className="flex items-center justify-between p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs hover:bg-neutral-50 active:scale-[0.99] transition-all">
							<div className="flex items-center gap-3.5">
								<div className={`w-11 h-11 rounded-xl ${exam.bgLight} p-2 flex items-center justify-center relative`}>
									<Image
										src={exam.logo}
										alt={`${exam.name} logo`}
										width={28}
										height={28}
										className="object-contain"
									/>
								</div>
								<div>
									<h4 className="text-sm font-bold text-neutral-900">{exam.name}</h4>
									<p className="text-xs text-neutral-500">{exam.tag}</p>
								</div>
							</div>
							<ChevronRight className="w-4 h-4 text-neutral-400" />
						</Link>
					))}
				</div>

				{/* Bottom CTA */}
				<div className="mt-12 text-center">
					<Button
						asChild
						variant="outline"
						className="rounded-xl px-8 py-5 text-sm font-semibold border-neutral-300 hover:bg-neutral-50 text-neutral-800">
						<Link href="https://test.classore.com/contest/(tabs)/practice">View All Exams</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};
