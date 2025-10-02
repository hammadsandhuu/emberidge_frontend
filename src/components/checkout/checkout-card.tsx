"use client";

import React from "react";
import cn from "classnames";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { useIsMounted } from "@/utils/use-is-mounted";

import { useCart } from "@/hooks/use-cart";
import Button from "@/components/shared/button";
import Loading from "@/components/shared/loading";
import { CheckoutItem } from "@/components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";

const CheckoutCard: React.FC = () => {
  const router = useRouter();
  const {
    items,
    total = 0,
    discount = 0,
    finalTotal = 0,
    coupon,
    isEmpty,
  } = useCart();
  const mounted = useIsMounted();

  const orderHeader = () => {
    if (!isEmpty) {
      router.push(ROUTES.ORDERS as any);
    }
  };

  const checkoutFooter = [
    { id: 1, name: "Subtotal", price: `$${total.toFixed(2)}` },
    ...(coupon
      ? [
          {
            id: 2,
            name: `Discount`,
            price: `- $${discount.toFixed(2)}`,
          },
        ]
      : []),
    { id: 3, name: "Order total", price: `$${finalTotal.toFixed(2)}` },
  ];

  if (!mounted) {
    return (
      <div className="bg-white p-5 md:p-8 border rounded-md border-border-base">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-border-base">
          <h2 className="text-lg font-medium text-brand-dark">Order Summary</h2>
        </div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-white p-5 md:p-8 border rounded-md border-border-base">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-border-base">
        <h2 className="text-lg font-medium text-brand-dark">Order Summary</h2>
      </div>

      <div className="space-y-4 pb-5">
        {isEmpty ? (
          <p className="py-4 text-center text-gray-500">Your cart is empty.</p>
        ) : (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        )}
      </div>

      {!isEmpty && (
        <>
          <div className="space-y-2 pt-5 border-t border-border-base">
            {checkoutFooter.map((item) => (
              <CheckoutCardFooterItem item={item} key={item.id} />
            ))}
          </div>

          <Button
            variant="dark"
            className={cn("w-full mt-8 uppercase px-4 py-3 transition-all", {
              "opacity-50 cursor-not-allowed": isEmpty,
            })}
            onClick={orderHeader}
            disabled={isEmpty}
          >
            Order Now
          </Button>
        </>
      )}
    </div>
  );
};

export default CheckoutCard;
