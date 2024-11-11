import * as SelectPrimitive from "@radix-ui/react-select"
import * as React from "react"

import { cn } from "@/lib/utils"
import { ChevronDown } from "@untitled-ui/icons-react"

type SelectProps = {
	children: React.ReactNode
	error?: string
	label?: string
	labelClassName?: string
}

export const Select = ({ children, error, label, labelClassName }: SelectProps) => {
	return (
		<label className="flex flex-col gap-1.5 font-body">
			<p className={cn("ext-sm text-neutral-400 dark:text-neutral-50", labelClassName)}>{label}</p>

			<SelectPrimitive.Root>
				<SelectPrimitive.Trigger
					className={cn(
						"flex w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-4 py-3 transition-all focus:border-primary-300 focus:shadow-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-neutral-300 [&>span]:line-clamp-1"
					)}>
					<SelectPrimitive.Value placeholder="Theme" className="placeholder:text-neutral-300" />
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

			{error && <p className="text-xs text-error">{error}</p>}
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
			"group relative flex w-full cursor-pointer select-none items-center border-b border-b-neutral-200 px-5 py-4 font-body text-sm text-neutral-700 outline-none transition-all last-of-type:border-b-0 data-[disabled]:pointer-events-none data-[highlighted]:border-l-2 data-[highlighted]:border-l-primary-300 data-[highlighted]:bg-primary-50 data-[disabled]:opacity-50",
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
