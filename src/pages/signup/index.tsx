import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import { useGoogleLogin } from "@react-oauth/google"
import { toast } from "sonner"
import Link from "next/link"
import React from "react"

import { Appbar, Footer, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"

const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const Page = () => {
	const handleFacebookCallback = (
		response: ReactFacebookLoginInfo | ReactFacebookFailureResponse
	) => {
		if ("status" in response && response.status !== "unknown") {
			toast.error("Failed to login")
			return
		}
		console.log(response)
	}

	const handleGoogleCallback = useGoogleLogin({
		scope: "openid email profile",
		onSuccess: (tokenResponse) => {
			console.log(tokenResponse)
			toast.success("Logged in successfully")
		},
		onError: (error) => {
			console.log(error)
			toast.error("Failed to login")
		},
	})

	return (
		<>
			<Seo title="Create an account" />
			<Appbar />
			<main className="container mx-auto">
				<div className="flex flex-col gap-6">
					<h1>Create an account</h1>
					<Button onClick={() => handleGoogleCallback()} className="w-[200px]">
						Google
					</Button>
					<FacebookLogin
						buttonStyle={{ padding: "6px" }}
						appId={appId}
						autoLoad={false}
						fields="name,email,picture"
						callback={handleFacebookCallback}
						render={(renderProps) => (
							<Button onClick={renderProps.onClick} className="w-[200px]">
								Facebook
							</Button>
						)}
					/>
				</div>
				<Link href="/signin" className="mt-4 text-blue-500">
					Go to signin
				</Link>
			</main>
			<Footer />
		</>
	)
}

export default Page
