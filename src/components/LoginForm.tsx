import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaGoogle,
} from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { login, loginWithGoogle } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import GoogleSignIn from "./GoogleSignIn";

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormData>();

  const { setCredentials } = useAuth();

  // Regular login mutation
  const loginMutation = useMutation({
    onMutate: () => {
      clearErrors("root");
    },
    mutationFn: async (data: LoginFormData) => {
      return await login(data.email, data.password);
    },
    onSuccess: ({ data }: any) => {
      console.log("Login successful:", data);
      setCredentials({ user: data.user, token: data.token });
    },
    onError: (error: any) => {
      setError("root", {
        type: "manual",
        message:
          error.message || "Invalid email or password. Please try again.",
      });
    },
    gcTime: 0,
    retry: false,
  });

  // Google login mutation
  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      return await loginWithGoogle();
    },
    onSuccess: (data) => {
      console.log("Google login successful:", data);
    },
    onError: (error: any) => {
      setError("root", {
        type: "manual",
        message: error.message || "Google login failed. Please try again.",
      });
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearErrors();
    loginMutation.mutate(data);
  };

  const handleGoogleLogin = () => {
    clearErrors();
    googleLoginMutation.mutate();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isLoading = loginMutation.isPending || googleLoginMutation.isPending;

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Email Address
          </label>
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
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
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

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                errors.password
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <FaEyeSlash className="h-4 w-4 text-gray-400" />
              ) : (
                <FaEye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Global Error */}
        {errors.root && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{errors.root.message}</p>
          </div>
        )}

        {/* Forgot Password Link */}
        <div className="text-right">
          <a
            href="/forgot-password"
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Forgot your password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-lg transform hover:-translate-y-0.5"
          }`}
        >
          {loginMutation.isPending ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <GoogleSignIn />
      {/* Google Login Button */}
      {/* <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className={`w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white transition-all duration-200 flex items-center justify-center space-x-2 ${
          isLoading
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transform hover:-translate-y-0.5"
        }`}
      >
        {googleLoginMutation.isPending ? (
          <>
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            <span>Signing in with Google...</span>
          </>
        ) : (
          <>
            <FaGoogle className="h-4 w-4 text-red-500" />
            <span>Continue with Google</span>
          </>
        )}
      </button> */}
    </div>
  );
}

export default LoginForm;
