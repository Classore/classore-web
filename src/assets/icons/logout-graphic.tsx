import type { SVGProps } from "react";

export const LogoutGraphic = (props: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={76} height={76} fill="none" {...props}>
		<g filter="url(#a)">
			<g clipPath="url(#b)">
				<rect
					width={64}
					height={64}
					x={6}
					y={4}
					fill="url(#c)"
					rx={32}
					shapeRendering="crispEdges"
				/>
				<path
					stroke="url(#d)"
					strokeWidth={0.75}
					d="M-60.113-97.578V162.97m17.772-260.548V162.97m17.773-260.548V162.97M-6.795-97.578V162.97M10.978-97.578V162.97M28.75-97.578V162.97M46.523-97.578V162.97M64.296-97.578V162.97M82.068-97.578V162.97M99.841-97.578V162.97m17.773-260.548V162.97m17.773-260.548V162.97m-227.965 5.983H167.97M-92.578 151.24H167.97m-260.548-17.773H167.97m-260.548-17.773H167.97M-92.578 97.922H167.97M-92.578 80.149H167.97M-92.578 62.376H167.97M-92.578 44.604H167.97M-92.578 26.83H167.97M-92.578 9.058H167.97M-92.578-8.715H167.97M-92.578-26.487H167.97M-92.578-44.26H167.97M-92.578-62.033H167.97M-92.578-79.805H167.97M-92.578-97.578H167.97"
					opacity={0.05}
				/>
				<g filter="url(#e)">
					<rect width={40} height={40} x={18} y={16} fill="#fff" rx={20} />
					<rect
						width={38}
						height={38}
						x={19}
						y={17}
						stroke="#6F42C1"
						strokeOpacity={0.2}
						strokeWidth={2}
						rx={19}
					/>
					<path
						fill="#6F42C1"
						d="M38 45a9 9 0 0 1-9-9 9 9 0 0 1 16.2-5.4h-2.439a7.2 7.2 0 1 0 0 10.8h2.44A8.986 8.986 0 0 1 38 45Zm6.3-5.4v-2.7h-7.2v-1.8h7.2v-2.7l4.5 3.6-4.5 3.6Z"
					/>
				</g>
			</g>
			<rect
				width={62}
				height={62}
				x={7}
				y={5}
				stroke="#fff"
				strokeWidth={2}
				rx={31}
				shapeRendering="crispEdges"
			/>
		</g>
		<defs>
			<filter
				id="a"
				width={75.6}
				height={75.6}
				x={0.2}
				y={0.2}
				colorInterpolationFilters="sRGB"
				filterUnits="userSpaceOnUse">
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					result="hardAlpha"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				/>
				<feOffset dy={2} />
				<feGaussianBlur stdDeviation={2.9} />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
				<feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2151_21699" />
				<feBlend in="SourceGraphic" in2="effect1_dropShadow_2151_21699" result="shape" />
			</filter>
			<filter
				id="e"
				width={44}
				height={44}
				x={16}
				y={16}
				colorInterpolationFilters="sRGB"
				filterUnits="userSpaceOnUse">
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					result="hardAlpha"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
				/>
				<feOffset dy={2} />
				<feGaussianBlur stdDeviation={1} />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
				<feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2151_21699" />
				<feBlend in="SourceGraphic" in2="effect1_dropShadow_2151_21699" result="shape" />
			</filter>
			<radialGradient
				id="d"
				cx={0}
				cy={0}
				r={1}
				gradientTransform="matrix(0 133.266 -130.274 0 37.696 35.688)"
				gradientUnits="userSpaceOnUse">
				<stop stopColor="#6F42C1" />
				<stop offset={1} stopColor="#6F42C1" stopOpacity={0.1} />
			</radialGradient>
			<linearGradient id="c" x1={38} x2={38} y1={4} y2={68} gradientUnits="userSpaceOnUse">
				<stop stopColor="#44474E" stopOpacity={0.13} />
				<stop offset={1} stopColor="#C2D6FF" stopOpacity={0} />
			</linearGradient>
			<clipPath id="b">
				<rect width={64} height={64} x={6} y={4} fill="#fff" rx={32} />
			</clipPath>
		</defs>
	</svg>
);
