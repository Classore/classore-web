import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Categories" />
			<DashboardLayout>
				<h1>Categories</h1>
			</DashboardLayout>
		</>
	)
}

export default Page
