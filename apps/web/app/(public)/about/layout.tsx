import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Our Team & Mission',
  description:
    'Learn about our South Korea university services and upcoming destinations including Italy, Malta, Austria and Hungary.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Study Abroad Consultancy',
    description:
      'Meet our expert team of education consultants dedicated to helping students pursue higher education abroad.',
    url: '/about',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
