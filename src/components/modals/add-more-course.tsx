import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { Lock02 } from "@untitled-ui/icons-react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import * as React from "react";
import { z } from "zod";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { MultiSelect } from "../ui/multi-select";
import { Select, SelectItem } from "../ui/select";
import { formatCurrency } from "@/lib";
import { Button } from "../ui/button";
import { Spinner } from "../shared";
import {
	useGetExamBundles,
	useGetExams,
	useGetSingleExamBundleQuery,
	useGetSubjects,
	useUpdateStudyTimeline,
} from "@/queries/school";
import { useAddSubjectsWithTokens } from "@/queries/token-wallet";
import { useGetProfile } from "@/queries/student";
import { RiCoinLine, RiSparklingLine } from "@remixicon/react";

const schema = z.object({
	exam_type: z
		.string({
			required_error: "Please select an option",
		})
		.min(1, { message: "Please select an option" }),
	chosen_bundle: z
		.string({
			required_error: "Please select an option",
		})
		.min(1, { message: "Please select an option" }),
	subjects: z
		.string({
			required_error: "Please select at least one subject",
			invalid_type_error: "Please select at least one subject",
		})
		.min(1, { message: "Please select at least one subject" })
		.transform((value) => {
			return value.split(", ");
		}),
});

type FormData = z.infer<typeof schema>;

type AddCourseModalProps = {
	disabled?: boolean;
	chosenSubjects?: {
		id: string;
		name: string;
	}[];
};

const splitIntoArray = (value: string[] | string) => {
	return typeof value === "string" ? value.split(",").map((s) => s.trim()) : value;
};

