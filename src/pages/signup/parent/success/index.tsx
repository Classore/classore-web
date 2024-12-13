import { SuccessGraphic } from "@/assets/icons"
import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Confetti } from "@neoconfetti/react"
import Link from "next/link"

const Page = () => {
	return (
		<>
			<Seo title="Parent Registration Success" />

			<AuthLayout screen="signup">
				<Confetti particleCount={500} />

				<div className="flex max-w-96 flex-col gap-6 pt-20">
					<SuccessGraphic />
					<h2 className="font-body text-2xl font-bold -tracking-wide text-neutral-900">Success 🎉</h2>

					<p className="text-balance font-heading text-sm text-neutral-500">
						You have successfully opened a parent account. Monitor your ward’s progress with Classore
					</p>

					<div className="flex flex-col gap-2">
						<Button asChild>
							<Link href="/signup/parent/add-ward?step=4" replace>
								Add My Ward
							</Link>
						</Button>

						<Button asChild variant="link" className="text-secondary-300">
							<Link href="/dashboard" replace>
								Go to Dashboard
							</Link>
						</Button>
					</div>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
