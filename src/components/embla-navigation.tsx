import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type UsePrevNextButtonsType = {
	prevBtnDisabled: boolean;
	nextBtnDisabled: boolean;
	onPrevButtonClick: () => void;
	onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
	emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

	const onPrevButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollPrev();
	}, [emblaApi]);

	const onNextButtonClick = useCallback(() => {
		if (!emblaApi) return;
		emblaApi.scrollNext();
	}, [emblaApi]);

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev());
		setNextBtnDisabled(!emblaApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect(emblaApi);
		emblaApi.on("reInit", onSelect).on("select", onSelect);
	}, [emblaApi, onSelect]);

	return {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	};
};

type PropType = {
	emblaApi: EmblaCarouselType | undefined;
};

export const NextPrevButtons = ({ emblaApi }: PropType) => {
	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
		usePrevNextButtons(emblaApi);

	return (
		<div className="flex flex-row gap-2 md:gap-4">
			<button
				type="button"
				disabled={prevBtnDisabled}
				onClick={onPrevButtonClick}
				className="grid size-10 touch-manipulation place-items-center rounded-full border bg-white text-black shadow-sm transition-all active:scale-105 disabled:cursor-not-allowed disabled:opacity-30 [&:not(:disabled)]:hover:bg-neutral-100 md:size-8">
				<ChevronLeft className="size-5 md:size-4" />
				<span className="sr-only">Previous</span>
			</button>
			<button
				type="button"
				disabled={nextBtnDisabled}
				onClick={onNextButtonClick}
				className="grid size-10 touch-manipulation place-items-center rounded-full border bg-white text-black shadow-sm transition-all active:scale-105 disabled:cursor-not-allowed disabled:opacity-30 [&:not(:disabled)]:hover:bg-neutral-100 md:size-8">
				<ChevronLeft className="size-5 rotate-180 md:size-4" />
				<span className="sr-only">Next</span>
			</button>
		</div>
	);
};
