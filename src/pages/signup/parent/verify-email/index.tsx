import { AuthLayout } from "@/components/layouts/auth";
import { Seo, Spinner } from "@/components/shared";

import { VerifyEmailGraphic } from "@/assets/icons";
import { SignupStepper } from "@/components/signup-stepper";
import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/ui/otp-input";
import { useCountDown } from "@/hooks/use-countdown";
import { formatEmail } from "@/lib";
import { ResendVerificationCodeMutation, VerifyEmailMutation } from "@/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
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
      email:
        typeof email === "string" ? formatEmail(decodeURIComponent(email)) : "",
    },
  };
}) satisfies GetServerSideProps<{ email: string }>;

const Page = ({
  email,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
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
    onError: (error) => {
      setError("verification_code", { message: error.response?.data.message });
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/signup/parent/success");
    },
  });
  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  return (
    <>
      <Seo title="Verify Email" />

      <AuthLayout screen="signup">
        <div className="flex max-w-[400px] flex-col gap-10 lg:gap-20">
          <SignupStepper />

          <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-4">
              <VerifyEmailGraphic />
              <div>
                <h2 className="font-body text-2xl font-bold text-neutral-900">
                  Verify your email address
                </h2>
                <p className="pt-1 text-sm text-neutral-500">
                  A 4 digit code has been sent to{" "}
                  <span className="font-bold text-neutral-900">{email}</span>
                </p>
              </div>
            </header>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6 font-body font-normal"
            >
              <OTPInput control={control} name="verification_code" />

              <div className="col-span-full flex flex-col gap-2">
                <Button
                  type="submit"
                  disabled={isPending || resendCode.isPending}
                >
                  {isPending ? <Spinner /> : "Verify"}
                </Button>

                <div className="flex items-center justify-center gap-2">
                  <p className="text-center text-sm text-neutral-500">
                    Didn’t receive a mail?{" "}
                  </p>

                  {counter ? (
                    <span className="text-center text-sm">
                      Resend in{" "}
                      <span className="font-black text-secondary-300">
                        {counter}s
                      </span>
                    </span>
                  ) : (
                    <Button
                      disabled={resendCode.isPending || isPending}
                      onClick={() => resendCode.mutate()}
                      type="button"
                      variant="link"
                      className="w-fit px-1 text-sm font-medium text-secondary-300 shadow-none hover:underline"
                    >
                      {resendCode.isPending ? "Resending..." : "Resend"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </AuthLayout>
    </>
  );
};

export default Page;
