import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"

import { SignupStepper } from "@/components/signup-stepper"
import { Select, SelectItem } from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/multi-select"
import { Lock02 } from "@untitled-ui/icons-react"
import { StudyingGraphic } from "@/assets/icons"
import { Button } from "@/components/ui/button"

const Page = () => {
	return (
		<>
			<Seo title="Studying For" />
			<AuthLayout screen="signup">
				<div className="flex max-w-96 flex-col gap-20">
					<SignupStepper />
					<div className="flex flex-col gap-6">
						<header className="flex flex-col gap-4">
							<StudyingGraphic />
							<h2 className="font-body text-2xl font-bold text-neutral-900">What are you studying for</h2>
						</header>
						<form className="flex flex-col gap-6 font-body font-normal">
							<Select label="I am studying for">
								<SelectItem value="light">Light</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="system">System</SelectItem>
							</Select>
							<Select label="Select prep bundle">
								<SelectItem value="light">JAMB Exam Prep Bundle (N 4,999)</SelectItem>
								<SelectItem value="dark">NECO Exam Prep Bundle (N 4,999)</SelectItem>
								<SelectItem value="waec">WAEC Exam Prep Bundle (N 4,999)</SelectItem>
								<SelectItem value="system">GCE Exam Prep Bundle (N 4,999)</SelectItem>
							</Select>
							<MultiSelect
								label="Select subjects"
								placeholder="Select subjects..."
								options={[
									{
										label: "Remix",
										value: "remix",
									},
									{
										label: "Next.js",
										value: "nextjs",
									},
								]}
							/>
							<div className="col-span-full flex flex-col gap-2">
								<Button type="submit">Pay NGN 4,999</Button>
								<div className="flex items-center gap-1.5 self-center text-neutral-500">
									<Lock02 width={18} />
									<p className="text-center text-sm">Payment secured by Paystack</p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
