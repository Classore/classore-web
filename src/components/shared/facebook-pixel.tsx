import { useRouter } from "next/router"
import React from "react"

export const FacebookPixel = () => {
	const router = useRouter()
	const pathname = router.pathname
	const query = router.query

	React.useEffect(() => {
		import("react-facebook-pixel")
			.then((x) => x.default)
			.then((ReactPixel) => {
				ReactPixel.init(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID)
				ReactPixel.pageView()
			})
	}, [pathname, query])

	return null
}
