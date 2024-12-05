// import { RiEmotionHappyLine, RiImageAddLine, RiSendPlaneLine } from "@remixicon/react"
import dynamic from "next/dynamic"
import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"
import type { UserProps } from "@/types"

const ChatComponent = dynamic(() => import("@/components/shared/chat-component"), {
	ssr: false,
})

const Page = () => {
	// const { user } = useUserStore()

	// if (!user) return null
	const user: UserProps = {
		email: "smsnmicheal@gmail.com",
		firstName: "Samson",
		id: "0b5eaa4c-4e1a-4be6-a65b-fe484fb2a352",
		lastName: "Okunola",
		image: "",
		password: "",
		username: "clueless",
		createdOn: new Date().toString(),
	}

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
