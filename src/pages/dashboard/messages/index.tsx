import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Messages" />
			<DashboardLayout>
				<h1>Messages</h1>
			</DashboardLayout>
		</>
	)
}

export default Page
