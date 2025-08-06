import React, { useState, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { FaHome, FaUsers, FaBriefcase, FaEnvelope, FaCog, FaSignOutAlt, FaBars, FaTimes, FaUser, FaTools, FaNewspaper } from 'react-icons/fa';

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

interface PageProps {
    auth: {
        user: User;
    };
    user?: User;
    [key: string]: any;
}

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
    user?: User;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = 'لوحة التحكم', user }) => {
    const { auth, user: pageUser } = usePage<PageProps>().props;
    const currentUser = user || pageUser || auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { name: 'الرئيسية', icon: FaHome, href: '/admin/dashboard', active: route().current('admin.dashboard') },
        { name: 'المنتجات', icon: FaBriefcase, href: '/admin/products', active: route().current('admin.products.*') },
        { name: 'الفئات', icon: FaUsers, href: '/admin/categories', active: route().current('admin.categories.*') },
        { name: 'المقالات', icon: FaNewspaper, href: '/admin/articles', active: route().current('admin.articles.*') },
        { name: 'أدوات وإرشادات', icon: FaTools, href: '/admin/tools', active: route().current('admin.tools.*') },
        { name: 'الوظائف', icon: FaBriefcase, href: '/admin/jobs', active: route().current('admin.jobs.*') },
        { name: 'التقديمات', icon: FaUsers, href: '/admin/applications', active: route().current('admin.applications.*') },
        { name: 'الرسائل', icon: FaEnvelope, href: '/admin/contacts', active: route().current('admin.contacts.*') },
        { name: 'الإعدادات', icon: FaCog, href: '/admin/settings', active: route().current('admin.settings.*') },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Head title={title} />
            
            {/* Sidebar */}
            <div className={`h-screen fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center p-6 border-b border-gray-200">
                        <Link href="/" className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
                            <img 
                                src="/images/logo.png" 
                                alt="إيفيا" 
                                className="h-10 w-auto object-contain" 
                            />
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            title="إغلاق القائمة"
                        >
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                        item.active
                                            ? 'bg-primary-yellow text-primary-black shadow-md'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Info */}
                    <div className="p-4 border-t border-gray-200 bg-white">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center">
                                <FaUser className="w-5 h-5 text-primary-black" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</p>
                                <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                            </div>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="mt-3 w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                            <FaSignOutAlt className="w-4 h-4" />
                            <span>تسجيل الخروج</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:mr-64">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                title="فتح القائمة"
                            >
                                <FaBars className="w-5 h-5" />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        </div>
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <Link 
                                href="/" 
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            >
                                العودة للموقع
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;