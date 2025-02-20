import React from "react";
import Image from "next/image";
import { EXAMS } from "@/constants";

interface Props {
	speed?: number;
}

export const Ticker = ({ speed = 100 }: Props) => {
	const [contentWidth, setContentWidth] = React.useState(0);
	const [hovering, setHovering] = React.useState(false);
	const scroller = React.useRef<HTMLDivElement>(null);
	const animation = React.useRef<Animation | null>(null);

	React.useEffect(() => {
		if (!scroller.current) return;
		const scrollerContent = Array.from(scroller.current.children);
		const itemWidth = scrollerContent[0].clientWidth;
		const gap = 160;
		const totalWidth = scrollerContent.length * (itemWidth + gap);
		setContentWidth(totalWidth);
		const originalContent = scroller.current.innerHTML;
		scroller.current.innerHTML = originalContent + originalContent;
		animation.current = scroller.current.animate(
			[{ transform: "translateX(0)" }, { transform: `translateX(-${totalWidth}px)` }],
			{
				duration: scrollerContent.length * speed * 100,
				iterations: Infinity,
				easing: "linear",
			}
		);
		return () => {
			animation.current?.cancel();
		};
	}, [speed]);

	React.useEffect(() => {
		if (!animation.current) return;
		if (hovering) {
			animation.current.pause();
		} else {
			animation.current.play();
		}
	}, [hovering]);

	return (
		<div
			className="w-full overflow-hidden py-5 lg:py-10"
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}>
			<div
				ref={scroller}
				className="flex items-center gap-x-10 lg:gap-x-40"
				style={{
					width: contentWidth > 0 ? `${contentWidth * 2}px` : "auto",
				}}>
				{EXAMS.map(({ image, label }) => (
					<div
						key={label}
						className="relative size-10 flex-shrink-0 bg-transparent lg:size-40">
						<div className="relative h-full w-full">
							<Image src={image} alt={label} fill sizes="100%" className="object-contain" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Ticker;
