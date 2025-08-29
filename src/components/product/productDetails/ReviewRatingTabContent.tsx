"use client";

import ReviewCard from "@/components/cards/review-card";
import cn from "classnames";
import Heading from "@/components/shared/heading";
import Cookies from "js-cookie";
import { useUI } from "@/hooks/use-UI";
import RatingSummary from "./rating-summary";
import { useModal } from "@/hooks/use-modal";
import toast from "react-hot-toast";
import { useState } from "react"; // Import useState for state management
import Button from "@/components/shared/button";

interface ReviewRatingTabContentProps {
  data: any;
  useHeading?: boolean;
  className?: string;
}

export default function ReviewRatingTabContent({
  data,
  className,
  useHeading = false,
}: ReviewRatingTabContentProps) {
  const { isAuthorized } = useUI();
  const isLoggedIn = isAuthorized ?? !!Cookies.get("auth_token");
  const { openModal } = useModal();
  const [visibleReviews, setVisibleReviews] = useState(10);
  const loadMoreReviews = () => {
    setVisibleReviews((prev) => prev + 10);
  };

  const handleWriteReview = () => {
    if (isLoggedIn) {
      openModal("WRITE_REVIEW", { productId: data.id });
    } else {
      toast.error("Please log in first to write a review.");
      openModal("LOGIN_VIEW");
    }
  };
  const reviewsToShow = data?.reviews?.slice(0, visibleReviews) || [];

  return (
    <>
      {useHeading && (
        <Heading
          variant="titleLarge"
          className="mb-5 lg:mb-10 text-center p-1.5 px-4 bg-gray-100/80 rounded"
        >
          Customer Reviews
        </Heading>
      )}
      <div className={cn("lg:flex", className)}>
        {/* Reviews List */}
        <div className="pt-2 basis-2/2">
          {reviewsToShow.length > 0 ? (
            <>
              {reviewsToShow.map((review: any, index: number) => (
                <ReviewCard key={review._id} review={review} index={index} />
              ))}
              {data?.reviews && data.reviews.length > visibleReviews && (
                <div className="flex justify-center mt-6">
                  <Button
                    onClick={loadMoreReviews}
                    className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors"
                  >
                    Load More Reviews
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="text-brand-muted">No reviews yet.</p>
          )}
        </div>
        <div className="basis-1/2 lg:ps-10 xl:ps-14 3xl:ps-20 shrink-0">
          <RatingSummary data={data} onWriteReview={handleWriteReview} />
        </div>
      </div>
    </>
  );
}
