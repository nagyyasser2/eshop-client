import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import LoginForm from "./LoginForm";

function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md">
        <div className="bg-white  p-4 sm:p-8 text-center mb-2">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-slate-700 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          <LoginForm />
          <div className="pt-6 border-t border-gray-100">
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 transition-all duration-200"
              >
                Create one here
              </Link>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              By signing in, you agree to our{" "}
              <Link
                to="/termsOfService"
                className="text-gray-700 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacyPolicy"
                className="text-gray-700 hover:underline"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
