import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api/api";

const GoogleSignIn = () => {
  const { setCredentials } = useAuth();

  const handleSuccess = async (credentialResponse: any) => {
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
        window.location.href = "/"; // or use your router
      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const handleError = () => {
    console.error("Google Sign-In failed");
  };

  return (
    <GoogleOAuthProvider clientId="520738510996-bn1etjonhamv1ft4ki9gdpukn5mdb6pm.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="outline"
        size="large"
        text="signin_with"
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
