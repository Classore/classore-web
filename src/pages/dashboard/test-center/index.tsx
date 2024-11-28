import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Test Center" />
			<DashboardLayout>
				<h1>Test Center</h1>
			</DashboardLayout>
		</>
	)
}

export default Page
