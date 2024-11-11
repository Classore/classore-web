import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"

import { AuthGraphic } from "@/assets/icons"
import { FieldError } from "@/components/shared/field-error"
import { SignupStepper } from "@/components/signup-stepper"
import { Button } from "@/components/ui/button"
import { User01 } from "@untitled-ui/icons-react"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import * as yup from "yup"

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
		description: "I want to monitor my child’s growth",
	},
]

const signupSchema = yup.object().shape({
	registered_as: yup.string().required("Please select an option to register as"),
})

// const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const Page = () => {
	const router = useRouter()

	return (
		<>
			<Seo title="Sign up" />
			<AuthLayout screen="signup">
				<div className="flex max-w-96 flex-col gap-20 font-body">
					<SignupStepper />
					<div className="flex flex-col gap-6">
						<header className="flex flex-col gap-4">
							{/* should convert this to html, but i'm just lazy */}
							<AuthGraphic />
							<h2 className="text-2xl font-bold text-neutral-900">I am here to register as</h2>
						</header>
						<Formik
							initialValues={{
								registered_as: "",
							}}
							validationSchema={signupSchema}
							onSubmit={async (values) => {
								console.log(values)
								router.push(`/signup/onboard?registered_as=${values.registered_as}`)
							}}>
							{({ values, errors, touched }) => (
								<Form className="flex flex-col gap-7">
									<div
										className="flex flex-col gap-4"
										role="group"
										aria-labelledby="registration-radio-group">
										{options.map((option) => {
											const state = option.slug === values.registered_as ? "checked" : "unchecked"
											return (
												<label
													key={option.id}
													data-state={state}
													className="group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-neutral-200 bg-transparent p-4 transition-all data-[state=checked]:border-primary-300 data-[state=checked]:bg-primary-50 data-[state=checked]:shadow-primary data-[state=unchecked]:hover:bg-neutral-50">
													<div className="grid size-8 place-content-center rounded bg-neutral-100 group-data-[state=checked]:bg-primary-50 group-data-[state=checked]:text-primary-300">
														<User01 />
													</div>
													<div>
														<h3 className="font-bold">{option.label}</h3>
														<p className="font-heading text-sm text-neutral-500">{option.description}</p>
													</div>
													<Field
														type="radio"
														name="registered_as"
														id="registered_as"
														value={option.slug}
														// This hides this radio button without losing accessibility. Better still we could have used radix radio group
														className="absolute opacity-0"
													/>
													<div className="relative ml-auto size-6 rounded-full border-[2.5px] border-neutral-300 group-data-[state=checked]:border-primary-300 group-data-[state=checked]:after:absolute group-data-[state=checked]:after:left-1/2 group-data-[state=checked]:after:top-1/2 group-data-[state=checked]:after:size-3 group-data-[state=checked]:after:-translate-x-1/2 group-data-[state=checked]:after:-translate-y-1/2 group-data-[state=checked]:after:rounded-full group-data-[state=checked]:after:bg-primary-300 group-data-[state=checked]:after:transition-transform" />
												</label>
											)
										})}
									</div>
									{errors.registered_as && touched.registered_as ? (
										<FieldError message={errors.registered_as} />
									) : null}
									<Button type="submit" className="rounded-md">
										Next
									</Button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
