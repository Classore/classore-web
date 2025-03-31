import { RiGiftLine } from "@remixicon/react";
import React from "react";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Withdraw } from "./claim-points/withdraw";
import { Initial } from "./claim-points/initial";
import { Success } from "./claim-points/success";
import { Summary } from "./claim-points/summary";
import { IconLabel } from "../shared";

export const ClaimPoints = () => {
	const [screen, setScreen] = React.useState("initial");
	const [open, setOpen] = React.useState(false);

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<button className="flex h-8 w-fit items-center gap-x-2 rounded-md border border-primary-400 px-3 text-sm text-primary-400 transition-all duration-300 hover:bg-primary-50 active:scale-95">
					<RiGiftLine size={16} /> Claim Points
				</button>
			</DialogTrigger>
			<DialogContent>
				<IconLabel icon={RiGiftLine} />
				{screen === "initial" && <Initial onOpenChange={setOpen} onScreenChange={setScreen} />}
				{screen === "withdraw" && <Withdraw onScreenChange={setScreen} />}
				{screen === "summary" && <Summary onScreenChange={setScreen} />}
				{screen === "success" && <Success onOpenChange={setOpen} />}
			</DialogContent>
		</Dialog>
	);
};
