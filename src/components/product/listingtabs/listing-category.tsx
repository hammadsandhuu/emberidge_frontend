"use client";

import React, { useEffect, useMemo } from "react";
import ListingTabs from "@/components/product/listingtabs/listing-ui/listing-tabs";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import ProductCardLoader from "@/components/shared/loaders/product-card-loader";
import ProductCard from "@/components/product/productListing/productCards/product-card";
import { useListingTabs } from "@/hooks/use-listing-tabs";
import { useCategoriesQuery } from "@/services/category/get-all-categories";
import { useProductsQueryByCategories } from "@/services/product/get-products";
import { BreakpointsType } from "@/services/types";
import useCarouselConfig from "@/hooks/use-carousel-config";

interface Props {
  parentSlug: string;
  subSlug?: string;
}

const ListingCategory: React.FC<Props> = ({ parentSlug, subSlug }) => {
  const { activeTab, handleTabClick } = useListingTabs();
  const { data: allCategories } = useCategoriesQuery({ limit: 20 });
  const selectedCategory = allCategories?.find(
    (cat) => cat.slug === parentSlug
  );

  useEffect(() => {
    if (selectedCategory?.children?.length && !activeTab) {
      handleTabClick(selectedCategory.children[0].slug);
    }
  }, [selectedCategory, activeTab]);

  const { data: products, isLoading: loadingProducts } =
    useProductsQueryByCategories({
      limit: 10,
      categorySlug: parentSlug,
      subCategorySlug: subSlug || activeTab || "",
    });

  const breakpoints: BreakpointsType = useMemo(
    () => ({
      "1536": { slidesPerView: 6 },
      "1280": { slidesPerView: 5 },
      "1024": { slidesPerView: 3 },
      "640": { slidesPerView: 3 },
      "360": { slidesPerView: 2 },
      "0": { slidesPerView: 1 },
    }),
    []
  );

  const { spaceBetween, breakpoints: defaultBreakpoints } =
    useCarouselConfig("default");

  return (
    <div className="mb-8 lg:mb-12">
      {/* Tabs */}
      <ListingTabs
        data={selectedCategory || []}
        onNavClick={handleTabClick}
        activeTab={activeTab}
      />
      <div className="relative after-item-opacity mt-5 min-h-[320px]">
        {loadingProducts ? (
          <Carousel
            spaceBetween={spaceBetween}
            breakpoints={breakpoints || defaultBreakpoints}
            prevActivateId={`prev-${parentSlug}`}
            nextActivateId={`next-${parentSlug}`}
            prevButtonClassName="start-3 xl:start-5"
            nextButtonClassName="end-3 xl:end-5"
          >
            {Array.from({ length: 6 }).map((_, idx) => (
              <SwiperSlide key={`loader-${idx}`}>
                <div className="w-full h-[320px] p-2 flex justify-center items-center bg-white rounded">
                  <ProductCardLoader uniqueKey={`loader-${idx}`} />
                </div>
              </SwiperSlide>
            ))}
          </Carousel>
        ) : products && products.length > 0 ? (
          <Carousel
            spaceBetween={spaceBetween}
            breakpoints={breakpoints || defaultBreakpoints}
            prevActivateId={`prev-${parentSlug}`}
            nextActivateId={`next-${parentSlug}`}
            prevButtonClassName="start-3 xl:start-5"
            nextButtonClassName="end-3 xl:end-5"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <div className="flex justify-center items-center h-[320px] bg-white rounded">
            <p className="text-brand-dark">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCategory;
