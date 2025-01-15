import { categories } from "@/mock"
import useEmblaCarousel from "embla-carousel-react"
import { NextPrevButtons } from "../embla-navigation"
import { CourseCard } from "../home"

// const tabs = ["all", "ongoing", "completed"]
type BundleProps = {
	title?: string
}

export const Bundle = ({ title }: BundleProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel()

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex items-center justify-between">
				<p className="text-xl font-medium">{title}</p>

				<NextPrevButtons emblaApi={emblaApi} />
			</div>

			<div className="overflow-x-clip" ref={emblaRef}>
				<div className="flex touch-pan-y touch-pinch-zoom flex-col items-center gap-4 md:flex-row">
					{categories[0].subjects.map((subject) => (
						<CourseCard key={subject.id} course={subject} />
					))}
				</div>
			</div>
		</div>
	)
}
