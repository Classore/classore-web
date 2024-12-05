import { VerifyEmailGraphic } from "@/assets/icons"
import { AuthLayout } from "@/components/layouts/auth"
import { Seo, Spinner } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { OTPInput } from "@/components/ui/otp-input"
import { useCountDown } from "@/hooks/use-countdown"
import { formatEmail } from "@/lib"
import { ForgotPasswordMutation } from "@/queries"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { ChevronLeft } from "lucide-react"
import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"

const pageSchema = yup.object().shape({
	verification_code: yup
		.string()
		.required("Please enter your verification code")
		.matches(/^[0-9]+$/, "Must be only digits")
		.min(4, "Verification code must be 4 digits")
		.max(4, "Verification code must be 4 digits"),
})

type FormValues = yup.InferType<typeof pageSchema>

export const getServerSideProps = (async (req) => {
	const email = req.query.email ?? ""

	return {
		props: {
			email: typeof email === "string" ? formatEmail(decodeURIComponent(email)) : "",
		},
	}
}) satisfies GetServerSideProps<{ email: string }>

const Page = ({ email }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter()
	const { counter, reset } = useCountDown({ total: 60, ms: 1000 })
	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			verification_code: "",
		},
		resolver: yupResolver(pageSchema),
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: () =>
			ForgotPasswordMutation({
				email_or_phone_number: email,
			}),
		onSuccess: () => {
			toast.success("OTP resent successfully!", {
				description: "Please check your email to verify your account",
			})
			reset()
		},
	})

	const onSubmit = (values: FormValues) => {
		sessionStorage.setItem("temp_classore", JSON.stringify(values))
		router.push("/forgot-password/reset")
	}

	return (
		<>
			<Seo title="Verify Email" />

			<AuthLayout screen="forgot-password">
				<div className="flex max-w-[400px] flex-col gap-8 pt-20">
					<button
						onClick={() => router.back()}
						type="button"
						className="mb-8 flex w-fit items-center gap-1 rounded-lg border border-neutral-200 bg-neutral-100 px-2 py-1 text-sm text-neutral-700 transition-colors hover:bg-neutral-200">
						<ChevronLeft width={16} />
						<span>Back</span>
					</button>

					<header className="flex flex-col gap-4">
						<VerifyEmailGraphic />

						<div>
							<h2 className="font-body text-2xl font-bold text-neutral-900">Verify your email address</h2>
							<p className="pt-1 text-sm text-neutral-500">
								A 4 digit code has been sent to <span className="font-bold text-neutral-900">{email}</span>
							</p>
						</div>
					</header>

					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 font-body font-normal">
						<OTPInput control={control} name="verification_code" />

						<div className="col-span-full flex flex-col gap-2">
							<Button type="submit" disabled={isPending}>
								{isPending ? <Spinner /> : "Verify"}
							</Button>

							<div className="flex items-center justify-center gap-2">
								<p className="text-center text-sm text-neutral-500">Didn’t receive a mail? </p>

								{counter ? (
									<span className="text-center text-sm">
										Resend in <span className="font-black text-secondary-300">{counter}s</span>
									</span>
								) : (
									<Button
										disabled={isPending}
										onClick={() => mutate()}
										type="button"
										variant="link"
										className="w-fit px-1 text-sm font-medium text-secondary-300 shadow-none hover:underline">
										{isPending ? "Resending..." : "Resend"}
									</Button>
								)}
							</div>
						</div>
					</form>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page