import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Return Policy',
  description:
    'Understand the refund and return policy of Study Abroad Consultancy. Learn about our terms for consultation fees, service charges, and third-party costs.',
  alternates: {
    canonical: '/refund-policy',
  },
  openGraph: {
    title: 'Refund & Return Policy | Study Abroad Consultancy',
    description:
      'Our refund policy for consultancy services related to international education.',
    url: '/refund-policy',
    type: 'website',
  },
};

export default function RefundPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
