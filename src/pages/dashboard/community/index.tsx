import React from "react"

// import { ScrollArea } from "@/components/ui/scroll-area"
import { DashboardLayout } from "@/components/layouts"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Community Forum" />
			<DashboardLayout>
				<div className="flex h-full w-full items-start bg-white">
					<div className="h-full w-[300px] border-r">
						<div className="flex h-[76px] w-full items-center justify-center border-b">
							<h4 className="text-xl font-medium"></h4>
						</div>
						<div className="h-full w-full overflow-y-auto"></div>
					</div>
					<div className="h-full flex-1">
						<div className="flex h-[76px] w-full items-center justify-between border-b px-8 py-[18px]"></div>
						<div className="h-full w-full overflow-y-auto bg-neutral-100"></div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
