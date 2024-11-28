import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Leaderboard" />
			<DashboardLayout>
				<h1>Leaderboard</h1>
			</DashboardLayout>
		</>
	)
}

export default Page
