import Masonry from "react-responsive-masonry";
import React from "react";

interface Props {
	children: React.ReactNode;
	columnsCount?: number;
	gutter?: string;
}

export function MasonryLayout({ children, columnsCount = 3, gutter = "20px" }: Props) {
	return (
		<Masonry columnsCount={columnsCount} gutter={gutter}>
			{children}
		</Masonry>
	);
}
