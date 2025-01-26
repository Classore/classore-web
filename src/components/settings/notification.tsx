import React from "react";

import type { NotificationProps } from "@/types";
import { Checkbox } from "../ui/checkbox";
interface Props {
	isSelected: (id: string) => boolean;
	notification: NotificationProps;
	onSelect: (id: string) => void;
}

const notifications: NotificationProps[] = [];

const Notification = () => {
	const [selected, setSelected] = React.useState<string[]>([]);
	const isSelected = (id: string) =>
		!!selected.find((notification) => notification === id);

	const onSelect = (id: string) => {
		if (isSelected(id)) {
			setSelected((prev) => prev.filter((notification) => notification !== id));
		} else {
			setSelected((prev) => [...prev, id]);
		}
	};

	return (
		<div className="flex h-full w-full flex-col border-t">
			{notifications.map((notification) => (
				<NotificationItem
					key={notification.id}
					isSelected={isSelected}
					notification={notification}
					onSelect={onSelect}
				/>
			))}
		</div>
	);
};

export default Notification;

const NotificationItem = ({ isSelected, notification, onSelect }: Props) => {
	return (
		<div className="flex w-full items-start gap-2 border-b py-6">
			<div className="size-5">
				<Checkbox
					checked={isSelected(notification.id)}
					onCheckedChange={() => onSelect(notification.id)}
				/>
			</div>
			<div className="flex max-w-[85%] flex-col gap-2">
				<h6 className="text-sm font-medium">{notification.title}</h6>
				<p className="text-sm text-neutral-400">{notification.content}</p>
			</div>
		</div>
	);
};
