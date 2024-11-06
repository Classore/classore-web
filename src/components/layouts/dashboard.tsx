import React from "react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen w-screen items-center overflow-hidden">
			<aside className="h-full min-w-[250px] border-r"></aside>
			<div className="h-full flex-1">
				<div></div>
				{children}
			</div>
		</div>
	)
}
