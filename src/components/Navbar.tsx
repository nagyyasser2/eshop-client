import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import CategoryDropdown from "./CategoryDropdown";
import catalogService from "../api/catalog";
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categoriesTree"],
    queryFn: catalogService.getCategoriesTree,
    refetchOnWindowFocus: false,
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const showCategoryDropdown = location.pathname !== "/";

  return (
    <nav className="text-slate-700 p-4 sticky top-0 z-50 bg-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold z-10">
            <img src="/logo.svg" alt="E-Shop Logo" className="h-12 md:h-15" />
          </Link>

          {showCategoryDropdown && (
            <div className="hidden lg:flex flex-1 justify-center">
              <CategoryDropdown categories={categories} />
            </div>
          )}

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <img src="/cart.svg" alt="Cart" className="h-8 md:h-10" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f093fb] text-white text-xs font-bold rounded-full h-5 w-5 md:h-6 md:w-6 flex items-center justify-center min-w-[1.25rem] md:min-w-[1.5rem]">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>

            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-100">
                    <FaUser className="h-3 w-3 text-purple-600" />
                    <span className="text-sm font-medium text-slate-700">
                      {user.name}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        >
          <div className="pt-4 pb-2 border-t border-gray-200 mt-4">
            {showCategoryDropdown && (
              <div className="mb-4">
                <CategoryDropdown categories={categories} isMobile={true} />
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100 mx-2">
                    <FaUser className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-slate-700">
                      Welcome, {user.name}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 px-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 border-2 border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition-all duration-200 text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-sm font-medium shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
