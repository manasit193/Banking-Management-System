import axios from "axios";
import { clearAuthStorage, getStoredToken } from "@/lib/auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 && typeof window !== "undefined") {
      clearAuthStorage();

      const isAdminRoute = window.location.pathname.startsWith("/admin");
      const loginPath = isAdminRoute ? "/login?redirect=/admin" : "/login";

      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = loginPath;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
