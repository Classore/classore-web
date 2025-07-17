"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LeftSidebarProps {
	selectedExamType: string | null;
	selectedSubject: string | null;
	onSubjectSelect: (examType: string, subject: string) => void;
}

const examData = {
	JAMB: ["Mathematics", "English", "Chemistry", "Physics"],
	TOEFL: ["Reading", "Listening", "Speaking", "Writing"],
	GRE: ["Verbal Reasoning", "Quantitative Reasoning", "Analytical Writing"],
};

export function LeftSidebar({
	selectedExamType,
	selectedSubject,
	onSubjectSelect,
}: LeftSidebarProps) {
	const [expandedExams, setExpandedExams] = useState<string[]>(["JAMB"]);
	const [searchQuery, setSearchQuery] = useState("");

	const toggleExam = (examType: string) => {
		setExpandedExams((prev) =>
			prev.includes(examType) ? prev.filter((e) => e !== examType) : [...prev, examType]
		);
	};

	return (
		<div className="flex w-64 flex-col border-r border-gray-200 bg-gray-50">
			<div className="border-b border-gray-200 p-4">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
					<input
						placeholder="My Exams"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="bg-white pl-10"
					/>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto">
				{Object.entries(examData).map(([examType, subjects]) => (
					<div key={examType} className="border-b border-gray-100">
						<Button
							variant="ghost"
							className="h-auto w-full justify-start px-4 py-3 font-medium"
							onClick={() => toggleExam(examType)}>
							{expandedExams.includes(examType) ? (
								<ChevronDown className="mr-2 h-4 w-4" />
							) : (
								<ChevronRight className="mr-2 h-4 w-4" />
							)}
							{examType}
						</Button>

						{expandedExams.includes(examType) && (
							<div className="pb-2">
								{subjects.map((subject) => (
									<Button
										key={subject}
										variant="ghost"
										className={cn(
											"h-auto w-full justify-start px-8 py-2 text-sm",
											selectedSubject === subject && selectedExamType === examType
												? "bg-purple-100 text-purple-700"
												: "text-gray-600 hover:bg-gray-100"
										)}
										onClick={() => onSubjectSelect(examType, subject)}>
										{subject}
									</Button>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
