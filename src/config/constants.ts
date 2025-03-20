import { RiDownload2Line, RiUserAddLine } from "@remixicon/react";

export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const TAB_OPTIONS = [
	{ icon: RiUserAddLine, label: "Referral History", value: "referral" },
	{ icon: RiDownload2Line, label: "Withdrawal History", value: "withdrawal" },
];
