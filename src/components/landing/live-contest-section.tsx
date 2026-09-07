import { ArrowRight, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

const leaderboardData = [
	{
		rank: 1,
		name: "Chisom M.",
		points: "3460 pts",
		avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80",
		badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
	},
	{
		rank: 2,
		name: "Daniel O.",
		points: "3320 pts",
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
		badgeColor: "bg-slate-200 text-slate-700 border-slate-300",
	},
	{
		rank: 3,
		name: "Sarah A.",
		points: "3275 pts",
		avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80",
		badgeColor: "bg-orange-100 text-orange-800 border-orange-300",
	},
	{
		rank: 4,
		name: "Emmanuel B.",
		points: "3090 pts",
		avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
	},
	{
		rank: 5,
		name: "Hannah K.",
		points: "2985 pts",
		avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80",
	},
	{
		rank: 24,
		name: "You",
		points: "1250 pts",
		avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80",
		isCurrentUser: true,
	},
];

export const LiveContestSection: React.FC = () => {
	const [timeLeft, setTimeLeft] = useState({ days: 10, hours: 14, minutes: 32, seconds: 45 });

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev.seconds > 0) {
					return { ...prev, seconds: prev.seconds - 1 };
				}
				if (prev.minutes > 0) {
					return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
				}
				if (prev.hours > 0) {
					return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
				}
				return prev;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<section id="contests" className="py-16 sm:py-24 bg-[#FAFAFC]">
			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
					<span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary-400">
						LIVE CONTEST
					</span>
					<h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
						Compete. Win. Get Rewarded.
					</h2>
					<p className="text-sm sm:text-base text-neutral-600">
						Join exciting contests, climb the leaderboard and win amazing prizes.
					</p>
				</div>

				{/* Two Main Cards Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
					{/* Left: Featured Contest Card */}
					<div>
						<div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#281745] via-[#3B1C63] to-[#200F38] text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
							{/* Background decorative shine */}
							<div className="absolute top-0 right-0 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />

							<div className="relative z-10">
								<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
									<div>
										<h3 className="text-xl sm:text-2xl font-bold">JAMB Challenge 2025</h3>
										<p className="text-xs sm:text-sm text-primary-200 mt-1">
											Test your knowledge. Win big.
										</p>
									</div>

									{/* 3D Gold Trophy Visual */}
									<div className="relative w-28 h-28 sm:w-36 sm:h-36 self-center sm:self-auto drop-shadow-2xl">
										<Image
											src="/assets/images/jamb-challenge-trophy.png"
											alt="JAMB Challenge 2025 Trophy"
											fill
											sizes="(max-width: 640px) 112px, 144px"
											className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
											priority
										/>
									</div>
								</div>

								{/* Grand Prize Box */}
								<div className="mt-4 sm:mt-2 space-y-1">
									<span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-white/10 text-amber-300 px-2.5 py-1 rounded-md border border-white/10">
										Grand Prize
									</span>
									<div className="flex flex-wrap items-baseline gap-2 pt-1">
										<span className="text-3xl sm:text-4xl font-extrabold text-white">₦50,000</span>
										<span className="text-xs sm:text-sm text-primary-200 font-medium">
											+ Other exciting rewards
										</span>
									</div>
								</div>
							</div>

							{/* Footer Meta & Join Button */}
							<div className="mt-8 pt-6 border-t border-white/15 relative z-10 space-y-5">
								<div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
									<div className="flex items-center gap-2 text-primary-100">
										<Clock className="w-4 h-4 text-amber-400" />
										<span className="font-semibold font-mono">
											Ends in {timeLeft.days}D : {timeLeft.hours}H : {timeLeft.minutes}M
										</span>
									</div>
									<div className="flex items-center gap-2 text-primary-100">
										<Users className="w-4 h-4 text-primary-300" />
										<span>Participants: <strong className="text-white">2,341</strong></span>
									</div>
								</div>

								<Button
									asChild
									className="w-full bg-[#F67F36] hover:bg-[#DE7231] text-white text-base font-bold py-6 rounded-xl shadow-md transition-all hover:shadow-lg">
									<Link href="https://test.classore.com/contest">Join Contest</Link>
								</Button>
							</div>
						</div>

						{/* Mobile Dots */}
						<div className="flex lg:hidden items-center justify-center gap-2 mt-4 mb-2">
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

					{/* Right: Leaderboard Card */}
					<div className="lg:col-span-5 rounded-3xl p-6 sm:p-7 bg-white border border-neutral-200/90 shadow-sm flex flex-col justify-between">
						<div>
							<div className="flex items-center justify-between mb-4">
								<div>
									<span className="text-[10px] font-bold uppercase tracking-wider text-primary-400">
										LEADERBOARD
									</span>
									<h3 className="text-base sm:text-lg font-bold text-neutral-900">
										Top Performers
									</h3>
								</div>
								<Link
									href="/signin"
									className="inline-flex items-center gap-1 text-xs font-bold text-primary-400 hover:text-primary-600 transition-colors">
									<span>View Full</span>
									<ArrowRight className="w-3.5 h-3.5" />
								</Link>
							</div>

							{/* Leaderboard List */}
							<div className="space-y-2.5">
								{leaderboardData.map((item, idx) => (
									<div
										key={idx}
										className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
											item.isCurrentUser
												? "bg-primary-50/80 border border-primary-200 font-semibold"
												: "hover:bg-neutral-50"
										}`}>
										<div className="flex items-center gap-3">
											{/* Rank Badge */}
											<span
												className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
													item.rank === 1
														? "bg-amber-100 text-amber-700"
														: item.rank === 2
														? "bg-slate-100 text-slate-600"
														: item.rank === 3
														? "bg-orange-100 text-orange-700"
														: "text-neutral-500"
												}`}>
												{item.rank}
											</span>

											{/* Avatar */}
											<div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-200">
												<Image
													src={item.avatar}
													alt={item.name}
													fill
													sizes="32px"
													className="object-cover"
												/>
											</div>

											{/* Name */}
											<span className="text-xs sm:text-sm font-semibold text-neutral-800">
												{item.name}
											</span>
										</div>

										{/* Points */}
										<span className="text-xs font-bold text-neutral-900 font-mono">
											{item.points}
										</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Section Link */}
				<div className="mt-10 text-center">
					<Button
						asChild
						variant="outline"
						className="rounded-xl px-7 py-5 text-sm font-semibold border-neutral-300 hover:bg-neutral-50 text-neutral-800">
						<Link href="https://test.classore.com/contest">View All Contests &rarr;</Link>
					</Button>
				</div>
			</div>
		</section>
	);
};
