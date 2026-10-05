'use client';

import React, { useState, useEffect } from 'react';
import { Star, Quote, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';
import { fetchPublicReviews } from '@/action/review/server-action';
import type { ApiReview } from '@/action/review/types';

export function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<ApiReview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPublicReviews()
            .then((data) => setTestimonials(data))
            .finally(() => setLoading(false));
    }, []);

    // Don't render the section at all if there are no reviews
    if (!loading && testimonials.length === 0) return null;

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container px-4 mx-auto mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Student Success Stories</h2>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="w-full">
                    <Marquee
                        speed={40}
                        pauseOnHover
                        className="py-4"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                        }}
                    >
                        {testimonials.map((item) => (
                            <div key={item.id} className="w-[350px] md:w-[450px] flex-shrink-0">
                                <Card className="h-full bg-muted/30 border-none relative overflow-hidden group hover:bg-muted/50 transition-colors">
                                    <Quote className="absolute top-4 right-4 h-24 w-24 text-primary/5 -rotate-12" />
                                    <CardContent className="p-8 flex flex-col h-full justify-between relative z-10">
                                        <div className="space-y-6">
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, starIndex) => (
                                                    <Star
                                                        key={starIndex}
                                                        className={`h-5 w-5 ${
                                                            starIndex < item.rating
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-muted-foreground/30'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-xl font-medium leading-relaxed font-serif italic text-foreground/90">
                                                &ldquo;{item.quote}&rdquo;
                                            </p>
                                        </div>
                                        <div className="mt-8 pt-6 border-t border-border/50">
                                            <h4 className="font-bold text-lg text-primary">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground font-medium">{item.university}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </Marquee>
                </div>
            )}
        </section>
    );
}
