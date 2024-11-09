import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"

import { GoogleIcon, UserDetailsGraphic } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const Page = () => {
	return (
		<>
			<Seo title="Sign up" />

			<AuthLayout screen="signup">
				<div className="flex max-w-[400px] flex-col gap-8">
					<header className="flex flex-col gap-4">
						{/* should convert this to html, but i'm just lazy */}
						<UserDetailsGraphic />

						<h2 className="font-body text-2xl font-bold text-neutral-900">Let’s get you onboard</h2>
					</header>

					<form className="grid grid-cols-2 gap-6 font-body font-normal">
						<Input type="text" label="First Name" placeholder="Arowoka" />
						<Input type="text" label="Last Name" placeholder="John" />
						<Input
							type="email"
							label="Email Address"
							placeholder="name@email.com"
							className="col-span-full"
						/>
						<Input
							type="password"
							label="Password"
							placeholder="***************"
							className="col-span-full"
						/>
						<Input type="text" label="Referral ID" placeholder="John123ref" className="col-span-full" />

						<label className="col-span-full flex items-center gap-3 font-body text-sm font-normal">
							<input
								type="checkbox"
								name="agree"
								id="agree"
								className="size-5 rounded border border-neutral-200 text-primary-300"
							/>
							<p>I agree to the terms and conditions</p>
						</label>

						<div className="col-span-full flex flex-col gap-2">
							<Button type="submit">Sign up</Button>

							<p className="text-center text-neutral-500">
								Already have an account?{" "}
								<Link href="/login" className="font-medium text-secondary-300 hover:underline">
									Log in
								</Link>{" "}
							</p>
						</div>
					</form>

					<div className="mt-3 flex flex-col gap-4">
						<p className="relative text-center text-sm before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-5/12 before:-translate-y-1/2 before:bg-[linear-gradient(90deg,_#FFFFFF_0%,_#D0D5DD_100%)] after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-5/12 after:-translate-y-1/2 after:bg-[linear-gradient(90deg,_#D0D5DD_0%,_#ffffff_100%)]">
							Or
						</p>

						<Button type="button" variant="ghost" className="font-normal">
							<GoogleIcon />
							Sign up with Google
						</Button>
					</div>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
