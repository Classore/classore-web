import * as React from "react";

import { useGetExamBundles, useGetExams } from "@/queries/school";
import { ExamCard } from "../home/exam-card";
import { Spinner } from "../shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export const BrowseCategories = () => {
  const [tab, setTab] = React.useState("all");
  const { data: exams } = useGetExams();

  const { data: bundles, isPending } = useGetExamBundles({
    limit: 15,
    page: 1,
    examination: tab === "all" ? undefined : tab,
  });

  return (
    <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row lg:items-center">
          <p className="text-xl font-medium">Browse Categories</p>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            {exams?.map((exam) => (
              <TabsTrigger
                key={exam.examination_id}
                value={exam.examination_id}
              >
                {exam.examination_name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {isPending ? (
          <Spinner variant="primary" />
        ) : (
          <>
            {tab === "all" && (
              <TabsContent
                value="all"
                className="grid grid-cols-fluid gap-x-4 gap-y-6 lg:grid-cols-3"
              >
                {bundles?.data.length ? (
                  bundles.data.map((subject) => (
                    <ExamCard
                      key={subject.examinationbundle_id}
                      course={subject}
                      // className="max-w-[360px]"
                    />
                  ))
                ) : (
                  <p className="text-sm text-neutral-400">No bundles found</p>
                )}
              </TabsContent>
            )}

            {exams?.map((exam) => (
              <TabsContent
                key={exam.examination_id}
                value={exam.examination_id}
                className="grid grid-cols-fluid gap-x-4 gap-y-6"
              >
                {bundles?.data.length ? (
                  bundles.data.map((subject) => (
                    <ExamCard
                      key={subject.examinationbundle_id}
                      course={subject}
                      className="min-w-[360px]"
                    />
                  ))
                ) : (
                  <p className="text-sm text-neutral-400">No bundles found</p>
                )}
              </TabsContent>
            ))}
          </>
        )}

        {/* <Pagination
					current={page}
					onPageChange={setPage}
					pageSize={15}
					total={bundles?.meta.pageCount ?? 1}
				/> */}
      </div>
    </Tabs>
  );
};
