'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';

export function DestinationsSection() {
  return <section className="bg-background py-20"><div className="container mx-auto px-4">
    <div className="mb-12 space-y-4 text-center"><h2 className="text-4xl font-bold tracking-tight">Study in South Korea</h2><p className="mx-auto max-w-2xl text-xl text-muted-foreground">Explore our selected Korean universities with support from application through enrolment.</p></div>
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-3xl">
      <Card className="overflow-hidden"><div className="relative h-72"><NextImage src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=2070&auto=format&fit=crop" alt="South Korea" fill unoptimized className="object-cover" /><div className="absolute inset-0 bg-black/35" /></div><CardContent className="p-7"><h3 className="mb-3 flex items-center gap-2 text-2xl font-bold"><MapPin className="h-5 w-5 text-primary" />South Korea</h3><p className="mb-5 text-muted-foreground">Discover six carefully selected institutions in Seoul, Daejeon, Pyeongtaek, North Chungcheong and North Jeolla.</p><Button asChild><Link href="/courses">Explore Korean Universities <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></CardContent></Card>
    </motion.div>
  </div></section>;
}
