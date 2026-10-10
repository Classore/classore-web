import {
	RiCheckLine,
	RiCoinLine,
	RiInformationLine,
	RiSparklingLine,
} from "@remixicon/react";
import { Lock02 } from "@untitled-ui/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";

import { PromoCodeField, Spinner } from "../shared";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { formatCurrency } from "@/lib";
import {
	useCreatePaidStudyTimeline,
	useCreateStudyTimeline,
	useGetBundleSubjects,
	useGetSingleExamBundleQuery,
	useUpdateStudyTimeline,
} from "@/queries/school";
import { renewPlan } from "@/queries/user";
import {
	applyPromoToAmount,
	extractPaymentUrl,
	extractTimelineId,
	getApiErrorMessage,
	getTrialDuration,
	isTrialActivation,
	useGeneratePaymentLink,
	type PromoValidation,
} from "@/queries/promo";
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
 * Calculates fiat cost for chosen subjects:
 * If selectedCount === 0: return 0
 * If selectedCount < allowedSubjects: selectedCount * amountPerSubject
 * If selectedCount === allowedSubjects: baseAmount (discounted bundle)
 * If selectedCount > allowedSubjects: baseAmount + (extras * amountPerSubject)
 */
function calcFiatCost(
	selectedCount: number,
	allowedSubjects: number,
	baseAmount: number,
	amountPerSubject: number
): number {
	if (selectedCount === 0) return 0;
	if (selectedCount < allowedSubjects) {
		const perSubject =
			amountPerSubject > 0
				? amountPerSubject
				: allowedSubjects > 0
				? Math.round(baseAmount / allowedSubjects)
				: 0;
		return selectedCount * perSubject;
	}
	const extras = selectedCount - allowedSubjects;
	return baseAmount + extras * (amountPerSubject > 0 ? amountPerSubject : 0);
}

/**
 * Calculates token cost for chosen subjects:
 * If selectedCount === 0: return 0
 * If selectedCount < allowedSubjects: selectedCount * tokenCostPerSubject
 * If selectedCount === allowedSubjects: tokenCost (discounted bundle)
 * If selectedCount > allowedSubjects: tokenCost + (extras * tokenCostPerSubject)
 */
