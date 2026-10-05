"use server";

/**
 * Contact Server Action
 *
 * Runs EXCLUSIVELY on the server \u2014 Next.js guarantees that.
 * The real backend URL (e.g. localhost:3001) is resolved here,
 * inside the Node.js process, and is NEVER sent to the browser.
 *
 * From the browser's perspective the request just goes to the
 * Next.js app origin (localhost:3000 / your production domain).
 */

import * as Yup from "yup";
import { serverApi } from "@/config/fetch-request";
import { API_PATHS } from "@/constant/api-path";
import type { ContactActionResult, ContactFormValues } from "./types";

// ─── Validation schema (runs server-side) ─────────────────────────────────────

const contactSchema = Yup.object({
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

  subject: Yup.string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be at most 200 characters")
    .required("Subject is required"),

  message: Yup.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be at most 5000 characters")
    .required("Message is required"),

  cgpa: Yup.string()
    .trim()
    .max(10, "CGPA must be at most 10 characters")
    .optional(),
});

// ─── Server Action ────────────────────────────────────────────────────────────

export async function submitContactForm(
  payload: ContactFormValues
): Promise<ContactActionResult> {
  // 1. Validate input server-side with Yup
  try {
    await contactSchema.validate(payload, { abortEarly: false });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const errors: Partial<Record<keyof ContactFormValues, string>> = {};
      err.inner.forEach((e) => {
        if (e.path) errors[e.path as keyof ContactFormValues] = e.message;
      });
      return { success: false, message: "Validation failed", errors };
    }
    return { success: false, message: "Unexpected validation error" };
  }

  // 2. Forward to backend — backend URL is NEVER visible to the browser
  const result = await serverApi.post(API_PATHS.contacts.create, payload);

  if (result.success) {
    return {
      success: true,
      message: "Your message has been sent! We\u2019ll get back to you shortly.",
      data: result.data,
    };
  }

  // 3. Surface meaningful backend errors
  return {
    success: false,
    message: result.error ?? "Failed to send message. Please try again.",
  };
}
