import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosError } from "axios";
import type {
  AxiosBaseQueryArgs,
  AxiosBaseQueryError,
  AxiosBaseQueryOptions,
} from "@/types/axios";
import { apiClient } from "./axiosInstance";

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
