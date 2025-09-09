import { formatCurrency } from "../../utils/formatCurrency";
import { CreditCard, Truck, X } from "lucide-react";

const OrderConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  orderTotal,
  itemCount,
  paymentMethod = "card",
  isLoading,
}: any) => {
  if (!isOpen) return null;

  const PaymentIcon = paymentMethod === "card" ? CreditCard : Truck;
  const paymentText =
    paymentMethod === "card" ? "Pay with Card" : "Cash on Delivery";

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-5000 transition-all duration-50 ${
        isOpen
          ? "opacity-100 pointer-events-auto backdrop-blur-sm"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Blur overlay (clickable to close) */}
      <div
        className="absolute inset-0  bg-opacity-30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container */}
      <div
        className={`relative bg-white rounded-xl p-4 sm:p-6 w-full max-w-md sm:max-w-lg mx-4 shadow-2xl transform transition-all duration-50 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Confirm Your Order
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Items ({itemCount})</span>
                <span className="font-semibold">
                  {formatCurrency(orderTotal)}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(orderTotal)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <PaymentIcon className="text-blue-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">{paymentText}</p>
                <p className="text-sm text-gray-600">
                  {paymentMethod === "card"
                    ? "You will be redirected to payment processing"
                    : "Pay when your order is delivered"}
                </p>
              </div>
            </div>

            {/* Confirmation Message */}
            <p className="text-gray-600 text-center">
              Are you sure you want to place this order?
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 
            rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading} // disable button while loading
            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 
    text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 
    transform transition-all duration-200 cursor-pointer"
          >
            {isLoading
              ? "Placing Order..."
              : paymentMethod === "card"
              ? "Proceed to Payment"
              : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
