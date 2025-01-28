import Image from "next/image";
import React from "react";

interface Props {
	images: string[];
	count?: number;
	shape?: "round" | "square";
	size?: number;
}

export const AvatarGroup = ({
	images,
	count = 4,
	shape = "square",
	size = 32,
}: Props) => {
	const totalImages = images.length;
	const displayedImages = images.slice(0, count);
	const remainingCount = totalImages - count;

	const colors = React.useMemo(() => {
		return Array.from({ length: count }, () => {
			const hue = Math.floor(Math.random() * 360);
			const saturation = Math.floor(Math.random() * 25) + 70;
			const lightness = Math.floor(Math.random() * 25) + 70;
			return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
		});
	}, [count]);

	return (
		<div className="flex items-center">
			{displayedImages.map((image, index) => (
				<div
					key={index}
					style={{
						height: `${size}px`,
						marginLeft: index === 0 ? 0 : `${-size / 4}px`,
						zIndex: index + 1,
						backgroundColor: colors[index],
					}}
					className={`relative aspect-square border-2 border-white ${shape === "round" ? "rounded-full" : "rounded-lg"}`}>
					<Image
						src={image}
						alt={`avatar-${index}`}
						fill
						sizes="(max-width:1024px)1005"
						className="rounded-lg object-cover"
					/>
				</div>
			))}
			{remainingCount > 0 && (
				<div
					style={{ height: `${size}px`, marginLeft: `${-size / 4}px`, zIndex: count + 1 }}
					className={`relative grid aspect-square place-items-center border-2 border-white bg-[#52c4ec] text-xs font-light ${shape === "round" ? "rounded-full" : "rounded-lg"}`}>
					+{remainingCount}
				</div>
			)}
		</div>
	);
};
