import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib";
import { renewPlan } from "@/queries/user";
import type { UserProfileResp } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Lock02 } from "@untitled-ui/icons-react";
import * as React from "react";
import { Spinner } from "../shared";
import { Button } from "../ui/button";

interface RenewalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	bundle: UserProfileResp["time_line"][number];
}

export const RenewalModal = ({ open, setOpen, bundle }: RenewalProps) => {
	const [visible, setVisible] = React.useState(false);

	console.log("bundle", bundle);

	const { mutate, isPending } = useMutation({
		mutationKey: ["renew"],
		mutationFn: () => renewPlan(bundle.id),
		onSuccess: (data) => {
			setVisible(true);
			window.open(data.data.authorization_url, "_self");
		},
	});

	if (!bundle) return null;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="flex w-96 flex-col gap-6">
				<DialogHeader>
					<h3 className="text-2xl font-bold">Renew Plan</h3>
					<p className="text-sm text-neutral-400">
						Your bundle plan has expired. Please renew your subscription to continue accessing
						this bundle.
					</p>
				</DialogHeader>

				<ul className="flex flex-col gap-4">
					<li>
						<p className="text-sm text-neutral-400">Exam type:</p>
						<p className="font-medium capitalize">{bundle.exam.name}</p>
					</li>
					<li>
						<p className="text-sm text-neutral-400">Bundle:</p>
						<p className="font-medium capitalize">
							{bundle.exam_bundle_details.name} Prep Bundle
						</p>
					</li>
					<li>
						<p className="text-sm text-neutral-400">Number of subjects:</p>
						<p className="font-medium capitalize">{bundle.subjects.length}</p>
					</li>
					<li>
						<p className="text-sm text-neutral-400">Renewal amount:</p>
						<p className="font-medium">{formatCurrency(Number(bundle.renewal_amount))}</p>
					</li>
				</ul>

				<div className="flex flex-col gap-1">
					<Button onClick={() => mutate()} type="submit" disabled={isPending}>
						{isPending ? (
							<Spinner />
						) : (
							`Renew for ${formatCurrency(Number(bundle.renewal_amount ?? 0))}`
						)}
					</Button>
					<div className="flex items-center gap-1.5 self-center text-neutral-500">
						<Lock02 width={16} />
						<p className="text-center text-xs">Payment secured by Paystack</p>
					</div>
				</div>

				{visible ? (
					<div className="absolute inset-0 z-50 mx-auto grid place-items-center gap-4 rounded-md bg-white/50 p-10 text-center text-sm text-neutral-600 backdrop-blur-sm backdrop-filter">
						<div className="grid place-items-center gap-4 rounded-lg p-10">
							<Spinner variant="primary" size="md" />
							<p className="leading-tight">
								Please wait while we redirect you to the payment page...
							</p>
							<p className="text-xs font-bold">
								NB: <br />
								DO NOT CLOSE THIS WINDOW OR REFRESH THE PAGE
							</p>
						</div>
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	);
};
