import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ApiStatusProvider } from "./context/ApiStatusContext";
import Loading from "./components/common/Loading";
import ScrollToTop from "./components/layout/ScrollToTop";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <ApiStatusProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<Loading />}>
              <AppRouter />
            </Suspense>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ApiStatusProvider>
  );
}

export default App;
