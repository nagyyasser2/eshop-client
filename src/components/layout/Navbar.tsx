import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaCog,
  FaHeart,
  FaJediOrder,
  FaSearch,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Search from "../utils/Search";

function Navbar() {
  const { cart } = useCart();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleSearchVisibility = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleLogout = () => {
    logout();
    clearCart();
    setIsUserDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }

      // Close search if clicking outside on mobile
      if (
        isSearchVisible &&
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        // Only close if we're on a small screen
        if (window.innerWidth < 768) {
          // setIsSearchVisible(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchVisible]);

  return (
    <nav className="backdrop-blur-md bg-white/70 p-4 pb-2 sticky top-0 z-10 text-slate-700  blur-[0.1px]">
      <div className="container mx-auto">
        <div
          className="flex justify-between items-center border border-gray-50 rounded-2xl px-2 py-1"
          style={{ boxShadow: "0 0 3px rgba(0, 0, 0, 0.2)" }}
        >
          <Link to="/" className="text-xl font-bold z-10">
            <img src="/logo.svg" alt="E-Shop Logo" className="h-15" />
          </Link>

          {/* Desktop Search - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <Search />
          </div>

          <div className="flex items-center space-x-1">
            {/* Mobile Search Toggle Button */}
            <button
              onClick={toggleSearchVisibility}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900"
            >
              <FaSearch className="h-5 w-5" />
            </button>

            <Link to="/cart" className="relative">
              <img src="/cart.svg" alt="Cart" className="h-12" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fc72ea] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[1.25rem]">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            <div className="flex items-center space-x-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center space-x-3 px-4 py-2 hover:from-purple-100 hover:to-pink-100 rounded-xl hover:border-purple-300 transition-all duration-200  group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-9 h-9 sm:h-10 sm:w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                        <FaUser className=" text-white" />
                      </div>
                    </div>
                    <FaChevronDown
                      className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 transition-all duration-200 ${
                      isUserDropdownOpen
                        ? "opacity-100 visible transform translate-y-0"
                        : "opacity-0 invisible transform -translate-y-2"
                    }`}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
                          <FaUser className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-slate-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/orders"
                        className="flex items-center space-x-3 px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <FaJediOrder className="h-4 w-4" />
                        <span>Orders</span>
                      </Link>
                      <Link
                        to="/support"
                        className="flex items-center space-x-3 px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <FaHeart className="h-4 w-4" />
                        <span>Support</span>
                      </Link>

                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-2 text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <FaCog className="h-4 w-4" />
                        <span>Account Settings</span>
                      </Link>
                      <div className="border-t border-gray-100 my-2"></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                      >
                        <FaSignOutAlt className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
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

        {/* Mobile Search - appears below navbar when toggled */}
        <div
          ref={searchRef}
          className={`md:hidden  transition-all duration-300 ease-in-out ${
            isSearchVisible
              ? "opacity-100 max-h-20"
              : "opacity-0 max-h-0 overflow-hidden"
          }`}
        >
          <Search onSearchSubmit={() => setIsSearchVisible(false)} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
