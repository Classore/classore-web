import {
	RiCheckLine,
	RiCoinLine,
	RiShieldCheckLine,
	RiSparklingLine,
} from "@remixicon/react";
import { Lock02 } from "@untitled-ui/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";

import { Spinner } from "../shared";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { formatCurrency } from "@/lib";
import {
	useCreatePaidStudyTimeline,
	useCreateStudyTimeline,
	useGetBundleSubjects,
	useGetSingleExamBundleQuery,
} from "@/queries/school";
import { renewPlan } from "@/queries/user";
import { useGetProfile } from "@/queries/student";
import { usePurchaseBundleWithTokens } from "@/queries/token-wallet";
import { useMutation } from "@tanstack/react-query";

type EnrollModalProps = {
	open?: boolean;
	setOpen?: (open: boolean) => void;
	triggerText?: string;
	triggerVariant?: "default" | "outline" | "secondary" | "ghost" | "link";
	className?: string;
	bundleId?: string;
};

/**
 * Calculates token cost for chosen subjects:
 * If subjects <= allowedSubjects: cost = baseTokenCost
 * If subjects > allowedSubjects: cost = baseTokenCost + (extras * tokenCostPerSubject)
 */
function calcTokenCost(
	selectedCount: number,
	allowedSubjects: number,
	tokenCost: number,
	tokenCostPerSubject: number
): number {
	if (selectedCount <= allowedSubjects) return tokenCost;
	const extras = selectedCount - allowedSubjects;
	return tokenCost + extras * tokenCostPerSubject;
}

