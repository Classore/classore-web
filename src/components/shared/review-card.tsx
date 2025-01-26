import { RiStarFill } from "@remixicon/react";
import Image from "next/image";
import React from "react";

import type { ReviewProps } from "@/types";

interface Props {
	review?: ReviewProps;
}

export const ReviewCard = ({}: Props) => {
	return (
		<div className="flex h-fit w-full min-w-[342px] flex-col gap-3 rounded-md border p-4">
			<div className="flex w-full flex-col gap-2">
				<div className="flex items-center gap-1">
					<Stars rating={5} /> <span className="text-xs font-light text-neutral-400">5.0</span>
				</div>
				<div className="max-h-[120px] w-full overflow-hidden">
					<p className="text-sm text-neutral-400">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos officia non iste
						dolorum, ut eveniet, a aperiam quasi ad facilis, fugiat veritatis nisi praesentium
						eius!
					</p>
				</div>
			</div>
			<div className="flex w-full items-center gap-1">
				<div className="relative size-10 rounded-md">
					<Image
						src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="desginer color"
						fill
						sizes="(max-width:1024px)100%"
						className="rounded-md object-cover"
					/>
				</div>
				<div className="flex flex-col">
					<p className="text-sm font-medium">Name</p>
					<p className="text-xs font-light text-neutral-400">Role</p>
				</div>
			</div>
		</div>
	);
};

const Stars = ({ rating }: { rating: number }) => {
	const MAX_RATING = 5;

	return (
		<div className="flex items-center gap-1">
			{[...Array(MAX_RATING)].map((_, index) => (
				<RiStarFill
					key={index}
					className={`size-5 ${index < rating ? "text-yellow-500" : "text-neutral-400"}`}
				/>
			))}
		</div>
	);
};
