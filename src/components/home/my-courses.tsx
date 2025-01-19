import { useGetMyCourses } from "@/queries/course"
import useEmblaCarousel from "embla-carousel-react"
import { NextPrevButtons } from "../embla-navigation"
import { Spinner } from "../shared"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { CourseCard } from "./course-card"

const tabs = ["pending", "ongoing", "completed"]

export const MyCourses = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel()
	const { data: courses, isPending } = useGetMyCourses({})

	return (
		<Tabs defaultValue={tabs[0]}>
			<div className="flex w-full flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<p className="text-xl font-medium">My courses</p>

						<TabsList>
							{tabs?.map((tab) => (
								<TabsTrigger key={tab} value={tab}>
									{tab}
								</TabsTrigger>
							))}
						</TabsList>
					</div>

					<NextPrevButtons emblaApi={emblaApi} />
				</div>

				{tabs.map((tab) => (
					<TabsContent key={tab} value={tab}>
						{isPending ? (
							<Spinner />
						) : (
							<div className="overflow-x-clip" ref={emblaRef}>
								<div className="flex touch-pan-y touch-pinch-zoom flex-col items-center gap-4 md:flex-row">
									{courses?.data.length ? (
										courses.data.map((course) => <CourseCard key={course.course_id} course={course} />)
									) : (
										<p className="text-sm text-neutral-400">No courses found</p>
									)}
								</div>
							</div>
						)}
					</TabsContent>
				))}
			</div>
		</Tabs>
	)
}
