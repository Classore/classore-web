import { RiArrowLeftSLine } from "@remixicon/react";
import React from "react";

interface Props {
	current: number;
	onPageChange: (page: number) => void;
	pageSize: number;
	total: number;
}

export const Pagination = ({ current, onPageChange, pageSize, total }: Props) => {
	const totalPages = Math.ceil(total / pageSize);

	const onNextClick = () => {
		if (current < totalPages) {
			onPageChange(current + 1);
		}
	};

	const onPreviousClick = () => {
		if (current > 1) {
			onPageChange(current - 1);
		}
	};

	const renderPageButton = (index: number) => (
		<button
			key={index}
			onClick={() => onPageChange(index)}
			className={`grid size-8 place-items-center rounded-md text-sm font-medium ${current === index ? "bg-neutral-200 text-neutral-900" : "text-neutral-400"}`}>
			{index}
		</button>
	);

	const renderButtons = () => {
		const numbers = [];
		const maxVisibleButtons = 5;

		if (totalPages <= maxVisibleButtons) {
			for (let i = 1; i <= totalPages; i++) {
				numbers.push(renderPageButton(i));
			}
		} else {
			numbers.push(renderPageButton(1));

			if (current <= 3) {
				for (let i = 2; i <= 4; i++) {
					numbers.push(renderPageButton(i));
				}
				numbers.push(
					<span key="ellipsis" className="px-2">
						...
					</span>
				);
			} else if (current >= totalPages - 2) {
				numbers.push(
					<span key="ellipsis" className="px-2">
						...
					</span>
				);
				for (let i = totalPages - 3; i < totalPages; i++) {
					numbers.push(renderPageButton(i));
				}
			} else {
				numbers.push(
					<span key="ellipsis-start" className="px-2">
						...
					</span>
				);
				for (let i = current - 1; i <= current + 1; i++) {
					numbers.push(renderPageButton(i));
				}
				numbers.push(
					<span key="ellipsis-end" className="px-2">
						...
					</span>
				);
			}

			numbers.push(renderPageButton(totalPages));
		}

		return numbers;
	};

	return (
		<div className="flex w-full items-center justify-between">
			<p className="text-sm text-neutral-400">
				Showing results {(current - 1) * pageSize + 1} to {Math.min(current * pageSize, total)} of{" "}
				{total} items
			</p>
			<div className="flex items-center gap-x-4">
				<button
					onClick={onPreviousClick}
					disabled={totalPages === 0 || current === 1}
					className="grid size-8 place-items-center rounded-md border border-neutral-300 disabled:cursor-not-allowed disabled:opacity-50">
					<RiArrowLeftSLine className="size-5" />
				</button>
				<div className="flex items-center gap-x-4">{renderButtons()}</div>
				<button
					onClick={onNextClick}
					disabled={totalPages === 0 || current === totalPages}
					className="grid size-8 place-items-center rounded-md border border-neutral-300 disabled:cursor-not-allowed disabled:opacity-50">
					<RiArrowLeftSLine className="size-5 rotate-180" />
				</button>
			</div>
		</div>
	);
};
