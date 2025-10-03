"use client";

import usePrice from "@/services/product/use-price";
import { Order, OrderItem } from "@/services/order/order-api";
import { Printer } from "lucide-react";
import React from "react";
import Image from "next/image";
import { productPlaceholder } from "@/assets/placeholders";

const OrderItemCard = ({ item }: { item: OrderItem }) => {
  const { price: itemTotal } = usePrice({
    amount: item.price * item.quantity,
  });

  return (
    <div className="flex gap-4">
      <div className="flex w-16 h-16 border rounded-md border-border-base shrink-0">
        <Image
          src={item?.image?.thumbnail || productPlaceholder}
          alt={item.name}
          width={64}
          height={64}
          className="rounded-md"
        />
      </div>
      <div className="flex-1">
        <p className="text-brand-dark text-15px">
          <span className="font-medium">{item.quantity} x </span>
          {item.name}
        </p>
      </div>
      <div className="text-brand-dark text-end">
        <p className="font-semibold">{itemTotal}</p>
      </div>
    </div>
  );
};

const OrderDetails: React.FC<{ order: Order; className?: string }> = ({
  order,
  className = "pt-0 ",
}) => {
  const { price: subtotal } = usePrice({
    amount: order.subtotal,
  });
  const { price: shipping } = usePrice({
    amount: order.shippingFee,
  });
  const { price: total } = usePrice({
    amount: order.totalAmount,
  });

  return (
    <div className={`px-5 py-5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between py-4 my-5 border-b border-border-base">
        <h2 className="text-xl font-medium text-brand-dark">Order Summary</h2>
        <button className="flex items-center text-sm text-blue-600 hover:text-blue-800">
          <Printer className="w-4 h-4 mr-1" />
          <span>Print</span>
        </button>
      </div>

      {/* Items */}
      <div className="border-b border-border-base pb-5">
        <div
          className={`space-y-4 ${
            order?.items?.length >= 5 ? "max-h-64 overflow-y-auto pr-2" : ""
          }`}
        >
          {order?.items?.map((item, index) => (
            <OrderItemCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="space-y-2 mt-5 text-brand-dark">
        <div className="flex justify-between">
          <p className="m-0">Subtotal</p>
          <p className="font-semibold">{subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="m-0">Shipping</p>
          <p className="font-semibold">{shipping}</p>
        </div>
        <div className="flex justify-between items-center text-brand-dark">
          <p className="m-0 font-bold">Order total</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
