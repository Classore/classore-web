import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { HttpError, HttpResponse } from "@/types";
import { endpoints } from "@/config";
import { axios } from "@/lib";

// ---- Types ----

export type TokenPackage = {
	id: string;
	name: string;
	price: number;
	base_tokens: number;
	bonus_tokens: number;
	is_active: boolean;
};

type PurchasePackagePaystackResp = {
	checkout_url: string;
	reference: string;
};

// ---- GET TOKEN PACKAGES ----

const getTokenPackages = async () => {
	return axios
		.get<HttpResponse<TokenPackage[]>>(endpoints().token_payment.packages)
		.then((res) => res.data);
};

export const useGetTokenPackages = () => {
	return useQuery({
		queryKey: ["token_packages"],
		queryFn: getTokenPackages,
		staleTime: 5 * 60 * 1000,
		select: (res: any) => {
			const list: TokenPackage[] =
				Array.isArray(res) ? res :
				Array.isArray(res?.data) ? res.data :
				Array.isArray(res?.data?.packages) ? res.data.packages :
				Array.isArray(res?.packages) ? res.packages :
				Array.isArray(res?.data?.tokenPackages) ? res.data.tokenPackages :
				Array.isArray(res?.tokenPackages) ? res.tokenPackages :
				[];
			return list.filter((pkg) => pkg.is_active);
		},
	});
};

// ---- PURCHASE TOKENS VIA PAYSTACK ----

const purchaseTokensPaystack = async (payload: {
	packageId: string;
	origin?: string;
}) => {
	const body = {
		packageId: payload.packageId,
		package_id: payload.packageId,
		origin: payload.origin || "web",
	};
	return axios
		.post<HttpResponse<PurchasePackagePaystackResp>>(
			endpoints().token_payment.paystack_init,
			body
		)
		.then((res) => res.data);
};

export const usePurchaseTokensPaystack = ({
	onSuccess,
	onError,
}: {
	onSuccess?: (data: HttpResponse<PurchasePackagePaystackResp>) => void;
	onError?: (error: HttpError) => void;
}) => {
	return useMutation({
		mutationKey: ["purchase_tokens_paystack"],
		mutationFn: purchaseTokensPaystack,
		onSuccess,
		onError,
	});
};

// ---- PURCHASE BUNDLE WITH TOKENS ----

export type PurchaseBundleWithTokensPayload = {
	studentTimelineId?: string;
	student_timeline_id?: string;
	study_timeline_id?: string;
};

const purchaseBundleWithTokens = async (payload: PurchaseBundleWithTokensPayload) => {
	const timelineId =
		payload.studentTimelineId ||
		payload.student_timeline_id ||
		payload.study_timeline_id;
	const body = {
		studentTimelineId: timelineId,
		student_timeline_id: timelineId,
		study_timeline_id: timelineId,
	};
	return axios
		.post<HttpResponse<any>>(
			endpoints().token_payment.bundle_purchase,
			body
		)
		.then((res) => res.data);
};

export const usePurchaseBundleWithTokens = ({
	onSuccess,
	onError,
	onSettled,
}: {
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
	onSettled?: () => void;
} = {}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["purchase_bundle_tokens"],
		mutationFn: purchaseBundleWithTokens,
		onSuccess: (data: any) => {
			const remainingBalance =
				data?.data?.remaining_balance ??
				data?.remaining_balance ??
				data?.data?.balance ??
				data?.balance;

			toast.success("🎉 Plan unlocked successfully with tokens!", {
				description:
					remainingBalance !== undefined
						? `Remaining token balance: ${remainingBalance}`
						: "Your plan is now active.",
			});

			// Invalidate all related caches matching mobile
			queryClient.invalidateQueries({ queryKey: ["profile"] });
			queryClient.invalidateQueries({ queryKey: ["course"] });
			queryClient.invalidateQueries({ queryKey: ["chapter"] });
			queryClient.invalidateQueries({ queryKey: ["my-courses"] });
			queryClient.invalidateQueries({ queryKey: ["forums"] });
			queryClient.invalidateQueries({ queryKey: ["user_rooms"] });
			queryClient.invalidateQueries();

			onSuccess?.(data);
		},
		onError: (error: any) => {
			console.error("❌ Bundle token purchase error:", error);
			const errMsg =
				error?.response?.data?.message ||
				error?.message ||
				"Token purchase failed. Check your balance and try again.";
			const message = Array.isArray(errMsg) ? errMsg[0] : errMsg;
			toast.error(typeof message === "string" ? message : "Token purchase failed. Check your balance and try again.");
			onError?.(error);
		},
		onSettled,
	});
};

