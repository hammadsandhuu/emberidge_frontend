"use client";

import React from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/shared/loading";
import OrderDetails from "@/components/orders/order-details";
import Link from "@/components/shared/link";
import cn from "classnames";
import { useOrderQuery } from "@/services/order/order-api";
import {
  CheckCircle,
  Mail,
  Phone,
  ShoppingBag,
  Package,
  FileText,
} from "lucide-react";

export default function OrderInformation() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { data, isLoading } = useOrderQuery(orderId);
  console.log("Order Data:", data);
  const order = data?.order;

  if (isLoading) return <Loading />;

  return (
    <div className="py-10 lg:py-10">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 xl:gap-8">
        {/* Left Section */}
        <div className="bg-white w-full px-5 md:px-8 py-8 rounded-lg space-y-6 border border-border-base">
          {/* Success Header */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-base md:text-lg xl:text-[20px] font-semibold text-brand-dark">
                Thank you {order?.shippingAddress?.fullName || "Customer"}!
              </h2>
              <p className="text-green-600 font-medium mt-1">
                Your order has been confirmed
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            An email confirmation has been sent to your email address. If you
            have any questions, contact us:
          </p>
          {/* Order Details Cards */}
          <div className="space-y-4 flex flex-col sm:flex-row sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-border-base">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Order Number
                  </p>
                  <p className="text-lg font-semibold text-brand-dark">
                    {order?.orderNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-border-base">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tracking Number
                  </p>
                  <p className="text-lg font-semibold text-brand-dark">
                    {order?.trackingNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="pt-6 border-t border-border-base">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-600" />
                <Link
                  href="mailto:sales@embridge.com"
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                >
                  sales@embridge.com
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-600" />
                <Link
                  href="tel:(1800)-000-6890"
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                >
                  (1800)-000-6890
                </Link>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-border-base">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                variant="button-black"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium text-sm flex-1 text-center"
              >
                <ShoppingBag className="w-4 h-4" />
                CONTINUE SHOPPING
              </Link>

              <Link
                href="/orders"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm flex-1 text-center"
              >
                <FileText className="w-4 h-4" />
                VIEW ALL ORDERS
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-lg border border-border-base">
          {order ? <OrderDetails order={order} /> : <p>No order found.</p>}
        </div>
      </div>
    </div>
  );
}
