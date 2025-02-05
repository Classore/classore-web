import { RiDownload2Line } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";

import { AvatarGroup, Footer, Navbar, Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { FREQUENTLY_ASKED_QUESTIONS, INCENTIVES } from "@/constants";

const images = [
	"/assets/images/avatar-0.png",
	"/assets/images/avatar-1.png",
	"/assets/images/avatar-2.png",
	"/assets/images/avatar-3.png",
];

const Page = () => {
	return (
		<>
			<Seo title="" />

			<Navbar />

			<main className="scrollbar w-full font-geist">
				<section className="relative h-screen w-full bg-gradient-to-b from-primary-100 to-neutral-100">
					<div className="absolute left-0 top-0 h-full w-full">
						<Image src="/assets/images/vector-grid.png" alt="vector-grid" fill sizes="100%" />
					</div>

					{/* <div className="absolute left-0 top-0 h-full w-full"> */}
					<div className="container flex h-full flex-col items-center justify-end gap-y-5">
						<div className="flex flex-col items-center gap-y-4 text-center lg:w-[750px]">
							<div className="flex w-fit items-center gap-x-4 rounded-2xl border-2 border-white bg-[rgba(255,255,255,0.3)] px-3 py-1">
								<p className="text-xs">Join over 2500 learners today</p>
								<AvatarGroup images={images} count={4} />
							</div>

							<div className="flex flex-col gap-3">
								<h1 className="font-semibold text-primary-900 lg:text-[56px] lg:leading-[100%]">
									Ace Your Exams with Effective Online Lessons
								</h1>
								<p className="mx-auto max-w-lg text-neutral-500 lg:text-lg">
									Our platform simulates different exams, the platform is for you if you are taking
									JAMB, WAEC, NECO, ICAN.
								</p>
							</div>
							<div className="flex items-center justify-center gap-x-4 pt-4">
								<Button asChild variant="outline-primary" className="rounded-lg px-8">
									<Link href="/signup">Start Learning</Link>
								</Button>

								<Button className="rounded-lg px-6">
									<RiDownload2Line /> Download App
								</Button>
							</div>
						</div>
						<div className="w-full lg:h-[400px]"></div>
					</div>
					{/* </div> */}
				</section>

				<section className="w-full bg-neutral-100 lg:py-20">
					<div className="container flex flex-col items-center gap-y-20">
						<div className="flex max-w-[650px] flex-col items-center gap-y-6 text-center">
							<p className="text-sm font-medium text-secondary-400">WHAT WE OFFER</p>
							<h4 className="text-4xl font-medium">
								A Personalize Learning for Students, Tracking for Parents
							</h4>
						</div>
						<div className="w-full"></div>
					</div>
				</section>
				<section className="w-full bg-primary-100 lg:py-20">
					<div className="container space-y-20">
						{INCENTIVES.map(({ button, description, href, image, label, title }, index) => (
							<div
								key={index}
								className={`flex w-full items-center ${index % 2 !== 0 ? "flex-row-reverse" : "flex-row"}`}>
								<div className="grid aspect-square flex-1 place-items-center rounded-3xl bg-gradient-to-b from-primary-200 to-secondary-200">
									<div className="relative aspect-square w-[80%]">
										<Image src={image} alt={label} quality={100} fill sizes="100%" className="" />
									</div>
								</div>
								<div
									className={`flex flex-1 flex-col justify-center ${index % 2 !== 0 ? "items-start" : "items-end"}`}>
									<div className="space-y-4 lg:w-[450px]">
										<p className="text-sm font-medium uppercase text-secondary-400">{label}</p>
										<h3 className="text-4xl font-semibold text-neutral-700">{title}</h3>
										<p className="text-sm text-neutral-400">{description}</p>
										<Button className="w-fit capitalize" asChild>
											<Link href={href} target={href.startsWith("https://") ? "_self" : "_self"}>
												{button}
											</Link>
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
				<section className="w-full bg-neutral-100 lg:py-20">
					<div className="container flex flex-col items-center gap-y-20">
						<div className="flex max-w-[450px] flex-col items-center gap-y-6 text-center">
							<p className="text-sm font-medium text-secondary-400">TESTIMONIALS</p>
							<h4 className="text-4xl font-medium">Real Stories. Real Impact</h4>
						</div>
						<div className="w-full"></div>
					</div>
				</section>
				<section className="w-full bg-primary-100 lg:pt-20">
					<div className="container flex flex-col items-center gap-y-20 overflow-hidden">
						<div className="flex max-w-[450px] flex-col items-center gap-y-6 text-center">
							<p className="text-sm font-medium text-secondary-400">LEADERBOARD</p>
							<h4 className="text-4xl font-medium">Learning As A Game</h4>
							<p className="text-sm text-neutral-400">
								Earn commissions for successful referrals, track your performance with detailed
								analytics and start earning quickly with easy registration
							</p>
							<Button asChild className="w-fit">
								<Link href="/signup">Get Started</Link>
							</Button>
						</div>
						<div className="relative w-full lg:h-[650px]">
							<Image
								src="/assets/images/leaderboard.png"
								alt="leaderboard"
								fill
								sizes="100%"
								className="object-cover object-top"
								quality={100}
							/>
						</div>
					</div>
				</section>
				<section className="w-full bg-neutral-100 lg:py-20">
					<div className="container flex flex-col items-center gap-y-20">
						<div className="flex max-w-[450px] flex-col items-center gap-y-6 text-center">
							<p className="text-sm font-medium text-secondary-400">FAQS</p>
							<h4 className="text-4xl font-medium">Frequently Asked Questions</h4>
						</div>
						<div className="w-full space-y-8 lg:w-[650px]">
							<div className="flex flex-col items-center gap-y-3">
								{FREQUENTLY_ASKED_QUESTIONS.map(({ answer, question }, index) => (
									<div
										key={index}
										className="w-full space-y-3 rounded-2xl bg-white p-4 transition-all duration-500 hover:shadow-xl">
										<h6 className="font-semibold">{question}</h6>
										<p className="text-sm text-neutral-400">{answer}</p>
									</div>
								))}
							</div>
							<div className="flex flex-col items-center gap-y-4">
								<h5>Still have questions?</h5>
								<Button asChild className="w-fit">
									<Link href="/contact">Contact</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full bg-primary-100">
					<div className="container grid grid-cols-2">
						<div className="flex flex-1 flex-col items-start justify-center">
							<div className="space-y-4 lg:w-[450px]">
								<p className="text-sm font-medium text-secondary-400">MOBILE APP</p>
								<h3 className="text-4xl font-semibold text-neutral-700">
									Download Mobile Application
								</h3>
								<p className="text-sm text-neutral-400">
									Earn commissions for successful referrals, track your performance with detailed
									analytics and start earning quickly with easy registration
								</p>
								<Button className="w-fit capitalize">
									<RiDownload2Line /> Download Now
								</Button>
							</div>
						</div>
						<div className="relative aspect-square w-full">
							<Image
								src="/assets/images/download.png"
								quality={100}
								alt="download"
								fill
								// sizes="100%"
								className="w-32"
							/>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Page;
