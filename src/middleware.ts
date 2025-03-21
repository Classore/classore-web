import type { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/parents/dashboard/:path*",
		"/signin",
		"/signup",
		"/forgot-password/:path*",
	],
	name: "auth-middleware",
};

const authPathnames = [
	"/signin",
	"/forgot-password",
	"/reset-password",
	"/signup",
	"/signup/student",
	"/signup/student/verify-email",
	"/signup/student/studying-for",
	"/signup/parent",
	"/signup/parent/verify-email",
	"/signup/parent/add-ward",
];

export function middleware(req: NextRequest) {
	const requestHeaders = new Headers(req.headers);
	requestHeaders.set("x-next-pathname", req.nextUrl.pathname);

	const hasToken = req.cookies.has("CLASSORE_TOKEN");
	const user = req.cookies.get("CLASSORE_USER_TYPE")?.value;
	const url = req.nextUrl.clone();

	const isOnParentsDashboard = url.pathname.startsWith("/parents/dashboard");
	const isOnDashboard = url.pathname.startsWith("/dashboard");
	const isOnAuth = authPathnames.includes(url.pathname);
	const isStudent = user === undefined ? true : user === "STUDENT";

	const redirectResponse = (url: string | NextURL) => {
		const response = NextResponse.redirect(url);
		response.headers.set("x-middleware-cache", "no-cache"); // !FIX: Disable caching
		return response;
	};

	// If user is not logged in and is on dashboard, redirect to signin
	if (!hasToken && (isOnDashboard || isOnParentsDashboard)) {
		url.pathname = "/signin";
		return redirectResponse(url);
	}

	// If user is logged in and is on signin or signup, redirect to dashboard
	if (hasToken && isOnAuth) {
		url.pathname = isStudent ? "/dashboard" : "/parents/dashoard";
		return redirectResponse(url);
	}

	if (isStudent && isOnParentsDashboard) {
		url.pathname = "/dashboard";
		return redirectResponse(url);
	}

	if (!isStudent && isOnDashboard) {
		url.pathname = "/parents/dashboard";
		return redirectResponse(url);
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}
