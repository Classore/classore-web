import { useMutation } from "@tanstack/react-query";

import { endpoints } from "@/config";
import { axios } from "@/lib";
import type { HttpResponse } from "@/types";

// ============================================================
// TYPES
// ============================================================

export type PromoType = "DISCOUNT" | "TRIAL_ACCESS";

export interface PromoValidation {
	valid: boolean;
	code: string;
	influencer?: string;
	promoType: PromoType;
	percentageDiscount: number;
	durationInDays: number;
	isFreeTrial: boolean;
	alreadyRedeemed: boolean;
}

export interface GenerateLinkPayload {
	narration: "STUDY_PACK" | "STUDY_PACK_UPDATE";
	narration_id: string;
	amount: number;
	promoCode?: string;
}

// ============================================================
// API
// ============================================================

const validatePromoCode = async (code: string) => {
	return axios
		.get<HttpResponse<PromoValidation>>(endpoints().transaction.validate_promo(code))
		.then((res) => {
			const raw = res.data?.data;
			// Normalise so the UI can rely on `isFreeTrial` regardless of the backend shape
			const isFreeTrial = Boolean(raw?.isFreeTrial) || raw?.promoType === "TRIAL_ACCESS";
			return {
				...raw,
				code: raw?.code ?? code,
				isFreeTrial,
				percentageDiscount: isFreeTrial ? 100 : Number(raw?.percentageDiscount ?? 0),
				durationInDays: Number(raw?.durationInDays ?? 0),
			} as PromoValidation;
		});
};

const generatePaymentLink = async (payload: GenerateLinkPayload) => {
	return axios
		.post<HttpResponse<any>>(endpoints().transaction.generate_link, payload)
		.then((res) => res.data);
};

export const useValidatePromoCode = () => {
	return useMutation({
		mutationKey: ["validate-promo-code"],
		mutationFn: validatePromoCode,
	});
};

export const useGeneratePaymentLink = () => {
	return useMutation({
		mutationKey: ["generate-payment-link"],
		mutationFn: generatePaymentLink,
	});
};

// ============================================================
// HELPERS
// ============================================================

/** Pulls a readable message out of an axios error. */
export const getApiErrorMessage = (err: any, fallback: string) => {
	const msg = err?.response?.data?.message ?? err?.message;
	if (Array.isArray(msg)) return msg[0] || fallback;
	return typeof msg === "string" && msg ? msg : fallback;
};

/** Finds a Paystack checkout URL in any of the response shapes the backend returns. */
export const extractPaymentUrl = (raw: any): string | undefined => {
	if (!raw) return undefined;
	const nested = raw?.data && typeof raw.data === "object" ? raw.data : undefined;
	const candidates = [
		raw?.authorization_url,
		raw?.checkout_url,
		raw?.link?.link,
		typeof raw?.link === "string" ? raw.link : undefined,
		raw?.payment_link?.authorization_url,
		raw?.payment_link?.link,
		typeof raw?.payment_link === "string" ? raw.payment_link : undefined,
		raw?.url,
		nested?.authorization_url,
		nested?.checkout_url,
		nested?.link?.link,
		typeof nested?.link === "string" ? nested.link : undefined,
		nested?.payment_link?.authorization_url,
		nested?.payment_link?.link,
		nested?.url,
		nested?.data?.authorization_url,
	];
	return candidates.find((c): c is string => typeof c === "string" && c.length > 0);
};

/** True when generate-link activated a promotional trial instead of returning a payment URL. */
export const isTrialActivation = (raw: any): boolean => {
	return Boolean(raw?.isFreeTrial ?? raw?.data?.isFreeTrial);
};

export const getTrialDuration = (raw: any, fallback = 14): number => {
	return Number(raw?.durationInDays ?? raw?.data?.durationInDays ?? fallback) || fallback;
};

/** Timeline id from create-study-timeline responses (shape varies between endpoints). */
export const extractTimelineId = (res: any): string | undefined => {
	const d = res?.data;
	const id = d?.id || d?.timeline_id || d?.study_timeline_id || d?.timeline?.id;
	return typeof id === "string" && id ? id : undefined;
};

/** Price after applying a validated promo (trial codes are free). */
export const applyPromoToAmount = (amount: number, promo?: PromoValidation | null) => {
	if (!promo) return amount;
	if (promo.isFreeTrial) return 0;
	const pct = Math.min(100, Math.max(0, promo.percentageDiscount || 0));
	return Math.max(0, Math.round(amount - (amount * pct) / 100));
};
