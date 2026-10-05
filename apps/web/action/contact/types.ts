// ─── Request ─────────────────────────────────────────────────────────────────

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  cgpa: string;
}

// ─── Response ────────────────────────────────────────────────────────────────

export interface ContactRecord extends ContactFormValues {
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// ─── Server Action return shape ───────────────────────────────────────────────

export interface ContactActionResult {
  success: boolean;
  message: string;
  data?: ContactRecord;
  errors?: Partial<Record<keyof ContactFormValues, string>>;
}
