"use client";

import ListingCategory from "@/components/product/listingtabs/listing-category";
import { useCategoriesQuery } from "@/services/category/get-all-categories";

export default function CategoriesSection({
  initialCategories,
}: {
  initialCategories: any[];
}) {
  const { data: categories, isLoading } = useCategoriesQuery(
    { limit: 6 },
    { initialData: initialCategories }
  );


  return (
    <>
      {categories?.map((cat) => (
        <ListingCategory
          key={cat.id}
          parentSlug={cat.slug}
        />
      ))}
    </>
  );
}
