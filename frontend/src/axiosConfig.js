import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASEURL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error);
      toast.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }

    // Handle specific error codes
    const status = error.response.status;
    
    if (status === 401) {
      // Unauthorized - redirect to login
      console.error("Unauthorized access");
    } else if (status === 403) {
      console.error("Forbidden access");
    } else if (status === 404) {
      console.error("Resource not found");
    } else if (status >= 500) {
      console.error("Server error:", error.response.data);
      toast.error("Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default instance;
