import { useGetMyCourses } from "@/queries/student";
import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import { NextPrevButtons } from "../embla-navigation";
import { Spinner } from "../shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CourseCard } from "./course-card";

const tabs = ["ongoing", "pending", "completed"];

export const MyCourses = () => {
	const [selected, setSelected] = React.useState(tabs[0] ?? "");
	const [emblaRef, emblaApi] = useEmblaCarousel();

	const { data: courses, isPending } = useGetMyCourses({
		status: selected.toUpperCase() as "ONGOING" | "PENDING" | "COMPLETED",
	});

	return (
		<Tabs defaultValue={tabs[0]} value={selected} onValueChange={setSelected}>
			<div className="flex w-full flex-col gap-4">
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-4 md:flex-row lg:items-center">
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
							<div className="py-2">
								<Spinner variant="primary" />
							</div>
						) : (
							<div className="overflow-x-clip" ref={emblaRef}>
								<div className="flex touch-pan-y touch-pinch-zoom flex-col items-center gap-4 md:flex-row">
									{courses?.data.length ? (
										courses.data.map((course) => <CourseCard key={course.course_id} course={course} />)
									) : (
										<p className="w-full text-center text-sm text-neutral-400">
											No {selected} courses found!
										</p>
									)}
								</div>
							</div>
						)}
					</TabsContent>
				))}
			</div>
		</Tabs>
	);
};
