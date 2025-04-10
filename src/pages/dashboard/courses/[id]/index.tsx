// src/pages/course/[id].tsx
import { RiCloseCircleLine, RiThumbDownLine, RiThumbUpLine } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetChapter, useGetCourse, useGetProfile } from "@/queries/student";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChapterModules, QuizHistory, Resources } from "@/components/home";
import { JoinCommunityModal, RenewalModal } from "@/components/modals";
import { CourseActions } from "@/components/course/course-actions";
import { type StartCourseDto, startCourse } from "@/queries/user";
import blockchain from "@/assets/illustrations/blockchain.svg";
import trophy from "@/assets/illustrations/trophy.svg";
import { DashboardLayout } from "@/components/layouts";
import { updateModuleProgress } from "@/queries/user";
import { Button } from "@/components/ui/button";
import { capitalize, getInitials } from "@/lib";
import { useCourseHandler } from "@/hooks";
import { queryClient } from "@/providers";
import {
	AvatarGroup,
	BackBtn,
	CourseChapters,
	Seo,
	Spinner,
	VideoPlayer,
} from "@/components/shared";

type UseMutationProps = {
	courseId: string;
	payload: StartCourseDto;
};

const TABS = ["summary", "resources", "quiz history"] as const;
const AVATAR_IMAGES = Array(11).fill("/assets/images/avatar.png");

// Extracted components for better organization
const LoadingState = () => (
	<div className="flex w-full flex-col items-center justify-center gap-1 py-4">
		<Spinner variant="primary" />
		<p className="text-xs text-primary-300">Getting course details...</p>
	</div>
);

const ErrorState = ({ error, onRenewal }: { error?: any; onRenewal: () => void }) => (
	<div className="mx-auto flex w-full max-w-96 flex-col items-center justify-center gap-2 p-4">
		{error?.status === 403 ? (
			<>
				<p className="font-semibold">Access denied</p>
				<p className="text-center text-sm text-neutral-400">
					Your bundle plan has expired. Please renew your subscription to continue accessing this bundle.
				</p>
				<Button onClick={onRenewal}>Renew Plan</Button>
			</>
		) : (
			<>
				<p className="font-semibold">Error fetching chapter details</p>
				<p className="text-sm text-neutral-400">Please refresh the page to try again {error?.status}</p>
			</>
		)}
	</div>
);

const CourseVideoPlayer = ({
	isLoading,
	currentModule,
	courseId,
	chapterProgress,
}: {
	isLoading: boolean;
	currentModule: any;
	courseId: string;
	chapterProgress: number;
}) => {
	if (isLoading) {
		return (
			<div className="flex h-80 w-full flex-col items-center justify-center rounded bg-neutral-200 p-10">
				<p className="text-center text-sm text-neutral-500">Loading...</p>
			</div>
		);
	}

	const videoUrl = currentModule?.video_array?.[0]?.secure_url;

	if (videoUrl) {
		return (
			<VideoPlayer
				courseId={courseId}
				moduleId={currentModule?.id}
				moduleProgress={chapterProgress || 0}
				src={videoUrl}
			/>
		);
	}

	return (
		<div className="flex h-80 w-full flex-col items-center justify-center rounded bg-neutral-200 p-10">
			<RiCloseCircleLine className="text-neutral-400" size={48} />
			<p className="text-center text-sm text-neutral-500">
				This lesson currently has no video. <br /> Please check back later.
			</p>
		</div>
	);
};

