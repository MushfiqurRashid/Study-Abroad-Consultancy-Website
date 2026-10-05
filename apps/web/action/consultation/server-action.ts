"use server";

import * as Yup from "yup";
import { serverApi } from "@/config/fetch-request";
import { API_PATHS } from "@/constant/api-path";
import type {
  ConsultationActionResult,
  ConsultationFormValues,
} from "./types";



const consultationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .required("Full name is required"),

  email: Yup.string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email address is required"),

  phone: Yup.string()
    .trim()
    .required("Phone number is required")
    .matches(
      /^\+[1-9]\d{6,14}$/,
      "Phone must be in international format e.g. +8801306890908"
    ),
});

// ─── Server Action ────────────────────────────────────────────────────────────

export async function submitConsultationForm(
  payload: ConsultationFormValues
): Promise<ConsultationActionResult> {
  // 1. Validate input server-side with Yup
  try {
    await consultationSchema.validate(payload, { abortEarly: false });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const errors: Partial<Record<keyof ConsultationFormValues, string>> = {};
      err.inner.forEach((e) => {
        if (e.path)
          errors[e.path as keyof ConsultationFormValues] = e.message;
      });
      return { success: false, message: "Validation failed", errors };
    }
    return { success: false, message: "Unexpected validation error" };
  }

  // 2. Forward to backend — backend URL is NEVER visible to the browser
  const result = await serverApi.post(
    API_PATHS.consultations.create,
    payload
  );

  if (result.success) {
    return {
      success: true,
      message:
        "Your consultation has been booked! We\u2019ll get back to you shortly.",
      data: result.data,
    };
  }

  // 3. Surface meaningful backend errors
  return {
    success: false,
    message: result.error ?? "Failed to book consultation. Please try again.",
  };
}
