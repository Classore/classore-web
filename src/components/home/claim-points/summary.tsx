import React from "react";

import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
	onScreenChange: (screen: string) => void;
}

export const Summary = ({ onScreenChange }: Props) => {
	return (
		<div>
			<div className="space-y-2">
				<DialogTitle>Summary</DialogTitle>
				<DialogDescription>Please verify that all information are correct.</DialogDescription>
			</div>
			<div className="mt-4 flex items-center justify-end gap-x-4">
				<Button className="w-fit" onClick={() => onScreenChange("initial")} size="sm" variant="outline">
					Back
				</Button>
				<Button className="w-fit" onClick={() => onScreenChange("summary")} size="sm">
					Next
				</Button>
			</div>
		</div>
	);
};
