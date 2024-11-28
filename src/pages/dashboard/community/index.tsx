import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Community Forum" />
			<DashboardLayout>
				<h1>Community Forum</h1>
			</DashboardLayout>
		</>
	)
}

export default Page
