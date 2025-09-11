import { PaginatedProduct } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {
  useInfiniteQuery,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";

type QueryParams = Record<string, string | string[] | number | boolean>;

const getShopProducts = async ({
  queryKey,
  pageParam,
}: QueryFunctionContext<
  ["shop-products", number, QueryParams],
  number
>): Promise<PaginatedProduct> => {
  const [, limit, queryParamsObj] = queryKey;

  const params = new URLSearchParams();

  // Add all query parameters
  for (const [key, value] of Object.entries(queryParamsObj || {})) {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.set(key, String(value));
    }
  }

  // Always add pagination
  params.set("page", String(pageParam));
  params.set("limit", String(limit));

  const { data } = await http.get(
    `${API_RESOURCES.PRODUCTS}?${params.toString()}`
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

export const useShopProductsQuery = (
  limit: number,
  queryParamsObj: QueryParams = {}
) => {
  return useInfiniteQuery<
    PaginatedProduct,
    Error,
    InfiniteData<PaginatedProduct>,
    ["shop-products", number, QueryParams],
    number
  >({
    queryKey: ["shop-products", limit, queryParamsObj],
    queryFn: getShopProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.paginatorInfo.nextPage,
  });
};
