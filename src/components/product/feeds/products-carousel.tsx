import React from "react";
import SectionHeader from "@/components/common/section-header";
import Carousel from "@/components/shared/carousel/carousel";
import { SwiperSlide } from "@/components/shared/carousel/slider";
import ProductCardLoader from "@/components/shared/loaders/product-card-loader";
import cn from "classnames";
import ProductCard from "@/components/product/productListing/productCards/product-card";
import { BreakpointsType } from "@/services/types";
import useCarouselConfig from "@/hooks/use-carousel-config";

interface ProductsCarouselProps {
  sectionHeading?: string;
  className?: string;
  products: any;
  loading: boolean;
  limit?: number;
  uniqueKey?: string;
  carouselBreakpoint?: BreakpointsType;
  rowCarousel?: number;
}

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({
  sectionHeading,
  className = "",
  products,
  loading,
  limit = 6,
  uniqueKey,
  carouselBreakpoint,
  rowCarousel = 1,
}) => {
  const { spaceBetween, breakpoints } = useCarouselConfig("default");

  return (
    <div className={cn("heightFull relative", className)}>
      {sectionHeading && (
        <SectionHeader
          sectionHeading={sectionHeading}
          className="mb-3 block-title"
        />
      )}

      <div className="relative after-item-opacity">
        <Carousel
          spaceBetween={spaceBetween}
          grid={{ rows: rowCarousel, fill: "row" }}
          breakpoints={carouselBreakpoint || breakpoints}
          prevActivateId={`prev${uniqueKey}`}
          nextActivateId={`next${uniqueKey}`}
          prevButtonClassName="start-3 xl:start-5"
          nextButtonClassName="end-3 xl:end-5"
        >
          {loading
            ? Array.from({ length: limit }).map((_, idx) => (
                <SwiperSlide key={`${uniqueKey}-loader-${idx}`}>
                  <div className="p-2 w-56 h-full rounded bg-white">
                    <ProductCardLoader
                      uniqueKey={`${uniqueKey}-loader-${idx}`}
                    />
                  </div>
                </SwiperSlide>
              ))
            : products?.map((product: any, idx: number) => (
                <SwiperSlide key={`${uniqueKey}-${product.id}`}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductsCarousel;
