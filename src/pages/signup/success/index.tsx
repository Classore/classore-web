import { SuccessGraphic } from "@/assets/icons"
import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Confetti } from "@neoconfetti/react"
import Link from "next/link"
import { useRouter } from "next/router"

const Page = () => {
	const router = useRouter()

	return (
		<>
			<Seo title="Success" />
			<AuthLayout screen="signup">
				<Confetti particleCount={500} />

				<div className="flex max-w-96 flex-col gap-6 pt-20">
					<SuccessGraphic />
					<h2 className="font-body text-2xl font-bold -tracking-wide text-neutral-900">Success 🎉</h2>

					{router.query.register_as === "student" && (
						<>
							<p className="font-heading text-sm text-neutral-500">
								Your payment for <strong className="text-neutral-900">“JAMB Exam Prep Bundle”</strong> was
								successful
							</p>

							<Button asChild>
								<Link href="/dashboard" replace>
									Go to Dashboard
								</Link>
							</Button>
						</>
					)}

					{router.query.register_as === "parent" && (
						<>
							<p className="text-balance font-heading text-sm text-neutral-500">
								You have successfully opened a parent account. Monitor your ward’s progress with Classore
							</p>

							<div className="flex flex-col gap-2">
								<Button asChild>
									<Link href="/signup/add-ward" replace>
										Add My Ward
									</Link>
								</Button>

								<Button asChild variant="link" className="text-secondary-300">
									<Link href="/dashboard" replace>
										Go to Dashboard
									</Link>
								</Button>
							</div>
						</>
					)}
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
