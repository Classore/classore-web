import { RiArrowDropDownLine, RiCloseLine, RiMessage2Line } from "@remixicon/react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/shared";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
	chapterId: string;
	onOpenChange: (open: boolean) => void;
	open: boolean;
	setShowInstructions: (showInstructions: boolean) => void;
	showInstructions: boolean;
}

export const StartQuiz = ({
	chapterId,
	onOpenChange,
	open,
	setShowInstructions,
	showInstructions,
}: Props) => {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button size="sm" variant="inverse">
					Take Quiz
				</Button>
			</DialogTrigger>
			<DialogContent className="flex w-[400px] flex-col gap-4">
				<div className="flex w-full items-center justify-end">
					<button onClick={() => onOpenChange(false)}>
						<RiCloseLine size={24} />
					</button>
				</div>
				<div>
					<DialogTitle className="text-2xl font-bold">Chapter {chapterId} Quiz</DialogTitle>
					<DialogDescription className="font-neutral-400 text-sm">
						Ready to take your quiz?
					</DialogDescription>
				</div>
				<div className="flex w-full items-center gap-2 rounded-lg border px-4 py-6">
					<div className="w-[156px] flex-1">
						<Progress label="Previous Score" value={75} color="var(--primary-400)">
							75%
						</Progress>
					</div>
					<hr className="h-9 w-[1px] bg-neutral-300" />
					<div className="w-[156px] flex-1">
						<Progress label="Attempts" value={33.33} color="var(--secondary-400)">
							1/3
						</Progress>
					</div>
				</div>
				<div className="flex w-full items-center gap-2 rounded-lg border px-4 py-5 text-neutral-400">
					<RiMessage2Line className="size-6" />
					<p className="max-w-[85%] text-sm">
						Remark - Your need to score 70% and above to qualify for the next chapter
					</p>
				</div>
				<div className="flex w-full flex-col gap-4 rounded-lg bg-neutral-200 p-4 transition-all duration-700">
					<div className="flex w-full items-center justify-between">
						<p className="text-sm font-medium">Instructions</p>
						<button onClick={() => setShowInstructions(!showInstructions)}>
							<RiArrowDropDownLine
								className={`transition-transform duration-500 ${showInstructions ? "rotate-180" : ""}`}
							/>
						</button>
					</div>
					{showInstructions && <div className="flex w-full flex-col gap-2"></div>}
				</div>
				<div className="flex w-full items-center justify-end gap-4">
					<Button className="w-fit" onClick={() => onOpenChange(false)} variant="outline">
						Cancel
					</Button>
					<Button className="w-fit">
						<Link href={`/dashboard/courses/quiz?id=${chapterId}`}>Start Quiz</Link>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
