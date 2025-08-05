import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";
import AppRouter from "./components/AppRouter";

function App() {
  return (
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
  );
}

export default App;
