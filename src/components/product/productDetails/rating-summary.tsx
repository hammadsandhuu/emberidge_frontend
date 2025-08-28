"use client";
import { Star } from "lucide-react";
import cn from "classnames";
import Button from "@/components/shared/button";

interface RatingSummaryProps {
  data: any;
  className?: string;
  onWriteReview?: () => void;
}

export default function RatingSummary({
  data,
  className,
  onWriteReview,
}: RatingSummaryProps) {
  // Calculate rating distribution from reviews
  const calculateRatingDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const total = data?.reviews?.length || 0;

    data?.reviews?.forEach((review: any) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating as keyof typeof distribution]++;
      }
    });

    // Convert to percentages
    const percentages = Object.entries(distribution).map(([star, count]) => ({
      star: Number.parseInt(star),
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }));

    return percentages.reverse(); // Show 5-star first
  };

  const ratingDistribution = calculateRatingDistribution();
  const averageRating = data?.ratingsAverage || 0;
  const totalRatings = data?.ratingsQuantity || data?.reviews?.length || 0;

  const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star
            key={i}
            className={cn(
              "fill-orange-400 text-orange-400",
              size === "lg" ? "w-5 h-5" : "w-4 h-4"
            )}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star
              className={cn(
                "text-gray-300",
                size === "lg" ? "w-5 h-5" : "w-4 h-4"
              )}
            />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star
                className={cn(
                  "fill-orange-400 text-orange-400",
                  size === "lg" ? "w-5 h-5" : "w-4 h-4"
                )}
              />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star
            key={i}
            className={cn(
              "text-gray-300",
              size === "lg" ? "w-5 h-5" : "w-4 h-4"
            )}
          />
        );
      }
    }
    return stars;
  };

  return (
    <div className={cn("bg-white p-6 rounded-lg border", className)}>
      {/* Overall Rating */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Customer reviews</h3>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-1">
            {renderStars(averageRating, "lg")}
          </div>
          <span className="text-lg font-medium">
            {averageRating.toFixed(1)} out of 5
          </span>
        </div>
        <p className="text-gray-600 text-sm">
          {totalRatings} global rating{totalRatings !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Rating Distribution */}
      <div className="mb-6 space-y-2">
        {ratingDistribution.map(({ star, count, percentage }) => (
          <div key={star} className="flex items-center gap-3 text-sm">
            <span className="w-12 text-primary-500 hover:text-primary-700 cursor-pointer">
              {star} star
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
              <div
                className="bg-primary-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-8 text-primary-400 text-right">
              {percentage}%
            </span>
          </div>
        ))}
      </div>
      {/* Write Review Section */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-semibold mb-2">Review this product</h4>
        <p className="text-gray-600 text-sm mb-4">
          Share your thoughts with other customers
        </p>
        <Button variant="border" onClick={onWriteReview} className="w-full">
          Write a customer review
        </Button>
      </div>
    </div>
  );
}
