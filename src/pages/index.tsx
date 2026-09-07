import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";

import { LegacyLandingPage } from "@/components/home/legacy-landing-page";
import {
	BlogSection,
	CTABanner,
	FeatureHighlights,
	Footer,
	Hero,
	HowItWorks,
	LiveActivity,
	LiveContest,
	MobileBottomNav,
	Navbar,
	Partners,
	Pricing,
	TestCenter,
	Testimonials,
} from "@/components/landing";
import { DownloadModal } from "@/components/landing/download-modal";
import { Seo } from "@/components/shared";
import { paymentCallback } from "@/queries/school";
import type { HttpError } from "@/types";

const Page = () => {
	const router = useRouter();
	const reference = router.query.reference as string;
	const isLegacy = router.query.legacy === "true";
	const [isDownloadOpen, setIsDownloadOpen] = React.useState(false);

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
	}, [mutate, reference]);

	// If legacy view is explicitly requested via query parameter, render the preserved legacy page
	if (isLegacy) {
		return <LegacyLandingPage />;
	}

	return (
		<>
			<Seo
				title="Classore - Learn. Practice. Succeed."
				description="Your all-in-one learning and test preparation platform. Learn with videos, practice with CBT, compete with others and achieve your best."
			/>

			<Navbar />
			<main className="pb-16 lg:pb-0 bg-white text-gray-900">
				<Hero onOpenDownloadModal={() => setIsDownloadOpen(true)} />
				<FeatureHighlights />
				<TestCenter />
				<LiveContest />
				<LiveActivity />
				<HowItWorks />
				<CTABanner
					imageSrc="/assets/images/cta-cap.png"
					imageAlt="Graduation cap and books"
					imageWidth={150}
					imageHeight={100}
					title="Ready to achieve your best?"
					subtitle="Join thousands of students learning, practicing and succeeding with Classore."
					onOpenDownloadModal={() => setIsDownloadOpen(true)}
				/>
				<Pricing />
				<Partners />
				<Testimonials />
				<BlogSection />
				<CTABanner
					imageSrc="/assets/images/cta-rocket.png"
					imageAlt="Rocket blasting off"
					imageWidth={150}
					imageHeight={100}
					title="Ready to start your success story?"
					subtitle="Join thousands of students learning, practicing and winning with Classore."
					onOpenDownloadModal={() => setIsDownloadOpen(true)}
				/>
			</main>
			<Footer />
			<MobileBottomNav />
			<DownloadModal isOpen={isDownloadOpen} onOpenChange={setIsDownloadOpen} />
		</>
	);
};

export default Page;
