import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';

interface Employee {
    id: string;
    name: string;
    position: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    image?: string;
}

// Placeholder data - will be replaced with API fetch when backend is ready
const employees: Employee[] = [
    {
        id: '1',
        name: 'Dr. Reza Ahmed',
        position: 'Founder & CEO',
        email: 'reza@studyabroad.com',
        phone: '+880-1234-567890',
        location: 'Dhaka, Bangladesh',
        bio: 'Experienced education consultant with 15+ years in international student placements.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
        id: '2',
        name: 'Fatima Hassan',
        position: 'Senior Consultant',
        email: 'fatima@studyabroad.com',
        phone: '+880-1234-567891',
        location: 'Dhaka, Bangladesh',
        bio: 'Specialist in UK and US university admissions with a track record of 500+ successful placements.',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
        id: '3',
        name: 'Ahmed Khan',
        position: 'Visa & Immigration Expert',
        email: 'ahmed@studyabroad.com',
        phone: '+880-1234-567892',
        location: 'Dhaka, Bangladesh',
        bio: 'Expert in visa applications and immigration processes across multiple countries.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
    {
        id: '4',
        name: 'Sarah Johnson',
        position: 'Student Coordinator',
        email: 'sarah@studyabroad.com',
        phone: '+880-1234-567893',
        location: 'Dhaka, Bangladesh',
        bio: 'Dedicated to providing comprehensive support throughout the entire study abroad journey.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
];

export const metadata: Metadata = {
    title: 'Our Team - Expert Education Consultants',
    description: 'Meet our consultants supporting South Korea applications and preparing services for more destinations coming soon.',
    alternates: {
        canonical: '/employees',
    },
    openGraph: {
        title: 'Our Team | Study Abroad Consultancy',
        description: 'Meet our expert team of education consultants and visa specialists.',
        url: '/employees',
        type: 'website',
    },
};

export default function EmployeesPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#043168]/10 via-white to-[#043168]/5 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 pt-32 pb-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Meet Our Team
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Expert consultants dedicated to helping you achieve your study abroad dreams
                    </p>
                </div>

                {/* Employees Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {employees.map((employee) => (
                        <Card
                            key={employee.id}
                            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-slate-800"
                        >
                            {/* Employee Image */}
                            {employee.image && (
                                <div className="h-64 overflow-hidden bg-gradient-to-br from-[#043168]/20 to-[#043168]/10 dark:from-slate-700 dark:to-slate-600">
                                    <img
                                        src={employee.image}
                                        alt={employee.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Employee Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                                    {employee.name}
                                </h3>
                                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-4">
                                    {employee.position}
                                </p>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                                    {employee.bio}
                                </p>

                                {/* Contact Info */}
                                <div className="space-y-3 border-t border-gray-200 dark:border-slate-700 pt-4">
                                    <a
                                        href={`mailto:${employee.email}`}
                                        className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        <Mail size={16} />
                                        <span className="truncate">{employee.email}</span>
                                    </a>

                                    <a
                                        href={`tel:${employee.phone}`}
                                        className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                        <Phone size={16} />
                                        <span>{employee.phone}</span>
                                    </a>

                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                                        <MapPin size={16} />
                                        <span>{employee.location}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Future CTA Section */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Have questions? Get in touch with our team
                    </p>
                    <a
                        href="/contact"
                        className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
}
