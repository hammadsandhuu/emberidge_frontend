"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useIsMounted } from "@/utils/use-is-mounted";

import { useCart } from "@/hooks/use-cart";
import Loading from "@/components/shared/loading";
import { CheckoutItem } from "@/components/checkout/checkout-card-item";
import { CheckoutCardFooterItem } from "./checkout-card-footer-item";

const CheckoutCard: React.FC = () => {
  const {
    items,
    total = 0,
    discount = 0,
    finalTotal = 0,
    coupon,
    isEmpty,
  } = useCart();
  const mounted = useIsMounted();

  const checkoutFooter = [
    { id: 1, name: "Subtotal", price: total },
    ...(coupon
      ? [
          {
            id: 2,
            name: "Discount",
            price: discount,
          },
        ]
      : []),
    { id: 3, name: "Order total", price: finalTotal },
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
      <div
        className={`space-y-4 pb-5 ${
          items.length > 5 ? "max-h-80 overflow-y-auto pr-2" : ""
        }`}
      >
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
        </>
      )}
    </div>
  );
};

export default CheckoutCard;
