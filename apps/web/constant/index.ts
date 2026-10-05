const rawApiBaseUrl = process.env.API_INTERNAL_URL?.trim();
export const API_BASE_URL = rawApiBaseUrl || "http://localhost:8000/api";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://studyabroadconsultancybd.com";

export const DEFAULT_QUERY = {
  page: 1,
  limit: 10,
  search: "",
};
