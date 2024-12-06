import React from "react"

import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Security = () => {
	const { control } = useForm({})
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex h-full w-full flex-col justify-between gap-5 border-b border-t py-5">
			<Input type="password" name="current_password" label="Current Password" control={control} />
			<Input type="password" name="new_password" label="New Password" control={control} />
			<Input
				type="password"
				name="confirm_new_password"
				label="Confirm New Password"
				control={control}
			/>

			<div className="flex w-full items-center justify-between pt-10">
				<Button
					type="button"
					variant="text"
					className="h-9 w-fit text-sm text-red-500 hover:text-red-700">
					Delete Account
				</Button>
				<div className="flex items-center gap-2">
					<Button type="button" variant="outline" className="h-9 w-fit text-sm">
						Reset Changes
					</Button>
					<Button type="submit" className="h-9 w-fit text-sm">
						Save Changes
					</Button>
				</div>
			</div>
		</form>
	)
}

export default Security
