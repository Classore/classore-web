import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronDown } from "@untitled-ui/icons-react";
import * as React from "react";
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";
import { toast } from "sonner";
import { ErrorMessage } from "../shared";
import { Button } from "./button";

type Option = {
	label: string;
	value: string;
};

type Options = Option[];

type MultiSelectProps<T extends FieldValues> = {
	label: string;
	options: Options;
	name: Path<T>;
	control: Control<T>;
	placeholder?: string;
	className?: string;
	info?: string;
	maxSelectable?: number;
};

export const MultiSelect = <T extends FieldValues>({
	label,
	placeholder,
	options,
	name,
	control,
	className,
	info,
	maxSelectable,
}: MultiSelectProps<T>) => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const {
		field: { onChange, ref, value },
		fieldState: { error },
	} = useController({
		name,
		control,
		rules: {
			required: true,
		},
	});

	const handleValueChange = React.useCallback(
		(value: string, inputValue: string, onChange: (...event: unknown[]) => void) => {
			const values = String(inputValue).trim() === "" ? [] : inputValue.split(", ");

			const valIdx = values.findIndex((val) => val === value);
			if (valIdx === -1) {
				if (maxSelectable && values.length >= maxSelectable) {
					toast.info(
						`You have selected the maximum number of selection allowed, which is: ${maxSelectable}.`
					);
					return;
				}

				values.push(value);
			} else {
				values.splice(valIdx, 1);
			}
			onChange(values.join(", "));
			// setOpenCombobox(false)
			inputRef?.current?.focus();
		},
		[maxSelectable]
	);

	/*
	The ".filter(Boolean)" is to remove any empty strings from the array. cos when u split an empty string,
	it will return an array with one empty string
	*/
	const selectedLength = typeof value === "string" ? value.split(", ").filter(Boolean).length : 0;
	const currentValue = options
		.filter((option) => value.includes(option.value))
		.map((option) => option.label);

	return (
		<label className={cn("flex flex-col gap-1.5 font-body", className)}>
			<div className="flex items-center justify-between gap-2 text-neutral-400">
				<p className="text-sm">{label}</p>
				<p className="text-xs text-neutral-400">
					{info ? info : `${selectedLength} / ${maxSelectable} selected`}
				</p>
			</div>

			<Popover>
				<PopoverTrigger asChild>
					<button
						type="button"
						ref={ref}
						data-placeholder={value.length === 0}
						data-invalid={error ? "true" : "false"}
						className="flex w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-4 py-3 capitalize text-neutral-900 transition-all focus:border-primary-300 focus:shadow-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-red-600 data-[invalid=true]:bg-error/5 data-[placeholder=true]:text-neutral-300 [&>span]:line-clamp-1 [&>span]:truncate">
						<span>{value ? currentValue.join(", ") : (placeholder ?? "Select values...")}</span>

						<ChevronDown className="text-neutral-400" />
					</button>
				</PopoverTrigger>

				<PopoverContent className="w-full p-0">
					<Command loop className="min-w-[var(--radix-popover-trigger-width)]">
						<CommandInput ref={inputRef} placeholder="Search subjects..." />

						<CommandList>
							<CommandEmpty className="pb-16 text-center text-xs text-neutral-400">
								No value(s) found...
							</CommandEmpty>
							<CommandGroup className="pb-16">
								{options.map((option) => {
									const selected =
										String(value)
											.split(", ")
											.findIndex((val) => val === option.value) !== -1;

									return (
										<CommandItem
											key={option.value}
											value={option.label}
											data-checked={selected}
											className="group"
											onSelect={() => handleValueChange(option.value, value, onChange)}>
											<span className="flex-1 text-sm capitalize">{option.label}</span>

											<div className="absolute right-4 ml-auto flex size-5 items-center justify-center rounded-full border-2 border-neutral-300 transition-all group-focus-visible:border-primary-300 group-data-[checked=true]:border-primary-300">
												<span className="size-2.5 rounded-full bg-transparent group-data-[checked=true]:bg-primary-300" />
											</div>
											{/* <div className="flex size-4 items-center justify-center rounded border border-primary-300">
												<Check
													className={`transition-colors ${selected ? "text-primary-300" : "text-transparent"}`}
												/>
											</div> */}
										</CommandItem>
									);
								})}
							</CommandGroup>

							<PopoverClose asChild>
								<div className="fixed bottom-0 left-0 w-full bg-white px-4 py-3">
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
	);
};
