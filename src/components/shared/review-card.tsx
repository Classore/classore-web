import { RiStarFill } from "@remixicon/react";

import { cn, getInitials } from "@/lib";
import type { SingleBundleResp } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
	review?: SingleBundleResp["reviews"][number] & { user_role?: string };
	className?: string;
}

export const ReviewCard = ({ review, className }: Props) => {
	const userRole = (review as any)?.user_role || "Student";

	return (
		<li
			className={cn(
				"flex flex-col gap-4 rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-2xs transition hover:shadow-xs",
				className
			)}>
			<div className="flex items-center gap-2">
				<Stars rating={review?.rating_rating ?? 5} />
				<p className="text-xs font-bold text-neutral-800">{review?.rating_rating}.0</p>
			</div>

			<p className="text-sm leading-relaxed text-neutral-600">{review?.rating_comment}</p>

			<div className="flex items-center gap-3 border-t border-neutral-100 pt-3">
				<Avatar className="size-10 rounded-full bg-primary-100 text-primary-700">
					{review?.user_profile_image && (
						<AvatarImage
							src={review.user_profile_image}
							alt={`${review?.user_first_name} ${review?.user_last_name}`}
						/>
					)}
					<AvatarFallback className="uppercase bg-primary-100 text-primary-700 font-bold text-xs">
						{getInitials(`${review?.user_first_name} ${review?.user_last_name}`)}
					</AvatarFallback>
				</Avatar>

				<div>
					<p className="text-sm font-bold capitalize text-neutral-900">{`${review?.user_first_name} ${review?.user_last_name}`}</p>
					<p className="text-xs font-medium text-neutral-400">{userRole}</p>
				</div>
			</div>
		</li>
	);
};

const Stars = ({ rating }: { rating: number }) => {
	const MAX_RATING = 5;

	return (
		<div className="flex items-center gap-1">
			{[...Array(MAX_RATING)].map((_, index) => (
				<RiStarFill
					key={index}
					className={`size-4 ${index < rating ? "text-yellow-500" : "text-neutral-400"}`}
				/>
			))}
		</div>
	);
};
