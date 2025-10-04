import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import EmptyCart from "./EmptyCart";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { useCart } from "../../context/CartContext";
import type { ShippingInfo, PaymentInfo } from "../../types/cart.types";
import { ShoppingCart } from "lucide-react";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotals,
    createOrder,
  } = useCart();
  const [removingItems, setRemovingItems] = useState(new Set<number>());
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const selectedPaymentMethod = "cod";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Calculate totals using cart context
  const shippingAmount = 0;
  const discountAmount = 0;
  const taxRate = 0.1; // 10% tax
  const totals = calculateTotals(shippingAmount, discountAmount);

  const itemCount = cart.reduce((sum, item) => sum + item.Quantity, 0);

  const handleRemoveItem = async (itemId: number) => {
    setRemovingItems((prev) => new Set([...prev, itemId]));
    removeFromCart(itemId);
    setRemovingItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handlePlaceOrder = () => {
    setIsOrderModalOpen(true);
  };

  const handleConfirmOrder = async () => {
    setIsPlacingOrder(true);

    // Prepare shipping info (in real app, this would come from a form)
    const shippingInfo: ShippingInfo = {
      ShippingFirstName: "John",
      ShippingLastName: "Doe",
      ShippingAddress: "123 Main St",
      ShippingCity: "Anytown",
      ShippingState: "CA",
      ShippingZipCode: "12345",
      ShippingCountry: "USA",
      ShippingPhone: "123-456-7890",
    };

    // Prepare payment info
    const paymentInfo: PaymentInfo = {
      PaymentMethod: selectedPaymentMethod,
      TransactionId: undefined,
      ShippingAmount: shippingAmount,
      DiscountAmount: discountAmount,
      TaxRate: taxRate,
    };

    try {
      await createOrder(shippingInfo, paymentInfo, "");

      // Close modal
      setIsOrderModalOpen(false);

      // Invalidate userOrders query to refetch orders
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });

      // Navigate to success page
      navigate("/order-success", {
        state: {
          total: totals.TotalAmount,
          itemCount,
          paymentMethod: selectedPaymentMethod,
        },
      });
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-white py-4 px-0">
      <div className="container mx-auto p-4 ">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Cart
          </h1>
          {cart.length > 0 && (
            <span className="text-xs bg-purple-100 text-purple-800 py-1 rounded-full">
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left section: Cart items */}
          <div className="lg:col-span-2 space-y-6">
            <CartItems
              cart={cart}
              clearCart={clearCart}
              handleQuantityChange={handleQuantityChange}
              handleRemoveItem={handleRemoveItem}
              removingItems={removingItems}
            />
          </div>

          {/* Right section: Summary + Actions */}
          <div className="lg:col-span-1 space-y-6">
            <OrderSummary
              subtotal={totals.SubTotal}
              total={totals.TotalAmount}
              itemCount={cart.length}
            />

            <div className="space-y-3">
              <Link
                to={"/checkout"}
                className={`w-full block text-center bg-gradient-to-r from-purple-600 to-pink-400 
              text-white font-bold py-4 px-6 rounded-xl shadow-md 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              transition-all
              ${
                isPlacingOrder
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:from-purple-700 hover:to-pink-500 transform hover:scale-[1.02]"
              }`}
              >
                {isPlacingOrder ? "Processing..." : "Proceed to Checkout"}
              </Link>

              <Link
                to="/products"
                className="w-full block text-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
