import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { HiShoppingCart, HiMenu, HiX } from 'react-icons/hi';
import { FaEnvelope, FaUser, FaPhoneAlt, FaMapMarkerAlt, FaGlobe, FaTachometerAlt } from 'react-icons/fa';
import HeaderCartIcon from '@/Components/HeaderCartIcon';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { url } = usePage();
    const auth = (usePage() as any).props.auth;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { name: 'الرئيسية', href: '/' },
        { name: 'المنتجات', href: '/products' },
        { name: 'قسم المشاريع', href: '/projects' },
        { name: 'من نحن', href: '/about' },
        { name: 'التوظيف', href: '/jobs' },
        { name: 'أدوات وإرشادات', href: '/tools-and-guidelines' },
    ];

    const isActiveLink = (linkHref: string) => {
        if (linkHref === '/') {
            return url === '/';
        }
        return url.startsWith(linkHref);
    };

    const getActiveLinkName = () => {
        const activeLink = navLinks.find(link => isActiveLink(link.href));
        return activeLink ? activeLink.name : 'الرئيسية';
    };

    const isAuthenticated = auth?.user;
    const isAdmin = auth?.user?.is_admin;

    return (
        <div className="sticky top-0 z-50">
            <div
                className={`bg-[#0D1D25] text-white text-xs md:text-sm transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100 h-auto py-1'}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center gap-3 md:gap-6">
                            {isAuthenticated ? (
                                <Link
                                    href={isAdmin ? "/admin/dashboard" : "/dashboard"}
                                    className="flex items-center text-gray-300 hover:text-white transition whitespace-nowrap"
                                >
                                    <FaTachometerAlt className="ml-1 text-xs" />
                                    {isAdmin ? 'داشبورد' : 'داشبورد'}
                                </Link>
                            ) : (
                                <Link href="/login" className="flex items-center text-gray-300 hover:text-white transition whitespace-nowrap">
                                    <FaUser className="ml-1 text-xs" />
                                    تسجيل الدخول
                                </Link>
                            )}
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-2 md:mb-0">
                            <a href="mailto:info@ivea.store" className="flex items-center text-gray-300 hover:text-white transition whitespace-nowrap text-xs">
                                <span className="truncate max-w-[160px] sm:max-w-none">الرياض - المملكة العربية السعودية</span>
                                <FaMapMarkerAlt className="ms-2 text-xs" />
                            </a>
                            <a href="tel:+966500000000" className="text-xs flex items-center text-gray-300 hover:text-white transition whitespace-nowrap">
                                +966 50 000 0000
                                <FaPhoneAlt className="ms-2 text-xs" />
                            </a>
                            <a href="mailto:info@ivea.store" className="text-xs flex items-center text-gray-300 hover:text-white transition whitespace-nowrap">
                                evya.store@gmail.com
                                <FaEnvelope className="ms-2 text-xs" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
                <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-24 py-3">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex-shrink-0">
                            <img
                                src="/images/logo.png"
                                alt="ايفيا"
                                className="h-8 md:h-10 lg:h-10 object-contain"
                            />
                        </Link>

                        <nav className="bg-[#EFEFEF] py-1.5 px-2 md:px-1.5 rounded-full hidden lg:flex items-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-3 py-1.5 mx-1 rounded-full transition font-medium text-sm ${isActiveLink(link.href)
                                        ? 'bg-[#0D1D25] text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <Link
                                href="/products"
                                className="bg-[#0D1D25] text-white hover:bg-opacity-90 transition flex items-center px-4 py-2 md:px-6 rounded-full font-medium text-sm whitespace-nowrap"
                            >
                                ابدأ الآن
                            </Link>
                            <HeaderCartIcon />

                            <button
                                className="lg:hidden text-gray-600 focus:outline-none p-1.5 md:p-2"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <HiX className="h-5 w-5 md:h-6 md:w-6" /> : <HiMenu className="h-5 w-5 md:h-6 md:w-6" />}
                            </button>
                        </div>
                    </div>

                    {isMenuOpen && (
                        <div className="lg:hidden mt-3 pb-3 animate-fadeIn">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`block px-3 py-2.5 text-sm font-medium rounded-md ${isActiveLink(link.href)
                                            ? 'bg-[#0D1D25] text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;