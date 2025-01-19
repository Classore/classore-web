import { UserDetailsGraphic } from "@/assets/icons"
import { AuthLayout } from "@/components/layouts/auth"
import { CheckoutAddWardsModal } from "@/components/modals"
import { Seo, Spinner } from "@/components/shared"
import { SignupStepper } from "@/components/signup-stepper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select"
import { Select, SelectItem } from "@/components/ui/select"
import { formatCurrency } from "@/lib"
import { useGetExamBundles, useGetExams, useGetSubjects, useVetStudyPack } from "@/queries/school"
import { useMiscStore } from "@/store/z-store/misc"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock02 } from "@untitled-ui/icons-react"
import { Trash } from "iconsax-react"
import { Plus } from "lucide-react"
import * as React from "react"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import * as z from "zod"

const initialValue = {
	first_name: "",
	last_name: "",
	email: "",
	examination: "",
	examination_bundle: "",
	subjects: [],
}

const schema = z.object({
	wards: z.array(
		z.object({
			first_name: z.string().min(1, "Please enter your first name"),
			last_name: z.string().min(1, "Please enter your last name"),
			email: z.string().min(1, "Please enter your email address").email("Invalid email address"),
			examination: z.string().min(1, "Please select an exam type"),
			examination_bundle: z.string().min(1, "Please select a prep bundle"),
			subjects: z
				.string({
					required_error: "Please select at least one subject",
					invalid_type_error: "Please select at least one subject",
				})
				.min(1, { message: "Please select at least one subject" })
				.transform((value) => {
					return value.split(", ")
				}),
		})
	),
})

type FormValues = z.infer<typeof schema>

const Page = () => {
	const setMiscStore = useMiscStore((state) => state.setMisc)

	const [open, setOpen] = React.useState(false)
	const { control, handleSubmit } = useForm<FormValues>({
		resolver: zodResolver(schema),
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
		return bundles?.data.filter(
			(bundle) => bundle.examinationbundle_examination === form.wards?.at(index)?.examination
		)
	}
	const bundleSubjects = React.useCallback(
		(index: number) => {
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
		},
		[form.wards, subjects]
	)

	const maxBundleSubject = React.useCallback(
		(index: number) => {
			return (
				bundles?.data.find((b) => b.examinationbundle_id === form.wards?.at(index)?.examination_bundle)
					?.examinationbundle_max_subjects ?? 0
			)
		},
		[bundles, form.wards]
	)

	const { isPending, mutate } = useVetStudyPack()
	const onSubmit = (values: FormValues) => {
		const payload = values.wards.map((item) => ({
			chosen_bundle: item.examination_bundle,
			subject_length: item.subjects.length,
		}))

		mutate(
			{ vettings: payload },
			{
				onSuccess: (data) => {
					const payload = {
						...values,
						...data.data,
						total_wards: values.wards.length,
					}
					// @ts-expect-error err
					setMiscStore(payload)
					setOpen(true)
				},
			}
		)
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
											maxSelectable={maxBundleSubject(index)}
										/>
									</li>
								))}
							</ul>

							<div className="flex flex-col gap-6">
								<button
									onClick={() => append(initialValue)}
									type="button"
									className="flex w-full items-center justify-center gap-2 rounded-md border border-neutral-200 bg-neutral-100 px-4 py-2.5 text-sm text-neutral-500 transition-colors hover:bg-neutral-200">
									<Plus />
									<span>Add Another Ward</span>
								</button>

								<div className="col-span-full flex flex-col gap-2">
									<Button type="submit" disabled={isPending}>
										{isPending ? <Spinner /> : `Continue`}
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

			<CheckoutAddWardsModal open={open} setOpen={setOpen} />
		</>
	)
}

export default Page
