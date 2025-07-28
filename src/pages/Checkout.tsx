import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CheckoutForm from "../components/CheckoutForm";

function Checkout() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Simulated checkout process
    clearCart();
    navigate("/");
    alert("Order placed successfully!");
  };

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-center">Please log in to proceed with checkout.</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p className="text-center">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <CheckoutForm onSubmit={handleCheckout} />
    </div>
  );
}

export default Checkout;
