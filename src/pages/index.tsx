import Image from "next/image"

import { arrow, learn } from "@/assets/illustrations"
import { Appbar, Seo } from "@/components/shared"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Page = () => {
	return (
		<>
			<Seo title="Join the Classore waitlist" />
			<div className="bg-squiggly bg-right-bottom bg-no-repeat lg:h-screen">
				<Appbar />
				<main className="container mx-auto h-auto px-4 lg:h-[calc(100vh-187px)] lg:px-0">
					<div className="grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-0">
						<div className="flex h-full w-full flex-col justify-center gap-3">
							<div className="flex w-fit items-center gap-1 rounded-3xl border-white bg-white/60 px-5 py-3">
								<p className="text-sm">Join over 2500 learners today</p>
								<div className="flex items-center">
									{[...Array(4)].map((_, index) => (
										<div
											key={index}
											style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}
											className={`relative size-6 rounded-full border-2 border-white ${index > 0 ? "-ml-1" : ""}`}>
											<Image
												src={`/assets/images/avatar-${index}.png`}
												alt={`avatar ${index}`}
												fill
												sizes="(max-width:1024px)100%"
												className="rounded-full"
											/>
										</div>
									))}
								</div>
							</div>
							<div className="flex flex-col gap-3">
								<div className="flex flex-wrap items-center">
									<h1 className="text-7xl font-semibold leading-[82px]">Learn Anywhere, Anytime with</h1>
									<h1 className="text-7xl font-semibold leading-[82px] text-secondary-300">Classore</h1>
									<Image src={arrow} alt="arrow" width={82} height={61} className="ml-8" />
								</div>
								<p className="w-full text-neutral-500 lg:w-[381px] lg:text-xl">
									Learning made easy and fun - don&apos;t miss early access to a new way of learning
								</p>
								<Button className="w-fit" asChild>
									<Link href="/signup?step=1">Join the waitlist</Link>
								</Button>
							</div>
						</div>
						<div className="grid h-full w-full place-items-center">
							<div className="relative aspect-[0.97/1] w-full lg:w-4/5">
								<Image
									src={learn}
									alt="learn illustration"
									fill
									sizes="(max-width: 1200px) 100%"
									className="object-cover"
								/>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}

export default Page
