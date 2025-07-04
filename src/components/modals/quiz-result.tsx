import { RiMessage2Line } from "@remixicon/react";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";

import type { SubmitQuizResp } from "@/queries/user";
import { Progress } from "../shared";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";

type QuizResultModalProps = {
	currentChapter: string;
	hasNextChapter: boolean;
	hasNextModule: boolean;
	nextChapterId: string;
	nextModuleId: string;
	onNext: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	result: SubmitQuizResp | null;
	resetQuiz: () => void;
};

export const QuizResultModal = ({
	hasNextChapter,
	hasNextModule,
	nextChapterId,
	nextModuleId,
	onNext,
	open,
	resetQuiz,
	result,
	setOpen,
}: QuizResultModalProps) => {
	const router = useRouter();
	const id = router.query.id as string;

	const attempts_percentage = result
		? ((result.attempts_limit - result.attempts_left) / (result.attempts_limit ?? 3)) * 100
		: 0;

	const retakeQuiz = () => {
		resetQuiz();
		setTimeout(() => {
			setOpen(false);
		}, 500);
	};

	const goToNextLesson = React.useCallback(() => {
		if (hasNextModule) {
			onNext();
			router.replace(`/dashboard/courses/${id}?moduleId=${nextModuleId}`);
		} else if (!hasNextModule && hasNextChapter) {
			onNext();
			router.replace(`/dashboard/courses/${nextChapterId}`);
		} else {
			toast.success("You have completed all the lessons in this course");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasNextChapter, hasNextModule, id, nextChapterId, nextModuleId, onNext]);

	const onRetakeLesson = () => {
		setOpen(false);
		resetQuiz();
		// router.back();
		router.replace("/dashboard/courses");
	};

	if (!result) {
		return null;
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				variant={result.is_passed ? "success" : "destructive"}
				className="flex w-[400px] flex-col gap-4">
				<div>
					<p className="text-[10px] uppercase tracking-widest text-neutral-400">{result.chapter_name}</p>
					<DialogTitle className="text-2xl font-bold capitalize">{result.module_name} Quiz</DialogTitle>
					<DialogDescription className="font-neutral-400 text-sm">
						See your performance
					</DialogDescription>
				</div>
				<div className="flex w-full items-center gap-2 rounded-lg border bg-white px-4 py-6">
					<div className="w-[156px] flex-1">
						<Progress label="Quiz Score" value={result.score ?? 0} color="#6F42C1" svgFill="#F1ECF9">
							{result.score ?? 0}%
						</Progress>
					</div>
					<hr className="h-9 w-[1px] bg-neutral-300" />
					<div className="w-[156px] flex-1">
						<Progress label="Attempts" value={attempts_percentage} color="#F67F36" svgFill="#FEF3EB">
							{result.attempts_limit - result.attempts_left}/{result.attempts_limit ?? 3}
						</Progress>
					</div>
				</div>
				<div className="flex w-full items-center gap-2 rounded-lg bg-neutral-100 px-4 py-3 text-neutral-400">
					<RiMessage2Line className="size-4" />
					<p className="max-w-[85%] text-xs">
						Remark -{" "}
						{result.is_passed ? (
							<>
								Congratulations! You <span className="font-bold text-[#319F43]">Passed</span> the Quiz.
							</>
						) : (
							<>
								You <span className="font-bold text-[#E33629]">failed</span> the Quiz. Score 70% or higher
								to pass
							</>
						)}
					</p>
				</div>

				<div className="flex w-full items-center justify-end gap-4 border-t border-t-neutral-200 pt-4">
					{result.is_passed ? (
						<>
							<Button
								className="w-fit text-sm font-medium text-neutral-400"
								disabled={result.attempts_left <= 0}
								onClick={retakeQuiz}
								size="sm"
								variant="outline">
								Retake Quiz
							</Button>

							{/* TODO: redirect to course page and set the next module */}
							<Button className="w-fit text-sm" onClick={goToNextLesson} size="sm">
								{hasNextModule ? "Go to Next Module" : "Go to Next Chapter"}
							</Button>
						</>
					) : (
						<>
							<Button
								onClick={onRetakeLesson}
								className="w-fit text-sm font-medium text-neutral-400"
								size="sm"
								variant="outline">
								Retake Lesson
							</Button>
							<Button
								disabled={result.attempts_left <= 0}
								className="w-fit text-sm"
								size="sm"
								onClick={retakeQuiz}>
								Retake Quiz
							</Button>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};
