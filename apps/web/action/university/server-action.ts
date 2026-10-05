"use server";

import { serverApi } from "@/config/fetch-request";
import { API_PATHS } from "@/constant/api-path";
import type { ApiUniversity } from "./types";

/**
 * Fetch all active universities from the backend.
 * Runs server-side only — backend URL is never exposed to the browser.
 */
export async function fetchPublicUniversities(): Promise<ApiUniversity[]> {
  try {
    const result = await serverApi.get<ApiUniversity[]>(
      API_PATHS.universities.public
    );

    if (result.success && result.data) {
      return result.data;
    }

    console.error("Failed to fetch universities:", result.error);
    return [];
  } catch (err) {
    console.error("Error fetching universities:", err);
    return [];
  }
}

/**
 * Fetch a single university by its ID.
 * Returns null if not found.
 */
export async function fetchUniversityById(
  id: string
): Promise<ApiUniversity | null> {
  try {
    const result = await serverApi.get<ApiUniversity>(
      API_PATHS.universities.getById(id)
    );

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch {
    return null;
  }
}
