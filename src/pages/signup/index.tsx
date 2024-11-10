import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"

import { AuthGraphic } from "@/assets/icons"
import { Button } from "@/components/ui/button"
import { User01 } from "@untitled-ui/icons-react"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"

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

// const appId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID

const Page = () => {
	const router = useRouter()

	return (
		<>
			<Seo title="Sign up" />

			<AuthLayout screen="signup">
				<div className="flex max-w-96 flex-col gap-6">
					{/* should convert this to html, but i'm just lazy */}
					<AuthGraphic />

					<h2 className="font-body text-2xl font-bold text-neutral-900">I am here to register as</h2>

					<Formik
						initialValues={{
							picked: "",
						}}
						onSubmit={async (values) => {
							console.log(values)
							router.push(`/signup/onboard?picked=${values.picked}`)
						}}>
						{({ values }) => (
							<Form className="flex flex-col gap-7">
								<div
									className="flex flex-col gap-4"
									role="group"
									aria-labelledby="registration-radio-group">
									{options.map((option) => {
										const state = option.slug === values.picked ? "checked" : "unchecked"

										return (
											<label
												key={option.id}
												data-state={state}
												className="data-[state=checked]:shadow-primary group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-neutral-200 bg-transparent p-4 transition-all data-[state=checked]:border-primary-300 data-[state=checked]:bg-primary-50 data-[state=unchecked]:hover:bg-neutral-50">
												<div className="grid size-8 place-content-center rounded bg-neutral-100 group-data-[state=checked]:bg-primary-50 group-data-[state=checked]:text-primary-300">
													<User01 />
												</div>

												<div>
													<h3 className="font-bold">{option.label}</h3>
													<p className="font-heading text-sm text-neutral-500">{option.description}</p>
												</div>

												<Field
													type="radio"
													name="picked"
													id="picked"
													value={option.slug}
													// This hides this radio button without losing accessibility. Better still we could have used radix radio group
													className="absolute opacity-0"
												/>

												<div className="relative ml-auto size-6 rounded-full border-[2.5px] border-neutral-300 group-data-[state=checked]:border-primary-300 group-data-[state=checked]:after:absolute group-data-[state=checked]:after:left-1/2 group-data-[state=checked]:after:top-1/2 group-data-[state=checked]:after:size-3 group-data-[state=checked]:after:-translate-x-1/2 group-data-[state=checked]:after:-translate-y-1/2 group-data-[state=checked]:after:rounded-full group-data-[state=checked]:after:bg-primary-300 group-data-[state=checked]:after:transition-transform" />
											</label>
										)
									})}
								</div>

								<Button type="submit" className="rounded-md">
									Next
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
