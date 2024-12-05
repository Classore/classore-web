import "@/styles/globals.css"
import { GoogleOAuthProvider } from "@react-oauth/google"
import type { AppProps } from "next/app"

import { Toaster } from "@/components/ui/sonner"
import { QueryProvider, SSRProvider } from "@/providers"

export default function App({ Component, pageProps }: AppProps) {
	return (
		<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
			<QueryProvider>
				<SSRProvider>
					<Component {...pageProps} />

					<Toaster position="top-right" richColors theme="light" closeButton />
				</SSRProvider>
			</QueryProvider>
		</GoogleOAuthProvider>
	)
}