export const AddMoreCourseModal = ({ disabled, chosenSubjects }: AddCourseModalProps) => {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [promoCode, setPromoCode] = React.useState("");
	const [appliedCode, setAppliedCode] = React.useState("");

	const { data: profile } = useGetProfile();
	const { data: bundle } = useGetSingleExamBundleQuery({
		bundle_id: router.query.id as string,
	});

	const { data: bundles } = useGetExamBundles({});
	const { data: subjects } = useGetSubjects();
	const { data: exams } = useGetExams();

	const timeline = profile?.time_line.find(
		(t) => t.chosen_bundle === bundle?.id || t.exam_bundle_details?.id === bundle?.id
	);

	const { control, handleSubmit } = useForm<FormData>({
		resolver: zodResolver(schema),
		shouldUnregister: true,
		defaultValues: {
			exam_type: bundle?.examination.id ?? "",
			chosen_bundle: (router.query.id as string) ?? "",
			subjects: [],
		},
	});
	const selectedSubjects = useWatch({
		control,
		name: "subjects",
	});
	const selectedSubjectsArray = selectedSubjects ? splitIntoArray(selectedSubjects) : [];

	const bundleSubjects = React.useMemo(() => {
		return subjects
			?.filter((subject) => subject.subject_examination_bundle === router.query.id)
			?.filter((subject) => !chosenSubjects?.find((s) => s.id === subject.subject_id))
			.map((sub) => ({
				label: sub.subject_name,
				value: sub.subject_id,
			}));
	}, [subjects, chosenSubjects, router.query.id]);

	const numberOfPrevEnrolled = Number(chosenSubjects?.length ?? 0);
	const maxSubjects = Number(bundle?.max_subjects || (bundle as any)?.allowed_subjects || 0);
	const remainingSlots = maxSubjects > 0 ? Math.max(0, maxSubjects - numberOfPrevEnrolled) : 0;
	const isMaxReached = maxSubjects > 0 && numberOfPrevEnrolled >= maxSubjects;

	// Token Pricing
	const tokenBalance = profile?.wallet?.token_balance ?? 0;
	const rawTokenCostPerSubject =
		(bundle as any)?.token_cost_per_subject ??
		(bundle as any)?.examinationbundle_token_cost_per_subject ??
		0;
	const tokenCostPerSubject = Number(rawTokenCostPerSubject) > 0 ? Number(rawTokenCostPerSubject) : 0;
	const hasTokenPricing = tokenCostPerSubject > 0;
	const requiredTokens = hasTokenPricing ? selectedSubjectsArray.length * tokenCostPerSubject : 0;
	const hasEnoughTokens = hasTokenPricing && tokenBalance >= requiredTokens && requiredTokens > 0;

	// Mutations
	const updateStudyTimeline = useUpdateStudyTimeline();
	const addSubjectsWithTokens = useAddSubjectsWithTokens({
		onSuccess: () => {
			setDialogOpen(false);
		},
	});

	const onSubmitPaystack = (data: FormData) => {
		if (!timeline?.id) {
			toast.error("No active study timeline found.");
			return;
		}
		if (isMaxReached) {
			toast.error(`You have already enrolled in the maximum allowed subjects (${maxSubjects}).`);
			return;
		}
		if (!data.subjects.length) {
			toast.error("Please select at least one subject.");
			return;
		}
		if (remainingSlots > 0 && data.subjects.length > remainingSlots) {
			toast.error(`You can only add up to ${remainingSlots} more subjects.`);
			return;
		}

		updateStudyTimeline.mutate(
			{
				study_timeline_id: timeline.id,
				subjects: data.subjects,
				...(appliedCode ? { promo_code: appliedCode } : {}),
			},
			{
				onSuccess: (res) => {
					setOpen(true);
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
				onError: (error: any) => {
					const errorMessage = Array.isArray(error?.response?.data?.message)
						? error?.response?.data?.message[0]
						: error?.response?.data?.message;
					toast.error(errorMessage || "Failed to update study timeline");
				},
			}
		);
	};

	const handlePayWithTokens = () => {
		if (!timeline?.id) {
			toast.error("No active study timeline found.");
			return;
		}
		if (isMaxReached) {
			toast.error(`You have already enrolled in the maximum allowed subjects (${maxSubjects}).`);
			return;
		}
		if (!selectedSubjectsArray.length) {
			toast.error("Please select at least one subject");
			return;
		}
		if (remainingSlots > 0 && selectedSubjectsArray.length > remainingSlots) {
			toast.error(`You can only add up to ${remainingSlots} more subjects.`);
			return;
		}

		addSubjectsWithTokens.mutate({
			study_timeline_id: timeline.id,
			subjects: selectedSubjectsArray,
		});
	};

	if (!bundle) return null;

	const extraSubjectCharge = bundle.extra_charge || bundle.amount_per_subject || 0;
	const totalFiatAmount = extraSubjectCharge * selectedSubjectsArray.length;

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					className="bg-primary-100 font-medium text-primary-600 enabled:hover:bg-primary-200"
					disabled={disabled}>
					Add More Courses
				</Button>
			</DialogTrigger>

			<DialogContent className="flex w-full max-w-[420px] flex-col gap-6 p-6 max-h-[90vh] overflow-y-auto">
				<header>
					<h3 className="text-xl font-bold text-neutral-900">Add Extra Subjects</h3>
					<p className="text-xs text-neutral-500 mt-0.5">
						Select extra subjects to include in your {bundle?.name} study bundle.
					</p>
				</header>

				<form onSubmit={handleSubmit(onSubmitPaystack)} className="flex flex-col gap-5 font-body font-normal">
					<Select disabled label="I am studying for" control={control} name="exam_type">
						{exams?.map((exam) => (
							<SelectItem key={exam.examination_id} value={exam.examination_id}>
								{exam.examination_name}
							</SelectItem>
						))}
					</Select>

					<Select disabled label="Select prep bundle" control={control} name="chosen_bundle">
						{bundles?.data.map((bundle) => (
							<SelectItem key={bundle.examinationbundle_id} value={bundle.examinationbundle_id}>
								{bundle.examinationbundle_name} Exam Prep Bundle
							</SelectItem>
						))}
					</Select>

					{isMaxReached ? (
						<div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-800">
							⚠️ You have already enrolled in the maximum allowed subjects ({maxSubjects}) for this bundle.
						</div>
					) : null}

					<MultiSelect
						control={control}
						name="subjects"
						label="Select subjects"
						placeholder="Select subjects..."
						options={bundleSubjects ?? []}
						disabled={isMaxReached}
						maxSelectable={remainingSlots}
						info={maxSubjects > 0 ? `${selectedSubjectsArray.length} / ${remainingSlots} available` : undefined}
					/>

					{/* ── Token Wallet Option ── */}
					{hasTokenPricing && selectedSubjectsArray.length > 0 && (
						<div className="flex flex-col gap-2 rounded-2xl border border-primary-100 bg-primary-50/50 p-3.5">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<RiCoinLine className="size-4 text-primary-700" />
									<p className="text-xs font-bold text-primary-900">Pay with Tokens</p>
								</div>
								<span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-800">
									{requiredTokens.toLocaleString()} tokens
								</span>
							</div>

							<div className="flex items-center justify-between text-xs pt-1 border-t border-primary-100">
								<span className="text-neutral-500">Balance:</span>
								<span className="font-bold text-neutral-800">{tokenBalance.toLocaleString()} tokens</span>
							</div>

							{hasEnoughTokens ? (
								<Button
									type="button"
									onClick={handlePayWithTokens}
									disabled={addSubjectsWithTokens.isPending}
									className="mt-1 w-full bg-primary-600 text-xs font-bold text-white hover:bg-primary-700">
									{addSubjectsWithTokens.isPending ? (
										<Spinner />
									) : (
										<>
											<RiSparklingLine className="size-3.5 mr-1" />
											Add with {requiredTokens.toLocaleString()} Tokens
										</>
									)}
								</Button>
							) : (
								<Button
									type="button"
									variant="outline"
									onClick={() => {
										setDialogOpen(false);
										router.push("/dashboard/wallet");
									}}
									className="mt-1 w-full border-primary-300 text-xs font-bold text-primary-700 hover:bg-primary-100">
									Buy Tokens to Add Subjects
								</Button>
							)}
						</div>
					)}

					{/* ── Paystack Fiat Option ── */}
					<div className="flex flex-col gap-3">
						{hasTokenPricing && selectedSubjectsArray.length > 0 && (
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

						<Button type="submit" disabled={updateStudyTimeline.isPending || selectedSubjectsArray.length === 0}>
							{updateStudyTimeline.isPending ? (
								<Spinner />
							) : (
								`Pay ${formatCurrency(totalFiatAmount)} with Paystack`
							)}
						</Button>

						<div className="flex items-center gap-1.5 self-center text-neutral-500">
							<Lock02 width={14} />
							<p className="text-center text-xs">Payment secured by Paystack</p>
						</div>
					</div>
				</form>

				{open && (
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
