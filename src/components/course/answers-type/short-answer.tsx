import type { AnsweredQuestionProps } from "@/types";

type Props = {
	selectAnswer: (answer: string, input_content?: string) => void;
	questionId: string;
	answered: AnsweredQuestionProps[];
};

export const ShortAnswerAnswerType = ({ selectAnswer, answered, questionId }: Props) => {
	const answer = answered.find((answer) => answer.questionId === questionId);

	return (
		<div className="flex w-full flex-col gap-2">
			<p className="text-sm">Type your answer in the field below</p>

			<textarea
				value={answer?.input_content}
				onChange={(e) => selectAnswer("", e.target.value)}
				placeholder="Enter your answer here"
				className="text flex min-h-[120px] w-full resize-none rounded-md border border-neutral-200 bg-transparent px-4 py-3 transition-all placeholder:text-neutral-300 focus:border-primary-300 focus:shadow-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[invalid=true]:border-red-600 data-[invalid=true]:bg-error/5"
			/>
		</div>
	);
};
