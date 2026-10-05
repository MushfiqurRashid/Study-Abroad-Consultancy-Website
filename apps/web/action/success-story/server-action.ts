"use server";

import { serverApi } from "@/config/fetch-request";
import { API_PATHS } from "@/constant/api-path";
import type { ApiSuccessStory } from "./types";

/**
 * Fetch all active success stories from the backend.
 * Runs server-side only — backend URL is never exposed to the browser.
 */
export async function fetchPublicSuccessStories(): Promise<ApiSuccessStory[]> {
  try {
    const result = await serverApi.get<ApiSuccessStory[]>(
      API_PATHS.successStories.public
    );

    if (result.success && result.data) {
      return result.data;
    }

    console.error("Failed to fetch success stories:", result.error);
    return [];
  } catch (err) {
    console.error("Error fetching success stories:", err);
    return [];
  }
}
