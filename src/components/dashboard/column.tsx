import type { ColumnDef } from "@tanstack/react-table";

import type { WardCourseColumn } from "@/types/parent";

export const columns: ColumnDef<WardCourseColumn>[] = [
	{
		accessorKey: "courses",
		header: "Courses",
	},
	{
		accessorKey: "last_visit",
		header: "Last Visit",
	},
	{
		accessorKey: "progress",
		header: "Progress",
	},
	{
		accessorKey: "average_score",
		header: "Avg. Quiz Score",
	},
];
