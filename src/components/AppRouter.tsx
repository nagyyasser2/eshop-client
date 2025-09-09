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

const ProductsPage = lazy(() => import("../pages/ProductsPage"));

function AppRouter() {
  const { isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 0,
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route
            path="/products"
            element={
              <Suspense fallback={<Loading />}>
                <ProductsPage />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppRouter;
