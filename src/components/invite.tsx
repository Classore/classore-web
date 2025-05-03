import { RiFileCopyLine, RiShare2Line } from "@remixicon/react";
import { toast } from "sonner";
import React from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useUserStore } from "@/store/z-store";
import { Button } from "./ui/button";
import { IconLabel } from "./shared";

const copyText = (str?: string) => {
	if (!str) return;
	navigator.clipboard.writeText(str);
	toast.success("Copied to clipboard");
};

export const Invite = () => {
	const [open, setOpen] = React.useState(false);
	const { user } = useUserStore();

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button className="w-fit px-5 py-2" variant="dark">
					Invite
				</Button>
			</DialogTrigger>
			<DialogContent>
				<IconLabel icon={RiShare2Line} />
				<div className="space-y-2">
					<DialogTitle>Invite Others</DialogTitle>
					<DialogDescription>
						Invite others to Classore and get rewarded whenever they subscribe to an exam bundle.
					</DialogDescription>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex items-center justify-between gap-y-5">
						<p className="text-sm text-neutral-400">Your Referral Code</p>
						<Button className="w-fit" onClick={() => copyText(user?.referral_code)} variant="outline">
							{user?.referral_code} <RiFileCopyLine />
						</Button>
					</div>
					<div className="flex h-8 w-full items-center gap-x-2 rounded-md border px-2">
						<input
							type="text"
							value={`https://classore.com/signup?referral_code=${user?.referral_code}`}
							className="h-full flex-1 border-none px-0 text-sm outline-none ring-0"
							readOnly
						/>
						<button
							onClick={() => copyText(`https://classore.com/signup?referral_code=${user?.referral_code}`)}>
							<RiFileCopyLine className="size-4 text-neutral-400" />
						</button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
