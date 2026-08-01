import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./useAuth";

import Swal from "sweetalert2";

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  console.warn("VITE_API_URL is undefined; falling back to http://localhost:5000");
}

let isAlertShowing = false;

const axiosSecure = axios.create({
  baseURL: apiUrl || "http://localhost:5000"
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Request Interceptor - Adds the token to every request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor - Handles Unauthorized errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("accessToken");
          await logout();
          navigate("/login");
        } else if (error.message === "Network Error" || (error.response && error.response.status >= 500)) {
          if (!isAlertShowing) {
            isAlertShowing = true;
            Swal.fire({
              icon: "error",
              title: "Connection Error",
              text: "Unable to connect to the server. Please try again later.",
            }).then(() => {
              isAlertShowing = false;
            });
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to remove interceptors when component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, logout]);

  return axiosSecure;
};

export default useAxiosSecure;
