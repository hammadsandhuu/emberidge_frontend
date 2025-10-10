"use client";

import { useState, useMemo } from "react";
import { CreditCard, HandCoins, Check } from "lucide-react";
import Button from "@/components/shared/button";
import { useRouter } from "next/navigation";
import { useCreateOrderMutation } from "@/services/order/order-api";
import { ROUTES } from "@/utils/routes";
import toast from "react-hot-toast";
import StripeCustomWrapper from "./StripePayment";
import usePrice from "@/services/product/use-price";

interface PaymentMethodSelectorProps {
  addressId: string;
  metadata?: object;
}

const COD_EXTRA_FEE = 2.0;

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  addressId,
  metadata,
}) => {
  const [method, setMethod] = useState<"stripe" | "cod" | null>(null);
  const { mutateAsync: createOrder } = useCreateOrderMutation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { price: formattedCodFee } = usePrice({ amount: COD_EXTRA_FEE });

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
        metadata: {
          ...metadata,
          codCharge: COD_EXTRA_FEE,
        },
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
          className={`relative border rounded-xl shadow-sm p-4 cursor-pointer transition-all duration-200 flex items-start gap-3 ${
            method === "stripe"
              ? "border-primary-500 ring-2 ring-primary-500/30 bg-primary-500/5"
              : "border-border hover:border-primary-500/40 bg-white"
          }`}
        >
          {/* Selection Check Icon */}
          {method === "stripe" && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center shadow">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}

          <div
            className={`p-2 rounded-full flex-shrink-0 ${
              method === "stripe"
                ? "bg-primary-500 text-primary-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <CreditCard size={20} strokeWidth={1.5} />
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-lg font-semibold mb-1">Pay with Card</h4>
            <p className="text-sm">Secure online payment via Stripe.</p>
          </div>
        </button>

        {/* COD Option */}
        <button
          type="button"
          onClick={() => setMethod("cod")}
          className={`relative border rounded-xl shadow-sm p-4 cursor-pointer transition-all duration-200 flex items-start gap-3 ${
            method === "cod"
              ? "border-primary-500 ring-2 ring-primary-500/30 bg-primary-500/5"
              : "border-border hover:border-primary-500/40 bg-white"
          }`}
        >
          {/* Selection Check Icon */}
          {method === "cod" && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center shadow">
              <Check className="w-3 h-3 text-white" />
            </div>
          )}

          <div
            className={`p-2 rounded-full flex-shrink-0 ${
              method === "cod" ? "bg-primary-500" : "bg-gray-100 text-gray-600"
            }`}
          >
            <HandCoins size={20} strokeWidth={1.5} />
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-lg font-semibold mb-1">Cash on Delivery</h4>
            <p className="text-sm">Pay when your order arrives.</p>
          </div>
        </button>
      </div>

      {/* Render selected method */}
      {method === "stripe" && (
        <div className="mt-6 border rounded-xl p-5 bg-white shadow-sm">
          <StripeCustomWrapper addressId={addressId} metadata={metadata} />
        </div>
      )}

      {method === "cod" && (
        <div className="mt-6 space-y-4 bg-white border border-border rounded-xl p-5 shadow-sm">
          <p className="text-sm text-primary-500 leading-relaxed">
            <strong>Note:</strong> Cash on Delivery includes an additional{" "}
            <span className="text-red-600 font-medium">{formattedCodFee}</span>{" "}
            handling charge. Please ensure you have the exact amount ready as
            delivery personnel may not carry change.
          </p>

          <Button
            onClick={handleCODOrder}
            disabled={loading}
            variant="primary"
            className="w-fit"
          >
            {loading ? "Placing Order..." : "Confirm COD Order"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
