import { AuthLayout } from "@/components/layouts/auth"
import { Seo, Spinner } from "@/components/shared"

import { ForgotPasswordGraphic } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ForgotPasswordMutation } from "@/queries"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { ChevronLeft } from "@untitled-ui/icons-react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"
// const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const pageSchema = yup.object().shape({
	email_or_phone_number: yup
		.string()
		.required("Please enter your email address")
		.email("Invalid email address"),
})
type FormValues = yup.InferType<typeof pageSchema>

const Page = () => {
	const router = useRouter()
	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			email_or_phone_number: "",
		},
		resolver: yupResolver(pageSchema),
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ["forgot-password"],
		mutationFn: (value: FormValues) => ForgotPasswordMutation(value),
		onSuccess: (_data, variable) => {
			toast.success("OTP sent successfully!", {
				description: "Please check your email to verify your account",
			})
			router.push({
				pathname: "/forgot-password/verify-email",
				query: {
					email: decodeURIComponent(variable.email_or_phone_number),
				},
			})
		},
	})
	const onSubmit = (values: FormValues) => {
		mutate(values)
	}

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

					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 font-body font-normal">
						<Input
							type="email"
							label="Email Address"
							placeholder="name@email.com"
							className="col-span-full"
							control={control}
							name="email_or_phone_number"
						/>

						<div className="mt-2 flex flex-col gap-2">
							<Button type="submit" disabled={isPending}>
								{isPending ? <Spinner /> : "Next"}
							</Button>
						</div>
					</form>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
