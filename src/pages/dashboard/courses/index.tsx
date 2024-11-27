import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="My Courses" />
			<DashboardLayout>
				<h1>My Courses</h1>
			</DashboardLayout>
		</>
	)
}

export default Page
