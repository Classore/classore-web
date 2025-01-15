import { ChevronLeft } from "lucide-react"
import * as React from "react"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useGetExamBundles } from "@/queries/school"
import { CardLarge } from "../home"
import { Spinner } from "../shared"

export const FeaturedCategories = () => {
	const { data: bundles, isPending } = useGetExamBundles({
		limit: 5,
		page: 1,
	})

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex items-center justify-between">
				<p className="text-xl font-semibold">Featured</p>
				<div className="flex items-center gap-4">
					<button className="grid size-8 place-items-center rounded-full border bg-white text-black hover:bg-neutral-100">
						<ChevronLeft className="size-3" />
					</button>
					<button className="grid size-8 place-items-center rounded-full border bg-white text-black hover:bg-neutral-100">
						<ChevronLeft className="size-3 rotate-180" />
					</button>
				</div>
			</div>
			{isPending ? (
				<Spinner variant="primary" />
			) : (
				<div className="w-full overflow-hidden">
					<ScrollArea className="h-[320px]">
						<div className="flex w-auto items-center gap-4 overflow-x-scroll">
							{bundles?.data.length ? (
								bundles.data.map((bundle) => (
									<CardLarge key={bundle.examinationbundle_id} bundle={bundle} />
								))
							) : (
								<p className="text-sm text-neutral-400">No bundles found</p>
							)}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>
			)}
		</div>
	)
}
