import { useMutation } from "@tanstack/react-query"
import { TickCircle } from "iconsax-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import React from "react"

import { type WaitlistDto, WaitlistMutation } from "@/queries"
import type { HttpError } from "@/types"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Spinner } from "../shared"

const roles = ["student", "parent"] as const
interface Props {
	onClose: () => void
}
const defaultValues: WaitlistDto = {
	email: "",
	first_name: "",
	last_name: "",
	phone_number: "+2349023969367",
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

	const { control, getValues, handleSubmit } = useForm<WaitlistDto>({
		defaultValues,
	})

	const onSubmit = (values: WaitlistDto) => {
		mutateAsync(values)
	}

	return (
		<div className="flex w-full flex-col gap-8 rounded-3xl border bg-gradient-to-b from-[#fef0e8] to-transparent p-3">
			<div className="flex w-full items-center justify-end"></div>
			<div className="flex w-full flex-col gap-2">
				<h3 className="text-2xl font-semibold">Join Waitlist</h3>
				<p className="text-neutral-500">
					Learning made easy and fun - don&apos;t miss early access to a new way of learning
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
				<div className="flex w-full flex-col gap-3">
					<p className="text-neutral-500">I am joing as</p>
					<div className="grid w-full grid-cols-2 gap-2">
						{roles.map((role) => (
							<button
								key={role}
								type="button"
								onClick={() => {}}
								className={`flex w-full items-center justify-between rounded-full border px-4 py-5 capitalize transition-colors ${role === getValues("waitlist_type").toLowerCase() ? "border-primary" : "border-neutral-300"}`}>
								{role}
								<TickCircle
									size={20}
									variant="Linear"
									className={`transition-colors ${role === getValues("waitlist_type").toLowerCase() ? "fill-primary text-white" : "text-neutral-500 opacity-50"}`}
								/>
							</button>
						))}
					</div>
				</div>
				<div className="grid w-full grid-cols-2 gap-2">
					<div className="flex w-full flex-col gap-3">
						<Input label="First Name" type="text" name="first_name" control={control} />
					</div>
					<div className="flex w-full flex-col gap-3">
						<Input label="Last Name" type="text" name="last_name" control={control} />
					</div>
				</div>
				<div className="flex w-full flex-col gap-3">
					<Input label="Email Address" type="email" name="email" control={control} />
				</div>
				<Button type="submit" size="lg" disabled={isPending}>
					{isPending ? <Spinner /> : "Join waitlist"}
				</Button>
			</form>
		</div>
	)
}
