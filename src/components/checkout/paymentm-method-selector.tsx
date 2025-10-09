"use client";

import { useState } from "react";
import { CreditCard, HandCoins } from "lucide-react";
import Button from "@/components/shared/button";
import { useRouter } from "next/navigation";
import { useCreateOrderMutation } from "@/services/order/order-api";
import { ROUTES } from "@/utils/routes";
import toast from "react-hot-toast";
import StripeCustomWrapper from "./StripePayment";

interface PaymentMethodSelectorProps {
  addressId: string;
  metadata?: object;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  addressId,
  metadata,
}) => {
  const [method, setMethod] = useState<"stripe" | "cod" | null>(null);
  const { mutateAsync: createOrder } = useCreateOrderMutation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCODOrder = async () => {
    if (!addressId) {
      toast.error("Please select a shipping address first");
      return;
    }

    setLoading(true);
    try {
      const { order } = await createOrder({
        addressId,
        paymentMethod: "COD",
        metadata,
      });

      toast.success("Order placed successfully (Cash on Delivery)");
      router.push(ROUTES.ORDER_CONFIRMATION(order._id));
    } catch (err: any) {
      toast.error(err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Payment Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Stripe Option */}
        <button
          type="button"
          onClick={() => setMethod("stripe")}
          className={`flex items-center gap-3 border rounded-xl p-4 transition-all duration-200 hover:shadow-md ${
            method === "stripe"
              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-400"
              : "border-gray-300 bg-white"
          }`}
        >
          <div
            className={`p-2 rounded-full ${
              method === "stripe"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <CreditCard size={24} strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <h4 className="text-base font-semibold text-gray-800">
              Pay with Card
            </h4>
            <p className="text-sm text-gray-500">
              Secure online payment via Stripe
            </p>
          </div>
        </button>

        {/* COD Option */}
        <button
          type="button"
          onClick={() => setMethod("cod")}
          className={`flex items-center gap-3 border rounded-xl p-4 transition-all duration-200 hover:shadow-md ${
            method === "cod"
              ? "border-green-500 bg-green-50 ring-2 ring-green-400"
              : "border-gray-300 bg-white"
          }`}
        >
          <div
            className={`p-2 rounded-full ${
              method === "cod"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <HandCoins size={24} strokeWidth={1.5} />
          </div>
          <div className="text-left">
            <h4 className="text-base font-semibold text-gray-800">
              Cash on Delivery
            </h4>
            <p className="text-sm text-gray-500">Pay when your order arrives</p>
          </div>
        </button>
      </div>

      {/* Render selected method */}
      {method === "stripe" && (
        <div className="mt-6 border rounded-xl p-5 bg-[#0F172A] text-white">
          <StripeCustomWrapper addressId={addressId} metadata={metadata} />
        </div>
      )}

      {method === "cod" && (
        <div className="mt-6 space-y-4">
          {/* COD Information Paragraph */}
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong>Note:</strong> With Cash on Delivery, you can pay for your
            order when it arrives at your doorstep. Please make sure you have
            the exact amount ready, as our delivery partners may not always
            carry change. Once your order is confirmed, our team will process it
            for shipment immediately.
          </p>

          <Button
            onClick={handleCODOrder}
            disabled={loading}
            className="w-fit bg-green-600 hover:bg-green-700"
          >
            {loading ? "Placing Order..." : "Confirm COD Order"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
