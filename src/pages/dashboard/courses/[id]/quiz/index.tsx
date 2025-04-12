import { skipToken, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RiQuestionLine } from "@remixicon/react";
import { useRouter } from "next/router";
import Image from "next/image";
import * as React from "react";
import { toast } from "sonner";

import { BooleanChoiceAnswerType } from "@/components/course/answers-type/boolean-choice";
import { ShortAnswerAnswerType } from "@/components/course/answers-type/short-answer";
import { SingleChoiceAnswerType } from "@/components/course/answers-type/single-choice";
import { fetchQuestions, submitQuiz, type SubmitQuizResp } from "@/queries/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuizResultModal } from "@/components/modals/quiz-result";
import { SubmitQuizModal } from "@/components/modals/submit-quiz";
import { useGetChapter, useGetCourse } from "@/queries/student";
import { useCourse, usePreventNavigation, useQuizHandler } from "@/hooks";
import { QuitQuizModal } from "@/components/modals/quit-quiz";
import { QuizTimer } from "@/components/course/quiz-timer";
import { Seo, Spinner } from "@/components/shared";
import type { ChapterModuleProps } from "@/types";
import { Button } from "@/components/ui/button";
import { capitalize, getInitials } from "@/lib";
import { useUserStore } from "@/store/z-store";

const items = [
	{ label: "answered", color: "var(--primary-400)" },
	{ label: "unanswered", color: "var(--neutral-400)" },
];

