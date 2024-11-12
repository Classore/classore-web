import type { NextURL } from "next/dist/server/web/next-url"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export const config = {
	matcher: ["/dashboard/:path*", "/signin", "/signup"],
	name: "auth-middleware",
}

export function middleware(req: NextRequest) {
	const requestHeaders = new Headers(req.headers) // Init new request headers
	requestHeaders.set("x-next-pathname", req.nextUrl.pathname) // Set the new header for pathname

	const hasToken = req.cookies.has("CLASSORE_TOKEN")
	const isWaitlist = process.env.NODE_ENV !== "development" // FIXME: change this
	const url = req.nextUrl.clone() // Clone the URL to modify it

	const isOnDashboard = url.pathname.startsWith("/dashboard")
	const isOnSignIn = url.pathname === "/signin"
	const isOnSignUp = url.pathname === "/signup"

	const redirectResponse = (url: string | NextURL) => {
		const response = NextResponse.redirect(url)
		response.headers.set("x-middleware-cache", "no-cache") // !FIX: Disable caching
		return response
	}

	// If in test mode, always redirect to the homepage
	if (isWaitlist && url.pathname !== "/") {
		console.log(isWaitlist)
		url.pathname = "/"
		return redirectResponse(url)
	}

	// If user is not logged in and is on dashboard, redirect to signin
	if (!hasToken && isOnDashboard) {
		url.pathname = "/signin"
		return redirectResponse(url)
	}

	// If user is logged in and is on signin or signup, redirect to dashboard
	if (hasToken && (isOnSignIn || isOnSignUp)) {
		url.pathname = "/dashboard"
		return redirectResponse(url)
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	})
}