const CourseSidebar = ({
	chapters,
	courseId,
	initialChapterId,
	overallProgress,
	course,
	setCurrentChapterId,
	currentModule,
}: {
	chapters: any[];
	courseId: string;
	initialChapterId: string;
	overallProgress: number;
	course: any;
	setCurrentChapterId: (id: string) => void;
	currentModule: any;
}) => (
	<div className="col-start-3 flex h-fit w-full flex-col gap-2">
		<CourseChapters
			chapters={chapters}
			courseId={courseId}
			current_chapter_id={initialChapterId}
			progress={overallProgress}
			dripping={course?.subject_id.chapter_dripping ?? "NO"}
			setChapter={setCurrentChapterId}
		/>

		{/* Points Card */}
		<div className="relative flex min-h-[99px] w-full flex-col gap-3 overflow-hidden rounded-lg border bg-gradient-to-r from-white to-primary-100 p-4">
			<p className="text-sm font-bold">Earn 10 Points</p>
			<p className="max-w-[65%] text-xs text-neutral-400">
				Get 10 points every time you complete a chapter
			</p>
			<div className="absolute right-0 top-3 aspect-square w-[94px]">
				<Image
					src={blockchain}
					alt="blockchain icon"
					fill
					sizes="(max-width:1024px)100%"
					className="object-contain"
				/>
			</div>
		</div>

		{/* Leaderboard Card */}
		<div className="relative flex min-h-[99px] w-full flex-col gap-3 overflow-hidden rounded-lg border bg-gradient-to-r from-white to-primary-100 p-4">
			<p className="text-sm font-bold">Leaderboard</p>
			<p className="text-xs text-neutral-400">
				Current position: <span className="font-bold text-black">1</span>
			</p>
			<Link href="/dashboard/leaderboard" className="text-sm text-primary-400 underline">
				View Leaderboard
			</Link>
			<div className="absolute right-4 top-2 aspect-square w-[134px]">
				<Image
					src={trophy}
					alt="trophy icon"
					fill
					sizes="(max-width:1024px)100%"
					className="object-contain"
				/>
			</div>
		</div>

		{/* Community Card */}
		<div className="flex w-full items-center justify-between gap-3 rounded-lg border p-4">
			<div className="flex max-w-[75%] flex-col gap-3">
				<p className="text-sm capitalize">Join {course?.subject_id.name} Community Forum</p>
				<AvatarGroup images={AVATAR_IMAGES} />
			</div>
			<JoinCommunityModal />
		</div>

		{/* Instructor Card */}
		<div className="flex w-full flex-col gap-3 rounded-lg border p-4">
			<p className="text-sm">Course Instructor</p>
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2">
					<Avatar className="size-8 rounded-lg">
						<AvatarImage src="" alt="" className="rounded-lg object-cover" />
						<AvatarFallback className="rounded-lg bg-primary-100 font-bold text-primary-400">
							{getInitials(
								currentModule?.tutor?.first_name
									? `${currentModule.tutor.first_name} ${currentModule.tutor.last_name}`
									: "Anonymous"
							)}
						</AvatarFallback>
					</Avatar>
					<p className="text-sm font-semibold capitalize">
						{currentModule?.tutor?.first_name
							? `${currentModule.tutor.first_name} ${currentModule.tutor.last_name}`
							: "Anonymous"}
					</p>
				</div>
				<Button size="special" variant="special">
					Send Message
				</Button>
			</div>
		</div>

		{/* Tags Card */}
		<div className="flex w-full flex-col gap-3 rounded-lg border p-4">
			<p className="text-sm">Tags</p>
			{/* Tags content would go here */}
		</div>
	</div>
);

