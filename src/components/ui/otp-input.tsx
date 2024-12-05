import { OTPInput as InputOTP } from "input-otp"
import { useController, type Control, type FieldValues, type Path } from "react-hook-form"
import { ErrorMessage } from "../shared"

interface OTPInputProps<T extends FieldValues> {
	control: Control<T>
	name: Path<T>
}

export const OTPInput = <T extends FieldValues>({ control, name, ...props }: OTPInputProps<T>) => {
	const {
		fieldState: { error },
		field,
	} = useController({
		name,
		control,
	})

	return (
		<div className="flex flex-col gap-1.5 font-body">
			<InputOTP
				maxLength={4}
				containerClassName="flex gap-2 has-[:disabled]:opacity-50"
				className="disabled:cursor-not-allowed"
				render={({ slots }) => (
					<>
						{slots.map((slot, index) => (
							<div
								key={index}
								data-active={slot.isActive ? "true" : "false"}
								data-invalid={error ? "true" : "false"}
								className="relative flex size-[60px] items-center justify-center rounded-lg bg-[rgba(241,236,249,0.5)] text-base font-medium text-primary-300 transition-all data-[active=true]:z-10 data-[invalid=true]:border-[1.3px] data-[invalid=true]:border-red-600 data-[invalid=true]:bg-[rgba(227,54,41,0.11)] data-[invalid=true]:text-[#E33629] data-[active=true]:shadow-primary data-[active=true]:ring-1 data-[active=true]:ring-primary-300">
								{slot.char ?? slot.placeholderChar}

								{/* fake caret */}
								{slot.hasFakeCaret && (
									<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
										<div className="h-4 w-px animate-caret-blink bg-primary-300 duration-1000" />
									</div>
								)}
							</div>
						))}
					</>
				)}
				{...field}
				{...props}
			/>

			{error ? <ErrorMessage message={error.message} /> : null}
		</div>
	)
}
