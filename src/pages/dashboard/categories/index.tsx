import Image from "next/image";
import Link from "next/link";

import designer from "@/assets/illustrations/designer.svg";
import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";

import { BrowseCategories, FeaturedBundles } from "@/components/categories";
import { getExamsQueryOptions } from "@/queries/school";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetStaticProps } from "next";

export const getStaticProps = (async () => {
  const queryClient = new QueryClient();
  let dehydratedState = {};

  try {
    const resp = await Promise.allSettled([
      queryClient.ensureQueryData(getExamsQueryOptions),
    ]);

    if (resp[0].status === "rejected") {
      return {
        props: {},
      };
    }

    dehydratedState = dehydrate(queryClient);
    queryClient.clear();
  } catch {
    return {
      props: {},
    };
  }

  return {
    props: {
      dehydratedState,
    },
  };
}) satisfies GetStaticProps;

const Page = () => {
  return (
    <>
      <Seo title="Categories" />
      <DashboardLayout>
        <div className="relative flex w-full items-center justify-between overflow-hidden rounded-2xl bg-[#F8F5FF] p-4 text-black md:px-10 md:py-[52px] lg:min-h-[297px] lg:gap-[177px]">
          <div className="flex max-w-[559px] flex-col gap-4">
            <h1 className="text-2xl font-bold lg:text-4xl">
              Let&apos;s get started with your learning journey
            </h1>
            <p className="text-sm text-neutral-400 md:text-base">
              Explore available categories and unlock your potential. Earn point
              rewards as you learn.
            </p>
            <Button className="mt-4 rounded-lg text-sm md:w-fit" variant="dark">
              <Link href="/dashboard/courses">See All Categories</Link>
            </Button>
          </div>

          <div className="hidden md:absolute md:right-8 md:top-1/2 md:aspect-square md:h-[320px] md:-translate-y-1/2">
            <Image
              src={designer}
              alt="desginer color"
              fill
              sizes="(max-width:1024px)100%"
              className="object-contain"
            />
          </div>
        </div>
        <FeaturedBundles />
        <BrowseCategories />
      </DashboardLayout>
    </>
  );
};

export default Page;
