import type { VariantProps } from "class-variance-authority"
import { RiLoaderLine } from "@remixicon/react"
import { cva } from "class-variance-authority"
import { useRouter } from "next/router"
import Image from "next/image"
import React from "react"

import logo from "@/assets/images/logo.png"
import { cn } from "@/lib/utils"

interface Props extends VariantProps<typeof loaderVariants> {
	className?: string
	loader?: "image" | "spinner"
}

const loaderVariants = cva("animate-spin", {
	variants: {
		variant: {
			primary: "text-primary-500",
			secondary: "text-secondary-500",
			white: "text-white",
		},
		size: {
			xs: "size-5",
			sm: "size-10",
			md: "size-20",
			lg: "size-32",
			xl: "size-40",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "sm",
	},
})

const useRouteChangeLoader = () => {
	const [loading, setLoading] = React.useState(false)
	const router = useRouter()
	const prevPathRef = React.useRef(router.asPath)

	const shouldShowLoader = React.useCallback((url: string) => {
		const currentPath = prevPathRef.current.split("?")[0]
		const nextPath = url.split("?")[0]
		return currentPath !== nextPath
	}, [])

	const handleStart = React.useCallback(
		(url: string) => {
			if (shouldShowLoader(url)) {
				setLoading(true)
			}
		},
		[shouldShowLoader]
	)

	const handleComplete = React.useCallback(() => {
		prevPathRef.current = router.asPath
		setLoading(false)
	}, [router.asPath])

	React.useEffect(() => {
		if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
			return
		}
		router.events.on("routeChangeStart", handleStart)
		router.events.on("routeChangeComplete", handleComplete)
		router.events.on("routeChangeError", handleComplete)

		return () => {
			router.events.off("routeChangeStart", handleStart)
			router.events.off("routeChangeComplete", handleComplete)
			router.events.off("routeChangeError", handleComplete)
		}
	}, [router, handleStart, handleComplete])

	return loading
}

export const Loader = () => {
	const loading = useRouteChangeLoader()
	return loading ? <Loading /> : null
}

export const Loading = React.memo(({ className, loader = "image", size, variant }: Props) => {
	return (
		<div
			aria-label="loading"
			role="spinbutton"
			className="grid h-full w-full place-items-center bg-white">
			{loader === "image" ? (
				<div className={cn("relative aspect-square size-7", className, size)}>
					<Image
						src={logo}
						alt="classore"
						fill
						sizes="(max-width:1024px)100%"
						className="object-contain"
						priority
					/>
				</div>
			) : (
				<RiLoaderLine className={cn(loaderVariants({ size, variant }), className)} />
			)}
		</div>
	)
})

Loading.displayName = "Loading"
