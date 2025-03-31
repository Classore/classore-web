import { RiCloseCircleLine, RiThumbDownLine, RiThumbUpLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import blockchain from "@/assets/illustrations/blockchain.svg";
import trophy from "@/assets/illustrations/trophy.svg";
import { CourseActions } from "@/components/course/course-actions";
import { ChapterModules, QuizHistory, Resources } from "@/components/home";
import { DashboardLayout } from "@/components/layouts";
import { JoinCommunityModal, RenewalModal } from "@/components/modals";
import {
	AvatarGroup,
	BackBtn,
	CourseChapters,
	Seo,
	Spinner,
	VideoPlayer,
} from "@/components/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalize, getInitials } from "@/lib";
import { useGetChapter, useGetCourse, useGetProfile } from "@/queries/student";
import { setChapter, useChapterStore } from "@/store/z-store/chapter";

const tabs = ["summary", "resources", "quiz history"] as const;
type Tabs = (typeof tabs)[number];

const images = [
	"/assets/images/avatar.png",
	"/assets/images/avatar.png",
	"/assets/images/avatar.png",
	"/assets/images/avatar.png",
	"/assets/images/avatar.png",
	"/assets/images/avatar.png",
	"/assets/images/avatar.png",
	"/assets/images/avatar.png",
	"/assets/images/avatar.png",
	"/assets/images/avatar.png",
	"/assets/images/avatar.png",
];

const Page = () => {
	const router = useRouter();
	const { id, bundle: bundle_id } = router.query;
	const [open, setOpen] = React.useState(false);

	const { module } = useChapterStore();
	const { data: profile } = useGetProfile();
	const bundle =
		profile && profile.time_line.find((item) => item.exam_bundle_details.id === bundle_id);

	const {
		data: course,
		isPending,
		isError,
		error,
	} = useGetCourse({
		course_id: id as string,
	});

	const { data: chapter, isPending: isChapterPending } = useGetChapter({
		chapter_id: course?.current_chapter.id ?? "",
	});

	React.useEffect(() => {
		if (course) {
			setChapter(course.current_chapter.id);
		}
	}, [course]);

	const currentModule = React.useMemo(() => {
		return chapter?.modules.find((item) => item.id === module);
	}, [chapter, module]);

	React.useEffect(() => {
		if (isError && error?.status === 403) {
			setOpen(true);
		}
	}, [isError, error]);

	return (
		<>
			<Seo title={capitalize(course?.subject_id.name ?? "Course Details")} />

			<DashboardLayout>
				{isPending ? (
					<div className="flex w-full flex-col items-center justify-center gap-1 py-4">
						<Spinner variant="primary" />
						<p className="text-xs text-primary-300">Getting course details...</p>
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

								<Button onClick={() => setOpen(true)}>Renew Plan</Button>
							</>
						) : (
							<>
								<p className="font-semibold">Error fetching chapter details</p>
								<p className="text-sm text-neutral-400">
									Please refresh the page to try again {error.status}
								</p>
							</>
						)}
					</div>
				) : (
					<>
						<div className="flex w-full flex-col gap-2">
							<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-4">
										<BackBtn />

										<h4 className="font-medium capitalize lg:text-xl">{course?.subject_id.name}</h4>
									</div>
									<p className="text-xs capitalize text-neutral-400">
										Categories / {course?.subject_id.name}
									</p>
								</div>

								<CourseActions chapters={course?.chapters} />
							</div>
						</div>

						<div className="flex w-full flex-col gap-8 lg:grid lg:grid-cols-3">
							<div className="col-span-2 col-start-1 flex flex-col gap-8">
								<div className="absolute left-0 right-0 md:static">
									{isChapterPending ? (
										<div className="flex h-80 w-full flex-col items-center justify-center rounded bg-neutral-200 p-10">
											<p className="text-center text-sm text-neutral-500">Loading...</p>
										</div>
									) : currentModule?.video_array.at(0)?.secure_url ? (
										<VideoPlayer
											moduleProgress={chapter?.current_module_progress_percentage}
											src={currentModule?.video_array.at(0)?.secure_url ?? ""}
										/>
									) : (
										<div className="flex h-80 w-full flex-col items-center justify-center rounded bg-neutral-200 p-10">
											<RiCloseCircleLine className="text-neutral-400" size={48} />
											<p className="text-center text-sm text-neutral-500">
												This lesson currently has no video. <br /> Please check back later.
											</p>
										</div>
									)}
								</div>

								<div className="about-course relative z-50 flex w-full flex-col gap-4">
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
											{tabs.map((item) => (
												<TabsTrigger key={item} value={item}>
													{item}
												</TabsTrigger>
											))}
										</TabsList>

										<TabsContent value="summary">
											<ChapterModules />
										</TabsContent>
										<TabsContent value="resources">
											<Resources />
										</TabsContent>
										<TabsContent value="quiz history">
											<QuizHistory />
										</TabsContent>
									</Tabs>
								</div>
							</div>

							<div className={`col-start-3 flex h-fit w-full flex-col gap-2`}>
								<CourseChapters
									current_chapter_id={course?.current_chapter.id}
									progress={course?.current_progress_percentage ?? 0}
									chapters={course?.chapters ?? []}
									dripping={course.subject_id.chapter_dripping ?? "NO"}
								/>

								<div className="relative flex min-h-[99px] w-full flex-col gap-3 overflow-hidden rounded-lg border bg-gradient-to-r from-white to-primary-100 p-4">
									<p className="text-sm font-bold">Earn 10 Points</p>
									<p className="max-w-[65%] text-xs text-neutral-400">
										Get 10 points every time you complete a chapter
									</p>
									<div className="absolute right-0 top-3 aspect-square w-[94px]">
										<Image
											src={blockchain}
											alt="desginer color"
											fill
											sizes="(max-width:1024px)100%"
											className="object-contain"
										/>
									</div>
								</div>
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
											alt="desginer color"
											fill
											sizes="(max-width:1024px)100%"
											className="object-contain"
										/>
									</div>
								</div>
								<div className="flex w-full items-center justify-between gap-3 rounded-lg border p-4">
									<div className="flex max-w-[75%] flex-col gap-3">
										<p className="text-sm capitalize">Join {course?.subject_id.name} Community Forum</p>
										<AvatarGroup images={images} />
									</div>

									<JoinCommunityModal />
								</div>

								<div className="flex w-full flex-col gap-3 rounded-lg border p-4">
									<p className="text-sm">Course Instructor</p>
									<div className="flex w-full items-center justify-between">
										<div className="flex items-center gap-2">
											<Avatar className="size-8 rounded-lg">
												<AvatarImage src="" alt="" className="rounded-lg object-cover" />
												<AvatarFallback className="rounded-lg bg-primary-100 font-bold text-primary-400">
													{getInitials(
														currentModule?.tutor?.first_name
															? `${currentModule?.tutor?.first_name} ${currentModule?.tutor?.last_name}`
															: "Anonymous"
													)}
												</AvatarFallback>
											</Avatar>
											<p className="text-sm font-semibold capitalize">
												{currentModule?.tutor?.first_name
													? `${currentModule?.tutor?.first_name} ${currentModule?.tutor?.last_name}`
													: "Anonymous"}
											</p>
										</div>
										<Button size="special" variant="special">
											Send Message
										</Button>
									</div>
								</div>

								<div className="flex w-full flex-col gap-3 rounded-lg border p-4">
									<p className="text-sm">Tags</p>
								</div>
							</div>
						</div>
					</>
				)}
			</DashboardLayout>

			{bundle && <RenewalModal open={open} setOpen={setOpen} bundle={bundle} />}
		</>
	);
};

export default Page;
