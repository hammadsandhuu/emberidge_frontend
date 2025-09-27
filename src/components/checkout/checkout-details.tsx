"use client";

import { useState } from "react";
import Heading from "@/components/shared/heading";
import ShippingAddress from "./shipping-address";
import PaymentMethod from "@/components/checkout/payment-method";
import { MapPinHouse, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";

// Checkout step type
type CheckoutStep = "shipping" | "payment";

const CheckoutDetails: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<CheckoutStep>("shipping");
  const [formData, setFormData] = useState({
    shipping: null,
    payment: null,
  });

  // Shipping step complete → go to payment
  const handleShippingComplete = (data: any) => {
    setFormData((prev) => ({ ...prev, shipping: data }));
    setActiveStep("payment");
  };
  // Payment step complete → redirect to order
  const handlePaymentComplete = (data: any) => {
    setFormData((prev) => ({ ...prev, payment: data }));
    console.log("Order completed!", { ...formData, payment: data });
    router.push(ROUTES.ORDER as any);
  };

  // Step data
  const steps = [
    {
      id: 1,
      icon: <MapPinHouse strokeWidth={1} size={28} />,
      title: "Shipping Address",
      sub: "Where should we deliver your order? Select a saved address or add a new one.",
      component: <ShippingAddress onComplete={handleShippingComplete} />,
      key: "shipping" as CheckoutStep,
    },
    {
      id: 2,
      icon: <CreditCard strokeWidth={1} size={28} />,
      title: "Payment Method",
      sub: "Choose your payment method",
      component: <PaymentMethod onComplete={handlePaymentComplete} />,
      key: "payment" as CheckoutStep,
    },
  ];

  return (
    <div className="overflow-hidden space-y-6">
      {steps.map((step) => (
        <div
          key={step.id}
          className="accordion__panel expanded overflow-hidden rounded-md border border-border-base"
        >
          <div className="bg-white flex items-center p-4  cursor-pointer sm:pt-5 sm:px-6 pb-7">
            <span className="flex  justify-center h-9 w-9 text-brand-dark ltr:mr-5 rtl:ml-5">
              {step?.icon}
            </span>
            <div>
              <Heading variant={"checkoutHeading"}>{step?.title}</Heading>
              <div className="font-medium  text-sm text-brand-dark">
                {step?.sub}
              </div>
            </div>
            {formData[step.key] && (
              <button
                onClick={() => formData[step.key] && setActiveStep(step.key)}
                className="py-2 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-200  mt-5 sm:mt-0 sm:ms-auto text-sm  rounded-lg"
              >
                Change
              </button>
            )}
          </div>

          {activeStep === step.key && (
            <div className="pb-6 ltr:pl-5 rtl:pr-5 sm:ltr:pl-5 sm:rtl:pr-5 lg:ltr:pl-7 lg:rtl:pr-7  ltr:pr-7 rtl:pl-5 bg-white">
              <div className="border-t border-border-two pt-7">
                {step.component}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutDetails;
