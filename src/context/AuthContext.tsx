import { createContext, useContext, useEffect, useState } from "react";
import {
  tokenManager,
  getCurrentUser,
  setupAuthEventListeners,
} from "../api/api";
import type { User } from "../api/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  setCredentials: (credentials: {
    token: string;
    refreshToken: string;
    user: User;
  }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

// Helper function to safely map JWT token to User object
const mapTokenToUser = (tokenUser: any): User | null => {
  if (!tokenUser || !tokenUser.email) {
    return null;
  }

  try {
    return {
      id: tokenUser.sub || tokenUser.id || tokenUser.nameid || "",
      email: tokenUser.email || "",
      firstName:
        tokenUser.firstName ||
        tokenUser.given_name ||
        tokenUser.first_name ||
        "",
      lastName:
        tokenUser.lastName ||
        tokenUser.family_name ||
        tokenUser.last_name ||
        "",
      roles: (() => {
        // Handle various role claim formats
        const roleValue = tokenUser.role || tokenUser.roles;
        if (Array.isArray(roleValue)) return roleValue;
        if (typeof roleValue === "string") return [roleValue];
        return [];
      })(),
      dateOfBirth: tokenUser.dateOfBirth || tokenUser.date_of_birth,
      profilePictureUrl:
        tokenUser.profilePictureUrl ||
        tokenUser.picture ||
        tokenUser.profile_picture_url,
      address: tokenUser.address,
      city: tokenUser.city,
      state: tokenUser.state,
      zipCode: tokenUser.zipCode || tokenUser.zip_code,
      country: tokenUser.country,
    };
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Restore user session on app load
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const accessToken = tokenManager.getAccessToken();
        const refreshToken = tokenManager.getRefreshToken();

        if (!accessToken || !refreshToken) {
          return;
        }

        const isExpired = tokenManager.isTokenExpired(accessToken);

        if (isExpired) {
          try {
            await tokenManager.refreshToken();
          } catch (refreshError) {
            tokenManager.clearTokens();
            setError("Session expired. Please login again.");
            return;
          }
        }

        // Get user from token (whether original or refreshed)
        const tokenUser = getCurrentUser();

        if (tokenUser) {
          const userData = mapTokenToUser(tokenUser);
          if (userData) {
            setUser(userData);
          } else {
            tokenManager.clearTokens();
            setError("Invalid session data. Please login again.");
          }
        } else {
          tokenManager.clearTokens();
          setError("Invalid session. Please login again.");
        }
      } catch (error) {
        tokenManager.clearTokens();
        setError("Failed to restore session. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Set up auth event listeners
  useEffect(() => {
    const cleanup = setupAuthEventListeners(() => {
      setUser(null);
      setLoading(false);
      setError("Session expired. Please login again.");
    });

    return cleanup;
  }, []);

  const setCredentials = async (credentials: {
    token: string;
    refreshToken: string;
    user: User;
  }) => {
    try {
      tokenManager.setTokens(credentials.token, credentials.refreshToken);
      setUser(credentials.user);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Failed to save login information");
    }
  };

  const logout = () => {
    tokenManager.clearTokens();
    setUser(null);
    setError(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    setCredentials,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
