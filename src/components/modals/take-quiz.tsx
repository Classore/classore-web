import { useGetCourse } from "@/queries/student";
import { RiMessage2Line } from "@remixicon/react";
import { useRouter } from "next/router";
import { Progress } from "../shared";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";

export const TakeQuizModal = () => {
	const router = useRouter();

	const { data } = useGetCourse({
		course_id: String(router.query.id),
	});
	const chapter = data?.chapters.find((chapter) => chapter.id === data.current_chapter.id);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="inverse" className="w-32">
					Take Quiz
				</Button>
			</DialogTrigger>
			<DialogContent className="flex w-[400px] flex-col gap-4">
				<div>
					<DialogTitle className="text-2xl font-bold capitalize">
						{chapter?.name} Quiz
					</DialogTitle>
					<DialogDescription className="font-neutral-400 text-sm">
						Ready to take your quiz?
					</DialogDescription>
				</div>
				<div className="flex w-full items-center gap-2 rounded-lg border px-4 py-6">
					<div className="w-[156px] flex-1">
						<Progress label="Previous Score" value={data?.score} color="var(--primary-400)">
							{data?.score}%
						</Progress>
					</div>
					<hr className="h-9 w-[1px] bg-neutral-300" />
					<div className="w-[156px] flex-1">
						<Progress
							label="Attempts"
							value={chapter?.no_of_quizes}
							color="var(--secondary-400)">
							{chapter?.no_of_quizes ?? "0"}/{data?.quiz_attempts_limit ?? "3"}
						</Progress>
					</div>
				</div>
				<div className="flex w-full items-center gap-2 rounded-lg border px-4 py-3 text-neutral-400">
					<RiMessage2Line className="size-4" />
					<p className="max-w-[85%] text-xs">
						Remark -{" "}
						{chapter?.quizes.length
							? `Your need to score ${chapter.bench_mark}% and above to qualify for the next chapter`
							: "N/A"}
					</p>
				</div>
				<div className="flex w-full flex-col gap-4 rounded-lg bg-neutral-100 p-4 transition-all duration-700">
					<div className="flex w-full items-center justify-between">
						<p className="text-sm font-medium text-neutral-500">Instructions</p>
						{/* <button type="button">
							<RiArrowDropDownLine
								className={`transition-transform duration-500 ${showInstructions ? "rotate-180" : ""}`}
							/>
						</button> */}
					</div>
					{/* {showInstructions && <div className="flex w-full flex-col gap-2"></div>} */}
				</div>

				<div className="flex w-full items-center justify-end gap-4 border-t border-t-neutral-200 pt-4">
					<DialogClose asChild>
						<Button className="w-32 text-sm font-medium text-neutral-400" variant="outline">
							Cancel
						</Button>
					</DialogClose>
					<Button className="w-32 text-sm">Start Quiz</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
