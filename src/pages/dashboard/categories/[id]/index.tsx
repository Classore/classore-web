import { RiArrowLeftSLine, RiUpload2Line } from "@remixicon/react"
import { RiFolder4Line } from "@remixicon/react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import { DashboardLayout } from "@/components/layouts"
import { ReviewCard, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib"

import { categories } from "@/mock"

const Page = () => {
	const [current, setCurrent] = React.useState<number | null>(null)
	const router = useRouter()
	const { id } = router.query

	const handleToggle = (index: number) => {
		if (index === current) {
			setCurrent(null)
		} else {
			setCurrent(index)
		}
	}

	const category = categories.find((category) => category.id === String(id))

	if (!category) return null

	return (
		<>
			<Seo title={category.name} />
			<DashboardLayout>
				<div className="flex w-full flex-col gap-6 px-8 py-6">
					<div className="flex w-full flex-col gap-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								<Button onClick={() => router.back()} size="cmd" variant="cmd">
									<RiArrowLeftSLine />
									Back
								</Button>
								<h4 className="font-medium lg:text-xl">{category?.name}</h4>
							</div>
							<Button size="cmd" variant="cmd">
								Share
								<RiUpload2Line />
							</Button>
						</div>
						<p className="text-xs text-neutral-400">Categories / {category?.name}</p>
					</div>
					<div className="grid w-full grid-cols-3 gap-8">
						<div className="col-span-2 flex flex-col gap-4">
							<div className="relative aspect-[1.78/1] w-full rounded-lg">
								<Image
									src={String(category?.image)}
									alt="desginer color"
									fill
									sizes="(max-width:1024px)100%"
									className="rounded-lg object-cover"
								/>
							</div>
							<div className="flex w-full flex-col gap-2">
								<p className="text-xl font-medium">Summary</p>
								<p className="text-sm text-neutral-400">{category?.summary}</p>
							</div>
							<div className="flex w-full flex-col gap-2">
								<p className="text-sm font-medium">Subject included</p>
								<div className="flex items-center gap-2">
									{category?.subjects.slice(0, 3).map((subject) => (
										<div
											key={subject.id}
											className="rounded-lg bg-neutral-300 px-3 py-[6px] text-sm text-neutral-400">
											{subject.title}
										</div>
									))}
								</div>
							</div>
							<div className="flex w-full items-center justify-between rounded-xl border p-4"></div>
							<div className="flex w-full flex-col gap-2">
								<div className="flex w-full items-center justify-between">
									<p className="text-xl font-medium">Reviews</p>
								</div>
								<div className="grid w-full grid-cols-2 gap-4">
									{[...Array(6)].map((_, index) => (
										<ReviewCard key={index} />
									))}
								</div>
							</div>
						</div>
						<div className="flex h-fit w-full flex-col gap-8 rounded-lg border p-4">
							<div className="flex w-full flex-col gap-5">
								<div className="flex w-full items-center justify-between">
									<h5 className="font-bold">Bundle Highlight</h5>
									<h5 className="font-bold">{formatCurrency(category.price)}</h5>
								</div>
								<hr className="w-full bg-neutral-300" />
								<Button>Enroll Now</Button>
								<hr className="w-full bg-neutral-300" />
							</div>
							<div className="flex w-full flex-col gap-5">
								<div className="flex w-full items-center justify-between">
									<h5 className="font-bold">Bundle includes</h5>
								</div>
								<div className="w-full rounded-lg bg-[#f6f8fa] p-4"></div>
							</div>
							<div className="flex w-full flex-col gap-5">
								<div className="flex w-full items-center justify-between">
									<h5 className="font-bold">All Courses</h5>
								</div>
								<div className="flex w-full flex-col">
									{category.subjects.map((subject, index) => (
										<div
											key={subject.id}
											className={`flex w-full flex-col gap-2 border-b py-4 first:border-t last:border-b-0`}>
											<div
												onClick={() => handleToggle(index)}
												className="min flex w-full cursor-pointer items-center justify-between">
												<div className="flex items-center gap-1">
													<RiFolder4Line className="size-4" />
													<p className="text-sm">{subject.title}</p>
												</div>
												{index === current && (
													<Link
														href={`/dashboard/courses/preview/${subject.id}`}
														className="text-sm text-secondary-300 underline">
														Preview
													</Link>
												)}
											</div>
											{index === current && (
												<div
													className={`w-full transform grid-cols-3 gap-x-3 bg-[#f6f8fa] p-4 transition-transform duration-700 ${index === current ? "grid h-fit" : "hidden h-0"}`}></div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
