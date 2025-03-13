import { RiStarFill } from "@remixicon/react";

import { cn, getInitials } from "@/lib";
import type { SingleBundleResp } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  review?: SingleBundleResp["reviews"][number];
  className?: string;
}

export const ReviewCard = ({ review, className }: Props) => {
  return (
    <li
      className={cn("flex flex-col gap-4 rounded-xl bg-white p-4", className)}
    >
      <div className="flex items-center gap-2">
        <Stars rating={review?.rating_rating ?? 0} />
        <p className="text-sm">{review?.rating_rating}</p>
      </div>

      <p className="text-sm leading-relaxed text-neutral-400">
        {review?.rating_comment}
      </p>

      <div className="flex items-center gap-2">
        <Avatar className="size-10 rounded-md bg-neutral-200">
          <AvatarImage src="" />
          <AvatarFallback className="uppercase">
            {getInitials(
              `${review?.user_first_name} ${review?.user_last_name}`,
            )}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="text-sm capitalize text-neutral-700">{`${review?.user_first_name} ${review?.user_last_name}`}</p>
          <p className="text-xs text-neutral-400">Student</p>
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
