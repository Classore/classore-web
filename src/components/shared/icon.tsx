import React from "react";

interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
	path?: string;
	viewBox?: string;
	width?: string | number;
	height?: string | number;
	color?: string;
	className?: string;
	children?: React.ReactNode;
}

export const SVGIcon = ({
	path,
	viewBox = "0 0 24 24",
	width = 24,
	height = 24,
	color = "currentColor",
	className = "",
	children,
	...props
}: SVGIconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={viewBox}
			width={width}
			height={height}
			fill={color}
			className={className}
			{...props}>
			{path && <path d={path} />}
			{children}
		</svg>
	);
};
