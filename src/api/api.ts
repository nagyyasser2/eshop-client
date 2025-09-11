import axios from "axios";

export const API_URL = "https://localhost:7000/api";
export const SERVER_URL = "https://localhost:7000/";

// Token storage keys
const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

// Updated tokenManager with fixed expiration logic
export const tokenManager = {
  getAccessToken: (): string | null => {
    return localStorage.getItem("access_token");
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem("refresh_token");
  },

  setTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  },

  clearTokens: (): void => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  // Fixed decode JWT to check expiration
  isTokenExpired: (token?: string): boolean => {
    const accessToken = token || tokenManager.getAccessToken();
    if (!accessToken) return true;

    try {
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const decoded = JSON.parse(jsonPayload);
      const currentTime = Date.now() / 1000;

      console.log("Token expiration check:", {
        currentTime,
        tokenExp: decoded.exp,
        timeUntilExpiry: decoded.exp - currentTime,
        isExpired: decoded.exp < currentTime,
      });

      // Only consider expired if actually past expiration time
      // Add small buffer (30 seconds) to account for network delays
      return decoded.exp < currentTime + 30;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  },

  // Check if token needs refresh (expires within next 2 minutes)
  shouldRefreshToken: (token?: string): boolean => {
    const accessToken = token || tokenManager.getAccessToken();
    if (!accessToken) return false;

    try {
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const decoded = JSON.parse(jsonPayload);
      const currentTime = Date.now() / 1000;

      // Should refresh if expires within next 2 minutes
      return decoded.exp < currentTime + 120;
    } catch (error) {
      return false;
    }
  },

  refreshToken: async (): Promise<string> => {
    return await refreshAccessToken();
  },
};

// Auth response interface matching your backend
interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    refreshToken: string;
    user: any;
  };
  errors?: string[];
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

// Process queued requests after token refresh
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Refresh token function
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = tokenManager.getRefreshToken();
  const accessToken = tokenManager.getAccessToken();

  if (!refreshToken || !accessToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/auth/refresh-token`,
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
    );

    if (response.data.success && response.data.data) {
      const { token: newAccessToken, refreshToken: newRefreshToken } =
        response.data.data;

      // Update stored tokens
      tokenManager.setTokens(newAccessToken, newRefreshToken);

      return newAccessToken;
    } else {
      throw new Error(response.data.message || "Token refresh failed");
    }
  } catch (error) {
    // Clear tokens on refresh failure
    tokenManager.clearTokens();

    // Emit event for app to handle
    window.dispatchEvent(new CustomEvent("auth:tokenExpired"));

    throw error;
  }
};

// Request interceptor
api.interceptors.request.use(
  async (config: any) => {
    let token = tokenManager.getAccessToken();

    // Check if token should be refreshed (expires soon) but is not expired
    if (
      token &&
      !tokenManager.isTokenExpired(token) &&
      tokenManager.shouldRefreshToken(token)
    ) {
      if (tokenManager.getRefreshToken()) {
        try {
          console.log("Proactively refreshing token...");
          token = await refreshAccessToken();
        } catch (error) {
          console.warn("Proactive token refresh failed:", error);
          // Don't throw here, let the response interceptor handle 401
        }
      }
    }

    if (token && !tokenManager.isTokenExpired(token)) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
// Response interceptor
api.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config as any & {
      _retry?: boolean;
    };

    // Check if error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshAccessToken();
        processQueue(null, newToken);

        // Retry the original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Emit event for app to handle
        window.dispatchEvent(new CustomEvent("auth:tokenExpired"));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle network errors (e.g., API is down)
    if (!error.response && error.request) {
      window.dispatchEvent(new CustomEvent("api:down"));
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// Auth API methods
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    if (response.data.success && response.data.data) {
      const { token, refreshToken } = response.data.data;
      tokenManager.setTokens(token, refreshToken);
    }

    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
  },

  googleLogin: async (credential: string) => {
    const response = await api.post<AuthResponse>("/auth/google-jwt", {
      credential,
    });

    if (response.data.success && response.data.data) {
      const { token, refreshToken } = response.data.data;
      tokenManager.setTokens(token, refreshToken);
    }

    return response.data;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      tokenManager.clearTokens();
    }
  },

  refreshToken: async () => {
    return await refreshAccessToken();
  },
};

// Utility function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = tokenManager.getAccessToken();
  return token !== null && !tokenManager.isTokenExpired(token);
};

// Utility function to get current user info from token
export const getCurrentUser = () => {
  const token = tokenManager.getAccessToken();
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Event listeners for token expiration
export const setupAuthEventListeners = (onTokenExpired: () => void) => {
  const handleTokenExpired = () => {
    onTokenExpired();
  };

  window.addEventListener("auth:tokenExpired", handleTokenExpired);

  return () => {
    window.removeEventListener("auth:tokenExpired", handleTokenExpired);
  };
};

export default api;
