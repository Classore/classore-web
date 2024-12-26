import { AuthLayout } from "@/components/layouts/auth"
import { Seo, Spinner } from "@/components/shared"

import { StudyingGraphic } from "@/assets/icons"
import { SignupStepper } from "@/components/signup-stepper"
import { Button } from "@/components/ui/button"
import { MultiSelect } from "@/components/ui/multi-select"
import { Select, SelectItem } from "@/components/ui/select"
import { formatCurrency } from "@/lib"
import {
	getExamBundlesQueryOptions,
	getExamsQueryOptions,
	getSubjectsQueryOptions,
	useCreateStudyTimeline,
	useGetExamBundles,
	useGetExams,
	useGetSubjects,
} from "@/queries/school"
import { zodResolver } from "@hookform/resolvers/zod"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { Lock02 } from "@untitled-ui/icons-react"
import type { GetStaticProps } from "next"
import * as React from "react"
import { useForm, useWatch } from "react-hook-form"
import * as z from "zod"

const studyingForSchema = z.object({
	exam_type: z
		.string({
			required_error: "Please select an option",
		})
		.min(1, { message: "Please select an option" }),
	subjects: z
		.array(
			z.string({
				required_error: "Please select at least one subject",
			})
		)
		.nonempty({ message: "Please select at least one subject" }),
	chosen_bundle: z
		.string({
			required_error: "Please select an option",
		})
		.min(1, { message: "Please select an option" }),
})

type StudyingForFormValues = z.infer<typeof studyingForSchema>

export const getStaticProps = (async () => {
	const queryClient = new QueryClient()

	let dehydratedState = {}

	try {
		await Promise.allSettled([
			queryClient.ensureQueryData(getExamsQueryOptions),
			queryClient.ensureQueryData(getExamBundlesQueryOptions),
			queryClient.ensureQueryData(getSubjectsQueryOptions),
		])

		dehydratedState = dehydrate(queryClient)
		queryClient.clear()
	} catch {
		return {
			props: {},
		}
	}

	return {
		props: {
			dehydratedState,
		},
	}
}) satisfies GetStaticProps

const Page = () => {
	const [open, setOpen] = React.useState(false)
	const { control, handleSubmit } = useForm<StudyingForFormValues>({
		resolver: zodResolver(studyingForSchema),
		defaultValues: {
			exam_type: "",
			chosen_bundle: "",
			subjects: [],
		},
	})

	const form = useWatch({
		control,
	})

	const { data: bundles } = useGetExamBundles()
	const { data: exams } = useGetExams()
	const { data: subjects } = useGetSubjects()

	// filters
	const examBundles = bundles?.filter(
		(bundle) => bundle.examinationbundle_examination === form.exam_type
	)
	const bundleSubjects = subjects?.filter(
		(subject) => subject.subject_examination_bundle === form.chosen_bundle
	)

	const bundle_amount =
		bundles?.find((b) => b.examinationbundle_id === form.chosen_bundle)?.examinationbundle_amount ?? 0

	const options =
		bundleSubjects?.map((subject) => ({
			label: subject.subject_name,
			value: subject.subject_id,
		})) ?? []

	const { isPending, mutate } = useCreateStudyTimeline()
	const onSubmit = (values: StudyingForFormValues) => {
		mutate(values, {
			onSuccess: (data) => {
				setOpen(true)
				window.open(data.data.payment_link.authorization_url, "_self")
			},
		})
	}

	return (
		<>
			<Seo title="Studying For" />

			<AuthLayout screen="signup">
				<div className="flex max-w-96 flex-col gap-10 lg:gap-20">
					<SignupStepper />
					<div className="flex flex-col gap-6">
						<header className="flex flex-col gap-4">
							<StudyingGraphic />
							<h2 className="font-body text-2xl font-bold text-neutral-900">What are you studying for</h2>
						</header>

						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 font-body font-normal">
							<Select label="I am studying for" control={control} name="exam_type">
								{exams?.map((exam) => (
									<SelectItem key={exam.examination_id} value={exam.examination_id}>
										{exam.examination_name}
									</SelectItem>
								))}
							</Select>

							<Select label="Select prep bundle" control={control} name="chosen_bundle">
								{examBundles?.map((bundle) => (
									<SelectItem key={bundle.examinationbundle_id} value={bundle.examinationbundle_id}>
										{bundle.examinationbundle_name} Exam Prep Bundle (
										{formatCurrency(bundle.examinationbundle_amount)})
									</SelectItem>
								))}
							</Select>

							<MultiSelect
								control={control}
								name="subjects"
								label="Select subjects"
								placeholder="Select subjects..."
								options={options}
							/>

							<div className="col-span-full flex flex-col gap-2">
								<Button type="submit" disabled={isPending}>
									{isPending ? <Spinner /> : `Pay ${formatCurrency(Number(bundle_amount) ?? 0)}`}
								</Button>
								<div className="flex items-center gap-1.5 self-center text-neutral-500">
									<Lock02 width={18} />
									<p className="text-center text-sm">Payment secured by Paystack</p>
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
