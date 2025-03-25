import type { RemixiconComponentType } from "@remixicon/react";
import React from "react";

interface Props {
	icon: RemixiconComponentType;
	label: string;
	value: string;
}

export const AnalyticsCard = ({ icon: Icon, label, value }: Props) => {
	return (
		<div className="flex w-full items-center gap-x-2 rounded-md border px-3 py-4">
			<div className="grid size-9 place-items-center rounded-full border">
				<Icon />
			</div>
			<div>
				<p className="text-sm font-medium">{value}</p>
				<p className="text-xs text-neutral-400">{label}</p>
			</div>
		</div>
	);
};
