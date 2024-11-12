import "@/styles/globals.css"
import { GoogleOAuthProvider } from "@react-oauth/google"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import React from "react"

import { QueryProvider, SSRProvider } from "@/providers"
import { FacebookPixel } from "@/components/shared"
import { Toaster } from "@/components/ui/sonner"
import { analytics } from "@/lib"

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()

	React.useEffect(() => {
		const handleRouteChange = (url: string) => analytics.pageView(url)
		router.events.on("routeChangeComplete", handleRouteChange)
		return () => router.events.off("routeChangeComplete", handleRouteChange)
	}, [router.events])

	return (
		<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
			<QueryProvider>
				<SSRProvider>
					<Component {...pageProps} />
					<Toaster position="top-right" />
					<FacebookPixel />
				</SSRProvider>
			</QueryProvider>
		</GoogleOAuthProvider>
	)
}
