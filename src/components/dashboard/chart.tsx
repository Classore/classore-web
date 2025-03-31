import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import React from "react";

import type { WardAnalyticsProps } from "@/types/parent";
import { type Period, PERIOD_OPTIONS } from "@/constants/period";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

interface AnalyticsProps {
	data: WardAnalyticsProps[];
	hoursSpent: number;
	onTimeLineChange: (period: Period) => void;
	timeLine: Period;
}

export const AnalyticsChart = ({
	data,
	hoursSpent,
	onTimeLineChange,
	timeLine,
}: AnalyticsProps) => {
	const config = {
		time_spent: {
			label: "Time spent",
			color: "var(--primary-400)",
		},
	} satisfies ChartConfig;

	return (
		<div className="w-full space-y-3">
			<div className="flex h-8 w-full items-center justify-between">
				<p className="text-lg font-semibold">{hoursSpent} hours spent</p>
				<select
					className="h-8 w-28 cursor-pointer rounded-md border-neutral-300 text-xs text-neutral-400 outline-none ring-0 focus:outline-none focus:ring-0"
					onChange={(e) => onTimeLineChange(e.target.value as Period)}
					value={timeLine}>
					{PERIOD_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
			<div className="h-52 w-full">
				<ChartContainer className="h-full w-full" config={config}>
					<LineChart accessibilityLayer data={data}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Line
							dataKey="time_spent"
							type="linear"
							stroke="var(--primary-400)"
							strokeWidth={1}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</div>
		</div>
	);
};
