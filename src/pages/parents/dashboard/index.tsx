import { RiAddLine, RiFileCopyLine } from "@remixicon/react";
import Link from "next/link";
import React from "react";

import { ReferralItem, WithdrawPoints, WithdrawalItem } from "@/components/dashboard";
import { ParentDashboardLayout } from "@/components/layouts";
import { Seo, Sharer, TabPanel } from "@/components/shared";
import { useGetParentHome } from "@/queries/parent";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/z-store";
import { Ward } from "@/components/parents";
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

	const { data: parentHome } = useGetParentHome();

	const renderTabContent = () => {
		if (tab === "referral") {
			return (
				<TabPanel selected={tab} value="referral">
					{RenderReferrals()}
				</TabPanel>
			);
		}
		return (
			<TabPanel selected={tab} value="withdrawal">
				{RenderWithdrawals()}
			</TabPanel>
		);
	};

	const RenderReferrals = () => {
		const data = React.useMemo(() => {
			if (!parentHome?.referral_history) return [];
			return parentHome.referral_history.data;
		}, []);

		if (!data.length) {
			return (
				<div className="grid min-h-[300px] w-full place-items-center">
					<p className="text-sm text-primary-400">No referrals to display.</p>
				</div>
			);
		}

		return (
			<>
				{data.map((referral, index) => (
					<ReferralItem key={index} referral={referral} />
				))}
				<div className="flex items-center justify-center">
					<Link href="/dashboard/referrals" className="link text-sm">
						See all referrals
					</Link>
				</div>
			</>
		);
	};

	const RenderWithdrawals = () => {
		const data = React.useMemo(() => {
			if (!parentHome?.withdrawal_history) return [];
			return parentHome?.withdrawal_history.data;
		}, []);

		if (!data.length) {
			return (
				<div className="grid min-h-[300px] w-full place-items-center">
					<p className="text-sm text-primary-400">No withdrawals to display.</p>
				</div>
			);
		}

		return (
			<>
				{data.map((withdrawal) => (
					<WithdrawalItem key={withdrawal.withdrawal_id} withdrawal={withdrawal} />
				))}
				<div className="flex items-center justify-center">
					<Link href="/dashboard/withdrawals" className="link text-sm">
						See all withdrawals
					</Link>
				</div>
			</>
		);
	};

	return (
		<>
			<Seo title="Parent's Dashboard" />
			<ParentDashboardLayout>
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
								<Button className="w-fit" size="sm" asChild>
									<Link href="/parents/dashboard/add-ward">
										<RiAddLine /> Add Ward
									</Link>
								</Button>
							</div>
							{!parentHome?.my_wards ? (
								<div className="grid min-h-[300px] w-full place-items-center">
									<p className="text-sm text-primary-400">No wards to display.</p>
								</div>
							) : (
								<div className="grid w-full grid-cols-1 gap-2 bg-[#F6F8FA] p-2 lg:grid-cols-2">
									{parentHome.my_wards.map((ward) => (
										<Ward key={ward.id} ward={ward} />
									))}
								</div>
							)}
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
												<h3 className="text-2xl font-semibold text-white">
													{parentHome?.referral_points.referral_points} Points
												</h3>
												<p className="text-sm text-neutral-100">
													Your points equals {formatCurrency(parentHome?.referral_points.monetary_value || 0)}
												</p>
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
												<h4 className="text-2xl">{parentHome?.referral_code}</h4>
											</div>
											<div className="flex items-center gap-x-2">
												<Sharer
													onOpenChange={(share) => handleModalStateChange("share", share)}
													open={modalStates.share}
													url={`https://classore.com/signup?step=1&referral_code=${""}` || ""}
													title=""
													description=""
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
									<div className="min-h-[300px] w-full space-y-4">{renderTabContent()}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ParentDashboardLayout>
		</>
	);
};

export default Page;
