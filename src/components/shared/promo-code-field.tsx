import { RiGiftLine, RiPriceTag3Line, RiShieldCheckLine } from "@remixicon/react";
import * as React from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { getApiErrorMessage, useValidatePromoCode, type PromoValidation } from "@/queries/promo";

interface PromoCodeFieldProps {
	/** The currently applied (server-validated) promo, if any */
	promo: PromoValidation | null;
	onApply: (promo: PromoValidation) => void;
	onRemove: () => void;
	/** Optional extra rule, return an error message to reject a validated code */
	reject?: (promo: PromoValidation) => string | undefined;
	label?: string;
	className?: string;
	disabled?: boolean;
}

/**
 * Promo code input that validates against `GET /transaction/validate-promo/:code`
 * before applying, and shows a discount / free-trial badge.
 */
export const PromoCodeField = ({
	promo,
	onApply,
	onRemove,
	reject,
	label = "Promo Code",
	className,
	disabled,
}: PromoCodeFieldProps) => {
	const [input, setInput] = React.useState("");
	const validate = useValidatePromoCode();

	// Clear the text box when the parent removes the applied promo
	React.useEffect(() => {
		if (!promo) return;
		setInput(promo.code);
	}, [promo]);

	const handleApply = () => {
		const code = input.trim().toUpperCase();
		if (!code) {
			toast.error("Please enter a promo code");
			return;
		}
		validate.mutate(code, {
			onSuccess: (result) => {
				if (!result.valid) {
					toast.error("This promo code is not valid.");
					return;
				}
				if (result.alreadyRedeemed) {
					toast.error("You have already redeemed this promotional code.");
					return;
				}
				const rejection = reject?.(result);
				if (rejection) {
					toast.error(rejection);
					return;
				}
				onApply(result);
				toast.success(
					result.isFreeTrial
						? `Promo applied: ${result.durationInDays || 14} days of free access!`
						: `Promo applied: ${result.percentageDiscount}% discount!`
				);
			},
			onError: (err) => {
				toast.error(getApiErrorMessage(err, "Invalid promo code"));
			},
		});
	};

	const handleRemove = () => {
		setInput("");
		onRemove();
	};

	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<label className="text-xs font-semibold text-neutral-700">
				{label} <span className="font-normal text-neutral-400">(optional)</span>
			</label>
			<div className="flex items-center gap-2">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value.toUpperCase())}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !promo) {
							e.preventDefault();
							handleApply();
						}
					}}
					placeholder="Enter code"
					disabled={!!promo || disabled || validate.isPending}
					className="h-9 flex-1 rounded-lg border border-neutral-200 bg-white px-3 font-mono text-xs uppercase tracking-wider placeholder:font-sans placeholder:normal-case placeholder:tracking-normal disabled:bg-neutral-100 disabled:opacity-70"
				/>
				{promo ? (
					<button
						type="button"
						onClick={handleRemove}
						className="h-9 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-bold text-red-600 hover:bg-red-100">
						Remove
					</button>
				) : (
					<button
						type="button"
						onClick={handleApply}
						disabled={disabled || validate.isPending || !input.trim()}
						className="h-9 min-w-[64px] rounded-lg bg-neutral-900 px-3.5 text-xs font-bold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60">
						{validate.isPending ? "Checking..." : "Apply"}
					</button>
				)}
			</div>

			{promo ? (
				promo.isFreeTrial ? (
					<p className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-700">
						<RiGiftLine className="size-3.5 shrink-0" />
						{promo.durationInDays || 14}-day free access applied &mdash; no payment needed
					</p>
				) : (
					<p className="flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-2.5 py-1.5 text-[11px] font-semibold text-green-700">
						<RiPriceTag3Line className="size-3.5 shrink-0" />
						{promo.percentageDiscount}% discount applied
					</p>
				)
			) : (
				<p className="flex items-center gap-1 text-[11px] text-neutral-400">
					<RiShieldCheckLine className="size-3 shrink-0" />
					Codes are verified before they&apos;re applied
				</p>
			)}
		</div>
	);
};
