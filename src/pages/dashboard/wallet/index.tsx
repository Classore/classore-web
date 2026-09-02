import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useRouter } from "next/router";
import { RiCoinLine, RiExternalLinkLine, RiTokenSwapLine } from "@remixicon/react";

import { DashboardLayout } from "@/components/layouts";
import { Seo } from "@/components/shared";
import { useUserStore } from "@/store/z-store";
import {
	type TokenPackage,
	useGetTokenPackages,
	usePurchaseTokensPaystack,
} from "@/queries/token-wallet";
import { toast } from "sonner";

const PackageCard = ({
	pkg,
	onSelect,
	isPending,
}: {
	pkg: TokenPackage;
	onSelect: (pkg: TokenPackage) => void;
	isPending: boolean;
}) => {
	const hasBonus = pkg.bonus_tokens > 0;

	return (
		<button
			onClick={() => onSelect(pkg)}
			disabled={isPending}
			className="group relative flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 text-left transition-all hover:border-primary-300 hover:shadow-md disabled:opacity-60"
		>
			{hasBonus && (
				<span className="absolute right-3 top-3 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-600 border border-green-200">
					+{pkg.bonus_tokens} bonus
				</span>
			)}

			{/* Icon */}
			<div className="flex size-10 items-center justify-center rounded-xl bg-primary-50">
				<RiCoinLine className="size-5 text-primary-600" />
			</div>

			{/* Token count */}
			<div>
				<p className="text-3xl font-bold text-primary-600">
					{pkg.base_tokens.toLocaleString()}
				</p>
				<p className="text-xs text-neutral-400">tokens</p>
			</div>

			{/* Name */}
			<p className="text-sm font-medium capitalize text-neutral-700">{pkg.name}</p>

			{/* Price CTA */}
			<div className="mt-auto border-t border-neutral-100 pt-3">
				{isPending ? (
					<p className="text-center text-xs text-neutral-400">Processing…</p>
				) : (
					<p className="flex items-center justify-center gap-1 text-sm font-semibold text-neutral-800">
						₦{pkg.price.toLocaleString()}
						<RiExternalLinkLine className="size-3 text-neutral-400" />
					</p>
				)}
			</div>
		</button>
	);
};

import { useGetProfile } from "@/queries/student";

const findPaymentUrl = (obj: any): string | null => {
	if (!obj) return null;
	if (typeof obj === "string") {
		if (obj.startsWith("http://") || obj.startsWith("https://")) {
			return obj;
		}
		return null;
	}
	if (typeof obj !== "object") return null;

	const preferred =
		obj.checkout_url ||
		obj.authorization_url ||
		obj.payment_link ||
		obj.link ||
		obj.url;
	if (preferred) {
		const found = findPaymentUrl(preferred);
		if (found) return found;
	}

	for (const key of Object.keys(obj)) {
		const found = findPaymentUrl(obj[key]);
		if (found) return found;
	}
	return null;
};

