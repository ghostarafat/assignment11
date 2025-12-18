import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOutFunc, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      //  REQUEST INTERCEPTOR (ALWAYS GET FRESH TOKEN)
      const requestInterceptor = axiosInstance.interceptors.request.use(
        async (config) => {
          const token = await user.getIdToken(true);
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        }
      );

      //  RESPONSE INTERCEPTOR
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        async (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            await logOutFunc();
            navigate("/login");
          }
          return Promise.reject(err);
        }
      );

      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading, logOutFunc, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
