import type { SVGProps } from "react";

export const ModalArt = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={475} height={562} fill="none" {...props}>
		<path
			stroke="url(#a)"
			strokeWidth={1.468}
			d="M59.186 1v547.57M91.587 1v547.57M123.988 1v547.57M156.389 1v547.57M188.79 1v547.57M221.192 1v547.57M253.593 1v547.57M285.994 1v547.57M318.395 1v547.57M350.796 1v547.57M383.197 1v547.57M415.598 1v547.57M0 561.145h475M0 523.918h475M0 486.567h475M0 449.215h475M0 411.864h475M0 374.513h475M0 337.162h475M0 299.81h475M0 262.459h475M0 225.108h475M0 187.756h475M0 150.405h475M0 113.054h475M0 75.702h475M0 38.352h475M0 1h475"
			opacity={0.05}
		/>
		<defs>
			<radialGradient
				id="a"
				cx={0}
				cy={0}
				r={1}
				gradientTransform="matrix(0 280.072 -237.5 0 237.5 281.072)"
				gradientUnits="userSpaceOnUse">
				<stop stopColor="#6F42C1" />
				<stop offset={1} stopColor="#6F42C1" stopOpacity={0.1} />
			</radialGradient>
		</defs>
	</svg>
);
