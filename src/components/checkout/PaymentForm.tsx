import React from "react";
import {
  FaCreditCard,
  FaPaypal,
  FaLock,
  FaMoneyBillWave,
} from "react-icons/fa";
import { PaymentMethodButton } from "./PaymentMethodButton";
import { CreditCardForm } from "./CreditCardForm";
import { PaymentMethodDisplay } from "./PaymentMethodDisplay";
import { formatCurrency } from "../../utils/formatCurrency";

type PaymentMethod = "card" | "paypal" | "apple-pay" | "cod";

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface PaymentFormProps {
  selectedPaymentMethod: PaymentMethod;
  setSelectedPaymentMethod: (method: PaymentMethod) => void;
  paymentData: PaymentData;
  onPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  total: number;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  paymentData,
  onPaymentChange,
  onSubmit,
  onBack,
  total,
}) => {
  const getButtonText = () => {
    switch (selectedPaymentMethod) {
      case "cod":
        return `Place COD Order - ${formatCurrency(total + 2.99)}`;
      case "paypal":
        return `Pay with PayPal - ${formatCurrency(total)}`;
      case "apple-pay":
        return `Pay with Apple Pay - ${formatCurrency(total)}`;
      default:
        return `Complete Order - ${formatCurrency(total)}`;
    }
  };

  const getButtonColor = () => {
    switch (selectedPaymentMethod) {
      case "cod":
        return "from-orange-500 to-amber-600";
      case "paypal":
        return "from-blue-500 to-blue-600";
      case "apple-pay":
        return "from-gray-800 to-black";
      default:
        return "from-green-500 to-emerald-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaCreditCard className="text-blue-500 text-xl" />
          <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          ← Back
        </button>
      </div>

      {/* Payment Method Selection */}
      <div className="flex flex-center gap-3 mb-6">
        <PaymentMethodButton
          method="card"
          icon={<FaCreditCard className="text-lg" />}
          label="Credit Card"
          selectedMethod={selectedPaymentMethod}
          onSelect={setSelectedPaymentMethod}
        />
        {/* <PaymentMethodButton
          method="paypal"
          icon={<FaPaypal className="text-lg" />}
          label="PayPal"
          selectedMethod={selectedPaymentMethod}
          onSelect={setSelectedPaymentMethod}
        />
        <PaymentMethodButton
          method="apple-pay"
          icon={<div className="w-5 h-5 bg-black rounded"></div>}
          label="Apple Pay"
          selectedMethod={selectedPaymentMethod}
          onSelect={setSelectedPaymentMethod}
        /> */}
        <PaymentMethodButton
          method="cod"
          icon={<FaMoneyBillWave className="text-lg" />}
          label="Cash on Delivery"
          selectedMethod={selectedPaymentMethod}
          onSelect={setSelectedPaymentMethod}
        />
      </div>

      {/* Payment Method Content */}
      {selectedPaymentMethod === "card" ? (
        <CreditCardForm
          paymentData={paymentData}
          onPaymentChange={onPaymentChange}
        />
      ) : (
        <PaymentMethodDisplay method={selectedPaymentMethod} />
      )}

      {/* Security Notice */}
      <div className="bg-gray-50 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaLock className="text-green-500" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={onSubmit}
        className={`w-full bg-gradient-to-r ${getButtonColor()} text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2`}
      >
        <FaLock />
        {getButtonText()}
      </button>
    </div>
  );
};
