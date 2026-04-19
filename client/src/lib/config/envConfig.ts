// Resolves the public backend API base URL used by browser requests.
export const getBaseUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
