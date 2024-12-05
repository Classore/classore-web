import dynamic from "next/dynamic"
import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Loading, Seo } from "@/components/shared"
import { useUserStore } from "@/store/z-store"

const ChatComponent = dynamic(() => import("@/components/shared/chat-component"), {
	ssr: false,
})

const Page = () => {
	const { user } = useUserStore()

	if (!user) return <Loading />

	return (
		<>
			<Seo title="Messages" />
			<DashboardLayout>
				<ChatComponent user={user} />
			</DashboardLayout>
		</>
	)
}

export default Page
