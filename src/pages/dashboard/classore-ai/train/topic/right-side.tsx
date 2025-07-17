"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RightSidebarProps {
	isOpen: boolean;
	onToggle: () => void;
	selectedSubject: string | null;
	selectedTopic: string | null;
	onTopicSelect: (topic: string) => void;
}

const topicData: Record<string, string[]> = {
	Mathematics: [
		"Algebra",
		"Arithmetic",
		"Linear Equations",
		"Quadratic Equations",
		"Functions and Graphs",
		"Trigonometry",
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

export function RightSidebar({
	isOpen,
	onToggle,
	selectedSubject,
	selectedTopic,
	onTopicSelect,
}: RightSidebarProps) {
	const topics = selectedSubject ? topicData[selectedSubject] || [] : [];

	return (
		<div
			className={cn(
				"flex border-l border-gray-200 bg-white transition-all duration-300",
				isOpen ? "w-64" : "w-12"
			)}>
			<div className="flex flex-1 flex-col">
				{isOpen && (
					<>
						<div className="border-b border-gray-200 p-4">
							<h3 className="font-medium text-gray-900">Select a Topic</h3>
							{selectedSubject && <p className="mt-1 text-sm text-gray-500">{selectedSubject}</p>}
						</div>

						<div className="flex-1 overflow-y-auto p-2">
							{topics.map((topic) => (
								<Button
									key={topic}
									variant="ghost"
									className={cn(
										"mb-1 h-auto w-full justify-start px-3 py-2 text-sm",
										selectedTopic === topic ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
									)}
									onClick={() => onTopicSelect(topic)}>
									{topic}
								</Button>
							))}

							{topics.length === 0 && selectedSubject && (
								<p className="p-3 text-sm text-gray-500">No topics available for {selectedSubject}</p>
							)}
						</div>
					</>
				)}
			</div>

			<div className="flex w-12 items-start justify-center pt-4">
				<Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
					{isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
				</Button>
			</div>
		</div>
	);
}
