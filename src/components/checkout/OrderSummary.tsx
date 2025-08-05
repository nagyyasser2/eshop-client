import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { formatCurrency } from "../../utils/formatCurrency";
import { SERVER_URL } from "../../api/api";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderSummaryProps {
  cart: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  codFee?: number;
  selectedPaymentMethod: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  cart,
  subtotal,
  shipping,
  tax,
  total,
  codFee = 0,
  selectedPaymentMethod,
}) => {
  const finalTotal = selectedPaymentMethod === "cod" ? total + codFee : total;

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 h-fit">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <img
              src={SERVER_URL + item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.name}</h4>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <span className="font-semibold text-gray-900">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
            {shipping === 0 ? "FREE" : formatCurrency(shipping)}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        {selectedPaymentMethod === "cod" && codFee > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>COD Fee</span>
            <span>{formatCurrency(codFee)}</span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(finalTotal)}</span>
          </div>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-xl">
          <div className="flex items-center gap-2 text-green-700">
            <FaShippingFast />
            <span className="font-medium">
              Free shipping on orders over $100!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
