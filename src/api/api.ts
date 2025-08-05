import axios from "axios";

export const API_URL = "https://localhost:7000/api";
export const SERVER_URL = "https://localhost:7000/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (e.g., for adding authentication tokens)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (e.g., for handling errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
