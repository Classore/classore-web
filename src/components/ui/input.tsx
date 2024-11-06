import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
	label?: string
	labelClassName?: string
	wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, error, label, labelClassName, type, wrapperClassName, ...props }, ref) => {
		return (
			<div className={cn("")}>
				{label && (
					<label
						className={cn(
							"mb-1 block text-sm font-medium text-neutral-950 dark:text-neutral-50",
							labelClassName
						)}
						htmlFor={props.id}>
						{label}
					</label>
				)}
				<div
					className={cn(
						"flex h-14 w-full flex-col gap-1 rounded-full border px-3 py-2 focus-within:border-primary",
						wrapperClassName
					)}>
					<input
						type={type}
						className={cn(
							"flex h-full w-full bg-transparent text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
							className
						)}
						ref={ref}
						{...props}
					/>
				</div>
				{error && <p className="text-xs text-red-500">{error}</p>}
			</div>
		)
	}
)
Input.displayName = "Input"

export { Input }
