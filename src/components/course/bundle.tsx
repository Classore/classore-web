import useEmblaCarousel from "embla-carousel-react";

import { NextPrevButtons } from "../embla-navigation";
import { useGetExamBundles } from "@/queries/school";
// import { CourseCard } from "../home"

type BundleProps = {
	title?: string;
};

export const Bundle = ({ title }: BundleProps) => {
	const [emblaRef, emblaApi] = useEmblaCarousel();

	const {} = useGetExamBundles({
		limit: 10,
		page: 1,
		examination: "1",
	});

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex items-center justify-between">
				<p className="text-xl font-medium">{title}</p>
				<NextPrevButtons emblaApi={emblaApi} />
			</div>
			<div className="overflow-x-clip" ref={emblaRef}>
				<div className="flex touch-pan-y touch-pinch-zoom flex-col items-center gap-4 md:flex-row"></div>
			</div>
		</div>
	);
};
