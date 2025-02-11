import Masonry from "react-masonry-css";
import React from "react";

import { cn } from "@/lib";

interface Props {
	children: React.ReactNode;
	breakpointCols?: number;
	className?: string;
	columnClassName?: string;
}

export function MasonryLayout({
	children,
	breakpointCols = 3,
	className,
	columnClassName,
}: Props) {
	return (
		<Masonry
			className={cn("flex w-auto flex-wrap", className)}
			columnClassName={cn("flex flex-col gap-4 pl-5", columnClassName)}
			breakpointCols={breakpointCols}>
			{children}
		</Masonry>
	);
}
