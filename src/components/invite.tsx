import { RiShare2Line } from "@remixicon/react";
import React from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { IconLabel } from "./shared";

export const Invite = () => {
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button className="w-fit px-5 py-2" variant="dark">
					Invite
				</Button>
			</DialogTrigger>
			<DialogContent>
				<IconLabel icon={RiShare2Line} />
				<div>
					<DialogTitle>Invite Others</DialogTitle>
					<DialogDescription>
						Inviet others to Classore and get rewarded whenever they subscribe to an exam bundle.
					</DialogDescription>
				</div>
			</DialogContent>
		</Dialog>
	);
};
