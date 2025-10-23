import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Mail, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { forgetPassword } from "../../api/auth";
import { Link } from "react-router-dom";
import type { ForgotPasswordRequest } from "../../types/auth.types";

export default function ForgotPassword() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      if (data.Success) {
        setIsSuccess(true);
      }
    },
  });

  const onSubmit = (data: ForgotPasswordRequest) => {
    setEmail(data.email);
    mutation.mutate(data);
  };

  if (isSuccess) {
    return (
      <div className="flex items-center justify-center my-8 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl  p-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to
              <span className="block font-semibold text-gray-900 mt-2">
                {email}
              </span>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                If you don't see the email, check your spam folder or try again.
              </p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center my-8 px-4 text-slate-600">
      <div className="max-w-md w-full bg-white rounded-2xl  p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold  mb-2">Forgot Password?</h1>
          <p className="text-gray-600">
            No worries, we'll send you reset instructions
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Enter your email"
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {mutation.isError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                {mutation.error?.message ||
                  "Something went wrong. Please try again."}
              </p>
            </div>
          )}

          {mutation.data && !mutation.data.Success && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                {mutation.data.Message || "Failed to send reset email"}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
