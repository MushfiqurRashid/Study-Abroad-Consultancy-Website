'use client';

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import NextImage from 'next/image';
import { fetchUniversityById } from '@/action/university/server-action';
import type { ApiUniversity } from '@/action/university/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Award, BookOpen, Building2, Calendar, CheckCircle2, ExternalLink, Globe, GraduationCap, Home, Loader2, Mail, MapPin, Phone } from 'lucide-react';

const fallbackImage = 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80';

function ListCard({ title, items, icon: Icon }: { title: string; items?: string[]; icon: typeof Award }) {
  if (!items?.length) return null;
  return <Card><CardHeader><CardTitle className="flex items-center gap-2"><Icon className="h-5 w-5 text-primary" />{title}</CardTitle></CardHeader><CardContent><ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-start gap-2 text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>)}</ul></CardContent></Card>;
}

export default function UniversityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [university, setUniversity] = useState<ApiUniversity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUniversityById(id).then(setUniversity).finally(() => setLoading(false)); }, [id]);
  if (loading) return <div className="flex items-center justify-center py-24"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (!university || university.status !== 'active') notFound();

  return <main className="py-12 md:py-20"><div className="container mx-auto px-4">
    <Link href="/courses" className="mb-8 inline-flex items-center gap-2 text-primary hover:underline"><ArrowLeft className="h-4 w-4" />Back to Universities</Link>
    <div className="overflow-hidden rounded-2xl border bg-muted/20 shadow-xl"><NextImage src={university.image || fallbackImage} alt={university.name} width={1400} height={700} unoptimized className="h-auto max-h-[520px] w-full object-cover" priority /></div>
    <div className="grid gap-8 py-10 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2"><Badge>{university.country}</Badge><h1 className="text-3xl font-bold md:text-5xl">{university.name}</h1><p className="flex items-start gap-2 text-muted-foreground"><MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />{university.location}</p><p className="whitespace-pre-line text-lg leading-relaxed text-muted-foreground">{university.description}</p><div className="flex flex-wrap gap-3"><Button asChild><Link href="/contact">Apply With Our Counselors</Link></Button>{university.website && <Button variant="outline" asChild><a href={university.website} target="_blank" rel="noreferrer">Official Website <ExternalLink className="ml-2 h-4 w-4" /></a></Button>}</div></div>
      <Card className="h-fit"><CardHeader><CardTitle>University information</CardTitle></CardHeader><CardContent className="space-y-4 text-sm">
        {university.established && <p className="flex gap-3"><Calendar className="h-5 w-5 text-primary" /><span><b>Established</b><br />{university.established}</span></p>}
        <p className="flex gap-3"><Building2 className="h-5 w-5 text-primary" /><span><b>Institution type</b><br /><span className="capitalize">{university.type}</span></span></p>
        {university.tuitionFee && <p className="flex gap-3"><GraduationCap className="h-5 w-5 text-primary" /><span><b>Tuition</b><br />{university.tuitionFee}</span></p>}
        {university.intakes && <p className="flex gap-3"><Calendar className="h-5 w-5 text-primary" /><span><b>Intakes</b><br />{university.intakes}</span></p>}
        {university.applicationDeadline && <p><b>Application deadline</b><br /><span className="text-muted-foreground">{university.applicationDeadline}</span></p>}
        {university.email && <a href={`mailto:${university.email}`} className="flex gap-3 hover:text-primary"><Mail className="h-5 w-5 text-primary" />{university.email}</a>}
        {university.phone && <a href={`tel:${university.phone}`} className="flex gap-3 hover:text-primary"><Phone className="h-5 w-5 text-primary" />{university.phone}</a>}
      </CardContent></Card>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      <ListCard title="Programs" items={university.programs} icon={BookOpen} /><ListCard title="Why choose this university" items={university.whyChoose} icon={Award} /><ListCard title="Admission requirements" items={university.admissionRequirements} icon={CheckCircle2} /><ListCard title="Language requirements" items={university.languageRequirements} icon={Globe} /><ListCard title="Scholarships" items={university.scholarships} icon={GraduationCap} /><ListCard title="Campus facilities" items={university.facilities} icon={Building2} />
      {university.accommodation && <Card><CardHeader><CardTitle className="flex items-center gap-2"><Home className="h-5 w-5 text-primary" />Accommodation</CardTitle></CardHeader><CardContent className="whitespace-pre-line text-muted-foreground">{university.accommodation}</CardContent></Card>}
    </div>
    <Card className="mt-10 bg-primary text-primary-foreground"><CardContent className="p-8 text-center"><h2 className="mb-3 text-2xl font-bold">Interested in {university.name}?</h2><p className="mb-6 opacity-90">Requirements and fees can change. Our counselors can confirm the latest intake information and help prepare your application.</p><Button variant="secondary" asChild><Link href="/contact">Book a Free Consultation</Link></Button></CardContent></Card>
  </div></main>;
}
