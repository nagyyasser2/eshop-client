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
import Checkout from "./checkout/Checkout";
import ProtectCheckout from "./checkout/ProtectCheckout";
import CheckoutSuccess from "./checkout/CheckoutSuccess";
import OrderSuccess from "./checkout/OrderSuccess";
import LoadingProductsPage from "./products/LoadingProductsPage";
import PrivacyPolicy from "./auth/PrivacyPolicy";
import TermsOfService from "./auth/TermsOfService";
import ConfirmEmail from "./auth/ConfirmEmail";
import ChangePassword from "./auth/ChangePassword";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import Profile from "./auth/Profile";
import ProtectRoutes from "./auth/ProtectedRoutes";
import CartPopup from "./common/CartPopup";
import { Announce } from "./products/Promotion";
import ProductImagesPreview from "./common/ProductImagesPreview";
import ProductDetails from "./products/ProductDetails";
import ProductSingleImagePreview from "./common/ProductSingleImagePreview";

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
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  if (authLoading || isHealthLoading) return <Loading />;
  if (!isApiHealthy) return <ApiDown />;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Announce />
      <Navbar />

      {/* main takes all remaining space */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route
            path="/bags"
            element={
              <Suspense fallback={<LoadingProductsPage />}>
                <Products />
              </Suspense>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/bag/:id" element={<ProductDetails />} />
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
          <Route path="/confirmEmail" element={<ConfirmEmail />} />
          <Route
            path="/change-password"
            element={
              <ProtectRoutes>
                <ChangePassword />
              </ProtectRoutes>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/termsOfService" element={<TermsOfService />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ProductImagesPreview />
      <ProductSingleImagePreview />
      <CartPopup />
    </div>
  );
}

export default AppRouter;
