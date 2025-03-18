import { useRouter } from "next/router";
import React from "react";

import { ParentPashboardLayout } from "@/components/layouts";

const Page = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <ParentPashboardLayout title={``}>
      <div className="w-full h-full">ward {id}</div>
    </ParentPashboardLayout>
  );
};

export default Page;
