import { formatCurrency } from "@/lib"
import {
	useCreateStudyTimeline,
	useGetExamBundles,
	useGetExams,
	useGetSingleExamBundleQuery,
	useGetSubjects,
} from "@/queries/school"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock02 } from "@untitled-ui/icons-react"
import { useRouter } from "next/router"
import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Spinner } from "../shared"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import { MultiSelect } from "../ui/multi-select"
import { Select, SelectItem } from "../ui/select"

const schema = z.object({
	exam_type: z
		.string({
			required_error: "Please select an option",
		})
		.min(1, { message: "Please select an option" }),
	chosen_bundle: z
		.string({
			required_error: "Please select an option",
		})
		.min(1, { message: "Please select an option" }),
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

type FormData = z.infer<typeof schema>

export const EnrollModal = () => {
	const router = useRouter()
	const [open, setOpen] = React.useState(false)

	const { data: bundle } = useGetSingleExamBundleQuery({
		bundle_id: router.query.id as string,
	})

	const { data: exams } = useGetExams()
	const { data: bundles } = useGetExamBundles()
	const { data: subjects } = useGetSubjects()

	const { control, handleSubmit } = useForm<FormData>({
		resolver: zodResolver(schema),
		shouldUnregister: true,
		defaultValues: {
			exam_type: bundle?.examination.id ?? "",
			chosen_bundle: (router.query.id as string) ?? "",
			subjects: [],
		},
	})

	const bundleSubjects = subjects
		?.filter((subject) => subject.subject_examination_bundle === router.query.id)
		?.map((subject) => ({
			label: subject.subject_name,
			value: subject.subject_id,
		}))

	const { isPending, mutate } = useCreateStudyTimeline()
	const onSubmit = (data: FormData) => {
		mutate(data, {
			onSuccess: (data) => {
				setOpen(true)
				window.open(data.data.payment_link.authorization_url, "_self")
			},
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Enroll now</Button>
			</DialogTrigger>

			<DialogContent className="flex w-96 flex-col gap-6">
				<header>
					<h3 className="text-2xl font-bold">Enroll Now</h3>
					<p className="text-pretty text-sm text-neutral-500">
						Select the prep bundle subjects you want to study for
					</p>
				</header>

				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 font-body font-normal">
					<Select disabled label="I am studying for" control={control} name="exam_type">
						{exams?.map((exam) => (
							<SelectItem key={exam.examination_id} value={exam.examination_id}>
								{exam.examination_name}
							</SelectItem>
						))}
					</Select>

					<Select disabled label="Select prep bundle" control={control} name="chosen_bundle">
						{bundles?.data.map((bundle) => (
							<SelectItem key={bundle.examinationbundle_id} value={bundle.examinationbundle_id}>
								{bundle.examinationbundle_name} Exam Prep Bundle
							</SelectItem>
						))}
					</Select>

					<MultiSelect
						control={control}
						name="subjects"
						label="Select subjects"
						placeholder="Select subjects..."
						options={bundleSubjects ?? []}
						maxSelectable={bundle?.max_subjects ?? 0}
					/>

					<div className="flex flex-col gap-1">
						<Button type="submit" disabled={isPending}>
							{isPending ? <Spinner /> : `Pay ${formatCurrency(Number(bundle?.amount ?? 0))}`}
						</Button>
						<div className="flex items-center gap-1.5 self-center text-neutral-500">
							<Lock02 width={18} />
							<p className="text-center text-sm">Payment secured by Paystack</p>
						</div>
					</div>
				</form>

				{open ? (
					<div className="absolute inset-0 z-50 mx-auto grid place-items-center gap-4 rounded-md bg-white/50 p-10 text-center text-sm text-neutral-600 backdrop-blur-sm backdrop-filter">
						<div className="grid place-items-center gap-4 rounded-lg p-10">
							<Spinner variant="primary" size="md" />
							<p className="leading-tight">Please wait while we redirect you to the payment page...</p>
							<p className="text-xs font-bold">
								NB: <br />
								DO NOT CLOSE THIS WINDOW OR REFRESH THE PAGE
							</p>
						</div>
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	)
}
