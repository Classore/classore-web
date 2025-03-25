import type { Maybe } from "./";

export type WardProps = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	profile_image: Maybe<string>;
	progress: number;
};

export type ParentReferralProps = {
	first_name: string;
	last_name: string;
	profile_image: Maybe<string>;
	user_type: "STUDENT" | "PARENT";
	points: number;
	is_verified: boolean;
	is_redeemed: boolean;
};

export type ParentWithdrawalProps = {
	withdrawal_id: string;
	withdrawal_copied_from: null;
	withdrawal_createdOn: Date;
	withdrawal_updatedOn: Date;
	withdrawal_updatedBy: Maybe<string>;
	withdrawal_deletedOn: Maybe<Date>;
	withdrawal_deletedBy: Maybe<string>;
	withdrawal_isDeleted: boolean;
	withdrawal_isBlocked: boolean;
	withdrawal_amount: number;
	withdrawal_account_name: string;
	withdrawal_account_nullable: Maybe<string>;
	withdrawal_account_number: string;
	withdrawal_user_id: string;
	withdrawal_bank_detail_id: string;
	withdrawal_bank_id: string;
	withdrawal_status: string;
};

export type ParentLeaderboard = {
	leaderboard_id: string;
	leaderboard_user: string;
	leaderboard_points: number;
	leaderboard_examination: string;
	leaderboard_examination_bundle: string;
	user_id: string;
	user_first_name: string;
	user_last_name: string;
	user_email: string;
	user_profile_image: string;
	position: string;
};
