import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ApiStatusProvider } from "./context/ApiStatusContext";
import Loading from "./components/common/Loading";
import ScrollToTop from "./components/layout/ScrollToTop";
import AppRouter from "./components/AppRouter";
import { ProductContextProvider } from "./context/ProductContext";

function App() {
  return (
    <ApiStatusProvider>
      <AuthProvider>
        <CartProvider>
          <ProductContextProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Suspense fallback={<Loading />}>
                <AppRouter />
              </Suspense>
            </BrowserRouter>
          </ProductContextProvider>
        </CartProvider>
      </AuthProvider>
    </ApiStatusProvider>
  );
}

export default App;
