import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Dashboard" />
			<DashboardLayout>
				<h1>Dashboard</h1>
			</DashboardLayout>
		</>
	)
}

export default Page
