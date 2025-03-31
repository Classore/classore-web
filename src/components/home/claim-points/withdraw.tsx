import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";
import * as z from "zod";

import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
	onScreenChange: (screen: string) => void;
}

const schema = z.object({
	amount: z.string(),
});

type FormValues = z.infer<typeof schema>;

export const Withdraw = ({ onScreenChange }: Props) => {
	const { control, handleSubmit, watch } = useForm<FormValues>({
		defaultValues: { amount: "" },
		resolver: zodResolver(schema),
	});

	const values = watch();

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		console.log(data);
		if (Number(values.amount) < 0) {
			toast.error("Amount must be greater than 0");
			return;
		}
		if (Number(values.amount) > 100) {
			toast.error("Amount must be less than 100% of total accumulated points");
			return;
		}
		onScreenChange("summary");
	};

	return (
		<div>
			<div className="space-y-2">
				<DialogTitle>Withdraw</DialogTitle>
				<DialogDescription>Enter the amount you want to withdraw.</DialogDescription>
			</div>
			<div className="my-4 space-y-4">
				<Input control={control} label="Enter Amount" name="amount" type="number" />
			</div>
			<div className="mt-4 flex items-center justify-end gap-x-4">
				<Button className="w-fit" onClick={() => onScreenChange("initial")} size="sm" variant="outline">
					Back
				</Button>
				<Button className="w-fit" onClick={handleSubmit(onSubmit)} size="sm">
					Next
				</Button>
			</div>
		</div>
	);
};
