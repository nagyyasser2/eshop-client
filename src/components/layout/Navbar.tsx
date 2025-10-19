import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { User } from "lucide-react";

function Navbar() {
  const { cart } = useCart();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const location = useLocation();
  const itemCount = cart.reduce((sum, item) => sum + item.Quantity, 0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    clearCart();
    setIsUserDropdownOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  return (
    <nav className="backdrop-blur-md sticky top-0 z-10 text-slate-700">
      <div className="container mx-auto p-4 pb-2">
        <div className="flex justify-between items-center rounded-4xl px-2 py-1 mx-2 bg-white border border-gray-200">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-1">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-slate-700 hover:text-purple-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="text-xl font-bold z-10 flex-shrink-0">
              {/* Desktop Logo */}
              <img
                src="/logo.svg"
                alt="E-Shop Logo"
                className="hidden sm:block h-14"
              />

              {/* Mobile Logo */}
              <img
                src="/logo-mobile.svg"
                alt="E-Shop"
                className="block sm:hidden h-12"
              />
            </Link>
          </div>

          {/* Center Navigation Links - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors duration-200 ${
                isActivePath("/")
                  ? "text-purple-600"
                  : "text-slate-700 hover:text-purple-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`font-medium transition-colors duration-200 ${
                isActivePath("/products")
                  ? "text-purple-600"
                  : "text-slate-700 hover:text-purple-600"
              }`}
            >
              Products
            </Link>
            <Link
              to="/orders"
              className={`font-medium transition-colors duration-200 ${
                isActivePath("/orders")
                  ? "text-purple-600"
                  : "text-slate-700 hover:text-purple-600"
              }`}
            >
              My Orders
            </Link>
          </div>

          {/* Right Side - Search, Cart, User */}
          <div className="flex items-center space-x-0">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <img src="/cart.svg" alt="Cart" className="h-10" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fc72ea] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[1.25rem]">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="flex items-center">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center space-x-3 px-4 py-2 pl-2 hover:from-purple-100 hover:to-pink-100 rounded-xl hover:border-purple-300 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 sm:h-10 sm:w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                        <FaUser className="text-white" />
                      </div>
                    </div>
                    <FaChevronDown
                      className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-0 z-50 transition-all duration-200 ${
                      isUserDropdownOpen
                        ? "opacity-100 visible transform translate-y-0"
                        : "opacity-0 invisible transform -translate-y-2"
                    }`}
                  >
                    <div className="">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-slate-700 rounded-t-2xl hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <div className="border-t border-gray-100 "></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full cursor-pointer  rounded-b-2xl px-4 py-3 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      >
                        <FaSignOutAlt className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  {/* Desktop View */}
                  <div className="hidden sm:flex items-center space-x-2">
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

                  {/* Mobile View - Icon with Dropdown */}
                  <div className="sm:hidden">
                    <button
                      onClick={toggleUserDropdown}
                      className="flex items-center space-x-2 px-3 py-2 hover:bg-purple-50 rounded-xl transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <FaChevronDown
                        className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                          isUserDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ${
                        isUserDropdownOpen
                          ? "opacity-100 visible transform translate-y-0"
                          : "opacity-0 invisible transform -translate-y-2"
                      }`}
                    >
                      <Link
                        to="/login"
                        className="block px-4 py-3 text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 font-medium"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Login
                      </Link>
                      <div className="border-t border-gray-100"></div>
                      <Link
                        to="/register"
                        className="block px-4 py-3 text-purple-600 hover:bg-purple-50 transition-colors duration-200 font-medium"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden mt-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 max-h-96 visible"
              : "opacity-0 max-h-0 invisible"
          }`}
        >
          <div className="py-2">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 font-medium transition-colors duration-200 ${
                isActivePath("/")
                  ? "text-purple-600 bg-purple-50"
                  : "text-slate-700 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 font-medium transition-colors duration-200 ${
                isActivePath("/products")
                  ? "text-purple-600 bg-purple-50"
                  : "text-slate-700 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              Products
            </Link>
            <Link
              to="/orders"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 font-medium transition-colors duration-200 ${
                isActivePath("/orders")
                  ? "text-purple-600 bg-purple-50"
                  : "text-slate-700 hover:text-purple-600 hover:bg-purple-50"
              }`}
            >
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
