'use client';

import React from 'react';
import Image from 'next/image';
import { Marquee } from '@/components/ui/marquee';

// Partner logos from public folder
const partnerLogos = [
    { id: 1, src: '/partner.png', alt: 'Partner 1' },
    { id: 2, src: '/partner2.png', alt: 'Partner 2' },
    { id: 3, src: '/partner3.png', alt: 'Partner 3' },
    { id: 4, src: '/partner4.png', alt: 'Partner 4' },
    { id: 5, src: '/partner5.png', alt: 'Partner 5' },
];

export function LogoMarquee() {
    return (
        <section className="py-16 bg-gradient-to-b from-background to-primary/5">
            <div className="container px-4 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our Trusted Partners
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Collaborating with leading institutions worldwide to provide you with the best educational opportunities
                    </p>
                </div>

                <div className="flex items-center justify-center overflow-hidden">
                    <div className="w-full max-w-6xl">
                        <Marquee
                            speed={60}
                            pauseOnHover
                            className="py-4"
                            style={{
                                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                            }}
                        >
                            {partnerLogos.map((logo) => (
                                <div
                                    key={logo.id}
                                    className="flex-shrink-0 flex justify-center items-center bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 p-6"
                                    style={{
                                        width: '240px',
                                        aspectRatio: '16 / 9',
                                    }}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={logo.src}
                                            alt={logo.alt}
                                            fill
                                            className="object-contain"
                                            sizes="240px"
                                        />
                                    </div>
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>
            </div>
        </section>
    );
}
