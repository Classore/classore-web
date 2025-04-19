import { useController, type Control, type FieldValues, type Path } from "react-hook-form";
import React, { useCallback, useMemo } from "react";
import { RiStarFill } from "@remixicon/react";

interface Props<T extends FieldValues> {
	control: Control<T>;
	max: number;
	name: Path<T>;
	disabled?: boolean;
}

export const RatingInput = <T extends FieldValues>({ control, max, name, disabled }: Props<T>) => {
	const safeMax = useMemo(() => Math.max(1, max), [max]);

	const {
		field: { value, onChange, ref: inputRef },
	} = useController({
		name,
		control,
	});

	const { safeValue, isDisabled } = useMemo(
		() => ({
			safeValue: Math.min(Math.max(0, value || 0), safeMax),
			isDisabled: disabled === true,
		}),
		[value, safeMax, disabled]
	);

	const handleStarClick = useCallback(
		(selectedValue: number) => {
			if (!isDisabled) {
				onChange(selectedValue);
			}
		},
		[onChange, isDisabled]
	);

	const stars = useMemo(() => {
		return Array.from({ length: safeMax }, (_, index) => {
			const starValue = index + 1;
			const isSelected = index < safeValue;

			return (
				<RiStarFill
					key={index}
					className={`size-6 ${isDisabled ? "opacity-70" : "cursor-pointer"} ${
						isSelected ? "text-yellow-500" : "text-gray-300"
					}`}
					onClick={() => handleStarClick(starValue)}
					aria-label={`Rate ${starValue} out of ${safeMax}`}
					role="radio"
					aria-checked={isSelected}
				/>
			);
		});
	}, [safeMax, safeValue, handleStarClick, isDisabled]);

	return (
		<div className="flex items-center gap-x-4" role="radiogroup" aria-label="Rating">
			{stars}
			<input type="hidden" name={name} value={safeValue} ref={inputRef} disabled={isDisabled} />
		</div>
	);
};

RatingInput.displayName = "RatingInput";
