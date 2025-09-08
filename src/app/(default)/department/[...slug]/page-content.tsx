"use client";

import { Element } from "react-scroll";
import React, { useState, useMemo } from "react";
import TopBar from "@/components/category/top-bar";
import { ProductLoadMore } from "@/components/product/productListing/product-loadmore";
import Filters from "@/components/filter/filters";
import DrawerFilter from "@/components/category/drawer-filter";
import { LIMITS } from "@/services/utils/limits";
import { usePathname, useSearchParams } from "next/navigation";
import { useSubCategoryProductsQuery } from "@/services/product/get-products-by-subCategories";

export default function PageContent() {
  const [isGridView, setIsGridView] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pathSegments = pathname.split("/").filter(Boolean);

  const parentSlug = pathSegments[1] || "";
  const childSlug = pathSegments[2] || "";

  // Build query options from search params
  const queryOptions = useMemo(() => {
    return {
      parent: parentSlug,
      child: childSlug,
      limit: LIMITS.PRODUCTS_LIMITS,
      sort_by: searchParams.get("sort_by") || undefined,
      colors: searchParams.getAll("color"),
      sizes: searchParams.getAll("size"),
      min_price: searchParams.get("min_price")
        ? Number(searchParams.get("min_price"))
        : undefined,
      price_max: searchParams.get("price_max")
        ? Number(searchParams.get("price_max"))
        : undefined,
      isOnSale: searchParams.get("isOnSale") === "true",
    };
  }, [searchParams, parentSlug, childSlug]);

  const {
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
    error,
    isError,
  } = useSubCategoryProductsQuery(queryOptions);

  return (
    <Element name="category" className="flex products-category">
      <div className="sticky hidden lg:block h-full shrink-0 ltr:pr-7 rtl:pl-7 w-[300px] top-16">
        <Filters />
      </div>

      {/* Main Content */}
      <div className="w-full">
        <DrawerFilter />
        <TopBar viewAs={isGridView} setViewAs={setIsGridView} />

          <ProductLoadMore
            data={data}
            isLoading={isFetching}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            loadingMore={isFetchingNextPage}
            viewAs={isGridView}
          />
      </div>
    </Element>
  );
}
