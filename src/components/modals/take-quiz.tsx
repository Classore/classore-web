import { RiMessage2Line } from "@remixicon/react"
import { Progress } from "../shared"
import { Button } from "../ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog"

export const TakeQuizModal = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="inverse">Take Quiz</Button>
			</DialogTrigger>
			<DialogContent className="flex w-[400px] flex-col gap-4">
				<div>
					<DialogTitle className="text-2xl font-bold">Chapter 1 Quiz</DialogTitle>
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
						{/* <button type="button">
							<RiArrowDropDownLine
								className={`transition-transform duration-500 ${showInstructions ? "rotate-180" : ""}`}
							/>
						</button> */}
					</div>
					{/* {showInstructions && <div className="flex w-full flex-col gap-2"></div>} */}
				</div>
				<div className="flex w-full items-center justify-end gap-4">
					<DialogClose asChild>
						<Button className="w-fit font-medium text-neutral-400" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button className="w-fit">Start Quiz</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
