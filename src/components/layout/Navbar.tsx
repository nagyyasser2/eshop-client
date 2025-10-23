import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSignOutAlt, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { User } from "lucide-react";
import logoSvg from "../../assets/logo.svg";
import NavbarCartButton from "./NavbarCartButton";

function Navbar() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const location = useLocation();
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
      <div className="container mx-auto p-4 pl-0 pr-0 pb-2">
        <div className="flex justify-between items-center  px-2 py-1 mx-2 backdrop-blur-md ">
          <div className="flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-slate-700"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-7 w-7" />
              ) : (
                <FaBars className="h-7 w-7" />
              )}
            </button>

            <Link to="/">
              <img src={logoSvg} alt="Logo" width={130} />
            </Link>
          </div>
          {/* Center Navigation Links - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-semibold transition-colors duration-200 ${
                isActivePath("/")
                  ? "text-blue-600 "
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/bags"
              className={`font-semibold transition-colors duration-200 ${
                isActivePath("/bags")
                  ? "text-blue-600 "
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Bags
            </Link>
            <Link
              to="/orders"
              className={`font-semibold transition-colors duration-200 ${
                isActivePath("/orders")
                  ? "text-blue-600 "
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              My Orders
            </Link>
          </div>

          {/* Right Side - Search, Cart, User */}
          <div className="flex items-center space-x-0">
            {/* Cart */}
            <NavbarCartButton />

            {/* User Menu */}
            <div className="flex items-center">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center space-x-0 px-4 py-2 pl-2 hover:from-slate-100 hover:to-slate-100 rounded-xl hover:border-slate-300 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-9 h-9">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="w-8"
                        >
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                      </div>
                    </div>
                    <FaChevronDown
                      className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-40 bg-white  rounded-md border border-gray-200 py-0 z-50 transition-all duration-200 ${
                      isUserDropdownOpen
                        ? "opacity-100 visible transform translate-y-0"
                        : "opacity-0 invisible transform -translate-y-2"
                    }`}
                  >
                    <div className="">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-slate-700 rounded-t-2xl hover:text-slate-700 transition-colors duration-200"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                      <div className="border-t border-gray-100 "></div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full cursor-pointer  rounded-b-2xl px-4 py-3 text-slate-700 hover:text-slate-700 transition-colors duration-200"
                      >
                        <FaSignOutAlt className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <div className="flex items-center space-x-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200"
                    >
                      Join Us?
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden mt-2 bg-white rounded-xl border border-gray-200  overflow-hidden transition-all duration-300 ease-in-out ${
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
                  ? "text-slate-600 bg-slate-50"
                  : "text-slate-700 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>
            <Link
              to="/bags"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 font-medium transition-colors duration-200 ${
                isActivePath("/bags")
                  ? "text-slate-600 bg-slate-50"
                  : "text-slate-700 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              Bags
            </Link>
            <Link
              to="/orders"
              onClick={closeMobileMenu}
              className={`block px-4 py-3 font-medium transition-colors duration-200 ${
                isActivePath("/orders")
                  ? "text-slate-600 bg-slate-50"
                  : "text-slate-700 hover:text-slate-600 hover:bg-slate-50"
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
