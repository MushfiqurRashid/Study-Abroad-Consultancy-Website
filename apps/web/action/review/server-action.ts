"use server";

import { serverApi } from "@/config/fetch-request";
import { API_PATHS } from "@/constant/api-path";
import type { ApiReview } from "./types";

/**
 * Fetch all active reviews from the backend.
 * Runs server-side only — backend URL is never exposed to the browser.
 */
export async function fetchPublicReviews(): Promise<ApiReview[]> {
  try {
    const result = await serverApi.get<ApiReview[]>(API_PATHS.reviews.public);

    if (result.success && result.data) {
      return result.data;
    }

    console.error("Failed to fetch reviews:", result.error);
    return [];
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return [];
  }
}
