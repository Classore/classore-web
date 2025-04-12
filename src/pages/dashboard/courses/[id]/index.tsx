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
// import { updateModuleProgress } from "@/queries/user";
import { Button } from "@/components/ui/button";
import { capitalize, getInitials } from "@/lib";
import { useCourse } from "@/hooks";
// import { queryClient } from "@/providers";
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

const AVATAR_IMAGES = Array(11).fill("/assets/images/avatar.png");
const TABS = ["summary", "resources", "quiz history"] as const;

const Page = () => {
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
	const initialModuleId = course?.chapters[0]?.modules[0]?.id || "";

	const {
		data: chapter,
		isPending: isChapterPending,
		isError: isChapterError,
	} = useGetChapter({
		chapter_id: initialChapterId || "",
		enabled: !!initialChapterId,
		refetchIntervalInBackground: true,
		refetchInterval: 1000 * 15,
	});

	const chapters = React.useMemo(() => course?.chapters || [], [course]);

	const {
		chapterId,
		chapterList,
		courseProgress,
		currentChapter,
		currentChapterProgress,
		currentModule,
		currentModuleProgress,
		hasNextChapter,
		hasNextModule,
		hasPreviousChapter,
		hasPreviousModule,
		isQuizPassed,
		moduleId,
		moduleList,
		nextChapterId,
		nextModuleId,
		onNext,
		setCurrentChapterId,
		setCurrentModuleId,
	} = useCourse({
		chapters,
		courseId: String(id),
		onProgressUpdate: async () => console.log("updated"),
	});

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

	React.useEffect(() => {
		setCurrentModuleId(initialModuleId);
	}, []);

	React.useEffect(() => {
		if (isError && error?.status === 403) {
			setRenewalModalOpen(true);
		}
	}, [isError, error]);

	const renderLoadingState = () => (
		<div className="flex w-full flex-col items-center justify-center gap-1 py-4">
			<Spinner variant="primary" />
			<p className="text-xs text-primary-300">Getting course details...</p>
		</div>
	);

	const renderErrorState = () => (
		<div className="mx-auto flex w-full max-w-96 flex-col items-center justify-center gap-2 p-4">
			{error?.status === 403 ? (
				<>
					<p className="font-semibold">Access denied</p>
					<p className="text-center text-sm text-neutral-400">
						Your bundle plan has expired. Please renew your subscription to continue accessing this
						bundle.
					</p>
					<Button onClick={() => setRenewalModalOpen(true)}>Renew Plan</Button>
				</>
			) : (
				<>
					<p className="font-semibold">Error fetching chapter details</p>
					<p className="text-sm text-neutral-400">
						Please refresh the page to try again {error?.status}
					</p>
				</>
			)}
		</div>
	);

	const renderVideoPlayer = () => {
		if (isChapterPending) {
			return (
				<div className="flex aspect-[16/9] w-full flex-col items-center justify-center rounded bg-neutral-200 p-10">
					<p className="text-center text-sm text-neutral-500">Loading...</p>
				</div>
			);
		}

		const videoUrl = currentModule?.video_array?.[0]?.secure_url;

		if (videoUrl) {
			return (
				<VideoPlayer
					courseId={String(id)}
					moduleId={currentModule?.id}
					moduleProgress={chapter?.current_module_progress_percentage || 0}
					src={videoUrl}
				/>
			);
		}

		return (
			<div className="flex aspect-[16/9] w-full flex-col items-center justify-center rounded bg-neutral-200 p-10">
				<RiCloseCircleLine className="text-neutral-400" size={48} />
				<p className="text-center text-sm text-neutral-500">
					This lesson currently has no video. <br /> Please check back later.
				</p>
			</div>
		);
	};

	const renderSidebar = () => (
		<div className="col-start-3 flex h-fit w-full flex-col gap-2">
			<CourseChapters
				chapters={chapterList}
				courseId={String(id)}
				current_chapter_id={currentChapter?.id ?? ""}
				hasNextChapter={hasNextChapter}
				hasPreviousChapter={hasPreviousChapter}
				progress={courseProgress}
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

	const renderMainContent = () => (
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
						currentModuleProgress={currentModuleProgress}
						hasNextModule={hasNextModule}
						isQuizPassed={isQuizPassed}
						onNext={onNext}
						setChapter={setCurrentChapterId}
						setModule={setCurrentModuleId}
					/>
				</div>
			</div>

			<div className="flex w-full flex-col gap-8 lg:grid lg:grid-cols-3">
				<div className="col-span-2 col-start-1 flex flex-col gap-8">
					<div className="absolute left-0 right-0 md:static">{renderVideoPlayer()}</div>

					<div className="about-course relative z-50 mb-5 flex w-full flex-col gap-4">
						<div className="flex w-full items-center justify-between">
							<h3 className="text-balance text-xl font-semibold capitalize">{chapter?.name}</h3>
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
									chapter={chapter}
									chapterProgress={currentChapterProgress}
									currentChapterId={chapterId}
									currentModuleId={moduleId}
									hasNextChapter={hasNextChapter}
									hasNextModule={hasNextModule}
									hasPreviousChapter={hasPreviousChapter}
									hasPreviousModule={hasPreviousModule}
									isError={isChapterError}
									isPending={isChapterPending}
									moduleList={moduleList}
									nextChapterId={nextChapterId}
									nextModuleId={nextModuleId}
									onSelectChapter={setCurrentChapterId}
									onSelectModule={setCurrentModuleId}
								/>
							</TabsContent>
							<TabsContent value="resources">
								<Resources currentModule={currentModule} />
							</TabsContent>
							<TabsContent value="quiz history">
								<QuizHistory currentModule={currentModule} />
							</TabsContent>
						</Tabs>
					</div>
				</div>

				{renderSidebar()}
			</div>
		</>
	);

	return (
		<>
			<Seo title={capitalize(course?.subject_id.name ?? "Course Details")} />
			<DashboardLayout>
				{isCourseLoading ? renderLoadingState() : isError ? renderErrorState() : renderMainContent()}
			</DashboardLayout>
			{bundle && (
				<RenewalModal open={renewalModalOpen} setOpen={setRenewalModalOpen} bundle={bundle} />
			)}
		</>
	);
};

export default Page;
