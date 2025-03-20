import type { QuestionProps, QuestionTypeProps } from "@/types/test";
import type { TestAnswerDto } from "@/queries/test-center";

const QUESTION_TYPE_VALIDATIONS = {
	INPUT_CONTENT: ["FILL_IN_THE_GAP", "SHORT_ANSWER"] as QuestionTypeProps[],
	OPTION_CONTENT: ["MULTIPLE_CHOICE", "YES_OR_NO"] as QuestionTypeProps[],
	MEDIA_CONTENT: ["SPEAKING"] as QuestionTypeProps[],
} as const;

interface ValidationErrors {
	[key: string]: string;
}

export const validate = (
	questions: QuestionProps[],
	answers: TestAnswerDto[]
): ValidationErrors => {
	return questions.reduce((errors: ValidationErrors, question, index) => {
		const answer = answers.find((ans) => ans.question === question.id);
		const questionNumber = index + 1;

		if (!answer) {
			errors[question.id] = `Please select an option for question ${questionNumber}`;
			return errors;
		}

		const validationRules = {
			INPUT_CONTENT: () =>
				!answer.input_content &&
				QUESTION_TYPE_VALIDATIONS.INPUT_CONTENT.includes(question.question_type),
			OPTION_CONTENT: () =>
				!answer.option && QUESTION_TYPE_VALIDATIONS.OPTION_CONTENT.includes(question.question_type),
			MEDIA_CONTENT: () =>
				!answer.media_upload &&
				QUESTION_TYPE_VALIDATIONS.MEDIA_CONTENT.includes(question.question_type),
		};

		const getErrorMessage = (type: string): string => {
			const messages = {
				INPUT_CONTENT: `Please enter an answer for question ${questionNumber}`,
				OPTION_CONTENT: `Please select an option for question ${questionNumber}`,
				MEDIA_CONTENT: `Please record the answer for question ${questionNumber}`,
			};
			return messages[type as keyof typeof messages];
		};

		Object.entries(validationRules).forEach(([type, rule]) => {
			if (rule()) {
				errors[question.id] = getErrorMessage(type);
			}
		});

		return errors;
	}, {});
};
