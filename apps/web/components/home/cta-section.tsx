import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTASection() {
    return (
        <section className="py-24">
            <div className="container px-4 mx-auto">
                <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center space-y-6 bg-gradient-to-r from-[#043168] via-[#0a5ad4] to-[#0f7bff] text-white shadow-[0_30px_80px_-40px_rgba(4,49,104,0.7)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.14),transparent_28%)]" aria-hidden />
                    <div className="relative space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Journey?</h2>
                        <p className="text-white/80 max-w-2xl mx-auto text-lg">
                            Book a free consultation with our education experts today. We assist with university admissions, visa applications, and overseas employment support.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <Button size="lg" asChild className="w-full sm:w-auto rounded-full bg-white text-primary hover:bg-white/90">
                                <Link href="/contact">Book Free Consultation</Link>
                            </Button>
                            <Button
                                size="lg"
                                asChild
                                className="w-full sm:w-auto rounded-full border border-white/70 bg-white/10 text-white font-semibold hover:bg-white/20 hover:text-white shadow-[0_15px_40px_-25px_rgba(0,0,0,0.6)]"
                            >
                                <Link href="/courses">Browse Universities</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
