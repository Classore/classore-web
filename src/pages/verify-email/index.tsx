import { VerifyEmailGraphic } from "@/assets/icons"
import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { OTPInput } from "@/components/ui/input-otp"
import { yupResolver } from "@hookform/resolvers/yup"
import Link from "next/link"
import { useForm } from "react-hook-form"
import * as yup from "yup"

const pageSchema = yup.object().shape({
	verification_code: yup
		.string()
		.required("Please enter your verification code")
		.matches(/^[0-9]+$/, "Must be only digits")
		.min(6, "Verification code must be 6 digits")
		.max(6, "Verification code must be 6 digits"),
})
type FormValues = yup.InferType<typeof pageSchema>

const Page = () => {
	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			verification_code: "",
		},
		resolver: yupResolver(pageSchema),
	})

	const onSubmit = (values: FormValues) => {
		console.log("values", values)
	}

	return (
		<>
			<Seo title="Verify Email" />

			<AuthLayout screen="forgot-password">
				<div className="flex max-w-[400px] flex-col gap-8 pt-20">
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

					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 font-body font-normal">
						<OTPInput control={control} name="verification_code" />

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
