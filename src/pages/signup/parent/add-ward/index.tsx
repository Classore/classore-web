import { UserDetailsGraphic } from "@/assets/icons"
import { AuthLayout } from "@/components/layouts/auth"
import { Seo, Spinner } from "@/components/shared"
import { SignupStepper } from "@/components/signup-stepper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"
import { Select, SelectItem } from "@/components/ui/select"
import { formatCurrency } from "@/lib"
import { AddWardsMutation } from "@/queries"
import { useGetExamBundles, useGetExams, useGetSubjects } from "@/queries/school"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { Lock02 } from "@untitled-ui/icons-react"
import { Trash } from "iconsax-react"
import { Plus } from "lucide-react"
import * as React from "react"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import * as yup from "yup"

const initialValue = {
	first_name: "",
	last_name: "",
	email: "",
	examination: "",
	examination_bundle: "",
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
				examination: yup.string().required("Please select an exam type"),
				examination_bundle: yup.string().required("Please select a prep bundle"),
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
	const [open, setOpen] = React.useState(false)
	const { control, handleSubmit } = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			wards: [initialValue],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: "wards",
		shouldUnregister: true,
	})

	const form = useWatch({
		control,
	})

	const { data: bundles } = useGetExamBundles()
	const { data: exams } = useGetExams()
	const { data: subjects } = useGetSubjects()

	// filters
	const examBundles = (index: number) => {
		return bundles?.filter(
			(bundle) => bundle.examinationbundle_examination === form.wards?.at(index)?.examination
		)
	}
	const bundleSubjects = (index: number) => {
		return (
			subjects
				?.filter(
					(subject) => subject.subject_examination_bundle === form.wards?.at(index)?.examination_bundle
				)
				.map((subject) => ({
					label: subject.subject_name,
					value: subject.subject_id,
				})) ?? []
		)
	}

	/*
		- get all selected bundles ids from form.ward and their amount. add everything together
	*/
	const bundleAmount = React.useCallback(() => {
		let amount = 0
		form.wards?.forEach((ward) => {
			const exam_bundle = bundles?.find(
				(bundle) => bundle.examinationbundle_id === ward.examination_bundle
			)
			amount += exam_bundle?.examinationbundle_amount ?? 0
		})
		return amount
	}, [bundles, form.wards])

	const { isPending, mutate } = useMutation({
		mutationKey: ["add-ward"],
		mutationFn: (values: FormValues) => AddWardsMutation(values.wards),
		onSuccess: (data) => {
			setOpen(true)
			window.open(data.data.payment_link_data.authorization_url, "_self")
		},
	})
	const onSubmit = (data: FormValues) => {
		mutate(data)
	}

	return (
		<>
			<Seo title="Add Ward" noIndex />

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
											name={`wards.${index}.examination`}>
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
											name={`wards.${index}.examination_bundle`}>
											{examBundles(index)?.map((bundle) => (
												<SelectItem key={bundle.examinationbundle_id} value={bundle.examinationbundle_id}>
													{bundle.examinationbundle_name} Exam Prep Bundle (
													{formatCurrency(bundle.examinationbundle_amount)})
												</SelectItem>
											))}
										</Select>

										<MultiSelect
											control={control}
											name={`wards.${index}.subjects`}
											label="Select Subjects"
											placeholder="Select subjects..."
											className="col-span-full"
											options={bundleSubjects(index) ?? []}
											info="0/5 subjects selected"
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
									<Button type="submit" disabled={isPending}>
										{isPending ? <Spinner /> : `Pay ${formatCurrency(Number(bundleAmount()) ?? 0)}`}
									</Button>
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

			{open ? (
				<div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center gap-2 bg-black/50">
					<div className="grid max-w-xs place-items-center gap-4 rounded-md bg-white p-10 text-center text-sm text-neutral-600">
						<Spinner variant="primary" size="md" />
						<p className="leading-tight">Please wait while we redirect you to the payment page...</p>
					</div>
				</div>
			) : null}
		</>
	)
}

export default Page
