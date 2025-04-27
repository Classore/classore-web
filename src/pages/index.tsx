import { useMutation } from "@tanstack/react-query";
import { RiDownload2Line } from "@remixicon/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";

import { AvatarGroup, Footer, Navbar, ReviewCard, Seo } from "@/components/shared";
import { useDeviceWidth } from "@/hooks/use-device-width";
import { PersonalizedPlanCard } from "@/components/home";
import { MasonryLayout } from "@/components/layouts";
import { paymentCallback } from "@/queries/school";
import { Button } from "@/components/ui/button";
import type { HttpError } from "@/types";
import {
	FREQUENTLY_ASKED_QUESTIONS,
	INCENTIVES,
	PERSONALIZED_PLANS,
	TESTIMONIALS,
} from "@/constants";

const images = [
	"/assets/images/avatar-0.png",
	"/assets/images/avatar-1.png",
	"/assets/images/avatar-2.png",
	"/assets/images/avatar-3.png",
];

const Page = () => {
	const { isMobile } = useDeviceWidth();
	const router = useRouter();
	const reference = router.query.reference as string;

	const { mutate } = useMutation({
		mutationKey: ["payment-callback"],
		mutationFn: paymentCallback,
		onSuccess: () => {
			toast.success("Payment verified successfully");
			router.push("/dashboard");
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response?.data.message)
				? error?.response.data.message[0]
				: error?.response.data.message;
			const message = errorMessage ?? "Something went wrong, please try again later";
			toast.error(message);
		},
	});

	React.useEffect(() => {
		if (reference) {
			mutate({
				event: "charge.success",
				data: {
					metadata: {
						narration_id: "",
						narration: "RESERVATION",
					},
					reference: reference,
				},
			});
		}
	}, [reference]);

	return (
		<>
			<Seo title="Welcome to Classore" />

			<Navbar />

			<main className="scrollbar w-full font-geist">
				<section className="relative w-full overflow-y-hidden bg-gradient-to-b from-primary-100 to-neutral-100 lg:min-h-dvh">
					<div className="absolute left-0 top-0 !z-0 hidden h-full w-full lg:block">
						<Image src="/assets/images/vector-grid.png" alt="vector-grid" fill sizes="100%" />
					</div>

					<div className="!z-5 container my-32 flex h-full flex-col items-center justify-end gap-y-5 px-3 lg:absolute lg:left-1/2 lg:top-10 lg:-translate-x-1/2 lg:px-0">
						<div className="flex flex-col items-center gap-y-4 text-center lg:w-[750px]">
							<div className="flex w-fit items-center gap-x-4 rounded-2xl border-2 border-white bg-[rgba(255,255,255,0.3)] px-3 py-1">
								<p className="text-xs">Join over 2,500 learners today</p>
								<AvatarGroup images={images} count={4} />
							</div>

							<div className="flex flex-col gap-3 overflow-hidden">
								<h1 className="animate-slide-from-top text-pretty text-3xl font-semibold text-primary-900 lg:text-[56px] lg:leading-[100%]">
									Ace Your Exams with Effective Online Lessons
								</h1>
								<p className="mx-auto max-w-lg animate-slide-from-bottom text-neutral-500 lg:text-lg">
									Our platform simulate local and international exams. Prepare in real time. Pass with
									confidence
								</p>
							</div>
							<div className="flex w-72 flex-col gap-4 pt-4 md:w-fit md:flex-row md:items-center md:justify-center">
								<Button
									asChild
									variant="outline-primary"
									className="w-full rounded-lg border-secondary-300 px-8 text-secondary-300 hover:bg-secondary-50">
									<Link href="/signin">Continue/Start Learning</Link>
								</Button>
								<Button className="rounded-lg px-6">
									<RiDownload2Line /> Download App
								</Button>
							</div>
						</div>
						<div className="relative hidden w-full lg:flex lg:h-[650px]">
							<div className="relative h-full w-[95%] self-start">
								<Image
									src="/assets/images/hero-1.png"
									alt="hero-1"
									fill
									sizes="100%"
									className="object-cover"
								/>
							</div>
							<div className="absolute bottom-0 right-0 h-[400px] w-[350px]">
								<Image src="/assets/images/hero-2.png" alt="hero-2" fill sizes="100%" />
							</div>
						</div>
					</div>
				</section>

				{/* <Ticker /> */}

				<section className="w-full bg-neutral-100 lg:py-20" id="what-we-offer">
					<div className="container flex flex-col items-center gap-y-20">
						<div className="flex max-w-[650px] flex-col items-center gap-y-4 text-center">
							<p className="text-xs font-medium text-secondary-400 lg:text-sm">WHAT WE OFFER</p>
							<h4 className="text-2xl font-medium lg:text-4xl">
								<span className="text-neutral-400">A Personalize Learning for</span> Students,
								<span className="text-neutral-400"> Tracking for</span> Parents
							</h4>
						</div>
						<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
							{PERSONALIZED_PLANS.map((data, index) => (
								<PersonalizedPlanCard key={index} data={data} />
							))}
						</div>
					</div>
				</section>

				<section className="w-full bg-primary-100 py-10 lg:py-20">
					<div className="container space-y-20 px-4 lg:px-0">
						{INCENTIVES.map(({ button, description, href, image, label, title }, index) => (
							<div
								key={index}
								className={`flex w-full items-center gap-5 lg:gap-0 ${index % 2 !== 0 ? "flex-col-reverse lg:flex-row-reverse" : "flex-col-reverse lg:flex-row"}`}>
								<div className="grid aspect-square w-full flex-1 place-items-center rounded-3xl bg-gradient-to-b from-primary-200 to-secondary-200">
									<div className="relative aspect-square w-[80%]">
										<Image src={image} alt={label} quality={100} fill sizes="100%" className="" />
									</div>
								</div>
								<div
									className={`flex flex-1 flex-col justify-center ${index % 2 !== 0 ? "items-start" : "items-end"}`}>
									<div className="space-y-4 lg:w-[450px]">
										<p className="text-xs font-medium uppercase text-secondary-400 lg:text-sm">{label}</p>
										<h3 className="text-2xl font-semibold text-neutral-700 lg:text-4xl">{title}</h3>
										<p className="text-xs text-neutral-400 lg:text-sm">{description}</p>
										<Button className="w-fit capitalize" asChild>
											<Link href={href} target={href.startsWith("https://") ? "_blank" : "_self"}>
												{button}
											</Link>
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				<section className="w-full bg-neutral-100 py-10 lg:py-20" id="testimonials">
					<div className="container flex flex-col items-center gap-y-20">
						<div className="flex max-w-[450px] flex-col items-center gap-y-2 text-center">
							<p className="text-xs font-medium text-secondary-400 lg:text-sm">TESTIMONIALS</p>
							<h4 className="text-2xl font-medium lg:text-4xl">
								<span className="text-neutral-400">Real</span> Stories.{" "}
								<span className="text-neutral-400">Real</span> Impact
							</h4>
						</div>
						<MasonryLayout breakpointCols={isMobile ? 1 : 3}>
							{TESTIMONIALS.map((review) => (
								<ReviewCard key={review.rating_id} review={review} />
							))}
						</MasonryLayout>
					</div>
				</section>
				<section className="w-full bg-primary-100 pt-10 lg:pt-20">
					<div className="container flex flex-col items-center gap-y-14 overflow-hidden px-3 md:gap-y-20 lg:px-0">
						<div className="flex max-w-[450px] flex-col items-center gap-y-4 text-center">
							<p className="text-xs font-medium text-secondary-400 lg:text-sm">LEADERBOARD</p>
							<h4 className="text-2xl font-medium lg:text-4xl">Learning As A Game</h4>
							<p className="text-xs text-neutral-400 lg:text-sm">
								Earn commissions for successful referrals, track your performance with detailed analytics
								and start earning quickly with easy registration
							</p>
							<Button asChild className="w-48">
								<Link href="/signup">Get Started</Link>
							</Button>
						</div>
						<div className="relative mx-auto h-[300px] w-full lg:mx-0 lg:h-[650px]">
							<Image
								src="/assets/images/leaderboard.png"
								alt="leaderboard"
								fill
								sizes="100%"
								className="object-cover"
								quality={100}
							/>
						</div>
					</div>
				</section>
				<section className="w-full bg-neutral-100 py-10 lg:py-20" id="frequently-asked-questions">
					<div className="container flex flex-col items-center gap-y-20 px-4 lg:px-0">
						<div className="flex max-w-[450px] flex-col items-center gap-y-6 text-center">
							<p className="text-xs font-medium text-secondary-400 lg:text-sm">FAQS</p>
							<h4 className="text-2xl font-medium lg:text-4xl">
								<span className="text-neutral-400">Frequently Asked</span> Questions
							</h4>
						</div>
						<div className="w-full space-y-8 lg:w-[650px]">
							<div className="flex flex-col items-center gap-y-3">
								{FREQUENTLY_ASKED_QUESTIONS.map(({ answer, question }, index) => (
									<div
										key={index}
										className="w-full space-y-3 rounded-2xl bg-white p-4 transition-all duration-500 hover:shadow-xl">
										<h6 className="font-semibold">{question}</h6>
										<p className="text-xs text-neutral-400 lg:text-sm">{answer}</p>
									</div>
								))}
							</div>
							<div className="flex flex-col items-center gap-y-4">
								<h5>Still have questions?</h5>
								<Button asChild className="w-48">
									<Link href="/contact">Contact Us</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>
				<section className="w-full bg-primary-100">
					<div className="container flex flex-col gap-8 md:grid md:grid-cols-2">
						<div className="flex flex-1 flex-col items-start justify-center px-4 py-10 lg:px-0 lg:py-0">
							<div className="space-y-4 lg:w-[450px]">
								<p className="text-xs font-medium text-secondary-400 lg:text-sm">MOBILE APP</p>
								<h3 className="text-2xl font-semibold text-neutral-700 lg:text-4xl">
									Download Mobile Application
								</h3>
								<p className="text-xs text-neutral-400 lg:text-sm">
									Earn commissions for successful referrals, track your performance with detailed analytics
									and start earning quickly with easy registration
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
