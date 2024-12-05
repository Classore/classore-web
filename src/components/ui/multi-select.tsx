import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover"
import { Check, ChevronDown } from "@untitled-ui/icons-react"
import * as React from "react"
import { useController, type Control, type FieldValues, type Path } from "react-hook-form"
import { ErrorMessage } from "../shared"
import { Button } from "./button"

type Option = {
	label: string
	value: string
}

type Options = Option[]

type MultiSelectProps<T extends FieldValues> = {
	label: string
	options: Options
	name: Path<T>
	control: Control<T>
	placeholder?: string
}

export const MultiSelect = <T extends FieldValues>({
	label,
	placeholder,
	options,
	name,
	control,
}: MultiSelectProps<T>) => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [openCombobox, setOpenCombobox] = React.useState(false)
	const [selectedValues, setSelectedValues] = React.useState<Options>([])

	const {
		field: { onChange, ref },
		fieldState: { error },
	} = useController({
		name,
		control,
		rules: {
			required: true,
		},
	})

	const toggleOption = (option: Option) => {
		setSelectedValues((currentOptions) =>
			!currentOptions.includes(option)
				? [...currentOptions, option]
				: currentOptions.filter((l) => l.value !== option.value)
		)

		inputRef?.current?.focus()
	}

	const onComboboxOpenChange = (value: boolean) => {
		inputRef.current?.blur() // HACK: otherwise, would scroll automatically to the bottom of page
		setOpenCombobox(value)
	}

	// FIXME: This causes re-renders. Is there a better way?
	React.useEffect(() => {
		onChange(selectedValues.map(({ value }) => value))
	}, [selectedValues, onChange])

	return (
		<label className="flex flex-col gap-1.5 font-body">
			<div className="flex items-center justify-between gap-2 text-neutral-400">
				<p className="text-sm">{label}</p>
				<p className="text-xs">{selectedValues.length} selected</p>
			</div>

			<Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
				<PopoverTrigger asChild>
					<button
						type="button"
						ref={ref}
						aria-expanded={openCombobox}
						data-placeholder={selectedValues.length === 0}
						data-invalid={error ? "true" : "false"}
						className="flex w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-4 py-3 capitalize text-neutral-900 transition-all focus:border-primary-300 focus:shadow-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-red-600 data-[invalid=true]:bg-[rgba(227,54,41,0.11)] data-[placeholder=true]:text-neutral-300 [&>span]:line-clamp-1 [&>span]:truncate">
						<span>
							{selectedValues.length
								? selectedValues.map(({ label }) => label).join(", ")
								: (placeholder ?? "Select values...")}
						</span>

						<ChevronDown className="text-neutral-400" />
					</button>
				</PopoverTrigger>

				<PopoverContent className="w-full p-0">
					<Command loop className="min-w-[var(--radix-popover-trigger-width)]">
						<CommandInput ref={inputRef} placeholder="Search framework..." />

						<CommandList>
							<CommandEmpty>No value(s) found...</CommandEmpty>
							<CommandGroup>
								{options.map((option) => {
									const isActive = selectedValues.includes(option)

									return (
										<CommandItem
											key={option.value}
											value={option.label}
											onSelect={() => toggleOption(option)}>
											<span className="flex-1 capitalize">{option.label}</span>

											<Check
												className={`transition-opacity ${isActive ? "text-primary-300" : "text-transparent"}`}
											/>
										</CommandItem>
									)
								})}
							</CommandGroup>

							<PopoverClose asChild>
								<div className="sticky bg-white px-4 py-3">
									<Button
										className="bg-primary-50 text-sm text-primary-300 hover:bg-primary-100"
										type="button"
										variant="ghost">
										Done
									</Button>
								</div>
							</PopoverClose>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{error ? <ErrorMessage message={error.message} /> : null}
		</label>
	)
}
