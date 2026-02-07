import { apiPrivate } from "./api";

apiPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("@token");

  if (token) {
    config.headers?.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

apiPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@token");
      localStorage.removeItem("@user");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);
