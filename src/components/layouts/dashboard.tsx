import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { dashboard_links } from "@/config"
import { Appbar } from "./appbar"
import { normalize } from "@/lib"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter()

	const isOnRoute = (href: string) => normalize(router.pathname) === href

	return (
		<div className="flex h-screen w-screen items-center overflow-hidden bg-white">
			<aside className="flex h-full w-[256px] min-w-[256px] flex-col justify-between border-r border-neutral-300 px-6 py-8">
				<div className="flex w-full flex-col gap-8">
					<div className="relative h-[30px] w-[135px]">
						<Image src="/assets/images/classore.png" alt="classore" fill sizes="(max-width:1024px)100%" />
					</div>
					<div className="flex w-full flex-col">
						<p className="text-xs text-neutral-500">MENU</p>
						<div className="flex w-full flex-col">
							{dashboard_links.map(({ label, links }) => (
								<div
									key={label}
									className="my-2 flex w-full flex-col gap-2 border-b border-neutral-300 last:border-b-0">
									{links.map(({ href, icon: Icon, name }) => (
										<Link
											key={name}
											href={href}
											className={`flex items-center gap-2 rounded px-3 py-2 text-sm capitalize hover:bg-primary-300/25 ${isOnRoute(href) ? "border border-primary-500 font-bold text-primary-500" : "font-medium text-neutral-500"}`}>
											<Icon /> {name}
										</Link>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="w-full"></div>
			</aside>
			<div className="h-full flex-1">
				<Appbar />
				{children}
			</div>
		</div>
	)
}
