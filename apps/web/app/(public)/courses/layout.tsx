import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Universities & Courses - Explore Programs Abroad',
  description:
    'Browse selected universities in South Korea. University options for Italy, Malta, Austria and Hungary will be added soon.',
  alternates: {
    canonical: '/courses',
  },
  openGraph: {
    title: 'Universities & Courses | Study Abroad Consultancy',
    description:
      'Explore six selected South Korean universities and preview our upcoming study destinations.',
    url: '/courses',
    type: 'website',
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
