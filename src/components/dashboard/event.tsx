import React from "react";

import type { WardEventProps } from "@/types/parent";

interface Props {
	event: WardEventProps;
}

export const WardEvent = ({}: Props) => {
	return (
		<div className="flex w-full items-center gap-x-2 rounded-md border px-3 py-4">
			<div className="size-10">
				<div className={`h-5 w-full`}></div>
				<div className="h-5 w-full"></div>
			</div>
			<div className="">
				<p className="text-sm"></p>
				<p className="text-xs text-neutral-400"></p>
			</div>
		</div>
	);
};
