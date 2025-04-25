import type { Maybe } from ".";

export type NotificationProps = {
	notification_id: string;
	notification_copied_from: Maybe<string>;
	notification_createdOn: Date | string;
	notification_updatedOn: Date | string;
	notification_updatedBy: Maybe<string>;
	notification_deletedOn: Maybe<Date | string>;
	notification_deletedBy: Maybe<string>;
	notification_isDeleted: boolean;
	notification_isBlocked: boolean;
	notification_title: string;
	notification_sender: string;
	notification_receiver: string;
	notification_message: string;
	notification_type: string;
	notification_category: string;
	notification_isRead: boolean;
	notification_notification_type_id: Maybe<string>;
	notification_notification_icon: Maybe<string>;
};
