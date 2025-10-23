import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/auth";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import type { ChangePasswordPayload } from "../../types/auth.types";

export default function ChangePassword() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorList, setErrorList] = useState<string[]>([]);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordPayload>();

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (response) => {
      if (!response.Success) {
        setErrorMessage(response.Message || "Password change failed");
        setErrorList(response.Errors || []);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage(response.Message || "Password changed successfully!");
      setErrorMessage("");
      setErrorList([]);
      reset();
    },
    onError: (error: any) => {
      setErrorMessage(error.message || "Failed to change password");
      setErrorList([]);
      setSuccessMessage("");
    },
  });

  const onSubmit = (data: ChangePasswordPayload) => {
    if (data.newPassword !== data.confirmNewPassword) {
      setErrorMessage("New passwords do not match");
      setErrorList([]);
      return;
    }
    setErrorMessage("");
    setErrorList([]);
    changePasswordMutation.mutate(data);
  };

  return (
    <div className="max-w-md mt-10 mb-10 p-6 sm:p-8 mx-4 sm:mx-auto text-slate-600">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Change Password
      </h2>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex flex-col gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{errorMessage}</span>
          </div>
          {errorList.length > 0 && (
            <ul className="list-disc list-inside text-sm mt-1 ml-1">
              {errorList.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="flex items-center gap-2 text-blue-600 bg-green-50 p-3 rounded-lg mb-4">
          <CheckCircle size={20} />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Current Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              {...register("currentPassword", { required: "Required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2  focus:outline-none"
              placeholder="Enter your current password"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showCurrent ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">New Password</label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              {...register("newPassword", {
                required: "Required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2  focus:outline-none"
              placeholder="Enter a new password"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmNewPassword", { required: "Required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 -500 focus:outline-none"
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmNewPassword && (
            <p className="text-sm text-red-600 mt-1">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={changePasswordMutation.isPending}
          className="w-full flex justify-center items-center gap-2 bg-slate-600 text-white py-2.5 rounded-lg hover:bg-slate-700 cursor-pointer transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {changePasswordMutation.isPending ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Changing...
            </>
          ) : (
            <>
              <FaLock size={16} />
              Change Password
            </>
          )}
        </button>
      </form>
    </div>
  );
}
