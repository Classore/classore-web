import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import type { UserChartProps } from "@/types"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart"

interface Props {
	data: UserChartProps[]
}

export const ChartLine = ({ data }: Props) => {
	const config = {
		time_spent: {
			label: "Time spent",
			color: "var(--primary-400)",
		},
	} satisfies ChartConfig

	return (
		<ChartContainer config={config}>
			<LineChart accessibilityLayer data={data} margin={{ left: 12, right: 12 }}>
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
	)
}
