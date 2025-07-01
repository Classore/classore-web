import type { NextURL } from "next/dist/server/web/next-url";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

import type { UserProps } from "./types";
import { env } from "@/config";

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

export async function middleware(req: NextRequest) {
	const requestHeaders = new Headers(req.headers);
	requestHeaders.set("x-next-pathname", req.nextUrl.pathname);

	const url = req.nextUrl.clone();
	const hasToken = req.cookies.has("CLASSORE_TOKEN");
	const token = req.cookies.get("CLASSORE_TOKEN")?.value;

	const isOnParentsDashboard = url.pathname.startsWith("/parents/dashboard");
	const isOnDashboard = url.pathname.startsWith("/dashboard");
	const isOnAuth = authPathnames.includes(url.pathname);

	const redirectResponse = (url: string | NextURL) => {
		const response = NextResponse.redirect(url);
		response.headers.set("x-middleware-cache", "no-cache");
		return response;
	};

	if (!hasToken && (isOnDashboard || isOnParentsDashboard)) {
		url.pathname = "/signin";
		return redirectResponse(url);
	}

	if (hasToken && (isOnAuth || isOnDashboard || isOnParentsDashboard)) {
		try {
			const user = await axios
				.get(`${env.API_URL}/auth/profile`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					timeout: 5000,
				})
				.then((res) => res.data.data as UserProps)
				.catch((error) => {
					console.error("Profile fetch error:", error.message);
					if (error.response?.status === 401) {
						const response = redirectResponse("/signin");
						response.cookies.delete("CLASSORE_TOKEN");
						return response;
					}
					return null;
				});

			if (!user) {
				return NextResponse.next({
					request: {
						headers: requestHeaders,
					},
				});
			}

			const isStudent = (user as UserProps).user_type === "STUDENT";

			if (isOnAuth) {
				url.pathname = isStudent ? "/dashboard" : "/parents/dashboard";
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
		} catch (error) {
			console.error("Middleware error:", error);
			return NextResponse.next({
				request: {
					headers: requestHeaders,
				},
			});
		}
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}
