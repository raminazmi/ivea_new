import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { HiShoppingCart, HiMenu, HiX } from 'react-icons/hi';
import { FaEnvelope, FaUser, FaPhoneAlt, FaMapMarkerAlt, FaTachometerAlt } from 'react-icons/fa';
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { url } = usePage();
    const auth = usePage().props.auth;
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
    // Function to check if a link is active
    const isActiveLink = (linkHref) => {
        if (linkHref === '/') {
            return url === '/';
        }
        return url.startsWith(linkHref);
    };
    // Function to get active link name
    const getActiveLinkName = () => {
        const activeLink = navLinks.find(link => isActiveLink(link.href));
        return activeLink ? activeLink.name : 'الرئيسية';
    };
    // Check if user is authenticated
    const isAuthenticated = auth?.user;
    const isAdmin = auth?.user?.is_admin;
    return (_jsxs("div", {
        className: "sticky top-0 z-50", children: [_jsx("div", { className: `bg-[#0D1D25] text-white text-xs md:text-sm transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-0 h-0 py-0 overflow-hidden' : 'opacity-100 h-auto py-1'}`, children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center", children: [_jsx("div", { className: "flex items-center gap-3 md:gap-6", children: isAuthenticated ? (_jsxs(Link, { href: isAdmin ? "/admin/dashboard" : "/dashboard", className: "flex items-center text-gray-300 hover:text-white transition whitespace-nowrap", children: [_jsx(FaTachometerAlt, { className: "ml-1 text-xs" }), isAdmin ? 'داشبورد المدير' : 'داشبورد'] })) : (_jsxs(Link, { href: "/login", className: "flex items-center text-gray-300 hover:text-white transition whitespace-nowrap", children: [_jsx(FaUser, { className: "ml-1 text-xs" }), "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644"] })) }), _jsxs("div", { className: "flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-2 md:mb-0", children: [_jsxs("a", { href: "mailto:info@ivea.store", className: "flex items-center text-gray-300 hover:text-white transition whitespace-nowrap text-xs", children: [_jsx("span", { className: "truncate max-w-[160px] sm:max-w-none", children: "\u0627\u0644\u0631\u064A\u0627\u0636 - \u0627\u0644\u0645\u0645\u0644\u0643\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629" }), _jsx(FaMapMarkerAlt, { className: "ms-2 text-xs" })] }), _jsxs("a", { href: "tel:+966500000000", className: "text-xs flex items-center text-gray-300 hover:text-white transition whitespace-nowrap", children: ["+966 50 000 0000", _jsx(FaPhoneAlt, { className: "ms-2 text-xs" })] }), _jsxs("a", { href: "mailto:info@ivea.store", className: "text-xs flex items-center text-gray-300 hover:text-white transition whitespace-nowrap", children: ["evya.store@gmail.com", _jsx(FaEnvelope, { className: "ms-2 text-xs" })] })] })] }) }) }), _jsx("div", {
            className: `sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`, children: _jsxs("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3", children: [_jsxs("div", {
                    className: "flex items-center justify-between", children: [_jsx(Link, { href: "/", className: "flex-shrink-0", children: _jsx("img", { src: "/images/logo.png", alt: "\u0627\u064A\u0641\u064A\u0627", className: "h-8 md:h-10 lg:h-12 object-contain" }) }), _jsx("nav", {
                        className: "bg-[#EFEFEF] py-2 px-2 md:px-2 rounded-full hidden lg:flex items-center", children: navLinks.map((link) => (_jsx(Link, {
                            href: link.href, className: `px-3 py-1.5 mx-1 rounded-full transition font-medium text-sm ${isActiveLink(link.href)
                                ? 'bg-[#0D1D25] text-white'
                                : 'text-gray-600 hover:bg-gray-100'}`, children: link.name
                        }, link.name)))
                    }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Link, { href: "/products", className: "bg-[#0D1D25] text-white hover:bg-opacity-90 transition flex items-center px-4 py-2 md:px-6 rounded-full font-medium text-sm whitespace-nowrap", children: "\u0627\u0628\u062F\u0623 \u0627\u0644\u0622\u0646" }), _jsx(Link, { href: "/cart", className: "bg-[#0D1D25] text-white hover:bg-opacity-90 transition flex items-center p-2 rounded-full font-medium text-sm whitespace-nowrap", children: _jsx(HiShoppingCart, { className: "text-xl" }) }), _jsx("button", { className: "lg:hidden text-gray-600 focus:outline-none p-1.5 md:p-2", onClick: () => setIsMenuOpen(!isMenuOpen), children: isMenuOpen ? _jsx(HiX, { className: "h-5 w-5 md:h-6 md:w-6" }) : _jsx(HiMenu, { className: "h-5 w-5 md:h-6 md:w-6" }) })] })]
                }), isMenuOpen && (_jsx("div", {
                    className: "lg:hidden mt-3 pb-3 animate-fadeIn", children: _jsx("div", {
                        className: "px-2 pt-2 pb-3 space-y-1 sm:px-3", children: navLinks.map((link) => (_jsx(Link, {
                            href: link.href, className: `block px-3 py-2.5 text-sm font-medium rounded-md ${isActiveLink(link.href)
                                ? 'bg-[#0D1D25] text-white'
                                : 'text-gray-600 hover:bg-gray-100'}`, onClick: () => {
                                    setIsMenuOpen(false);
                                }, children: link.name
                        }, link.name)))
                    })
                }))]
            })
        })]
    }));
};
export default Header;
