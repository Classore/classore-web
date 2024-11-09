import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"

import { StudyingGraphic } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { Lock02 } from "@untitled-ui/icons-react"

const Page = () => {
	return (
		<>
			<Seo title="Sign up" />

			<AuthLayout screen="signup">
				<div className="flex max-w-96 flex-col gap-6">
					{/* should convert this to html, but i'm just lazy */}
					<StudyingGraphic />

					<h2 className="font-body text-2xl font-bold text-neutral-900">What are you studying for</h2>

					<form className="flex flex-col gap-6 font-body font-normal">
						<div className="col-span-full flex flex-col gap-2">
							<Button type="submit">Pay NGN 4,999</Button>

							<div className="flex items-center gap-1.5 self-center text-neutral-500">
								<Lock02 width={18} />
								<p className="text-center text-sm">Payment secured by Paystack</p>
							</div>
						</div>
					</form>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
