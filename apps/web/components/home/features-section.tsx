import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserCheck } from 'lucide-react';

export function FeaturesSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#043168] via-[#0a5ad4] to-[#0f7bff]" />
            <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1),transparent_28%)]" />

            <div className="container px-4 relative z-10 mx-auto text-primary-foreground">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold">Why Choose Study Abroad Consultancy?</h2>
                        <p className="text-primary-foreground/80 text-lg">
                            We bring years of experience and a personal touch to your study abroad dreams. Our success rate speaks for itself.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Personalized Counseling Sessions',
                                'Direct University Partnerships',
                                'Overseas Employment Support',
                                'Pre-departure Briefings',
                                'Post-arrival Support'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <UserCheck className="h-5 w-5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <Button variant="secondary" size="lg" asChild className="mt-4 rounded-full bg-white text-primary hover:bg-white/90">
                            <Link href="/about">Learn More About Us</Link>
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="relative aspect-square rounded-2xl bg-white/10 border border-white/25 overflow-hidden shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
                            <Image
                                src="/korea.jpg"
                                alt="Students in South Korea"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-2xl" aria-hidden />
                        <div className="absolute -right-10 top-6 w-32 h-32 rounded-full bg-white/10 blur-3xl" aria-hidden />
                    </div>
                </div>
            </div>
        </section>
    );
}
