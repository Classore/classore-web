import { RiStarFill, RiTimeLine, RiUserLine } from "@remixicon/react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { formatCurrency, getAverageRating } from "@/lib"
import type { CategoryProps } from "@/types"
import { AvatarGroup } from "../shared"

interface Props {
	category: CategoryProps
}

const CardSmall = ({ category }: Props) => {
	return (
		<Link href={`/dashboard/categories/${category.id}`}>
			<div
				key={category.id}
				className="flex aspect-[1.2/1] w-[360px] flex-shrink-0 flex-col gap-6 rounded-2xl border p-4 transition-all duration-700 hover:drop-shadow-lg">
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
		<div className="flex h-[300px] w-[800px] flex-shrink-0 cursor-pointer items-center gap-x-6 rounded-lg border p-4 transition-all duration-700 hover:drop-shadow-xl">
			<div className="relative aspect-square h-full rounded-lg bg-secondary-400">
				<Image
					src={category.image}
					alt={category.name}
					fill
					sizes="(max-width:1024px)100%"
					className="rounded-lg object-cover"
				/>
			</div>
			<div className="flex h-full w-full flex-1 flex-col justify-between gap-x-2">
				<div className="flex h-full w-full flex-col gap-6">
					<div className="flex w-full flex-col gap-6">
						<div>
							<h5 className="text-xl font-medium">{category.name}</h5>
							<p className="text-sm text-neutral-400">{category.summary.substring(0, 300)}...</p>
						</div>
						<p className="font-semibold">{formatCurrency(category.price)}</p>
					</div>
					<div className="flex w-full items-center text-sm text-neutral-400">
						<RiUserLine size={18} /> 20,000 students enrolled
					</div>
				</div>
				<div className="flex w-full items-center gap-4">
					<AvatarGroup images={[]} count={4} shape="round" />
					<div className="flex items-center gap-2 text-sm text-neutral-400">
						<RiStarFill className="size-4 text-yellow-500" /> {getAverageRating(category.reviews)}
						<span className="text-secondary-400">({category.reviews.length} reviews)</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export { CardLarge, CardSmall }
