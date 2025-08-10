"use client";

import { useEffect } from "react";
import ListingTabs from "@/components/product/listingtabs/listing-ui/listing-tabs";
import ProductListing from "@/components/product/listingtabs/listing-ui/product-listing";
import Loading from "@/components/shared/loading";
import { useListingTabs } from "@/hooks/use-listing-tabs";
import cn from "classnames";
import { useCategoriesQuery } from "@/services/category/get-all-categories";
import { useProductsQuery } from "@/services/product/get-products";

interface Props {
  parentSlug: string
  variant?: string;
  showBanner?: string;
}

const ListingCategory: React.FC<Props> = ({
  parentSlug,
  variant = "default",
  showBanner,
}) => {
  const { activeTab, isPending, handleTabClick } = useListingTabs();
  const { data: allCategories, isLoading: loadingCategories } =
    useCategoriesQuery({ limit: 20 });

  const selectedCategory = allCategories?.find(
    (cat) => cat.slug === parentSlug
  );

  // Set default active tab
  useEffect(() => {
    if (selectedCategory?.children?.length && !activeTab) {
      handleTabClick(selectedCategory.children[0].slug);
    }
  }, [selectedCategory, activeTab]);

  // Fetch products dynamically for the active tab
  const { data: products, isLoading: loadingProducts } = useProductsQuery({
    limit: 10,
    category: activeTab || selectedCategory?.slug || "",
  });

  if (loadingCategories) return <Loading />;

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
            uniqueKey={parentSlug}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCategory;