// ---- ADD SUBJECTS WITH TOKENS ----

export type AddSubjectsPayload = {
	studentTimelineId?: string;
	student_timeline_id?: string;
	study_timeline_id?: string;
	subjects: string[];
};

const addSubjectsWithTokens = async (payload: AddSubjectsPayload) => {
	const timelineId =
		payload.studentTimelineId ||
		payload.student_timeline_id ||
		payload.study_timeline_id;
	const body = {
		studentTimelineId: timelineId,
		student_timeline_id: timelineId,
		study_timeline_id: timelineId,
		subjects: payload.subjects,
	};
	return axios
		.post<HttpResponse<any>>(
			endpoints().token_payment.add_subjects,
			body
		)
		.then((res) => res.data);
};

export const useAddSubjectsWithTokens = ({
	onSuccess,
	onError,
	onSettled,
}: {
	onSuccess?: (data: any) => void;
	onError?: (error: any) => void;
	onSettled?: () => void;
} = {}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["add_subjects_tokens"],
		mutationFn: addSubjectsWithTokens,
		onSuccess: (data: any) => {
			const remainingBalance =
				data?.data?.remaining_balance ??
				data?.remaining_balance ??
				data?.data?.balance ??
				data?.balance;

			toast.success("🎉 Extra subjects added with tokens!", {
				description:
					remainingBalance !== undefined
						? `Remaining token balance: ${remainingBalance}`
						: "Your subjects are now active.",
			});

			queryClient.invalidateQueries({ queryKey: ["profile"] });
			queryClient.invalidateQueries({ queryKey: ["my-courses"] });
			queryClient.invalidateQueries({ queryKey: ["forums"] });
			queryClient.invalidateQueries({ queryKey: ["user_rooms"] });
			queryClient.invalidateQueries();

			onSuccess?.(data);
		},
		onError: (err: any) => {
			console.error("❌ Add subjects token error:", err);
			const errMsg =
				err?.response?.data?.message ||
				err?.message ||
				"Failed to add subjects with tokens. Check your balance and try again.";
			const message = Array.isArray(errMsg) ? errMsg[0] : errMsg;
			toast.error(typeof message === "string" ? message : "Failed to add subjects with tokens");
			onError?.(err);
		},
		onSettled,
	});
};

// ---- JOIN SUBJECT FORUM ----

const joinSubjectForum = async (subject_id: string) => {
	return axios
		.post<HttpResponse<{ message: string }>>(
			endpoints().message.join_subject_forum,
			{ subject_id }
		)
		.then((res) => res.data);
};

export const useJoinSubjectForum = ({
	onSuccess,
	onError,
}: {
	onSuccess?: () => void;
	onError?: (error: HttpError) => void;
}) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["join_subject_forum"],
		mutationFn: joinSubjectForum,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["forums"] });
			onSuccess?.();
		},
		onError,
	});
};

// ---- GET ROOM MEMBERS ----

type RoomMember = {
	member_id: string;
	user_id: string;
	first_name: string;
	last_name: string;
	email: string;
	profile_picture: string | null;
	is_my_data: boolean;
};

const getRoomMembers = async (roomId: string) => {
	return axios
		.get<HttpResponse<RoomMember[]>>(endpoints().message.fetch_room_members, {
			params: { roomId },
		})
		.then((res) => res.data);
};

export const useGetRoomMembers = (roomId: string | null) => {
	return useQuery({
		queryKey: ["room_members", roomId],
		queryFn: () => getRoomMembers(roomId!),
		enabled: !!roomId,
		staleTime: 60 * 1000,
		select: (data) => data.data ?? [],
	});
};
