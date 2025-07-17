"use client";
import { AILayout } from "@/components/layouts/ai";
import { Seo } from "@/components/shared";
import tutor from "@/assets/illustrations/ai-tutor.png";
import classoreai from "@/assets/illustrations/classore-ai.svg";
import Image from "next/image";
import { RiArrowUpLine } from "@remixicon/react";
import { steps } from "@/__mock__/train-ai";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useUserStore } from "@/store/z-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib";
import { TypingIndicator } from "@/components/dashboard";

const Page = () => {
	const router = useRouter();
	const { user } = useUserStore();
	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState<any>({});
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	// Ref for the scrollable chat container
	const chatContainerRef = useRef<HTMLDivElement>(null);

	const trainAiStep = steps[currentStep];
	const isLastStep = currentStep === steps.length - 1;
	const isTopicStep = trainAiStep?.id === "topic";
	const isReadyStep = trainAiStep?.id === "ready";

	// Auto-scroll to bottom when messages change
	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			const container = chatContainerRef.current;
			// Force a reflow to ensure DOM is updated
			container.offsetHeight;

			container.scrollTo({
				top: container.scrollHeight,
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			scrollToBottom();
		}, 300);

		return () => clearTimeout(timer);
	}, [currentStep, answers]);

	// Get first 5 options for topic step
	const getDisplayOptions = () => {
		if (isTopicStep && Array.isArray(trainAiStep.options)) {
			return trainAiStep.options.slice(0, 5);
		}
		return trainAiStep?.options || [];
	};

	const handleSelect = (value: any) => {
		const stepId = steps[currentStep].id;
		const newAnswers = { ...answers, [stepId]: value };
		setAnswers(newAnswers);
		console.log(`Selected value: ${value} for step ${stepId}`);

		// Special handling for topic step - skip to ready step
		if (stepId === "topic") {
			setIsDrawerOpen(false);
		}
	};

	const handleDrawerOptionSelect = (value: any) => {
		handleSelect(value);
	};

	const handleShowMore = () => {
		setIsDrawerOpen(true);
	};

	function nextStep() {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			console.log("You have completed all steps.");
		}
	}

	function prevStep() {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	}

	const handleReadySubmit = () => {
		// Navigate to another page when ready is submitted
		console.log("Navigating to next page with answers:", answers);
		router.push("/dashboard/classore-ai/train/topic"); // Replace with your desired route
	};

	const handleSubmit = () => {
		if (isReadyStep) {
			handleReadySubmit();
		} else {
			nextStep();
		}
	};

	const renderMessages = () => {
		return steps.slice(0, currentStep + 1).map((step, index) => (
			<div key={step.id} className="mb-6 space-y-8">
				{/* AI Message */}
				<div className="mb-2 flex w-full max-w-[80%] items-start gap-x-3">
					<Image src={classoreai} alt="AI Tutor" width={36} height={36} className="rounded-full" />
					<div className="rounded-[10px] rounded-ss-[1px] border border-neutral-200 px-3 py-2 text-lg text-neutral-900">
						{steps[index].id === "level" ? (
							<>
								Hi <span className="capitalize">{user?.first_name || "there"}</span>, <br /> {step.content}
							</>
						) : (
							<span className="capitalize">{step.content}</span>
						)}
					</div>
				</div>
				{/* User Response (if answered) */}
				<div className="ml-auto flex w-full max-w-[80%] flex-row justify-end gap-x-3 self-end">
					<div className="rounded-[10px] rounded-se-[1px] border border-neutral-200 px-3 py-2 text-lg text-neutral-900">
						{index < currentStep && answers[step.id] ? (
							<span>{step.options.find((opt) => opt.id === answers[step.id])?.label}</span>
						) : (
							<TypingIndicator />
						)}
					</div>
					<Avatar className="size-10 bg-black">
						<AvatarImage src={user?.profile_image} alt={user?.first_name} />
						<AvatarFallback className="uppercase text-white">
							{getInitials(`${user?.first_name} ${user?.last_name}`)}
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
		));
	};

	return (
		<>
			<Seo title="Train AI" />
			<AILayout>
				<div className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center px-3 pt-6 md:px-8">
					<div className="flex w-full flex-col items-center justify-center">
						<div className="relative rounded-2xl border-4 border-[#6F3918]">
							<div className="rounded-2xl bg-[#FEF2EB] p-4">
								<div className="rounded-2xl border-4 border-[#6F3918]">
									<div
										ref={chatContainerRef}
										className="h-[400px] w-[800px] overflow-y-auto scroll-smooth rounded-2xl bg-white px-14 pt-8">
										{renderMessages()}
										{/* Spacer div to ensure proper scrolling */}
										<div className="h-52"></div>
									</div>
									<div className="absolute right-7 -translate-y-[53%]">
										<Image src={tutor} alt="tutor" width="305" height="309" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="z-[50] mt-[85px] w-full">
						<div className="flex items-center gap-x-2">
							<Image src={classoreai} alt="classoreai" width="20" height="20" />
							<h3 className="font-medium text-neutral-900">{trainAiStep?.title}</h3>
						</div>
						<div className="mt-1 rounded-[15px] border border-neutral-200 bg-white p-4">
							<div className="flex flex-wrap gap-2">
								{/* Regular options or first 5 for topic step */}
								{getDisplayOptions().map((option) => (
									<button
										key={option.id}
										className={`rounded-[10px] border px-3 py-2 text-neutral-500 transition-colors ${
											answers[steps[currentStep].id] === option.id
												? "select:text-primary-300 border-[#D2C4EC] bg-primary-50 focus:text-primary-300 active:text-primary-300"
												: "border-neutral-200 !text-neutral-500"
										}`}
										onClick={() => handleSelect(option.id)}>
										{option.label}
									</button>
								))}
								{/* Show More button for topic step */}
								{isTopicStep && (
									<Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
										<SheetTrigger asChild>
											<button
												className="rounded-[10px] border border-neutral-200 px-3 py-2 text-neutral-500 transition-colors hover:bg-neutral-50"
												onClick={handleShowMore}>
												Show more
											</button>
										</SheetTrigger>
										<SheetContent side="right" className="w-[400px] sm:w-[540px]">
											<SheetHeader>
												<SheetTitle>Select a topic</SheetTitle>
											</SheetHeader>
											<div className="mt-6 flex max-h-[80vh] flex-col gap-2 overflow-y-auto">
												{trainAiStep.options?.map((option) => (
													<button
														key={option.id}
														className={`rounded-[10px] border px-4 py-3 text-left transition-colors ${
															answers[steps[currentStep].id] === option.id
																? "border-[#D2C4EC] bg-primary-50 text-primary-600"
																: "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
														}`}
														onClick={() => handleDrawerOptionSelect(option.id)}>
														{option.label}
													</button>
												))}
											</div>
										</SheetContent>
									</Sheet>
								)}
							</div>
							<div className="mt-4 flex justify-end">
								<button
									onClick={handleSubmit}
									disabled={!answers[steps[currentStep].id]}
									className={`w-fit rounded-[7px] p-2 ${
										!answers[steps[currentStep].id]
											? "cursor-not-allowed bg-neutral-100"
											: "cursor-pointer bg-primary-300 text-white hover:bg-primary-400"
									}`}>
									<RiArrowUpLine
										className={`size-6 ${answers[steps[currentStep].id] ? "text-white" : "text-neutral-900"}`}
									/>
								</button>
							</div>
						</div>
					</div>
				</div>
			</AILayout>
		</>
	);
};

export default Page;
