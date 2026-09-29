"use client";

import config from "@/config";
import axios from "axios";

const api = axios.create({
  baseURL: config.apiUrl,
});

api.interceptors.request.use(
  (requestConfig) => {
    if (typeof window !== "undefined") {
      const authToken = localStorage.getItem("authToken");

      if (authToken) {
        requestConfig.headers.Authorization = `Bearer ${authToken}`;
      }
    }

    return requestConfig;
  },
  (error) => Promise.reject(error)
);

export default api;