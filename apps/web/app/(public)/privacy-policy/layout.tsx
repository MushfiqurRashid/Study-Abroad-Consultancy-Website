import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the privacy policy of Study Abroad Consultancy. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Study Abroad Consultancy',
    description:
      'Our commitment to protecting your privacy and personal information.',
    url: '/privacy-policy',
    type: 'website',
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
