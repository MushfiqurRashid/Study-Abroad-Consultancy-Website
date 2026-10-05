import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { HighlightsSection } from '@/components/home/highlights-section';
import { ServicesSection } from '@/components/home/services-section';
import { FeaturesSection } from '@/components/home/features-section';
import { CTASection } from '@/components/home/cta-section';
import { ConsultationForm } from '@/components/home/consultation-form';
import { PopularCoursesSection } from '@/components/home/popular-courses-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { SuccessStoriesSection } from '@/components/home/success-stories-section';
import { IntroSection } from '@/components/home/intro-section';
import { fetchPublicUniversities } from '@/action/university/server-action';
import { APP_URL } from '@/constant';

export const metadata: Metadata = {
  title: 'Study Abroad Consultancy | South Korea & Upcoming Destinations',
  description:
    'Apply to selected universities in South Korea. University options for Italy, Malta, Austria and Hungary will be added soon.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Study Abroad Consultancy | Your Gateway to Global Education',
    description:
      'Study in South Korea with more university destinations coming soon.',
    url: APP_URL,
    type: 'website',
  },
};

// JSON-LD structured data for the organization
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Study Abroad Consultancy',
  description:
    'Study abroad consultancy supporting South Korea applications, with more destinations coming soon.',
  url: APP_URL,
  logo: `${APP_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+880-1306-890908',
    contactType: 'customer service',
    email: 'studyabroad129@gmail.com',
    areaServed: 'BD',
    availableLanguage: ['English', 'Bengali'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Moghbazar, Razzaq Plaza, Lif-09, 10th Floor, Suite No-10/F',
    addressLocality: 'Dhaka',
    postalCode: '1217',
    addressCountry: 'BD',
  },
  sameAs: [
    'https://www.facebook.com/',
    'https://www.youtube.com/',
  ],
};

export default async function Home() {
  const universities = await fetchPublicUniversities();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <ConsultationForm />
      <IntroSection />
      <HighlightsSection />
      <ServicesSection />
      <PopularCoursesSection universities={universities} />
      <FeaturesSection />
      <TestimonialsSection />
      <SuccessStoriesSection />
      <CTASection />
    </>
  );
}

