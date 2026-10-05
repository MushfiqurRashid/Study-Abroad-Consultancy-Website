'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import OrbitCarousel from './orbit-carousel';

export function IntroSection() {
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                                Find Your Dream University with{' '}
                                <span className="text-primary">Study Abroad Consultancy</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="space-y-4 text-base md:text-lg text-muted-foreground"
                        >
                            <p>
                                We help Bangladeshi students apply to selected universities in South Korea, with university options for Italy, Malta, Austria, and Hungary coming soon. From application to visa, we support every step of the journey with expert guidance.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            {['University Selection', 'Document Processing', 'Visa Assistance', 'Overseas Employment'].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full text-sm font-medium">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                    {item}
                                </div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="pt-4"
                        >
                            <Button size="lg" asChild className="rounded-full px-8">
                                <Link href="/contact">
                                    Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right: Orbit Carousel */}
                    <div className="relative h-[600px] flex items-center justify-center overflow-hidden rounded-3xl bg-muted/10 border border-border/50">
                        <OrbitCarousel />
                    </div>
                </div>
            </div>
        </section>
    );
}
