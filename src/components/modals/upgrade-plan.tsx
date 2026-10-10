/**
 * UpgradePlanModal — Web equivalent of mobile's UpgradePlanSheet
 *
 * Shown when a student (with is_paid = false) tries to access a locked module.
 * Allows them to upgrade via Paystack Fiat or Token Wallet, browse free content, or check status.
 */

import { Lock02 } from "@untitled-ui/icons-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { renewPlan } from "@/queries/user";
import { usePurchaseBundleWithTokens } from "@/queries/token-wallet";
import { useGetSingleExamBundleQuery } from "@/queries/school";
import { useGetProfile } from "@/queries/student";
import { Button } from "@/components/ui/button";
import { PromoCodeField, Spinner } from "@/components/shared";
import type { UserProfileResp, HttpError } from "@/types";
import type { PromoValidation } from "@/queries/promo";
import {
	useGeneratePaymentLink,
	getApiErrorMessage,
	getTrialDuration,
	isTrialActivation,
	extractPaymentUrl,
	applyPromoToAmount,
} from "@/queries/promo";
import {
	RiBook2Line,
	RiVideoLine,
	RiTrophyLine,
	RiFileListLine,
	RiCoinLine,
	RiSparklingLine,
} from "@remixicon/react";
import { formatCurrency } from "@/lib";

const FEATURES = [
	{ icon: RiVideoLine, label: "All video lessons" },
	{ icon: RiBook2Line, label: "Interactive quizzes" },
	{ icon: RiFileListLine, label: "Progress tracking" },
	{ icon: RiTrophyLine, label: "Certificates" },
];

interface UpgradePlanModalProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	courseTitle?: string;
	moduleTitle?: string;
	bundle: UserProfileResp["time_line"][number] | null;
}

