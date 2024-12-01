import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import {
	RiArrowLeftSLine,
	RiArrowRightSLine,
	RiArrowDropDownLine,
	RiCloseLine,
	RiFolderVideoLine,
	RiLock2Line,
	RiLockUnlockLine,
	RiMessage2Line,
	RiThumbDownLine,
	RiThumbUpLine,
} from "@remixicon/react"

import { ChapterList, QuizHistory, Resources, Transcript } from "@/components/home"
import { AvatarGroup, Seo, Progress, TabPanel, VideoPlayer } from "@/components/shared"
import blockchain from "@/assets/illustrations/blockchain.svg"
import { DashboardLayout } from "@/components/layouts"
import trophy from "@/assets/illustrations/trophy.svg"
import { Button } from "@/components/ui/button"
import type { ChapterProps } from "@/types"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

import { categories } from "@/mock"

const tabs = ["summary", "transcript", "resources", "quiz history"] as const
type Tabs = (typeof tabs)[number]

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
]

const Page = () => {
	const [showInstructions, setShowInstructions] = React.useState(false)
	const [showAllChapters, setShowAllChapters] = React.useState(false)
	const [current, setCurrent] = React.useState<ChapterProps>()
	const [quizDialog, setQuizDialog] = React.useState(false)
	const [tab, setTab] = React.useState<Tabs>("summary")
	const [open, setOpen] = React.useState(false)
	const router = useRouter()
	const { id } = router.query

	const courses = categories.flatMap((category) => category.subjects)
	const course = courses.find((course) => course.id === String(id))

	React.useEffect(() => {
		if (course) {
			setCurrent(course.chapters[0])
		}
	}, [course])

	if (!course) return null

	const displayedChapters = showAllChapters ? course.chapters : course.chapters.slice(0, 3)

	const hasMoreChapters = course.chapters.length > 3

	return (
		<>
			<Seo title={course.title} />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-8 py-6">
					<div className="flex w-full flex-col gap-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<Button onClick={() => router.back()} size="cmd" variant="cmd">
									<RiArrowLeftSLine />
									Back
								</Button>
								<h4 className="font-medium lg:text-xl">{}</h4>
							</div>
							<div className="flex items-center gap-4">
								<Dialog open={quizDialog} onOpenChange={setQuizDialog}>
									<DialogTrigger asChild>
										<Button variant="inverse">Take Quiz</Button>
									</DialogTrigger>
									<DialogContent className="flex w-[400px] flex-col gap-4">
										<div className="flex w-full items-center justify-end">
											<button onClick={() => setQuizDialog(false)}>
												<RiCloseLine size={24} />
											</button>
										</div>
										<div>
											<DialogTitle className="text-2xl font-bold">Chapter {current?.id} Quiz</DialogTitle>
											<DialogDescription className="font-neutral-400 text-sm">
												Ready to take your quiz?
											</DialogDescription>
										</div>
										<div className="flex w-full items-center gap-2 rounded-lg border px-4 py-6">
											<div className="w-[156px] flex-1">
												<Progress label="Previous Score" value={75} color="var(--primary-400)">
													75%
												</Progress>
											</div>
											<hr className="h-9 w-[1px] bg-neutral-300" />
											<div className="w-[156px] flex-1">
												<Progress label="Attempts" value={33.33} color="var(--secondary-400)">
													1/3
												</Progress>
											</div>
										</div>
										<div className="flex w-full items-center gap-2 rounded-lg border px-4 py-5 text-neutral-400">
											<RiMessage2Line className="size-6" />
											<p className="max-w-[85%] text-sm">
												Remark - Your need to score 70% and above to qualify for the next chapter
											</p>
										</div>
										<div className="flex w-full flex-col gap-4 rounded-lg bg-neutral-200 p-4 transition-all duration-700">
											<div className="flex w-full items-center justify-between">
												<p className="text-sm font-medium">Instructions</p>
												<button onClick={() => setShowInstructions(!showInstructions)}>
													<RiArrowDropDownLine
														className={`transition-transform duration-500 ${showInstructions ? "rotate-180" : ""}`}
													/>
												</button>
											</div>
											{showInstructions && <div className="flex w-full flex-col gap-2"></div>}
										</div>
										<div className="flex w-full items-center justify-end gap-4">
											<Button className="w-fit" onClick={() => setQuizDialog(false)} variant="outline">
												Cancel
											</Button>
											<Button className="w-fit">
												<Link href={`/dashboard/courses/quiz?id=${current?.id}`}>Start Quiz</Link>
											</Button>
										</div>
									</DialogContent>
								</Dialog>
								<Button>
									Go to Next Chapter
									<RiArrowRightSLine />
								</Button>
							</div>
						</div>
						<p className="text-xs text-neutral-400">Categories / {course?.title}</p>
					</div>
					<div className="grid w-full grid-cols-3 gap-8">
						<div className="col-span-2 flex w-full flex-col gap-4">
							<div className="aspect-[2.33/1] w-full">
								<VideoPlayer src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" />
							</div>
							<div className="flex w-full items-center justify-between">
								<h3 className="text-xl font-semibold">{current?.title}</h3>
								<div className="flex items-center gap-3">
									<div className="flex items-center px-2 py-1">
										<RiThumbUpLine size={20} />
									</div>
									<div className="flex items-center px-2 py-1">
										<RiThumbDownLine size={20} />
									</div>
								</div>
							</div>
							<div className="flex w-full items-center gap-2">
								{tabs.map((item) => (
									<button
										key={item}
										onClick={() => setTab(item)}
										className={`rounded-md px-3 py-2 text-sm capitalize ${item === tab ? "bg-[#f1ecf9] text-primary-300" : "text-neutral-400"}`}>
										{item}
									</button>
								))}
							</div>
							<TabPanel tabValue="summary" selected={tab}>
								<ChapterList chapters={course.chapters} current={current} setCurrent={setCurrent} />
							</TabPanel>
							<TabPanel tabValue="transcript" selected={tab}>
								<Transcript transcript={current?.transcript} />
							</TabPanel>
							<TabPanel tabValue="resources" selected={tab}>
								<Resources resources={current?.resources} />
							</TabPanel>
							<TabPanel tabValue="quiz history" selected={tab}>
								<QuizHistory quizzes={current?.quizzes} />
							</TabPanel>
						</div>
						<div className="flex h-fit w-full flex-col gap-2">
							<div className="flex w-full items-center justify-between rounded-lg border p-4">
								<p className="text-sm text-neutral-400">ALL CHAPTERS</p>
								<div className="flex h-[6px] w-16 items-center rounded-3xl bg-[#efefef]">
									<div style={{ width: `${50}%` }} className="h-full rounded-3xl bg-primary-400"></div>
								</div>
							</div>
							<div
								className={`w-full rounded-lg border ${showAllChapters ? "rounded-b-lg" : "rounded-b-none"}`}>
								{displayedChapters.map((chapter, index) => (
									<div
										key={chapter.id}
										className={`flex w-full flex-col gap-2 border-b p-4 ${showAllChapters && hasMoreChapters ? "last:border-b" : "last:border-b-0"}`}>
										<div className="flex w-full items-center justify-between">
											<p className="text-xs">CHAPTER {index + 1}</p>
											{current === chapter ? (
												<div className="flex animate-pulse items-center gap-1 rounded border border-yellow-400 px-2 py-1 text-[10px] tracking-wide text-yellow-400">
													<span className="size-1 rounded-full bg-yellow-400" />
													ONGOING
												</div>
											) : (
												<>
													{chapter.isRead ? (
														<RiLock2Line className="size-[18px] text-neutral-400" />
													) : (
														<RiLockUnlockLine className="size-[18px] text-neutral-400" />
													)}
												</>
											)}
										</div>
										<div
											className={`flex items-center gap-1 ${current === chapter ? "text-black" : "text-neutral-400"}`}>
											<RiFolderVideoLine size={16} />
											<p className="text-sm">{chapter.title}</p>
										</div>
									</div>
								))}
								{hasMoreChapters && (
									<button
										onClick={() => setShowAllChapters(!showAllChapters)}
										className="flex w-full items-center justify-center gap-4 rounded-b-lg p-4 text-sm text-primary-400">
										{showAllChapters ? "Show Less" : "See All Chapters"}
										<RiArrowDropDownLine
											className={`transition-all duration-500 ${showAllChapters ? "rotate-180" : ""}`}
										/>
									</button>
								)}
							</div>
							<div className="relative flex min-h-[99px] w-full flex-col gap-3 overflow-hidden rounded-lg border bg-gradient-to-r from-white to-primary-100 p-4">
								<p className="text-sm font-bold">Earn 10 Points</p>
								<p className="max-w-[65%] text-xs text-neutral-400">
									Get {10} points every time you complete a chapter
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
									<p className="text-sm font-bold capitalize">Join {course.title} Community Forum</p>
									<AvatarGroup images={images} />
								</div>
								<Dialog open={open} onOpenChange={setOpen}>
									<DialogTrigger asChild>
										<Button className="w-fit rounded-md text-xs" size="sm" variant="secondary">
											Join
										</Button>
									</DialogTrigger>
									<DialogContent className="flex w-[400px] flex-col gap-4">
										<div className="flex w-full items-center justify-end">
											<button onClick={() => setOpen(false)}>
												<RiCloseLine size={24} />
											</button>
										</div>
										<DialogTitle className="text-2xl font-bold">Join Community</DialogTitle>
										<div className="relative h-[111px] rounded-lg border">
											<Image
												src="/assets/images/join-community.png"
												alt="join community"
												fill
												sizes="(max-width:1024px)100%"
												className="object-contain"
											/>
										</div>
										<DialogDescription className="font-neutral-400 py-3 text-sm">
											By joining the community, it means you agree to Classore community terms and conditions
											while learning and making friends.
										</DialogDescription>
										<hr className="w-full bg-neutral-400" />
										<Button>Yes, I agree</Button>
									</DialogContent>
								</Dialog>
							</div>
							<div className="flex w-full flex-col gap-3 rounded-lg border p-4">
								<p className="text-sm font-bold">Tags</p>
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
