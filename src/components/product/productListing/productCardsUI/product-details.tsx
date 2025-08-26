import React from "react";
import Link from "@/components/shared/link";
import { Product } from "@/services/types";
import StarIcon from "@/components/icons/star-icon";
import { ROUTES } from "@/utils/routes";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { name, slug } = product;

  return (
    <>
      <Link
        href={`${ROUTES.PRODUCT}/${slug}`}
        className="text-brand-dark text-sm min-h-[40px] leading-5 line-clamp-2 mt-1 mb-2"
      >
        {name}
      </Link>
      <div className="flex text-gray-500 space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, idx) => (
            <StarIcon
              key={idx}
              color={idx < 5 ? "#F3B81F" : "#DFE6ED"}
              className="w-3 h-3 mx-px"
            />
          ))}
        </div>
        <span className="text-[13px] leading-4">(2 reviews)</span>
      </div>
    </>
  );
};

export default ProductDetails;
