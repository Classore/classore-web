import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Dashboard" />
			<DashboardLayout>
				<div className="px-8 py-6">Dashboard</div>
			</DashboardLayout>
		</>
	)
}

export default Page
