import "@/styles/globals.css"
import { GoogleOAuthProvider } from "@react-oauth/google"
import type { AppProps } from "next/app"

import { QueryProvider, SSRProvider } from "@/providers"
import { Toaster } from "@/components/ui/sonner"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
			<QueryProvider>
				<SSRProvider>
					<Component {...pageProps} />
					<Toaster position="top-right" />
				</SSRProvider>
			</QueryProvider>
		</GoogleOAuthProvider>
	)
}
