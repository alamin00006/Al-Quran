import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError, AxiosRequestConfig } from "axios";
import { apiClient } from "./axiosInstance";

type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

type AxiosBaseQueryOptions = {
  baseUrl?: string;
};

type AxiosBaseQueryError = {
  status?: number;
  data: unknown;
};

// Adapts Axios requests to RTK Query's base query contract.
export const axiosBaseQuery =
  ({ baseUrl }: AxiosBaseQueryOptions = {}): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    AxiosBaseQueryError
  > =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      // Forwards the RTK Query request through Axios.
      const result = await apiClient({
        url,
        baseURL: baseUrl,
        method,
        data,
        params,
        headers,
      });

      return { data: result.data };
    } catch (axiosError) {
      // Adapts Axios errors to RTK Query's expected shape.
      const error = axiosError as AxiosError;

      return {
        error: {
          status: error.response?.status,
          data: error.response?.data ?? error.message,
        },
      };
    }
  };
