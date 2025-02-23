import React from "react";
import { toast } from "sonner";

import type { AnsweredQuestionProps } from "@/types";
import type { NewQuestionProps } from "@/types/course";

interface UseQuizProps {
	questions: NewQuestionProps[];
	onSubmit: (answered: AnsweredQuestionProps[]) => void;
	initialQuestion?: number;
	seconds: number;
}

export const useQuizHandler = ({
	questions,
	onSubmit,
	initialQuestion = 0,
	seconds = 0,
}: UseQuizProps) => {
	const [answered, setAnswered] = React.useState<AnsweredQuestionProps[]>([]);
	const [current, setCurrent] = React.useState(initialQuestion);
	const [time, setTime] = React.useState("00:00:00");

	const currentQuestion = questions?.[current];

	const isAnswered = React.useCallback(
		(id: string) => !!answered.find((answers) => answers.questionId === id),
		[answered]
	);

	const isAnswer = React.useCallback(
		(answer: string) =>
			answered.find((answers) => answers.questionId === currentQuestion.question_id)
				?.selectedAnswer === answer,
		[answered, currentQuestion?.question_id]
	);

	const selectAnswer = React.useCallback(
		(answer: string, input_content?: string) => {
			const answeredQuestion = {
				questionId: currentQuestion.question_id,
				selectedAnswer: answer,
				input_content: input_content || "",
			};

			setAnswered((prev) => {
				const existingAnswerIndex = prev.findIndex(
					(a) => a.questionId === currentQuestion.question_id
				);
				if (existingAnswerIndex !== -1) {
					return prev.map((a, i) => (i === existingAnswerIndex ? answeredQuestion : a));
				}
				return [...prev, answeredQuestion];
			});
		},
		[currentQuestion?.question_id]
	);

	const handleNavigation = React.useCallback(
		(direction: "next" | "previous" | "skip") => {
			if (direction === "next" && !isAnswered(currentQuestion?.question_id)) {
				toast.error("Please select an answer");
				return;
			}

			setCurrent((prev) => {
				if (direction === "previous" && prev > 0) return prev - 1;
				if ((direction === "next" || direction === "skip") && prev < questions.length - 1)
					return prev + 1;
				return prev;
			});
		},
		[currentQuestion?.question_id, isAnswered, questions?.length]
	);

	const handleSubmission = React.useCallback(() => {
		onSubmit(answered);
	}, [answered, onSubmit]);

	const startTimer = React.useCallback(() => {
		let remainingTime = seconds;

		const interval = setInterval(() => {
			if (remainingTime <= 0) {
				clearInterval(interval);
				// setIsRunning(false);
				setTime("00:00:00");
			} else {
				remainingTime--;
				const hours = String(Math.floor(remainingTime / 3600)).padStart(2, "0");
				const minutes = String(Math.floor((remainingTime % 3600) / 60)).padStart(2, "0");
				const seconds = String(remainingTime % 60).padStart(2, "0");

				if (hours === "00" && minutes === "00" && seconds === "00") {
					// setIsRunning(false);
					setTime("00:00:00");
					clearInterval(interval);

					// TODO: submit quiz automatically
					return;
				}

				setTime(`${hours}:${minutes}:${seconds}`);
			}
		}, 1000);

		return interval;
	}, [seconds]);

	const resetQuiz = React.useCallback(() => {
		setCurrent(0);
		setTime("00:00:00");
		startTimer();
		setAnswered([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		current,
		setCurrent,
		answered,
		currentQuestion,
		isAnswered,
		isAnswer,
		selectAnswer,
		handleNavigation,
		handleSubmission,
		resetQuiz,
		startTimer,
		time,
	};
};
