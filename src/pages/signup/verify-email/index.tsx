import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"

import { VerifyEmailGraphic } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPSlot } from "@/components/ui/otp-input"
import Link from "next/link"

// const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const Page = () => {
	return (
		<>
			<Seo title="Sign up" />

			<AuthLayout screen="signup">
				<div className="flex max-w-[400px] flex-col gap-8">
					{/* should convert this to html, but i'm just lazy */}
					<header className="flex flex-col gap-4">
						<VerifyEmailGraphic />

						<div>
							<h2 className="font-body text-2xl font-bold text-neutral-900">Verify your email address</h2>
							<p className="pt-1 text-sm text-neutral-500">
								A 6 digit code has been sent to{" "}
								<span className="font-bold text-neutral-900">arow******.gmail.com</span>
							</p>
						</div>
					</header>

					<form className="flex flex-col gap-6 font-body font-normal">
						<InputOTP maxLength={6}>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTP>

						<div className="col-span-full flex flex-col gap-2">
							<Button type="submit">Verify</Button>

							<p className="text-center text-sm text-neutral-500">
								Didn’t receive a mail?{" "}
								<Link href="/login" className="font-medium text-secondary-300 hover:underline">
									Resend
								</Link>
							</p>
						</div>
					</form>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