const CourseContent = ({
	course,
	chapter,
	chapterId,
	moduleId,
	chapters,
	hasNextModule,
	isQuizPassed,
	setCurrentChapterId,
	setCurrentModuleId,
	nextModuleId,
	nextChapterId,
	currentModule,
	isChapterPending,
}: {
	course: any;
	chapter: any;
	chapterId: string;
	moduleId: string;
	chapters: any[];
	hasNextModule: boolean;
	isQuizPassed: (id: string) => boolean;
	setCurrentChapterId: (id: string) => void;
	setCurrentModuleId: (id: string) => void;
	nextModuleId: string;
	nextChapterId: string;
	currentModule: any;
	isChapterPending: boolean;
}) => {
	const courseId = course?.id;
	const overallProgress = React.useMemo(() => {
		if (!course?.chapters?.length) return 0;
		const totalChapters = course.chapters.length;
		const completedChaptersCount = course.chapters.reduce(
			(acc: number, chapter: { is_completed: boolean }) => acc + (chapter.is_completed ? 1 : 0),
			0
		);
		return Math.min(Math.round((completedChaptersCount / totalChapters) * 100), 100);
	}, [course?.chapters]);

	const initialChapterId = course?.chapters[0]?.id || "";

	return (
		<>
			<div className="flex w-full flex-col gap-2">
				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-4">
							<BackBtn />
							<h4 className="font-medium capitalize lg:text-xl">{course?.subject_id.name}</h4>
						</div>
						<p className="text-xs capitalize text-neutral-400">Categories / {course?.subject_id.name}</p>
					</div>

					<CourseActions
						chapters={chapters}
						currentChapterId={chapterId}
						currentModuleId={moduleId}
						currentModuleProgress={chapter?.current_module_progress_percentage ?? 0}
						hasNextModule={hasNextModule}
						isQuizPassed={isQuizPassed(moduleId)}
						setChapter={setCurrentChapterId}
						setModule={setCurrentModuleId}
					/>
				</div>
			</div>

			<div className="flex w-full flex-col gap-8 lg:grid lg:grid-cols-3">
				<div className="col-span-2 col-start-1 flex flex-col gap-8">
					<div className="absolute left-0 right-0 md:static">
						<CourseVideoPlayer
							isLoading={isChapterPending}
							currentModule={currentModule}
							courseId={String(courseId)}
							chapterProgress={chapter?.current_module_progress_percentage || 0}
						/>
					</div>

					<div className="about-course relative z-50 mb-5 flex w-full flex-col gap-4">
						<div className="flex w-full items-center justify-between">
							<h3 className="text-balance text-xl font-semibold capitalize">
								{course?.current_chapter?.name}
							</h3>
							<div className="flex items-center gap-3">
								<div className="flex items-center px-2 py-1">
									<RiThumbUpLine size={20} />
								</div>
								<div className="flex items-center px-2 py-1">
									<RiThumbDownLine size={20} />
								</div>
							</div>
						</div>

						<Tabs defaultValue="summary">
							<TabsList>
								{TABS.map((tab) => (
									<TabsTrigger key={tab} value={tab}>
										{tab}
									</TabsTrigger>
								))}
							</TabsList>

							<TabsContent value="summary">
								<ChapterModules
									chapterProgress={chapter?.current_chapter_progress_percentage ?? 0}
									courseId={String(courseId)}
									currentChapterId={String(course?.current_chapter.id)}
									currentModuleId={moduleId}
									isQuizPassed={isQuizPassed}
									nextModuleId={nextModuleId}
									nextChapterId={nextChapterId}
									onSelectModule={setCurrentModuleId}
								/>
							</TabsContent>
							<TabsContent value="resources">
								<Resources currentChapterId={chapterId} currentModuleId={moduleId} />
							</TabsContent>
							<TabsContent value="quiz history">
								<QuizHistory currentChapterId={chapterId} currentModuleId={moduleId} />
							</TabsContent>
						</Tabs>
					</div>
				</div>

				<CourseSidebar
					chapters={chapters}
					courseId={String(courseId)}
					initialChapterId={initialChapterId}
					overallProgress={overallProgress}
					course={course}
					setCurrentChapterId={setCurrentChapterId}
					currentModule={currentModule}
				/>
			</div>
		</>
	);
};

