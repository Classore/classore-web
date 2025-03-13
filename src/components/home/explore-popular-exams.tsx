import useEmblaCarousel from "embla-carousel-react";

import { useGetExamBundles } from "@/queries/school";
import { NextPrevButtons } from "../embla-navigation";
import { Spinner } from "../shared";
import { ExamCard } from "./exam-card";

export const ExplorePopularExams = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { data: bundles, isPending } = useGetExamBundles({
    limit: 15,
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium">Explore popular exams</p>
        <NextPrevButtons emblaApi={emblaApi} />
      </div>

      {isPending ? (
        <div className="py-2">
          <Spinner variant="primary" />
        </div>
      ) : (
        <div className="overflow-x-clip" ref={emblaRef}>
          <div className="flex touch-pan-y touch-pinch-zoom flex-col items-center gap-4 md:flex-row">
            {bundles?.data.length ? (
              bundles.data.map((subject) => (
                <ExamCard
                  key={subject.examinationbundle_id}
                  course={subject}
                  className="md:min-w-[350px]"
                />
              ))
            ) : (
              <p className="text-sm text-neutral-400">No bundles found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
