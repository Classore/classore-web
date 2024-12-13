/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthLayout } from "@/components/layouts/auth"
import { ErrorMessage, Seo, Spinner } from "@/components/shared"
import Cookies from "js-cookie"

import { GoogleIcon, UserDetailsGraphic } from "@/assets/icons"
import { SignupStepper } from "@/components/signup-stepper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { passwordRules } from "@/config"
import { SignUpMutation } from "@/queries"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as yup from "yup"

// const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const onboardSchema = yup.object().shape({
	first_name: yup.string().required("Please enter your first name"),
	last_name: yup.string().required("Please enter your last name"),
	email: yup.string().required("Please enter your email address").email("Invalid email address"),
	password: yup
		.string()
		.required("Please enter your password")
		.min(6, "Password must be at least 8 characters")
		.matches(
			passwordRules,
			"Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number"
		),
	referral_code: yup.string(),
	accept_terms: yup.boolean().oneOf([true], "You must accept the terms and conditions"),
})

type OnboardFormValues = yup.InferType<typeof onboardSchema>

const Page = () => {
	const router = useRouter()
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<OnboardFormValues>({
		resolver: yupResolver(onboardSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			referral_code: "",
			accept_terms: undefined,
		},
	})

	const { isPending, mutate } = useMutation({
		mutationKey: ["signup"],
		mutationFn: (values: OnboardFormValues) => {
			const { accept_terms, ...rest } = values

			return SignUpMutation({
				...rest,
				sign_up_channel: "DEFAULT",
				user_type: "STUDENT",
				referral_code: rest.referral_code ?? "",
			})
		},
		onSuccess: (data) => {
			toast.success("Sign up successful!", {
				description: "Please check your email to verify your account",
			})

			const { access_token, password, ...rest } = data.data.user_details

			const decoded = jwtDecode(access_token)
			localStorage.setItem("CLASSORE_USER", JSON.stringify(rest))
			Cookies.set("CLASSORE_TOKEN", access_token, {
				expires: decoded?.exp ? new Date(decoded?.exp * 1000) : new Date(Date.now() + 7 * 24 * 60 * 60), // 7 days,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
			})
			router.push({
				pathname: "/signup/student/verify-email",
				query: {
					email: encodeURIComponent(data.data.user_details.email),
					step: "3",
				},
			})
		},
	})
	const onSubmit = (values: OnboardFormValues) => {
		mutate(values)
	}

	return (
		<>
			<Seo title="Sign up" />

			<AuthLayout screen="signup">
				<div className="flex max-w-[400px] flex-col gap-10 lg:gap-20">
					<SignupStepper />

					<div className="flex flex-col gap-6">
						<header className="flex flex-col gap-4">
							<UserDetailsGraphic />
							<h2 className="font-body text-2xl font-bold text-neutral-900">Let’s get you onboard</h2>
						</header>

						<form
							onSubmit={handleSubmit(onSubmit)}
							className="grid grid-cols-2 gap-x-3 gap-y-6 font-body font-normal lg:gap-6">
							<Input
								type="text"
								label="First Name"
								placeholder="John"
								control={control}
								name="first_name"
							/>
							<Input type="text" label="Last Name" placeholder="Doe" control={control} name="last_name" />
							<Input
								type="email"
								label="Email Address"
								placeholder="name@email.com"
								className="col-span-full"
								control={control}
								name="email"
							/>
							<Input
								type="password"
								label="Password"
								placeholder="***************"
								className="col-span-full"
								control={control}
								name="password"
							/>
							<Input
								type="text"
								label="Referral ID"
								placeholder="John123ref"
								className="col-span-full"
								control={control}
								name="referral_code"
							/>

							<div className="col-span-full flex flex-col gap-1.5">
								<label className="flex items-center gap-3 font-body text-sm font-normal">
									<input
										{...register("accept_terms")}
										type="checkbox"
										aria-invalid={errors.accept_terms ? "true" : "false"}
										className="size-5 rounded border border-neutral-200 text-primary-300 aria-[invalid=true]:border-[1.3px] aria-[invalid=true]:border-red-600"
									/>
									<p>I agree to the terms and conditions</p>
								</label>

								{errors.accept_terms ? <ErrorMessage message={errors.accept_terms.message} /> : null}
							</div>

							<div className="col-span-full flex flex-col gap-2">
								<Button type="submit" disabled={isPending}>
									{isPending ? <Spinner /> : "Sign up"}
								</Button>
								<p className="text-center text-neutral-500">
									Already have an account?{" "}
									<Link href="/signin" className="font-medium text-secondary-300 hover:underline">
										Log in
									</Link>{" "}
								</p>
							</div>
						</form>

						<div className="mt-3 flex flex-col gap-4">
							<p className="relative text-center text-sm before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-5/12 before:-translate-y-1/2 before:bg-[linear-gradient(90deg,_#FFFFFF_0%,_#D0D5DD_100%)] after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-5/12 after:-translate-y-1/2 after:bg-[linear-gradient(90deg,_#D0D5DD_0%,_#ffffff_100%)]">
								Or
							</p>
							<Button type="button" variant="ghost" className="font-normal">
								<GoogleIcon />
								Sign up with Google
							</Button>
						</div>
					</div>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
