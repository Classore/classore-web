import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeSlash } from "iconsax-react"
import { useController, type Control, type FieldValues, type Path } from "react-hook-form"
import { ErrorMessage } from "../shared"

interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	labelClassName?: string
	control: Control<T>
	name: Path<T>
	type: React.HTMLInputTypeAttribute
}

const Input = <T extends FieldValues>({
	className,
	label,
	labelClassName,
	control,
	name,
	type,
	...props
}: InputProps<T>) => {
	const [togglePassword, setTogglePassword] = React.useState(false)
	const {
		fieldState: { error },
		field,
	} = useController({
		name,
		control,
	})

	return (
		<div className={cn("flex flex-col gap-1.5 font-body", className)}>
			<label id={name} className={cn("text-sm text-neutral-400", labelClassName)}>
				{label}
			</label>
			<div className="relative">
				<input
					type={togglePassword ? "text" : type}
					aria-invalid={error ? "true" : "false"}
					data-invalid={error ? "true" : "false"}
					className={cn(
						"text flex w-full rounded-md border border-neutral-200 bg-transparent px-4 py-3 transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-300 focus:border-primary-300 focus:shadow-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-red-600 data-[invalid=true]:bg-[rgba(227,54,41,0.11)]",
						className
					)}
					{...field}
					{...props}
				/>

				{type === "password" ? (
					<button
						type="button"
						className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-300"
						onClick={() => setTogglePassword(!togglePassword)}>
						{!togglePassword ? <Eye /> : <EyeSlash />}

						<span className="sr-only">{togglePassword ? "show password" : "hide password"}</span>
					</button>
				) : null}
			</div>

			{error ? <ErrorMessage message={error.message} /> : null}
		</div>
	)
}
Input.displayName = "Input"

export { Input }
