import Image from "next/image";
import Link from "next/link";

import type { PersonalizedPlanProps } from "@/constants";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { AppStore, PlayStore } from "../shared/app-download";
import MobileAppImg from "@/assets/images/mobile-img.webp";

interface Props {
	data: PersonalizedPlanProps;
}

export const PersonalizedPlanCard = ({ data }: Props) => {
	if (data.type === "photo") {
		return (
			<div className="relative flex aspect-square w-full items-center justify-center">
				<Image src={data.image} alt="personalized-plan" fill sizes="100%" className="object-cover" />
			</div>
		);
	}

	if (data.type === "link") {
		return (
			<div className="flex aspect-square w-full flex-col justify-center gap-y-3 p-3">
				<div className="">
					<h4 className="font-medium lg:text-lg">{data.title}</h4>
					<p className="text-sm text-neutral-400">{data.description}</p>
				</div>
				<Button className="w-fit" asChild>
					<Link href={String(data.href)} target="_blank">
						{data.buttonText}
					</Link>
				</Button>
			</div>
		);
	}

	if (data.type === "modal") {
		return (
			<div className="flex aspect-square w-full flex-col justify-center gap-y-3 p-3">
				<div className="">
					<h4 className="font-medium lg:text-lg">{data.title}</h4>
					<p className="text-sm text-neutral-400">{data.description}</p>
				</div>

				<Dialog>
					<DialogTrigger asChild>
						<Button className="w-fit">{data.buttonText}</Button>
					</DialogTrigger>
					<DialogContent className="md:w-[400px]">
						<div className="flex w-full flex-col gap-6">
							<DialogHeader className="space-y-1">
								<DialogTitle>Download Mobile App</DialogTitle>
								<DialogDescription>
									Download the mobile app for a seamless experience on the go.
								</DialogDescription>
							</DialogHeader>
							<div className="flex items-center justify-center">
								<Image
									src={MobileAppImg}
									alt="mobile-app"
									width={200}
									height={200}
									// fill
									// sizes='100%'
									className="object-cover"
								/>
							</div>
							<div className="flex w-full items-center gap-x-5">
								<AppStore />
								<PlayStore />
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		);
	}

	return (
		<div className="w-full overflow-hidden rounded-lg bg-white p-3">
			<div className="relative h-[250px] w-full">
				<Image src={data.image} alt="personalized-plan" fill sizes="100%" className="object-cover" />
			</div>
			<div className="p-3">
				<h4 className="font-medium lg:text-lg">{data.title}</h4>
				<p className="text-sm text-neutral-400">{data.description}</p>
			</div>
		</div>
	);
};
