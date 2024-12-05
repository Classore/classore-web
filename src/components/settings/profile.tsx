import { RiDeleteBin6Line, RiImageLine } from "@remixicon/react"
import React from "react"

import { Avatar, AvatarImage } from "../ui/avatar"
import { useFileHandler } from "@/hooks"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const initialValues = {
	bio: "",
	email: "",
	firstName: "",
	image: "",
	lastName: "",
	dateOfBirth: "",
}

const Profile = () => {
	const [values, setValues] = React.useState(initialValues)

	const { handleClick, handleFileChange, inputRef } = useFileHandler({
		onFilesChange: (files) => {
			const file = files[0]
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
				setValues((prev) => ({
					...prev,
					image: reader.result as string,
				}))
			}
		},
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
	}

	return (
		<form onSubmit={handleSubmit} className="flex w-full flex-col border-t">
			<div className="flex w-full items-center justify-between border-b py-5">
				<Avatar className="size-16 border">
					<AvatarImage src={values.image} className="object-cover" />
				</Avatar>
				<div className="flex items-center gap-2">
					<label htmlFor="image">
						<input
							type="file"
							name="image"
							ref={inputRef}
							onChange={handleFileChange}
							className="hidden"
						/>
						<Button type="button" onClick={handleClick} variant="outline" className="h-9 w-fit text-sm">
							<RiImageLine size={20} />
							Change Image
						</Button>
					</label>
					<Button
						type="button"
						onClick={() => setValues((prev) => ({ ...prev, image: "" }))}
						variant="outline"
						className="size-9 text-red-600">
						<RiDeleteBin6Line size={20} />
					</Button>
				</div>
			</div>
			<div className="grid w-full grid-cols-2 gap-2 border-b py-5">
				<div className="space-y-2">
					<label htmlFor="firstName" className="text-sm text-neutral-400">
						First Name
					</label>
					<Input name="firstName" />
				</div>
				<div className="space-y-2">
					<label htmlFor="lastName" className="text-sm text-neutral-400">
						Last Name
					</label>
					<Input name="lastName" />
				</div>
			</div>
			<div className="w-full border-b py-5">
				<div className="space-y-2">
					<label htmlFor="email" className="text-sm text-neutral-400">
						Email Address
					</label>
					<Input type="email" name="email" />
				</div>
			</div>
			<div className="w-full border-b py-5">
				<div className="space-y-2">
					<label htmlFor="dateOfBirth" className="text-sm text-neutral-400">
						Date of Birth
					</label>
					<Input type="date" name="dateOfBirth" />
				</div>
			</div>
			<div className="w-full border-b py-5">
				<div className="space-y-2">
					<label htmlFor="bio" className="text-sm text-neutral-400">
						Describe Yourself
					</label>
				</div>
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

export default Profile
