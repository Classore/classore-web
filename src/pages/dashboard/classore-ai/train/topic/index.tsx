import { AILayout } from "@/components/layouts/ai";
import { Search, Seo } from "@/components/shared";
import Image from "next/image";
import tutor from "@/assets/illustrations/ai-tutor.png";
import classoreai from "@/assets/illustrations/classore-ai.svg";
import {
	RiArrowDropRightLine,
	RiArrowLeftDoubleFill,
	RiArrowUpLine,
	RiCloseLine,
	RiHand,
	RiMicLine,
	RiSearchLine,
	RiVolumeUpLine,
} from "@remixicon/react";
import { useState } from "react";
import { cn } from "@/lib";

const Page = () => {
	const examData = {
		JAMB: ["Mathematics", "English", "Chemistry", "Physics"],
		TOEFL: ["Reading", "Listening", "Speaking", "Writing"],
		GRE: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
	};

	const topicData: Record<string, string[]> = {
		Mathematics: [
			"Algebra",
			"Arithmetic",
			"Quadratic Equations",
			"Functions and Graphs",
			"Trigonometry",
			"Matrices",
			"Calculus Introduction",
		],
		English: [
			"Grammar Fundamentals",
			"Reading Comprehension",
			"Essay Writing",
			"Vocabulary Building",
			"Literature Analysis",
		],
		Chemistry: [
			"Atomic Structure",
			"Chemical Bonding",
			"Periodic Table",
			"Chemical Reactions",
			"Organic Chemistry",
		],
		Physics: [
			"Mechanics",
			"Thermodynamics",
			"Electricity and Magnetism",
			"Waves and Optics",
			"Modern Physics",
		],
	};

	const [expandedExams, setExpandedExams] = useState<string[]>(["JAMB"]);
	const [selectedExamType, setSelectedExamType] = useState<string>("");
	const [selectedSubject, setSelectedSubject] = useState<string>("");
	const [selectedTopic, setSelectedTopic] = useState<string>("");

	const topics = selectedSubject ? topicData[selectedSubject] || [] : [];

	const toggleExam = (examType: string) => {
		setExpandedExams((prev) =>
			prev.includes(examType) ? prev.filter((e) => e !== examType) : [...prev, examType]
		);
	};

	const onTopicSelect = (topic: string) => {
		setSelectedTopic(topic);
	};

	const onSubjectSelect = (examType: string, subject: string) => {
		setSelectedExamType(examType);
		setSelectedSubject(subject);
	};

	return (
		<>
			<Seo title="Train AI" />
			<AILayout>
				<div className="flex">
					{/* LEFT SIDE */}
					<div className="mt-4 hidden w-64 pl-[18px] lg:block">
						<div className="relative border-b-[0.5px] border-neutral-200">
							<input
								placeholder="My Exams"
								className="border-none !bg-transparent bg-white pl-4 text-sm placeholder:text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-0"
							/>
							<RiSearchLine className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
						</div>
						<div className="flex-1 overflow-y-auto">
							{Object.entries(examData).map(([examType, subjects]) => (
								<div key={examType} className="border-b border-gray-100">
									<button
										className="flex w-full items-center justify-start gap-x-2 px-2.5 py-2 text-sm font-medium"
										onClick={() => toggleExam(examType)}>
										<RiArrowDropRightLine
											className={`size-5 ${expandedExams.includes(examType) ? "rotate-90" : ""}`}
										/>
										{examType}
									</button>
									{expandedExams.includes(examType) && (
										<div className="pb-2">
											{subjects.map((subject) => (
												<div
													key={subject}
													className={cn(
														"py-2 pl-9 text-sm",
														selectedSubject === subject && selectedExamType === examType
															? "rounded-md bg-primary-200 text-[#6F42C1]"
															: "text-neutral-500"
													)}
													onClick={() => onSubjectSelect(examType, subject)}>
													<div className="cursor-pointer">{subject}</div>
												</div>
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
					{/* MAIN  */}
					<div className="mx-auto flex w-full max-w-[800px] flex-col items-center justify-center">
						<div className="flex w-full flex-col items-center justify-center">
							<div className="relative rounded-2xl border-4 border-[#6F3918]">
								<div className="rounded-2xl bg-[#FEF2EB] p-4">
									<div className="rounded-2xl border-4 border-[rgb(111,57,24)]">
										<div className="h-[400px] w-[800px] overflow-y-auto rounded-2xl bg-white px-14 py-8">
											<div className="absolute bottom-12 left-14 flex cursor-pointer gap-x-2">
												<div className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200">
													<RiHand className="size-6" />
												</div>
												<div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-neutral-200">
													<RiVolumeUpLine className="size-6" />
												</div>
											</div>
											<div className="h-52"></div>
										</div>
										<div className="absolute right-7 -translate-y-[53%]">
											<Image src={tutor} alt="tutor" width="305" height="309" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="z-[50] mt-20 w-full">
							<div className="mb-1 flex items-center gap-x-2">
								<Image src={classoreai} alt="classoreai" width="20" height="20" />
								<h3 className="font-medium text-neutral-900">Hi, Enter your question below</h3>
							</div>
							<div className="rounded-[15px] border-neutral-200 bg-[#FFFFFF] p-4">
								<textarea
									rows={1}
									className="w-full resize-none rounded-t-[15px] border-none bg-transparent p-3 pt-2 leading-relaxed text-gray-900 focus:outline-none focus:ring-0"
								/>
								<div className="flex justify-between">
									<button className="w-fit rounded-[7px] bg-neutral-100 p-2">
										<RiMicLine className="size-6" />
									</button>
									<button className="w-fit rounded-[7px] bg-neutral-100 p-2">
										<RiArrowUpLine className="size-6" />
									</button>
								</div>
							</div>
						</div>
					</div>
					{/* RIGHT SIDE */}
					<div className="hidden lg:block">
						{/* <div className="flex cursor-pointer items-center gap-x-2 rounded-s-[30px] bg-white py-[15.5px] pl-5 pr-[60px]">
							<RiArrowLeftDoubleFill />
							<h3 className="text-neutral-900">Select a Topic</h3>
						</div> */}
						<div className="hidden w-[300px] divide-y divide-neutral-100 bg-white lg:block">
							<div className="flex items-center justify-between px-5 py-[15.5px]">
								<h3 className="text-neutral-900">Select a Topic</h3>
								<RiCloseLine className="size-5 cursor-pointer text-neutral-400" />
							</div>
							<div className="h-screen p-5">
								<div className="relative rounded-[10px] border border-neutral-200 bg-neutral-100">
									<RiSearchLine className="absolute left-3 top-1/2 size-5 -translate-y-1/2 transform text-neutral-400" />
									<input
										placeholder="Search here"
										className="rounded-[10px] border-none bg-neutral-100 py-2 pl-11 text-sm placeholder:text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-0"
									/>
								</div>
								<div className="mt-4 flex flex-wrap gap-2">
									{topics.map((topic) => (
										<div
											key={topic}
											className="w-fit rounded-[10px] border border-neutral-200 px-3 py-2 text-neutral-500"
											onClick={() => onTopicSelect(topic)}>
											{topic}
										</div>
									))}

									{topics.length === 0 && selectedSubject && (
										<p className="p-3 text-sm text-gray-500">No topics available for {selectedSubject}</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</AILayout>
		</>
	);
};
export default Page;
