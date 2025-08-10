import { QueryOptionsType, Product } from "@/services/types";
import http from "@/services/utils/http";
import { useQuery } from "@tanstack/react-query";

export const fetchProductsByCategory = async ({ queryKey }: any) => {
  const [_key, { category, limit }] = queryKey;
  const { data } = await http.get(`/products.json`, {
    params: { category, limit },
  });
  return data as Product[];
};

export const useProductsQuery = (
  options: QueryOptionsType & { category: string }
) => {
  return useQuery<Product[], Error>({
    queryKey: ["products-by-category", options],
    queryFn: fetchProductsByCategory,
    enabled: !!options.category,
  });
};
