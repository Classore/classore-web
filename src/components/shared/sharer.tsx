import { RiShareLine } from "@remixicon/react";
import { toast } from "sonner";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { share_links } from "@/config/links";
import { IconLabel } from "./icon-label";

interface Props {
	onOpenChange: (open: boolean) => void;
	open: boolean;
	url: string;
	title: string;
	description: string;
}

export const Sharer = ({ onOpenChange, open, url, title, description }: Props) => {
	const handleCopy = (url: string) => {
		navigator.clipboard.writeText(url);
		toast.success("Link copied!");
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<button className="flex h-10 w-[90px] items-center justify-center gap-x-2 rounded-3xl bg-white px-4 py-3 text-xs">
					Share <RiShareLine className="size-4" />
				</button>
			</DialogTrigger>
			<DialogContent className="w-[400px] p-1">
				<div className="space-y-6 rounded-lg border p-4 pt-9">
					<IconLabel icon={RiShareLine} />
					<div className="space-y-0.5">
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</div>
					<div className="w-full space-y-3">
						{share_links(url).map(({ action, href, icon: Icon, label }, index) => {
							if (action === "share") {
								return (
									<div key={index} className="flex items-center gap-x-4">
										<Icon className="size-5" />
										<a href={href} target="_blank" className="link text-sm">
											{label}
										</a>
									</div>
								);
							} else {
								return (
									<div key={index} className="flex items-center gap-x-4">
										<Icon className="size-5" />
										<p onClick={() => handleCopy(href)} className="link cursor-pointer text-sm">
											{label}
										</p>
									</div>
								);
							}
						})}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
