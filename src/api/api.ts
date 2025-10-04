import axios from "axios";
import { apiStoreService } from "../persist/api.store.service";
import type { AuthResponse } from "../types/auth.types";

export const API_URL = "https://localhost:7000/api";
export const SERVER_URL = "https://localhost:7000/";

// Updated tokenManager with fixed expiration logic
export const tokenManager = {
  getAccessToken: (): string | null => apiStoreService.getAccessToken(),
  getRefreshToken: (): string | null => apiStoreService.getRefreshToken(),

  setTokens: (accessToken: string, refreshToken: string): void => {
    apiStoreService.setTokens(accessToken, refreshToken);
  },

  clearTokens: (): void => {
    apiStoreService.clearTokens();
  },

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
      return decoded.exp < currentTime + 30; // 30s buffer
    } catch {
      return true;
    }
  },

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
      return decoded.exp < currentTime + 120; // refresh if within 2 min
    } catch {
      return false;
    }
  },

  refreshToken: async (): Promise<string> => {
    return await refreshAccessToken();
  },
};

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

    if (response.data && response.data) {
      const { Token: newAccessToken, RefreshToken: newRefreshToken } =
        response.data;

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
          token = await refreshAccessToken();
        } catch (error) {
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
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", {
      Email: email,
      Password: password,
    });

    if (response.data.Success && response.data.Data) {
      const { Token, RefreshToken } = response.data.Data;
      tokenManager.setTokens(Token, RefreshToken);
    }

    return response.data;
  },

  register: async (userData: any) => {
    const response = await api.post<AuthResponse>("/auth/register", userData);
    return response.data;
  },

  googleLogin: async (credential: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/google-jwt", {
      credential,
    });

    if (response.data.Success && response.data.Data) {
      const { Token, RefreshToken } = response.data.Data;
      tokenManager.setTokens(Token, RefreshToken);
    }

    return response.data;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
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
