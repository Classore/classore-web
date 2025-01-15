import { useGetExamBundles, useGetExams } from "@/queries/school"
import * as React from "react"
import { ExamCard } from "../home/exam-card"
import { Spinner } from "../shared"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export const BrowserCategories = () => {
	const [tab, setTab] = React.useState("all")
	const { data: exams } = useGetExams()
	const { data: bundles, isPending } = useGetExamBundles({
		limit: 15,
		page: 1,
		examination: tab === "all" ? undefined : tab,
	})

	return (
		<Tabs defaultValue="all" value={tab} onValueChange={setTab}>
			<div className="flex w-full flex-col gap-6">
				<div className="flex items-center gap-4">
					<p className="text-xl font-medium">Browse Categories</p>

					<TabsList>
						<TabsTrigger value="all">All</TabsTrigger>
						{exams?.map((exam) => (
							<TabsTrigger key={exam.examination_id} value={exam.examination_id}>
								{exam.examination_name}
							</TabsTrigger>
						))}
					</TabsList>
				</div>

				{isPending ? (
					<Spinner variant="primary" />
				) : (
					<>
						<TabsContent value="all" className="grid-cols-fluid grid gap-x-4 gap-y-6">
							{bundles?.data.length ? (
								bundles.data.map((subject) => (
									<ExamCard key={subject.examinationbundle_id} course={subject} className="min-w-[360px]" />
								))
							) : (
								<p className="text-sm text-neutral-400">No bundles found</p>
							)}
						</TabsContent>

						{exams?.map((exam) => (
							<TabsContent
								key={exam.examination_id}
								value={exam.examination_id}
								className="grid-cols-fluid grid gap-x-4 gap-y-6">
								{bundles?.data.length ? (
									bundles.data.map((subject) => (
										<ExamCard key={subject.examinationbundle_id} course={subject} className="min-w-[360px]" />
									))
								) : (
									<p className="text-sm text-neutral-400">No bundles found</p>
								)}
							</TabsContent>
						))}
					</>
				)}
			</div>
		</Tabs>
	)
}
