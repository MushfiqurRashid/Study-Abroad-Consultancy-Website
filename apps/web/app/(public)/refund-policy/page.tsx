'use client';

import { motion } from 'framer-motion';

export default function RefundPolicyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 py-20">
            <div className="container px-6 mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-12 space-y-2 pb-8 border-b">
                        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Refund and Return Policy
                        </h1>
                        <p className="text-sm text-zinc-500 uppercase tracking-widest font-medium">
                            Last Updated: December 21, 2025
                        </p>
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none space-y-10">
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">1. Service Nature</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Study Abroad Consultancy provides consultancy services related to international education, university admissions, and visa processing. As these are professional services based on time and resource allocation, the following terms govern all refund requests.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">2. Refund Terms</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Consultation and registration fees are non-refundable. Service fees may be eligible for a partial refund if a withdrawal request is submitted in writing before any university applications have been processed, subject to an administrative fee.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">3. Non-Refundable Items</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                No refunds will be issued once applications have been submitted to educational institutions, after visa documentation has been initiated, or in cases of visa rejection by embassies for any reason.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">4. Third-Party Costs</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Fees paid directly to third parties, including university application fees, international courier charges, and embassy visa fees, are non-refundable through Study Abroad Consultancy.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">5. Request Process</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                All refund requests must be sent via email to arrihlastudyabroad@gmail.com. Requests are reviewed by our management board, and decisions are typically finalized within 10 to 15 working days.
                            </p>
                        </section>

                        <section className="pt-10 border-t">
                            <p className="text-sm text-zinc-500">
                                For billing inquiries or support, please call us at{' '}
                                <span className="text-primary font-medium">+8801898-257780</span>
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
