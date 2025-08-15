import { Product } from "@/services/types";
import http from "@/services/utils/http";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchProduct = async (slug: string) => {
  const { data } = await http.get(`${API_RESOURCES.PRODUCTS}/${slug}`);
  return data.data.product as Product; // Extract the product from the nested structure
};

export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>({
    queryKey: [API_RESOURCES.PRODUCTS, slug],
    queryFn: () => fetchProduct(slug),
  });
};
