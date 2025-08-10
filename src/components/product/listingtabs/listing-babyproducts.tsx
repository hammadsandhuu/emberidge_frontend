"use client";

import { useEffect } from "react";
import ListingTabs from "@/components/product/listingtabs/listing-ui/listing-tabs";
import ProductListing from "@/components/product/listingtabs/listing-ui/product-listing";
import Loading from "@/components/shared/loading";
import { useListingTabs } from "@/hooks/use-listing-tabs";
import cn from "classnames";
import { useCategoriesQuery } from "@/services/category/get-all-categories";
import { useBabyKidsProductsQuery } from "@/services/product/get-all-baby-kids-products";

interface Props {
  variant?: string;
  showBanner?: string;
}

const ListingBabyKids: React.FC<Props> = ({
  variant = "default",
  showBanner,
}) => {
  const { activeTab, isPending, handleTabClick } = useListingTabs();
  const { data: allCategories, isLoading: loadingCategories } =
    useCategoriesQuery({ limit: 6 });

  const selectedCategory = allCategories?.find(
    (cat) => cat.slug === "baby-kids"
  );
  useEffect(() => {
    if (selectedCategory?.children?.length && !activeTab) {
      handleTabClick(selectedCategory.children[0].slug);
    }
  }, [selectedCategory, activeTab]);
  const { data: products, isLoading: loadingProducts } =
    useBabyKidsProductsQuery({
      limit: 10,
      category: activeTab || undefined,
    });

  return (
    <div className="mb-8 lg:mb-12">
      <ListingTabs
        variant={variant}
        data={selectedCategory || []}
        onNavClick={handleTabClick}
        activeTab={activeTab}
      />

      <div
        className={cn({
          "xl:flex border border-black/10 rounded bg-white":
            variant === "outBorder",
          "flex-row-reverse": showBanner === "right",
        })}
      >
        {isPending || loadingProducts ? (
          <Loading />
        ) : (
          <ProductListing
            data={products}
            isLoading={loadingProducts}
            variant={variant}
            uniqueKey={"baby-kids"}
          />
        )}
      </div>
    </div>
  );
};

export default ListingBabyKids;
