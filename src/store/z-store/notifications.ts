import { createPersistMiddleware } from "../middleware";

export type LocalNotification = {
	id: string;
	title: string;
	message: string;
	category: string;
	path: string | null;
	isRead: boolean;
	createdOn: string;
};

interface NotificationStore {
	localNotifications: LocalNotification[];
	dismissedIds: string[];
	addLocalNotification: (n: Omit<LocalNotification, "id" | "isRead" | "createdOn">) => void;
	markAllLocalRead: () => void;
	clearLocalNotifications: () => void;
	dismissNotification: (id: string) => void;
	dismissAllNotifications: (ids: string[]) => void;
	clearDismissedHistory: () => void;
}

const initialState: NotificationStore = {
	localNotifications: [],
	dismissedIds: [],
	addLocalNotification: () => {},
	markAllLocalRead: () => {},
	clearLocalNotifications: () => {},
	dismissNotification: () => {},
	dismissAllNotifications: () => {},
	clearDismissedHistory: () => {},
};

export const useNotificationStore = createPersistMiddleware<NotificationStore>(
	"classore-notifications-store",
	(set) => ({
		...initialState,
		addLocalNotification: (n) =>
			set((state) => {
				if (!n.message?.trim() && (!n.title?.trim() || n.title.trim() === "Classore")) {
					return state;
				}
				const exists = state.localNotifications.some(
					(item) => item.title === n.title && item.message === n.message
				);
				if (exists) return state;

				return {
					localNotifications: [
						{
							...n,
							id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
							isRead: false,
							createdOn: new Date().toISOString(),
						},
						...state.localNotifications,
					],
				};
			}),

		markAllLocalRead: () =>
			set((state) => ({
				localNotifications: state.localNotifications.map((n) => ({ ...n, isRead: true })),
			})),

		clearLocalNotifications: () => set({ localNotifications: [] }),

		dismissNotification: (id: string) =>
			set((state) => ({
				localNotifications: state.localNotifications.filter((n) => n.id !== id),
				dismissedIds: Array.from(new Set([...state.dismissedIds, id])),
			})),

		dismissAllNotifications: (ids: string[]) =>
			set((state) => ({
				localNotifications: [],
				dismissedIds: Array.from(new Set([...state.dismissedIds, ...ids])),
			})),

		clearDismissedHistory: () => set({ dismissedIds: [], localNotifications: [] }),
	})
);
