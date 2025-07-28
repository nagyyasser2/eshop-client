import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RegisterForm from "../components/RegisterForm";

function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <RegisterForm />
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
