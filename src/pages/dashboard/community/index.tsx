import dynamic from "next/dynamic"
import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Loading, Seo } from "@/components/shared"
import { useUserStore } from "@/store/z-store"

export const ChannelsComponent = dynamic(() => import("@/components/shared/comunity"), {
	ssr: false,
})

const Page = () => {
	const { user } = useUserStore()

	if (!user) return <Loading />

	return (
		<>
			<Seo title="Community Forum" />
			<DashboardLayout>
				{/* <ChannelsComponent user={user} /> */}
				<div className="grid h-full w-full place-items-center">
					<div className="flex flex-col items-center gap-y-2">
						<h3 className="text-4xl font-semibold text-primary-400">Coming Soon</h3>
						<p>We&apos;re working on this module. Please check back later.</p>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
