import React from "react"

import type { QuestionProps, QuizProps } from "@/types"

interface QuizState {
	currentQuestionIndex: number
	selectedAnswers: Record<string | number, string>
	skippedQuestions: Set<string | number>
}

interface QuizHookResult {
	currentIndex: number
	currentQuestion: QuestionProps
	isAnswered: boolean
	isFirstQuestion: boolean
	isLastQuestion: boolean
	nextQuestion: () => boolean
	previousQuestion: () => boolean
	selectAnswer: (answer: string) => void
	selectQuestion: (index: number) => void
	skipQuestion: () => void
	stats: {
		answered: number
		unanswered: number
		skipped: number
	}
	totalQuestions: number
	timeLeft: number
}

interface QuizConfig {
	quiz: QuizProps
	totalTime: number
}

export const useQuizManager = ({ quiz, totalTime }: QuizConfig): QuizHookResult => {
	const [timeLeft, setTimeLeft] = React.useState(totalTime)
	const [quizState, setQuizState] = React.useState<QuizState>({
		currentQuestionIndex: 0,
		selectedAnswers: {},
		skippedQuestions: new Set(),
	})

	const totalQuestions = React.useMemo(() => quiz.questions.length, [quiz])

	const currentQuestion = React.useMemo(
		() => quiz.questions[quizState.currentQuestionIndex],
		[quiz.questions, quizState.currentQuestionIndex]
	)

	React.useEffect(() => {
		if (timeLeft <= 0) return

		const timerId = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timerId)
					return 0
				}
				return prevTime - 1
			})
		}, 1000)

		return () => clearInterval(timerId)
	}, [timeLeft])

	const selectAnswer = React.useCallback(
		(answer: string) => {
			setQuizState((prev) => ({
				...prev,
				selectedAnswers: {
					...prev.selectedAnswers,
					[currentQuestion.id]: answer,
				},
				skippedQuestions: new Set(prev.skippedQuestions).delete(currentQuestion.id)
					? prev.skippedQuestions
					: prev.skippedQuestions,
			}))
		},
		[currentQuestion]
	)

	const nextQuestion = React.useCallback(() => {
		if (quizState.currentQuestionIndex < totalQuestions - 1) {
			setQuizState((prev) => ({
				...prev,
				currentQuestionIndex: prev.currentQuestionIndex + 1,
			}))
			return true
		}
		return false
	}, [quizState.currentQuestionIndex, totalQuestions])

	const previousQuestion = React.useCallback(() => {
		if (quizState.currentQuestionIndex > 0) {
			setQuizState((prev) => ({
				...prev,
				currentQuestionIndex: prev.currentQuestionIndex - 1,
			}))
			return true
		}
		return false
	}, [quizState.currentQuestionIndex])

	const skipQuestion = React.useCallback(() => {
		setQuizState((prev) => ({
			...prev,
			skippedQuestions: new Set(prev.skippedQuestions).add(currentQuestion.id),
			currentQuestionIndex:
				prev.currentQuestionIndex < totalQuestions - 1
					? prev.currentQuestionIndex + 1
					: prev.currentQuestionIndex,
		}))
	}, [currentQuestion, totalQuestions])

	const selectQuestion = React.useCallback(
		(index: number) => {
			if (index >= 0 && index < totalQuestions) {
				setQuizState((prev) => ({
					...prev,
					currentQuestionIndex: index,
				}))
			}
		},
		[totalQuestions]
	)

	const isAnswered = (questionId: string | number) => {
		return quizState.selectedAnswers[questionId] !== undefined
	}

	return {
		currentIndex: quizState.currentQuestionIndex,
		currentQuestion,
		isAnswered: isAnswered(currentQuestion.id),
		isFirstQuestion: quizState.currentQuestionIndex === 0,
		isLastQuestion: quizState.currentQuestionIndex === totalQuestions - 1,
		nextQuestion,
		previousQuestion,
		selectAnswer,
		selectQuestion,
		skipQuestion,
		stats: {
			answered: Object.keys(quizState.selectedAnswers).length,
			unanswered:
				totalQuestions -
				Object.keys(quizState.selectedAnswers).length -
				quizState.skippedQuestions.size,
			skipped: quizState.skippedQuestions.size,
		},
		totalQuestions,
		timeLeft,
	}
}
