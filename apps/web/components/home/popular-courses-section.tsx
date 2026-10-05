'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, University, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { cn } from '@/lib/utils';
import type { ApiUniversity } from '@/action/university/types';

const MAX_COUNTRIES = 5;
const MAX_PER_COUNTRY = 4;

interface Props {
    universities: ApiUniversity[];
}

export function PopularCoursesSection({ universities }: Props) {
    const [activeTab, setActiveTab] = useState('all');

    // Ensure universities is always an array
    const data = Array.isArray(universities) ? universities : [];

    // Pick up to MAX_COUNTRIES unique countries in order of first appearance
    const countries = useMemo(() => {
        const seen = new Set<string>();
        const result: string[] = [];
        for (const u of data) {
            if (!seen.has(u.country)) {
                seen.add(u.country);
                result.push(u.country);
                if (result.length === MAX_COUNTRIES) break;
            }
        }
        return result;
    }, [data]);

    const tabs = useMemo(() => [
        { id: 'all', label: 'All' },
        ...countries.map(c => ({ id: c, label: c })),
    ], [countries]);

    // For "all": up to MAX_PER_COUNTRY per country (only from the top-5 countries)
    // For a specific country: up to MAX_PER_COUNTRY
    const displayed = useMemo(() => {
        if (activeTab === 'all') {
            const countMap = new Map<string, number>();
            const result: ApiUniversity[] = [];
            for (const u of data) {
                if (!countries.includes(u.country)) continue;
                const count = countMap.get(u.country) ?? 0;
                if (count < MAX_PER_COUNTRY) {
                    result.push(u);
                    countMap.set(u.country, count + 1);
                }
            }
            return result;
        }
        return data
            .filter(u => u.country === activeTab)
            .slice(0, MAX_PER_COUNTRY);
    }, [activeTab, data, countries]);

    const totalForTab = activeTab === 'all'
        ? data.filter(u => countries.includes(u.country)).length
        : data.filter(u => u.country === activeTab).length;

    return (
        <section className="py-20 bg-muted/30 overflow-hidden">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="text-4xl font-bold tracking-tight"
                        >
                            Featured Universities
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="text-xl text-muted-foreground"
                        >
                            Explore top-ranked universities trusted by thousands of international students.
                        </motion.p>
                    </div>

                    {/* Filter Tabs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="flex flex-wrap gap-2"
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                    activeTab === tab.id
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "bg-white hover:bg-muted border border-border text-muted-foreground"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
                    <AnimatePresence mode="popLayout">
                        {displayed.length > 0 ? (
                            displayed.map((uni, index) => (
                                <motion.div
                                    key={`${uni.id}-${activeTab}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="will-change-transform"
                                >
                                    <Card className="h-full hover:shadow-xl transition-all duration-300 flex flex-col group border-none shadow-sm">
                                        <div className="relative h-48 overflow-hidden rounded-t-xl">
                                            <NextImage
                                                src={uni.image || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80'}
                                                alt={uni.name}
                                                fill
                                                unoptimized
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                loading="lazy"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <Badge className="bg-white/90 dark:bg-black/70 text-black dark:text-white backdrop-blur-md border-none shadow-sm font-semibold">
                                                    {uni.country}
                                                </Badge>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                        <CardHeader className="pb-2">
                                            <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors duration-300">{uni.name}</h3>
                                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                                                <MapPin className="h-4 w-4 text-primary/70" />
                                                <span className="line-clamp-1 font-medium">{uni.location}, {uni.country}</span>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-4 flex-grow pb-4">
                                            {uni.established && (
                                                <div className="flex items-center gap-2 text-sm font-semibold">
                                                    <div className="flex items-center gap-1.5 text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                                                        <Calendar className="h-4 w-4 text-primary" /> Founded {uni.established}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                        <CardFooter className="pt-0">
                                            <Button variant="outline" className="w-full border-primary/20 hover:bg-primary hover:text-primary-foreground group-hover:border-primary transition-all duration-500 font-bold h-11 rounded-lg" asChild>
                                                <Link href={`/courses/${uni.id}`}>
                                                    View Details
                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 text-center"
                            >
                                <div className="max-w-md mx-auto space-y-4">
                                    <div className="bg-muted rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <University className="h-8 w-8 text-muted-foreground" />
                                    </div>
                                    <p className="text-xl font-semibold text-muted-foreground">No universities found for this region yet.</p>
                                    <Button onClick={() => setActiveTab('all')} variant="link">View all universities</Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {totalForTab > displayed.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center"
                    >
                        <Button size="lg" className="rounded-full px-12 h-14 text-lg font-bold shadow-xl hover:scale-105 transition-all" asChild>
                            <Link href="/courses">
                                Explore All Universities <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
