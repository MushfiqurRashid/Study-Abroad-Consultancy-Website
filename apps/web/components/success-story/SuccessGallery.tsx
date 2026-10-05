'use client';

import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle, Image as ImageIcon, Trophy, Sparkles } from 'lucide-react';
import NextImage from 'next/image';
import type { ApiSuccessStory } from '@/action/success-story/types';

function getYouTubeEmbedUrl(url: string): string | null {
    try {
        // Handle youtu.be short links
        const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
        if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

        // Handle standard youtube.com/watch?v=...
        const urlObj = new URL(url);
        const videoId = urlObj.searchParams.get('v');
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;

        // Handle youtube.com/embed/... (already embed)
        const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
        if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}`;

        return null;
    } catch {
        return null;
    }
}

interface SuccessGalleryProps {
    images: ApiSuccessStory[];
    videos: ApiSuccessStory[];
}

export default function SuccessGallery({ images, videos }: SuccessGalleryProps) {
    return (
        <Tabs defaultValue="photos" className="space-y-12">
            <div className="flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="photos" className="text-lg">
                        <ImageIcon className="mr-2 h-5 w-5" /> Photos
                    </TabsTrigger>
                    <TabsTrigger value="videos" className="text-lg">
                        <PlayCircle className="mr-2 h-5 w-5" /> Videos
                    </TabsTrigger>
                </TabsList>
            </div>

            {/* Photos - Card Layout */}
            <TabsContent value="photos" className="space-y-8">
                {images.length === 0 ? (
                    <p className="text-center text-muted-foreground py-16">No photos yet.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((story, index) => (
                            <motion.div
                                key={story.id ?? index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: Math.min(index * 0.05, 1) }}
                            >
                                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300 border-none">
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
                            </motion.div>
                        ))}
                    </div>
                )}
            </TabsContent>

            {/* Videos */}
            <TabsContent value="videos" className="space-y-8">
                {videos.length === 0 ? (
                    <div className="text-center text-muted-foreground py-16">
                        <p>More video testimonials coming soon!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.map((story, index) => {
                            const embedUrl = story.videoUrl ? getYouTubeEmbedUrl(story.videoUrl) : null;
                            return (
                                <motion.div
                                    key={story.id ?? index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: Math.min(index * 0.05, 1) }}
                                    className="rounded-2xl overflow-hidden border shadow-sm"
                                >
                                    {embedUrl ? (
                                        <div className="relative bg-black rounded-2xl">
                                            <iframe
                                                src={embedUrl}
                                                title={story.title ?? `Video ${index + 1}`}
                                                className="w-full aspect-video rounded-2xl"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                            {story.title && (
                                                <div className="p-3 text-sm font-medium bg-background border-t">
                                                    {story.title}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-muted flex items-center justify-center">
                                            <PlayCircle className="h-10 w-10 text-muted-foreground" />
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </TabsContent>
        </Tabs>
    );
}
