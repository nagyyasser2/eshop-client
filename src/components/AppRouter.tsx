import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./layout/Navbar";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Footer from "./layout/Footer";
import NotFound from "./common/NotFound";
import Loading from "./common/Loading";
import HomeLayout from "./layout/HomeLayout";
import PaymentFailed from "./payment/PaymentFailed";
import PaymentSuccess from "./payment/PaymentSuccess";
import Support from "./pages/Support";
import api from "../api/api";
import { useApiStatus } from "../context/ApiStatusContext";
import ApiDown from "./layout/ApiDown";
import { useAuth } from "../context/AuthContext";
import Orders from "./orders/Orders";
import ProductDetails from "./products/ProductDetails";
import Checkout from "./checkout/Checkout";
import ProtectCheckout from "./checkout/ProtectCheckout";
import CheckoutSuccess from "./checkout/CheckoutSuccess";
import OrderSuccess from "./checkout/OrderSuccess";
import LoadingProductsPage from "./products/LoadingProductsPage";

const Products = lazy(() => import("./products/Products"));

const checkApiHealth = async () => {
  const response: any = await api.get("/utils/health");
  return response.data.status === "healthy";
};

function AppRouter() {
  const { isApiHealthy, setApiHealthy } = useApiStatus();
  const { loading: authLoading } = useAuth();

  const { isLoading: isHealthLoading } = useQuery({
    queryKey: ["apiHealth"],
    queryFn: async () => {
      const isHealthy = await checkApiHealth();
      setApiHealthy(isHealthy);
      return isHealthy;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  if (authLoading) {
    return <Loading />;
  }

  if (isHealthLoading) {
    return <Loading />;
  }

  if (!isApiHealthy) {
    return <ApiDown />;
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-grow bg-gradient-to-br from-indigo-50 to-purple-50">
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route
            path="/products"
            element={
              <Suspense fallback={<LoadingProductsPage />}>
                <Products />
              </Suspense>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectCheckout>
                <Checkout />
              </ProtectCheckout>
            }
          />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppRouter;
