import { CategoriesQueryOptionsType, Category } from "@/services/types";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

// Pure fetch function (Server & Client both)
export const fetchCategories = async () => {
  const res = await http.get(API_RESOURCES.CATEGORIES);
  return res.data.data.categories as Category[];
};

// React Query hook (Client only)
export const useCategoriesQuery = (
  options: CategoriesQueryOptionsType,
  reactQueryOptions: Record<string, any> = {}
) => {
  return useQuery<Category[], Error>({
    queryKey: ["all-categories", options],
    queryFn: fetchCategories,
    ...reactQueryOptions,
  });
};
