'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
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
                            Privacy Policy
                        </h1>
                        <p className="text-sm text-zinc-500 uppercase tracking-widest font-medium">
                            Last Updated: December 21, 2025
                        </p>
                    </div>

                    <div className="prose prose-zinc dark:prose-invert max-w-none space-y-10">
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">1. Introduction</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                At Study Abroad Consultancy, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us through our website and services.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">2. Information We Collect</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                We may collect personal information such as your name, email address, phone number, and academic background when you inquire about our services or register for consultation. We also collect non-personal data like browser type and IP address through cookies for analytical purposes.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">3. How We Use Your Information</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Your information allows us to provide personalized consultancy, match you with appropriate academic programs, and process your applications efficiently. We do not sell or share your personal information with third parties for marketing purposes.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">4. Data Security</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                We implement rigorous security measures to protect your data from unauthorized access, disclosure, or alteration. Our systems are regularly monitored to ensure the highest level of protection for your sensitive information.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">5. Your Legal Rights</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Under applicable data protection laws, you have the right to access, rectify, or erase your personal data. If you have any inquiries regarding your information, please contact our privacy team.
                            </p>
                        </section>

                        <section className="pt-10 border-t">
                            <p className="text-sm text-zinc-500">
                                If you have questions about this policy, please contact us at{' '}
                                <a href="mailto:arrihlastudyabroad@gmail.com" className="text-primary hover:underline">
                                    arrihlastudyabroad@gmail.com
                                </a>
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
