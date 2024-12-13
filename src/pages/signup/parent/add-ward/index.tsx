import { UserDetailsGraphic } from "@/assets/icons"
import { AuthLayout } from "@/components/layouts/auth"
import { Seo } from "@/components/shared"
import { SignupStepper } from "@/components/signup-stepper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"
import { Select, SelectItem } from "@/components/ui/select"
import { formatCurrency } from "@/lib"
import { useGetExamBundles, useGetExams, useGetSubjects } from "@/queries/school"
import { yupResolver } from "@hookform/resolvers/yup"
import { Lock02 } from "@untitled-ui/icons-react"
import { Trash } from "iconsax-react"
import { Plus } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import * as yup from "yup"

const initialValue = {
	first_name: "",
	last_name: "",
	email: "",
	exam_type: "",
	chosen_bundle: "",
	subjects: [],
}

const schema = yup.object().shape({
	wards: yup
		.array()
		.of(
			yup.object().shape({
				first_name: yup.string().required("Please enter your first name"),
				last_name: yup.string().required("Please enter your last name"),
				email: yup.string().required("Please enter your email address").email("Invalid email address"),
				exam_type: yup.string().required("Please select an exam type"),
				chosen_bundle: yup.string().required("Please select a prep bundle"),
				subjects: yup
					.array()
					.of(yup.string().required("Please select an option"))
					.min(1, "Please select at least one subject")
					.required(),
			})
		)
		.required("Please add at least one ward"),
})

type FormValues = yup.InferType<typeof schema>

const Page = () => {
	const { control, handleSubmit } = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			wards: [initialValue],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: "wards",
	})

	const { data: bundles } = useGetExamBundles()
	const { data: exams } = useGetExams()
	const { data: subjects } = useGetSubjects()

	const options =
		subjects?.map((subject) => ({
			label: subject.subject_name,
			value: subject.subject_id,
		})) ?? []

	const onSubmit = (data: FormValues) => {
		console.log("data", data)
	}

	return (
		<>
			<Seo title="Add Ward" />

			<AuthLayout screen="signup">
				<div className="flex max-w-[400px] flex-col gap-10 lg:gap-20">
					<SignupStepper />

					<div className="flex flex-col gap-6">
						<header className="flex flex-col gap-4">
							<UserDetailsGraphic />

							<div className="flex flex-col gap-1">
								<h2 className="font-body text-2xl font-bold text-neutral-900">Add Your Ward</h2>
								<p className="text-sm text-neutral-500">
									A message will be sent to their email for confirmation
								</p>
							</div>
						</header>

						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
							<ul>
								{fields.map((field, index) => (
									<li
										className="grid grid-cols-2 gap-x-3 gap-y-6 border-b border-b-neutral-200 py-8 font-body font-normal first-of-type:pt-0 lg:gap-6"
										key={field.id}>
										{index >= 1 ? (
											<div className="col-span-full flex items-center justify-between gap-1">
												<p className="font-bold">Ward {index + 1}</p>

												<button
													type="button"
													className="flex items-center gap-1 rounded-md px-2 py-1.5 text-xs text-error transition-colors hover:bg-red-100"
													onClick={() => remove(index)}>
													<Trash size={16} />
													<span>Remove Ward</span>
												</button>
											</div>
										) : null}
										<Input
											type="text"
											label="Ward’s First Name"
											placeholder="John"
											control={control}
											name={`wards.${index}.first_name`}
										/>
										<Input
											type="text"
											label="Ward’s Last Name"
											placeholder="Doe"
											control={control}
											name={`wards.${index}.last_name`}
										/>
										<Input
											type="email"
											label="Ward’s Email Address"
											placeholder="name@email.com"
											className="col-span-full"
											control={control}
											name={`wards.${index}.email`}
										/>

										<Select
											label="What is He/She studying for"
											wrapperClassName="col-span-full"
											control={control}
											name={`wards.${index}.exam_type`}>
											{exams?.map((exam) => (
												<SelectItem key={exam.examination_id} value={exam.examination_id}>
													{exam.examination_name}
												</SelectItem>
											))}
										</Select>

										<Select
											label="Select Prep Bundle"
											control={control}
											wrapperClassName="col-span-full"
											name={`wards.${index}.chosen_bundle`}>
											{bundles?.map((bundle) => (
												<SelectItem key={bundle.examinationbundle_id} value={bundle.examinationbundle_id}>
													{bundle.examinationbundle_name} Exam Prep Bundle (
													{formatCurrency(bundle.examinationbundle_amount)})
												</SelectItem>
											))}
										</Select>

										<MultiSelect
											control={control}
											name={`wards.${index}.subjects`}
											label="Select subjects"
											placeholder="Select subjects..."
											className="col-span-full"
											options={options}
										/>
									</li>
								))}
							</ul>

							<div className="flex flex-col gap-6">
								<button
									onClick={() => append(initialValue)}
									type="button"
									className="flex w-full items-center justify-center gap-2 rounded-md border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-300">
									<Plus />
									<span>Add Another Ward</span>
								</button>

								<div className="col-span-full flex flex-col gap-2">
									<Button type="submit">Pay NGN 4,999</Button>
									<div className="flex items-center gap-1.5 self-center text-neutral-500">
										<Lock02 width={18} />
										<p className="text-center text-sm">Payment secured by Paystack</p>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</AuthLayout>
		</>
	)
}

export default Page
