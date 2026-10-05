'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { GraduationCap } from 'lucide-react';
import {
    Navbar as ResizableNavbar,
    NavBody,
    NavItems,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavbarButton,
} from '@/components/ui/resizable-navbar';

const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Universities', link: '/courses' },
    { name: 'Success Stories', link: '/success-stories' },
    { name: 'About Us', link: '/about' },
    { name: 'Contact Us', link: '/contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <ResizableNavbar className="fixed top-4 inset-x-0" isHomePage={isHomePage}>
            {/* Desktop Navigation */}
            <NavBody className="justify-between gap-8">
                <Link href="/" className="relative z-50 flex items-center px-2 flex-shrink-0 hover:opacity-80 transition-opacity cursor-pointer" aria-label="Study Abroad Consultancy Home">
                    <Image src="/logo.png" alt="Study Abroad Consultancy" width={128} height={64} className="h-16 w-auto object-contain" priority />
                </Link>

                <NavItems items={navItems} />

                <div className="flex items-center gap-2">
                    <NavbarButton href="/contact" variant="primary" className="hidden lg:block">
                        Apply Now
                    </NavbarButton>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav visible={true} className="mt-2">
                <MobileNavHeader>
                    <Link href="/" className="relative z-50 flex items-center px-2 hover:opacity-80 transition-opacity cursor-pointer" aria-label="Study Abroad Consultancy Home">
                        <Image src="/logo.png" alt="Study Abroad Consultancy" width={96} height={48} className="h-12 w-auto object-contain" priority />
                    </Link>
                    <MobileNavToggle
                        isOpen={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={mobileMenuOpen}
                    onClose={() => setMobileMenuOpen(false)}
                >
                    <div className="flex flex-col gap-4">
                        {navItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.link}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium text-neutral-600 dark:text-neutral-300"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <NavbarButton href="/contact" variant="primary" className="w-full">
                            Apply Now
                        </NavbarButton>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </ResizableNavbar>
    );
}
