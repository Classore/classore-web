import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import { toast } from "sonner";
import React from "react";

import { Footer, Navbar, Seo } from "@/components/shared";
import { paymentCallback } from "@/queries/school";
import { Button } from "@/components/ui/button";
import { REFERRAL_STEPS } from "@/constants";
import type { HttpError } from "@/types";

const Page = () => {
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
			<Seo title="Join the referral program" />
			<Navbar />
			<main className="scrollbar w-full font-geist">
				<section className="relative w-full overflow-y-hidden bg-gradient-to-b from-primary-100 to-neutral-100 lg:min-h-dvh">
					<div className="absolute left-0 top-0 !z-0 hidden h-full w-full lg:block">
						<Image src="/assets/images/vector-grid.png" alt="vector-grid" fill sizes="100%" />
					</div>
					<div className="!z-5 container my-32 flex h-full flex-col items-center justify-end gap-y-5 px-3 lg:absolute lg:left-1/2 lg:top-10 lg:-translate-x-1/2 lg:px-0">
						<div className="flex flex-col items-center gap-y-4 text-center lg:w-[900px]">
							<div className="flex flex-col gap-3 overflow-hidden">
								<h1 className="animate-slide-from-top text-pretty text-3xl font-semibold text-primary-900 lg:text-[56px] lg:leading-[100%]">
									Turn Your Network Into a Lifetime Income with Classore
								</h1>
								<p className="mx-auto animate-slide-from-bottom text-neutral-500 lg:text-lg">
									Promote Classore, help students succeed, and earn passive income for life.
								</p>
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
				<section className="w-full bg-neutral-100 py-10 lg:py-40">
					<div className="container flex flex-col items-center gap-y-20">
						<div className="flex flex-col items-center gap-y-2 text-center">
							<p className="text-xl font-semibold text-secondary-400 lg:text-3xl">HOW IT WORKS</p>
							<h4 className="text-xl font-medium lg:text-2xl">
								Becoming a Classore Marketer is simple, but it follows a strict and secure onboarding
								process to protect both you and the platform. Here's exactly how it works in 6 easy steps:
							</h4>
						</div>
						<div className="flex flex-col items-center gap-y-5">
							{REFERRAL_STEPS.map(({ descriptions, step, title }) => (
								<div
									key={step}
									className="w-full space-y-3 rounded-2xl border bg-white p-4 transition-all duration-500 hover:shadow-xl">
									<h6 className="font-semibold">{title}</h6>
									{descriptions.map((description, index) => (
										<div key={index} className="w-full space-y-2 px-4">
											<p className="list-item text-sm text-neutral-600 lg:text-base">{description.label}</p>
											{description.options && (
												<div className="w-full px-2">
													{description.options.map((option, index) => (
														<p key={index} className="list-item text-xs text-neutral-400 lg:text-sm">
															{option}
														</p>
													))}
												</div>
											)}
										</div>
									))}
								</div>
							))}
							<Button className="w-fit">Get Started</Button>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default Page;
