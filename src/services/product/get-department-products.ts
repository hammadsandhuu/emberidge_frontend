// services/product/get-department-products.ts
import { PaginatedProduct } from "@/services/types";
import { API_RESOURCES } from "@/services/utils/api-endpoints";
import http from "@/services/utils/http";
import {
  useInfiniteQuery,
  InfiniteData,
  QueryFunctionContext,
} from "@tanstack/react-query";

type QueryParams = Record<string, string | string[] | number | boolean>;

const getDepartmentProducts = async ({
  queryKey,
  pageParam = 1,
}: QueryFunctionContext<
  ["department-products", string, string, number, QueryParams],
  number
>): Promise<PaginatedProduct> => {
  const [, parentSlug, childSlug, limit, queryParamsObj] = queryKey;

  const params = new URLSearchParams();

  // Add filters
  for (const [key, value] of Object.entries(queryParamsObj || {})) {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.set(key, String(value));
    }
  }

  // Add pagination params
  params.set("page", String(pageParam));
  params.set("limit", String(limit));

  // Add parent and child slugs
  if (parentSlug) params.set("parent", parentSlug);
  if (childSlug) params.set("child", childSlug);

  const { data } = await http.get(
    `${API_RESOURCES.PRODUCTS_BY_SUB_CATEGORIES}?${params.toString()}`
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

export const useDepartmentProductsQuery = (
  parentSlug: string,
  childSlug: string,
  limit: number,
  queryParamsObj: QueryParams = {}
) => {
  return useInfiniteQuery<
    PaginatedProduct,
    Error,
    InfiniteData<PaginatedProduct>,
    ["department-products", string, string, number, QueryParams],
    number
  >({
    queryKey: [
      "department-products",
      parentSlug,
      childSlug,
      limit,
      queryParamsObj,
    ],
    queryFn: getDepartmentProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.paginatorInfo.nextPage,
  });
};
