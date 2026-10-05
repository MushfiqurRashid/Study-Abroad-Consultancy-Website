import type { Metadata } from "next";
import SmoothScroll from "@/components/ui/smooth-scroll";
import Preloader from "@/components/ui/preloader";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner";
import { MouseTrail } from "@/components/ui/mouse-trail";
import { APP_URL } from "@/constant";

export const metadata: Metadata = {
  title: {
    default: "Study Abroad Consultancy | South Korea & Upcoming Destinations",
    template: "%s | Study Abroad Consultancy",
  },
  description:
    "Apply to selected universities in South Korea. University options for Italy, Malta, Austria and Hungary will be added soon.",
  keywords: [
    "study abroad",
    "study abroad consultancy",
    "study in South Korea",
    "study in Italy",
    "study in Malta",
    "study in Austria",
    "study in Hungary",
    "university admission",
    "student visa",
    "international education",
    "Bangladesh study abroad",
    "overseas education",
    "scholarship abroad",
    "foreign university",
    "higher education abroad",
  ],
  metadataBase: new URL(APP_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "Study Abroad Consultancy",
    title: "Study Abroad Consultancy | Your Gateway to Global Education",
    description:
      "Expert guidance for South Korea, with Italy, Malta, Austria and Hungary university options coming soon.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Study Abroad Consultancy - Your Gateway to Global Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad Consultancy | Your Gateway to Global Education",
    description:
      "Expert guidance for South Korea, with more study destinations coming soon.",
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Preloader />
      <SmoothScroll>
        <MouseTrail />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </SmoothScroll>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