const Page = () => {
	const queryClient = useQueryClient();

	const [result, setResult] = React.useState<SubmitQuizResp | null>(null);
	const [open, setOpen] = React.useState(false);
	const [openSubmitQuiz, setOpenSubmitQuiz] = React.useState(false);

	const { user } = useUserStore();
	const router = useRouter();

	const { id, module_id } = router.query;

	const {
		data: course,
		isError,
		error,
	} = useGetCourse({
		course_id: String(id),
	});

	const { data: chapter } = useGetChapter({
		chapter_id: String(course?.current_chapter.id),
	});
	const lesson = chapter?.modules.find((module) => module.id === String(module_id));

	const chapterId = React.useMemo(() => {
		if (!chapter) return "";
		return chapter.id;
	}, [chapter]);

	const modules = React.useMemo(() => {
		if (!course) return [];
		return course.chapters.reduce((acc, chapter) => {
			if (!chapter.modules.length) return acc;
			const modules = chapter.modules.map((module) => module);
			return [...acc, ...modules];
		}, [] as ChapterModuleProps[]);
	}, []);

	const nextChapterId = React.useMemo(() => {
		if (!course) return "";
		const currentIndex = course.chapters.findIndex((chapter) => chapter.id === chapterId);
		if (currentIndex === course.chapters.length - 1) return "";
		return course.chapters[currentIndex + 1]?.id ?? "";
	}, [chapterId, course]);

	const nextModuleId = React.useMemo(() => {
		if (!modules.length || !lesson) return "";
		const currentIndex = modules.findIndex((module) => module.id === lesson.id);
		if (currentIndex === modules.length - 1) return "";
		return modules[currentIndex + 1]?.id ?? "";
	}, [modules, lesson]);

	const { data: questions, isPending } = useQuery({
		queryKey: ["questions", { module_id: lesson?.id }],
		queryFn: lesson?.id ? () => fetchQuestions({ module_id: String(lesson?.id) }) : skipToken,
		staleTime: Infinity,
		gcTime: Infinity,
	});

	const { mutate, isPending: isSubmitting } = useMutation({
		mutationKey: ["submit-quiz"],
		mutationFn: submitQuiz,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["chapter", { chapter_id: String(course?.current_chapter.id) }],
			});
			toast.success("Quiz submitted successfully");
			setResult(data.data);

			setTimeout(() => {
				setOpenSubmitQuiz(false);
				setOpen(true);
			}, 100);
		},
		onError: () => toast.error("Something went wrong! Please try again"),
	});

	const { hasNextChapter, hasNextModule, onNext } = useCourse({
		chapterId: "",
		chapters: course?.chapters || [],
		courseId: String(id),
		moduleId: String(module_id),
	});

	const {
		current,
		currentQuestion,
		handleNavigation,
		handleSubmission,
		isAnswer,
		isAnswered,
		selectAnswer,
		setCurrent,
		answered,
		resetQuiz,
		startTimer,
		time,
	} = useQuizHandler({
		seconds: (chapter?.timer_hour ?? 0) * 3600 + (chapter?.timer_minute ?? 0) * 60,
		questions: questions?.data.data ?? [],
		onSubmit: (answered) => {
			const payload = {
				module: String(module_id),
				answers: answered.map((answer) => ({
					question: answer.questionId,
					option: answer.selectedAnswer,
					input_content: answer.input_content,
				})),
			};
			mutate(payload);
		},
	});

	usePreventNavigation(true, `/dashboard/courses/`);

	React.useEffect(() => {
		console.log({ currentQuestion });
	}, [currentQuestion]);

	return (
		<>
			<Seo title="Quiz" noIndex />
			<div className="flex h-full w-screen flex-col bg-white">
				<nav className="mx-auto h-20 w-full items-center border-b px-4 py-4">
					<div className="container flex h-full w-full items-center justify-between">
						<div className="relative hidden h-[30px] w-[135px] px-6 lg:flex">
							<Image
								src="/assets/images/classore.png"
								alt="classore"
								fill
								sizes="(max-width:1024px)100%"
							/>
						</div>

						<div className="flex flex-col items-start justify-center lg:items-center">
							<p className="text-[10px] uppercase tracking-widest text-neutral-400">
								{course?.subject_id.name} - {chapter?.name}
							</p>
							<h5 className="text-xl font-bold capitalize">{lesson?.title} Quiz</h5>
						</div>

						<div className="flex items-center gap-2">
							<Avatar className="size-10 bg-black">
								<AvatarImage src={user?.profile_image} alt={user?.first_name} />
								<AvatarFallback className="text-white">
									{getInitials(`${user?.first_name} ${user?.last_name}`)}
								</AvatarFallback>
							</Avatar>
							<div className="hidden flex-col items-start lg:flex">
								<p className="text-sm font-medium capitalize leading-none">
									{user?.first_name} {user?.last_name}
								</p>
								<p className="text-xs text-neutral-400">{user?.email}</p>
							</div>
						</div>
					</div>
				</nav>

				{isPending ? (
					<div className="flex w-full items-center justify-center gap-2 p-4 text-primary-300">
						<Spinner variant="primary" />
						<p className="text-sm">Getting lesson quiz...</p>
					</div>
				) : isError ? (
					<div className="mx-auto flex w-full max-w-96 flex-col items-center justify-center gap-2 p-4">
						{error?.status === 403 ? (
							<>
								<p className="font-semibold">Access denied</p>
								<p className="text-center text-sm text-neutral-400">
									Your bundle plan has expired. Please renew your subscription to continue accessing this
									bundle.
								</p>
							</>
						) : (
							<>
								<p className="font-semibold">Error fetching chapter details</p>
								<p className="text-sm text-neutral-400">Please refresh the page to try again</p>
							</>
						)}
					</div>
				) : (
					<div className="h-full w-full px-4 py-8">
						<div className="container mx-auto grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-4">
							<QuitQuizModal />

							<div className="col-span-2 flex h-fit w-full flex-col gap-4 rounded-xl border border-neutral-200 bg-gradient-to-b from-primary-100 from-0% via-white via-15% to-white to-100% p-5">
								<div className="flex w-full items-center justify-between">
									<div className="flex items-center gap-1 text-neutral-400">
										<RiQuestionLine size={20} />
										<p className="text-sm font-semibold">
											QUESTION {current + 1} OF {questions?.data.meta.itemCount}
										</p>
									</div>

									<QuizTimer time={time} startTimer={startTimer} />
								</div>
								<div className="grid min-h-[140px] w-full place-items-center rounded-lg border bg-white">
									<p className="max-w-[85%] text-center font-medium">
										{capitalize(currentQuestion?.question_content) ?? ""}
									</p>

									{currentQuestion?.question_images.length ? (
										currentQuestion?.question_images.length > 1 ? (
											<div className="grid grid-cols-2 gap-4 p-4">
												{currentQuestion.question_images.map((image, index) => (
													<div key={index} className="relative rounded-md p-2">
														<p className="absolute left-2 top-2 rounded-full bg-neutral-300 p-2 text-sm font-bold">
															{index + 1}
														</p>

														<Image
															key={image}
															src={image}
															alt="question image"
															className="h-36 w-full object-cover"
														/>
													</div>
												))}
											</div>
										) : (
											<div className="p-4">
												<Image
													src={currentQuestion.question_images[0]}
													alt="question image"
													className="h-52 w-full object-cover"
												/>
											</div>
										)
									) : null}
								</div>

								{currentQuestion?.question_question_type.trim() === "MULTICHOICE" ? (
									<SingleChoiceAnswerType
										options={currentQuestion.options}
										selectAnswer={selectAnswer}
										isAnswer={isAnswer}
									/>
								) : currentQuestion?.question_question_type.trim() === "YES_OR_NO" ? (
									<BooleanChoiceAnswerType
										options={currentQuestion.options}
										selectAnswer={selectAnswer}
										isAnswer={isAnswer}
									/>
								) : currentQuestion?.question_question_type.trim() === "FILL_IN_THE_GAP" ? (
									<ShortAnswerAnswerType
										answered={answered}
										selectAnswer={selectAnswer}
										questionId={currentQuestion.question_id}
									/>
								) : null}

								<div className="flex w-full flex-col items-center justify-between border-t border-t-neutral-200 pt-4 lg:flex-row">
									<Button
										onClick={() => handleNavigation("skip")}
										className="w-32 text-sm font-medium text-secondary-300 shadow-none hover:shadow-none"
										variant="ghost">
										Skip Question
									</Button>

									<div className="flex items-center gap-4">
										<Button
											className="w-32 text-sm text-neutral-400"
											onClick={() => handleNavigation("previous")}
											variant="outline">
											Previous
										</Button>
										{questions?.data.meta.itemCount === current + 1 ? (
											<>
												<Button
													onClick={() => setOpenSubmitQuiz(true)}
													className="w-40"
													disabled={isSubmitting}>
													Submit
												</Button>

												<SubmitQuizModal
													handleSubmission={handleSubmission}
													isSubmitting={isSubmitting}
													open={openSubmitQuiz}
													setOpen={setOpenSubmitQuiz}
													noOfQuestions={questions?.data.data.length || 0}
													noOfAnswered={answered.length}
												/>
											</>
										) : (
											<Button className="w-32 text-sm" onClick={() => handleNavigation("next")}>
												Next
											</Button>
										)}
									</div>
								</div>
							</div>

							<div className="flex h-fit w-full flex-col items-center gap-5 rounded-lg border p-3">
								<div className="flex items-center justify-center gap-5">
									{items.map((item) => (
										<div
											key={item.label}
											className="flex items-center gap-1 text-xs capitalize text-neutral-400">
											<span style={{ background: item.color }} className="size-2 rounded-full"></span>
											{item.label}
										</div>
									))}
								</div>

								<div className="grid w-full grid-cols-5 gap-x-9 gap-y-2">
									{questions?.data.data?.map((question, index) => (
										<button
											onClick={() => setCurrent(index)}
											key={question.question_id}
											className={`grid size-6 place-items-center rounded-full text-sm ${isAnswered(question.question_id) ? "bg-primary-100 text-primary-500" : "bg-neutral-100 text-neutral-500"}`}>
											{index + 1}
										</button>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			<QuizResultModal
				currentChapter={chapterId}
				hasNextChapter={hasNextChapter}
				hasNextModule={hasNextModule}
				nextChapterId={nextChapterId}
				nextModuleId={nextModuleId}
				onNext={onNext}
				open={open}
				result={result}
				setOpen={setOpen}
				resetQuiz={resetQuiz}
			/>
		</>
	);
};

export default Page;
