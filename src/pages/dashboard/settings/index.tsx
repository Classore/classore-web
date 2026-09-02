import {
	RiBankCardLine,
	RiCheckLine,
	RiCoinLine,
	RiDeleteBinLine,
	RiFileCopyLine,
	RiGiftLine,
	RiLockPasswordLine,
	RiUploadCloud2Line,
	RiUser3Line,
	RiWalletLine,
} from "@remixicon/react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "sonner";

import { DashboardLayout } from "@/components/layouts";
import { Spinner } from "@/components/shared";
import { Seo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib";
import {
	AddGuardian,
	ChangePasswordMutation,
	UpdateProfileMutation,
	useDeleteAccountMutation,
} from "@/queries/auth";
import {
	useAddAccountDetails,
	useGetAccountDetails,
	useGetBanks,
	useGetReferralPoints,
	useGetReferrals,
	useGetWithdrawalHistory,
	useMakeWithdrawal,
	useRedeemPoints,
	useVerifyBankDetails,
} from "@/queries/bank";
import { useGetClasses } from "@/queries/school";
import { useGetProfile } from "@/queries/student";
import { useQueryClient } from "@tanstack/react-query";

type TabKey = "profile" | "security" | "bank" | "referrals" | "withdrawals" | "danger";

const TABS: { id: TabKey; label: string; icon: any }[] = [
	{ id: "profile", label: "Profile Information", icon: RiUser3Line },
	{ id: "security", label: "Password & Security", icon: RiLockPasswordLine },
	{ id: "bank", label: "Bank Details", icon: RiBankCardLine },
	{ id: "referrals", label: "Points & Referrals", icon: RiGiftLine },
	{ id: "withdrawals", label: "Withdrawals", icon: RiWalletLine },
	{ id: "danger", label: "Danger Zone", icon: RiDeleteBinLine },
];

const Page = () => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = React.useState<TabKey>("profile");

	const { data: profile } = useGetProfile();
	const { data: classes } = useGetClasses();

	// ─── Tab 1: Profile State ──────────────────────────────────────────────────
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [phone, setPhone] = React.useState("");
	const [selectedClass, setSelectedClass] = React.useState("");
	const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
	const [isUpdatingProfile, setIsUpdatingProfile] = React.useState(false);

	// Guardian fields
	const [guardianFirstName, setGuardianFirstName] = React.useState("");
	const [guardianLastName, setGuardianLastName] = React.useState("");
	const [guardianEmail, setGuardianEmail] = React.useState("");
	const [guardianPhone, setGuardianPhone] = React.useState("");
	const [isAddingGuardian, setIsAddingGuardian] = React.useState(false);

	React.useEffect(() => {
		if (profile) {
			setFirstName(profile.first_name || "");
			setLastName(profile.last_name || "");
			setPhone(profile.phone_number || "");
			setSelectedClass((profile as any)?.class || "");
			setAvatarPreview((profile as any)?.profile_image || (profile as any)?.profile_picture || null);
		}
	}, [profile]);

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setAvatarFile(file);
			setAvatarPreview(URL.createObjectURL(file));
		}
	};

	const handleSaveProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsUpdatingProfile(true);
		try {
			await UpdateProfileMutation({
				first_name: firstName,
				last_name: lastName,
				phone_number: phone,
				class: selectedClass,
				profile_image: avatarFile || undefined,
			});
			toast.success("Profile updated successfully!");
			queryClient.invalidateQueries({ queryKey: ["profile"] });
		} catch (err: any) {
			toast.error(err?.response?.data?.message || "Failed to update profile");
		} finally {
			setIsUpdatingProfile(false);
		}
	};

	const handleSaveGuardian = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!guardianFirstName || !guardianLastName || !guardianPhone) {
			toast.error("Please fill all required guardian fields");
			return;
		}
		setIsAddingGuardian(true);
		try {
			await AddGuardian({
				first_name: guardianFirstName,
				last_name: guardianLastName,
				email: guardianEmail || undefined,
				phone_number: guardianPhone,
			});
			toast.success("Guardian details added successfully!");
			setGuardianFirstName("");
			setGuardianLastName("");
			setGuardianEmail("");
			setGuardianPhone("");
		} catch (err: any) {
			toast.error(err?.response?.data?.message || "Failed to add guardian");
		} finally {
			setIsAddingGuardian(false);
		}
	};

	// ─── Tab 2: Security & Password ───────────────────────────────────────────
	const [oldPassword, setOldPassword] = React.useState("");
	const [newPassword, setNewPassword] = React.useState("");
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [isChangingPassword, setIsChangingPassword] = React.useState(false);

	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			toast.error("New passwords do not match");
			return;
		}
		if (newPassword.length < 8) {
			toast.error("Password must be at least 8 characters long");
			return;
		}
		setIsChangingPassword(true);
		try {
			await ChangePasswordMutation({
				old_password: oldPassword,
				new_password: newPassword,
			});
			toast.success("Password changed successfully!");
			setOldPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (err: any) {
			toast.error(err?.response?.data?.message || "Failed to change password");
		} finally {
			setIsChangingPassword(false);
		}
	};

	// ─── Tab 3: Bank Details ─────────────────────────────────────────────────
	const [selectedBankId, setSelectedBankId] = React.useState("");
	const [accountNumber, setAccountNumber] = React.useState("");
	const [verifiedAccountName, setVerifiedAccountName] = React.useState("");

	const { data: banks } = useGetBanks();
	const { data: savedBankData } = useGetAccountDetails();
	const verifyBankDetailsMutation = useVerifyBankDetails();
	const addBankDetailsMutation = useAddAccountDetails();

	const handleVerifyAccount = async () => {
		if (!selectedBankId || accountNumber.length !== 10) {
			toast.error("Please select a bank and enter a valid 10-digit account number");
			return;
		}
		verifyBankDetailsMutation.mutate(
			{ bank_id: selectedBankId, account_number: accountNumber },
			{
				onSuccess: (data) => {
					setVerifiedAccountName(data.data.account_name);
					toast.success(`Account verified: ${data.data.account_name}`);
				},
				onError: (err: any) => {
					setVerifiedAccountName("");
					toast.error(err?.response?.data?.message || "Account verification failed");
				},
			}
		);
	};

	const handleSaveBank = () => {
		if (!selectedBankId || !accountNumber || !verifiedAccountName) {
			toast.error("Please verify account number before saving");
			return;
		}
		addBankDetailsMutation.mutate(
			{ bank_id: selectedBankId, account_number: accountNumber },
			{
				onSuccess: () => {
					setAccountNumber("");
					setVerifiedAccountName("");
					setSelectedBankId("");
				},
			}
		);
	};

	// ─── Tab 4: Points & Referrals ───────────────────────────────────────────
	const { data: pointsData } = useGetReferralPoints();
	const { data: referralsData } = useGetReferrals();
	const redeemPointsMutation = useRedeemPoints();
	const [copiedCode, setCopiedCode] = React.useState(false);
	const [copiedLink, setCopiedLink] = React.useState(false);

	const referralCode = profile?.referral_code || "";
	const referralUrl = typeof window !== "undefined" ? `${window.location.origin}/auth/signup?ref=${referralCode}` : "";

	const totalAvailablePoints = pointsData?.total_available_points ?? 0;
	const totalConvertedAmount = pointsData?.total_converted_points ?? 0;

	const handleCopyCode = () => {
		if (!referralCode) return;
		navigator.clipboard.writeText(referralCode);
		setCopiedCode(true);
		toast.success("Referral code copied!");
		setTimeout(() => setCopiedCode(false), 2000);
	};

	const handleCopyLink = () => {
		if (!referralUrl) return;
		navigator.clipboard.writeText(referralUrl);
		setCopiedLink(true);
		toast.success("Referral link copied!");
		setTimeout(() => setCopiedLink(false), 2000);
	};

	// ─── Tab 5: Withdrawals ──────────────────────────────────────────────────
	const [withdrawalAmount, setWithdrawalAmount] = React.useState("");
	const [withdrawalModalOpen, setWithdrawalModalOpen] = React.useState(false);
	const { data: withdrawalHistory } = useGetWithdrawalHistory();
	const makeWithdrawalMutation = useMakeWithdrawal();

	const walletBalance =
		savedBankData?.wallet?.current_balance ?? (profile as any)?.wallet?.current_balance ?? 0;

	const handleMakeWithdrawal = (e: React.FormEvent) => {
		e.preventDefault();
		const amount = Number(withdrawalAmount);
		if (isNaN(amount) || amount <= 0) {
			toast.error("Please enter a valid withdrawal amount");
			return;
		}
		if (amount > walletBalance) {
			toast.error("Insufficient wallet balance for this withdrawal");
			return;
		}
		makeWithdrawalMutation.mutate(
			{ amount },
			{
				onSuccess: () => {
					setWithdrawalModalOpen(false);
					setWithdrawalAmount("");
				},
			}
		);
	};

	// ─── Tab 6: Danger Zone ──────────────────────────────────────────────────
	const [deleteReason, setDeleteReason] = React.useState("");
	const [deleteConfirmText, setDeleteConfirmText] = React.useState("");
	const deleteAccountMutation = useDeleteAccountMutation();

	const handleDeleteAccount = () => {
		if (!profile?.id) return;
		if (deleteConfirmText !== "DELETE") {
			toast.error("Please type DELETE to confirm");
			return;
		}
		deleteAccountMutation.mutate(
			{ id: profile.id, reason_for_account_delete: deleteReason || "User requested deletion" },
			{
				onSuccess: () => {
					toast.success("Account deleted successfully");
					Cookies.remove("CLASSORE_TOKEN");
					localStorage.clear();
					router.push("/auth/signin");
				},
				onError: (err: any) => {
					toast.error(err?.response?.data?.message || "Failed to delete account");
				},
			}
		);
	};

	return (
		<>
			<Seo title="Account Settings – Classore" noIndex />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-4 py-4 md:px-8">
					{/* Header */}
					<div>
						<h1 className="text-2xl font-bold tracking-tight text-neutral-900">Student Account Settings</h1>
						<p className="mt-0.5 text-xs text-neutral-500">
							Manage your personal profile, bank account, referral points, and security credentials.
						</p>
					</div>

					{/* Navigation tabs */}
					<div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 pb-3">
						{TABS.map(({ id, label, icon: Icon }) => (
							<button
								key={id}
								onClick={() => setActiveTab(id)}
								className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
									activeTab === id
										? "bg-primary-600 text-white shadow-xs"
										: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900"
								}`}>
								<Icon className="size-4" />
								{label}
							</button>
						))}
					</div>

					{/* Tab 1: Profile Information */}
					{activeTab === "profile" && (
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							{/* Personal details */}
							<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs">
								<h3 className="text-base font-bold text-neutral-900">Personal Information</h3>
								<p className="text-xs text-neutral-500 mt-0.5">Update your basic student profile information.</p>

								<form onSubmit={handleSaveProfile} className="mt-5 flex flex-col gap-4">
									{/* Avatar picker */}
									<div className="flex items-center gap-4">
										<div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-primary-200 bg-primary-50">
											{avatarPreview ? (
												<Image
													src={avatarPreview}
													alt="Profile preview"
													fill
													className="object-cover"
												/>
											) : (
												<div className="grid size-full place-items-center text-primary-600 font-bold text-xl">
													{firstName?.[0] || "U"}
												</div>
											)}
										</div>
										<label className="flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100">
											<RiUploadCloud2Line className="size-4 text-neutral-500" />
											Change Photo
											<input
												type="file"
												accept="image/*"
												onChange={handleAvatarChange}
												className="hidden"
											/>
										</label>
									</div>

									<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
										<div className="flex flex-col gap-1.5">
											<label className="text-xs font-medium text-neutral-700">First Name</label>
											<input
												type="text"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
												className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
												required
											/>
										</div>
										<div className="flex flex-col gap-1.5">
											<label className="text-xs font-medium text-neutral-700">Last Name</label>
											<input
												type="text"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
												className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
												required
											/>
										</div>
									</div>

									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-medium text-neutral-700">Email Address</label>
										<input
											type="email"
											value={profile?.email || ""}
											disabled
											className="h-10 rounded-xl border border-neutral-200 bg-neutral-100 px-3 text-xs text-neutral-500 cursor-not-allowed"
										/>
									</div>

									<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
										<div className="flex flex-col gap-1.5">
											<label className="text-xs font-medium text-neutral-700">Phone Number</label>
											<input
												type="tel"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
												className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
											/>
										</div>
										<div className="flex flex-col gap-1.5">
											<label className="text-xs font-medium text-neutral-700">Current Class</label>
											<select
												value={selectedClass}
												onChange={(e) => setSelectedClass(e.target.value)}
												className="h-10 rounded-xl border border-neutral-200 px-3 text-xs capitalize">
												<option value="">Select Class</option>
												{classes?.map((c) => (
													<option key={c.class_id} value={c.class_name}>
														{c.class_name}
													</option>
												))}
											</select>
										</div>
									</div>

									<Button type="submit" disabled={isUpdatingProfile} className="mt-2">
										{isUpdatingProfile ? <Spinner /> : "Save Changes"}
									</Button>
								</form>
							</div>

							{/* Guardian details */}
							<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs">
								<h3 className="text-base font-bold text-neutral-900">Guardian / Parent Information</h3>
								<p className="text-xs text-neutral-500 mt-0.5">Attach a parent or guardian to receive progress notifications.</p>

								<form onSubmit={handleSaveGuardian} className="mt-5 flex flex-col gap-4">
									<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
										<div className="flex flex-col gap-1.5">
											<label className="text-xs font-medium text-neutral-700">Guardian First Name</label>
											<input
												type="text"
												value={guardianFirstName}
												onChange={(e) => setGuardianFirstName(e.target.value)}
												placeholder="Jane"
												className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
												required
											/>
										</div>
										<div className="flex flex-col gap-1.5">
											<label className="text-xs font-medium text-neutral-700">Guardian Last Name</label>
											<input
												type="text"
												value={guardianLastName}
												onChange={(e) => setGuardianLastName(e.target.value)}
												placeholder="Doe"
												className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
												required
											/>
										</div>
									</div>

									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-medium text-neutral-700">Guardian Email (optional)</label>
										<input
											type="email"
											value={guardianEmail}
											onChange={(e) => setGuardianEmail(e.target.value)}
											placeholder="parent@example.com"
											className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
										/>
									</div>

									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-medium text-neutral-700">Phone Number</label>
										<input
											type="tel"
											value={guardianPhone}
											onChange={(e) => setGuardianPhone(e.target.value)}
											placeholder="+234..."
											className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
											required
										/>
									</div>

									<Button type="submit" disabled={isAddingGuardian} className="mt-2">
										{isAddingGuardian ? <Spinner /> : "Save Guardian Details"}
									</Button>
								</form>
							</div>
						</div>
					)}

					{/* Tab 2: Password & Security */}
					{activeTab === "security" && (
						<div className="max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs">
							<h3 className="text-base font-bold text-neutral-900">Change Password</h3>
							<p className="text-xs text-neutral-500 mt-0.5">Keep your account secure by using a strong password.</p>

							<form onSubmit={handleChangePassword} className="mt-5 flex flex-col gap-4">
								<div className="flex flex-col gap-1.5">
									<label className="text-xs font-medium text-neutral-700">Current Password</label>
									<input
										type="password"
										value={oldPassword}
										onChange={(e) => setOldPassword(e.target.value)}
										className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
										required
									/>
								</div>

								<div className="flex flex-col gap-1.5">
									<label className="text-xs font-medium text-neutral-700">New Password</label>
									<input
										type="password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
										className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
										required
									/>
								</div>

								<div className="flex flex-col gap-1.5">
									<label className="text-xs font-medium text-neutral-700">Confirm New Password</label>
									<input
										type="password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
										required
									/>
								</div>

								<Button type="submit" disabled={isChangingPassword} className="mt-2">
									{isChangingPassword ? <Spinner /> : "Update Password"}
								</Button>
							</form>
						</div>
					)}

					{/* Tab 3: Bank Details */}
					{activeTab === "bank" && (
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
							{/* Form */}
							<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs">
								<h3 className="text-base font-bold text-neutral-900">Add / Update Bank Account</h3>
								<p className="text-xs text-neutral-500 mt-0.5">Saved bank details will be used for referral withdrawals.</p>

								<div className="mt-5 flex flex-col gap-4">
									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-medium text-neutral-700">Select Bank</label>
										<select
											value={selectedBankId}
											onChange={(e) => {
												setSelectedBankId(e.target.value);
												setVerifiedAccountName("");
											}}
											className="h-10 rounded-xl border border-neutral-200 px-3 text-xs">
											<option value="">Select a Nigerian Bank</option>
											{banks?.data?.map((b) => (
												<option key={b.bank_id} value={b.bank_id}>
													{b.bank_name}
												</option>
											))}
										</select>
									</div>

									<div className="flex flex-col gap-1.5">
										<label className="text-xs font-medium text-neutral-700">Account Number (10 digits)</label>
										<div className="flex items-center gap-2">
											<input
												type="text"
												maxLength={10}
												value={accountNumber}
												onChange={(e) => {
													setAccountNumber(e.target.value.replace(/\D/g, ""));
													setVerifiedAccountName("");
												}}
												placeholder="0123456789"
												className="h-10 flex-1 rounded-xl border border-neutral-200 px-3 text-xs tracking-wider"
											/>
											<button
												type="button"
												onClick={handleVerifyAccount}
												disabled={verifyBankDetailsMutation.isPending || accountNumber.length !== 10}
												className="h-10 rounded-xl bg-neutral-900 px-4 text-xs font-semibold text-white hover:bg-neutral-800 disabled:opacity-50">
												{verifyBankDetailsMutation.isPending ? <Spinner /> : "Verify"}
											</button>
										</div>
									</div>

									{verifiedAccountName && (
										<div className="rounded-xl border border-green-200 bg-green-50 p-3 text-xs text-green-900 font-semibold flex items-center gap-2">
											<RiCheckLine className="size-4 text-green-600" />
											<span>Verified Name: {verifiedAccountName}</span>
										</div>
									)}

									<Button
										onClick={handleSaveBank}
										disabled={!verifiedAccountName || addBankDetailsMutation.isPending}
										className="mt-2">
										{addBankDetailsMutation.isPending ? <Spinner /> : "Save Bank Details"}
									</Button>
								</div>
							</div>

							{/* Saved Bank Display */}
							<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs">
								<h3 className="text-base font-bold text-neutral-900">Current Saved Bank</h3>
								<p className="text-xs text-neutral-500 mt-0.5">Your active payout bank account.</p>

								{savedBankData?.bank_details && savedBankData.bank_details.length > 0 ? (
									<div className="mt-5 flex flex-col gap-3">
										{savedBankData.bank_details.map((b) => (
											<div key={b.bank_detail_id} className="rounded-2xl border border-primary-100 bg-primary-50/50 p-4 space-y-2">
												<div className="flex items-center gap-2">
													<RiBankCardLine className="size-5 text-primary-600" />
													<p className="text-sm font-bold text-primary-900">{b.bank_detail_bank_name || "Bank Account"}</p>
												</div>
												<div className="text-xs space-y-1 text-neutral-700">
													<p><span className="text-neutral-400">Account Name:</span> <span className="font-semibold">{b.bank_detail_account_name}</span></p>
													<p><span className="text-neutral-400">Account Number:</span> <span className="font-mono font-bold">{b.bank_detail_account_number}</span></p>
												</div>
											</div>
										))}
									</div>
								) : (
									<div className="mt-5 rounded-xl border border-dashed border-neutral-200 p-8 text-center text-xs text-neutral-500">
										No bank account details saved yet.
									</div>
								)}
							</div>
						</div>
					)}

					{/* Tab 4: Points & Referrals */}
					{activeTab === "referrals" && (
						<div className="flex flex-col gap-6">
							{/* Points overview cards */}
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
								<div className="rounded-2xl border border-primary-100 bg-primary-50/50 p-5 shadow-2xs">
									<div className="flex items-center gap-2 text-primary-700">
										<RiCoinLine className="size-5" />
										<p className="text-xs font-bold uppercase tracking-wider">Available Points</p>
									</div>
									<p className="text-2xl font-black text-primary-900 mt-2">{totalAvailablePoints.toLocaleString()} PTS</p>
									<p className="text-[11px] text-primary-700 mt-1">Value: {formatCurrency(totalConvertedAmount)}</p>
								</div>

								<div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs">
									<div className="flex items-center gap-2 text-neutral-600">
										<RiGiftLine className="size-5" />
										<p className="text-xs font-bold uppercase tracking-wider">Your Referral Code</p>
									</div>
									<div className="flex items-center justify-between mt-2">
										<p className="font-mono text-xl font-bold text-neutral-900">{referralCode || "N/A"}</p>
										<button
											onClick={handleCopyCode}
											className="rounded-lg border border-neutral-200 px-2.5 py-1 text-xs font-semibold text-neutral-700 hover:bg-neutral-50">
											{copiedCode ? "Copied!" : "Copy"}
										</button>
									</div>
								</div>

								<div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-2xs flex flex-col justify-between">
									<div>
										<p className="text-xs font-bold uppercase tracking-wider text-neutral-600">Redeem Points to Wallet</p>
										<p className="text-xs text-neutral-500 mt-1">Convert your points to cash in your wallet balance.</p>
									</div>
									<Button
										onClick={() => redeemPointsMutation.mutate()}
										disabled={totalAvailablePoints <= 0 || redeemPointsMutation.isPending}
										className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-xs font-bold">
										{redeemPointsMutation.isPending ? <Spinner /> : "Redeem Points Now"}
									</Button>
								</div>
							</div>

							{/* Referral Link banner */}
							<div className="flex flex-col gap-2 rounded-2xl border border-neutral-200 bg-neutral-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="text-xs font-bold text-neutral-800">Your Shareable Referral Link</p>
									<p className="text-xs text-neutral-500">{referralUrl}</p>
								</div>
								<Button variant="outline" onClick={handleCopyLink} className="text-xs shrink-0">
									<RiFileCopyLine className="size-3.5 mr-1" />
									{copiedLink ? "Link Copied!" : "Copy Link"}
								</Button>
							</div>

							{/* Referrals Table */}
							<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs">
								<h3 className="text-base font-bold text-neutral-900">Referred Students</h3>
								<p className="text-xs text-neutral-500 mt-0.5">List of students who registered using your referral code.</p>

								{referralsData?.data && referralsData.data.length > 0 ? (
									<div className="mt-4 overflow-x-auto">
										<table className="w-full text-left text-xs">
											<thead>
												<tr className="border-b border-neutral-200 text-neutral-400 font-semibold">
													<th className="pb-2">Student</th>
													<th className="pb-2">Email</th>
													<th className="pb-2">Points Earned</th>
													<th className="pb-2">Status</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-neutral-100">
												{referralsData.data.map((r) => (
													<tr key={r.referral_id} className="py-2.5">
														<td className="py-2.5 font-medium text-neutral-900">
															{r.user_first_name} {r.user_last_name}
														</td>
														<td className="py-2.5 text-neutral-500">{r.user_email}</td>
														<td className="py-2.5 font-bold text-primary-700">+{r.referral_points} PTS</td>
														<td className="py-2.5">
															{r.referral_verified ? (
																<span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">Verified</span>
															) : (
																<span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">Pending</span>
															)}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								) : (
									<div className="mt-5 rounded-xl border border-dashed border-neutral-200 p-8 text-center text-xs text-neutral-500">
										No referrals yet. Share your referral code with classmates to earn points!
									</div>
								)}
							</div>
						</div>
					)}

					{/* Tab 5: Withdrawals */}
					{activeTab === "withdrawals" && (
						<div className="flex flex-col gap-6">
							{/* Wallet Balance Banner */}
							<div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Available Wallet Balance</p>
									<p className="text-3xl font-black mt-1">{formatCurrency(walletBalance)}</p>
								</div>
								<Button
									onClick={() => setWithdrawalModalOpen(true)}
									disabled={walletBalance <= 0}
									className="bg-primary-500 hover:bg-primary-600 text-xs font-bold text-white">
									Request Withdrawal
								</Button>
							</div>

							{/* History Table */}
							<div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xs">
								<h3 className="text-base font-bold text-neutral-900">Withdrawal History</h3>
								<p className="text-xs text-neutral-500 mt-0.5">Track your payout requests and transactions.</p>

								{withdrawalHistory?.data && withdrawalHistory.data.length > 0 ? (
									<div className="mt-4 overflow-x-auto">
										<table className="w-full text-left text-xs">
											<thead>
												<tr className="border-b border-neutral-200 text-neutral-400 font-semibold">
													<th className="pb-2">Date</th>
													<th className="pb-2">Amount</th>
													<th className="pb-2">Bank</th>
													<th className="pb-2">Account</th>
													<th className="pb-2">Status</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-neutral-100">
												{withdrawalHistory.data.map((w) => (
													<tr key={w.withdrawal_id}>
														<td className="py-2.5 text-neutral-500">
															{new Date(w.withdrawal_createdOn).toLocaleDateString()}
														</td>
														<td className="py-2.5 font-bold text-neutral-900">
															{formatCurrency(w.withdrawal_amount)}
														</td>
														<td className="py-2.5 text-neutral-700">{w.withdrawal_account_name}</td>
														<td className="py-2.5 font-mono text-neutral-500">{w.withdrawal_account_number}</td>
														<td className="py-2.5">
															<span
																className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
																	w.withdrawal_status === "SUCCESSFUL" || w.withdrawal_status === "APPROVED"
																		? "bg-green-100 text-green-700"
																		: w.withdrawal_status === "PENDING"
																			? "bg-amber-100 text-amber-700"
																			: "bg-red-100 text-red-700"
																}`}>
																{w.withdrawal_status}
															</span>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								) : (
									<div className="mt-5 rounded-xl border border-dashed border-neutral-200 p-8 text-center text-xs text-neutral-500">
										No withdrawal history found.
									</div>
								)}
							</div>
						</div>
					)}

					{/* Tab 6: Danger Zone */}
					{activeTab === "danger" && (
						<div className="max-w-xl rounded-2xl border border-red-200 bg-red-50/30 p-6">
							<h3 className="text-base font-bold text-red-700">Delete Account</h3>
							<p className="text-xs text-red-900/80 mt-1">
								Permanently delete your account and all associated study timeline data. This action cannot be undone.
							</p>

							<div className="mt-6 flex flex-col gap-4">
								<div className="flex flex-col gap-1.5">
									<label className="text-xs font-medium text-neutral-700">Reason for deleting account</label>
									<textarea
										rows={3}
										value={deleteReason}
										onChange={(e) => setDeleteReason(e.target.value)}
										placeholder="Tell us why you are leaving..."
										className="rounded-xl border border-neutral-200 bg-white p-3 text-xs"
									/>
								</div>

								<div className="flex flex-col gap-1.5">
									<label className="text-xs font-medium text-neutral-700">
										Type <span className="font-bold text-red-600">DELETE</span> to confirm
									</label>
									<input
										type="text"
										value={deleteConfirmText}
										onChange={(e) => setDeleteConfirmText(e.target.value)}
										className="h-10 rounded-xl border border-neutral-200 bg-white px-3 text-xs"
									/>
								</div>

								<Button
									variant="destructive"
									onClick={handleDeleteAccount}
									disabled={deleteConfirmText !== "DELETE" || deleteAccountMutation.isPending}
									className="mt-2 text-xs font-bold">
									{deleteAccountMutation.isPending ? <Spinner /> : "Permanently Delete My Account"}
								</Button>
							</div>
						</div>
					)}
				</div>

				{/* ── Withdrawal Request Modal ── */}
				<Dialog open={withdrawalModalOpen} onOpenChange={setWithdrawalModalOpen}>
					<DialogContent className="flex w-full max-w-[400px] flex-col gap-4 p-6">
						<DialogHeader>
							<h3 className="text-lg font-bold text-neutral-900">Request Withdrawal</h3>
							<p className="text-xs text-neutral-500">Withdraw funds to your verified bank account.</p>
						</DialogHeader>

						<form onSubmit={handleMakeWithdrawal} className="flex flex-col gap-4">
							<div className="rounded-xl bg-neutral-50 p-3 text-xs">
								<p className="text-neutral-400">Available Balance:</p>
								<p className="text-lg font-bold text-neutral-900">{formatCurrency(walletBalance)}</p>
							</div>

							<div className="flex flex-col gap-1.5">
								<label className="text-xs font-medium text-neutral-700">Withdrawal Amount (₦)</label>
								<input
									type="number"
									min={100}
									max={walletBalance}
									value={withdrawalAmount}
									onChange={(e) => setWithdrawalAmount(e.target.value)}
									placeholder="e.g. 5000"
									className="h-10 rounded-xl border border-neutral-200 px-3 text-xs"
									required
								/>
							</div>

							<Button type="submit" disabled={makeWithdrawalMutation.isPending} className="w-full">
								{makeWithdrawalMutation.isPending ? <Spinner /> : "Confirm Payout Request"}
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</DashboardLayout>
		</>
	);
};

export default Page;
