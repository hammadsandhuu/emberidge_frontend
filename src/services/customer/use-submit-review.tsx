"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { toast } from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";

export interface ReviewInputType {
  productId: string;
  rating: number;
  title: string;
  message: string;
}

export interface ReviewResponse {
  message: string;
  data: any;
}

// API Call
async function submitReviewApi(
  input: ReviewInputType
): Promise<ReviewResponse> {
  const { data } = await http.post<ReviewResponse>(
    `${API_RESOURCES.REVIEWS}/${input.productId}/reviews`,
    {
      rating: input.rating,
      title: input.title,
      comment: input.message,
    }
  );
  return data;
}

// Custom Mutation Hook - Updated to accept config object
export const useSubmitReviewMutation = (config?: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { closeModal } = useModal();

  return useMutation<ReviewResponse, any, ReviewInputType>({
    mutationFn: submitReviewApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Review submitted successfully!");
      config?.onSuccess?.();
      closeModal()
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to submit review.";
      toast.error(message);
    },
  });
};
