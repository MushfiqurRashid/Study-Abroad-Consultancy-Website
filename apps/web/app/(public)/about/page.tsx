'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Heart, ShieldCheck, Sparkles, GraduationCap, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Team Members Data
const teamMembers = [
    {
        name: 'MD JUBAIR HAQUE',
        designation: 'CHAIRMAN',
        phone: '01713627009',
        email: 'haquejubair23@gmail.com',
        image: null
    },
    {
        name: 'MD SHAKIBUL ISLAM',
        designation: 'MANAGING DIRECTOR',
        phone: '+1 (825) 977-9514',
        email: 'shakibulislam208@gmail.com',
        image: '/team/Md Shakibul Islam (Managing Director).jpg'
    },
    {
        name: 'NAZIBULLAH BAHAR',
        designation: 'CEO',
        phone: '01306-890908',
        email: 'studyabroad129@gmail.com',
        image: '/team/NAZIBULLAH BAHAR CEO.png'
    }
];

const teamMembers2 = [
    {
        name: 'AL MAMUN',
        designation: 'SR COUNSELOR',
        phone: '01713-397022',
        email: 'mamun.study7@gmail.com',
        image: '/team/ AL MAMUN (SR COUSELOR).png'
    },
    {
        name: 'SIYAM MAHMUD',
        designation: 'CONSULTANT',
        phone: '01713-396109',
        email: 'studyabroad.siyam@gmail.com',
        image: '/team/ SIYAM MAHMUD (CONSULTANT).jpg'
    },
    {
        name: 'AL AMIN',
        designation: 'JR COUNSELOR',
        phone: '01713-396109',
        email: 'studyabroad.siyam@gmail.com',
        image: '/team/ AL AMIN (JR SCOUNSELOR).jpg'
    }
];

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden bg-primary/5">
                <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
                <div className="container px-4 mx-auto text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Badge variant="outline" className="px-4 py-1.5 text-sm uppercase tracking-wider border-primary/20 bg-background/50 backdrop-blur">
                            About Study Abroad Consultancy
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
                    >
                        Your Gateway to <br /> Global Education
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        A leading overseas education consultancy based in Dhaka, Bangladesh. We currently offer selected universities in South Korea, with Italy, Malta, Austria and Hungary coming soon.
                    </motion.p>
                </div>
            </section>

            {/* Main Content Splite */}
            <section className="py-20 bg-background">
                <div className="container px-4 mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Side: Image/Visual Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted relative group">
                                <Image
                                    src="/banner.png"
                                    alt="Study Abroad Consultancy office banner"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                            </div>

                            {/* Floating Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="absolute -bottom-8 -right-8 bg-card p-6 rounded-2xl shadow-xl border max-w-xs hidden md:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">Est. 2018</p>
                                        <p className="text-sm text-muted-foreground">Years of Excellence</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Right Side: Content */}
                        <div className="space-y-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="prose prose-lg dark:prose-invert"
                            >
                                <h2 className="text-3xl font-bold mb-6">Turning Dreams Into Reality</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Established in 2018, Study Abroad Consultancy has earned a reputation as one of the most reliable and transparent study abroad consultancies in the country. We specialize in assisting students who aspire to pursue undergraduate and postgraduate studies in top-ranked universities across Asia and Europe.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                                    From university selection, document preparation, and admission support to visa assistance, overseas employment support, and pre-departure briefings, our team of experienced counsellors ensures a smooth, step-by-step process for every applicant.
                                </p>
                            </motion.div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <Card className="bg-muted/30 border-none">
                                    <CardContent className="p-6 space-y-3">
                                        <ShieldCheck className="h-8 w-8 text-primary" />
                                        <h3 className="font-semibold text-lg">Trusted Guidance</h3>
                                        <p className="text-sm text-muted-foreground">
                                            We pride ourselves on providing honest, personalized service and long-term mentorship.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-muted/30 border-none">
                                    <CardContent className="p-6 space-y-3">
                                        <GraduationCap className="h-8 w-8 text-primary" />
                                        <h3 className="font-semibold text-lg">Expert Knowledge</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Continuously updated on South Korean admissions and preparing future options for Italy, Malta, Austria and Hungary.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-primary/5 p-6 rounded-2xl border border-primary/10"
                            >
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <Heart className="h-5 w-5 text-primary" />
                                    Our Promise
                                </h3>
                                <p className="text-muted-foreground">
                                    We believe in maintaining genuine communication, offering competitive service packages, and ensuring transparency throughout the entire journey.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2868&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
                <div className="container px-4 mx-auto relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <Target className="h-16 w-16 mx-auto mb-6 text-primary-foreground/80" />
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Mission</h2>
                            <p className="text-xl md:text-2xl leading-relaxed font-medium text-primary-foreground/90">
                                "Our mission is to empower Bangladeshi students with authentic guidance and seamless support, starting with selected universities in South Korea and expanding to more destinations soon."
                            </p>
                            <div className="mt-8 pt-8 border-t border-primary-foreground/20">
                                <p className="text-lg font-semibold tracking-wide uppercase opacity-80">
                                    Study Abroad Consultancy is a part of your success.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vision Quote */}
            <section className="py-20">
                <div className="container px-4 mx-auto text-center">
                    <blockquote className="text-2xl md:text-3xl font-medium text-muted-foreground italic max-w-4xl mx-auto">
                        "At the heart of Study Abroad Consultancy is a simple vision—to make global education accessible, affordable, and achievable for every Bangladeshi student."
                    </blockquote>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-muted/20">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Meet Our Team</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            With our dedication, expertise, and student-first approach, we are here to guide you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="border-none shadow-sm hover:shadow-lg transition-shadow h-full overflow-hidden">
                                    {member.image && (
                                        <div className="aspect-square bg-muted relative overflow-hidden group">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                        </div>
                                    )}
                                    <CardContent className="p-8 text-center space-y-4">
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-900 dark:text-white">{member.name}</h3>
                                            <p className="text-sm text-primary font-semibold mt-1 uppercase tracking-wide">{member.designation}</p>
                                        </div>
                                        
                                        <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-center gap-2 text-sm">
                                                <Phone className="h-4 w-4 text-primary" />
                                                <a href={`tel:${member.phone}`} className="text-primary hover:underline font-medium">
                                                    {member.phone}
                                                </a>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-sm">
                                                <Mail className="h-4 w-4 text-primary" />
                                                <a href={`mailto:${member.email}`} className="text-primary hover:underline font-medium break-all">
                                                    {member.email}
                                                </a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Second Row */}
                    {teamMembers2.length > 0 && (
                        <div className="grid md:grid-cols-3 gap-8 mt-8">
                            {teamMembers2.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index + 3) * 0.1 }}
                                >
                                    <Card className="border-none shadow-sm hover:shadow-lg transition-shadow h-full overflow-hidden">
                                        {member.image && (
                                            <div className="aspect-square bg-muted relative overflow-hidden group">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                                            </div>
                                        )}
                                        <CardContent className="p-8 text-center space-y-4">
                                            <div>
                                                <h3 className="font-bold text-xl text-gray-900 dark:text-white">{member.name}</h3>
                                                <p className="text-sm text-primary font-semibold mt-1 uppercase tracking-wide">{member.designation}</p>
                                            </div>
                                            
                                            <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center justify-center gap-2 text-sm">
                                                    <Phone className="h-4 w-4 text-primary" />
                                                    <a href={`tel:${member.phone}`} className="text-primary hover:underline font-medium">
                                                        {member.phone}
                                                    </a>
                                                </div>
                                                <div className="flex items-center justify-center gap-2 text-sm">
                                                    <Mail className="h-4 w-4 text-primary" />
                                                    <a href={`mailto:${member.email}`} className="text-primary hover:underline font-medium break-all">
                                                        {member.email}
                                                    </a>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-24">
                <div className="container px-4 mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Start Your Journey With Study Abroad Consultancy
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Dare to dream beyond borders. We are here to help you every step of the way.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" asChild className="px-8 rounded-full">
                            <Link href="/contact">Book a Consultation</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="px-8 rounded-full">
                            <Link href="/courses">Explore Universities</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
