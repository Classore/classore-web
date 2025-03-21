import { useRouter } from "next/router";
import React from "react";

export function usePreventNavigation(
	shouldPreventNavigation: boolean | (() => boolean),
	message: string = "You have unsaved changes. Are you sure you want to leave this page?"
) {
	const router = useRouter();
	const shouldPrevent = React.useCallback((): boolean => {
		return typeof shouldPreventNavigation === "function"
			? shouldPreventNavigation()
			: shouldPreventNavigation;
	}, [shouldPreventNavigation]);

	React.useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (!shouldPrevent()) return;

			e.preventDefault();
			e.returnValue = message;
			return message;
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [message, shouldPrevent]);

	React.useEffect(() => {
		const handleRouteChangeStart = () => {
			if (!shouldPrevent()) return;

			if (!window.confirm(message)) {
				router.events.emit("routeChangeError");
				throw "Navigation cancelled by user";
			}
		};

		router.events.on("routeChangeStart", handleRouteChangeStart);
		return () => {
			router.events.off("routeChangeStart", handleRouteChangeStart);
		};
	}, [message, router.events, shouldPrevent]);

	const removePreventNavigation = React.useCallback(() => {
		if (typeof shouldPreventNavigation === "boolean") {
			return false;
		}
	}, [shouldPreventNavigation]);

	return { removePreventNavigation };
}
