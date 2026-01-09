import { apiPrivate } from "./api";

/**
 * Request → adiciona token
 */
apiPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("@token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Response → logout automático em 401
 */
apiPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@token");
      localStorage.removeItem("@user");

      // força reload para cair no login
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);
