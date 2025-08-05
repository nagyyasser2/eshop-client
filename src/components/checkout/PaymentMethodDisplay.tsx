import React from "react";
import { FaPaypal, FaMoneyBillWave, FaTruck } from "react-icons/fa";

type PaymentMethod = "card" | "paypal" | "apple-pay" | "cod";

interface PaymentMethodDisplayProps {
  method: PaymentMethod;
}

export const PaymentMethodDisplay: React.FC<PaymentMethodDisplayProps> = ({
  method,
}) => {
  switch (method) {
    case "paypal":
      return (
        <div className="text-center py-8">
          <FaPaypal className="text-6xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">
            You will be redirected to PayPal to complete your payment
          </p>
        </div>
      );

    case "apple-pay":
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-black rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded"></div>
          </div>
          <p className="text-gray-600">
            Use Touch ID or Face ID to pay with Apple Pay
          </p>
        </div>
      );

    case "cod":
      return (
        <div className="text-center py-8">
          <FaMoneyBillWave className="text-6xl text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Cash on Delivery
          </h3>
          <p className="text-gray-600 mb-4">
            Pay with cash when your order is delivered to your doorstep
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-left">
            <div className="flex items-start gap-3">
              <FaTruck className="text-yellow-600 text-lg mt-1" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Important Notes:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Please keep the exact amount ready</li>
                  <li>• COD charges: $2.99 additional fee</li>
                  <li>• Available for orders up to $500</li>
                  <li>• Delivery person will provide receipt</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
