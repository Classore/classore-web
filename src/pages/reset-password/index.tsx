import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"

import { ForgotPasswordGraphic } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { passwordRules } from "@/config"
import { yupResolver } from "@hookform/resolvers/yup"
import { ChevronLeft } from "@untitled-ui/icons-react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import * as yup from "yup"
// const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const pageSchema = yup.object().shape({
	password: yup
		.string()
		.required("Please enter your password")
		.min(6, "Password must be at least 8 characters")
		.matches(
			passwordRules,
			"Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number"
		),
	confirm_password: yup
		.string()
		.required("Please confirm your password")
		.min(6, "Confirm password must be at least 8 characters")
		.matches(
			passwordRules,
			"Confirm password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number"
		)
		.oneOf([yup.ref("password")], "Passwords must match"),
})
type FormValues = yup.InferType<typeof pageSchema>

const Page = () => {
	const router = useRouter()
	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			password: "",
			confirm_password: "",
		},
		resolver: yupResolver(pageSchema),
	})

	const onSubmit = (values: FormValues) => {
		console.log("values", values)
	}

	return (
		<>
			<Seo title="Forgot Password" />

			<AuthLayout screen="reset-password">
				<div className="flex max-w-96 flex-col gap-6 pt-20">
					<button
						onClick={() => router.back()}
						type="button"
						className="mb-8 flex w-fit items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 px-2 py-1 text-sm text-neutral-700 transition-colors hover:bg-neutral-200">
						<ChevronLeft width={16} />
						<span>Back</span>
					</button>

					<header className="flex flex-col gap-4">
						<ForgotPasswordGraphic />

						<h2 className="font-body text-2xl font-bold text-neutral-900">Reset your Password</h2>
					</header>

					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 font-body font-normal">
						<Input
							type="password"
							label="Password"
							placeholder="***************"
							className="col-span-full"
							control={control}
							name="password"
						/>

						<Input
							type="password"
							label="Confirm Password"
							placeholder="***************"
							className="col-span-full"
							control={control}
							name="confirm_password"
						/>

						<div className="mt-2 flex flex-col gap-2">
							<Button type="submit">Reset Password</Button>
						</div>
					</form>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
