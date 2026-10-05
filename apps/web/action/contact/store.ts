import { create } from "zustand";
import type { ContactFormValues, ContactActionResult } from "./types";

// ─── State shape ──────────────────────────────────────────────────────────────

interface ContactState {
  /** Current form field values */
  values: ContactFormValues;

  /** Per-field validation errors (client or server) */
  fieldErrors: Partial<Record<keyof ContactFormValues, string>>;

  /** Submission lifecycle */
  isSubmitting: boolean;

  /** Result of the last submission attempt */
  submitResult: { type: "success" | "error"; message: string } | null;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

interface ContactActions {
  setField: (field: keyof ContactFormValues, value: string) => void;
  setFieldError: (field: keyof ContactFormValues, error: string) => void;
  clearFieldError: (field: keyof ContactFormValues) => void;
  setFieldErrors: (errors: Partial<Record<keyof ContactFormValues, string>>) => void;
  setSubmitting: (submitting: boolean) => void;
  setSubmitResult: (result: ContactState["submitResult"]) => void;
  resetForm: () => void;
  applyActionResult: (result: ContactActionResult) => void;
}

// ─── Initial values ───────────────────────────────────────────────────────────

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  cgpa: "",
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useContactStore = create<ContactState & ContactActions>((set) => ({
  // State
  values: { ...initialValues },
  fieldErrors: {},
  isSubmitting: false,
  submitResult: null,

  // Actions
  setField: (field, value) =>
    set((s) => ({ values: { ...s.values, [field]: value } })),

  setFieldError: (field, error) =>
    set((s) => ({ fieldErrors: { ...s.fieldErrors, [field]: error } })),

  clearFieldError: (field) =>
    set((s) => {
      const next = { ...s.fieldErrors };
      delete next[field];
      return { fieldErrors: next };
    }),

  setFieldErrors: (errors) => set({ fieldErrors: errors }),

  setSubmitting: (isSubmitting) => set({ isSubmitting }),

  setSubmitResult: (submitResult) => set({ submitResult }),

  resetForm: () =>
    set({ values: { ...initialValues }, fieldErrors: {}, submitResult: null }),

  /** Applies a server action result to the store in one step */
  applyActionResult: (result) =>
    set({
      isSubmitting: false,
      fieldErrors: result.errors ?? {},
      submitResult: {
        type: result.success ? "success" : "error",
        message: result.message,
      },
    }),
}));
