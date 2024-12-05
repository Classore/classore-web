import React from "react"

import { cn } from "@/lib"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	selected: string | number
	tabValue: string | number
	children?: React.ReactNode
	className?: string
	innerClassName?: string
}
const TabPanel = React.forwardRef<HTMLDivElement, Props>(
	({ selected, tabValue, children, className, innerClassName }, ref) => {
		if (typeof selected !== typeof tabValue) {
			throw new Error("TabPanel: selected and tabValue must be of the same type")
		}
		return (
			<div
				ref={ref}
				hidden={selected !== tabValue}
				role="tabpanel"
				id={`simple-tabpanel-${tabValue}`}
				className={cn("h-full w-full", className)}
				aria-labelledby={`simple-tab-${tabValue}`}>
				{selected === tabValue && <div className={cn("h-full w-full", innerClassName)}>{children}</div>}
			</div>
		)
	}
)

TabPanel.displayName = "TabPanel"

export { TabPanel }
