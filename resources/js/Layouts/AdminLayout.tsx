import React, { useState, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { FaHome, FaBox, FaTags, FaNewspaper, FaEnvelope, FaCog, FaSignOutAlt, FaBars, FaTimes, FaUser, FaTools, FaPaintBrush, FaBriefcase, FaFileAlt, FaUsers, FaShoppingCart, FaGift, FaTachometerAlt } from 'react-icons/fa';

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
    adminNotifications?: {
        unreadOrders?: number;
        unreadMessages?: number;
        newApplications?: number;
        pendingProjects?: number;
    };
    [key: string]: any;
}

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
    user?: User;
    notifications?: {
        unreadOrders?: number;
        unreadMessages?: number;
        newApplications?: number;
        pendingProjects?: number;
    };
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title = 'لوحة التحكم', user, notifications }) => {
    const { auth, user: pageUser, adminNotifications } = usePage<PageProps>().props;
    const currentUser = user || pageUser || auth.user;
    
    // استخدام notifications من props أو من البيانات المشتركة
    const finalNotifications = notifications || adminNotifications;
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const menuItems = [
        { name: 'لوحة التحكم', icon: FaTachometerAlt, href: route('admin.dashboard'), active: route().current('admin.dashboard') },
        { name: 'إدارة الرئيسية', icon: FaHome, href: route('admin.landing-page.index'), active: route().current('admin.landing-page.*') },
        { name: 'المنتجات', icon: FaBox, href: route('admin.products.index'), active: route().current('admin.products.*') },
        { name: 'الطلبات', icon: FaShoppingCart, href: route('admin.orders.index'), active: route().current('admin.orders.*'), badge: finalNotifications?.unreadOrders },
        { name: 'الرسائل', icon: FaEnvelope, href: route('admin.contacts.index'), active: route().current('admin.contacts.*'), badge: finalNotifications?.unreadMessages },
        { name: 'المشاريع', icon: FaPaintBrush, href: route('admin.projects.index'), active: route().current('admin.projects.*'), badge: finalNotifications?.pendingProjects },
        { name: 'التقديمات', icon: FaFileAlt, href: route('admin.applications.index'), active: route().current('admin.applications.*'), badge: finalNotifications?.newApplications },
        { name: 'الفئات', icon: FaTags, href: route('admin.categories.index'), active: route().current('admin.categories.*') },
        { name: 'العروض', icon: FaGift, href: route('admin.offers.index'), active: route().current('admin.offers.*') },
        { name: 'المقالات', icon: FaNewspaper, href: route('admin.articles.index'), active: route().current('admin.articles.*') },
        { name: 'الوظائف', icon: FaBriefcase, href: route('admin.jobs.index'), active: route().current('admin.jobs.*') },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
            <Head title={title} />

            <aside className={`h-screen fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
                }`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 px-3 border-b border-gray-200">
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

                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center justify-between space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${item.active
                                        ? 'bg-primary-yellow text-primary-black shadow-md'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                        <Icon className="w-5 h-5" />
                                        <span>{item.name}</span>
                                    </div>
                                    {item.badge && item.badge > 0 && (
                                        <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                                            {item.badge > 10 ? '10+' : item.badge}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

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
            </aside>

            <div className="flex-1 flex flex-col lg:mr-64">
                <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 w-full">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                title="فتح القائمة"
                            >
                                <FaBars className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
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

                <main className="flex-1 p-4 sm:p-6 overflow-auto max-w-full w-full">
                    <div className="w-full max-w-5xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>

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