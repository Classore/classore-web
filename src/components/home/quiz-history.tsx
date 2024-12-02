import { RiCalendar2Line, RiCheckLine, RiCloseLine, RiFileHistoryLine } from "@remixicon/react"
import React from "react"

import type { QuizProps } from "@/types"

interface Props {
	quizzes?: QuizProps[]
}

export const QuizHistory = ({ quizzes }: Props) => {
	return (
		<div className="flex w-full flex-col rounded-lg border">
			<div className="flex items-center gap-2 p-4">
				<div className="grid size-8 place-items-center rounded-md bg-neutral-200">
					<RiCalendar2Line />
				</div>
				<div className="flex w-full flex-col gap-1">
					<p className="font-medium">Quiz History</p>
					<p className="text-xs text-neutral-400">View your quiz score here</p>
				</div>
			</div>
			<hr className="w-full bg-neutral-300" />
			{!quizzes ? (
				<div className="flex w-full flex-col items-center justify-center gap-2 p-4">
					<p className="text-sm text-neutral-400">No quizzes found</p>
				</div>
			) : (
				<div className="flex w-full flex-col">
					{quizzes.map((quiz) => (
						<Quiz key={quiz.id} quiz={quiz} />
					))}
				</div>
			)}
		</div>
	)
}

const Quiz = ({ quiz }: { quiz: QuizProps }) => {
	return (
		<div className="flex w-full items-center justify-between border-b p-4 last:border-b-0">
			<div className="flex flex-1 items-center gap-2">
				<div className="grid size-8 place-items-center rounded-md bg-neutral-200 text-neutral-400">
					<RiFileHistoryLine size={20} />
				</div>
				<p className="text-sm text-neutral-400 hover:underline">
					You scored {quiz.score}% on{" "}
					{new Date(quiz.date).toLocaleDateString("en-US", {
						month: "long",
						day: "numeric",
					})}
				</p>
			</div>
			<div
				className={`flex items-center gap-1 rounded-2xl px-3 py-[6px] text-sm ${quiz.score < 70 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
				{quiz.score < 70 ? <RiCloseLine size={20} /> : <RiCheckLine size={20} />}
				{quiz.score < 70 ? "Failed" : "Passed"}
			</div>
		</div>
	)
}
