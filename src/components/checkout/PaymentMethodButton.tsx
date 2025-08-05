import React from "react";

type PaymentMethod = "card" | "paypal" | "apple-pay" | "cod";

interface PaymentMethodButtonProps {
  method: PaymentMethod;
  icon: React.ReactNode;
  label: string;
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

export const PaymentMethodButton: React.FC<PaymentMethodButtonProps> = ({
  method,
  icon,
  label,
  selectedMethod,
  onSelect,
}) => (
  <button
    type="button"
    onClick={() => onSelect(method)}
    className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${
      selectedMethod === method
        ? "border-blue-500 bg-blue-50 text-blue-700"
        : "border-gray-200 hover:border-gray-300 text-gray-700"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);
