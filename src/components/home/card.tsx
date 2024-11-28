import { RiTimeLine, RiUserLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import type { CategoryProps } from "@/types"
import { formatCurrency } from "@/lib"

interface Props {
	category: CategoryProps
}

const CardSmall = ({ category }: Props) => {
	return (
		<Link href={`/dashboard/categories/${category.id}`}>
			<div
				key={category.id}
				className="flex aspect-[1.2/1] w-[360px] flex-shrink-0 flex-col gap-6 rounded-2xl border p-4 transition-all duration-700 hover:shadow-2xl">
				<div className="relative aspect-[2/1] w-full rounded-lg">
					<Image
						src={category.image}
						alt={category.name}
						fill
						sizes="(max-width:1024px)100%"
						className="rounded-lg object-cover"
					/>
				</div>
				<div className="flex w-full flex-col gap-4">
					<div className="flex w-full items-center justify-between">
						<p className="text-medium">{category.name}</p>
						<p className="text-bold">{formatCurrency(category.price)}</p>
					</div>
					<hr className="w-full bg-neutral-300" />
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-1 text-sm text-neutral-400">
								<RiTimeLine size={18} />
							</div>
							<div className="flex items-center gap-1 text-sm text-neutral-400">
								<RiUserLine size={18} />
							</div>
						</div>
						<div className="flex items-center gap-1 text-sm text-neutral-400"></div>
					</div>
				</div>
			</div>
		</Link>
	)
}

const CardLarge = ({ category }: Props) => {
	return (
		<div className="flex h-[300px] w-[800px] flex-shrink-0 items-center gap-x-6 rounded-lg border p-4 transition-all duration-700 hover:shadow-2xl">
			<div className="relative aspect-square h-full rounded-lg bg-secondary-400"></div>
			<div className="flex w-full flex-1 flex-col gap-x-2">
				<div className="flex w-full flex-col">
					<div className="flex w-full flex-col gap-4">
						<h5 className="text-xl font-medium">{category.name}</h5>
						<p className="font-semibold">{formatCurrency(category.price)}</p>
					</div>
					<div className="flex w-full items-center text-sm text-neutral-400">
						<RiUserLine size={18} />
					</div>
				</div>
				<div className="flex w-full items-center"></div>
			</div>
		</div>
	)
}

export { CardLarge, CardSmall }
