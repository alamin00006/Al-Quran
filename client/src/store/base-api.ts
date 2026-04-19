import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/axios/axiosBaseQuery";
import type { TagType } from "@/types/api";

// Defines the shared RTK Query API slice used by all Quran endpoints.
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Search"] as TagType[],
  endpoints: () => ({}),
});
