import React from "react"

import { Appbar, Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Refer a friend" />
			<Appbar />
			<main className="container mx-auto h-[calc(100vh-92px)]"></main>
		</>
	)
}

export default Page