function calcTokenCost(
	selectedCount: number,
	allowedSubjects: number,
	tokenCost: number,
	tokenCostPerSubject: number
): number {
	if (selectedCount === 0) return 0;
	if (selectedCount < allowedSubjects) {
		const perSubject =
			tokenCostPerSubject > 0
				? tokenCostPerSubject
				: allowedSubjects > 0
				? Math.round(tokenCost / allowedSubjects)
				: 0;
		return selectedCount * perSubject;
	}
	const extras = selectedCount - allowedSubjects;
	return tokenCost + extras * (tokenCostPerSubject > 0 ? tokenCostPerSubject : 0);
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
	const [promo, setPromo] = React.useState<PromoValidation | null>(null);
	const [isEnrollingFree, setIsEnrollingFree] = React.useState(false);
	const [isPayingWithTokens, setIsPayingWithTokens] = React.useState(false);

	// Reset state and revalidate profile whenever the modal is opened
	React.useEffect(() => {
		if (isOpen) {
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			setSelectedSubjectIds([]);
			setPromo(null);
		}
	}, [isOpen, queryClient]);

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
	const updateStudyTimeline = useUpdateStudyTimeline();
	const renewPlanMutation = useMutation({
		mutationFn: ({ id, promo_code }: { id: string; promo_code?: string }) =>
			renewPlan(id, promo_code),
	});
	const purchaseBundleWithTokens = usePurchaseBundleWithTokens();
	const generatePaymentLink = useGeneratePaymentLink();

	const existingTimeline = profile?.time_line?.find(
		(t) =>
			t.chosen_bundle === bundleId ||
			t.exam_bundle_details?.id === bundleId ||
			t.id === bundleId ||
			(t.chosen_bundle as any)?.id === bundleId
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


	const allowedSubjects =
		Number((bundle as any)?.allowed_subjects) > 0
			? Number((bundle as any)?.allowed_subjects)
			: Number(bundle?.max_subjects) > 0
			? Number(bundle?.max_subjects)
			: bundle?.number_of_subjects || 4;

	const maxSubjects =
		Number(bundle?.max_subjects) > 0
			? Number(bundle?.max_subjects)
			: allowedSubjects;

	const allowExtra =
		(bundle as any)?.allow_extra_subjects === "YES" ||
		(bundle as any)?.allow_extra_subjects === true ||
		(bundle as any)?.examinationbundle_allow_extra_subjects === "YES";

	const selectionLimit = allowExtra
		? bundleSubjects.length || 20
		: maxSubjects > 0
		? maxSubjects
		: allowedSubjects;

	// Fiat pricing calculation
	const rawAmount =
		bundle?.amount ??
		(bundle as any)?.examinationbundle_amount ??
		0;
	const rawAmountPerSubject =
		bundle?.amount_per_subject ??
		(bundle as any)?.examinationbundle_amount_per_subject ??
		bundle?.extra_charge ??
		0;
	const baseFiat = Number(rawAmount) > 0 ? Number(rawAmount) : 0;
	const fiatPerSubject = Number(rawAmountPerSubject) > 0 ? Number(rawAmountPerSubject) : 0;

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
				allowedSubjects,
				baseTokens,
				extraTokensPerSubject
		  )
		: 0;

	const requiredFiat = calcFiatCost(
		selectedSubjectIds.length,
		allowedSubjects,
		baseFiat,
		fiatPerSubject
	);

	// Fiat price after any validated promo (trial codes are free)
	const discountedFiat = applyPromoToAmount(requiredFiat, promo);

	const hasEnoughTokens = tokenBalance >= requiredTokens && requiredTokens > 0;

	// Toggle subject selection with functional state updater
	const handleToggleSubject = (subjectId: string) => {
		if (!subjectId || subjectId.trim() === "") return;
		setSelectedSubjectIds((prev) => {
			if (prev.includes(subjectId)) {
				return prev.filter((id) => id !== subjectId);
			}
			if (selectionLimit > 0 && prev.length >= selectionLimit) {
				toast.info(`You have reached the maximum allowed subjects (${selectionLimit}) for this bundle.`);
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
				onError: async (err: any) => {
					setIsEnrollingFree(false);
					const msg = err?.response?.data?.message || err?.message || "";
					if (typeof msg === "string" && (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("update"))) {
						await queryClient.invalidateQueries({ queryKey: ["profile"] });
						toast.info("You already have a study timeline for this bundle.");
						setIsOpen(false);
						router.push("/dashboard/courses");
						return;
					}
					toast.error(typeof msg === "string" && msg ? msg : "Failed to enroll in free preview.");
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
		if (maxSubjects > 0 && selectedSubjectIds.length > maxSubjects && !allowExtra) {
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
						toast.success("Plan unlocked successfully with tokens!");
						await queryClient.invalidateQueries({ queryKey: ["profile"] });
						await queryClient.invalidateQueries({ queryKey: ["my-courses"] });
						setIsOpen(false);
						router.push("/dashboard/courses");
					},
					onError: (err: any) => {
						setIsPayingWithTokens(false);
						const msg =
							err?.response?.data?.message ||
							err?.message ||
							"Failed to unlock plan with tokens.";
						toast.error(typeof msg === "string" ? msg : "Failed to unlock plan with tokens.");
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
				onError: async (err: any) => {
					const msg = err?.response?.data?.message || err?.message || "";
					// If backend says timeline already exists, fetch latest profile and unlock with tokens
					if (typeof msg === "string" && (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("update"))) {
						try {
							const freshProfile = (await queryClient.fetchQuery({ queryKey: ["profile"] })) as any;
							const found = freshProfile?.time_line?.find(
								(t: any) =>
									t.chosen_bundle === bundleId ||
									t.exam_bundle_details?.id === bundleId ||
									t.id === bundleId ||
									t.chosen_bundle?.id === bundleId
							);
							if (found?.id) {
								executeTokenUnlock(found.id);
								return;
							}
						} catch {
							// fallback
						}
					}
					setIsPayingWithTokens(false);
					toast.error(typeof msg === "string" && msg ? msg : "Failed to initialize study plan.");
				},
			}
		);
	};

	// ── Option 3: Pay with Paystack (Fiat) ──────────────────────────────────────
	// Looks up the study timeline for this bundle from the freshly refetched profile
	const findTimelineIdFromProfile = async (): Promise<string | undefined> => {
		try {
			await queryClient.refetchQueries({ queryKey: ["profile"] });
			const cached: any = queryClient.getQueryData(["profile"]);
			const timelines: any[] = cached?.data?.time_line ?? cached?.time_line ?? [];
			const found = timelines.find(
				(t: any) =>
					t?.chosen_bundle === bundleId ||
					t?.exam_bundle_details?.id === bundleId ||
					t?.chosen_bundle?.id === bundleId ||
					t?.id === bundleId
			);
			return found?.id;
		} catch {
			return undefined;
		}
	};

	const handlePayWithPaystack = async () => {
		if (!selectedSubjectIds.length) {
			toast.error("Please select at least one subject.");
			return;
		}
		if (maxSubjects > 0 && selectedSubjectIds.length > maxSubjects && !allowExtra) {
			toast.error(`You can only select up to ${maxSubjects} subjects.`);
			return;
		}

		// ── Promo checkout (discount or 14-day free trial) via generate-link ──
		if (promo) {
			const finishPromoCheckout = async (res: any) => {
				const raw = res?.data;
				if (isTrialActivation(raw)) {
					toast.success(`🎉 ${getTrialDuration(raw, promo.durationInDays || 14)}-day access unlocked!`, {
						description: "Your study pack is now active. Happy learning!",
					});
					await queryClient.invalidateQueries({ queryKey: ["profile"] });
					await queryClient.invalidateQueries({ queryKey: ["my-courses"] });
					setIsOpen(false);
					router.push("/dashboard/courses");
					return;
				}
				const paymentUrl = extractPaymentUrl(raw);
				if (paymentUrl) {
					window.location.href = paymentUrl;
				} else {
					toast.error("Could not get payment link. Please try again.");
				}
			};

			const startPromoCheckout = (timelineId: string) => {
				generatePaymentLink.mutate(
					{
						narration: "STUDY_PACK",
						narration_id: timelineId,
						amount: requiredFiat,
						promoCode: promo.code,
					},
					{
						onSuccess: finishPromoCheckout,
						onError: (err: any) => {
							toast.error(getApiErrorMessage(err, "Could not apply promo code. Please try again."));
						},
					}
				);
			};

			if (existingTimeline?.id) {
				startPromoCheckout(existingTimeline.id);
				return;
			}

			// Create the base timeline first, then attach the promo to it
			createStudyTimeline.mutate(
				{
					chosen_bundle: bundleId,
					exam_type: bundle?.examination?.id || "",
					subjects: selectedSubjectIds,
				},
				{
					onSuccess: async (timelineData) => {
						let timelineId = extractTimelineId(timelineData);
						if (!timelineId) {
							timelineId = await findTimelineIdFromProfile();
						}
						if (!timelineId) {
							toast.error("Could not create study timeline. Please try again.");
							return;
						}
						startPromoCheckout(timelineId);
					},
					onError: async (err: any) => {
						const msg = getApiErrorMessage(err, "");
						if (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("update")) {
							const found = await findTimelineIdFromProfile();
							if (found) {
								startPromoCheckout(found);
								return;
							}
						}
						toast.error(msg || "Failed to initialize study plan.");
					},
				}
			);
			return;
		}

		const proceedWithRenew = (timelineId: string) => {
			toast.info("Preparing your checkout link...");
			renewPlanMutation.mutate(
				{ id: timelineId },
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
		};

		if (existingTimeline?.id) {
			// If user changed or selected subjects, update timeline before renewing
			try {
				const updateRes = await updateStudyTimeline.mutateAsync({
					study_timeline: existingTimeline.id,
					subjects: selectedSubjectIds,
				});
				const updatePayUrl =
					(updateRes as any)?.data?.payment_link?.authorization_url ||
					(updateRes as any)?.data?.payment_link?.link ||
					(updateRes as any)?.data?.authorization_url;
				if (updatePayUrl) {
					window.location.href = updatePayUrl;
					return;
				}
			} catch {
				// Continue to renew directly
			}
			proceedWithRenew(existingTimeline.id);
			return;
		}

		createPaidStudyTimeline.mutate(
			{
				chosen_bundle: bundleId,
				exam_type: bundle?.examination?.id || "",
				subjects: selectedSubjectIds,
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
				onError: async (err: any) => {
					const msg = err?.response?.data?.message || err?.message || "";
					// If backend says timeline already exists, refetch profile & proceed with renew
					if (typeof msg === "string" && (msg.toLowerCase().includes("already") || msg.toLowerCase().includes("update"))) {
						try {
							const freshProfile = (await queryClient.fetchQuery({ queryKey: ["profile"] })) as any;
							const found = freshProfile?.time_line?.find(
								(t: any) =>
									t.chosen_bundle === bundleId ||
									t.exam_bundle_details?.id === bundleId ||
									t.id === bundleId ||
									t.chosen_bundle?.id === bundleId
							);
							if (found?.id) {
								proceedWithRenew(found.id);
								return;
							}
						} catch {
							// fallback
						}
					}
					toast.error(typeof msg === "string" && msg ? msg : "Payment initialization failed.");
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
							{selectedSubjectIds.length} / {allowedSubjects} for bundle discount
						</span>
					</div>

					{/* ── Dynamic Pricing Guide Banner ── */}
					{selectedSubjectIds.length === 0 ? (
						<div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-xs text-blue-900 flex items-start gap-2.5">
							<RiInformationLine className="size-4 shrink-0 text-blue-600 mt-0.5" />
							<div className="flex-1">
								<p className="font-semibold text-blue-950">
									Select {allowedSubjects} subjects to get the full bundle discount
								</p>
								<p className="text-[11px] text-blue-700 mt-0.5">
									Full bundle: {hasTokenPricing ? `${baseTokens} tokens / ` : ""}{formatCurrency(baseFiat)}. Selecting fewer than {allowedSubjects} charges per subject ({hasTokenPricing ? `${extraTokensPerSubject} tokens / ` : ""}{formatCurrency(fiatPerSubject)} each).
								</p>
							</div>
						</div>
					) : selectedSubjectIds.length < allowedSubjects ? (
						<div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-950 flex items-start gap-2.5">
							<RiInformationLine className="size-4 shrink-0 text-amber-600 mt-0.5" />
							<div className="flex-1">
								<p className="font-semibold">
									Paying per subject ({selectedSubjectIds.length} of {allowedSubjects} selected)
								</p>
								<p className="text-[11px] text-amber-800 mt-0.5">
									Currently paying individual rates: <span className="font-bold">{hasTokenPricing ? `${requiredTokens} tokens / ` : ""}{formatCurrency(requiredFiat)}</span>. Select <span className="font-bold underline">{allowedSubjects - selectedSubjectIds.length} more</span> to unlock the full bundle discount ({hasTokenPricing ? `${baseTokens} tokens / ` : ""}{formatCurrency(baseFiat)})!
								</p>
							</div>
						</div>
					) : selectedSubjectIds.length === allowedSubjects ? (
						<div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 text-xs text-emerald-950 flex items-start gap-2.5">
							<RiSparklingLine className="size-4 shrink-0 text-emerald-600 mt-0.5" />
							<div className="flex-1">
								<p className="font-semibold text-emerald-900">
									🎉 Bundle discount unlocked!
								</p>
								<p className="text-[11px] text-emerald-700 mt-0.5">
									You are getting all {allowedSubjects} subjects for the discounted bundle price of <span className="font-bold">{hasTokenPricing ? `${baseTokens} tokens / ` : ""}{formatCurrency(baseFiat)}</span>.
								</p>
							</div>
						</div>
					) : (
						<div className="rounded-xl border border-primary-200 bg-primary-50/80 p-3 text-xs text-primary-950 flex items-start gap-2.5">
							<RiSparklingLine className="size-4 shrink-0 text-primary-600 mt-0.5" />
							<div className="flex-1">
								<p className="font-semibold text-primary-900">
									Full bundle discount + {selectedSubjectIds.length - allowedSubjects} extra subject(s)
								</p>
								<p className="text-[11px] text-primary-700 mt-0.5">
									Base {allowedSubjects} subjects at discount + extras at {hasTokenPricing ? `${extraTokensPerSubject} tokens / ` : ""}{formatCurrency(fiatPerSubject)} each.
								</p>
							</div>
						</div>
					)}

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
								const isMaxReached = selectionLimit > 0 && selectedSubjectIds.length >= selectionLimit;
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
								disabled={isPayingWithTokens || purchaseBundleWithTokens.isPending || selectedSubjectIds.length === 0}
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
						<span className="flex items-center gap-1.5 font-bold text-sm text-primary-700">
							{promo ? (
								<>
									<span className="text-xs font-medium text-neutral-400 line-through">
										{formatCurrency(requiredFiat)}
									</span>
									{promo.isFreeTrial ? "FREE" : formatCurrency(discountedFiat)}
								</>
							) : (
								formatCurrency(requiredFiat)
							)}
						</span>
					</div>

					{/* Promo code */}
					<PromoCodeField promo={promo} onApply={setPromo} onRemove={() => setPromo(null)} />

					<Button
						onClick={handlePayWithPaystack}
						disabled={
							createPaidStudyTimeline.isPending ||
							createStudyTimeline.isPending ||
							generatePaymentLink.isPending ||
							renewPlanMutation.isPending ||
							selectedSubjectIds.length === 0
						}
						className="w-full text-xs font-bold">
						{createPaidStudyTimeline.isPending ||
						createStudyTimeline.isPending ||
						generatePaymentLink.isPending ||
						renewPlanMutation.isPending ? (
							<Spinner />
						) : promo?.isFreeTrial ? (
							`Activate ${promo.durationInDays || 14}-Day Free Access`
						) : (
							`Pay ${formatCurrency(discountedFiat)} with Paystack`
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
