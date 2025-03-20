import { RiQuestionLine, RiTimeLine } from "@remixicon/react";
import React from "react";

import type { TestAnswerDto } from "@/queries/test-center";
import { AudioPlayer, AudioRecorder } from "../shared";
import { useTestCenterStore } from "@/store/z-store";
import type { QuestionProps } from "@/types/test";
import { getFormattedTime } from "@/lib";
import { Button } from "../ui/button";

const INDEX_MAPPING: Record<number, string> = {
	0: "a)",
	1: "b)",
	2: "c)",
	3: "d)",
};

interface QuestionBaseProps {
	question: QuestionProps;
	currentAnswerValue: string;
	onAnswerUpdate: (answer: string | File) => void;
}

interface QuestionCardProps {
	currentQuestionIndex: number;
	onQuestionChange: (index: number, skip?: boolean, direction?: "next" | "previous") => void;
	question: QuestionProps;
	totalQuestions: number;
}

const FillInTheGapQuestion: React.FC<QuestionBaseProps> = ({
	currentAnswerValue,
	onAnswerUpdate,
}) => (
	<div className="h-10 w-full rounded-lg border focus-within:border-primary-400">
		<input
			value={currentAnswerValue}
			onChange={(e) => onAnswerUpdate(e.target.value)}
			className="h-full w-full rounded-lg border-none text-sm outline-none ring-0 focus:border-none focus:outline-none focus:ring-0"
			placeholder="Type your answer here"
		/>
	</div>
);

const ShortAnswerQuestion: React.FC<QuestionBaseProps> = ({
	currentAnswerValue,
	onAnswerUpdate,
}) => (
	<div className="h-32 w-full rounded-lg border focus-within:border-primary-400">
		<textarea
			value={currentAnswerValue}
			onChange={(e) => onAnswerUpdate(e.target.value)}
			className="h-full w-full resize-none rounded-lg border-none text-sm outline-none ring-0 focus:border-none focus:outline-none focus:ring-0"
			placeholder="Type your answer here"
		/>
	</div>
);

const MultipleChoiceOptions: React.FC<QuestionBaseProps & { currentOption?: string }> = ({
	question,
	currentOption,
	onAnswerUpdate,
}) => (
	<div className="w-full space-y-2">
		<p className="text-sm text-neutral-400">Select an answer</p>
		<div className="grid w-full grid-cols-1 gap-y-4">
			{question.options.map((option, index) => (
				<div key={option.id} className="flex h-11 w-full items-center rounded-lg border px-3">
					<p className="flex-1 text-sm">
						{INDEX_MAPPING[index]} {option.content}
					</p>
					<input
						checked={option.id === currentOption}
						onChange={() => onAnswerUpdate(option.id)}
						type="checkbox"
						className="size-5 cursor-pointer rounded-full border border-neutral-400 outline-none focus:outline-none focus:ring-0"
					/>
				</div>
			))}
		</div>
	</div>
);

const ListeningQuestion: React.FC<QuestionBaseProps & { currentOption?: string }> = ({
	question,
	currentAnswerValue,
	onAnswerUpdate,
}) => (
	<div className="w-full space-y-2">
		{question.media && <AudioPlayer source={question.media} />}

		<ShortAnswerQuestion
			question={question}
			currentAnswerValue={currentAnswerValue}
			onAnswerUpdate={onAnswerUpdate}
		/>
	</div>
);

const SpeakingQuestion: React.FC<QuestionBaseProps> = ({ question, onAnswerUpdate }) => {
	const [audioState, setAudioState] = React.useState<"idle" | "recording" | "recorded">("idle");
	const [audioFile, setAudioFile] = React.useState<Blob | null>(null);

	return (
		<div className="w-full">
			<AudioRecorder
				audioFile={audioFile}
				onAudioChange={(blob) => {
					setAudioFile(blob);
					const file = new File([blob], `speaking-answer-${question.id}.webm`, { type: "audio/webm" });
					onAnswerUpdate(file);
				}}
				onStateChange={setAudioState}
				state={audioState}
			/>
		</div>
	);
};

