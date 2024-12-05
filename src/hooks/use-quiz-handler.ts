import { toast } from "sonner"
import React from "react"

import type { AnsweredQuestionProps, QuestionProps } from "@/types"

interface UseQuizProps {
	questions: QuestionProps[]
	onSubmit: (answered: AnsweredQuestionProps[]) => void
	initialQuestion?: number
}

export const useQuizHandler = ({ questions, onSubmit, initialQuestion = 0 }: UseQuizProps) => {
	const [answered, setAnswered] = React.useState<AnsweredQuestionProps[]>([])
	const [current, setCurrent] = React.useState(initialQuestion)

	const currentQuestion = questions?.[current]

	const isAnswered = React.useCallback(
		(id: string) => !!answered.find((answers) => answers.questionId === id),
		[answered]
	)

	const isAnswer = React.useCallback(
		(answer: string) =>
			answered.find((answers) => answers.questionId === currentQuestion.id)?.selectedAnswer === answer,
		[answered, currentQuestion?.id]
	)

	const selectAnswer = React.useCallback(
		(answer: string) => {
			const answeredQuestion = {
				questionId: currentQuestion.id,
				selectedAnswer: answer,
			}

			setAnswered((prev) => {
				const existingAnswerIndex = prev.findIndex((a) => a.questionId === currentQuestion.id)
				if (existingAnswerIndex !== -1) {
					return prev.map((a, i) => (i === existingAnswerIndex ? answeredQuestion : a))
				}
				return [...prev, answeredQuestion]
			})
		},
		[currentQuestion?.id]
	)

	const handleNavigation = React.useCallback(
		(direction: "next" | "previous" | "skip") => {
			if (direction === "next" && !isAnswered(currentQuestion.id)) {
				toast.error("Please select an answer")
				return
			}

			setCurrent((prev) => {
				if (direction === "previous" && prev > 0) return prev - 1
				if ((direction === "next" || direction === "skip") && prev < questions.length - 1)
					return prev + 1
				return prev
			})
		},
		[currentQuestion?.id, isAnswered, questions?.length]
	)

	const handleSubmission = React.useCallback(() => {
		// // Check if current question is answered
		// if (!isAnswered(currentQuestion.id)) {
		// 	toast.error("Please select an answer for the current question")
		// 	return
		// }

		const unansweredCount = questions.length - answered.length
		let shouldSubmit = true

		if (unansweredCount > 0) {
			shouldSubmit = window.confirm(
				`You have ${unansweredCount} question${
					unansweredCount > 1 ? "s" : ""
				} unanswered. Are you sure you want to submit?`
			)
		} else {
			shouldSubmit = window.confirm("Are you sure you want to submit the quiz?")
		}

		if (shouldSubmit) {
			onSubmit(answered)
		}
	}, [questions?.length, answered, onSubmit])

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
	}
}
