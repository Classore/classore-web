import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { PersonalizedPlanProps } from "@/constants";
import { Button } from "../ui/button";

interface Props {
	data: PersonalizedPlanProps;
}

export const PersonalizedPlanCard = ({ data }: Props) => {
	if (data.type === "photo") {
		return (
			<div className="relative flex aspect-square w-full items-center justify-center">
				<Image
					src={data.image}
					alt="personalized-plan"
					fill
					sizes="100%"
					className="object-cover"
				/>
			</div>
		);
	}

	if (data.type === "link") {
		return (
			<div className="flex aspect-square w-full flex-col justify-center gap-y-3 p-3">
				<div className="">
					<h4 className="font-medium lg:text-lg">{data.title}</h4>
					<p className="text-sm text-neutral-400">{data.description}</p>
				</div>
				<Button className="w-fit" asChild>
					<Link href={String(data.href)} target="_blank">
						{data.buttonText}
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="aspect-square w-full space-y-3 p-3">
			<div className="relative h-[250px] w-full">
				<Image
					src={data.image}
					alt="personalized-plan"
					fill
					sizes="100%"
					className="object-cover"
				/>
			</div>
			<div className="">
				<h4 className="font-medium lg:text-lg">{data.title}</h4>
				<p className="text-sm text-neutral-400">{data.description}</p>
			</div>
		</div>
	);
};
