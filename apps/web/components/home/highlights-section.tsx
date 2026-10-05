'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HighlightCard {
    id: string;
    country: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    color: string;
}

const highlights: HighlightCard[] = [
    {
        id: '1',
        country: 'STUDY IN SOUTH KOREA',
        title: 'Premium Universities & Overseas Employment',
        subtitle: '6 Selected Universities | Part-Time Job Opportunities Available',
        description: 'Study at prestigious Korean universities with overseas employment opportunities and scholarships',
        image: '/south-korea.jpg',
        color: '#FFD700',
    },
    {
        id: '2',
        country: 'STUDY IN ITALY',
        title: 'Excellence in Arts & Sciences',
        subtitle: '0 Universities | Coming Soon',
        description: 'University partnerships and application options will be added soon.',
        image: '/italy-des.jpg',
        color: '#009246',
    },
    {
        id: '3',
        country: 'STUDY IN MALTA',
        title: 'English-Speaking Island Nation',
        subtitle: '0 Universities | Coming Soon',
        description: 'University partnerships and application options will be added soon.',
        image: '/malta-des.jpg',
        color: '#CF142B',
    },
    {
        id: '4',
        country: 'STUDY IN AUSTRIA',
        title: 'Research & Innovation Hub',
        subtitle: '0 Universities | Coming Soon',
        description: 'University partnerships and application options will be added soon.',
        image: '/austria-des.jpg',
        color: '#ED2939',
    },
];

export function HighlightsSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Featured Study Destinations
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explore South Korea now. Universities for Italy, Malta, Austria and Hungary will be added soon.
                    </p>
                </motion.div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {highlights.map((highlight, index) => (
                        <motion.div
                            key={highlight.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-3xl h-[400px] cursor-pointer"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${highlight.image})` }}
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30 group-hover:from-black/80 group-hover:via-black/60 group-hover:to-black/40 transition-all duration-500" />
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                                {/* Top Content */}
                                <div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    >
                                        <span
                                            className="inline-block text-sm font-bold tracking-wider mb-4 px-3 py-1 rounded-full"
                                            style={{
                                                backgroundColor: highlight.color,
                                                color: '#000',
                                            }}
                                        >
                                            {highlight.country}
                                        </span>
                                    </motion.div>

                                    <motion.h3
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                        className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight"
                                    >
                                        {highlight.title}
                                    </motion.h3>

                                    <motion.p
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                                        className="text-white/90 text-sm md:text-base font-medium mb-2"
                                    >
                                        {highlight.subtitle}
                                    </motion.p>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                                        className="text-white/70 text-sm hidden md:block"
                                    >
                                        {highlight.description}
                                    </motion.p>
                                </div>

                                {/* Bottom CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                                >
                                    <Link href="/contact" className="inline-flex bg-white text-black font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-white/20 items-center gap-2 group/btn">
                                        APPLY NOW
                                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link href="/courses" className="text-primary hover:text-primary/80 font-semibold text-lg inline-flex items-center gap-2 mx-auto group">
                        View All Destinations
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
