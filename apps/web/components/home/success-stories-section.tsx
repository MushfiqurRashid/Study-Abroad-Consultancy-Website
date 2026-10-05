'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import NextImage from 'next/image';
import { ArrowRight, Loader2, Trophy, Sparkles } from 'lucide-react';
import { fetchPublicSuccessStories } from '@/action/success-story/server-action';
import type { ApiSuccessStory } from '@/action/success-story/types';

export function SuccessStoriesSection() {
    const [images, setImages] = useState<ApiSuccessStory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPublicSuccessStories().then((stories) => {
            const imageStories = (stories || []).filter(s => s.type === 'image').slice(0, 6);
            setImages(imageStories);
            setLoading(false);
        });
    }, []);

    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold tracking-tight mb-4"
                    >
                        Success Stories
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        Join hundreds of students who have realized their study abroad dreams with Study Abroad Consultancy.
                    </motion.p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : images.length === 0 ? (
                    <p className="text-center text-muted-foreground py-12">No success stories yet.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {images.map((story, index) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                            >
                                <Link href="/success-stories">
                                    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none cursor-pointer">
                                        {/* Image - No padding */}
                                        <div className="relative h-64 overflow-hidden bg-muted flex-shrink-0">
                                            <NextImage
                                                src={story.imageUrl || ''}
                                                alt={story.title || 'Success Story'}
                                                fill
                                                unoptimized
                                                className="object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                        </div>
                                        {/* Content */}
                                        <CardHeader className="flex-grow pb-3 pt-4">
                                            <CardTitle className="line-clamp-2 flex items-center gap-2">
                                                <Trophy className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                                                {story.title || 'Success Story'}
                                            </CardTitle>
                                            {story.description && (
                                                <CardDescription className="line-clamp-2 flex items-start gap-2 mt-2">
                                                    <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                    <span>{story.description}</span>
                                                </CardDescription>
                                            )}
                                        </CardHeader>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="text-center">
                    <Button size="lg" asChild className="rounded-full px-8">
                        <Link href="/success-stories">
                            View All Success Stories <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
