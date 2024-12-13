import * as SelectPrimitive from "@radix-ui/react-select"
import { ChevronDown } from "@untitled-ui/icons-react"
import * as React from "react"

import { cn } from "@/lib/utils"
import { useController, type Control, type FieldValues, type Path } from "react-hook-form"
import { ErrorMessage } from "../shared"

interface SelectProps<T extends FieldValues>
	extends React.PropsWithChildren,
		React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
	name: Path<T>
	control: Control<T>
	className?: string
	label?: string
	placeholder?: string
	labelClassName?: string
	wrapperClassName?: string
}

export const Select = <T extends FieldValues>({
	children,
	label,
	labelClassName,
	name,
	control,
	placeholder,
	className,
	wrapperClassName,
	...rest
}: SelectProps<T>) => {
	const {
		field: { value, onChange, ref },
		fieldState: { error },
	} = useController({
		name,
		control,
	})

	return (
		<label className={cn("flex flex-col gap-1.5 font-body", wrapperClassName)}>
			<p className={cn("text-sm text-neutral-400", labelClassName)}>{label}</p>

			<SelectPrimitive.Root value={value} onValueChange={onChange}>
				<SelectPrimitive.Trigger
					ref={ref}
					data-invalid={error ? "true" : "false"}
					className={cn(
						"flex w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-4 py-3 capitalize transition-all focus:border-primary-300 focus:shadow-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-red-600 data-[invalid=true]:bg-[rgba(227,54,41,0.11)] data-[placeholder=true]:normal-case data-[placeholder]:text-neutral-300 [&>span]:line-clamp-1",
						className
					)}
					{...rest}>
					<SelectPrimitive.Value
						placeholder={placeholder ?? "Select a value"}
						// className="placeholder:normal-case placeholder:text-neutral-300"
					/>
					<SelectPrimitive.Icon asChild>
						<ChevronDown className="text-neutral-400" />
					</SelectPrimitive.Icon>
				</SelectPrimitive.Trigger>

				<SelectPrimitive.Portal>
					<SelectPrimitive.Content
						className="relative z-50 max-h-96 overflow-hidden rounded-lg border border-neutral-200 bg-white text-neutral-900 shadow-[0px_4px_52.4px_rgba(0,0,0,0.1)] data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
						position="popper">
						<SelectPrimitive.Viewport className="h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]">
							{children}
						</SelectPrimitive.Viewport>
					</SelectPrimitive.Content>
				</SelectPrimitive.Portal>
			</SelectPrimitive.Root>

			{error ? <ErrorMessage message={error.message} /> : null}
		</label>
	)
}

export const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			"group relative flex w-full cursor-pointer select-none items-center border-b border-b-neutral-200 px-5 py-4 font-body text-sm capitalize text-neutral-700 outline-none transition-all last-of-type:border-b-0 data-[disabled]:pointer-events-none data-[highlighted]:border-l-2 data-[highlighted]:border-l-primary-300 data-[highlighted]:bg-primary-50 data-[disabled]:opacity-50",
			className
		)}
		{...props}>
		<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

		<span className="absolute right-4 ml-auto flex size-5 items-center justify-center rounded-full border-2 transition-all group-hover:border-primary-300 group-focus-visible:border-primary-300 group-data-[highlighted]:border-primary-300 group-data-[state=checked]:border-primary-300">
			<SelectPrimitive.ItemIndicator className="size-2.5 rounded-full bg-primary-300" />
		</span>
	</SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName
