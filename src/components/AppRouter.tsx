import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./layout/Navbar";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Footer from "./layout/Footer";
import NotFound from "./common/NotFound";
import Loading from "./common/Loading";
import { getBanners } from "../api/banners";
import HomeLayout from "./layout/HomeLayout";
import OrderTracking from "../pages/OrderTracking";
import OrderSuccess from "./cart/OrderSuccess";
import PaymentFailed from "./payment/PaymentFailed";
import PaymentSuccess from "./payment/PaymentSuccess";
import Support from "../pages/Support";
import api from "../api/api";
import { useApiStatus } from "../context/ApiStatusContext";
import ApiDown from "./layout/ApiDown";
import ProfileSettings from "./auth/ProfileSettings";
import { useAuth } from "../context/AuthContext";

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
    retry: 1, // Retry once on failure
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true, // Refetch on network reconnect
    refetchOnMount: true,
  });

  const { isLoading: isBannersLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });

  if (authLoading) {
    return <Loading />;
  }

  if (isHealthLoading || isBannersLoading) {
    return <Loading />;
  }

  if (!isApiHealthy) {
    return <ApiDown />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow ">
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route
            path="/products"
            element={
              <Suspense fallback={<Loading />}>
                <Products />
              </Suspense>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppRouter;
