import { formatCurrency, formatNumber } from "@/lib";
import { useGetExamBundles } from "@/queries/school";
import { RiStarFill, RiUserLine } from "@remixicon/react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { NextPrevButtons } from "../embla-navigation";
import { AvatarGroup, Spinner } from "../shared";

export const FeaturedBundles = () => {
	const [emblaRef, emblaApi] = useEmblaCarousel();
	const { data: bundles, isPending } = useGetExamBundles({
		is_popular: true,
	});

	return (
		<div className="flex w-full flex-col gap-4">
			<div className="flex items-center justify-between">
				<p className="text-xl font-medium">Featured</p>

				<NextPrevButtons emblaApi={emblaApi} />
			</div>

			{isPending ? (
				<div className="py-2">
					<Spinner variant="primary" />
				</div>
			) : (
				<div className="overflow-x-clip" ref={emblaRef}>
					<div className="flex touch-pan-y touch-pinch-zoom flex-col items-center gap-4 md:flex-row">
						{bundles?.data.length ? (
							bundles.data.map((bundle) => (
								<Link
									href={`/dashboard/categories/${bundle.examinationbundle_id}`}
									key={bundle.examinationbundle_id}
									className="flex h-[300px] w-[800px] flex-shrink-0 cursor-pointer items-center gap-x-6 rounded-lg border p-4 transition-all duration-700 hover:drop-shadow-xl">
									<div className="relative aspect-square h-full rounded-lg bg-secondary-400">
										<Image
											src={
												bundle.examinationbundle_banner ??
												"https://images.unsplash.com/photo-1446329360995-b4642a139973?q=80&w=1977&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
											}
											alt={bundle.examinationbundle_name}
											fill
											sizes="(max-width:1024px)100%"
											className="rounded-lg object-cover"
										/>
									</div>
									<div className="flex h-full w-full flex-1 flex-col justify-between gap-x-2">
										<div className="flex h-full w-full flex-col gap-6">
											<div className="flex w-full flex-col gap-6">
												<div>
													<h5 className="text-xl font-medium capitalize">
														{bundle.examinationbundle_name} Exam Prep Bundle
													</h5>
													<p className="pt-2 text-sm text-neutral-400">
														Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero asperiores
														enim corrupti vel eos illo? Impedit possimus maiores reprehenderit unde!
													</p>
												</div>
												<p className="font-semibold">
													{formatCurrency(bundle.examinationbundle_amount)}
												</p>
											</div>
											<div className="flex w-full items-center text-sm text-neutral-400">
												<RiUserLine size={18} /> {formatNumber(bundle.enrolled)} students enrolled
											</div>
										</div>
										<div className="flex w-full items-center gap-4">
											<AvatarGroup images={[]} count={4} shape="round" />
											<div className="flex items-center gap-2 text-sm text-neutral-400">
												<RiStarFill className="size-4 text-yellow-500" />{" "}
												{bundle.examinationbundle_rating}
												<span className="text-secondary-400">({bundle.raters} reviews)</span>
											</div>
										</div>
									</div>
								</Link>
							))
						) : (
							<p className="text-sm text-neutral-400">No bundles found</p>
						)}
					</div>
				</div>
			)}

			{/* <div className="w-full overflow-hidden">
				<ScrollArea className="h-[320px]">
						<div className="flex w-auto items-center gap-4 overflow-x-scroll">
							{featured.map((category) => (
								<CardLarge key={category.id} category={category} />
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
			</div> */}
		</div>
	);
};