export const QuestionCard = ({
	currentQuestionIndex,
	onQuestionChange,
	question,
	totalQuestions,
}: QuestionCardProps) => {
	const { answers, timer, updateAnswers } = useTestCenterStore();

	const handleUpdateAnswer = React.useCallback(
		(answer: string | File) => {
			const payload: TestAnswerDto = {
				question: question.id,
			};

			switch (question.question_type) {
				case "FILL_IN_THE_GAP":
				case "SHORT_ANSWER":
				case "LISTENING":
					payload.input_content = answer as string;
					break;
				case "SPEAKING":
					payload.media_upload = answer as File;
					break;
				case "MULTIPLE_CHOICE":
				case "YES_OR_NO":
					payload.option = answer as string;
					break;
			}

			updateAnswers(payload);
		},
		[question, updateAnswers]
	);

	const currentAnswer = answers[currentQuestionIndex];

	const currentAnswerValue = React.useMemo(() => {
		if (!currentAnswer) return "";

		if (question.question_type === "MULTIPLE_CHOICE" || question.question_type === "YES_OR_NO") {
			return currentAnswer.input_content || "";
		}

		return currentAnswer.input_content || "";
	}, [answers, currentQuestionIndex, question.question_type, currentAnswer]);

	const currentOption = React.useMemo(() => {
		return currentAnswer?.option || "";
	}, [currentAnswer]);

	const renderQuestionComponent = () => {
		switch (question.question_type) {
			case "FILL_IN_THE_GAP":
				return (
					<FillInTheGapQuestion
						question={question}
						currentAnswerValue={currentAnswerValue}
						onAnswerUpdate={handleUpdateAnswer}
					/>
				);

			case "SHORT_ANSWER":
				return (
					<ShortAnswerQuestion
						question={question}
						currentAnswerValue={currentAnswerValue}
						onAnswerUpdate={handleUpdateAnswer}
					/>
				);

			case "LISTENING":
				return (
					<ListeningQuestion
						question={question}
						currentAnswerValue={currentAnswerValue}
						currentOption={currentOption}
						onAnswerUpdate={handleUpdateAnswer}
					/>
				);

			case "MULTIPLE_CHOICE":
			case "YES_OR_NO":
				return (
					<MultipleChoiceOptions
						question={question}
						currentAnswerValue={currentAnswerValue}
						currentOption={currentOption}
						onAnswerUpdate={handleUpdateAnswer}
					/>
				);

			case "SPEAKING":
				return (
					<SpeakingQuestion
						question={question}
						currentAnswerValue={currentAnswerValue}
						onAnswerUpdate={handleUpdateAnswer}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<div className="col-span-2 space-y-4 rounded-lg border bg-gradient-to-b from-primary-100 via-white to-white p-5 py-4">
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-x-1 text-neutral-400">
					<RiQuestionLine className="size-5" />
					<p className="text-xs font-medium">
						QUESTION {currentQuestionIndex + 1} OF {totalQuestions}
					</p>
				</div>
				<div className="flex items-center gap-x-1">
					<RiTimeLine className="size-5" />
					<p className="text-xs font-medium">{getFormattedTime(timer)}</p>
				</div>
			</div>

			<div className="w-full space-y-8 rounded-lg border bg-neutral-50 px-4 py-6">
				<p className="font-medium text-neutral-400"></p>
				<p className="font-medium">{question.content}</p>
			</div>

			{renderQuestionComponent()}

			<div className="flex w-full items-center justify-between border-t pt-4">
				<Button
					className="w-fit"
					onClick={() => onQuestionChange(currentQuestionIndex + 1, true, "next")}
					size="sm"
					variant="text">
					Skip Question
				</Button>
				<div className="flex items-center gap-x-4">
					<Button
						onClick={() => onQuestionChange(currentQuestionIndex - 1, false, "previous")}
						className="w-fit"
						disabled={currentQuestionIndex === 0}
						size="sm"
						variant="outline">
						Previous
					</Button>
					<Button
						className="w-fit"
						onClick={() => onQuestionChange(currentQuestionIndex + 1, false, "next")}
						size="sm">
						{currentQuestionIndex === totalQuestions - 1 ? "Submit" : "Next"}
					</Button>
				</div>
			</div>
		</div>
	);
};
