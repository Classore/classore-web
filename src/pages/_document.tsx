import { Head, Html, Main, NextScript } from "next/document";

import { env } from "@/config";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<GoogleAnalytics />
			</Head>
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

const GoogleAnalytics = () => {
	if (process.env.NODE_ENV !== "production") return null;

	return (
		<>
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}></script>
			<script
				dangerouslySetInnerHTML={{
					__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
          `,
				}}></script>
		</>
	);
};
