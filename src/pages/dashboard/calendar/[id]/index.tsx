import { useRouter } from "next/router";
import React from "react";

import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";

const Page = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <>
      <Seo title="" />
      <DashboardLayout>
        <div>Event {id}</div>
      </DashboardLayout>
    </>
  );
};

export default Page;
