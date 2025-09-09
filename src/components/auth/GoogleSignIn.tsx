import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../api/api";

const GoogleSignIn = () => {
  const { setCredentials } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
      // Send the Google JWT token to your backend
      const response: any = await axios.post(
        `${API_URL}/auth/google-jwt`,
        {
          credential: credentialResponse.credential,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Use the response data to set credentials
        const { token, user } = response.data.data;

        // Store the JWT token and user info using your auth context
        setCredentials({
          token: token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            profilePictureUrl: user.profilePictureUrl,
            roles: user.roles,
          },
        });

        console.log("Login successful:", response.data);
        navigate("/", { replace: true });
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    console.error("Google Sign-In failed");
    setIsLoading(false);
  };

  return (
    <GoogleOAuthProvider clientId="520738510996-bn1etjonhamv1ft4ki9gdpukn5mdb6pm.apps.googleusercontent.com">
      <div className="relative">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          theme="outline"
          size="large"
          text="signin_with"
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded">
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
