// ─── Request ─────────────────────────────────────────────────────────────────

export interface ConsultationFormValues {
  name: string;
  email: string;
  phone: string;
}

// ─── Response ────────────────────────────────────────────────────────────────

export interface ConsultationRecord extends ConsultationFormValues {
  status: "pending" | "contacted" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// ─── Server Action return shape ───────────────────────────────────────────────

export interface ConsultationActionResult {
  success: boolean;
  message: string;
  data?: ConsultationRecord;
  errors?: Partial<Record<keyof ConsultationFormValues, string>>;
}
