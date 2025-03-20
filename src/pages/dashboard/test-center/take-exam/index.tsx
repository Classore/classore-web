import { RiArrowLeftSLine } from "@remixicon/react";
import { useRouter } from "next/router";
import React from "react";

import { useGetQuestions } from "@/queries/test-center";
import { QuestionCard } from "@/components/test-center";
import { useTestCenterStore } from "@/store/z-store";
import { Appbar } from "@/components/layouts/appbar";
import { Button } from "@/components/ui/button";
import { Seo } from "@/components/shared";
import { useTestHandler } from "@/hooks";

import { mock_questions } from "@/__mock__/questions";

const Page = () => {
	const router = useRouter();
	const id = router.query.id as string;

	const {} = useGetQuestions(id);

	const handleRouteChange = () => {
		router.events.on("routeChangeStart", () => {});
		router.back();
	};

	const { answers, startTimer } = useTestCenterStore();
	const { currentQuestion, currentQuestionIndex, onQuestionChange, totalQuestions } = useTestHandler(
		mock_questions,
		answers
	);

	React.useEffect(() => {
		startTimer();
	}, []);

	return (
		<>
			<Seo title="Test Center" />
			<div className="h-screen w-screen bg-white">
				<Appbar />
				<div className="h-[calc(100vh-80px)] w-full py-8">
					<div className="container mx-auto grid grid-cols-4 gap-x-5">
						<div className="w-full">
							<Button className="w-fit" onClick={handleRouteChange} size="sm" variant="outline">
								<RiArrowLeftSLine className="size-4" /> Quit
							</Button>
						</div>
						<QuestionCard
							currentQuestionIndex={currentQuestionIndex}
							onQuestionChange={onQuestionChange}
							question={currentQuestion}
							totalQuestions={totalQuestions}
						/>
						<div className="flex flex-col items-center gap-y-5 rounded-lg border p-3">
							<div className="flex items-center gap-x-7">
								<p className="relative text-xs text-neutral-400 before:absolute before:-left-3 before:top-1/2 before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-primary-400">
									Answered
								</p>
								<p className="relative text-xs text-neutral-400 before:absolute before:-left-3 before:top-1/2 before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-neutral-400">
									Unanswered
								</p>
							</div>
							<div className="grid w-full grid-cols-5 gap-2">
								{[...Array(totalQuestions)].map((_, index) => (
									<button
										key={index}
										onClick={() => onQuestionChange(index, true)}
										className={`grid size-6 place-items-center rounded-full text-sm ${index === currentQuestionIndex ? "bg-primary-100 text-primary-400" : "bg-neutral-100 text-neutral-400"}`}>
										{index + 1}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
