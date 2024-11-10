import { CloseCircle, TickCircle } from "iconsax-react"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import { TickCircle } from "iconsax-react"
import { toast } from "sonner"

import type { WaitlistDto } from "@/queries"
import { WaitlistMutation } from "@/queries"
import type { HttpError } from "@/types"
import { Spinner } from "../shared"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const roles = ["student", "parent"] as const

interface Props {
	onClose: () => void
}

const initialValues: WaitlistDto = {
	email: "",
	first_name: "",
	last_name: "",
	phone_number: "+23490239693",
	waitlist_type: "",
}

export const Modal = ({ onClose }: Props) => {
	const { isPending, mutateAsync } = useMutation({
		mutationFn: (payload: WaitlistDto) => WaitlistMutation(payload),
		mutationKey: ["waitlist"],
		onSuccess: (data) => {
			toast.success(data.message)
			onClose()
		},
		onError: (error: HttpError) => {
			const { message } = error.response.data
			toast.error(message)
		},
	})

	const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
		initialValues,
		onSubmit: (values) => {
			if (!values.email) {
				toast.error("Please enter your email")
				return
			}
			if (!values.waitlist_type) {
				toast.error("Please select your role")
				return
			}
			const payload = {
				...values,
				waitlist_type: values.waitlist_type.toUpperCase(),
			}
			mutateAsync(payload)
		},
	})

	return (
		<div className="flex w-full flex-col gap-8 rounded-3xl border bg-gradient-to-b from-[#fef0e8] to-transparent p-3">
			<div className="flex w-full items-center justify-end">
				<button onClick={onClose}>
					<CloseCircle />
				</button>
			</div>
			<div className="flex w-full flex-col gap-2">
				<h3 className="text-2xl font-semibold">Join Waitlist</h3>
				<p className="text-neutral-500">
					Learning made easy and fun - don&apos;t miss early access to a new way of learning
				</p>
			</div>
			<form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
				<div className="flex w-full flex-col gap-3">
					<p className="text-neutral-500">I am joing as</p>
					<div className="grid w-full grid-cols-2 gap-2">
						{roles.map((role) => (
							<button
								key={role}
								type="button"
								onClick={() => setFieldValue("waitlist_type", role)}
								className={`flex w-full items-center justify-between rounded-full border px-4 py-5 capitalize transition-colors ${role === values.waitlist_type.toLowerCase() ? "border-primary" : "border-neutral-300"}`}>
								{role}
								<TickCircle
									size={20}
									variant="Linear"
									className={`transition-colors ${role === values.waitlist_type.toLowerCase() ? "fill-primary text-white" : "text-neutral-500 opacity-50"}`}
								/>
							</button>
						))}
					</div>
				</div>
				<div className="grid w-full grid-cols-2 gap-2">
					<div className="flex w-full flex-col gap-3">
						<label htmlFor="first_name" className="text-neutral-500">
							First Name
						</label>
						<Input type="text" name="first_name" onChange={handleChange} />
					</div>
					<div className="flex w-full flex-col gap-3">
						<label htmlFor="last_name" className="text-neutral-500">
							Last Name
						</label>
						<Input type="text" name="last_name" onChange={handleChange} />
					</div>
				</div>
				<div className="flex w-full flex-col gap-3">
					<label htmlFor="email" className="text-neutral-500">
						Email Address
					</label>
					<Input type="email" name="email" onChange={handleChange} />
				</div>
				<Button type="submit" size="lg" disabled={isPending}>
					{isPending ? <Spinner /> : "Join waitlist"}
				</Button>
			</form>
		</div>
	)
}
