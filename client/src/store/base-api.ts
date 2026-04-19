import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/axios/axiosBaseQuery";
import { getBaseUrl } from "@/lib/config/envConfig";

type TagType = "Search";

// Defines the shared RTK Query API slice used by all Quran endpoints.
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  tagTypes: ["Search"] as TagType[],
  endpoints: () => ({}),
});
