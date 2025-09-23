"use client";

import { useCart } from "@/hooks/use-cart";
import { constructCartItem } from "@/utils/construct-cart-item";
import cn from "classnames";
import { Product, VariationOption } from "@/services/types";
import { useUI } from "@/hooks/use-UI";
import { useModal } from "@/hooks/use-modal";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

interface Props {
  data: Product;
  variation?: VariationOption;
  disabled?: boolean;
  className?: string;
  variant?: string;
}

const AddToCart = ({
  data,
  variation,
  disabled,
  className,
  variant = "mercury",
}: Props) => {
  const { useCartActions, useCartHelpers } = useCart();
  const { isInStock, isInCart } = useCartHelpers();
  const { addToCart, addToCartLoader } = useCartActions(data, variation);

  const { isAuthorized } = useUI();
  const { openModal } = useModal();

  const item = constructCartItem(data!, variation!);
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);

  const handleAddToCart = () => {
    if (!isAuthorized) {
      openModal("LOGIN_VIEW");
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart();
  };

  return (
    <button
      className={cn(
        "min-w-[150px] px-4 py-2 flex relative leading-6 font-medium text-brand-light rounded-full text-[13px] items-center justify-center transition-all",
        className,
        {
          "sm:text-white/30": addToCartLoader,
          [`xs:rounded-none w-full  bg-primary-500 hover:bg-primary-400`]:
            variant === "furni",
          "bg-brand-dark xs:rounded-md hover:bg-gray-800": variant === "dark",
          [`bg-primary-500 hover:bg-primary-400`]: variant === "mercury",
        }
      )}
      aria-label="Add to Cart Button"
      onClick={handleAddToCart}
      disabled={disabled || outOfStock}
    >
      {outOfStock ? "Out Of Stock" : "Add To Cart"}
      {addToCartLoader && (
        <Loader className="w-4 h-4 animate-spin absolute text-white" />
      )}
    </button>
  );
};

export default AddToCart;
