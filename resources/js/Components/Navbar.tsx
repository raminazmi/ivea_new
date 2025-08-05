import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { HiMenu, HiX, HiShoppingCart, HiUser } from 'react-icons/hi';

interface NavbarProps {
    cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'الرئيسية', href: '/' },
        { name: 'المنتجات', href: '/products' },
        { name: 'عنا', href: '/about' },
        { name: 'اتصل بنا', href: '/contact' },
    ];

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-14 sm:h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12 sm:w-16 sm:h-16" />
                            <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-bold text-indigo-600">متجرنا</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-indigo-600 px-2 sm:px-3 py-2 rounded-md text-sm font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-3 sm:space-x-4">
                        <Link href="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600">
                            <HiShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/login" className="p-2 text-gray-700 hover:text-indigo-600">
                            <HiUser className="h-5 w-5 sm:h-6 sm:w-6" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
                            title="القائمة"
                        >
                            {isOpen ? <HiX className="h-5 w-5 sm:h-6 sm:w-6" /> : <HiMenu className="h-5 w-5 sm:h-6 sm:w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-sm sm:text-base font-medium"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex justify-center space-x-4 mt-4">
                            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600">
                                <HiShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 sm:px-2 sm:py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link href="/login" className="p-2 text-gray-700 hover:text-indigo-600">
                                <HiUser className="h-5 w-5 sm:h-6 sm:w-6" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;