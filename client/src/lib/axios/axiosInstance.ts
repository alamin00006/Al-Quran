import axios from "axios";
import { getBaseUrl } from "@/lib/config/envConfig";

// Shared Axios instance for all client-side API calls.
export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});
