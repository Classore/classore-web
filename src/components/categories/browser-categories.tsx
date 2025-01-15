import { categories } from "@/mock"
import { ExamCard } from "../home/exam-card"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

const tabs = ["all", "national exams", "international exams"]

export const BrowserCategories = () => {
	return (
		<Tabs defaultValue={tabs[0]}>
			<div className="flex w-full flex-col gap-6">
				<div className="flex items-center gap-4">
					<p className="text-xl font-medium">Browse Categories</p>

					<TabsList>
						{tabs.map((tab) => (
							<TabsTrigger key={tab} value={tab}>
								{tab}
							</TabsTrigger>
						))}
					</TabsList>
				</div>

				<div className="grid-cols-fluid grid gap-x-4 gap-y-6">
					{categories[0].subjects.map((subject) => (
						<ExamCard key={subject.id} course={subject} />
					))}
				</div>
			</div>
		</Tabs>
	)
}
