import { useState } from "react";
import { ProgressSteps } from "./ProgressSteps";
import { ShippingForm } from "./ShippingForm";
import { PaymentForm } from "./PaymentForm";
import { OrderSummary } from "./OrderSummary";
import { useCart } from "../../context/CartContext";

interface CheckoutFormProps {
  onSubmit: () => void;
}

type PaymentMethod = "card" | "paypal" | "apple-pay" | "cod";

function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const { cart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("card");

  const [shippingData, setShippingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 15.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const codFee = 2.99;

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Format card number with spaces
    if (e.target.name === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      if (value.length > 19) value = value.substring(0, 19);
    }

    // Format expiry date
    if (e.target.name === "expiryDate") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
      if (value.length > 5) value = value.substring(0, 5);
    }

    // Format CVV
    if (e.target.name === "cvv") {
      value = value.replace(/\D/g, "");
      if (value.length > 4) value = value.substring(0, 4);
    }

    setPaymentData({ ...paymentData, [e.target.name]: value });
  };

  const validateShipping = () => {
    return Object.entries(shippingData).every(
      ([key, value]) => key === "phone" || value.trim() !== ""
    );
  };

  const validatePayment = () => {
    if (selectedPaymentMethod !== "card") return true;
    return (
      paymentData.cardNumber.replace(/\s/g, "").length >= 13 &&
      paymentData.expiryDate.length === 5 &&
      paymentData.cvv.length >= 3 &&
      paymentData.cardName.trim() !== ""
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 1 && validateShipping()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validatePayment()) {
      onSubmit();
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Main Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <ProgressSteps currentStep={currentStep} />

          <form onSubmit={handleSubmit}>
            {currentStep === 1 ? (
              <ShippingForm
                shippingData={shippingData}
                onShippingChange={handleShippingChange}
                onSubmit={handleSubmit}
              />
            ) : (
              <PaymentForm
                selectedPaymentMethod={selectedPaymentMethod}
                setSelectedPaymentMethod={setSelectedPaymentMethod}
                paymentData={paymentData}
                onPaymentChange={handlePaymentChange}
                onSubmit={handleSubmit}
                onBack={() => setCurrentStep(1)}
                total={total}
              />
            )}
          </form>
        </div>

        {/* Order Summary */}
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
          codFee={codFee}
          selectedPaymentMethod={selectedPaymentMethod}
        />
      </div>
    </div>
  );
}

export default CheckoutForm;
