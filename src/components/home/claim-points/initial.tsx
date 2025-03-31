import Link from "next/link";
import React from "react";

import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
	onOpenChange: (open: boolean) => void;
	onScreenChange: (screen: string) => void;
}

export const Initial = ({ onOpenChange, onScreenChange }: Props) => {
	return (
		<div>
			<div className="space-y-2">
				<DialogTitle>Claim Points</DialogTitle>
				<DialogDescription>
					You can claim all your accumulated points here. All rewards will be credited to your account.
					You can claim points only once in a day. All rewards and disbursement are subject to the{" "}
					<Link href="/dashboard" className="text-primary-400 underline">
						terms and conditions
					</Link>{" "}
					of Classore.
				</DialogDescription>
			</div>
			<div className="mt-4 flex items-center justify-end gap-x-4">
				<Button className="w-fit" onClick={() => onOpenChange(false)} size="sm" variant="outline">
					Cancel
				</Button>
				<Button className="w-fit" onClick={() => onScreenChange("withdraw")} size="sm">
					Next
				</Button>
			</div>
		</div>
	);
};
