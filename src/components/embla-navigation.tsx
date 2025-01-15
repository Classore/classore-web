import type { EmblaCarouselType } from "embla-carousel"
import { ChevronLeft } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean
	nextBtnDisabled: boolean
	onPrevButtonClick: () => void
	onNextButtonClick: () => void
}

export const usePrevNextButtons = (
	emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollPrev()
	}, [emblaApi])

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return
		emblaApi.scrollNext()
	}, [emblaApi])

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev())
		setNextBtnDisabled(!emblaApi.canScrollNext())
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		onSelect(emblaApi)
		emblaApi.on("reInit", onSelect).on("select", onSelect)
	}, [emblaApi, onSelect])

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	}
}

type PropType = {
	emblaApi: EmblaCarouselType | undefined
}

export const NextPrevButtons = ({ emblaApi }: PropType) => {
	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
		usePrevNextButtons(emblaApi)

	return (
		<div className="flex flex-row gap-4">
			<button
				type="button"
				disabled={prevBtnDisabled}
				onClick={onPrevButtonClick}
				className="grid size-8 touch-manipulation place-items-center rounded-full border bg-white text-black transition-all active:scale-105 disabled:cursor-not-allowed disabled:opacity-50 [&:not(:disabled)]:hover:bg-neutral-100">
				<ChevronLeft className="size-4" />
				<span className="sr-only">Previous</span>
			</button>
			<button
				type="button"
				disabled={nextBtnDisabled}
				onClick={onNextButtonClick}
				className="grid size-8 touch-manipulation place-items-center rounded-full border bg-white text-black transition-all hover:bg-neutral-100 active:scale-105 disabled:cursor-not-allowed disabled:opacity-50">
				<ChevronLeft className="size-4 rotate-180" />
				<span className="sr-only">Next</span>
			</button>
		</div>
	)
}
