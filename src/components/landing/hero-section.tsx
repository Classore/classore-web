import {
	Atom,
	BookOpen,
	ChevronRight,
	Download,
	Flame,
	FlaskConical,
	GraduationCap,
	Home,
	Sparkles,
	Trophy,
	User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

interface HeroSectionProps {
	onOpenDownloadModal: () => void;
}

const avatars = [
	"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
	"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
	"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
	"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
	"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDownloadModal }) => {
	return (
		<section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF8FD] via-[#F4EFFB] to-[#FFFFFF]">
			{/* Ambient background blur elements */}
			<div className="absolute top-20 right-10 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
			<div className="absolute bottom-10 left-10 w-80 h-80 bg-secondary-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
					{/* Left Column: Headline, CTAs, Social Proof */}
					<div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 md:space-y-8">
						{/* Live Contest Pill */}
						<a
							href="#contests"
							className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100/80 border border-primary-200/70 text-xs font-semibold text-primary-700 hover:bg-primary-200/60 transition-all hover:scale-[1.02] shadow-xs">
							<span className="text-sm">🎉</span>
							<span>New: JAMB Challenge 2025 is Live! Win amazing prizes</span>
						</a>

						{/* Main Heading */}
						<div className="space-y-2">
							<h1 className="text-5xl lg:text-6xl font-extrabold text-[#281745] tracking-tight leading-[1.12]">
								<span className="block sm:inline">Learn. </span>
								<span className="block sm:inline">Practice. </span>
								<br className="hidden sm:block" />
								<span className="block sm:inline text-[#643BAE]">Succeed.</span>
							</h1>
						</div>

						{/* Subtitle */}
						<p className="text-[13px] sm:text-base md:text-lg text-neutral-600 max-w-lg leading-relaxed">
							<span className="hidden sm:inline">Classore is your all-in-one learning and test preparation platform. Learn with videos, practice with CBT, compete with others and achieve your best.</span>
							<span className="sm:hidden">Your all-in-one learning and test preparation platform.</span>
						</p>

						{/* CTAs */}
						<div className="flex flex-row items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto justify-center lg:justify-start">
							<Button
								asChild
								className="flex-1 sm:flex-none bg-[#281745] hover:bg-[#382060] text-white text-[13px] sm:text-base font-semibold px-4 sm:px-8 py-5 sm:py-6 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
								<Link href="/signup">Get Started Free</Link>
							</Button>
							<Button
								type="button"
								variant="outline"
								onClick={onOpenDownloadModal}
								className="flex-1 sm:flex-none border-neutral-300 hover:bg-white/80 text-neutral-800 text-[13px] sm:text-base font-semibold px-4 sm:px-6 py-5 sm:py-6 rounded-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2">
								<Download className="w-4 h-4 text-neutral-700" />
								Download App
							</Button>
						</div>

						{/* Social Proof */}
						<div className="flex flex-col sm:flex-row items-center lg:items-start gap-2 sm:gap-3 pt-2 text-center sm:text-left">
							<div className="flex -space-x-2.5 overflow-hidden">
								{avatars.map((avatar, i) => (
									<div
										key={i}
										className="inline-block relative h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-white overflow-hidden shadow-xs">
										<Image
											src={avatar}
											alt="Learner avatar"
											fill
											sizes="(max-width: 640px) 32px, 36px"
											className="object-cover"
										/>
									</div>
								))}
							</div>
							<p className="text-[11px] sm:text-sm text-neutral-600 font-medium leading-snug">
								Join <span className="font-bold text-neutral-900">200,000+</span> students <br className="sm:hidden" />
								already learning on Classore
							</p>
						</div>
					</div>

					{/* Right Column: High-Fidelity Phone Mockup + Daily Streak Widget */}
					<div className="lg:col-span-6 flex justify-center lg:justify-end relative">
						{/* Background circular highlight */}
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] bg-gradient-to-tr from-primary-200/50 to-primary-100/20 rounded-full blur-2xl -z-10" />

						{/* Sparkle decorative element */}
						<div className="absolute -top-4 right-12 text-primary-400 hidden sm:block">
							<Sparkles className="w-8 h-8 opacity-70 animate-pulse" />
						</div>

						<div className="relative w-full max-w-[320px] sm:max-w-[350px]">
							{/* Realistic Phone Device Frame */}
							<div className="relative rounded-[42px] p-3 bg-neutral-900 shadow-2xl border-4 border-neutral-800 ring-1 ring-black/20">
								{/* Screen Container */}
								<div className="rounded-[34px] overflow-hidden bg-white text-neutral-900 border border-neutral-100">
									{/* Top Status & Island */}
									<div className="bg-[#281745] text-white pt-2.5 px-6 pb-2">
										<div className="flex justify-between items-center text-[10px] font-medium opacity-80">
											<span>9:41</span>
											{/* Dynamic Island */}
											<div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
											<div className="flex items-center gap-1">
												<span className="text-[9px]">5G</span>
												<div className="w-4 h-2 border border-white/60 rounded-xs flex items-center p-0.5">
													<div className="w-full h-full bg-white rounded-2xs" />
												</div>
											</div>
										</div>
									</div>

									{/* App Header (Purple) */}
									<div className="bg-[#281745] text-white px-5 pt-3 pb-6 rounded-b-2xl">
										<div className="flex items-center justify-between">
											<div className="text-left">
												<h3 className="text-sm font-bold flex items-center gap-1.5">
													Hey, Chisom! <span>👋</span>
												</h3>
												<p className="text-[11px] text-primary-200 mt-0.5">
													Let&apos;s continue your learning journey
												</p>
											</div>
											<div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
												<Sparkles className="w-3.5 h-3.5 text-primary-200" />
											</div>
										</div>

										{/* Practice Summary Card */}
										<div className="mt-4 bg-white text-neutral-900 rounded-xl p-3.5 shadow-md">
											<div className="flex items-center justify-between mb-1">
												<span className="text-xs font-bold text-neutral-800">JAMB Practice</span>
												<span className="text-[10px] bg-primary-100 text-primary-700 font-semibold px-2 py-0.5 rounded-full">
													Active
												</span>
											</div>
											<div className="flex items-baseline justify-between mt-1">
												<span className="text-[11px] text-neutral-500">Your Score</span>
												<span className="text-base font-extrabold text-primary-900">
													320 <span className="text-xs font-normal text-neutral-400">/ 400</span>
												</span>
											</div>
											<button className="mt-2.5 w-full py-2 bg-[#281745] hover:bg-[#382060] text-white text-xs font-semibold rounded-lg transition-colors">
												Continue Practice
											</button>
										</div>
									</div>

									{/* App Subjects List */}
									<div className="p-4 space-y-2.5">
										<div className="flex items-center justify-between text-xs">
											<span className="font-bold text-neutral-800">Subjects</span>
											<span className="text-[11px] text-primary-400 font-semibold cursor-pointer">
												View all
											</span>
										</div>

										{/* Mathematics */}
										<div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
											<div className="flex items-center gap-2.5">
												<div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
													<BookOpen className="w-3.5 h-3.5" />
												</div>
												<div className="text-left">
													<p className="text-xs font-semibold text-neutral-800">Mathematics</p>
													<p className="text-[10px] text-neutral-500">120 Topics</p>
												</div>
											</div>
											<ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
										</div>

										{/* English */}
										<div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
											<div className="flex items-center gap-2.5">
												<div className="w-7 h-7 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
													<GraduationCap className="w-3.5 h-3.5" />
												</div>
												<div className="text-left">
													<p className="text-xs font-semibold text-neutral-800">English</p>
													<p className="text-[10px] text-neutral-500">85 Topics</p>
												</div>
											</div>
											<ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
										</div>

										{/* Chemistry */}
										<div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
											<div className="flex items-center gap-2.5">
												<div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
													<FlaskConical className="w-3.5 h-3.5" />
												</div>
												<div className="text-left">
													<p className="text-xs font-semibold text-neutral-800">Chemistry</p>
													<p className="text-[10px] text-neutral-500">68 Topics</p>
												</div>
											</div>
											<ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
										</div>

										{/* Physics */}
										<div className="flex items-center justify-between p-2.5 bg-neutral-50 rounded-xl border border-neutral-100">
											<div className="flex items-center gap-2.5">
												<div className="w-7 h-7 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
													<Atom className="w-3.5 h-3.5" />
												</div>
												<div className="text-left">
													<p className="text-xs font-semibold text-neutral-800">Physics</p>
													<p className="text-[10px] text-neutral-500">76 Topics</p>
												</div>
											</div>
											<ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
										</div>
									</div>

									{/* App Bottom Navigation Bar inside phone */}
									<div className="border-t border-neutral-100 bg-white px-6 py-2 flex items-center justify-between text-neutral-400">
										<div className="flex flex-col items-center gap-0.5 text-primary-400">
											<Home className="w-4 h-4" />
											<span className="text-[9px] font-bold">Home</span>
										</div>
										<div className="flex flex-col items-center gap-0.5">
											<BookOpen className="w-4 h-4" />
											<span className="text-[9px]">Practice</span>
										</div>
										<div className="flex flex-col items-center gap-0.5">
											<Trophy className="w-4 h-4" />
											<span className="text-[9px]">Contests</span>
										</div>
										<div className="flex flex-col items-center gap-0.5">
											<User className="w-4 h-4" />
											<span className="text-[9px]">Profile</span>
										</div>
									</div>
								</div>
							</div>

							{/* Floating Streak Widget */}
							<div className="absolute -right-4 sm:-right-8 top-44 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl border border-neutral-100 flex flex-col items-start gap-1 animate-bounce duration-1000 [animation-duration:3s]">
								<div className="flex items-center gap-1.5 text-neutral-600 text-[11px] font-semibold">
									<span>Daily Streak</span>
								</div>
								<div className="flex items-center gap-1.5">
									<Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
									<span className="text-lg font-black text-neutral-900">7</span>
									<span className="text-xs text-neutral-500 font-medium">Days</span>
								</div>
								<span className="text-[10px] text-primary-400 font-semibold">Keep it up!</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
