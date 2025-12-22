import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "https://ticket-bari-a11.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [user?.accessToken]);

  return instance;
};

export default useAxiosSecure;
