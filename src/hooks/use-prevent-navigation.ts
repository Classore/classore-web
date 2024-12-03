import React from "react"

export const usePreventNavigation = (shouldPrevent: boolean, redirectUrl?: string) => {
	React.useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (shouldPrevent) {
				e.preventDefault()
				e.returnValue = "" // For cross-browser compatibility
				const shouldClose = window.confirm(
					"Are you sure you want to leave this page? Your progress will not be saved."
				)

				if (!shouldClose) {
					return
				}

				if (redirectUrl) {
					window.location.href = redirectUrl
				} else {
					window.history.pushState(null, "", window.location.href)
				}
			}
		}

		const handlePopState = (e: PopStateEvent) => {
			if (shouldPrevent) {
				e.preventDefault()
				window.history.pushState(null, "", window.location.href)
			}
		}

		window.addEventListener("beforeunload", handleBeforeUnload)
		window.addEventListener("popstate", handlePopState)

		window.history.pushState(null, "", window.location.href)

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload)
			window.removeEventListener("popstate", handlePopState)
		}
	}, [shouldPrevent, redirectUrl])
}
