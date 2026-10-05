import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Plane, GraduationCap, Briefcase } from 'lucide-react';

export function ServicesSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Decorative gradients */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-[#f6f8fb] to-white" />
            <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="container px-4 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#043168] via-[#0a5ad4] to-[#0f7bff] bg-clip-text text-transparent">
                        Our Services
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Comprehensive support for your study abroad journey and overseas employment opportunities.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: <GraduationCap className="h-10 w-10 text-primary" />,
                            title: 'University Admission',
                            desc: 'Expert guidance on selecting the right university and course based on your profile.'
                        },
                        {
                            icon: <Plane className="h-10 w-10 text-primary" />,
                            title: 'Visa Assistance',
                            desc: 'Complete support for visa documentation, application, and interview preparation.'
                        },
                        {
                            icon: <BookOpen className="h-10 w-10 text-primary" />,
                            title: 'Scholarship Help',
                            desc: 'Assistance in finding and applying for scholarships to fund your education.'
                        },
                        {
                            icon: <Briefcase className="h-10 w-10 text-primary" />,
                            title: 'Overseas Employment',
                            desc: 'Professional assistance with overseas employment opportunities and job placement support.'
                        }
                    ].map((service, index) => (
                        <Card
                            key={index}
                            className="group border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_20px_60px_-25px_rgba(4,49,104,0.35)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_80px_-40px_rgba(4,49,104,0.5)]"
                        >
                            <CardHeader>
                                <div className="mb-4 inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-primary/10 via-white to-white shadow-inner">
                                    {service.icon}
                                </div>
                                <CardTitle className="text-xl font-semibold text-neutral-900">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
