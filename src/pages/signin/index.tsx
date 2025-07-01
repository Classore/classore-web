import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";
import * as z from "zod";

import { AuthGraphic, GoogleIcon } from "@/assets/icons";
import { AuthLayout } from "@/components/layouts/auth";
import { Seo, Spinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/z-store";
import { Input } from "@/components/ui/input";
import { SignInMutation } from "@/queries";
import { setToken } from "@/lib/cookies";
import type { HttpError } from "@/types";

const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Please enter your email address" })
		.email({ message: "Please enter a valid email" })
		.trim(),
	password: z.string().min(1, { message: "Please enter your password" }).trim(),
	// remember_me: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Page = () => {
	const { signIn } = useUserStore();
	const router = useRouter();
	const { control, handleSubmit } = useForm<LoginFormValues>({
		defaultValues: {
			email: "",
			password: "",
			// remember_me: false,
		},
		resolver: zodResolver(loginSchema),
	});

	const { isPending, mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: (values: LoginFormValues) => SignInMutation(values),
		onSuccess: (data) => {
			const {
				data: { access_token, user_type, is_verified, chosen_study_plan, email },
			} = data;

			setToken(access_token);
			const isStudent = user_type === "STUDENT";
			signIn(data.data, access_token);

			if (!isStudent) {
				toast.success("Login successful!");
				router.replace("parents/dashboard");
				return;
			}

			if (!is_verified) {
				toast.success("Verify your email to complete registration", {
					description: "Please check your email to verify your account",
				});

				router.push({
					pathname: "/signup/student/verify-email",
					query: {
						email: encodeURIComponent(email.trim()),
						step: "3",
					},
				});
				return;
			}

			if (!chosen_study_plan) {
				toast.success("Choose your study plan", {
					description: "Please choose your study plan to complete registration",
				});
				router.push({
					pathname: "/signup/student/studying-for",
					query: { step: "4" },
				});
				return;
			}

			toast.success("Login successful!");
			router.replace("/dashboard");
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "Something went wrong!";
			toast.error(message);
		},
	});

	const onSubmit = (values: LoginFormValues) => {
		mutate(values);
	};

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

						<Button
							type="button"
							variant="ghost"
							className="font-normal"
							onClick={() =>
								window.open(
									`${
										process.env.NEXT_PUBLIC_API_URL ||
										"https://classore-be-june-224829194037.europe-west1.run.app/classore/v1"
									}/auth/google/callback`,
									"_self"
								)
							}>
							<GoogleIcon />
							Sign in with Google
						</Button>
					</div>
				</div>
			</AuthLayout>
		</>
	);
};

export default Page;
