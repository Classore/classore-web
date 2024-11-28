import { useRouter } from "next/router"
import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

import { categories } from "@/mock"

const Page = () => {
	const {
		query: { id },
	} = useRouter()

	const category = categories.find((category) => category.id === String(id))

	if (!category) return null

	return (
		<>
			<Seo title={category.name} />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-8 py-6">My Courses</div>
			</DashboardLayout>
		</>
	)
}

export default Page
