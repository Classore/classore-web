import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Calendar" />
			<DashboardLayout>
				<h1>Calendar</h1>
			</DashboardLayout>
		</>
	)
}

export default Page
