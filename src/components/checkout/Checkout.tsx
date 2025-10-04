import { Check, CreditCard, MapPin, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AccordionSection from "./AccordionSection";
import CheckoutAddressForm from "./CheckoutAddressForm";
import CheckoutPaymentMethod from "./CheckoutPaymentMethod";
import CheckoutSummary from "./CheckoutSummary";
import { useCheckoutPersistence } from "../../hooks/useCheckoutPersistence";
import type { CheckoutData } from "../../persist/checkout.persist";
import { useCart } from "../../context/CartContext";
import { createCheckoutSession } from "../../api/payment";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, clearCart, createOrder } = useCart();
  const navigate = useNavigate();

  const formMethods = useForm<CheckoutData>({
    defaultValues: {
      ShippingFirstName: "",
      ShippingLastName: "",
      ShippingAddress: "",
      ShippingCity: "",
      ShippingState: "",
      ShippingZipCode: "",
      ShippingCountry: "",
      ShippingPhone: "",
      PaymentMethod: "Credit Card",
      ShippingAmount: 15.0,
      DiscountAmount: 0,
      Notes: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = formMethods;

  const {
    saveActiveSection,
    saveCompletedSections,
    getActiveSection,
    getCompletedSections,
    clearCheckoutData,
    hasSavedData,
  } = useCheckoutPersistence(formMethods);

  const [activeSection, setActiveSection] = useState(() => getActiveSection());
  const [completedSections, setCompletedSections] = useState(() =>
    getCompletedSections()
  );

  useEffect(() => {
    saveActiveSection(activeSection);
  }, [activeSection, saveActiveSection]);

  useEffect(() => {
    saveCompletedSections(completedSections);
  }, [completedSections, saveCompletedSections]);

  const shippingAmount = watch("ShippingAmount") || 0;
  const discountAmount = watch("DiscountAmount") || 0;

  const calculateTotals = () => {
    const subTotal = cart.reduce(
      (sum, item) => sum + item.UnitPrice * item.Quantity,
      0
    );
    const taxAmount = subTotal * 0.1;
    const totalAmount = subTotal + taxAmount + shippingAmount - discountAmount;

    return {
      SubTotal: subTotal,
      TaxAmount: taxAmount,
      ShippingAmount: shippingAmount,
      DiscountAmount: discountAmount,
      TotalAmount: totalAmount,
    };
  };

  const handleSectionToggle = async (section: string) => {
    if (activeSection === section) {
      setActiveSection(null);
      return;
    }

    // Validate current section before moving to next
    if (activeSection === "shipping") {
      const isValid = await trigger([
        "ShippingFirstName",
        "ShippingLastName",
        "ShippingAddress",
        "ShippingCity",
        "ShippingState",
        "ShippingZipCode",
        "ShippingCountry",
        "ShippingPhone",
      ]);
      if (isValid) {
        const newCompletedSections = { ...completedSections, shipping: true };
        setCompletedSections(newCompletedSections);
        setActiveSection(section);
      }
    } else if (activeSection === "payment") {
      const isValid = await trigger(["PaymentMethod"]);
      if (isValid) {
        const newCompletedSections = { ...completedSections, payment: true };
        setCompletedSections(newCompletedSections);
        setActiveSection(section);
      }
    } else {
      setActiveSection(section);
    }
  };

  const { mutate: startCheckout, isPending: startingCheckOutSession } =
    useMutation({
      mutationFn: (orderId: number) => createCheckoutSession(orderId),
      onSuccess: (data) => {
        localStorage.setItem("redirectedToPayment", "true");
        window.location.href = data.Url;
      },
    });

  const onSubmit = async (data: CheckoutData) => {
    setIsProcessing(true);

    try {
      const isOnlinePayment = data.PaymentMethod === "Credit Card";

      const order = await createOrder(
        {
          ShippingFirstName: data.ShippingFirstName,
          ShippingLastName: data.ShippingLastName,
          ShippingAddress: data.ShippingAddress,
          ShippingCity: data.ShippingCity,
          ShippingState: data.ShippingState,
          ShippingZipCode: data.ShippingZipCode,
          ShippingCountry: data.ShippingCountry,
          ShippingPhone: data.ShippingPhone,
        },
        {
          PaymentMethod: data.PaymentMethod,
          ShippingAmount: data.ShippingAmount ?? 0,
          DiscountAmount: data.DiscountAmount ?? 0,
          TaxRate: 0.1,
        },
        data.Notes
      );

      if (isOnlinePayment) {
        startCheckout(order.Id);
      } else {
        navigate("/order-success");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const totals = calculateTotals();

  return (
    <div className=" bg-gradient-to-br from-purple-50 via-pink-50 to-white py-8 px-4">
      <div className="container mx-auto my-2">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Checkout
          </h1>
          {hasSavedData() && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              Auto-saved
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {/* Shipping Address Accordion */}
              <AccordionSection
                title="Shipping Address"
                icon={MapPin}
                isOpen={activeSection === "shipping"}
                onToggle={() => handleSectionToggle("shipping")}
                isComplete={completedSections.shipping}
              >
                <CheckoutAddressForm register={register} errors={errors} />
                <button
                  type="button"
                  onClick={() => handleSectionToggle("payment")}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-400 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium"
                >
                  Continue to Payment
                </button>
              </AccordionSection>

              {/* Payment Method Accordion */}
              <AccordionSection
                title="Payment Method"
                icon={CreditCard}
                isOpen={activeSection === "payment"}
                onToggle={() => handleSectionToggle("payment")}
                isComplete={completedSections.payment}
              >
                <CheckoutPaymentMethod register={register} watch={watch} />
                <button
                  type="button"
                  onClick={() => handleSectionToggle("review")}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-400 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium"
                >
                  Continue to Review
                </button>
              </AccordionSection>

              {/* Review & Place Order Accordion */}
              <AccordionSection
                title="Review & Place Order"
                icon={Check}
                isOpen={activeSection === "review"}
                onToggle={() => handleSectionToggle("review")}
                isComplete={false}
              >
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Please review your order details and click "Place Order" to
                    complete your purchase.
                  </p>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-300 text-white rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-400 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing || startingCheckOutSession ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {isProcessing && "Processing..."}
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        {watch("PaymentMethod") === "Credit Card" ||
                        watch("PaymentMethod") === "PayPal"
                          ? "Proceed to Payment"
                          : "Place Order"}
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </div>
              </AccordionSection>
            </div>

            <div className="lg:col-span-1">
              <CheckoutSummary cart={cart} totals={totals} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
