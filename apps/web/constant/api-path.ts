/**
 * Centralized API path registry.
 * Only paths (no host/port) — the real origin is kept in
 * the server-side constant `API_BASE_URL` and never reaches the browser.
 *
 * Usage:  import { API_PATHS } from "@/constant/api-path";
 */

export const API_PATHS = {
  contacts: {
    /** POST /contacts — create a new contact inquiry */
    create: "/contacts",
  },
  consultations: {
    /** POST /consultations — book a new consultation */
    create: "/consultations",
  },
  universities: {
    /** GET /universities/public — all active universities */
    public: "/universities/public",
    /** GET /universities/:id — single university by id */
    getById: (id: string) => `/universities/${id}`,
  },
  reviews: {
    /** GET /reviews/public — all active reviews */
    public: "/reviews/public",
  },
  successStories: {
    /** GET /success-stories/public — all active success stories */
    public: "/success-stories/public",
  },
} as const;

export type ApiPaths = typeof API_PATHS;
