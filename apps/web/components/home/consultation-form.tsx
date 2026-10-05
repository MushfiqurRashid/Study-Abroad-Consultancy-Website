'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Loader2 } from 'lucide-react';
import { useConsultationStore } from '@/action/consultation/store';
import { submitConsultationForm } from '@/action/consultation/server-action';
import type { ConsultationFormValues } from '@/action/consultation/types';

// ─── Client-side blur validation schema ────────────────────────────────────

const fieldSchemas: Record<keyof ConsultationFormValues, Yup.StringSchema> = {
    name: Yup.string()
        .trim()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be at most 100 characters')
        .required('Full name is required'),
    email: Yup.string()
        .trim()
        .email('Please enter a valid email address')
        .required('Email address is required'),
    phone: Yup.string()
        .trim()
        .required('Phone number is required')
        .matches(
            /^\+[1-9]\d{6,14}$/,
            'Phone must be in international format e.g. +8801306890908'
        ),
};

export function ConsultationForm() {
    const {
        values,
        fieldErrors,
        isSubmitting,
        setField,
        setFieldError,
        clearFieldError,
        setSubmitting,
        applyActionResult,
        resetForm,
    } = useConsultationStore();

    // ─── blur validation ─────────────────────────────────────────────────

    const handleBlur = useCallback(
        async (field: keyof ConsultationFormValues) => {
            try {
                await fieldSchemas[field].validate(values[field]);
                clearFieldError(field);
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    setFieldError(field, err.message);
                }
            }
        },
        [values, clearFieldError, setFieldError]
    );

    // ─── submit ──────────────────────────────────────────────────────────

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);

        const result = await submitConsultationForm(values);
        applyActionResult(result);

        if (result.success) {
            toast.success(result.message);
            resetForm();
        } else {
            toast.error(result.message);
        }
    }

    return (
        <section className="relative z-20 -mt-20 pb-12 px-4 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <Card className="max-w-4xl mx-auto shadow-2xl border-primary/10">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl md:text-3xl font-bold">
                            Get Your Free Consultation
                        </CardTitle>
                        <CardDescription>
                            Fill in your details below and our experts will get back to you shortly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-end">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="consult-name">Full Name</Label>
                                <Input
                                    id="consult-name"
                                    placeholder="John Doe"
                                    value={values.name}
                                    onChange={(e) => setField('name', e.target.value)}
                                    onBlur={() => handleBlur('name')}
                                    aria-invalid={!!fieldErrors.name}
                                />
                                {fieldErrors.name && (
                                    <p className="text-xs text-red-600">{fieldErrors.name}</p>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="consult-phone">Phone Number</Label>
                                <Input
                                    id="consult-phone"
                                    placeholder="+8801306890908"
                                    value={values.phone}
                                    onChange={(e) => setField('phone', e.target.value)}
                                    onBlur={() => handleBlur('phone')}
                                    aria-invalid={!!fieldErrors.phone}
                                />
                                {fieldErrors.phone && (
                                    <p className="text-xs text-red-600">{fieldErrors.phone}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="consult-email">Email Address</Label>
                                <Input
                                    id="consult-email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={values.email}
                                    onChange={(e) => setField('email', e.target.value)}
                                    onBlur={() => handleBlur('email')}
                                    aria-invalid={!!fieldErrors.email}
                                />
                                {fieldErrors.email && (
                                    <p className="text-xs text-red-600">{fieldErrors.email}</p>
                                )}
                            </div>

                            {/* Submit */}
                            <Button type="submit" size="lg" className="w-full font-bold" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Booking...
                                    </>
                                ) : (
                                    <>
                                        Book Now <BookOpen className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    );
}
