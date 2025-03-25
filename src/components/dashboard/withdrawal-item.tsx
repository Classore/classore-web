import { RiDownload2Line } from "@remixicon/react";
import { format } from "date-fns";
import React from "react";

import type { ParentWithdrawalProps } from "@/types/parent";

interface Props {
	withdrawal: ParentWithdrawalProps;
}

const STATUS_COLOR: Record<string, string> = {
	successful: "bg-green-100 text-green-700",
	failed: "bg-red-100 text-red-700",
	pending: "bg-amber-100 text-amber-700",
} as const;

export const WithdrawalItem = ({ withdrawal }: Props) => {
	return (
		<div className="flex h-10 w-full items-center justify-between">
			<div className="flex items-center gap-x-2">
				<div className="-inset-10 grid size-10 place-items-center rounded-full border shadow-xl">
					<RiDownload2Line className="size-5 text-neutral-600" />
				</div>
				<div className="">
					<p className="text-sm font-medium">Withdrawal</p>
					<p className="text-xs text-neutral-400">
						{format(withdrawal.withdrawal_createdOn, "MMM dd, HH:mm a")}
					</p>
				</div>
			</div>
			<div className="flex flex-col items-end">
				<p className="text-sm font-medium">{withdrawal.withdrawal_amount} Points</p>
				<div
					className={`flex w-fit items-center rounded-md px-3 py-0.5 text-xs capitalize ${STATUS_COLOR[withdrawal.withdrawal_status]}`}>
					{withdrawal.withdrawal_status}
				</div>
			</div>
		</div>
	);
};
