import { RiCommandLine, RiSearch2Line } from "@remixicon/react";
import React from "react";

import { cn } from "@/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	wrapperClassName?: string;
}

const Search = React.forwardRef<HTMLInputElement, Props>(
	({ className, onChange, value, wrapperClassName, ...props }, ref) => {
		const handleCommand = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "k") {
				e.preventDefault();
				const input = document.getElementById("search");
				if (input) input.focus();
			}
		};

		React.useEffect(() => {
			document.addEventListener("keydown", handleCommand);
			return () => document.removeEventListener("keydown", handleCommand);
		});

		return (
			<div
				className={cn(
					"flex h-[46px] items-center gap-2 rounded border px-2 py-3 focus-within:border-primary-500",
					wrapperClassName
				)}>
				<RiSearch2Line className="size-4 text-[#67667A]" />
				<input
					ref={ref}
					type="search"
					id="search"
					value={value}
					onChange={onChange}
					placeholder="Search here..."
					className={cn(
						"flex h-full min-w-60 border-0 bg-transparent px-0 outline-0 ring-0 focus:border-0 focus:outline-0 focus:ring-0",
						className
					)}
					{...props}
				/>
				<div className="flex h-full items-center justify-center gap-2 rounded border-none bg-[#F7F7F8] px-2 py-4 text-sm text-[#807F94]">
					<RiCommandLine className="size-4" />K
				</div>
			</div>
		);
	}
);

Search.displayName = "Search";

export { Search };
