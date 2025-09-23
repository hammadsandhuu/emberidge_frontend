import { useState, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useCartStore } from "@/stores/useCartStore";
import type { CartState } from "@/stores/useCartStore";
import { Product, VariationOption } from "@/services/types";
import { constructCartItem } from "@/utils/construct-cart-item";
import { Item } from "@/services/utils/cartUtils";
import {
  useCartQuery,
  useAddToCart,
  useUpdateCartItem,
  useRemoveFromCart,
  useClearCart,
} from "@/services/cart/cart-api";
import toast from "react-hot-toast";

export const useCart = () => {
  const cartStore = useCartStore(
    useShallow((state: CartState) => ({
      items: state.items,
      isEmpty: state.isEmpty,
      totalItems: state.totalItems,
      totalUniqueItems: state.totalUniqueItems,
      total: state.total,
      addItemWithQuantity: state.addItemWithQuantity,
      updateItem: state.updateItem,
      removeItem: state.removeItem,
      resetCart: state.resetCart,
    }))
  );

  // React Query
  const { data: cartData, isLoading: isCartLoading } = useCartQuery();
  const addMutation = useAddToCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveFromCart();
  const clearMutation = useClearCart();

  // Sync Zustand with backend cart
  useEffect(() => {
    if (cartData) {
      cartStore?.resetCart();
      cartData?.forEach((item: Item) => {
        cartStore?.addItemWithQuantity(item, item.quantity || 1);
      });
    }
  }, [cartData]);

  /** 🛒 Actions */
  const useCartActions = (
    data?: Item | Product,
    selectedVariation?: VariationOption,
    selectedQuantity: number = 1
  ) => {
    const [addToCartLoader, setAddToCartLoader] = useState(false);

    // ------------------------
    // Add item
    // ------------------------
    const addToCart = async () => {
      if (!data) return;
      setAddToCartLoader(true);
      const item = constructCartItem(data, selectedVariation!);

      try {
        await addMutation.mutateAsync({
          productId: item.id,
          quantity: selectedQuantity,
        });
        toast.success(`${item.name} added to cart`);
      } catch (err) {
        toast.error("Failed to add item to cart");
      } finally {
        setTimeout(() => setAddToCartLoader(false), 500);
      }
    };

    // ------------------------
    // Update quantity
    // ------------------------
    const updateQuantity = async (productId: string, quantity: number) => {
      try {
        await updateMutation.mutateAsync({ productId, quantity });
        toast.success("Cart updated");
      } catch (err) {
        toast.error("Failed to update item");
      }
    };

    // ------------------------
    // Remove item
    // ------------------------
    const removeItem = async (productId: string) => {
      try {
        await removeMutation.mutateAsync(productId);
        toast.success("Item removed from cart");
      } catch (err) {
        toast.error("Failed to remove item");
      }
    };

    // ------------------------
    // Clear cart
    // ------------------------
    const clearCart = async () => {
      try {
        await clearMutation.mutateAsync();
        toast.success("Cart cleared");
      } catch (err) {
        toast.error("Failed to clear cart");
      }
    };

    return {
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      addToCartLoader,
      isUpdating: updateMutation.isPending,
      isRemoving: removeMutation.isPending,
    };
  };

  /** Helpers */
  const useCartHelpers = () => {
    const store = useCartStore();

    const isInCart = (productId: string | number) =>
      store.items.some((item) => item.id === productId);

    const getItemFromCart = (productId: string | number) =>
      store.items.find((item) => item.id === productId);

    const isInStock = (productId: string | number) => {
      const cartItem = getItemFromCart(productId);
      if (cartItem && cartItem.stock !== undefined) {
        return cartItem.quantity! < cartItem.stock;
      }
      return true;
    };

    const outOfStock = (productId: string | number) =>
      isInCart(productId) && !isInStock(productId);

    return { isInCart, getItemFromCart, isInStock, outOfStock };
  };

  return {
    ...cartStore,
    useCartHelpers,
    useCartActions,
    isCartLoading,
  };
};
