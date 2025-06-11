import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React from "react";

import { ErrorBoundary, QueryProvider, SSRProvider } from "@/providers";
import { FacebookPixel } from "@/components/shared";
import { Toaster } from "@/components/ui/sonner";
import { analytics, pageview } from "@/lib";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	React.useEffect(() => {
		const handleRouteChange = (url: string) => {
			analytics.pageView(url);
			pageview();
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => router.events.off("routeChangeComplete", handleRouteChange);
	}, [router.events]);

	return (
		<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
			<ErrorBoundary>
				<QueryProvider>
					<SSRProvider>
						<PostHogProvider client={posthog}>
							<Component {...pageProps} />
							<Toaster position="top-right" richColors theme="light" closeButton />
							<FacebookPixel />
						</PostHogProvider>
					</SSRProvider>
				</QueryProvider>
			</ErrorBoundary>
		</GoogleOAuthProvider>
	);
}
