import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { register as registerUser } from "../../api/auth";
import type { RegisterFormData } from "../../types/auth.types";
import { useApiFormError } from "../../hooks/useApiFormError";

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
    watch,
  } = useForm<RegisterFormData>();

  const watchPassword = watch("password");

  const handleError = useApiFormError<RegisterFormData>(setError);

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await registerUser(
        data.firstName,
        data.lastName,
        data.email,
        data.password,
        data.confirmPassword,
        data.dateOfBirth
      );

      return response;
    },
    onSuccess: (response) => {
      setSuccessMessage(response.Message ?? "Registered successfully!");
      reset();
    },
    onError: handleError,
  });

  const onSubmit = async (data: RegisterFormData) => {
    setSuccessMessage("");
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    clearErrors();
    registerMutation.mutate(data);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, text: "", color: "" };
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    score = Object.values(checks).filter(Boolean).length;
    if (score < 2) return { score, text: "Weak", color: "text-red-500" };
    if (score < 4) return { score, text: "Medium", color: "text-yellow-500" };
    return { score, text: "Strong", color: "text-green-500" };
  };

  const passwordStrength = getPasswordStrength(watchPassword || "");
  const isLoading = registerMutation.isPending;

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        {/* Name Fields */}
        {[
          { id: "firstName", label: "First Name" },
          { id: "lastName", label: "Last Name" },
        ].map(({ id, label }) => (
          <div key={id}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                id={id}
                {...register(id as "firstName" | "lastName", {
                  required: `${label} is required`,
                  minLength: {
                    value: 2,
                    message: `${label} must be at least 2 characters`,
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: `${label} can only contain letters and spaces`,
                  },
                })}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
                  errors[id as keyof RegisterFormData]
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white hover:border-gray-400"
                }`}
                placeholder={`Enter your ${label.toLowerCase()}`}
                disabled={isLoading}
              />
            </div>
            {errors[id as keyof RegisterFormData] && (
              <p className="mt-1 text-sm text-red-600">
                {(errors[id as keyof RegisterFormData]?.message as string) ||
                  ""}
              </p>
            )}
          </div>
        ))}

        {/* Email */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
                errors.email
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="date"
              id="dateOfBirth"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
                errors.dateOfBirth
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
              disabled={isLoading}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Password */}
        {[
          {
            id: "password",
            label: "Password",
            show: showPassword,
            toggle: togglePasswordVisibility,
          },
          {
            id: "confirmPassword",
            label: "Confirm Password",
            show: showConfirmPassword,
            toggle: toggleConfirmPasswordVisibility,
          },
        ].map(({ id, label, show, toggle }) => (
          <div key={id}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type={show ? "text" : "password"}
                id={id}
                {...register(id as "password" | "confirmPassword", {
                  required: `${label} is required`,
                })}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 ${
                  errors[id as keyof RegisterFormData]
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-white hover:border-gray-400"
                }`}
                placeholder={`Enter your ${label.toLowerCase()}`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={toggle}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {show ? (
                  <FaEyeSlash className="h-4 w-4 text-gray-400" />
                ) : (
                  <FaEye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {errors[id as keyof RegisterFormData] && (
              <p className="mt-1 text-sm text-red-600">
                {(errors[id as keyof RegisterFormData]?.message as string) ||
                  ""}
              </p>
            )}
          </div>
        ))}

        {/* Errors / Success */}
        {errors.root && errors.root.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-1">
            {errors.root.message.split("\n").map((msg, i) => (
              <p key={i} className="text-sm text-red-600">
                {msg}
              </p>
            ))}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-slate-700 cursor-pointer transform hover:scale-[1.01] hover:shadow-md"
          }`}
        >
          {registerMutation.isPending ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Creating account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
