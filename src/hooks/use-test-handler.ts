import { toast } from "sonner";
import React from "react";

import type { TestAnswerDto } from "@/queries/test-center";
import type { QuestionProps } from "@/types/test";
import { validate } from "@/lib/validation";

export const useTestHandler = (questions: QuestionProps[], answers: TestAnswerDto[]) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

	const totalQuestions = React.useMemo(() => questions.length, [questions]);
	const currentQuestion = React.useMemo(
		() => questions[currentQuestionIndex],
		[questions, currentQuestionIndex]
	);

	const currentAnswer = answers[currentQuestionIndex];

	const hasValidAnswer = React.useCallback(() => {
		if (!currentAnswer) return false;

		if (
			currentQuestion.question_type === "MULTIPLE_CHOICE" ||
			currentQuestion.question_type === "YES_OR_NO"
		) {
			return !!currentAnswer.option;
		}

		if (currentQuestion.question_type === "SPEAKING") {
			return !!currentAnswer.media_upload;
		}

		return !!currentAnswer.input_content;
	}, [currentAnswer, currentQuestion]);

	const onQuestionChange = React.useCallback(
		(index: number, skip = false, direction?: "next" | "previous") => {
			if (!direction) {
				if (!skip && !hasValidAnswer()) {
					toast.error("Please answer the question to continue");
					return;
				}
				setCurrentQuestionIndex(index);
				return;
			}

			if (direction === "next") {
				if (!skip && !hasValidAnswer()) {
					toast.error("Please answer the question to continue");
					return;
				}

				if (currentQuestionIndex < totalQuestions - 1) {
					setCurrentQuestionIndex((prev) => prev + 1);
				}
			} else {
				if (currentQuestionIndex > 0) {
					setCurrentQuestionIndex((prev) => prev - 1);
				}
			}
		},
		[currentQuestionIndex, hasValidAnswer, totalQuestions]
	);

	const onSubmit = React.useCallback(() => {
		const errors = validate(questions, answers);
		const messages = Object.values(errors).filter(Boolean);
		if (messages.length > 0) {
			toast.error(messages[0]);
			return false;
		}

		return true;
	}, [questions, answers]);

	return {
		currentQuestion,
		currentQuestionIndex,
		onQuestionChange,
		onSubmit,
		totalQuestions,
		hasValidAnswer,
	};
};
