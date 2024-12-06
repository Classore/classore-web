import dynamic from "next/dynamic"
import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Loading, Seo } from "@/components/shared"
import { useUserStore } from "@/store/z-store"

const ChannelsComponent = dynamic(() => import("@/components/shared/comunity"), {
	ssr: false,
})

const Page = () => {
	const { user } = useUserStore()

	if (!user) return <Loading />

	return (
		<>
			<Seo title="Community Forum" />
			<DashboardLayout>
				<ChannelsComponent user={user} />
			</DashboardLayout>
		</>
	)
}

export default Page
