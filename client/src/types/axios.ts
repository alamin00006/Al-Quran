import type { AxiosRequestConfig } from "axios";

export type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
};

export type AxiosBaseQueryOptions = {
  baseUrl?: string;
};

export type AxiosBaseQueryError = {
  status?: number;
  data: unknown;
};
