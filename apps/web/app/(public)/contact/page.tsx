"use client";

import * as Yup from "yup";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useContactStore } from "@/action/contact/store";
import { submitContactForm } from "@/action/contact/server-action";
import type { ContactFormValues } from "@/action/contact/types";

// ─── Client-side validation schema ───────────────────────────────────────────
// Mirrors the server schema so the user sees errors before a round-trip.

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

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const {
    values,
    fieldErrors,
    isSubmitting,
    setField,
    setFieldError,
    clearFieldError,
    setFieldErrors,
    setSubmitting,
    resetForm,
  } = useContactStore();

  // Validate a single field on blur
  async function validateField(field: keyof ContactFormValues, value: string) {
    try {
      await contactSchema.validateAt(field, { ...values, [field]: value });
      clearFieldError(field);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setFieldError(field, err.message);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Full client-side validation first
    try {
      await contactSchema.validate(values, { abortEarly: false });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors: Partial<Record<keyof ContactFormValues, string>> = {};
        err.inner.forEach((e) => {
          if (e.path) errors[e.path as keyof ContactFormValues] = e.message;
        });
        setFieldErrors(errors);
        return;
      }
    }

    setSubmitting(true);

    // Call the server action — browser never sees the backend URL
    const result = await submitContactForm(values);

    if (result.success) {
      toast.success(result.message);
      resetForm();
    } else {
      // Surface per-field server errors if present
      if (result.errors && Object.keys(result.errors).length > 0) {
        setFieldErrors(result.errors);
      }
      toast.error(result.message);
    }
    setSubmitting(false);
  }

  return (
    <div className="py-12 md:py-24">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Have questions about studying abroad or overseas employment opportunities? Our team is
            here to help you every step of the way. Send us a message or visit
            our office.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* ── Contact Form ─────────────────────────────────────────── */}
          <Card>
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Send us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name + Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={values.name}
                      onChange={(e) => setField("name", e.target.value)}
                      onBlur={(e) => validateField("name", e.target.value)}
                      aria-invalid={!!fieldErrors.name}
                    />
                    {fieldErrors.name && (
                      <p className="text-xs text-destructive">{fieldErrors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+8801306890908"
                      type="tel"
                      value={values.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      onBlur={(e) => validateField("phone", e.target.value)}
                      aria-invalid={!!fieldErrors.phone}
                    />
                    {fieldErrors.phone && (
                      <p className="text-xs text-destructive">{fieldErrors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    type="email"
                    value={values.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={(e) => validateField("email", e.target.value)}
                    aria-invalid={!!fieldErrors.email}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-destructive">{fieldErrors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Inquiry about UK Universities"
                    value={values.subject}
                    onChange={(e) => setField("subject", e.target.value)}
                    onBlur={(e) => validateField("subject", e.target.value)}
                    aria-invalid={!!fieldErrors.subject}
                  />
                  {fieldErrors.subject && (
                    <p className="text-xs text-destructive">{fieldErrors.subject}</p>
                  )}
                </div>

                {/* CGPA */}
                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input
                    id="cgpa"
                    placeholder="e.g. 3.75"
                    value={values.cgpa}
                    onChange={(e) => setField("cgpa", e.target.value)}
                    onBlur={(e) => validateField("cgpa", e.target.value)}
                    aria-invalid={!!fieldErrors.cgpa}
                  />
                  {fieldErrors.cgpa && (
                    <p className="text-xs text-destructive">{fieldErrors.cgpa}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your study plans..."
                    className="min-h-[150px]"
                    value={values.message}
                    onChange={(e) => setField("message", e.target.value)}
                    onBlur={(e) => validateField("message", e.target.value)}
                    aria-invalid={!!fieldErrors.message}
                  />
                  {fieldErrors.message && (
                    <p className="text-xs text-destructive">{fieldErrors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* ── Contact Info ──────────────────────────────────────────── */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Contact Information</h2>
              <div className="space-y-4">
                <Card className="bg-muted/50 border-none">
                  <CardContent className="p-4 flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Visit Our Office</h3>
                      <p className="text-muted-foreground">
                        Moghbazar, Razzaq Plaza, Lif- 09,
                        <br />
                        10Th - Floor, Suite No-10/F,
                        <br />
                        Dhaka-1217
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 border-none">
                  <CardContent className="p-4 flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-muted-foreground">01306890908</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 border-none">
                  <CardContent className="p-4 flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-muted-foreground">
                        studyabroad129@gmail.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 border-none">
                  <CardContent className="p-4 flex items-start gap-4">
                    <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Opening Hours</h3>
                      <p className="text-muted-foreground">
                        Mon - Fri: 9:00 AM - 6:00 PM
                        <br />
                        Sat: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden h-[300px] border">
              <iframe
                title="Office Location"
                src="https://maps.google.com/maps?q=Moghbazar%2C+Razzaq+Plaza%2C+Dhaka-1217%2C+Bangladesh&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
