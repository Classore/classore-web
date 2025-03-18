import Image from 'next/image'
import Link from 'next/link'

import consultation from '@/assets/illustrations/consultation.svg'
import { Bundle } from '@/components/course'
import { DashboardLayout } from '@/components/layouts'
import { Seo, Spinner } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { useGetProfile } from '@/queries/student'

const Page = () => {
	const { data: profile, isPending, isError } = useGetProfile()

	return (
		<>
			<Seo title='My Courses' />

			<DashboardLayout>
				<div className='relative flex w-full flex-col items-center justify-between gap-4 overflow-hidden rounded-2xl bg-[#F8F5FF] p-6 text-black md:min-h-[297px] md:flex-row md:gap-[177px] md:px-10 md:py-[52px]'>
					<div className='flex max-w-[559px] flex-col gap-4'>
						<h1 className='text-2xl font-bold lg:text-4xl'>My Courses</h1>
						<p className='text-sm text-neutral-400 md:text-base'>
							Explore available categories and unlock your potential. Earn point
							rewards as you learn.
						</p>
						<Button className='mt-4 rounded-lg md:w-fit' variant='dark'>
							<Link href='/dashboard/courses' className='text-sm'>
								Continue Learning
							</Link>
						</Button>
					</div>

					<div className='hidden lg:absolute lg:right-8 lg:top-1/2 lg:aspect-square lg:h-[468px] lg:-translate-y-1/2'>
						<Image
							src={consultation}
							alt='desginer color'
							fill
							sizes='(max-width:1024px)100%'
							className='object-contain'
						/>
					</div>
				</div>

				<div className='flex flex-col gap-10 pt-6 pb-10'>
					{isPending ?
						<div className='mx-auto py-4'>
							<Spinner variant='primary' />
						</div>
					: isError ?
						<div className='mx-auto flex w-full max-w-96 flex-col items-center justify-center gap-2 p-4'>
							<p className='font-semibold'>Error fetching profile</p>
							<p className='text-sm text-neutral-400'>
								Please refresh the page to try again
							</p>
						</div>
					: profile?.time_line.length ?
						profile?.time_line?.map(bundle => (
							<Bundle key={bundle.id} bundle={bundle} />
						))
					:	<div className='mx-auto flex flex-col gap-2 py-4'>
							<p className='text-neutral-400'>No courses have been purchased</p>

							<Link
								href='/dashboard/categories'
								className='text-sm text-center text-primary-300 underline'>
								Buy Courses
							</Link>
						</div>
					}
				</div>
			</DashboardLayout>
		</>
	)
}

export default Page
