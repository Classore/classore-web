import { RiStarFill, RiTimeLine, RiUserLine } from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { ExamBundleProps } from "@/types/type";
import { AvatarGroup } from "../shared";
import { formatCurrency } from "@/lib";

interface Props {
  bundle: ExamBundleProps;
}

const CardSmall = ({ bundle }: Props) => {
  return (
    <Link href={`/dashboard/categories/${bundle.examinationbundle_id}`}>
      <div
        key={bundle.examinationbundle_id}
        className="flex aspect-[1.2/1] w-[360px] flex-shrink-0 flex-col gap-6 rounded-2xl border p-4 transition-all duration-700 hover:drop-shadow-lg"
      >
        <div className="relative aspect-[2/1] w-full rounded-lg">
          <Image
            src=""
            alt={bundle.examinationbundle_name}
            fill
            sizes="(max-width:1024px)100%"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <p className="text-medium">{bundle.examination_name}</p>
            <p className="text-bold">
              {formatCurrency(bundle.examinationbundle_amount)}
            </p>
          </div>
          <hr className="w-full bg-neutral-300" />
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-neutral-400">
                <RiTimeLine size={18} />
              </div>
              <div className="flex items-center gap-1 text-sm text-neutral-400">
                <RiUserLine size={18} />
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-neutral-400"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const CardLarge = ({ bundle }: Props) => {
  return (
    <div className="flex h-[300px] w-[800px] flex-shrink-0 cursor-pointer items-center gap-x-6 rounded-lg border p-4 transition-all duration-700 hover:drop-shadow-xl">
      <div className="relative aspect-square h-full rounded-lg bg-secondary-400">
        <Image
          src="https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt={bundle.examinationbundle_name}
          fill
          sizes="(max-width:1024px)100%"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex h-full w-full flex-1 flex-col justify-between gap-x-2">
        <div className="flex h-full w-full flex-col gap-6">
          <div className="flex w-full flex-col gap-6">
            <div>
              <h5 className="text-xl font-medium uppercase">
                {bundle.examinationbundle_name}
              </h5>
              <p className="min-h-20 text-sm text-neutral-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto vero, fugiat laborum consequuntur aperiam illo in
                nihil adipisci nam, veritatis iure soluta earum odit explicabo
                tenetur. Iste, provident obcaecati. Impedit optio architecto
                deserunt! Dolores adipisci dolor officia officiis quos
                provident.
              </p>
            </div>
            <p className="font-semibold">
              {formatCurrency(bundle.examinationbundle_amount)}
            </p>
          </div>
          <div className="flex w-full items-center text-sm text-neutral-400">
            <RiUserLine size={18} /> {bundle.enrolled} students enrolled
          </div>
        </div>
        <div className="flex w-full items-center gap-4">
          <AvatarGroup images={[]} count={4} shape="round" />
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <RiStarFill className="size-4 text-yellow-500" /> {}
            <span className="text-secondary-400"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CardLarge, CardSmall };
