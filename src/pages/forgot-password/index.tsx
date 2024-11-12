import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"

import { ForgotPasswordGraphic } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "@untitled-ui/icons-react"
import { useRouter } from "next/router"
// const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const Page = () => {
	const router = useRouter()
	return (
		<>
			<Seo title="Forgot Password" />

			<AuthLayout screen="forgot-password">
				<div className="flex max-w-96 flex-col gap-6 pt-20">
					<button
						onClick={() => router.back()}
						type="button"
						className="mb-8 flex w-fit items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 px-2 py-1 text-sm text-neutral-700 transition-colors hover:bg-neutral-200">
						<ChevronLeft width={16} />
						<span>Back</span>
					</button>

					<header className="flex flex-col gap-4">
						{/* should convert this to html, but i'm just lazy */}
						<ForgotPasswordGraphic />

						<h2 className="font-body text-2xl font-bold text-neutral-900">Forgot Password</h2>
					</header>

					<form className="flex flex-col gap-4 font-body font-normal">
						<Input
							type="email"
							label="Email Address"
							placeholder="name@email.com"
							className="col-span-full"
						/>

						<div className="mt-2 flex flex-col gap-2">
							<Button type="submit">Next</Button>

							{/* <Button type="button" variant="link">
								Cancel
							</Button> */}
						</div>
					</form>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
