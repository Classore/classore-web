// import Image from "next/image";
import React from "react";

import { EXAMS } from "@/constants";

interface Props {
	speed?: number;
}

export const Ticker = ({ speed = 150 }: Props) => {
	const scroller = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (!scroller.current) return;

		const scrollerContent = Array.from(scroller.current.children);
		scrollerContent.forEach((item) => {
			const duplicatedItem = item.cloneNode(true);
			if (scroller.current) {
				scroller.current.appendChild(duplicatedItem);
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
			}
		);

		return () => {
			animation.cancel();
		};
	}, [speed]);

	return (
		<div className="w-full overflow-hidden py-5 lg:py-10">
			<div ref={scroller} className="flex items-center gap-x-5">
				{EXAMS.map(({ label }) => (
					<div
						key={label}
						className="relative mx-2 aspect-[3/1] w-20 flex-shrink-0 bg-transparent lg:w-40">
						<p className="text-lg font-bold uppercase lg:text-2xl">{label}</p>
					</div>
				))}
			</div>
		</div>
	);
};
