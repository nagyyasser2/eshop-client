import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth"; // Updated import

function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth(); // Using the new hook
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          E-Shop
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="flex items-center">
            <span>Cart ({itemCount})</span>
          </Link>
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