export const EnrollModal = ({
	open: controlledOpen,
	setOpen: setControlledOpen,
	triggerText = "Start Learning Free",
	triggerVariant = "default",
	className,
	bundleId: propBundleId,
}: EnrollModalProps) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [internalOpen, setInternalOpen] = React.useState(false);

	const isControlled = controlledOpen !== undefined;
	const isOpen = isControlled ? controlledOpen : internalOpen;
	const setIsOpen = isControlled ? (setControlledOpen ?? (() => {})) : setInternalOpen;

	const bundleId = propBundleId || (router.query.id as string) || "";
	const [selectedSubjectIds, setSelectedSubjectIds] = React.useState<string[]>([]);
	const [promoCode, setPromoCode] = React.useState("");
	const [appliedCode, setAppliedCode] = React.useState("");
	const [isEnrollingFree, setIsEnrollingFree] = React.useState(false);
	const [isPayingWithTokens, setIsPayingWithTokens] = React.useState(false);

	// Reset state whenever the modal is opened
	React.useEffect(() => {
		if (isOpen) {
			setSelectedSubjectIds([]);
			setPromoCode("");
			setAppliedCode("");
		}
	}, [isOpen]);

	const { data: profile } = useGetProfile();
	const { data: bundle, isLoading: isBundleLoading } = useGetSingleExamBundleQuery({
		bundle_id: bundleId,
	});
	const { data: bundleSubjectsData, isLoading: isSubjectsLoading } = useGetBundleSubjects({
		bundle_id: bundleId,
	});

	// Mutations
	const createStudyTimeline = useCreateStudyTimeline();
	const createPaidStudyTimeline = useCreatePaidStudyTimeline();
	const renewPlanMutation = useMutation({
		mutationFn: ({ id, promo_code }: { id: string; promo_code?: string }) =>
			renewPlan(id, promo_code),
	});
	const purchaseBundleWithTokens = usePurchaseBundleWithTokens();

	const existingTimeline = profile?.time_line?.find(
		(t) => t.chosen_bundle === bundleId || t.exam_bundle_details?.id === bundleId
	);

	// Subjects for this bundle: prioritize dedicated bundle subjects endpoint (matches mobile)
	// IMPORTANT: bundle.subjects has { id, name } while fetch-all returns { subject_id, subject_name }
	const bundleSubjects = React.useMemo(() => {
		let raw: Array<{ subject_id: string; subject_name: string }> = [];

		if (bundleSubjectsData && Array.isArray(bundleSubjectsData) && bundleSubjectsData.length > 0) {
			// fetch-all endpoint: fields are subject_id, subject_name
			raw = bundleSubjectsData.map((s) => ({
				subject_id: (s.subject_id || (s as any).id || "").trim(),
				subject_name: (s.subject_name || (s as any).name || "").trim(),
			}));
		} else if (bundle?.subjects && Array.isArray(bundle.subjects) && bundle.subjects.length > 0) {
			// view-one endpoint: fields are id, name (NOT subject_id / subject_name)
			raw = bundle.subjects.map((s: any) => ({
				subject_id: (s.id || s.subject_id || "").trim(),
				subject_name: (s.name || s.subject_name || "").trim(),
			}));
		}

		// Filter out any entries with empty IDs to avoid invisible broken chips
		return raw.filter((s) => Boolean(s.subject_id));
	}, [bundleSubjectsData, bundle?.subjects]);


	const maxSubjects =
		Number(bundle?.max_subjects) > 0
			? Number(bundle?.max_subjects)
			: Number((bundle as any)?.allowed_subjects) > 0
			? Number((bundle as any)?.allowed_subjects)
			: bundle?.number_of_subjects || 4;

	// Token Pricing calculation
	const tokenBalance = profile?.wallet?.token_balance ?? 0;
	const rawTokenCost =
		(bundle as any)?.token_cost ??
		(bundle as any)?.examinationbundle_token_cost ??
		(existingTimeline?.exam_bundle_details as any)?.token_cost ??
		0;
	const rawTokenCostPerSubject =
		(bundle as any)?.token_cost_per_subject ??
		(bundle as any)?.examinationbundle_token_cost_per_subject ??
		(existingTimeline?.exam_bundle_details as any)?.token_cost_per_subject ??
		0;

	const baseTokens = Number(rawTokenCost) > 0 ? Number(rawTokenCost) : 0;
	const extraTokensPerSubject =
		Number(rawTokenCostPerSubject) > 0 ? Number(rawTokenCostPerSubject) : 0;
	const hasTokenPricing = baseTokens > 0;

	const requiredTokens = hasTokenPricing
		? calcTokenCost(
				selectedSubjectIds.length,
				maxSubjects,
				baseTokens,
				extraTokensPerSubject
			)
		: 0;

	const hasEnoughTokens = tokenBalance >= requiredTokens && requiredTokens > 0;

	// Toggle subject selection with functional state updater
	const handleToggleSubject = (subjectId: string) => {
		if (!subjectId || subjectId.trim() === "") return;
		setSelectedSubjectIds((prev) => {
			if (prev.includes(subjectId)) {
				return prev.filter((id) => id !== subjectId);
			}
			if (maxSubjects > 0 && prev.length >= maxSubjects) {
				toast.info(`You have reached the maximum allowed subjects (${maxSubjects}) for this bundle.`);
				return prev;
			}
			return [...prev, subjectId];
		});
	};

	// ── Option 1: Free Preview Enrollment ─────────────────────────────────────
	const handleEnrollFree = () => {
		if (!selectedSubjectIds.length) {
			toast.error("Please select at least one subject to continue.");
			return;
		}
		if (maxSubjects > 0 && selectedSubjectIds.length > maxSubjects) {
			toast.error(`You can only select up to ${maxSubjects} subjects.`);
			return;
		}

		setIsEnrollingFree(true);

		if (existingTimeline?.id) {
			setIsEnrollingFree(false);
			toast.success("Enrolled in free preview!", {
				description: "Access the first module of each course for free.",
			});
			setIsOpen(false);
			router.push("/dashboard/courses");
			return;
		}

		createStudyTimeline.mutate(
			{
				chosen_bundle: bundleId,
				exam_type: bundle?.examination?.id || "",
				subjects: selectedSubjectIds,
			},
			{
				onSuccess: async () => {
					setIsEnrollingFree(false);
					toast.success("🎉 Enrolled in free preview!", {
						description: "Access the first module of each course for free.",
					});
					await queryClient.invalidateQueries({ queryKey: ["profile"] });
					await queryClient.invalidateQueries({ queryKey: ["my-courses"] });
					setIsOpen(false);
					router.push("/dashboard/courses");
				},
				onError: (err: any) => {
					setIsEnrollingFree(false);
					const msg = err?.response?.data?.message || err?.message || "Failed to enroll in free preview.";
					if (typeof msg === "string" && msg.toLowerCase().includes("already")) {
						toast.info("You are already enrolled in this bundle.");
						setIsOpen(false);
						router.push("/dashboard/courses");
						return;
					}
					toast.error(typeof msg === "string" ? msg : "Failed to enroll in free preview.");
				},
			}
		);
	};

	// ── Option 2: Pay with Token Wallet ────────────────────────────────────────
	const handlePayWithTokens = () => {
		if (!selectedSubjectIds.length) {
			toast.error("Please select at least one subject.");
			return;
		}
		if (maxSubjects > 0 && selectedSubjectIds.length > maxSubjects) {
			toast.error(`You can only select up to ${maxSubjects} subjects.`);
			return;
		}

		setIsPayingWithTokens(true);

		const executeTokenUnlock = (timelineId: string) => {
			purchaseBundleWithTokens.mutate(
				{ studentTimelineId: timelineId },
				{
					onSuccess: async () => {
						setIsPayingWithTokens(false);
						setIsOpen(false);
						router.push("/dashboard/courses");
					},
					onError: () => {
						setIsPayingWithTokens(false);
					},
				}
			);
		};

		if (existingTimeline?.id) {
			executeTokenUnlock(existingTimeline.id);
			return;
		}

		// Create base timeline first, then unlock with tokens
		createStudyTimeline.mutate(
			{
				chosen_bundle: bundleId,
				exam_type: bundle?.examination?.id || "",
				subjects: selectedSubjectIds,
			},
			{
				onSuccess: (timelineData) => {
					const timelineId = (timelineData.data as any)?.id || (timelineData.data as any)?.timeline_id;
					if (!timelineId) {
						setIsPayingWithTokens(false);
						toast.error("Could not create study timeline. Please try again.");
						return;
					}
					executeTokenUnlock(timelineId);
				},
				onError: (err: any) => {
					setIsPayingWithTokens(false);
					const msg = err?.response?.data?.message || err?.message || "Failed to initialize study plan.";
					toast.error(typeof msg === "string" ? msg : "Failed to initialize study plan.");
				},
			}
		);
	};

	// ── Option 3: Pay with Paystack (Fiat) ──────────────────────────────────────
	const handlePayWithPaystack = () => {
		if (!selectedSubjectIds.length) {
			toast.error("Please select at least one subject.");
			return;
		}
		if (maxSubjects > 0 && selectedSubjectIds.length > maxSubjects) {
			toast.error(`You can only select up to ${maxSubjects} subjects.`);
			return;
		}

		if (existingTimeline?.id) {
			renewPlanMutation.mutate(
				{ id: existingTimeline.id, promo_code: appliedCode || undefined },
				{
					onSuccess: (res: any) => {
						const rawData = res?.data;
						const paymentUrl =
							rawData?.authorization_url ||
							rawData?.checkout_url ||
							rawData?.link?.link ||
							rawData?.link ||
							rawData?.payment_link?.authorization_url ||
							rawData?.payment_link?.link;
						if (paymentUrl) {
							window.location.href = paymentUrl;
						} else {
							toast.error("Could not get payment link. Please try again.");
						}
					},
					onError: (err: any) => {
						const msg = err?.response?.data?.message || err?.message || "Payment initialization failed.";
						toast.error(typeof msg === "string" ? msg : "Payment initialization failed.");
					},
				}
			);
			return;
		}

		createPaidStudyTimeline.mutate(
			{
				chosen_bundle: bundleId,
				exam_type: bundle?.examination?.id || "",
				subjects: selectedSubjectIds,
				...(appliedCode ? { promo_code: appliedCode } : {}),
			},
			{
				onSuccess: (res) => {
					const rawData = (res as any)?.data;
					const paymentUrl =
						rawData?.payment_link?.authorization_url ||
						rawData?.payment_link?.link ||
						rawData?.authorization_url ||
						rawData?.checkout_url ||
						rawData?.link;
					if (paymentUrl) {
						window.location.href = paymentUrl;
					} else {
						toast.error("Could not get payment link. Please try again.");
					}
				},
				onError: (err: any) => {
					const msg = err?.response?.data?.message || err?.message || "Payment initialization failed.";
					toast.error(typeof msg === "string" ? msg : "Payment initialization failed.");
				},
			}
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			{!isControlled && (
				<DialogTrigger asChild>
					<Button variant={triggerVariant} className={className}>
						{triggerText}
					</Button>
				</DialogTrigger>
			)}

			<DialogContent className="flex w-full max-w-[460px] flex-col gap-5 p-6 max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<h3 className="text-xl font-bold text-neutral-900 capitalize">
						{bundle?.name || "Exam"} Prep Bundle
					</h3>
					<p className="text-xs text-neutral-500 mt-0.5">
						Pick your study subjects and choose your preferred enrollment option.
					</p>
				</DialogHeader>

				{/* ── Subject Selection Section ── */}
				<div className="space-y-3">
					<div className="flex items-center justify-between text-xs font-semibold">
						<span className="text-neutral-700">Select Subjects</span>
						<span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-neutral-600">
							{selectedSubjectIds.length} / {maxSubjects} included
						</span>
					</div>

					{isSubjectsLoading || isBundleLoading ? (
						<div className="grid place-items-center py-8">
							<Spinner />
						</div>
					) : !bundleSubjects.length ? (
						<div className="rounded-xl border border-dashed border-neutral-200 p-6 text-center text-xs text-neutral-500">
							No subjects available for this bundle yet.
						</div>
					) : (
						<div className="flex flex-wrap gap-2 pt-1 max-h-48 overflow-y-auto">
							{bundleSubjects.map((subject) => {
								const checked = selectedSubjectIds.includes(subject.subject_id);
								const isMaxReached = maxSubjects > 0 && selectedSubjectIds.length >= maxSubjects;
								const disabled = isMaxReached && !checked;

								return (
									<button
										key={subject.subject_id}
										type="button"
										onClick={() => handleToggleSubject(subject.subject_id)}
										disabled={disabled}
										className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold capitalize transition ${
											checked
												? "border-primary-600 bg-primary-600 text-white shadow-xs"
												: disabled
												? "border-neutral-200 bg-neutral-100 text-neutral-400 opacity-50 cursor-not-allowed"
												: "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50"
										}`}>
										{checked ? <RiCheckLine className="size-3.5" /> : null}
										{subject.subject_name}
									</button>
								);
							})}
						</div>
					)}
				</div>

				{/* ── Option A: Token Wallet Unlock (If pricing configured) ── */}
				{hasTokenPricing && (
					<div className="flex flex-col gap-2 rounded-2xl border border-primary-100 bg-primary-50/50 p-3.5">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<RiCoinLine className="size-4 text-primary-700" />
								<p className="text-xs font-bold text-primary-900">Unlock with Tokens</p>
							</div>
							<span className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-bold text-primary-800">
								{requiredTokens.toLocaleString()} tokens
							</span>
						</div>

						<div className="flex items-center justify-between text-xs pt-1 border-t border-primary-100">
							<span className="text-neutral-500">Your token balance:</span>
							<span className="font-bold text-neutral-800">{tokenBalance.toLocaleString()} tokens</span>
						</div>

						{hasEnoughTokens ? (
							<Button
								onClick={handlePayWithTokens}
								disabled={isPayingWithTokens || purchaseBundleWithTokens.isPending}
								className="mt-1 w-full bg-primary-600 text-xs font-bold text-white hover:bg-primary-700">
								{isPayingWithTokens || purchaseBundleWithTokens.isPending ? (
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
									setIsOpen(false);
									router.push("/dashboard/wallet");
								}}
								className="mt-1 w-full border-primary-300 text-xs font-bold text-primary-700 hover:bg-primary-100">
								Buy Tokens to Unlock
							</Button>
						)}
					</div>
				)}

				{/* ── Option B: Paystack (Card / Bank) ── */}
				<div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-3.5">
					<div className="flex items-center justify-between">
						<p className="text-xs font-bold text-neutral-900">Pay with Card or Bank</p>
						<span className="font-bold text-sm text-primary-700">
							{formatCurrency(Number(bundle?.amount || 0))}
						</span>
					</div>

					{/* Promo code */}
					<div className="flex items-center gap-2">
						<input
							type="text"
							value={promoCode}
							onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
							placeholder="Promo Code"
							disabled={!!appliedCode}
							className="h-8.5 flex-1 rounded-lg border border-neutral-200 bg-white px-2.5 text-xs font-mono uppercase tracking-wider"
						/>
						{appliedCode ? (
							<button
								type="button"
								onClick={() => { setAppliedCode(""); setPromoCode(""); }}
								className="h-8.5 rounded-lg border border-red-200 bg-red-50 px-2.5 text-xs font-bold text-red-600 hover:bg-red-100">
								Remove
							</button>
						) : (
							<button
								type="button"
								onClick={() => { if (promoCode.trim()) { setAppliedCode(promoCode.trim()); toast.success("Code applied"); } }}
								className="h-8.5 rounded-lg bg-neutral-900 px-3 text-xs font-bold text-white hover:bg-neutral-800">
								Apply
							</button>
						)}
					</div>

					{appliedCode ? (
						<p className="text-[11px] font-semibold text-green-700 flex items-center gap-1">
							<RiShieldCheckLine className="size-3.5" />
							✓ &ldquo;{appliedCode}&rdquo; applied
						</p>
					) : null}

					<Button
						onClick={handlePayWithPaystack}
						disabled={createPaidStudyTimeline.isPending || renewPlanMutation.isPending}
						className="w-full text-xs font-bold">
						{createPaidStudyTimeline.isPending || renewPlanMutation.isPending ? (
							<Spinner />
						) : (
							`Pay ${formatCurrency(Number(bundle?.amount || 0))} with Paystack`
						)}
					</Button>
				</div>

				{/* ── Option C: Free Preview Enrollment ── */}
				<div className="pt-1 border-t border-neutral-100 flex flex-col gap-1.5 text-center">
					<Button
						variant="outline"
						onClick={handleEnrollFree}
						disabled={isEnrollingFree}
						className="w-full text-xs font-semibold">
						{isEnrollingFree ? <Spinner /> : "Start Learning Free (First Module)"}
					</Button>
					<div className="flex items-center justify-center gap-1 text-[11px] text-neutral-400">
						<Lock02 width={13} />
						<span>Instant preview access • Upgrade anytime</span>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default EnrollModal;
