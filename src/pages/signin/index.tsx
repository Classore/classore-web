import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import Link from "next/link"
import { toast } from "sonner"
import * as yup from "yup"

import { AuthGraphic, GoogleIcon } from "@/assets/icons"
import { AuthLayout } from "@/components/layouts/auth"
import { Seo, Spinner } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/z-store"
import { Input } from "@/components/ui/input"
import { SignInMutation } from "@/queries"

// const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const loginSchema = yup.object().shape({
	email: yup.string().required("Please enter your email address").email("Invalid email address"),
	password: yup.string().required("Please enter your password"),
})
type LoginFormValues = yup.InferType<typeof loginSchema>

const Page = () => {
	const { signIn } = useUserStore()
	const router = useRouter()
	const { control, handleSubmit } = useForm<LoginFormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(loginSchema),
	})

	// No need for "onError" and "onSuccess" callbacks here since we already handle that globally.
	const { isPending, mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: (values: LoginFormValues) => SignInMutation(values),
		onSuccess: (data) => {
			const { access_token } = data.data
			signIn(data.data, access_token)
			toast.success("Login successful!")
			router.replace("/dashboard")
		},
	})
	const onSubmit = (values: LoginFormValues) => {
		mutate(values)
	}

	return (
		<>
			<Seo title="Welcome back" />
			<AuthLayout screen="signin">
				<div className="flex max-w-96 flex-col justify-center gap-6 pt-20">
					<header className="flex flex-col gap-4">
						<AuthGraphic />
						<h2 className="font-body text-2xl font-bold text-neutral-900">Welcome Back</h2>
					</header>

					<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 font-body font-normal">
						<Input
							type="email"
							label="Email Address"
							placeholder="name@email.com"
							className="col-span-full"
							control={control}
							name="email"
						/>
						<div className="flex flex-col gap-4">
							<Input
								type="password"
								label="Password"
								placeholder="***************"
								className="col-span-full"
								control={control}
								name="password"
							/>

							<div className="flex items-center justify-between gap-1 text-sm">
								<label className="col-span-full flex items-center gap-3 font-normal">
									<input
										type="checkbox"
										name="agree"
										id="agree"
										className="size-5 rounded border border-neutral-200 text-primary-300"
									/>
									<p className="text-neutral-500">Remember me</p>
								</label>
								<Link href="/forgot-password" className="text-secondary-300 hover:underline">
									Forgot Password ?
								</Link>
							</div>
						</div>

						<div className="mt-2 flex flex-col gap-2">
							<Button type="submit" disabled={isPending}>
								{isPending ? <Spinner /> : "Sign In"}
							</Button>

							<p className="text-center text-neutral-500">
								New user?{" "}
								<Link href="/signup?step=1" className="font-medium text-secondary-300 hover:underline">
									Sign up
								</Link>
							</p>
						</div>
					</form>

					<div className="flex flex-col gap-4">
						<p className="relative text-center text-sm before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-5/12 before:-translate-y-1/2 before:bg-[linear-gradient(90deg,_#FFFFFF_0%,_#D0D5DD_100%)] after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-5/12 after:-translate-y-1/2 after:bg-[linear-gradient(90deg,_#D0D5DD_0%,_#ffffff_100%)]">
							Or
						</p>
						<Button type="button" variant="ghost" className="font-normal">
							<GoogleIcon />
							Continue with Google
						</Button>
					</div>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
