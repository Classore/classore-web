import { useMutation } from "@tanstack/react-query";
import { Lock02 } from "@untitled-ui/icons-react";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import type { UserProfileResp, HttpError } from "@/types";
import { renewPlan } from "@/queries/user";
import { usePurchaseBundleWithTokens } from "@/queries/token-wallet";
import { useGetSingleExamBundleQuery } from "@/queries/school";
import { useGetProfile } from "@/queries/student";
import { formatCurrency } from "@/lib";
import { Button } from "../ui/button";
import { Spinner } from "../shared";
import { RiCoinLine, RiSparklingLine } from "@remixicon/react";

interface RenewalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	bundle: UserProfileResp["time_line"][number];
}

export const RenewalModal = ({ open, setOpen, bundle }: RenewalProps) => {
	const router = useRouter();
	const [visible, setVisible] = React.useState(false);
	const [promoCode, setPromoCode] = React.useState("");
	const [appliedCode, setAppliedCode] = React.useState("");

	const { data: profile } = useGetProfile();
	const bundleId = bundle?.exam_bundle_details?.id || bundle?.chosen_bundle;
	const { data: bundleData } = useGetSingleExamBundleQuery({
		bundle_id: bundleId || "",
	});

	// Token Pricing
	const tokenBalance = profile?.wallet?.token_balance ?? 0;
	const rawTokenCost =
		(bundleData as any)?.token_cost ??
		(bundleData as any)?.examinationbundle_token_cost ??
		(bundle?.exam_bundle_details as any)?.token_cost ??
		0;
	const requiredTokens = Number(rawTokenCost) > 0 ? Number(rawTokenCost) : 0;
	const hasTokenPricing = requiredTokens > 0;
	const hasEnoughTokens = hasTokenPricing && tokenBalance >= requiredTokens;

	// Paystack Mutation
	const { mutate: renewWithPaystack, isPending: isPaystackPending } = useMutation({
		mutationKey: ["renew", bundle?.id],
		mutationFn: () => {
			if (!bundle?.id) throw new Error("No active bundle found");
			return renewPlan(bundle.id, appliedCode || undefined);
		},
		onSuccess: (data) => {
			const rawData = (data as any)?.data;
			const paymentUrl =
				rawData?.authorization_url ||
				rawData?.checkout_url ||
				rawData?.link?.link ||
				rawData?.link ||
				rawData?.payment_link?.authorization_url ||
				rawData?.payment_link?.link ||
				rawData?.payment_link ||
				rawData?.url;
			if (paymentUrl) {
				setVisible(true);
				window.location.href = paymentUrl;
			} else {
				toast.error("Could not get payment link. Please try again.");
			}
		},
		onError: (error: HttpError) => {
			const errorMessage = Array.isArray(error.response?.data?.message)
				? error.response.data.message[0]
				: error.response?.data?.message;
			toast.error(errorMessage || "Failed to initiate renewal");
		},
	});

	// Token Mutation
	const renewWithTokens = usePurchaseBundleWithTokens({
		onSuccess: () => {
			setOpen(false);
		},
	});

	const handlePayWithTokens = () => {
		if (!bundle?.id) {
			toast.error("No active study plan found.");
			return;
		}
		renewWithTokens.mutate({ studentTimelineId: bundle.id });
	};

	if (!bundle) return null;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex w-full max-w-[420px] flex-col gap-5 p-6 max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<h3 className="text-xl font-bold text-neutral-900">Renew Plan</h3>
					<p className="text-xs text-neutral-500 mt-0.5">
						Your subscription for this study bundle has expired. Renew to continue learning.
					</p>
				</DialogHeader>

				<ul className="flex flex-col gap-2.5 rounded-xl bg-neutral-50 p-3.5 border border-neutral-100 text-xs">
					<li className="flex justify-between">
						<span className="text-neutral-500">Exam Type:</span>
						<span className="font-semibold text-neutral-800 capitalize">{bundle.exam?.name || "General"}</span>
					</li>
					<li className="flex justify-between">
						<span className="text-neutral-500">Study Bundle:</span>
						<span className="font-semibold text-neutral-800 capitalize">{bundle.exam_bundle_details?.name}</span>
					</li>
					<li className="flex justify-between">
						<span className="text-neutral-500">Subjects:</span>
						<span className="font-semibold text-neutral-800">{bundle.subjects?.length || 0} subjects</span>
					</li>
					<li className="flex justify-between border-t border-neutral-200/60 pt-2">
						<span className="text-neutral-500 font-medium">Renewal Amount:</span>
						<span className="font-bold text-primary-700 text-sm">{formatCurrency(Number(bundle.renewal_amount || 0))}</span>
					</li>
				</ul>

				{/* ── Token Wallet Option ── */}
				{hasTokenPricing && (
					<div className="flex flex-col gap-2 rounded-2xl border border-primary-100 bg-primary-50/50 p-3.5">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<RiCoinLine className="size-4 text-primary-700" />
								<p className="text-xs font-bold text-primary-900">Renew with Tokens</p>
							</div>
							<span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-800">
								{requiredTokens.toLocaleString()} tokens
							</span>
						</div>

						<div className="flex items-center justify-between text-xs pt-1 border-t border-primary-100">
							<span className="text-neutral-500">Your Balance:</span>
							<span className="font-bold text-neutral-800">{tokenBalance.toLocaleString()} tokens</span>
						</div>

						{hasEnoughTokens ? (
							<Button
								type="button"
								onClick={handlePayWithTokens}
								disabled={renewWithTokens.isPending}
								className="mt-1 w-full bg-primary-600 text-xs font-bold text-white hover:bg-primary-700">
								{renewWithTokens.isPending ? (
									<Spinner />
								) : (
									<>
										<RiSparklingLine className="size-3.5 mr-1" />
										Renew for {requiredTokens.toLocaleString()} Tokens
									</>
								)}
							</Button>
						) : (
							<Button
								type="button"
								variant="outline"
								onClick={() => {
									setOpen(false);
									router.push("/dashboard/wallet");
								}}
								className="mt-1 w-full border-primary-300 text-xs font-bold text-primary-700 hover:bg-primary-100">
								Buy Tokens to Renew
							</Button>
						)}
					</div>
				)}

				{/* ── Paystack Fiat Option ── */}
				<div className="flex flex-col gap-3">
					{hasTokenPricing && (
						<div className="flex items-center gap-2">
							<span className="h-[1px] flex-1 bg-neutral-200" />
							<span className="text-[10px] font-semibold text-neutral-400 uppercase">Or Pay via Card</span>
							<span className="h-[1px] flex-1 bg-neutral-200" />
						</div>
					)}

					{/* Promo Code */}
					<div className="flex flex-col gap-1.5">
						<label className="text-xs font-semibold text-neutral-700">
							Promo Code <span className="font-normal text-neutral-400">(optional)</span>
						</label>
						<div className="flex items-center gap-2">
							<input
								type="text"
								value={promoCode}
								onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
								placeholder="Enter code"
								disabled={!!appliedCode}
								className="h-9 flex-1 rounded-lg border border-neutral-200 px-3 text-xs uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal disabled:opacity-50"
							/>
							{appliedCode ? (
								<button
									type="button"
									onClick={() => { setAppliedCode(""); setPromoCode(""); }}
									className="h-9 rounded-lg border border-red-200 bg-red-50 px-3 text-xs font-medium text-red-600 hover:bg-red-100">
									Remove
								</button>
							) : (
								<button
									type="button"
									onClick={() => { if (promoCode.trim()) setAppliedCode(promoCode.trim()); }}
									className="h-9 rounded-lg bg-neutral-800 px-3.5 text-xs font-medium text-white hover:bg-neutral-900">
									Apply
								</button>
							)}
						</div>
						{appliedCode && (
							<p className="text-xs text-green-600">
								✓ &ldquo;{appliedCode}&rdquo; applied &mdash; discount reflected at payment
							</p>
						)}
					</div>

					<Button onClick={() => renewWithPaystack()} disabled={isPaystackPending}>
						{isPaystackPending ? (
							<Spinner />
						) : (
							`Pay ${formatCurrency(Number(bundle.renewal_amount ?? 0))} with Paystack`
						)}
					</Button>
					<div className="flex items-center gap-1.5 self-center text-neutral-500">
						<Lock02 width={14} />
						<p className="text-center text-xs">Payment secured by Paystack</p>
					</div>
				</div>

				{visible && (
					<div className="absolute inset-0 z-50 mx-auto grid place-items-center gap-4 rounded-2xl bg-white/90 p-8 text-center text-sm text-neutral-600 backdrop-blur-sm">
						<div className="grid place-items-center gap-4 rounded-lg p-6">
							<Spinner variant="primary" size="md" />
							<p className="font-semibold text-neutral-900">Redirecting to Paystack...</p>
							<p className="text-xs text-neutral-500">
								DO NOT CLOSE THIS WINDOW OR REFRESH THE PAGE
							</p>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};
