import React from "react"

export function AuthLayout({ children }: { children: React.ReactNode; image: string }) {
	return (
		<div className="container mx-auto grid h-screen grid-cols-3 overflow-hidden">
			<div className="h-full"></div>
			<div className="h-full">{children}</div>
		</div>
	)
}
