import { AuthLayout } from "@/components/layouts/auth";
import { Seo, Spinner } from "@/components/shared";

import { VerifyEmailGraphic } from "@/assets/icons";
import { SignupStepper } from "@/components/signup-stepper";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { OTPInput } from "@/components/ui/otp-input";
import { useCountDown } from "@/hooks/use-countdown";
import { formatEmail } from "@/lib";
import { ResendVerificationCodeMutation, VerifyEmailMutation } from "@/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const pageSchema = z.object({
	verification_code: z
		.string()
		.min(1, { message: "Please enter your verification code" })
		.regex(/^[0-9]+$/, { message: "Must be only digits" })
		.min(4, { message: "Verification code must be 4 digits" })
		.max(4, { message: "Verification code must be 4 digits" })
		.trim(),
});

type FormValues = z.infer<typeof pageSchema>;

// this help resolves the flash before next calls useRouter
export const getServerSideProps = (async (req) => {
	const email = req.query.email ?? "";

	return {
		props: {
			email: typeof email === "string" ? formatEmail(decodeURIComponent(email)) : "",
		},
	};
}) satisfies GetServerSideProps<{ email: string }>;

const Page = ({ email }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const [showSuccessModal, setShowSuccessModal] = React.useState(false);
	const { counter, reset } = useCountDown({ total: 60, ms: 1000 });
	const { control, handleSubmit, setError } = useForm<FormValues>({
		defaultValues: {
			verification_code: "",
		},
		resolver: zodResolver(pageSchema),
	});

	const resendCode = useMutation({
		mutationKey: ["resend-verification-code"],
		mutationFn: ResendVerificationCodeMutation,
		onSettled: () => {
			reset();
		},
	});

	const { isPending, mutate } = useMutation({
		mutationKey: ["verify-email"],
		mutationFn: (value: FormValues) => VerifyEmailMutation(value),
		onError: (error: any) => {
			setError("verification_code", { message: error.response?.data?.message || "Verification failed" });
		},
		onSuccess: (data) => {
			toast.success(data.message || "Email verified successfully!");
			setShowSuccessModal(true);
		},
	});

	const onSubmit = (values: FormValues) => {
		mutate(values);
	};

	const handleProceedToStudyPlan = () => {
		setShowSuccessModal(false);
		router.push({
			pathname: "/signup/student/studying-for",
			query: {
				step: "4",
			},
		});
	};

	return (
		<>
			<Seo title="Verify Email – Classore" />

			<AuthLayout screen="signup">
				<div className="flex max-w-[400px] flex-col gap-10 lg:gap-20">
					<SignupStepper />

					<div className="flex flex-col gap-6">
						<header className="flex flex-col gap-4">
							<VerifyEmailGraphic />
							<div>
								<h2 className="font-body text-2xl font-bold text-neutral-900">Verify your email address</h2>
								<p className="pt-1 text-sm text-neutral-500">
									A 4 digit code has been sent to <span className="font-bold text-neutral-900">{email}</span>
								</p>
							</div>
						</header>

						<div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs leading-relaxed text-neutral-600">
							<span className="font-bold text-neutral-800">NOTE:</span> Please check your spam or promotions folder if you don&apos;t receive the email.
						</div>

						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 font-body font-normal">
							<OTPInput control={control} name="verification_code" />

							<div className="col-span-full flex flex-col gap-2">
								<Button type="submit" disabled={isPending || resendCode.isPending}>
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
											disabled={resendCode.isPending || isPending}
											onClick={() => resendCode.mutate()}
											type="button"
											variant="link"
											className="w-fit px-1 text-sm font-medium text-secondary-300 shadow-none hover:underline">
											{resendCode.isPending ? "Resending..." : "Resend"}
										</Button>
									)}
								</div>
							</div>
						</form>
					</div>
				</div>

				{/* Celebratory Account Created Modal (Matching Mobile AccountCreatedSheet) */}
				<Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
					<DialogContent className="flex w-full max-w-[420px] flex-col items-center gap-5 p-6 text-center">
						<div className="relative size-16">
							<Image
								src="/assets/images/user-badge.png"
								alt="Account Created"
								fill
								className="object-contain"
								onError={(e) => {
									// fallback if image asset is not present
									(e.currentTarget as any).style.display = "none";
								}}
							/>
						</div>

						<div className="space-y-2">
							<h3 className="text-2xl font-bold text-neutral-900">Account Created Successfully</h3>
							<p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
								Welcome to Classore, let’s get started with your study interest. Explore all study options while preparing for your exams!
							</p>
						</div>

						<Button onClick={handleProceedToStudyPlan} className="w-full mt-2 font-bold">
							Let&apos;s Explore →
						</Button>
					</DialogContent>
				</Dialog>
			</AuthLayout>
		</>
	);
};

export default Page;
