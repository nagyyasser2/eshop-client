import { Mail, Lock, Trash2, LogOut, User, Shield } from "lucide-react";
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
      <h1 className="text-xl font-semibold text-slate-700 mb-8">My Profile</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Information Card */}
        <div className="bg-white rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Personal Information
              </h2>
              <p className="text-sm text-slate-500">Your account details</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Full Name
              </label>
              <p className="text-slate-800 font-medium mt-1">
                {user.FirstName} {user.LastName}
              </p>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Email Address
              </label>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4 text-slate-400" />
                <p className="text-slate-800">{user.Email || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Card */}
        <div className="bg-white rounded-lg ">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Account Roles
              </h2>
              <p className="text-sm text-slate-500">Your access permissions</p>
            </div>
          </div>

          <div className="space-y-2">
            {user.Roles?.length > 0 ? (
              user.Roles.map((role, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-slate-700 rounded-lg  -blue-100"
                >
                  {role}
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No roles assigned</p>
            )}
          </div>
        </div>

        {/* Account Actions Card */}
        <div className="bg-white rounded-lg   md:col-span-2">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Account Actions
          </h2>

          <div className="flex flex-col gap-2 ">
            <Link
              to="/change-password"
              className="flex  items-center justify-start gap-2 py-4 text-slate-700  rounded-lg   transition-colors"
            >
              <Lock className="w-6 h-6 text-slate-500" />
              <span className="font-medium">Change Password</span>
            </Link>

            <button className="flex  items-center justify-start gap-2 py-4 text-slate-700  rounded-lg   transition-colors">
              <Trash2 className="w-6 h-6 text-slate-500" />
              <span className="font-medium">Delete Account</span>
            </button>

            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex  items-center justify-start gap-2 py-4 text-slate-700  rounded-lg   transition-colors"
            >
              <LogOut className="w-6 h-6 text-slate-600" />
              <span className="font-medium">Log Out</span>
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
