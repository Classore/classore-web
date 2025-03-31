import ReactConfetti from "react-confetti";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { useWindowSize } from "@/hooks";

const Page = () => {
	const { height, width } = useWindowSize();

	return (
		<div className="grid h-screen w-screen place-items-center">
			<ReactConfetti width={width} height={height} numberOfPieces={500} />
			<div className="flex flex-col items-center gap-y-5 text-center">
				<div className="relative h-[30px] w-[135px] px-6">
					<Image src="/assets/images/classore.png" alt="classore" fill sizes="(max-width:1024px)100%" />
				</div>
				<h2 className="text-xl font-semibold">
					Your payment was successful. You can now begin learning.
				</h2>
				<Button asChild className="w-fit">
					<Link href="/signin">Proceed to login</Link>
				</Button>
			</div>
		</div>
	);
};

export default Page;
