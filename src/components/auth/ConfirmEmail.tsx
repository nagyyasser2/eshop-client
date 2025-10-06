import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmEmail } from "../../api/auth";

type ConfirmEmailPayload = {
  userId: string;
  token: string;
};

export default function ConfirmEmail() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isStarting, setIsStarting] = useState<boolean>(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const mutation = useMutation<void, Error, ConfirmEmailPayload>({
    mutationFn: confirmEmail,
    onError: (error) => setErrorMessage(error.message),
  });

  useEffect(() => {
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    if (!userId || !token) {
      setErrorMessage(
        "Invalid confirmation link. Missing required parameters."
      );
      setIsStarting(false);
      return;
    }

    // Show spinner immediately, call after 2 seconds
    const timeout = setTimeout(() => {
      mutation.mutate({ userId, token });
      setIsStarting(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const handleGoToLogin = () => navigate("/login");

  const isLoading = isStarting || mutation.isPending;

  return (
    <div className="flex items-center justify-center p-4 py-10">
      <div className="rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          {/* Loading State */}
          {isLoading && (
            <>
              <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Confirming Your Email
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {/* Success State */}
          {!isLoading && mutation.isSuccess && (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Email Confirmed!
              </h2>
              <p className="text-gray-600 mb-4">
                Your email has been successfully verified.
              </p>
              <button
                onClick={handleGoToLogin}
                className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors cursor-pointer"
              >
                Go to Login
              </button>
            </>
          )}

          {/* Error State */}
          {!isLoading && mutation.isError && (
            <>
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Confirmation Failed
              </h2>
              <p className="text-gray-600 mb-4">
                {errorMessage ||
                  mutation.error?.message ||
                  "Unable to confirm your email address."}
              </p>
              <button
                onClick={handleGoToLogin}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Go to Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
