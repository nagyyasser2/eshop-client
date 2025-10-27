import { Mail, User } from "lucide-react";
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
    <div className="px-4 py-8 container mx-auto">
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        {/* User Information */}
        <div className="w-full bg-white rounded-lg py-3 sm:px-6 mb-3 ">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-slate-600" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-semibold text-slate-800">
                {user.FirstName} {user.LastName}
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <p className="text-slate-600">{user.Email || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="w-full bg-white rounded-lg p-4 ">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/change-password"
              className="flex-1 text-center  border bg-slate-600 hover:bg-slate-700 px-4 py-2 text-white rounded-lg transition-colors"
            >
              Change Password
            </Link>

            <button className="flex-1 text-center border bg-slate-600 hover:bg-slate-700 px-4 py-2 text-white rounded-lg transition-colors">
              Delete Account
            </button>

            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex-1 text-center bg-slate-600 border hover:bg-slate-700 px-4 py-2 text-white rounded-lg transition-colors"
            >
              Log Out
            </button>
          </div>
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
