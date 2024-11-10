"use client"

import { OTPInput, OTPInputContext } from "input-otp"
import * as React from "react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
	React.ElementRef<typeof OTPInput>,
	React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
	<OTPInput
		ref={ref}
		containerClassName={cn("flex gap-2 has-[:disabled]:opacity-50", containerClassName)}
		className={cn("disabled:cursor-not-allowed", className)}
		{...props}
	/>
))
InputOTP.displayName = "InputOTP"

const InputOTPSlot = React.forwardRef<
	React.ElementRef<"div">,
	React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
	const inputOTPContext = React.useContext(OTPInputContext)
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

	return (
		<div
			ref={ref}
			className={cn(
				"relative flex size-[60px] flex-1 items-center justify-center rounded-lg bg-[rgba(241,236,249,0.5)] text-base font-medium text-primary-300 transition-all",
				isActive && "ring-primary-300ß shadow-primary z-10 ring-1",
				className
			)}
			{...props}>
			{char}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
				</div>
			)}
		</div>
	)
})
InputOTPSlot.displayName = "InputOTPSlot"

export { InputOTP, InputOTPSlot }
