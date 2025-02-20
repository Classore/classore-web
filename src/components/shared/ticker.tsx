import Image from "next/image";
import React from "react";

import { EXAMS } from "@/constants";

interface Props {
	speed?: number;
}

export const Ticker = ({ speed = 200 }: Props) => {
	const scroller = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!scroller.current) return;
		const scrollerContent = Array.from(scroller.current.children);
		scrollerContent.forEach((item) => {
			const duplicatedItem1 = item.cloneNode(true);
			const duplicatedItem2 = item.cloneNode(true);
			if (scroller.current) {
				scroller.current.appendChild(duplicatedItem1);
				scroller.current.appendChild(duplicatedItem2);
			}
		});
		const animation = scroller.current.animate(
			[
				{ transform: "translateX(0)" },
				{ transform: `translateX(-${scrollerContent.length * 100}%)` },
			],
			{
				duration: scrollerContent.length * speed * 100,
				iterations: Number.POSITIVE_INFINITY,
				easing: "linear",
			}
		);

		return () => {
			animation.cancel();
		};
	}, [speed]);

	return (
		<div className="w-full overflow-hidden py-5 lg:py-10">
			<div ref={scroller} className="flex items-center gap-x-10 lg:gap-x-40">
				{EXAMS.map(({ image, label }) => (
					<div
						key={label}
						className="relative size-10 flex-shrink-0 bg-transparent lg:size-20 lg:h-40 lg:w-40">
						<div className="relative h-full w-full">
							<Image src={image} alt={label} fill sizes="100%" className="object-contain" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
