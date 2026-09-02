import {
	RiArrowLeftLine,
	RiCheckLine,
	RiShieldCheckLine,
} from "@remixicon/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/layouts/auth";
import { Seo, Spinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib";
import {
	useCreateStudyTimeline,
	useGetExamBundles,
	useGetExams,
	useGetSubjects,
	useVetStudyPack,
} from "@/queries/school";

const EXAM_SUBTITLES: Record<string, string> = {
	"national exams": "WAEC, NECO, JUPEB, JSCE",
	"international exams": "IELTS, TOEFL, GMAT, GRE",
	"terminal examination (sss 1-3)": "SSS1, SSS2, SSS3",
};

const Page = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	// Wizard step state (1 to 4)
	const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);

	// Selections
	const [selectedExamId, setSelectedExamId] = React.useState("");
	const [selectedBundleId, setSelectedBundleId] = React.useState("");
	const [selectedSubjectIds, setSelectedSubjectIds] = React.useState<string[]>([]);
	const [promoCode, setPromoCode] = React.useState("");
	const [appliedCode, setAppliedCode] = React.useState("");

	// Queries
	const { data: exams, isLoading: isExamsLoading } = useGetExams();
	const { data: bundlesResp, isLoading: isBundlesLoading } = useGetExamBundles({
		examination: selectedExamId,
	});
	const { data: allSubjects, isLoading: isSubjectsLoading } = useGetSubjects();

	const vetStudyPackMutation = useVetStudyPack();
	const createStudyTimelineMutation = useCreateStudyTimeline();

	// Derived helpers
	const selectedExam = exams?.find((e) => e.examination_id === selectedExamId);
	const selectedBundle = bundlesResp?.data?.find(
		(b) => b.examinationbundle_id === selectedBundleId
	);
	const maxSubjects = selectedBundle?.examinationbundle_max_subjects || 4;

	// Filter subjects for the selected bundle
	const bundleSubjects = React.useMemo(() => {
		if (!selectedBundleId || !allSubjects) return [];
		return allSubjects.filter(
			(s) => s.subject_examination_bundle === selectedBundleId
		);
	}, [selectedBundleId, allSubjects]);

	const chosenSubjectNames = React.useMemo(() => {
		if (!allSubjects?.length || !selectedSubjectIds.length) return "";
		return allSubjects
			.filter((s) => selectedSubjectIds.includes(s.subject_id))
			.map((s) => s.subject_name)
			.join(", ");
	}, [allSubjects, selectedSubjectIds]);

	// ─── Step Transitions ──────────────────────────────────────────────────────

	const handleNextStep1 = () => {
		if (!selectedExamId) {
			toast.error("Please select an exam category to continue");
			return;
		}
		setStep(2);
	};

	const handleNextStep2 = () => {
		if (!selectedBundleId) {
			toast.error("Please select an exam prep bundle to continue");
			return;
		}
		// Reset selected subjects when changing bundle
		setSelectedSubjectIds([]);
		setStep(3);
	};

	const handleToggleSubject = (subjectId: string) => {
		if (selectedSubjectIds.includes(subjectId)) {
			setSelectedSubjectIds(selectedSubjectIds.filter((id) => id !== subjectId));
		} else {
			if (selectedSubjectIds.length >= maxSubjects) {
				toast.error(`You can select a maximum of ${maxSubjects} subjects for this bundle.`);
				return;
			}
			setSelectedSubjectIds([...selectedSubjectIds, subjectId]);
		}
	};

	const handleNextStep3 = async () => {
		if (!selectedSubjectIds.length) {
			toast.error("Please select at least one subject to continue");
			return;
		}

		try {
			const payload = [
				{
					chosen_bundle: selectedBundleId,
					subject_length: selectedSubjectIds.length,
				},
			];
			await vetStudyPackMutation.mutateAsync({ vettings: payload });
			setStep(4);
		} catch (err: any) {
			toast.error(err?.response?.data?.message || err?.message || "Failed to validate study pack");
		}
	};

	const handleApplyPromoCode = () => {
		if (!promoCode.trim()) {
			toast.error("Please enter a promo code");
			return;
		}
		setAppliedCode(promoCode.trim().toUpperCase());
		toast.success("Promo code applied!");
	};

	const handleRemovePromoCode = () => {
		setAppliedCode("");
		setPromoCode("");
	};

	const handleFinalSubmit = () => {
		if (!selectedBundleId || !selectedExamId || !selectedSubjectIds.length) {
			toast.error("Missing required information. Please review your selection.");
			return;
		}

		createStudyTimelineMutation.mutate(
			{
				chosen_bundle: selectedBundleId,
				exam_type: selectedExamId,
				subjects: selectedSubjectIds,
				...(appliedCode ? { promo_code: appliedCode } : {}),
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["profile"] });
					toast.success("Welcome to Classore! 🎉", {
						description: "Your study plan has been created successfully. Let's start learning!",
					});
					router.push("/dashboard");
				},
				onError: (error: any) => {
					const msg =
						error?.response?.data?.message ||
						error?.message ||
						"Failed to create study plan. Please try again.";
					toast.error(msg);
				},
			}
		);
	};

	const handleBack = () => {
		if (step > 1) {
			setStep((s) => ((s - 1) as 1 | 2 | 3 | 4));
		} else {
			router.back();
		}
	};

	return (
		<>
			<Seo title={`Step ${step} of 4 – Study Onboarding – Classore`} />

			<AuthLayout screen="signup">
				<div className="flex w-full max-w-[440px] flex-col gap-6 lg:gap-8">
					{/* Header Navigation & Step Counter */}
					<div className="flex items-center justify-between">
						<button
							type="button"
							onClick={handleBack}
							className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition">
							<RiArrowLeftLine className="size-4" />
							Back
						</button>
						<span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
							STEP {step} OF 4
						</span>
					</div>

					{/* ─── STEP 1 of 4: Exam Category ─────────────────────────────────── */}
					{step === 1 && (
						<div className="flex flex-col gap-6">
							<div>
								<h2 className="text-2xl font-bold tracking-tight text-neutral-900 leading-snug">
									Hi, I’m here to study smarter and reach my goals faster for
								</h2>
								<p className="text-xs text-neutral-500 mt-1">
									Select your target examination category to customize your study path.
								</p>
							</div>

							<div className="flex flex-col gap-3">
								{isExamsLoading ? (
									<div className="grid place-items-center py-12">
										<Spinner />
									</div>
								) : (
									exams?.map((exam) => {
										const checked = selectedExamId === exam.examination_id;
										const normalizedName = exam.examination_name.toLowerCase().trim();
										const sub = EXAM_SUBTITLES[normalizedName] || "";

										return (
											<div
												key={exam.examination_id}
												onClick={() => setSelectedExamId(exam.examination_id)}
												className={`group flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-5 py-4 transition-all ${
													checked
														? "border-primary-600 bg-primary-50/50 shadow-xs ring-1 ring-primary-600/30"
														: "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/40"
												}`}>
												<div className="flex flex-col gap-0.5">
													<span className="font-semibold text-sm sm:text-base text-neutral-900 capitalize leading-normal">
														{exam.examination_name}
													</span>
													{sub ? (
														<span className="text-xs text-neutral-400 font-normal leading-normal">
															{sub}
														</span>
													) : null}
												</div>

												<div
													className={`grid size-5.5 place-items-center rounded-full border transition-all shrink-0 ${
														checked
															? "border-primary-600 bg-primary-600 text-white"
															: "border-neutral-300 bg-white group-hover:border-neutral-400"
													}`}>
													{checked ? <RiCheckLine className="size-3.5 stroke-[2.5]" /> : null}
												</div>
											</div>
										);
									})
								)}
							</div>

							<Button
								onClick={handleNextStep1}
								disabled={!selectedExamId || isExamsLoading}
								className="mt-2 h-12 w-full font-bold text-sm">
								Next →
							</Button>
						</div>
					)}

					{/* ─── STEP 2 of 4: Prep Bundle Selection ─────────────────────────── */}
					{step === 2 && (
						<div className="flex flex-col gap-6">
							<div>
								<h2 className="text-2xl font-bold tracking-tight text-neutral-900 leading-snug">
									Which exam are you preparing for?
								</h2>
								<p className="text-xs text-neutral-500 mt-1">
									Choose a comprehensive exam prep package for {selectedExam?.examination_name}.
								</p>
							</div>

							<div className="flex flex-col gap-3">
								{isBundlesLoading ? (
									<div className="grid place-items-center py-12">
										<Spinner />
									</div>
								) : !bundlesResp?.data?.length ? (
									<div className="rounded-2xl border border-dashed border-neutral-200 p-8 text-center text-xs text-neutral-500">
										No exam bundles available for this category yet.
									</div>
								) : (
									bundlesResp.data.map((bundle) => {
										const checked = selectedBundleId === bundle.examinationbundle_id;

										return (
											<div
												key={bundle.examinationbundle_id}
												onClick={() => setSelectedBundleId(bundle.examinationbundle_id)}
												className={`group flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-5 py-4 transition-all ${
													checked
														? "border-primary-600 bg-primary-50/50 shadow-xs ring-1 ring-primary-600/30"
														: "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/40"
												}`}>
												<div className="flex flex-col gap-0.5">
													<div className="flex items-center gap-1.5 flex-wrap">
														<span className="font-semibold text-sm sm:text-base text-neutral-900 capitalize leading-normal">
															{bundle.examinationbundle_name} Exam Prep Bundle
														</span>
														<span className="font-bold text-xs text-primary-700">
															({formatCurrency(bundle.examinationbundle_amount)})
														</span>
													</div>
													<span className="text-xs text-neutral-400 font-normal leading-normal">
														For any {bundle.examinationbundle_max_subjects} subject combination
													</span>
												</div>

												<div
													className={`grid size-5.5 place-items-center rounded-full border transition-all shrink-0 ${
														checked
															? "border-primary-600 bg-primary-600 text-white"
															: "border-neutral-300 bg-white group-hover:border-neutral-400"
													}`}>
													{checked ? <RiCheckLine className="size-3.5 stroke-[2.5]" /> : null}
												</div>
											</div>
										);
									})
								)}
							</div>

							<Button
								onClick={handleNextStep2}
								disabled={!selectedBundleId || isBundlesLoading}
								className="mt-2 h-12 w-full font-bold text-sm">
								Next →
							</Button>
						</div>
					)}

					{/* ─── STEP 3 of 4: Pick Subjects ─────────────────────────────────── */}
					{step === 3 && (
						<div className="flex flex-col gap-6">
							<div>
								<h2 className="text-2xl font-bold tracking-tight text-neutral-900 leading-snug">
									Pick your focus and start learning with Classore!
								</h2>
								<p className="text-xs text-neutral-500 mt-1">
									Select your preferred subjects for this study bundle.
								</p>
							</div>

							<div className="space-y-3">
								<div className="flex items-center justify-between text-xs font-semibold">
									<span className="text-neutral-700">Select Courses</span>
									<span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-neutral-700">
										{selectedSubjectIds.length} / {maxSubjects} selected
									</span>
								</div>

								{isSubjectsLoading ? (
									<div className="grid place-items-center py-12">
										<Spinner />
									</div>
								) : !bundleSubjects.length ? (
									<div className="rounded-2xl border border-dashed border-neutral-200 p-8 text-center text-xs text-neutral-500">
										No subjects found for this bundle. Please check back later.
									</div>
								) : (
									<div className="flex flex-wrap gap-2.5 pt-1">
										{bundleSubjects.map((subject) => {
											const checked = selectedSubjectIds.includes(subject.subject_id);
											const isMaxReached = selectedSubjectIds.length >= maxSubjects;
											const disabled = !checked && isMaxReached;

											return (
												<button
													key={subject.subject_id}
													type="button"
													disabled={disabled}
													onClick={() => handleToggleSubject(subject.subject_id)}
													className={`flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold capitalize transition ${
														checked
															? "border-primary-600 bg-primary-600 text-white shadow-xs"
															: disabled
																? "border-neutral-200 bg-neutral-100 text-neutral-400 opacity-40 cursor-not-allowed"
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

							<Button
								onClick={handleNextStep3}
								disabled={!selectedSubjectIds.length || vetStudyPackMutation.isPending}
								className="mt-2 h-12 w-full font-bold text-sm">
								{vetStudyPackMutation.isPending ? <Spinner /> : "Continue →"}
							</Button>
						</div>
					)}

					{/* ─── STEP 4 of 4: Confirm Your Study Plan & Promo Code Checkout ──── */}
					{step === 4 && (
						<div className="flex flex-col gap-6">
							<div>
								<h2 className="text-2xl font-bold tracking-tight text-neutral-900 leading-snug">
									Confirm Your Study Plan
								</h2>
								<p className="text-xs text-neutral-500 mt-1">
									Review your chosen curriculum before activating your learning journey.
								</p>
							</div>

							{/* Summary Details */}
							<div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 p-5 text-xs">
								<div className="space-y-0.5">
									<p className="text-neutral-400 font-medium">Exam type:</p>
									<p className="font-bold text-sm text-neutral-900 capitalize">
										{selectedExam?.examination_name}
									</p>
								</div>

								<div className="space-y-0.5">
									<p className="text-neutral-400 font-medium">Prep bundle (allowed subjects):</p>
									<p className="font-bold text-sm text-neutral-900 capitalize">
										{selectedBundle?.examinationbundle_name} Prep Bundle ({maxSubjects} subjects)
									</p>
								</div>

								<div className="space-y-0.5">
									<p className="text-neutral-400 font-medium">Chosen Subjects:</p>
									<p className="font-bold text-sm text-primary-900 capitalize leading-relaxed">
										{chosenSubjectNames}
									</p>
								</div>
							</div>

							{/* Promo Code Input Matching Mobile */}
							<div className="space-y-2">
								<label className="text-xs font-semibold text-neutral-700">Promo Code (optional)</label>
								<div className="flex items-center gap-2">
									<input
										type="text"
										value={promoCode}
										disabled={!!appliedCode}
										onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
										placeholder="Enter promo code"
										className="h-10 flex-1 rounded-xl border border-neutral-200 bg-white px-3 text-xs font-mono uppercase tracking-wider disabled:bg-neutral-100"
									/>
									{appliedCode ? (
										<button
											type="button"
											onClick={handleRemovePromoCode}
											className="h-10 rounded-xl border border-red-200 bg-red-50 px-3.5 text-xs font-bold text-red-600 hover:bg-red-100">
											Remove
										</button>
									) : (
										<button
											type="button"
											onClick={handleApplyPromoCode}
											className="h-10 rounded-xl bg-neutral-900 px-4 text-xs font-bold text-white hover:bg-neutral-800">
											Apply
										</button>
									)}
								</div>
								{appliedCode ? (
									<p className="text-[11px] font-semibold text-green-700 flex items-center gap-1">
										<RiShieldCheckLine className="size-3.5" />
										✓ Code &quot;{appliedCode}&quot; applied — discount will be calculated upon activation
									</p>
								) : null}
							</div>

							{/* Activation CTA */}
							<div className="space-y-2 pt-2">
								<Button
									onClick={handleFinalSubmit}
									disabled={createStudyTimelineMutation.isPending}
									className="h-12 w-full bg-primary-600 hover:bg-primary-700 text-sm font-bold shadow-xs">
									{createStudyTimelineMutation.isPending ? <Spinner /> : "Start Learning →"}
								</Button>
								<p className="text-center text-[11px] text-neutral-400">
									Get instant access to your lessons, quizzes, and study timeline
								</p>
							</div>
						</div>
					)}
				</div>
			</AuthLayout>
		</>
	);
};

export default Page;
