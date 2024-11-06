import React from "react"

type Screen = "signin" | "signup" | "forgot-password" | "reset-password"

export function AuthLayout({ children }: { children: React.ReactNode; screen: Screen }) {
	return (
		<div className="container mx-auto grid h-screen grid-cols-3 overflow-hidden">
			<div className="h-full"></div>
			<div className="h-full">{children}</div>
		</div>
	)
}
