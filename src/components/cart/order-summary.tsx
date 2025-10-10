"use client";

import React from "react";
import Link from "@/components/shared/link";
import { ROUTES } from "@/utils/routes";
import usePrice from "@/services/product/use-price";

interface OrderSummaryProps {
  subtotal: number;
  discount?: number;
  shippingFee?: number;
  shippingMethod?: string | null;
  total: number;
}

export function OrderSummary({
  subtotal,
  discount = 0,
  shippingFee = 0,
  shippingMethod = "standard",
  total,
}: OrderSummaryProps) {
  const { price: formattedSubtotal } = usePrice({ amount: subtotal });
  const { price: formattedDiscount } = usePrice({ amount: discount });
  const { price: formattedShipping } = usePrice({ amount: shippingFee });
  const { price: formattedTotal } = usePrice({ amount: total });

  return (
    <div className="p-5 md:p-8 bg-white rounded-lg border border-border-base">
      <h2 className="text-lg font-semibold text-brand-dark mb-5">
        Order Summary
      </h2>

      {/* 💰 Summary Details */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-brand-dark">
          <span>Subtotal</span>
          <span>{formattedSubtotal}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>- {formattedDiscount}</span>
          </div>
        )}

        {/* 🚚 Shipping */}
        <div className="flex justify-between text-brand-dark">
          <span>
            Shipping{" "}
            {shippingMethod && (
              <span className="text-sm text-gray-500">({shippingMethod})</span>
            )}
          </span>
          <span>+ {formattedShipping}</span>
        </div>
      </div>

      {/* 🧾 Final Total */}
      <div className="flex justify-between font-bold text-lg pt-6 border-t border-border-base">
        <span>Total</span>
        <span>{formattedTotal}</span>
      </div>

      {/* 🛒 Checkout Button */}
      <div className="mt-4">
        <Link href={ROUTES.CHECKOUT} variant="button-black" className="w-full">
          <span>Proceed to Checkout</span>
        </Link>
      </div>
    </div>
  );
}
