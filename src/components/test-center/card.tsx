import { RiArrowRightSLine, RiFileTextLine, RiTimeLine } from "@remixicon/react";
import Image from "next/image";
import React from "react";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import type { TestCenterProps } from "@/types/test";
import { Information } from "./information";

interface Props {
	test: TestCenterProps;
}

export const Card = ({ test }: Props) => {
	return (
		<div className="flex w-full flex-col gap-y-4 rounded-lg border p-4">
			<div className="relative aspect-video w-full rounded-lg">
				<Image
					src={test.banner}
					alt={test.title}
					fill
					sizes="100%"
					className="rounded-lg object-cover"
				/>
			</div>
			<div className="border-b border-neutral-300 pb-4">
				<p className="font-medium capitalize">{test.title}</p>
				<p className="text-sm text-neutral-400 first-letter:capitalize">
					{test.description.length > 50 ? test.description.substring(0, 50) : test.description}
				</p>
			</div>
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-x-4">
					<div className="flex items-center gap-x-2">
						<RiTimeLine size={14} className="text-neutral-400" />
						<p className="text-sm text-neutral-400">
							{test.hour}hr {test.minute}m
						</p>
					</div>
					<div className="flex items-center gap-x-2">
						<RiFileTextLine size={14} className="text-neutral-400" />
						<p className="text-sm text-neutral-400">{test.questions} questions</p>
					</div>
				</div>
				<Dialog>
					<DialogTrigger className="text-neutral-400">
						<RiArrowRightSLine size={18} />
					</DialogTrigger>
					<DialogContent className="w-[400px]">
						<Information test={test} />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};
