import { useGetMyCourses } from "@/queries/student";
import type { UserProfileResp } from "@/types";
import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import { NextPrevButtons } from "../embla-navigation";
import { CourseCard } from "../home";
import { RenewalModal } from "../modals/renewal";
import { Spinner } from "../shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type BundleProps = {
  bundle: UserProfileResp["time_line"][number];
};

const tabs = ["ongoing", "completed", "pending"];
export const Bundle = ({ bundle }: BundleProps) => {
  const [selected, setSelected] = React.useState(tabs[0] ?? "");
  const [open, setOpen] = React.useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { data: courses, isPending } = useGetMyCourses({
    examination_bundle: bundle.exam_bundle_details.id,
    status: selected as "ONGOING" | "PENDING" | "COMPLETED",
  });

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <Tabs value={selected} onValueChange={setSelected}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2 md:flex-row md:gap-4 lg:items-center">
              <p className="text-lg font-medium capitalize">
                {bundle.exam_bundle_details.name} Prep Bundle
              </p>
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
                      courses.data.map((course) => (
                        <CourseCard
                          key={course.course_id}
                          course={course}
                          {...(bundle.status === "EXPIRED" && {
                            onClick: () => setOpen(true),
                          })}
                        />
                      ))
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
        </Tabs>
      </div>

      <RenewalModal bundle={bundle} open={open} setOpen={setOpen} />
    </>
  );
};
