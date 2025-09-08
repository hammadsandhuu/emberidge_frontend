import { PaginatedProduct } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {
  useInfiniteQuery,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";

// Pure fetch function
const getShopProducts = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<
  ["shop-products", number, string?],
  number
>): Promise<PaginatedProduct> => {
  const [, limit, sort_by] = queryKey;

  const { data } = await http.get(
    `${API_RESOURCES.PRODUCTS}?page=${pageParam}&limit=${limit}&sort_by=`
  );

  return {
    data: data.data.products,
    paginatorInfo: {
      nextPage:
        pageParam < Math.ceil(data.results / limit) ? pageParam + 1 : null,
      total: data.results,
    },
  };
};

// React Query hook
export const useShopProductsQuery = (limit: number, sort_by?: string) => {
  return useInfiniteQuery<
    PaginatedProduct,
    Error,
    InfiniteData<PaginatedProduct>,
    ["shop-products", number, string?],
    number
  >({
    queryKey: ["shop-products", limit, sort_by],
    queryFn: getShopProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.paginatorInfo.nextPage,
  });
};
