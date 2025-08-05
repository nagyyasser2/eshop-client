import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./Navbar";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Footer from "./Footer";
import NotFound from "./NotFound";
import Loading from "./Loading";
import { getBanners } from "../api/banners";
import HomeLayout from "./HomeLayout";
import OrderTracking from "../pages/OrderTracking";

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
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default AppRouter;