const useInitialModuleSetup = (
	id: string | undefined,
	course: any,
	chapter: any,
	setCurrentChapterId: (id: string) => void,
	setCurrentModuleId: (id: string) => void,
	moduleId: string,
	chapterId: string
) => {
	const { mutateAsync } = useMutation({
		mutationFn: updateModuleProgress,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["course"] });
			queryClient.invalidateQueries({ queryKey: ["chapter"] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const initialChapterId = course?.chapters[0]?.id || "";
	const initialModuleId = course?.chapters[0]?.modules[0]?.id || "";

	React.useEffect(() => {
		if (id) {
			if (initialChapterId && (course?.current_chapter_progress_percentage || 0) < 1) {
				mutateAsync({
					course_id: String(id),
					current_progress: 0,
					current_chapter_id: initialChapterId,
				}).then(() => {
					if (initialModuleId && (chapter?.current_module_progress_percentage || 0) < 1) {
						mutateAsync({
							course_id: String(id),
							current_progress: 0,
							current_module_id: initialModuleId,
						});
					} else {
						mutateAsync({
							course_id: String(id),
							current_progress: 0,
							current_module_id: chapter?.current_chapter_module,
						});
					}
				});
			} else {
				mutateAsync({
					course_id: String(id),
					current_progress: 0,
					current_chapter_id: course?.current_chapter.id,
				});
			}
		}
	}, [course, id, initialChapterId, initialModuleId, mutateAsync, chapter]);

	React.useEffect(() => {
		if (chapter) {
			const firstModule = chapter.modules[0];
			const currentModuleId = chapter.current_chapter_module;
			setCurrentChapterId(course?.chapters[0].id || chapterId);
			setCurrentModuleId(currentModuleId || moduleId || firstModule?.id);
		}
	}, [chapter, course?.chapters, moduleId, chapterId, setCurrentChapterId, setCurrentModuleId]);

	return { initialChapterId, initialModuleId };
};

const useStartCourse = (
	id: string | undefined,
	hasPreviousChapter: boolean,
	chapter: any,
	initialChapterId: string
) => {
	const { mutate: startCourseMutation } = useMutation({
		mutationFn: ({ courseId, payload }: UseMutationProps) => startCourse(courseId, payload),
		mutationKey: ["start-course", id],
	});

	React.useEffect(() => {
		if (
			!hasPreviousChapter &&
			initialChapterId &&
			(chapter?.current_chapter_progress_percentage ?? 0) < 0
		) {
			startCourseMutation({
				courseId: String(id),
				payload: {
					chapter_id: initialChapterId,
					current_progress: chapter?.current_module_progress_percentage || 0,
				},
			});
		}
	}, [chapter, hasPreviousChapter, id, initialChapterId, startCourseMutation]);
};

const CoursePage = () => {
	const [renewalModalOpen, setRenewalModalOpen] = React.useState(false);
	const router = useRouter();
	const { id, bundle: bundleId } = router.query;

	const { data: profile } = useGetProfile();
	const bundle = profile?.time_line.find((item) => item.exam_bundle_details.id === bundleId);

	const {
		data: course,
		isPending: isCourseLoading,
		isError,
		error,
	} = useGetCourse({
		course_id: String(id),
		enabled: !!id,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 15,
	});

	const initialChapterId = course?.chapters[0]?.id || "";
	const { data: chapter, isPending: isChapterPending } = useGetChapter({
		chapter_id: initialChapterId || "",
		enabled: !!initialChapterId,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 15,
	});

	const chapters = React.useMemo(() => course?.chapters || [], [course]);

	const {
		chapterId,
		hasNextModule,
		hasPreviousChapter,
		isQuizPassed,
		moduleId,
		nextChapterId,
		nextModuleId,
		setCurrentChapterId,
		setCurrentModuleId,
	} = useCourseHandler({
		chapters,
		courseId: String(id),
		modules: chapter?.modules || [],
		onProgressUpdate: () => console.log("updated"),
	});

	const { initialChapterId: initialChId } = useInitialModuleSetup(
		id as string,
		course,
		chapter,
		setCurrentChapterId,
		setCurrentModuleId,
		moduleId,
		chapterId
	);

	useStartCourse(id as string, hasPreviousChapter, chapter, initialChId);

	const currentModule = React.useMemo(() => {
		if (!moduleId || !chapter) return null;
		return chapter?.modules.find((module) => module.id === moduleId) || null;
	}, [chapter, moduleId]);

	React.useEffect(() => {
		if (isError && error?.status === 403) {
			setRenewalModalOpen(true);
		}
	}, [isError, error]);

	return (
		<>
			<Seo title={capitalize(course?.subject_id.name ?? "Course Details")} />
			<DashboardLayout>
				{isCourseLoading ? (
					<LoadingState />
				) : isError ? (
					<ErrorState error={error} onRenewal={() => setRenewalModalOpen(true)} />
				) : (
					<CourseContent
						course={course}
						chapter={chapter}
						chapterId={chapterId}
						moduleId={moduleId}
						chapters={chapters}
						hasNextModule={hasNextModule}
						isQuizPassed={isQuizPassed}
						setCurrentChapterId={setCurrentChapterId}
						setCurrentModuleId={setCurrentModuleId}
						nextModuleId={nextModuleId}
						nextChapterId={nextChapterId}
						currentModule={currentModule}
						isChapterPending={isChapterPending}
					/>
				)}
			</DashboardLayout>
			{bundle && (
				<RenewalModal open={renewalModalOpen} setOpen={setRenewalModalOpen} bundle={bundle} />
			)}
		</>
	);
};

export default CoursePage;
