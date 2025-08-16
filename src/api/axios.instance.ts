// src/lib/axiosInstance.ts
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4009", // your FastAPI server port
  withCredentials: true,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error(
      `[Response Error] ${error.response?.status} - ${error.config?.url}`,
    );
    return Promise.reject(error);
  },
);

export default axiosInstance;
