import { AuthLayout } from "@/components/layouts/auth"
import { SuccessGraphic } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { Seo } from "@/components/shared"

const Page = () => {
	return (
		<>
			<Seo title="Success" />
			<AuthLayout screen="signup">
				<div className="flex max-w-96 flex-col gap-6 pt-20">
					{/* should convert this to html, but i'm just lazy */}
					<SuccessGraphic />
					<h2 className="font-body text-2xl font-bold -tracking-wide text-neutral-900">Success 🎉</h2>
					<p className="font-heading text-sm text-neutral-500">
						Your payment for <strong className="text-neutral-900">“JAMB Exam Prep Bundle”</strong> was
						successful
					</p>
					<Button type="submit">Go to Dashboard</Button>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
