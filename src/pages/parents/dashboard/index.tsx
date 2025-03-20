import { RiAddLine, RiFileCopyLine } from "@remixicon/react";
import { useQueries } from "@tanstack/react-query";
import React from "react";

import { ParentPashboardLayout } from "@/components/layouts";
import { WithdrawPoints } from "@/components/dashboard";
import { Seo, Sharer } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/z-store";
import { Coin } from "@/assets/svgs/coin";
import { formatCurrency } from "@/lib";
import { TAB_OPTIONS } from "@/config";

function greetUser() {
	let greeting: string;
	const hour = new Date().getHours();

	if (hour >= 5 && hour < 12) {
		greeting = "Good morning";
	} else if (hour >= 12 && hour < 18) {
		greeting = "Good afternoon";
	} else if (hour >= 18 && hour < 22) {
		greeting = "Good evening";
	} else {
		greeting = "Good night";
	}
	return greeting;
}

const initialModalStates = { share: false, withdraw: false };

const Page = () => {
	const [modalStates, setModalStates] = React.useState(initialModalStates);
	const [tab, setTab] = React.useState("referral");
	const { user } = useUserStore();

	const handleModalStateChange = (modal: keyof typeof initialModalStates, state: boolean) => {
		setModalStates((prev) => ({ ...prev, [modal]: state }));
	};

	const [] = useQueries({ queries: [] });

	return (
		<>
			<Seo title="Parent's Dashboard" />
			<ParentPashboardLayout>
				<div className="h-full w-full space-y-6 overflow-y-auto bg-[#F6F8FA]">
					<div className="flex w-full flex-col justify-between gap-4 overflow-y-auto rounded-2xl bg-gradient-to-r from-secondary-50 via-primary-100 to-primary-50 p-6 md:items-center md:px-10 md:py-[52px] lg:flex-row lg:gap-[177px]">
						<div className="flex flex-col gap-2">
							<h1 className="text-2xl font-semibold capitalize">
								{greetUser()}, {user?.first_name}
							</h1>
							<p className="text-sm text-neutral-400">Monitor your ward&apos;s progress with Classore</p>
						</div>
						<div></div>
					</div>
					<div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
						<div className="space-y-4 rounded-2xl bg-white p-5">
							<div className="flex w-full items-center justify-between">
								<p className="font-semibold">My Wards</p>
								<Button className="w-fit" size="sm">
									<RiAddLine /> Add New Ward
								</Button>
							</div>
							<div className="grid w-full grid-cols-1 gap-2 bg-[#F6F8FA] p-2 lg:grid-cols-2"></div>
						</div>
						<div className="space-y-4 rounded-2xl bg-white p-5">
							<div className="flex w-full items-center justify-between">
								<p className="font-semibold">Referrals</p>
								<Button className="w-fit" size="sm">
									<RiAddLine /> Withdraw Points
								</Button>
							</div>
							<div className="w-full space-y-8 rounded-2xl bg-white">
								<div className="grid w-full grid-cols-2 gap-x-3">
									<div className="w-full rounded-lg bg-gradient-to-r from-[#341f5b]/40 to-[#6f42c1] p-4">
										<div className="w-full space-y-2">
											<div className="grid size-9 place-items-center rounded-full bg-white/25">
												<Coin className="size-6 text-red-500" />
											</div>
											<div className="w-full space-y-1">
												<h3 className="text-2xl font-semibold text-white">0 Points</h3>
												<p className="text-sm text-neutral-100">Your points equals {formatCurrency(0)}</p>
											</div>
											<WithdrawPoints
												onOpenChange={(withdraw) => handleModalStateChange("withdraw", withdraw)}
												open={modalStates.withdraw}
											/>
										</div>
									</div>
									<div className="w-full rounded-lg bg-gradient-to-r from-[#feede3]/40 to-[#6f42c1]/15 p-4">
										<div className="space-y-8 py-1">
											<div>
												<p className="text-sm text-neutral-400">Referral Code</p>
												<h4 className="text-2xl">{"REFERRAL CODE"}</h4>
											</div>
											<div className="flex items-center gap-x-2">
												<Sharer
													onClose={(share) => handleModalStateChange("share", share)}
													open={modalStates.share}
													url={`https://classore.com/signup?step=1&referral_code=${""}` || ""}
												/>
												<button
													onClick={() => {}}
													className="flex h-10 w-[90px] items-center justify-center gap-x-2 rounded-3xl bg-white px-4 py-3 text-xs">
													Copy <RiFileCopyLine className="size-4" />
												</button>
											</div>
										</div>
									</div>
								</div>
								<div className="w-full space-y-4">
									<div className="flex h-10 w-full items-center gap-x-6 border-b">
										{TAB_OPTIONS.map(({ icon: Icon, label, value }) => (
											<button
												key={value}
												onClick={() => setTab(value)}
												className={`relative flex h-full items-center gap-x-2 text-sm font-medium transition-all duration-500 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-primary-400 ${
													tab === value ? "text-primary-400 before:block" : "text-neutral-400 before:hidden"
												}`}>
												<Icon className="size-5" /> {label}
											</button>
										))}
									</div>
									<div className="min-h-[300px] w-full space-y-4"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ParentPashboardLayout>
		</>
	);
};

export default Page;
