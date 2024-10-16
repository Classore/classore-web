import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Home" />
			<Appbar />
			<main className="container mx-auto">
				<h1>Home</h1>
			</main>
			<Footer />
		</>
	)
}

export default Page
