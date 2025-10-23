import { X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { SERVER_URL } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function CartPopup() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    calculateTotals,
    isCartPopupOpen,
    setIsCartPopupOpen,
  } = useCart();
  const navigate = useNavigate();

  if (!isCartPopupOpen) return null;

  const totals = calculateTotals();

  const handleCheckout = () => {
    setIsCartPopupOpen(false);
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full sm:w-96 bg-white  shadow-xl p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between  pb-3 mb-4">
          <h2 className="text-lg font-semibold text-slate-700">My Cart</h2>
          <button
            onClick={() => setIsCartPopupOpen(false)}
            className="text-slate-500 hover:text-slate-700 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items */}
        <div className="flex flex-col overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-slate-500 mt-10">Cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.ProductId}
                className="flex items-center justify-between rounded-lg p-2 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={SERVER_URL + item.ImagePath}
                    alt={item.ProductName}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {item.ProductName}
                    </p>
                    <p className="text-xs text-slate-500">
                      ${item.UnitPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-1">
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 text-slate-600 hover:text-slate-900"
                      onClick={() =>
                        updateQuantity(item.ProductId, item.Quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-2 text-slate-700">{item.Quantity}</span>
                    <button
                      className="px-2 py-1 text-slate-600 hover:text-slate-900"
                      onClick={() =>
                        updateQuantity(item.ProductId, item.Quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.ProductId)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 pt-3 mt-4 text-sm text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totals.SubTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${totals.TaxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-slate-800">
              <span>Total:</span>
              <span>${totals.TotalAmount.toFixed(2)}</span>
            </div>

            <button
              className="w-full mt-4 bg-slate-600 hover:bg-slate-700 text-white py-2 rounded-lg transition-colors cursor-pointer"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
