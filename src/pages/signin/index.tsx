import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { AuthGraphic, GoogleIcon } from "@/assets/icons";
import { AuthLayout } from "@/components/layouts/auth";
import { Seo, Spinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { endpoints } from "@/config";
import { axios, capitalize } from "@/lib";
import { setToken } from "@/lib/cookies";
import { SignInMutation } from "@/queries";
import { useUserStore } from "@/store/z-store";
import type { HttpError, HttpResponse, UserProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const loginWithGoogle = useGoogleLogin({
    scope: "openid email profile",
    onSuccess: async (credential) => {
      try {
        const { data } = await axios.get<HttpResponse<UserProps>>(
          `${endpoints().auth.google_signin}?access_token=${credential.access_token}`,
        );

        const { access_token } = data.data;
        signIn(data.data, access_token);
        toast.success(`Welcome ${capitalize(data.data.first_name)}`);
        router.push("/dashboard");
      } catch (error: unknown) {
        const {
          response: {
            data: { message },
          },
        } = error as HttpError;
        toast.error(message ?? "An error occurred");
      }
    },
    onError: (error) => {
      console.error("An error occurred", error);
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (values: LoginFormValues) => SignInMutation(values),
    onSuccess: (data) => {
      const { access_token } = data.data;

      setToken(access_token);
      const isStudent = data.data.user_type === "STUDENT";

      if (!data.data.is_verified) {
        toast.success("Verify your email to complete registration", {
          description: "Please check your email to verify your account",
        });

        router.push({
          pathname: isStudent
            ? "/signup/student/verify-email"
            : "/signup/parent/verify-email",
          query: {
            email: encodeURIComponent(data.data.email.trim()),
            step: "3",
          },
        });
        return;
      }

      if (!data.data.chosen_study_plan && isStudent) {
        toast.success("Choose your study plan", {
          description: "Please choose your study plan to complete registration",
        });
        router.push({
          pathname: "/signup/student/studying-for",
          query: {
            step: "4",
          },
        });
        return;
      }

      signIn(data.data, access_token);
      toast.success("Login successful!");
      if (isStudent) {
        router.replace("/dashboard");
      } else {
        router.replace("parents/dashboard");
      }
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
            <h2 className="font-body text-2xl font-bold text-neutral-900">
              Welcome Back
            </h2>
          </header>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 font-body font-normal"
          >
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
                <Link
                  href="/forgot-password"
                  className="text-secondary-300 hover:underline"
                >
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
                <Link
                  href="/signup?step=1"
                  className="font-medium text-secondary-300 hover:underline"
                >
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
              onClick={() => loginWithGoogle()}
            >
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
