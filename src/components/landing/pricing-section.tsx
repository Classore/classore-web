import { Check, Coins, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";


interface PricingPlan {
	name: string;
	price: string;
	tokens: string;
	popular?: boolean;
	features: string[];
}

const plans: PricingPlan[] = [
	{
		name: "Starter",
		price: "₦1,000",
		tokens: "100 Tokens",
		features: [
			"Access to all video lessons",
			"Practice CBTs",
			"Basic performance analytics",
		],
	},
	{
		name: "Pro",
		price: "₦3,000",
		tokens: "350 Tokens",
		popular: true,
		features: [
			"Everything in Starter",
			"AI Tutor & Explanations",
			"Detailed performance analytics",
			"Priority support",
		],
	},
	{
		name: "Advanced",
		price: "₦5,000",
		tokens: "600 Tokens",
		features: [
			"Everything in Pro",
			"Mock exams & simulations",
			"Download resources",
			"Priority support",
		],
	},
	{
		name: "Premium",
		price: "₦10,000",
		tokens: "1,400 Tokens",
		features: [
			"Everything in Advanced",
			"Unlimited mock exams",
			"1-on-1 teacher support",
			"Early access to new features",
		],
	},
];

export const PricingSection: React.FC = () => {
	return (
		<section id="pricing" className="py-16 sm:py-24 bg-white">
			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
					<span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400">
						PRICING THAT WORKS FOR YOU
					</span>
					<h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
						Affordable Learning with Tokens
					</h2>
					<p className="text-sm sm:text-base text-neutral-600">
						Choose a plan that fits your goals. Spend tokens to access any exam, lesson or test.
					</p>
				</div>

				{/* Scrollable on mobile, Grid on desktop */}
				<div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pt-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 items-stretch">
					{/* 4 Plan Cards */}
					{plans.map((plan, idx) => (
						<Link
							key={idx}
							href={`/signup?plan=${plan.name.toLowerCase()}`}
							className={`group relative flex flex-col justify-between p-6 rounded-3xl bg-white shrink-0 w-[85%] sm:w-auto snap-center transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-xl ${
								plan.popular
									? "border-2 border-amber-500 shadow-lg ring-4 ring-amber-500/10"
									: "border border-neutral-200/90 shadow-xs hover:shadow-md hover:border-primary-300"
							}`}>
							{plan.popular && (
								<div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs whitespace-nowrap">
									Most Popular
								</div>
							)}

							<div>
								{/* Plan Header */}
								<div className="flex items-center gap-2 mb-3">
									<div className="w-8 h-8 rounded-lg bg-primary-100/80 text-primary-600 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
										<Coins className="w-4 h-4" />
									</div>
									<h3 className="text-base font-bold text-neutral-900">{plan.name}</h3>
								</div>

								{/* Price & Tokens */}
								<div className="mb-6">
									<div className="text-2xl sm:text-3xl font-black text-neutral-900">{plan.price}</div>
									<p className="text-xs font-semibold text-primary-600 mt-0.5">{plan.tokens}</p>
								</div>

								{/* Features List */}
								<div className="space-y-2.5 pt-4 border-t border-neutral-100">
									{plan.features.map((feat, fIdx) => (
										<div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-600">
											<Check className="w-3.5 h-3.5 text-[#281745] shrink-0 mt-0.5" />
											<span className="leading-snug">{feat}</span>
										</div>
									))}
								</div>
							</div>

							{/* Button */}
							<div className="mt-8 pt-4">
								<div
									className={`w-full rounded-xl py-3.5 text-center text-xs font-bold transition-all ${
										plan.popular
											? "bg-[#281745] group-hover:bg-[#382060] text-white shadow-sm"
											: "border border-neutral-300 text-neutral-800 group-hover:bg-neutral-50"
									}`}>
									Get Started
								</div>
							</div>
						</Link>
					))}

					{/* 5th Card: Why Classore? */}
					<Link
						href="/signup"
						className="shrink-0 w-[85%] sm:w-auto snap-center rounded-3xl p-6 bg-gradient-to-br from-[#F6F0FD] to-[#EDE4FA] border border-primary-100 flex flex-col justify-between shadow-xs cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
						<div>
							<div className="flex items-center gap-2 mb-4">
								<div className="w-8 h-8 rounded-lg bg-primary-200 text-primary-700 flex items-center justify-center">
									<Sparkles className="w-4 h-4" />
								</div>
								<h3 className="text-base font-bold text-neutral-900">Why Classore?</h3>
							</div>

							<div className="space-y-3 pt-2 text-xs font-medium text-neutral-700">
								<div className="flex items-center gap-2">
									<span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" />
									<span>Pay once, use across all exams</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" />
									<span>No monthly subscriptions</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" />
									<span>Secure payments</span>
								</div>
								<div className="flex items-center gap-2">
									<span className="w-2 h-2 rounded-full bg-primary-600 shrink-0" />
									<span>Use on web & mobile</span>
								</div>
							</div>
						</div>

						{/* 3D Token Visual Representation */}
						<div className="relative -mx-6 -mb-6 mt-6 overflow-hidden rounded-b-3xl">
							<Image
								src="/assets/images/why-classore-tokens.jpg"
								alt="Why Classore - Tokens"
								width={360}
								height={220}
								className="w-full h-auto object-cover object-bottom"
								priority
							/>
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};
