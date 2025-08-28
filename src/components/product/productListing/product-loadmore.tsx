import React, { FC } from "react";

import Button from "@/components/shared/button";
import ProductCard from "@/components/product/productListing/productCards/product-card";
import ProductCardList from "@/components/product/productListing/productCards/product-list";
import { PaginatedProduct, Product } from "@/services/types";
import { InfiniteData } from "@tanstack/react-query";
import Loading from "@/components/shared/loading";

interface ProductProps {
  data?: InfiniteData<PaginatedProduct, unknown>; // Use InfiniteData from useInfiniteQuery
  isLoading?: boolean;
  className?: string;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  loadingMore?: boolean;
  viewAs: boolean;
}

export const ProductLoadMore: FC<ProductProps> = ({
  data,
  isLoading,
  fetchNextPage,
  hasNextPage,
  loadingMore,
  className = "",
  viewAs,
}) => {
  // Check if there are any products across all pages
  const hasProducts = data?.pages?.some(
    (page) => page.data && page.data.length > 0
  );

  return (
    <>
      <div
        className={`${
          viewAs
            ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1.5"
            : "grid grid-cols-1 gap-1.5"
        } ${className}`}
      >
        {isLoading ? (
          <div className="col-span-full">
            <Loading />
          </div>
        ) : hasProducts ? (
          data?.pages?.map((page: PaginatedProduct) => {
            if (viewAs) {
              return page.data.map((product: Product) => (
                <ProductCard
                  key={`product--key-${product.id}`}
                  product={product}
                />
              ));
            } else {
              return page.data.map((product: Product) => (
                <ProductCardList
                  key={`product--key-${product.id}`}
                  product={product}
                />
              ));
            }
          })
        ) : (
          <div className="col-span-full flex justify-center items-center bg-white rounded py-5">
            <p className="text-brand-dark">No products available</p>
          </div>
        )}
        {/* end of error state */}
      </div>

      <div className="mt-1.5 py-5 text-center bg-white rounded">
        {hasNextPage ? (
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage?.()}
            className={"w-60 xs:capitalize"}
            variant={"primary"}
          >
            Load More
          </Button>
        ) : (
          hasProducts && (
            <p className="text-brand-dark">No more products to load</p>
          )
        )}
      </div>
    </>
  );
};
