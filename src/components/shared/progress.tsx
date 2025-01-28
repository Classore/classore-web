import React from "react";

interface Props {
	children?: React.ReactNode;
	color?: string;
	label?: string;
	size?: number;
	thickness?: number;
	value?: number;
}

const Progress = ({
	children,
	color = "var(--primary-400)",
	label,
	size = 81,
	thickness = 25,
	value = 0,
}: Props) => {
	const axis = size / 2;
	const radius = size / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (value / 100) * circumference;

	const fill = value > 0 ? "#c00c0020" : "transparent";

	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<div
				style={{ width: `${size}px` }}
				className="relative grid aspect-square place-items-center rounded-full bg-white shadow-neomorphism">
				<svg
					style={{ width: `${size}px` }}
					className="aspect-square -rotate-90 overflow-hidden rounded-full">
					<circle
						cx={axis}
						cy={axis}
						r={radius}
						fill={fill}
						stroke={color}
						strokeWidth={thickness}
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						strokeLinecap="butt"
					/>
				</svg>

				<div
					style={{ width: `${size - thickness}px` }}
					className="absolute left-1/2 top-1/2 grid aspect-square -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white font-bold shadow-2xl">
					{children}
				</div>
			</div>
			{label && <div className="text-sm text-neutral-400">{label}</div>}
		</div>
	);
};

Progress.displayName = "Progress";

export { Progress };
