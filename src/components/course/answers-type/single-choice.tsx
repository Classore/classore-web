import { capitalize } from "@/lib";
import type { NewQuestionProps } from "@/types/course";

type Props = {
	options: NewQuestionProps["options"];
	selectAnswer: (answer: string) => void;
	isAnswer: (answer: string) => boolean;
};

export const SingleChoiceAnswerType = ({ options, selectAnswer, isAnswer }: Props) => {
	return (
		<div className="flex w-full flex-col gap-4">
			<p className="text-sm">Select only one answer</p>
			<div className="grid w-full grid-cols-2 gap-4">
				{options?.map((answer, index) => (
					<button
						key={index}
						onClick={() => selectAnswer(answer.id)}
						className={`flex w-full items-center justify-between rounded-md border p-3 ${isAnswer(answer.id) ? "border-primary-400 shadow-[0px_0px_0px_2px_#6F42C11A,0px_0px_0px_1px_#6F42C140]" : "border-neutral-200 hover:bg-neutral-50"}`}>
						<p className="flex max-w-[85%] items-center gap-2 text-left text-sm">
							({String.fromCharCode(97 + options.indexOf(answer))}){"  "}
							<span className="text-neutral-700">{capitalize(answer.content)}</span>
						</p>
						<span
							className={`relative size-5 rounded-full border-2 before:absolute before:left-1/2 before:top-1/2 before:size-3 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-primary-400 ${isAnswer(answer.id) ? "border-primary-400 before:block" : "border-neutral-200 before:hidden"}`}></span>
					</button>
				))}
			</div>
		</div>
	);
};
