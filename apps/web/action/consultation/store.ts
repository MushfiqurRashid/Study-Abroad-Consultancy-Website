import { create } from "zustand";
import type {
  ConsultationFormValues,
  ConsultationActionResult,
} from "./types";

// ─── State shape ──────────────────────────────────────────────────────────────

interface ConsultationState {
  /** Current form field values */
  values: ConsultationFormValues;

  /** Per-field validation errors (client or server) */
  fieldErrors: Partial<Record<keyof ConsultationFormValues, string>>;

  /** Submission lifecycle */
  isSubmitting: boolean;

  /** Result of the last submission attempt */
  submitResult: { type: "success" | "error"; message: string } | null;
}

// ─── Actions ──────────────────────────────────────────────────────────────────

interface ConsultationActions {
  setField: (field: keyof ConsultationFormValues, value: string) => void;
  setFieldError: (
    field: keyof ConsultationFormValues,
    error: string
  ) => void;
  clearFieldError: (field: keyof ConsultationFormValues) => void;
  setFieldErrors: (
    errors: Partial<Record<keyof ConsultationFormValues, string>>
  ) => void;
  setSubmitting: (submitting: boolean) => void;
  setSubmitResult: (result: ConsultationState["submitResult"]) => void;
  resetForm: () => void;
  applyActionResult: (result: ConsultationActionResult) => void;
}

// ─── Initial values ───────────────────────────────────────────────────────────

const initialValues: ConsultationFormValues = {
  name: "",
  email: "",
  phone: "",
};

// ─── Store ────────────────────────────────────────────────────────────────────

export const useConsultationStore = create<
  ConsultationState & ConsultationActions
>((set) => ({
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
    set({
      values: { ...initialValues },
      fieldErrors: {},
      submitResult: null,
    }),

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
