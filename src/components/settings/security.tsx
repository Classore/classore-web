import React from "react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Security = () => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex h-full w-full flex-col justify-between gap-5 border-b border-t py-5">
			<div className="space-y-1">
				<label htmlFor="currentPassword" className="text-sm text-neutral-400">
					Current Password
				</label>
				<Input type="password" name="currentPassword" />
			</div>
			<div className="space-y-1">
				<label htmlFor="newPassword" className="text-sm text-neutral-400">
					New Password
				</label>
				<Input type="password" name="newPassword" />
			</div>
			<div className="space-y-1">
				<label htmlFor="confirmPassword" className="text-sm text-neutral-400">
					Re-enter New Password
				</label>
				<Input type="password" name="confirmPassword" />
			</div>
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
