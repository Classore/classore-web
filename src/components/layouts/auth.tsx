import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

import {
	onlineLearning,
	solutionIllustration,
	testingIllustration,
} from "@/assets/illustrations";
import { classore } from "@/assets/images";

type Screen = "signin" | "signup" | "forgot-password" | "reset-password";

// since you are already passing screens, we have auto inject the images and the text in the auth layout based on the screen name
const authIllustration: Record<Screen, StaticImageData> = {
	signup: onlineLearning,
	signin: testingIllustration,
	"forgot-password": solutionIllustration,
	"reset-password": solutionIllustration,
};

export function AuthLayout({
	children,
	screen,
}: {
	children: React.ReactNode;
	screen: Screen;
}) {
	return (
		<main className="mx-auto flex flex-col bg-white lg:grid lg:grid-cols-5">
			<aside className="sticky top-0 col-span-2 hidden h-dvh flex-col gap-12 self-start bg-primary-100 p-10 pl-20 lg:flex">
				<Link href="/" className="w-fit">
					<Image src={classore} alt="classore" width={140} height={32} />
				</Link>
				<h1 className="font-body text-4xl font-bold text-neutral-500">
					Learning without limits, right where you are with{" "}
					<span className="text-secondary-300">Classore</span>
				</h1>
				<Image
					src={authIllustration[screen]}
					alt="online learning illustration"
					className="absolute -right-11 bottom-0 max-w-md"
				/>
			</aside>

			<section className="mx-auto min-h-dvh w-96 bg-white px-6 py-10 lg:col-span-3 lg:mx-0 lg:w-full lg:px-32 lg:py-6">
				{children}
			</section>
		</main>
	);
}
