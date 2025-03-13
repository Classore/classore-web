import { useRouter } from "next/router";
import React from "react";

import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Seo title="Preview" />
      <DashboardLayout>
        <h1>Preview {id}</h1>
      </DashboardLayout>
    </>
  );
};

export default Page;
