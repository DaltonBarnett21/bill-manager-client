import { getAccessToken, getAuthActions } from "@/stores/authstore";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { refreshExpiredAccessToken } from "./api-requests";
import Router from "next/router";
import { getUserActions } from "@/stores/userstore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { clearAuthStore } = getAuthActions();
    const { setUser } = getUserActions();
    const prevRequest = error.config;
    if (error?.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await refreshExpiredAccessToken();
          const newAccessToken = getAccessToken();

          prevRequest.headers = {
            ...prevRequest.headers,
            Authorization: newAccessToken,
          };

          return axiosInstance(prevRequest);
        } catch (refreshError) {
          clearAuthStore();
          setUser({ email: undefined, name: undefined });
          Router.push("/login");
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

interface IFetcher extends AxiosRequestConfig {
  contentType?: string;
}

export const fetcher = async <T>({ method, url, data }: IFetcher): Promise<T> => {
  const response = await axiosInstance({
    method,
    url,
    data,
  });
  return response.data;
};
