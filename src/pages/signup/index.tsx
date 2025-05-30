import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { User01 } from "@untitled-ui/icons-react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as z from "zod";

import { AuthGraphic } from "@/assets/icons";
import { AuthLayout } from "@/components/layouts/auth";
import { ErrorMessage, Seo } from "@/components/shared";
import { SignupStepper } from "@/components/signup-stepper";
import { Button } from "@/components/ui/button";

const options = [
	{
		id: 1,
		label: "A Student",
		slug: "student",
		description: "Preparing for my exams",
	},
	{
		id: 2,
		label: "A Parent / Guardian",
		slug: "parent",
		description: "I want to monitor my child's growth",
	},
];

const signupSchema = z.object({
	register_as: z.string().min(1, "Please select an option to register as"),
});

type FormValues = z.infer<typeof signupSchema>;

const Page = () => {
	const router = useRouter();
	const referral_code = router.query.referral_code as string;
	console.log("referral_code", referral_code);

	const { control, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			register_as: "",
		},
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = (value: FormValues) => {
		router.push({
			pathname: `/signup/${value.register_as}`,
			query: {
				step: "2",
				referral_code,
			},
		});
	};

	return (
		<>
			<Seo title="Sign up" />
			<AuthLayout screen="signup">
				<div className="flex max-w-96 flex-col gap-10 font-body lg:gap-20">
					<SignupStepper />
					<div className="flex flex-col gap-6">
						<header className="flex flex-col gap-4">
							<AuthGraphic />
							<h2 className="text-2xl font-bold text-neutral-900">I am here to register as</h2>
						</header>

						<form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
							<Controller
								name="register_as"
								control={control}
								render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
									<>
										<div
											className="flex flex-col gap-4"
											role="radiogroup"
											aria-labelledby="registration-radio-group">
											{options.map((option) => {
												const state = option.slug === value ? "checked" : "unchecked";

												return (
													<label
														key={option.id}
														data-state={state}
														data-error={error ? "true" : "false"}
														className="group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-neutral-200 bg-transparent p-4 transition-all focus:border-primary-300 data-[error=true]:border-red-600 data-[state=checked]:border-primary-300 data-[state=checked]:bg-primary-50 data-[state=checked]:shadow-primary data-[state=unchecked]:hover:bg-neutral-50">
														<div className="grid size-8 place-content-center rounded bg-neutral-100 group-data-[state=checked]:bg-primary-50 group-data-[state=checked]:text-primary-300">
															<User01 />
														</div>
														<div>
															<h3 className="font-bold">{option.label}</h3>
															<p className="font-heading text-sm text-neutral-500">{option.description}</p>
														</div>

														<input
															type="radio"
															name="register_as"
															aria-checked={state === "checked"}
															value={value}
															onChange={() => onChange(option.slug)}
															ref={ref}
															className="absolute opacity-0"
														/>
														<div className="relative ml-auto size-6 rounded-full border-[2.5px] border-neutral-300 group-data-[error=true]:border-red-600 group-data-[state=checked]:border-primary-300 group-data-[state=checked]:after:absolute group-data-[state=checked]:after:left-1/2 group-data-[state=checked]:after:top-1/2 group-data-[state=checked]:after:size-3 group-data-[state=checked]:after:-translate-x-1/2 group-data-[state=checked]:after:-translate-y-1/2 group-data-[state=checked]:after:rounded-full group-data-[state=checked]:after:bg-primary-300 group-data-[state=checked]:after:transition-transform" />
													</label>
												);
											})}
										</div>

										{error ? <ErrorMessage message={error.message} /> : null}
									</>
								)}
							/>

							<Button type="submit" className="rounded-md">
								Next
							</Button>
						</form>
						<div className="flex items-center justify-center gap-x-2 text-sm">
							<p className="text-neutral-500">Already have an account?</p>
							<Link href="/signin" className="font-medium text-secondary-300 hover:underline">
								Sign in
							</Link>
						</div>
					</div>
				</div>
			</AuthLayout>
		</>
	);
};

export default Page;
