import React from "react";

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface CreditCardFormProps {
  paymentData: PaymentData;
  onPaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CreditCardForm: React.FC<CreditCardFormProps> = ({
  paymentData,
  onPaymentChange,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Card Number *
        </label>
        <input
          type="text"
          name="cardNumber"
          value={paymentData.cardNumber}
          onChange={onPaymentChange}
          placeholder="1234 5678 9012 3456"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expiry Date *
          </label>
          <input
            type="text"
            name="expiryDate"
            value={paymentData.expiryDate}
            onChange={onPaymentChange}
            placeholder="MM/YY"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            CVV *
          </label>
          <input
            type="text"
            name="cvv"
            value={paymentData.cvv}
            onChange={onPaymentChange}
            placeholder="123"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Cardholder Name *
        </label>
        <input
          type="text"
          name="cardName"
          value={paymentData.cardName}
          onChange={onPaymentChange}
          placeholder="John Doe"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>
    </div>
  );
};
