// src/Components/Footer.tsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary-black text-white py-8 md:py-12 md:px-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
                    {/* Logo and Description */}
                    <div className="space-y-3 md:space-y-4">
                        <img
                            src="/images/logo_white.png"
                            alt="ايفيا"
                            className="h-10 md:h-12 w-auto"
                        />
                        <p className="text-gray-300 text-sm leading-relaxed">
                            خبراؤنا يمكنهم تقديم رؤى قيمة ومساعدتك في تحديد العقارات.
                        </p>
                        <div className="flex gap-3 md:gap-4 space-x-reverse">
                            <a href="#" className="text-white hover:text-yellow-400 transition">
                                <FaInstagram className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                            <a href="#" className="text-white hover:text-yellow-400 transition">
                                <FaFacebookF className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                            <a href="#" className="text-white hover:text-yellow-400 transition">
                                <FaYoutube className="w-4 h-4 md:w-5 md:h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Main Links */}
                    <div>
                        <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">الرئيسية</h3>
                        <ul className="space-y-2 md:space-y-3">
                            <li><Link href="#" className="text-gray-300 hover:text-yellow-400 transition text-sm">تعرف علينا</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-yellow-400 transition text-sm">خدماتنا</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-yellow-400 transition text-sm">المدونة</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">تواصل معنا</h3>
                        <div className="space-y-2 md:space-y-3 text-gray-300 text-sm">
                            <p>info@thabethejazi.com</p>
                            <p>+966 66666666</p>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">النشرة البردية</h3>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="البريد الإلكتروني"
                                className="w-full bg-transparent border border-white rounded-full py-2.5 md:py-3 px-4 ps-[80px] md:ps-[90px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                            />
                            <button className="absolute right-2.5 md:right-3 top-2.5 md:top-3 bg-yellow-500 hover:bg-yellow-600 text-white px-2.5 md:px-3 rounded-full transition-colors text-sm">
                                اشتراك
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700 pt-4 md:pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-400 text-xs md:text-sm mb-3 md:mb-0">
                            <Link href="#" className="hover:text-yellow-400 transition">
                                الشروط والأحكام
                            </Link>
                        </div>
                        <div className="text-gray-400 text-xs md:text-sm">
                            2025 ايفيا. جميع الحقوق محفوظة.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;