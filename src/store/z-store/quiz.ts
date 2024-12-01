import { createPersistMiddleware } from "../middleware"

import type { Maybe, QuestionProps } from "@/types"

interface QuizStore {
	// getters
	answered: QuestionProps[]
	currentIndex: Maybe<number>
	currentQuestion: Maybe<QuestionProps>
	isAnswered: (question: QuestionProps) => boolean
	questions: QuestionProps[]
	timeLeft: number
	totalQuestions: number

	// setters
	nextQuestion: () => void
	previousQuestion: () => void
	selectAnswer: (answer: string) => void
	setQuestions: (questions: QuestionProps) => void
	start: () => void
}

const initialState: QuizStore = {
	// getters
	answered: [],
	currentIndex: null,
	currentQuestion: null,
	isAnswered: () => false,
	questions: [],
	timeLeft: 0,
	totalQuestions: 0,

	// setters
	nextQuestion: () => {},
	previousQuestion: () => {},
	selectAnswer: () => {},
	setQuestions: () => {},
	start: () => {},
}

const useQuizStore = createPersistMiddleware<QuizStore>("classore-quiz-store", () => ({
	...initialState,
}))

export { useQuizStore }
