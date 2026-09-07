import {
	BookOpen,
	Download,
	Facebook,
	GraduationCap,
	Heart,
	Home,
	Instagram,
	Rocket,
	Trophy,
	Twitter,
	User,
	Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface FooterCtaAndFooterProps {
	onOpenDownloadModal: () => void;
}

export const FooterCtaAndFooter: React.FC<FooterCtaAndFooterProps> = ({
	onOpenDownloadModal,
}) => {
	const [email, setEmail] = useState("");

	const handleSubscribe = (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !email.includes("@")) {
			toast.error("Please enter a valid email address");
			return;
		}
		toast.success("Thank you for subscribing to Classore updates!");
		setEmail("");
	};

	return (
		<>
			{/* Bottom CTA Banner + Footer Container */}
			<div className="bg-[#190C2C] text-white pt-12 pb-24 sm:pb-12">
				<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Rocket Call To Action Banner */}
					<div className="rounded-3xl bg-gradient-to-r from-[#2F1557] via-[#411F74] to-[#250F46] p-7 sm:p-10 border border-white/10 shadow-2xl mb-16 relative overflow-hidden">
						{/* Background ambient glow */}
						<div className="absolute top-0 right-0 w-80 h-80 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />

						<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
							{/* Left: Rocket Illustration */}
							<div className="lg:col-span-2 flex justify-center lg:justify-start">
								<div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center">
									<Rocket className="w-9 h-9 sm:w-11 sm:h-11 text-amber-300 drop-shadow-md" />
								</div>
							</div>

							{/* Center: Headline & Subtitle */}
							<div className="lg:col-span-6 text-center lg:text-left space-y-2">
								<h3 className="text-2xl sm:text-3xl font-extrabold text-white">
									Ready to start your success story?
								</h3>
								<p className="text-xs sm:text-sm text-primary-200">
									Join thousands of students learning, practicing and winning with Classore.
								</p>
							</div>

							{/* Right: Action Buttons */}
							<div className="lg:col-span-4 flex flex-row items-center justify-center lg:justify-end gap-2.5 sm:gap-3 w-full">
								<Button
									asChild
									className="flex-1 sm:flex-none bg-[#F67F36] hover:bg-[#DE7231] text-white text-[13px] sm:text-base font-bold px-4 sm:px-6 py-5 sm:py-6 rounded-xl shadow-md transition-all">
									<Link href="/signup">Get Started Free</Link>
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={onOpenDownloadModal}
									className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 border-white/20 text-white text-[13px] sm:text-base font-semibold px-4 sm:px-5 py-5 sm:py-6 rounded-xl flex items-center justify-center gap-1.5 sm:gap-2">
									<Download className="w-4 h-4 text-white" />
									<span>Download App</span>
								</Button>
							</div>
						</div>
					</div>

					{/* Main Footer Content */}
					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 sm:gap-10 pb-12 border-b border-white/10">
						{/* Column 1: Brand & Social */}
						<div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-5">
							<Link href="/" className="flex items-center gap-2">
								<div className="relative h-8 w-32">
									<Image
										src="/assets/images/classore.png"
										alt="Classore"
										fill
										sizes="140px"
										className="object-contain brightness-0 invert"
									/>
								</div>
							</Link>

							<p className="text-xs sm:text-sm text-primary-200/80 max-w-sm leading-relaxed">
								Your all-in-one learning and test preparation platform. Learn. Practice. Succeed.
							</p>

							{/* Social Links */}
							<div className="flex items-center gap-3 pt-2">
								<a
									href="https://facebook.com"
									target="_blank"
									rel="noreferrer"
									className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-primary-200 hover:text-white transition-colors">
									<Facebook className="w-4 h-4" />
								</a>
								<a
									href="https://twitter.com"
									target="_blank"
									rel="noreferrer"
									className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-primary-200 hover:text-white transition-colors">
									<Twitter className="w-4 h-4" />
								</a>
								<a
									href="https://instagram.com"
									target="_blank"
									rel="noreferrer"
									className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-primary-200 hover:text-white transition-colors">
									<Instagram className="w-4 h-4" />
								</a>
								<a
									href="https://youtube.com"
									target="_blank"
									rel="noreferrer"
									className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-primary-200 hover:text-white transition-colors">
									<Youtube className="w-4 h-4" />
								</a>
							</div>
						</div>

						{/* Column 2: Platform */}
						<div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-3">
							<h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
							<ul className="space-y-2 text-[11px] sm:text-xs text-primary-200/80">
								<li>
									<a href="#exams" className="hover:text-white transition-colors">
										Exams
									</a>
								</li>
								<li>
									<a href="#features" className="hover:text-white transition-colors">
										Features
									</a>
								</li>
								<li>
									<a href="#contests" className="hover:text-white transition-colors">
										Contests
									</a>
								</li>
								<li>
									<a href="#pricing" className="hover:text-white transition-colors">
										Pricing
									</a>
								</li>
								<li>
									<Link href="/signin" className="hover:text-white transition-colors">
										How It Works
									</Link>
								</li>
							</ul>
						</div>

						{/* Column 3: Resources */}
						<div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-3">
							<h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
							<ul className="space-y-2 text-[11px] sm:text-xs text-primary-200/80">
								<li>
									<Link href="/blog" className="hover:text-white transition-colors">
										Blog
									</Link>
								</li>
								<li>
									<Link href="/support" className="hover:text-white transition-colors">
										Help Center
									</Link>
								</li>
								<li>
									<Link href="/blog" className="hover:text-white transition-colors">
										Study Tips
									</Link>
								</li>
								<li>
									<Link href="/terms-of-service" className="hover:text-white transition-colors">
										Terms of Use
									</Link>
								</li>
								<li>
									<Link href="/privacy-policy" className="hover:text-white transition-colors">
										Privacy Policy
									</Link>
								</li>
							</ul>
						</div>

						{/* Column 4: Company */}
						<div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-3">
							<h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">Company</h4>
							<ul className="space-y-2 text-[11px] sm:text-xs text-primary-200/80">
								<li>
									<Link href="/support" className="hover:text-white transition-colors">
										About Us
									</Link>
								</li>
								<li>
									<Link href="/support" className="hover:text-white transition-colors">
										Contact Us
									</Link>
								</li>
								<li>
									<Link href="/support" className="hover:text-white transition-colors">
										Careers
									</Link>
								</li>
								<li>
									<Link href="/parents" className="hover:text-white transition-colors">
										For Schools
									</Link>
								</li>
							</ul>
						</div>

						{/* Column 5: Stay Updated */}
						<div className="col-span-2 md:col-span-1 lg:col-span-2 space-y-3">
							<h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">Stay Updated</h4>
							<p className="text-[11px] sm:text-xs text-primary-200/80 pr-4 sm:pr-0">
								Subscribe to get the latest updates and learning tips.
							</p>

							<form onSubmit={handleSubscribe} className="space-y-2 pt-1">
								<div className="relative">
									<input
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder="Enter your email"
										className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-primary-200/50 focus:outline-none focus:ring-2 focus:ring-primary-400"
									/>
								</div>
								<button
									type="submit"
									className="w-full py-2 bg-white text-[#190C2C] hover:bg-neutral-100 text-xs font-bold rounded-xl transition-colors">
									Subscribe
								</button>
							</form>
						</div>
					</div>

					{/* Bottom Copyright Bar */}
					<div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-200/60">
						<p>© 2025 Classore. All rights reserved.</p>
						<p className="flex items-center gap-1">
							Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for learners everywhere.
						</p>
					</div>
				</div>
			</div>

			{/* Mobile Bottom Navigation Bar matching design */}
			<div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-6 py-2 flex items-center justify-between shadow-2xl">
				<a href="#exams" className="flex flex-col items-center gap-0.5 text-neutral-500 hover:text-primary-600">
					<GraduationCap className="w-5 h-5" />
					<span className="text-[10px] font-medium">Exams</span>
				</a>
				<a href="#contests" className="flex flex-col items-center gap-0.5 text-neutral-500 hover:text-primary-600">
					<Trophy className="w-5 h-5" />
					<span className="text-[10px] font-medium">Contests</span>
				</a>
				<Link href="/" className="flex flex-col items-center gap-0.5 text-primary-600 font-bold">
					<Home className="w-5 h-5" />
					<span className="text-[10px]">Home</span>
				</Link>
				<Link href="/signin" className="flex flex-col items-center gap-0.5 text-neutral-500 hover:text-primary-600">
					<BookOpen className="w-5 h-5" />
					<span className="text-[10px] font-medium">Study</span>
				</Link>
				<Link href="/signin" className="flex flex-col items-center gap-0.5 text-neutral-500 hover:text-primary-600">
					<User className="w-5 h-5" />
					<span className="text-[10px] font-medium">Profile</span>
				</Link>
			</div>
		</>
	);
};
