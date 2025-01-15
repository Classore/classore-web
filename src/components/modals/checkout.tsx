import { formatCurrency } from "@/lib"
import {
	useCreateStudyTimeline,
	useGetExamBundles,
	useGetExams,
	useGetSubjects,
} from "@/queries/school"
import { useMiscStore } from "@/store/z-store/misc"
import { Lock02 } from "@untitled-ui/icons-react"
import * as React from "react"
import { toast } from "sonner"
import { Spinner } from "../shared"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"

type CheckoutModalProps = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CheckoutModal = ({ open, setOpen }: CheckoutModalProps) => {
	const [visible, setVisible] = React.useState(false)
	const values = useMiscStore((state) => state.payload)

	const { data: bundles } = useGetExamBundles()
	const { data: exams } = useGetExams()
	const { data: subjects } = useGetSubjects()

	const exam_type = exams?.find((exam) => exam.examination_id === values.exam_type)?.examination_name
	const prep_bundle = bundles?.data.find(
		(bundle) => bundle.examinationbundle_id === values.chosen_bundle
	)
	const chosen_subjects =
		subjects
			?.filter((subject) => values.subjects.includes(subject.subject_id))
			?.map((subject) => subject.subject_name)
			.join(", ") ?? ""

	const chosen_bundle = prep_bundle?.examinationbundle_name ?? ""
	const bundle_amount = prep_bundle?.examinationbundle_amount ?? 0

	const { isPending, mutate } = useCreateStudyTimeline()
	const continueToPayment = () => {
		if (!values) {
			toast.error("Something went wrong, please try again")
			return
		}

		mutate(values, {
			onSuccess: (data) => {
				setVisible(true)
				window.open(data.data.payment_link.authorization_url, "_self")
			},
		})
	}

	if (typeof window === "undefined") return null

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			{/* <DialogTrigger asChild>
				<button
					type="button"
					className="flex w-full items-center gap-2 px-2 py-3 text-sm font-medium text-red-600">
					<span>Log out</span>
				</button>
			</DialogTrigger> */}

			<DialogContent className="flex w-96 flex-col gap-6">
				<h3 className="text-2xl font-bold">Checkout</h3>

				<ul className="flex flex-col gap-4">
					<li>
						<p className="text-sm text-neutral-400">Exam type:</p>
						<p className="font-medium capitalize">{exam_type}</p>
					</li>
					<li>
						<p className="text-sm text-neutral-400">Prep bundle (allowed subjects):</p>
						<p className="font-medium capitalize">
							{chosen_bundle} Prep Bundle ({values.allowed_subjects} subjects)
						</p>
					</li>
					<li>
						<p className="text-sm text-neutral-400">Chosen Subjects:</p>
						<p className="font-medium capitalize">{chosen_subjects}</p>
					</li>

					<li>
						<p className="text-sm text-neutral-400">Subtotal:</p>
						<p className="font-medium">{formatCurrency(Number(values.base_amount ?? 0))}</p>
					</li>

					<li>
						<p className="text-sm text-neutral-400">No of extra subjects added:</p>
						<p className="font-medium">{values.number_of_extra_subjects_added}</p>
					</li>

					<li>
						<p className="text-sm text-neutral-400">Grand total:</p>
						<p className="font-medium">{formatCurrency(Number(values.grand_total ?? 0))}</p>
					</li>
				</ul>

				<div className="flex flex-col gap-1">
					<Button onClick={continueToPayment} type="submit" disabled={isPending}>
						{isPending ? <Spinner /> : `Pay ${formatCurrency(Number(bundle_amount ?? 0))}`}
					</Button>
					<div className="flex items-center gap-1.5 self-center text-neutral-500">
						<Lock02 width={18} />
						<p className="text-center text-sm">Payment secured by Paystack</p>
					</div>
				</div>

				{visible ? (
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