const Page = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { user } = useUserStore();
	const { data: profile } = useGetProfile();
	const [pendingPkgId, setPendingPkgId] = React.useState<string | null>(null);

	const tokenBalance = profile?.wallet?.token_balance ?? user?.wallet?.token_balance ?? 0;

	// Detect returning from Paystack redirect
	React.useEffect(() => {
		const { trxref, reference } = router.query;
		if (trxref || reference) {
			toast.success("Payment received! Your token balance will update shortly.");
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			router.replace("/dashboard/wallet", undefined, { shallow: true });
		}
	}, [router.query, queryClient, router]);

	const { data: packages, isLoading: packagesLoading } = useGetTokenPackages();

	const purchaseMutation = usePurchaseTokensPaystack({
		onSuccess: (data) => {
			const url = findPaymentUrl(data);
			if (url) {
				window.location.href = url;
			} else {
				toast.error("Could not get payment link. Please try again.");
				console.error("[Paystack] No URL found in response:", data);
			}
			setPendingPkgId(null);
		},
		onError: (err: any) => {
			console.error("[Paystack init error]", err);
			const errMsg =
				err?.response?.data?.message ||
				err?.message ||
				"Could not initialize payment. Please try again.";
			toast.error(typeof errMsg === "string" ? errMsg : "Could not initialize payment. Please try again.");
			setPendingPkgId(null);
		},
	});

	const handleSelectPackage = (pkg: TokenPackage) => {
		setPendingPkgId(pkg.id);
		purchaseMutation.mutate({ packageId: pkg.id, origin: "web" });
	};

	return (
		<>
			<Seo title="Token Wallet" />
			<DashboardLayout>
				<div className="mx-auto max-w-3xl space-y-8">
					{/* Header */}
					<div>
						<h1 className="text-2xl font-bold text-neutral-900">Token Wallet</h1>
						<p className="mt-1 text-sm text-neutral-500">
							Buy tokens to purchase study bundles without a bank card.
						</p>
					</div>

					{/* Balance card */}
					<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 text-white shadow-lg">
						<div className="relative z-10 space-y-4">
							<div className="flex items-center justify-between">
								<p className="text-sm text-white/70">Available Balance</p>
								<div className="flex items-center gap-x-2 rounded-full bg-white/10 px-3 py-1">
									<RiTokenSwapLine className="size-3" />
									<span className="text-xs">Classore Tokens</span>
								</div>
							</div>
							<div>
								<p className="text-5xl font-bold">
									{tokenBalance.toLocaleString()}
								</p>
								<p className="mt-1 text-sm text-white/60">tokens</p>
							</div>
							<p className="text-xs text-white/70 leading-relaxed">
								Use tokens to purchase any study bundle at checkout. Tokens are non-refundable.
							</p>
						</div>
						{/* Decorative ring */}
						<div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/5" />
						<div className="absolute -bottom-12 -right-4 size-48 rounded-full bg-white/5" />
					</div>

					{/* Packages */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="text-base font-semibold text-neutral-800">
								Token Packages
							</h2>
							<p className="text-xs text-neutral-400">
								Click a pack to purchase via Paystack
							</p>
						</div>

						{packagesLoading ? (
							<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
								{Array.from({ length: 3 }).map((_, i) => (
									<div
										key={i}
										className="h-48 animate-pulse rounded-2xl bg-neutral-100"
									/>
								))}
							</div>
						) : !packages?.length ? (
							<div className="rounded-xl border border-dashed border-neutral-200 py-12 text-center">
								<RiCoinLine className="mx-auto mb-3 size-10 text-neutral-300" />
								<p className="text-sm text-neutral-400">
									No token packages available right now.
								</p>
							</div>
						) : (
							<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
								{packages.map((pkg) => (
									<PackageCard
										key={pkg.id}
										pkg={pkg}
										onSelect={handleSelectPackage}
										isPending={
											pendingPkgId === pkg.id ||
											(purchaseMutation.isPending && pendingPkgId === pkg.id)
										}
									/>
								))}
							</div>
						)}
					</div>

					{/* How it works */}
					<div className="rounded-2xl border border-neutral-100 bg-white p-5 space-y-4">
						<h3 className="text-sm font-semibold text-neutral-800">
							How Tokens Work
						</h3>
						<div className="space-y-3">
							{[
								{
									step: "1",
									title: "Buy a token pack",
									desc: "Select a pack above and pay with Paystack. Tokens are credited instantly.",
								},
								{
									step: "2",
									title: "Use tokens at checkout",
									desc: 'When enrolling in a bundle, choose "Pay with Tokens" and your balance will be deducted.',
								},
								{
									step: "3",
									title: "Chat access unlocked",
									desc: "Token purchases automatically unlock your forum channels for the bundle.",
								},
							].map((item) => (
								<div key={item.step} className="flex gap-x-3">
									<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-600">
										{item.step}
									</div>
									<div>
										<p className="text-sm font-medium text-neutral-800">
											{item.title}
										</p>
										<p className="text-xs text-neutral-500 leading-relaxed">
											{item.desc}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
};

export default Page;
