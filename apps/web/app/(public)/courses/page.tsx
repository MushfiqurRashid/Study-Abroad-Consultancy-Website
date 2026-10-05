'use client';

import { Suspense, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Calendar, Globe, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import NextImage from 'next/image';
import { fetchPublicUniversities } from '@/action/university/server-action';
import type { ApiUniversity } from '@/action/university/types';

const UNIVERSITIES_PER_PAGE = 12;
const DESTINATION_COUNTRIES = ['South Korea', 'Italy', 'Malta', 'Austria', 'Hungary'];
const normalizeCountry = (value: string) => value.trim().toLowerCase().replace(/[-_\s]+/g, ' ');

function UniversitiesPageContent() {
    const [allUniversities, setAllUniversities] = useState<ApiUniversity[]>([]);
    const [selectedCountry, setSelectedCountry] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(UNIVERSITIES_PER_PAGE);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const countryParam = searchParams.get('country') || '';

    // Fetch API universities on mount
    useEffect(() => {
        fetchPublicUniversities().then((unis) => {
            setAllUniversities(unis || []);
            setLoading(false);
        });
    }, []);

    // Build dynamic country list from API data
    const countries = useMemo(() => {
        const countrySet = new Set([...DESTINATION_COUNTRIES, ...allUniversities.map(u => u.country)]);
        const ordered = Array.from(countrySet);
        return ['All', ...ordered];
    }, [allUniversities]);

    useEffect(() => {
        if (!countryParam) return;

        const normalizedParam = normalizeCountry(countryParam);
        const matchedCountry = countries.find((country) => {
            if (country === 'All') return false;
            const normalizedCountry = normalizeCountry(country);
            if (normalizedCountry === normalizedParam) return true;

            // Allow slug/alias style matches (e.g. south-korea -> korea / south korea)
            if (normalizedParam.includes(normalizedCountry) || normalizedCountry.includes(normalizedParam)) {
                return true;
            }
            if (normalizedParam === 'south korea' && normalizedCountry === 'korea') return true;
            if (normalizedParam === 'korea' && normalizedCountry === 'south korea') return true;

            return false;
        });
        if (!matchedCountry) return;

        setSelectedCountry(matchedCountry);
        setVisibleCount(UNIVERSITIES_PER_PAGE);
    }, [countryParam, countries]);

    const filteredUniversities = useMemo(() => {
        return allUniversities.filter(uni => {
            const matchesCountry = selectedCountry === 'All' || uni.country === selectedCountry;
            const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCountry && matchesSearch;
        });
    }, [selectedCountry, searchQuery, allUniversities]);

    const displayedUniversities = filteredUniversities.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + UNIVERSITIES_PER_PAGE);
    };

    const handleFilterChange = (country: string) => {
        setSelectedCountry(country);
        setVisibleCount(UNIVERSITIES_PER_PAGE);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-muted-foreground">Loading universities...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 md:py-24 space-y-12">
            {/* Header */}
            <div className="container px-4 mx-auto text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Explore Universities
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Discover top universities across our partner countries.
                </p>
            </div>

            {/* Filters */}
            <div className="container px-4 mx-auto space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search universities..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setVisibleCount(UNIVERSITIES_PER_PAGE);
                            }}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {countries.map(country => (
                            <Button
                                key={country}
                                variant={selectedCountry === country ? "default" : "outline"}
                                onClick={() => handleFilterChange(country)}
                                size="sm"
                                className="rounded-full h-9 px-4"
                            >
                                {country}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Universities Grid */}
            <div className="container px-4 mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedUniversities.map((uni) => (
                        <Card key={uni.id} className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 overflow-hidden group border-none shadow-sm bg-card/50 backdrop-blur-sm">
                            <div className="h-48 overflow-hidden relative">
                                <NextImage
                                    src={uni.image || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80'}
                                    alt={uni.name}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <Badge className="absolute top-4 right-4 bg-background/90 text-foreground backdrop-blur-md shadow-sm border-none font-semibold">
                                    {uni.country}
                                </Badge>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                            <CardHeader className="pb-2">
                                <CardTitle className="line-clamp-1 text-xl group-hover:text-primary transition-colors duration-300">{uni.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-3 pb-4">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <MapPin className="h-4 w-4 text-primary/70 flex-shrink-0" />
                                    <span className="text-muted-foreground">{uni.location}, {uni.country}</span>
                                </div>
                                {uni.established && (
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <Calendar className="h-4 w-4 text-primary/70 flex-shrink-0" />
                                        <span className="text-muted-foreground">Founded {uni.established}</span>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button className="w-full rounded-lg font-bold h-11 transition-all duration-300" variant="outline" asChild>
                                    <Link href={`/courses/${uni.id}`}>Learn More</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {allUniversities.length === 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-muted-foreground"
                    >
                        <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">No universities available.</p>
                    </motion.div>
                )}

                {filteredUniversities.length === 0 && allUniversities.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-muted-foreground"
                    >
                        <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-semibold">
                            {selectedCountry !== 'All' && !searchQuery
                                ? `0 universities in ${selectedCountry} — universities will be added soon.`
                                : 'No universities found. Try adjusting your filters.'}
                        </p>
                    </motion.div>
                )}

                {displayedUniversities.length < filteredUniversities.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center mt-12"
                    >
                        <Button
                            onClick={handleLoadMore}
                            variant="default"
                            size="lg"
                            className="rounded-full px-8"
                        >
                            Load More Universities
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function UniversitiesPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center py-24">
                    <div className="flex flex-col items-center gap-3">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        <p className="text-muted-foreground">Loading universities...</p>
                    </div>
                </div>
            }
        >
            <UniversitiesPageContent />
        </Suspense>
    );
}
