import type { Maybe } from ".";

export type NotificationProps = {
	id?: string;
	notification_id?: string;
	title?: string;
	notification_title?: string;
	message?: string;
	notification_message?: string;
	content?: string;
	sender?: string;
	notification_sender?: string;
	receiver?: string;
	notification_receiver?: string;
	type?: string;
	notification_type?: string;
	category?: string;
	notification_category?: string;
	isRead?: boolean;
	is_read?: boolean;
	read?: boolean;
	notification_isRead?: boolean;
	path?: Maybe<string>;
	notification_path?: Maybe<string>;
	notification_type_id?: Maybe<string>;
	notification_notification_type_id?: Maybe<string>;
	notification_icon?: Maybe<string>;
	notification_notification_icon?: Maybe<string>;
	createdOn?: Date | string;
	notification_createdOn?: Date | string;
	updatedOn?: Date | string;
	notification_updatedOn?: Date | string;
	notification_deletedOn?: Maybe<Date | string>;
	notification_deletedBy?: Maybe<string>;
	notification_isDeleted?: boolean;
	notification_isBlocked?: boolean;
};

export type NormalizedNotification = {
	id: string;
	title: string;
	message: string;
	category: string;
	path: string | null;
	isRead: boolean;
	createdOn: string;
	type: string;
};

export const normalizeNotification = (n: NotificationProps): NormalizedNotification => {
	const id = n.id || n.notification_id || String(Math.random());
	const title = n.title || n.notification_title || "Notification";
	const message = n.message || n.notification_message || n.content || "";
	const category = (n.category || n.notification_category || "GENERAL").toUpperCase();
	const path = n.path || n.notification_path || null;
	const isRead =
		n.isRead !== undefined
			? n.isRead
			: n.is_read !== undefined
				? n.is_read
				: n.read !== undefined
					? n.read
					: n.notification_isRead !== undefined
						? n.notification_isRead
						: false;
	const createdOn =
		(n.createdOn ? new Date(n.createdOn).toISOString() : null) ||
		(n.notification_createdOn ? new Date(n.notification_createdOn).toISOString() : null) ||
		new Date().toISOString();
	const type = n.type || n.notification_type || "USER";

	return {
		id,
		title,
		message,
		category,
		path,
		isRead: Boolean(isRead),
		createdOn,
		type,
	};
};
