import type { FC } from "react";

import StarIcon from "@/components/icons/star-icon";
import { formatDate } from "@/utils/formate-date";

interface ReviewProps {
  review: any;
  index: number;
  className?: string;
}

const ReviewCard: FC<ReviewProps> = ({ review, index, className = "" }) => {
  const userInitial = review?.user?.name
    ? review.user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className={`block ${className}`}>
      {index > 0 && <div className="border-t border-border-base/60 my-6"></div>}

      <div className="flex gap-3 lg:gap-5">
        <div className="w-12 h-12 flex-basic rounded-full bg-primary-500 flex items-center justify-center border border-border-base">
          <span className="text-black text-lg font-medium">{userInitial}</span>
        </div>
        <div className={"flex flex-1 flex-col gap-1"}>
          <div className="text-brand-dark text-15px">{review?.user?.name}</div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, idx) => (
                <StarIcon
                  key={idx}
                  color={idx < review.rating ? "#F3B81F" : "#DFE6ED"}
                  className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5"
                />
              ))}
            </div>
            <div className="text-gray-400 text-13px">
              .{formatDate(review.createdAt)}
            </div>
          </div>
          <div className="text-brand-dark text-15px">{review?.title}</div>
          <p className="text-sm leading-6 ">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
