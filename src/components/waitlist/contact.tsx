import { CloseCircle } from "iconsax-react";
import React from "react";

import { social_links } from "@/config";
import { Button } from "../ui/button";

interface Props {
  onClose: () => void;
}

export const Contact = ({ onClose }: Props) => {
  return (
    <div className="flex w-full flex-col gap-8 rounded-3xl border bg-gradient-to-b from-[#fef0e8] to-transparent p-3">
      <div className="flex w-full items-center justify-end">
        <button onClick={onClose}>
          <CloseCircle />
        </button>
      </div>
      <div className="flex w-full flex-col gap-2">
        <h3 className="text-2xl font-semibold">Contact us</h3>
        <p className="text-neutral-500">
          Learning made easy and fun - don&apos;t miss early access to a new way
          of learning
        </p>
      </div>
      <div className="flex w-full flex-col gap-5">
        <a
          href="https://wa.me/+2348063877780"
          target="_blank"
          className="w-full"
        >
          <Button className="w-full" size="lg">
            Chat with us on WhatsApp
          </Button>
        </a>
        <div className="flex flex-col gap-4">
          {social_links.map(({ icon: Icon, label, url }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              className="flex w-full items-center gap-2 text-neutral-500"
            >
              <Icon />
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
