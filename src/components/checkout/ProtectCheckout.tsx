import type { ReactNode } from "react";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { Navigate, useNavigate } from "react-router-dom";

interface ProtectCheckoutProps {
  children: ReactNode;
}

export default function ProtectCheckout({ children }: ProtectCheckoutProps) {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectedToPayment = localStorage.getItem("redirectedToPayment");

    if (redirectedToPayment === "true") {
      localStorage.removeItem("redirectedToPayment");
      clearCart();
      navigate("/orders", { replace: true });
    }
  }, [clearCart, navigate]);

  if (!cart || cart.length === 0) {
    return <Navigate to="/orders" replace />;
  }

  return children;
}
