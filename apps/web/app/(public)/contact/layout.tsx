import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch',
  description:
    'Contact us for South Korea admissions guidance and updates about upcoming destinations including Italy, Malta, Austria and Hungary.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Study Abroad Consultancy',
    description:
      'Get in touch with our expert education consultants. We are located in Dhaka, Bangladesh.',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
