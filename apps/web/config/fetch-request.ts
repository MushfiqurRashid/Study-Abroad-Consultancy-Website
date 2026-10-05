/**
 * SERVER-SIDE ONLY fetch helper.
 *
 * This module imports API_BASE_URL which has no NEXT_PUBLIC_ prefix,
 * so Next.js will never bundle it into client-side JavaScript.
 * Use this ONLY from Server Actions or Route Handlers.
 *
 * The browser never sees the real backend origin — it only
 * communicates with the Next.js app origin (e.g. localhost:3000).
 */

import { API_BASE_URL } from "@/constant";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  statusCode?: number;
}

/** Parse JSON or fall back to plain text */
async function parseResponse(res: Response): Promise<any> {
  const ct = res.headers.get("content-type");
  return ct?.includes("application/json") ? res.json() : res.text();
}

/** Core request function — runs only on the server */
async function request<T = any>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE",
  body?: unknown,
  token?: string
): Promise<ApiResponse<T>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const primaryBaseUrl = API_BASE_URL.trim() || "http://localhost:8000/api";
    const urlCandidates = [primaryBaseUrl];

    let response: Response | null = null;
    let lastError: unknown = null;
    for (const baseUrl of urlCandidates) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const candidateResponse = await fetch(`${baseUrl}${endpoint}`, {
          method,
          headers,
          body: body !== undefined ? JSON.stringify(body) : undefined,
          // University and admin-managed content must update without a rebuild.
          cache: "no-store",
          signal: controller.signal,
        });
        clearTimeout(timeout);
        // If this candidate looks like a wrong backend target, try next base URL.
        if (!candidateResponse.ok && urlCandidates.length > 1 && (candidateResponse.status === 404 || candidateResponse.status === 502)) {
          response = candidateResponse;
          continue;
        }
        response = candidateResponse;
        break;
      } catch (err) {
        lastError = err;
      }
    }
    if (!response) {
      throw lastError instanceof Error ? lastError : new Error("Network error");
    }

    const data = await parseResponse(response);

    if (response.ok) {
      return { success: true, message: "Request successful", data, statusCode: response.status };
    }

    return {
      success: false,
      message: "Request failed",
      error:
        typeof data === "string"
          ? data
          : Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message ?? "Unknown error",
      statusCode: response.status,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error occurred";
    return { success: false, message: "Network error", error: message };
  }
}

/** Server-side API client */
export const serverApi = {
  get: <T = any>(endpoint: string, token?: string) =>
    request<T>(endpoint, "GET", undefined, token),

  post: <T = any>(endpoint: string, body?: unknown, token?: string) =>
    request<T>(endpoint, "POST", body, token),

  patch: <T = any>(endpoint: string, body?: unknown, token?: string) =>
    request<T>(endpoint, "PATCH", body, token),

  delete: <T = any>(endpoint: string, token?: string) =>
    request<T>(endpoint, "DELETE", undefined, token),
};

export default serverApi;