export const UpgradePlanModal = ({
	open,
	setOpen,
	courseTitle = "this course",
	moduleTitle = "premium content",
	bundle,
}: UpgradePlanModalProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [visible, setVisible] = React.useState(false);
	const [isRefreshing, setIsRefreshing] = React.useState(false);
	const [promo, setPromo] = React.useState<PromoValidation | null>(null);

	const { data: profile } = useGetProfile();
	const bundleId = bundle?.exam_bundle_details?.id || bundle?.chosen_bundle;
	const { data: bundleData } = useGetSingleExamBundleQuery({
		bundle_id: bundleId || "",
	});

	// Token balance and pricing
	const tokenBalance = profile?.wallet?.token_balance ?? 0;
	const rawTokenCost =
		(bundleData as any)?.token_cost ??
		(bundleData as any)?.examinationbundle_token_cost ??
		(bundle?.exam_bundle_details as any)?.token_cost ??
		0;
	const rawTokenCostPerSubject =
		(bundleData as any)?.token_cost_per_subject ??
		(bundleData as any)?.examinationbundle_token_cost_per_subject ??
		(bundle?.exam_bundle_details as any)?.token_cost_per_subject ??
		0;

	const baseTokens = Number(rawTokenCost) > 0 ? Number(rawTokenCost) : 0;
	const extraTokensPerSubject = Number(rawTokenCostPerSubject) > 0 ? Number(rawTokenCostPerSubject) : 0;
	const hasTokenPricing = baseTokens > 0;
	const enrolledSubjectCount = bundle?.subjects?.length || 4;
	const allowedSubjects = (bundleData as any)?.allowed_subjects || (bundleData as any)?.max_subjects || 4;
	const requiredTokens = hasTokenPricing
		? enrolledSubjectCount < allowedSubjects
			? enrolledSubjectCount *
			  (extraTokensPerSubject > 0
					? extraTokensPerSubject
					: allowedSubjects > 0
					? Math.round(baseTokens / allowedSubjects)
					: 0)
			: enrolledSubjectCount === allowedSubjects
			? baseTokens
			: baseTokens + (enrolledSubjectCount - allowedSubjects) * extraTokensPerSubject
		: 0;

	const hasEnoughTokens = hasTokenPricing && tokenBalance >= requiredTokens && requiredTokens > 0;

	// Fiat amount
	const renewalAmount = Number(bundle?.renewal_amount || 0);
	const discountedAmount = applyPromoToAmount(renewalAmount, promo);

	const generatePaymentLink = useGeneratePaymentLink();

	// Paystack Fiat Mutation (no promo code path)
	const { mutate: upgradeWithPaystack, isPending: isPaystackPending } = useMutation({
		mutationKey: ["renew-plan", bundle?.id],
		mutationFn: () => {
			if (!bundle?.id) throw new Error("No active bundle found");
			return renewPlan(bundle.id, undefined);
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
			const errorMessage = Array.isArray(error?.response?.data?.message)
				? error.response.data.message[0]
				: error?.response?.data?.message;
			const message = errorMessage || "Payment failed. Please try again or contact support.";
			toast.error(message);
		},
	});

	// Token Purchase Mutation
	const purchaseWithTokens = usePurchaseBundleWithTokens({
		onSuccess: () => {
			setOpen(false);
		},
	});

	const handlePayWithTokens = () => {
		if (!bundle?.id) {
			toast.error("No active study plan found.");
			return;
		}
		purchaseWithTokens.mutate({ studentTimelineId: bundle.id });
	};

	// Upgrade via generate-link (handles promo discounts + free trial)
	const handleUpgradeWithPromo = () => {
		if (!bundle?.id || !promo) return;
		generatePaymentLink.mutate(
			{
				narration: "STUDY_PACK_UPDATE",
				narration_id: bundle.id,
				amount: renewalAmount,
				promoCode: promo.code,
			},
			{
				onSuccess: async (res) => {
					const raw = (res as any)?.data;
					if (isTrialActivation(raw)) {
						toast.success(
							`🎉 ${getTrialDuration(raw, promo.durationInDays || 14)}-day access unlocked!`,
							{ description: "Your study pack is now active. Happy learning!" }
						);
						await queryClient.invalidateQueries({ queryKey: ["profile"] });
						setOpen(false);
						router.push("/dashboard/courses");
						return;
					}
					const paymentUrl = extractPaymentUrl(raw);
					if (paymentUrl) {
						setVisible(true);
						window.location.href = paymentUrl;
					} else {
						toast.error("Could not get payment link. Please try again.");
					}
				},
				onError: (err: any) => {
					toast.error(getApiErrorMessage(err, "Could not apply promo code. Please try again."));
				},
			}
		);
	};

	const handleBrowseFreeContent = () => {
		setOpen(false);
		router.push("/dashboard/courses");
	};

	const handleRefreshStatus = async () => {
		setIsRefreshing(true);
		try {
			await queryClient.invalidateQueries({ queryKey: ["profile"] });
			await queryClient.refetchQueries({ queryKey: ["profile"] });

			const refreshedData = queryClient.getQueryData<{ data: UserProfileResp }>(["profile"]);
			const refreshedTimeline = refreshedData?.data?.time_line?.find(
				(t) => t.status === "ONGOING" || t.status === "ACTIVE"
			);

			if (refreshedTimeline?.is_paid) {
				toast.success("Payment confirmed! 🎉", {
					description: "You now have full access to all modules.",
				});
				setOpen(false);
			} else {
				toast.error("Payment not confirmed yet", {
					description:
						"We haven't received confirmation yet. If you've paid, please wait a moment and try again.",
					duration: 8000,
				});
			}
		} catch {
			toast.error("Failed to check payment status", {
				description: "Please try again later.",
			});
		} finally {
			setIsRefreshing(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex w-full max-w-[440px] flex-col gap-6 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
				{/* Lock icon */}
				<div className="flex flex-col items-center gap-3">
					<div className="grid size-14 place-items-center rounded-2xl bg-orange-100">
						<Lock02 className="size-7 text-orange-500" />
					</div>
					<div className="text-center">
						<h2 className="text-xl font-bold text-neutral-900">Unlock Full Access</h2>
						<p className="mt-1 text-xs text-neutral-500">
							You&apos;ve completed your free preview. Unlock all chapters and quizzes to keep learning!
						</p>
					</div>
				</div>

				{/* Course / module info */}
				<div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-3.5">
					<p className="font-semibold text-sm capitalize text-neutral-900">{courseTitle}</p>
					<p className="mt-0.5 text-xs text-neutral-500 capitalize">Lesson: {moduleTitle}</p>
				</div>

				{/* Features list */}
				<div className="flex flex-col gap-2">
					<p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Includes:</p>
					<ul className="grid grid-cols-2 gap-2">
						{FEATURES.map(({ label, icon: Icon }) => (
							<li key={label} className="flex items-center gap-2 rounded-lg bg-neutral-50 px-2.5 py-1.5 border border-neutral-100">
								<Icon className="size-3.5 text-primary-600 shrink-0" />
								<span className="text-xs font-medium text-neutral-700">{label}</span>
							</li>
						))}
					</ul>
				</div>

				{/* ── Token Wallet Option (if available) ── */}
				{hasTokenPricing && (
					<div className="flex flex-col gap-2 rounded-2xl border border-primary-100 bg-primary-50/50 p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="grid size-7 place-items-center rounded-lg bg-primary-100 text-primary-700">
									<RiCoinLine className="size-4" />
								</div>
								<div>
									<p className="text-xs font-bold text-primary-900">Pay with Tokens</p>
									<p className="text-[11px] text-primary-700">Instant unlock without bank card</p>
								</div>
							</div>
							<span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-bold text-primary-800">
								{requiredTokens.toLocaleString()} tokens
							</span>
						</div>

						<div className="flex items-center justify-between pt-2 border-t border-primary-100 text-xs">
							<span className="text-neutral-500">Your token balance:</span>
							<span className="font-bold text-neutral-800">{tokenBalance.toLocaleString()} tokens</span>
						</div>

						{hasEnoughTokens ? (
							<Button
								onClick={handlePayWithTokens}
								disabled={purchaseWithTokens.isPending}
								className="mt-1 w-full bg-primary-600 text-xs font-bold text-white hover:bg-primary-700">
								{purchaseWithTokens.isPending ? (
									<Spinner />
								) : (
									<>
										<RiSparklingLine className="size-3.5 mr-1" />
										Pay {requiredTokens.toLocaleString()} Tokens
									</>
								)}
							</Button>
						) : (
							<Button
								variant="outline"
								onClick={() => {
									setOpen(false);
									router.push("/dashboard/wallet");
								}}
								className="mt-1 w-full border-primary-300 text-xs font-bold text-primary-700 hover:bg-primary-100">
								Buy Tokens to Unlock
							</Button>
						)}
					</div>
				)}

				{/* ── Paystack Fiat Upgrade Option ── */}
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<span className="h-[1px] flex-1 bg-neutral-200" />
						<span className="text-[11px] font-semibold text-neutral-400 uppercase">Or Pay via Card / Transfer</span>
						<span className="h-[1px] flex-1 bg-neutral-200" />
					</div>

					{/* Promo Code */}
					<PromoCodeField promo={promo} onApply={setPromo} onRemove={() => setPromo(null)} />

					{promo && (
						<p className="-mt-1 text-xs font-semibold text-primary-700">
							{promo.isFreeTrial
								? `${promo.durationInDays || 14}-day free access will be activated`
								: `Total: ${formatCurrency(discountedAmount)}`}
						</p>
					)}

					<Button
						onClick={promo ? handleUpgradeWithPromo : () => upgradeWithPaystack()}
						disabled={isPaystackPending || isRefreshing || generatePaymentLink.isPending}
						className="w-full">
						{isPaystackPending || generatePaymentLink.isPending ? (
							<Spinner />
						) : promo?.isFreeTrial ? (
							`Activate ${promo.durationInDays || 14}-Day Free Access`
						) : (
							`Pay ${formatCurrency(promo ? discountedAmount : renewalAmount)} with Paystack`
						)}
					</Button>
				</div>

				{/* Additional CTAs */}
				<div className="flex flex-col gap-2 pt-1 border-t border-neutral-100">
					<Button
						variant="outline"
						onClick={handleBrowseFreeContent}
						disabled={isPaystackPending || isRefreshing}
						className="w-full text-xs">
						Browse Free Content
					</Button>

					<Button
						variant="ghost"
						onClick={handleRefreshStatus}
						disabled={isPaystackPending || isRefreshing}
						className="w-full text-xs text-primary-600 hover:text-primary-700">
						{isRefreshing ? <Spinner variant="primary" /> : "Already Paid? Check Status"}
					</Button>
				</div>

				{/* Redirect overlay */}
				{visible && (
					<div className="absolute inset-0 z-50 grid place-items-center gap-4 rounded-2xl bg-white/90 p-8 text-center text-sm text-neutral-600 backdrop-blur-sm">
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
