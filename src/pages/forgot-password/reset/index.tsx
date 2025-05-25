import { AuthLayout } from "@/components/layouts/auth";
import { Seo, Spinner } from "@/components/shared";
import { ForgotPasswordGraphic } from "@/assets/icons";
import { classore } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResetPasswordMutation } from "@/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeft } from "@untitled-ui/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import type { HttpError } from "@/types";
// const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const pageSchema = z
	.object({
		password: z
			.string()
			.min(1, { message: "Please enter your password" })
			.min(8, {
				message: "Password cannot be less than 8 characters",
			})
			.max(30, { message: "Password cannot be more than 30 characters" })
			.regex(/(?=.*[A-Z])/, {
				message: "Must contain at least one uppercase character",
			})
			.regex(/(?=.*[a-z])/, {
				message: "Must contain at least one lowercase character",
			})
			.regex(/(?=.*\d)/, {
				message: "Must contain at least one number",
			})
			.regex(/^(?=.*?[#?_!@$%^*-])/, {
				message: "Must contain at least one special character",
			}),
		confirm_password: z
			.string()
			.min(1, { message: "Please enter your password again" })
			.min(8, {
				message: "Password cannot be less than 8 characters",
			})
			.max(30, { message: "Password cannot be more than 30 characters" })
			.regex(/(?=.*[A-Z])/, {
				message: "Must contain at least one uppercase character",
			})
			.regex(/(?=.*[a-z])/, {
				message: "Must contain at least one lowercase character",
			})
			.regex(/(?=.*\d)/, {
				message: "Must contain at least one number",
			})
			.regex(/^(?=.*?[#?_!@$%^*-])/, {
				message: "Must contain at least one special character",
			}),
	})
	.superRefine(({ password, confirm_password }, ctx) => {
		if (password !== confirm_password) {
			ctx.addIssue({
				code: "custom",
				message: "Passwords do not match",
				path: ["confirm_password"],
			});
		}
	});

type FormValues = z.infer<typeof pageSchema>;

const Page = () => {
	const router = useRouter();
	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			password: "",
			confirm_password: "",
		},
		resolver: zodResolver(pageSchema),
	});

	const { isPending, mutate } = useMutation({
		mutationKey: ["login"],
		mutationFn: (value: FormValues) =>
			ResetPasswordMutation({
				otp: JSON.parse(sessionStorage.getItem("temp_classore") as string).verification_code,
				new_password: value.password,
			}),
		onSuccess: () => {
			sessionStorage.removeItem("temp_classore");
			toast.success("Password reset successful!", {
				description: "You can now sign in with your new password",
			});
			router.replace("/signin");
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "Something went wrong!";
			toast.error(message);
		},
	});
	const onSubmit = (values: FormValues) => {
		mutate(values);
	};

	return (
		<>
			<Seo title="Forgot Password" />

			<AuthLayout screen="reset-password">
				<div className="flex max-w-96 flex-col gap-10 font-body lg:gap-20">
					<Link href="/" className="w-fit lg:hidden">
						<Image src={classore} alt="classore" width={120} height={25} />
					</Link>

					<div className="flex flex-col gap-6 lg:pt-20">
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
								<Button type="submit" disabled={isPending}>
									{isPending ? <Spinner /> : "Reset Password"}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</AuthLayout>
		</>
	);
};

export default Page;
