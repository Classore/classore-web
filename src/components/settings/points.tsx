import { RiDownload2Line, RiFileCopyLine, RiUserAddLine } from "@remixicon/react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import React from "react";
import { z } from "zod";

import { useAddAccountDetails, useGetAccountDetails, useGetBanks } from "@/queries/bank";
import { Sharer, Spinner, TabPanel } from "../shared";
import { Select, SelectItem } from "../ui/select";
import { useUserStore } from "@/store/z-store";
import { Coin } from "@/assets/svgs/coin";
import { formatCurrency } from "@/lib";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const tabs = [
	{ label: "Withdrawal History", name: "withdrawal", icon: RiDownload2Line },
	{ label: "Referrals", name: "referral", icon: RiUserAddLine },
];

const schema = z.object({
	account_number: z
		.string()
		.min(10, "Account number cannot be less than 10 digits")
		.max(10, "Account number cannot be less than 10 digits"),
	bank_id: z.string().min(1, "Please select a bank"),
});

type FormValues = z.infer<typeof schema>;

const Points = () => {
	const queryClient = useQueryClient();
	const [tab, setTab] = React.useState("withdrawal");
	const [open, setOpen] = React.useState(false);
	const { user } = useUserStore();

	const copy = (str: string) => {
		window.navigator.clipboard.writeText(str);
		toast.success("Link copied");
	};

	const { data: banks } = useGetBanks({ limit: 200, page: 1 });
	const options = React.useMemo(() => {
		if (!banks) return [];
		return banks.data.map((bank) => ({
			label: bank.bank_name,
			value: bank.bank_id,
		}));
	}, [banks]);

	const { data, isPending } = useGetAccountDetails();

	const { control, handleSubmit, reset } = useForm<FormValues>({
		values: {
			account_number: data?.bank_details.at(0)?.bank_detail_account_number ?? "",
			bank_id: data?.bank_details.at(0)?.bank_detail_bank_id ?? "",
		},
		resolver: zodResolver(schema),
	});

	const { mutate, isPending: mutatePending } = useAddAccountDetails(
		() => {
			queryClient.invalidateQueries({
				queryKey: ["account-details"],
			});
			toast.success("Bank Details added successfully");
		},
		(error) => {
			const errorMessage = Array.isArray(error.response.data.message)
				? error.response.data.message[0]
				: error.response.data.message;
			const message = errorMessage || "Something went wrong, please try again";
			toast.error(message);
		},
		() => {
			reset();
		}
	);

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		mutate(data);
	};

	const handleReset = () => {
		reset({ account_number: "", bank_id: "" });
	};

	return (
		<div
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-full flex-col gap-5 overflow-y-auto border-b border-t py-6">
			<div className="grid w-full gap-x-3 md:grid-cols-2">
				<div className="flex aspect-[1.6/1] w-full flex-col justify-between bg-gradient-to-r from-primary-200 to-primary-500 px-4 py-3 md:rounded-md">
					<div className="size-8 rounded-full bg-white/50">
						<Coin className="text-white" />
					</div>
					<div>
						<p className="text-xl font-semibold text-white">0 Points</p>
						<p className="text-xs text-neutral-200">Your points equals {formatCurrency(0)}</p>
					</div>
					<Button type="button" className="bg-white/50 text-white hover:bg-white/25" size="sm">
						Withdraw Points
					</Button>
				</div>
				<div className="flex aspect-[1.6/1] w-full flex-col justify-between bg-gradient-to-r from-primary-100 to-primary-200 px-4 py-3 md:rounded-md">
					<div>
						<p className="text-sm text-neutral-400">Referral Code</p>
						<p className="text-lg font-medium">{user?.referral_code}</p>
					</div>
					<div className="flex w-full items-center gap-x-4">
						<Sharer
							onOpenChange={setOpen}
							open={open}
							title="Share Referral Code"
							description="Share your referral code to get more points."
							url=""
						/>
						<button
							type="button"
							onClick={() => copy("")}
							className="flex h-10 w-[90px] items-center justify-center gap-x-2 rounded-3xl bg-white px-4 py-3 text-xs">
							<RiFileCopyLine className="size-4" /> Copy
						</button>
					</div>
				</div>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
				<div className="flex flex-col gap-4">
					<Select disabled={isPending} control={control} name="bank_id" label="Select Bank">
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</Select>
					<Input
						disabled={isPending}
						control={control}
						name="account_number"
						type="text"
						label="Enter Account Number"
					/>
				</div>
				<div className="flex w-full items-center justify-end gap-x-4">
					<Button className="w-fit" size="sm" onClick={handleReset} type="button" variant="outline">
						Reset Changes
					</Button>
					<Button className="w-fit" size="sm" type="submit">
						{mutatePending ? <Spinner /> : "Save Changes"}
					</Button>
				</div>
			</form>
			<div className="w-full">
				<div className="flex h-9 w-full items-center border-b">
					{tabs.map(({ icon: Icon, label, name }) => (
						<button
							key={name}
							onClick={() => setTab(name)}
							className={`relative flex h-full items-center gap-2 rounded-md px-3 text-sm before:absolute before:bottom-0 before:left-0 before:h-0.5 before:bg-primary-400 ${name === tab ? "text-primary-400 before:w-full" : "text-neutral-400 before:w-0"}`}>
							<Icon size={14} />
							<span>{label}</span>
						</button>
					))}
				</div>
				<TabPanel selected={tab} value="referral">
					<div></div>
				</TabPanel>
				<TabPanel selected={tab} value="withdrawal">
					<div></div>
				</TabPanel>
			</div>
		</div>
	);
};

export default Points;
