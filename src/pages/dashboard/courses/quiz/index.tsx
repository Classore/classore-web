import { useRouter } from "next/router"
import Image from "next/image"
import React from "react"
import {
	RiArrowDropDownLine,
	RiArrowLeftSLine,
	RiCloseLine,
	RiQuestionLine,
	RiTimeLine,
} from "@remixicon/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePreventNavigation, useQuizHandler } from "@/hooks"
import { Button } from "@/components/ui/button"
import { useUserStore } from "@/store/z-store"
import { Seo } from "@/components/shared"
import { getInitials } from "@/lib"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

import { categories } from "@/mock"

const items = [
	{ label: "answered", color: "var(--primary-400)" },
	{ label: "unanswered", color: "var(--neutral-400)" },
]

const Page = () => {
	const [dialogOpen, setDialogOpen] = React.useState(false)
	const [isOpen, setIsOpen] = React.useState(false)
	const [open, setOpen] = React.useState(false)
	const { user } = useUserStore()
	const router = useRouter()
	const { id } = router.query

	const quizzes = categories[0]?.subjects[9]?.chapters[0]?.quizzes
	const quiz = quizzes.find((quiz) => quiz.id === String(id))!
	const questions = quiz?.questions

	const handleQuit = () => {
		router.push("/dashboard/courses")
	}

	const {
		current,
		currentQuestion,
		handleNavigation,
		handleSubmission,
		isAnswer,
		isAnswered,
		selectAnswer,
		setCurrent,
	} = useQuizHandler({
		questions,
		onSubmit: (answered) => {
			console.log(answered)
			router.push("/dashboard/courses")
		},
	})

	usePreventNavigation(true, `/dashboard/courses/`)

	return (
		<>
			<Seo title="Dashboard" />
			<div className="flex h-screen w-screen flex-col bg-white">
				<nav className="mx-auto h-24 w-full border-b">
					<div className="container flex h-full w-full items-center justify-between">
						<div className="relative h-[30px] w-[135px] px-6">
							<Image
								src="/assets/images/classore.png"
								alt="classore"
								fill
								sizes="(max-width:1024px)100%"
							/>
						</div>
						<h5 className="text-xl font-bold">{categories[0].name}</h5>
						<button onClick={() => setOpen(!open)} className="flex items-center gap-2">
							<Avatar className="size-[46px] bg-black">
								<AvatarImage src={user?.image} alt={user?.firstName} />
								<AvatarFallback className="text-white">
									{getInitials(`${user?.firstName} ${user?.lastName}`)}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col">
								<p className="">
									{user?.firstName} {user?.lastName}
								</p>
								<p className="text-xs text-neutral-400">{user?.email}</p>
							</div>
							<RiArrowDropDownLine
								size={24}
								className={`transition-transform ${open ? "rotate-180" : ""}`}
							/>
						</button>
					</div>
				</nav>
				<div className="h-full w-full py-8">
					<div className="container mx-auto grid h-full w-full grid-cols-4 gap-5">
						<div className="flex w-full justify-center">
							<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
								<DialogTrigger asChild>
									<Button className="h-fit w-fit" size="cmd" variant="cmd">
										<RiArrowLeftSLine />
										Quit
									</Button>
								</DialogTrigger>
								<DialogContent>
									<div className="flex w-full items-center justify-end">
										<button onClick={() => setDialogOpen(false)}>
											<RiCloseLine size={24} />
										</button>
									</div>
									<div className="flex w-full flex-col gap-4">
										<DialogTitle className="text-2xl font-bold">Quit?</DialogTitle>
										<DialogDescription hidden></DialogDescription>
										<div className="w-full rounded-lg bg-neutral-100 p-4 text-sm text-neutral-400">
											Are you sure you want to quit your quiz now? Please note that you will lose an attempt by
											quitting.
										</div>
										<div className="flex w-full items-center justify-end gap-4">
											<Button className="max-w-[115px]" onClick={() => setDialogOpen(false)} variant="outline">
												Cancel
											</Button>
											<Button className="w-fit" onClick={handleQuit}>
												I understand, Quit
											</Button>
										</div>
									</div>
								</DialogContent>
							</Dialog>
						</div>
						<div className="col-span-2 flex h-fit w-full flex-col gap-4 rounded-lg border bg-gradient-to-b from-primary-100 from-0% via-white via-15% to-white to-100% p-5">
							<div className="flex w-full items-center justify-between">
								<div className="flex items-center gap-1 text-neutral-400">
									<RiQuestionLine />
									<p className="text-sm font-bold">
										QUESTION {current + 1} OF {questions?.length}
									</p>
								</div>
								<div className="flex items-center gap-1">
									<RiTimeLine />
									<p className="text-sm font-bold"></p>
								</div>
							</div>
							<div className="grid min-h-[140px] w-full place-items-center rounded-lg border">
								<p className="max-w-[85%] text-center font-medium">{currentQuestion?.question}</p>
							</div>
							<div className="flex w-full flex-col gap-4">
								<p className="text-sm">Select only one answer</p>
								<div className="grid w-full grid-cols-2 gap-4">
									{currentQuestion?.answers.map((answer, index) => (
										<button
											key={index}
											onClick={() => selectAnswer(answer)}
											className={`flex w-full items-center justify-between rounded-md border p-3 ${isAnswer(answer) ? "border-primary-400" : "border-neutral-300"}`}>
											<p className="flex max-w-[85%] items-center gap-2 text-left text-sm">
												{" "}
												<span className="text-neutral-400">{answer}</span>
											</p>
											<span
												className={`relative size-5 rounded-full border-2 before:absolute before:left-1/2 before:top-1/2 before:size-3 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-primary-400 ${isAnswer(answer) ? "border-primary-400 before:block" : "before:hidden"}`}></span>
										</button>
									))}
								</div>
							</div>
							<div className="flex w-full items-center justify-between">
								<Button onClick={() => handleNavigation("skip")} className="max-w-[115px]" variant="text">
									Skip Question
								</Button>
								<div className="flex items-center gap-4">
									<Button
										className="max-w-[115px]"
										onClick={() => handleNavigation("previous")}
										variant="outline">
										Previous
									</Button>
									{questions?.length - 1 === current ? (
										<Dialog open={isOpen} onOpenChange={setIsOpen}>
											<DialogTrigger asChild>
												<Button className="max-w-[115px]">Submit</Button>
											</DialogTrigger>
											<DialogContent>
												<div className="flex w-full items-center justify-end">
													<button onClick={() => setIsOpen(false)}>
														<RiCloseLine size={24} />
													</button>
												</div>
												<div className="flex w-full flex-col gap-4">
													<DialogTitle className="text-2xl font-bold">Submit Quiz</DialogTitle>
													<DialogDescription hidden></DialogDescription>
													<div className="w-full rounded-lg bg-neutral-100 p-4 text-sm text-neutral-400">
														Are you sure you want to submit your quiz now?
													</div>
													<div className="flex w-full items-center justify-end gap-4">
														<Button className="max-w-[115px]" onClick={() => setIsOpen(false)} variant="outline">
															Cancel
														</Button>
														<Button className="max-w-[115px]" onClick={handleSubmission}>
															Yes, Submit
														</Button>
													</div>
												</div>
											</DialogContent>
										</Dialog>
									) : (
										<Button className="max-w-[115px]" onClick={() => handleNavigation("next")}>
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
								{questions?.map((question, index) => (
									<button
										onClick={() => setCurrent(index)}
										key={question.id}
										className={`grid size-6 place-items-center rounded-full ${isAnswered(question.id) ? "bg-primary-100 text-primary-500" : "bg-neutral-100 text-neutral-500"}`}>
										{index + 1}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
