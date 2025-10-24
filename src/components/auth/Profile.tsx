import { Mail, Lock, Trash2, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import ConfirmLogoutModal from "../common/ConfirmLogoutModal";

export default function Profile() {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  if (!user) return <Navigate to="/" replace />;

  const handleConfirmLogout = () => {
    logout();
    clearCart();
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="flex flex-col items-start justify-start px-4">
      <div className="container mx-auto bg-white p-2 text-left">
        <div className="flex items-center flex-wrap gap-2">
          <h1 className="text-lg sm:text-xl font-semibold text-slate-600">
            {user.FirstName} {user.LastName}
          </h1>
          {user.Roles?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {user.Roles.map((role, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-gray-600 text-sm font-medium rounded-full"
                >
                  {role}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-start gap-2 mb-6 text-gray-700">
          <Mail className="w-4 h-4 text-gray-400" />
          <span>{user.Email || "Not provided"}</span>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-400 py-2">
          <Link
            to="/change-password"
            className="flex items-center justify-start gap-2 py-1 text-gray-700"
          >
            <Lock className="w-4 h-4 text-gray-400" />
            <span>Change Password</span>
          </Link>

          <button className="flex items-center justify-start gap-2 py-1 rounded-lg text-slate-700 cursor-pointer">
            <Trash2 className="w-4 h-4 text-gray-400" />
            <span>Delete Account</span>
          </button>

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center justify-start gap-2 py-1 rounded-lg text-slate-700 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-gray-400" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      <ConfirmLogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
