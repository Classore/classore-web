import React from "react";

import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
	onOpenChange: (open: boolean) => void;
}

export const Success = ({ onOpenChange }: Props) => {
	return (
		<div>
			<div className="space-y-2">
				<DialogTitle>Withdraw</DialogTitle>
				<DialogDescription>Enter the amount you want to withdraw.</DialogDescription>
			</div>
			<div className="mt-4 flex items-center justify-end gap-x-4">
				<Button className="w-fit" onClick={() => onOpenChange(false)} size="sm">
					Done
				</Button>
			</div>
		</div>
	);
};
