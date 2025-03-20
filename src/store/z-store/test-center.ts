import { createPersistMiddleware } from "../middleware";

import type { TestAnswerDto } from "@/queries/test-center";

interface TestCenterStore {
	timer: number;
	isTimerRunning: boolean;
	intervalId: number | null;
	setTimer: (timer: number) => void;
	startTimer: () => void;
	stopTimer: () => void;
	answers: TestAnswerDto[];
	updateAnswers: (answer: TestAnswerDto) => void;
	undoAnswer: (answer: TestAnswerDto) => void;
	reset: () => void;
}

const initialState: TestCenterStore = {
	timer: 0,
	isTimerRunning: false,
	intervalId: null,
	setTimer: () => {},
	startTimer: () => {},
	stopTimer: () => {},
	answers: [],
	updateAnswers: () => {},
	undoAnswer: () => {},
	reset: () => {},
};

const useTestCenterStore = createPersistMiddleware<TestCenterStore>("test-center", (set, get) => ({
	...initialState,
	setTimer: (timer) => set({ timer }),
	startTimer: () => {
		if (get().isTimerRunning) return;

		const intervalId = window.setInterval(() => {
			set((state) => ({ timer: state.timer + 1 }));
		}, 1000);

		set({ intervalId, isTimerRunning: true });
	},
	stopTimer: () => {
		const { intervalId } = get();
		if (intervalId !== null) {
			window.clearInterval(intervalId);
			set({ intervalId: null, isTimerRunning: false });
		}
	},
	updateAnswers: (answer) => {
		set((state) => {
			const isExisting = state.answers.find((ans) => ans.question === answer.question);
			if (isExisting) {
				return { answers: state.answers.map((a) => (a.question === answer.question ? answer : a)) };
			} else {
				return { answers: [...state.answers, answer] };
			}
		});
	},
	undoAnswer: (answer) => {
		set((state) => {
			const isExisting = state.answers.find((ans) => ans.question === answer.question);
			if (isExisting) {
				return { answers: state.answers.filter((a) => a.question !== answer.question) };
			} else {
				return { answers: state.answers };
			}
		});
	},
	reset: () => {
		const { intervalId } = get();
		if (intervalId !== null) {
			window.clearInterval(intervalId);
		}
		set({ timer: 0, answers: [], intervalId: null, isTimerRunning: false });
	},
}));

export { useTestCenterStore };
