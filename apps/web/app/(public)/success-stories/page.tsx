import type { Metadata } from 'next';
import { fetchPublicSuccessStories } from '@/action/success-story/server-action';
import SuccessGallery from '@/components/success-story/SuccessGallery';

export const metadata: Metadata = {
    title: 'Success Stories - Student Achievements',
    description:
        'See student success stories from South Korea. More destination stories will be added as new university options become available.',
    alternates: {
        canonical: '/success-stories',
    },
    openGraph: {
        title: 'Success Stories | Study Abroad Consultancy',
        description:
            'Celebrating the achievements of our students who successfully started their journey abroad.',
        url: '/success-stories',
        type: 'website',
    },
};

export default async function SuccessStoriesPage() {
    const allStories = await fetchPublicSuccessStories();

    const images = allStories.filter((s) => s.type === 'image');
    const videos = allStories.filter((s) => s.type === 'video');

    return (
        <div className="min-h-screen pb-20">
            {/* Hero */}
            <section className="bg-muted/30 py-20 md:py-32">
                <div className="container px-4 mx-auto text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Celebrating Success
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        See the smiling faces of our students who have successfully started their journey abroad with Study Abroad Consultancy.
                    </p>
                </div>
            </section>

            {/* Gallery Tabs */}
            <section className="py-12 container px-4 mx-auto">
                <SuccessGallery images={images} videos={videos} />
            </section>
        </div>
    );
}
