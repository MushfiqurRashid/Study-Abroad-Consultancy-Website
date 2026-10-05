'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export function HeroSection() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 -z-20 w-full h-full object-cover"
            >
                <source src="/video/hero.mp4" type="video/mp4" />
                {/* Fallback to image if video doesn't load */}
                Your browser does not support the video tag.
            </video>
            
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/50 -z-10" />
            
            {/* Additional Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70 -z-10" />

            {/* Bottom blend so hero video matches the page background */}
            <div
                className="absolute inset-x-0 bottom-0 h-36 -z-10"
                style={{
                    background:
                        'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.42) 55%, var(--background) 100%)',
                }}
            />

            <div className="container px-4 text-center z-10">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="space-y-6 max-w-4xl mx-auto"
                >
                    <motion.div variants={fadeInUp}>
                        <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-sm font-semibold mb-4 backdrop-blur-sm border border-white/20">
                            Your Gateway to Global Education
                        </span>
                    </motion.div>
                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
                    >
                        Study Abroad, <br /> Shape Your Future
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-xl text-gray-100 max-w-2xl mx-auto drop-shadow-md"
                    >
                        We guide you through every step of your international education journey. From university selection to visa approval and overseas employment support.
                    </motion.p>
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Button size="lg" asChild className="rounded-full px-8 bg-[#043168] text-white hover:bg-[#032349]">
                            <Link href="/courses">
                                Explore Universities <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" asChild className="rounded-full px-8 border-2 border-white text-white hover:bg-white/10 bg-transparent">
                            <Link href="/contact">Book Consultation</Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
