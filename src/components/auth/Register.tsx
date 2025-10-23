import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import RegisterForm from "./RegisterForm";

function Register() {
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
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Register Card */}
        <div
          className="bg-white rounded-2xl
         p-4 sm:p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-slate-700 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Join us and start shopping</p>
          </div>

          {/* Register Form */}
          <RegisterForm />

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-700">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-gray-700 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-gray-700 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
