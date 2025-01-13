import axios from "axios";
import router from "@/router";

let isRefreshing = false;

let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((promise) => {
    if (token) {
      promise.resolve(token);
    } else {
      promise.reject(error);
    }
  });
  failedQueue = [];
}

function isRefreshTokenError(error) {
  return (
    error?.response &&
    error.config &&
    error.config.url &&
    error.config.url.endsWith("/refreshToken")
  );
}

function handleRefreshTokenFailure(error) {
  processQueue(error, null);
  isRefreshing = false;

  localStorage.clear();

  router.push({ name: "login" });
}

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isRefreshTokenError(error)) {
      handleRefreshTokenFailure(error);
      return Promise.reject(error);
    }

    const { response: { status, data } = {}, config: originalRequest } = error;

    if (status === 401 && data?.message === "TOKEN EXPIRED") {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const { data: refreshData } = await api.post("/refreshToken", {
            refreshToken,
          });

          localStorage.setItem("token", refreshData.token);
          localStorage.setItem("refreshToken", refreshData.refreshToken);

          processQueue(null, refreshData.token);

          isRefreshing = false;

          originalRequest.headers.Authorization = `Bearer ${refreshData.token}`;
          return api(originalRequest);
        } catch (refreshError) {
          handleRefreshTokenFailure(refreshError);
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = "Bearer " + token;
        return api(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);

export default api;
