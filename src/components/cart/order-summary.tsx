"use client";

import React, { useState } from "react";
import Link from "@/components/shared/link";
import { ROUTES } from "@/utils/routes";
import Input from "../shared/form/input";
import { Loader, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import usePrice from "@/services/product/use-price"; // ✅ usePrice import

interface OrderSummaryProps {
  subtotal: number;
  discount?: number;
  total: number;
  onApplyCoupon: (code: string) => Promise<void>;
  onRemoveCoupon?: () => Promise<void>;
  isApplying?: boolean;
  isRemoving?: boolean;
}

export function OrderSummary({
  subtotal,
  discount = 0,
  total,
  onApplyCoupon,
  onRemoveCoupon,
  isApplying = false,
  isRemoving = false,
}: OrderSummaryProps) {
  const [coupon, setCoupon] = useState("");
  const { coupon: appliedCoupon } = useCartStore();

  // ✅ usePrice hooks (same as in CartItem)
  const { price: formattedSubtotal } = usePrice({ amount: subtotal });
  const { price: formattedDiscount } = usePrice({ amount: discount });
  const { price: formattedTotal } = usePrice({ amount: total });

  const handleApply = () => {
    if (coupon.trim() && !appliedCoupon) {
      onApplyCoupon(coupon.trim());
      setCoupon("");
    }
  };

  const handleRemove = () => {
    if (onRemoveCoupon) onRemoveCoupon();
  };

  return (
    <div className="p-5 md:p-8 bg-white rounded-lg border border-border-base">
      {/* Subtotal */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-border-base font-medium text-brand-dark">
        <h2 className="text-lg">Subtotal</h2>
        <span className="text-lg">{formattedSubtotal}</span>
      </div>

      {/* Coupon Section */}
      <div className="space-y-3 mb-5">
        <h3 className="text-brand-dark mb-2 font-medium">Coupon</h3>

        {appliedCoupon ? (
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-sm">
            <div className="space-y-2">
              <span className="text-green-700 font-medium">
                Applied: {appliedCoupon.code}
              </span>
              <p className="text-green-700 text-sm">
                Discount:{" "}
                {appliedCoupon.discountType === "percentage"
                  ? `${appliedCoupon.discountValue}%`
                  : `$${appliedCoupon.discountValue?.toFixed(2) ?? 0}`}
              </p>
            </div>
            <button
              className="text-red-600 hover:text-red-800 flex items-center justify-center"
              onClick={handleRemove}
              title="Remove coupon"
              disabled={isRemoving}
            >
              {isRemoving ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Input
              name="coupon"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1"
            />
            <button
              onClick={handleApply}
              disabled={isApplying}
              className="px-4 py-2 bg-black text-white rounded-md flex items-center justify-center gap-2"
            >
              {isApplying ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                "Apply"
              )}
            </button>
          </div>
        )}
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="flex justify-between text-green-600 font-medium mb-4">
          <span>Discount</span>
          <span>- {formattedDiscount}</span>
        </div>
      )}

      {/* Total */}
      <div className="flex justify-between font-bold text-lg pt-6 border-t border-border-base">
        <span>Total</span>
        <span>{formattedTotal}</span>
      </div>

      <div className="mt-2">
        <Link
          href={ROUTES.CHECKOUT}
          variant={"button-black"}
          className="w-full"
        >
          <span className="py-0.5">Check Out</span>
        </Link>
      </div>
    </div>
  );
}
