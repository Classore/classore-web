import { RiCommandLine, RiSearchLine } from "@remixicon/react"
import React from "react"

import { cn } from "@/lib/utils"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	wrapperClassName?: string
}

const Search = React.forwardRef<HTMLInputElement, Props>(
	({ className, onChange, value, wrapperClassName, ...props }, ref) => {
		const handleCommand = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "k") {
				e.preventDefault()
				const input = document.getElementById("search")
				if (input) input.focus()
			}
		}

		React.useEffect(() => {
			document.addEventListener("keydown", handleCommand)
			return () => document.removeEventListener("keydown", handleCommand)
		})

		return (
			<div
				className={cn(
					"flex h-[46px] items-center gap-2 rounded border px-2 py-3 focus-within:border-primary-500",
					wrapperClassName
				)}>
				<RiSearchLine className="size-4" />
				<input
					ref={ref}
					type="search"
					id="search"
					value={value}
					onChange={onChange}
					className={cn("flex h-full min-w-60 border-none bg-transparent px-0 outline-none", className)}
					{...props}
				/>
				<div className="flex h-full items-center rounded border-none bg-neutral-300 px-2 py-1 text-sm">
					<RiCommandLine className="size-4" />K
				</div>
			</div>
		)
	}
)

Search.displayName = "Search"

export { Search }
