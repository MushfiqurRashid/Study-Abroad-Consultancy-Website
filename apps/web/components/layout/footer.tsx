import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail, Youtube } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#043168] dark:bg-[#022147] border-t border-[#043168]">
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="inline-block" aria-label="Study Abroad Consultancy Home">
                            <Image src="/logo.png" alt="Study Abroad Consultancy" width={160} height={80} className="h-20 w-auto object-contain" />
                        </Link>
                        <p className="text-white/80 text-sm">
                            Empowering students to achieve their dreams of studying abroad with expert guidance and support.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://www.facebook.com/studyabroadconsultantc/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Follow us on Facebook">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="https://www.youtube.com/@studycbroadconsultancy" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Subscribe on YouTube">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses" className="text-white/70 hover:text-white transition-colors">
                                    Universities
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/success-stories" className="text-white/70 hover:text-white transition-colors">
                                    Success Stories
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Useful links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy-policy" className="text-white/70 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/refund-policy" className="text-white/70 hover:text-white transition-colors">
                                    Refund and Return Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Contact Info</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 mr-2 text-white shrink-0" />
                                <span className="text-white/80">
                                    Moghbazar, Razzaq Plaza, Lif- 09, 10Th - Floor, Suite No-10/F, Dhaka-1217
                                </span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 mr-2 text-white shrink-0" />
                                <span className="text-white/80">01306890908</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 mr-2 text-white shrink-0" />
                                <span className="text-white/80">studyabroad129@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/70">
                    <p>&copy; {new Date().getFullYear()} Study Abroad Consultancy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
