import { BookOpen, CheckCircle2, MessageSquare, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const activities = [
	{
		type: "score",
		user: "Janet",
		action: "scored",
		highlight: "342/400",
		context: "in JAMB Practice",
		time: "2m ago",
		avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
	},
	{
		type: "topic",
		user: "David",
		action: "completed",
		highlight: "Mathematics",
		context: "Topic: Trigonometry",
		time: "5m ago",
		icon: BookOpen,
		iconBg: "bg-emerald-100 text-emerald-700",
	},
	{
		type: "achievement",
		user: "Sarah",
		action: "achieved",
		highlight: "Band 8.0",
		context: "in IELTS Practice",
		time: "8m ago",
		icon: CheckCircle2,
		iconBg: "bg-amber-100 text-amber-700",
	},
	{
		type: "community",
		user: "Michael",
		action: "joined a",
		highlight: "Physics Discussion",
		context: "",
		time: "10m ago",
		icon: MessageSquare,
		iconBg: "bg-rose-100 text-rose-700",
	},
];

export const LiveActivitySection: React.FC = () => {
	return (
		<section className="py-16 sm:py-20 bg-white">
			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
					<span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400">
						LIVE ACTIVITY
					</span>
					<h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
						Real People. Real Progress.
					</h2>
					<p className="text-sm sm:text-base text-neutral-600">
						See what learners are achieving on Classore right now.
					</p>
				</div>

				{/* Main Activities Row */}
				<div className="rounded-3xl bg-[#FAF9FD] border border-primary-100/70 p-6 sm:p-8">
					<div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
						{/* Active Count Card */}
						<div className="flex flex-col justify-center items-center text-center p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs shrink-0 w-[60%] sm:w-auto snap-center">
							<div className="w-11 h-11 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-2.5">
								<Users className="w-5 h-5" />
							</div>
							<span className="text-2xl font-black text-neutral-900">1,248</span>
							<div className="flex items-center justify-center gap-1.5 mt-1 text-left sm:text-center w-full">
								<span className="relative flex h-2 w-2 shrink-0">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
									<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
								</span>
								<span className="text-[10px] sm:text-xs font-semibold text-neutral-600 leading-tight">Learners <br className="sm:hidden" />active now</span>
							</div>
						</div>

						{/* Feed Items */}
						{activities.map((item, idx) => (
							<div
								key={idx}
								className="flex flex-col justify-between p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md transition-shadow shrink-0 w-[60%] sm:w-auto snap-center">
								<div className="space-y-3">
									<div className="flex items-center justify-between">
										{item.avatar ? (
											<div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-200">
												<Image
													src={item.avatar}
													alt={item.user}
													fill
													sizes="32px"
													className="object-cover"
												/>
											</div>
										) : item.icon ? (
											<div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center`}>
												<item.icon className="w-4 h-4" />
											</div>
										) : null}
									</div>

									<div>
										<p className="text-xs text-neutral-500">
											<strong className="text-neutral-800">{item.user}</strong> {item.action}
										</p>
										<p className="text-[13px] sm:text-sm font-bold text-neutral-900 mt-0.5 leading-snug">{item.highlight}</p>
										{item.context && (
											<p className="text-[10px] sm:text-[11px] text-neutral-500 mt-0.5 leading-tight">{item.context}</p>
										)}
									</div>
								</div>

								<div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
									<span>{item.time}</span>
									<Sparkles className="w-3 h-3 text-primary-300" />
								</div>
							</div>
						))}
					</div>
				</div>

				{/* CTA Button */}
				<div className="mt-10 text-center">
					<Button
						asChild
						variant="outline"
						className="rounded-xl px-7 py-5 text-sm font-semibold border-neutral-300 hover:bg-neutral-50 text-neutral-800">
						<Link href="/signin">Explore Community &rarr;</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};
