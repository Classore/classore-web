import { useRouter } from "next/router"
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
	const router = useRouter()
	const { otherUserId } = router.query

	if (!user) return <Loading />

	return (
		<>
			<Seo title="Messages" />
			<DashboardLayout>
				<ChatComponent user={user} initialOtherUserId={String(otherUserId)} />
			</DashboardLayout>
		</>
	)
}

export default Page
