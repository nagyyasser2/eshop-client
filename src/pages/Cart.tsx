import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EmptyCart from "../components/cart/EmptyCart";
import CartItems from "../components/cart/CartItems";
import OrderSummary from "../components/cart/OrderSummary";
import OrderConfirmationModal from "../components/cart/OrderConfirmationModal";
import { useCart } from "../context/CartContext";
import { placeOrder, type CreateOrderDto } from "../api/orders";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [removingItems, setRemovingItems] = useState(new Set());
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const selectedPaymentMethod = "cod";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // React Query mutation for placing order
  const placeOrderMutation = useMutation({
    mutationFn: (order: CreateOrderDto) => placeOrder(order),
    onSuccess: (data) => {
      clearCart();
      setIsOrderModalOpen(false);
      // Invalidate userOrders query to refetch orders
      queryClient.invalidateQueries({ queryKey: ["userOrders"] });
      // Navigate based on payment method

      navigate("/order-success", {
        state: {
          orderNumber: data.orderNumber,
          total,
          itemCount,
          paymentMethod: selectedPaymentMethod,
        },
      });
    },
    onError: (error) => {
      console.error("Failed to place order:", error);
      // Optionally show error to user (e.g., via toast notification)
      alert("Failed to place order. Please try again.");
    },
  });

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

  const handleConfirmOrder = () => {
    const order: CreateOrderDto = {
      orderItems: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
        productName: item.name,
        productSKU: item.sku,
        productVariantId: item.variantId || null,
      })),
      shippingFirstName: "John",
      shippingLastName: "Doe",
      shippingAddress: "123 Main St",
      shippingCity: "Anytown",
      shippingState: "CA",
      shippingZipCode: "12345",
      shippingCountry: "USA",
      shippingPhone: "123-456-7890",
      paymentMethodId: 2,
      shippingAmount: 0,
      discountAmount: 0,
      notes: "",
    };

    setIsOrderModalOpen(false);
    placeOrderMutation.mutate(order);
  };

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left section: Cart items */}
          <CartItems
            cart={cart}
            clearCart={clearCart}
            handleQuantityChange={handleQuantityChange}
            handleRemoveItem={handleRemoveItem}
            removingItems={removingItems}
          />

          {/* Right section: Summary + Actions */}
          <div className="space-y-6">
            <OrderSummary subtotal={subtotal} total={total} />

            <div>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placeOrderMutation.isPending}
                className={`w-full block cursor-pointer text-center bg-gradient-to-r from-green-500 to-emerald-600 
                text-white font-semibold py-4 px-6 rounded-2xl
                focus:outline-none 
                focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                ${
                  placeOrderMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {placeOrderMutation.isPending
                  ? "Placing Order..."
                  : "Place Order"}{" "}
                {/* ← Always "Place Order" */}
              </button>
              <Link
                to="/products"
                className="w-full block text-center mt-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <OrderConfirmationModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onConfirm={handleConfirmOrder}
        orderTotal={total}
        itemCount={itemCount}
        paymentMethod={selectedPaymentMethod}
        isLoading={placeOrderMutation.isPaused}
      />
    </div>
  );
}

export default Cart;
