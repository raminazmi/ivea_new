import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { HiUsers, HiShoppingBag, HiDocumentText, HiBriefcase, HiStar, HiTag, HiFire, HiClock, HiPlus, HiEye, HiHome } from 'react-icons/hi';

interface DashboardProps {
    stats: {
        totalProducts: number;
        totalCategories: number;
        totalArticles: number;
        totalJobs: number;
        totalApplications: number;
        totalOrders: number;
        totalContacts: number;
    };
    notifications?: {
        unreadOrders?: number;
        unreadMessages?: number;
    };
}

const Dashboard: React.FC<DashboardProps> = ({ stats, notifications }) => {
    const [tabStats, setTabStats] = useState<any>(null);

    useEffect(() => {
        fetchTabStats();
    }, []);

    const fetchTabStats = async () => {
        try {
            const response = await fetch('/admin/products/tab-statistics', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                    'Accept': 'application/json',
                },
                credentials: 'same-origin'
            });
            if (response.ok) {
                const stats = await response.json();
                setTabStats(stats);
            }
        } catch (error) {
        }
    };

    return (
        <AdminLayout notifications={notifications}>
            <Head title="لوحة التحكم" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 bg-white border-b border-gray-200">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">لوحة التحكم</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                                        <div className="mr-3 sm:mr-4">
                                            <p className="text-xs sm:text-sm font-medium text-blue-600">المنتجات</p>
                                            <p className="text-lg sm:text-2xl font-bold text-blue-900">{stats.totalProducts}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiUsers className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                                        <div className="mr-3 sm:mr-4">
                                            <p className="text-xs sm:text-sm font-medium text-green-600">الفئات</p>
                                            <p className="text-lg sm:text-2xl font-bold text-green-900">{stats.totalCategories}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiDocumentText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                                        <div className="mr-3 sm:mr-4">
                                            <p className="text-xs sm:text-sm font-medium text-purple-600">المقالات</p>
                                            <p className="text-lg sm:text-2xl font-bold text-purple-900">{stats.totalArticles}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-orange-50 p-4 sm:p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiBriefcase className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
                                        <div className="mr-3 sm:mr-4">
                                            <p className="text-xs sm:text-sm font-medium text-orange-600">الوظائف</p>
                                            <p className="text-lg sm:text-2xl font-bold text-orange-900">{stats.totalJobs}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-red-50 p-4 sm:p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiUsers className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                                        <div className="mr-3 sm:mr-4">
                                            <p className="text-xs sm:text-sm font-medium text-red-600">التقديمات</p>
                                            <p className="text-lg sm:text-2xl font-bold text-red-900">{stats.totalApplications}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                                        <div className="mr-3 sm:mr-4">
                                            <p className="text-xs sm:text-sm font-medium text-purple-600">الطلبات</p>
                                            <p className="text-lg sm:text-2xl font-bold text-purple-900">{stats.totalOrders}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-indigo-50 p-4 sm:p-6 rounded-lg">
                                    <div className="flex items-center">
                                        <HiDocumentText className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
                                        <div className="mr-3 sm:mr-4">
                                            <p className="text-xs sm:text-sm font-medium text-indigo-600">الرسائل</p>
                                            <p className="text-lg sm:text-2xl font-bold text-indigo-900">{stats.totalContacts}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {tabStats && (
                                <div className="mb-8">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">إحصائيات التبويبات</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <HiStar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                                <span className="font-semibold text-blue-900 text-sm">المميزة</span>
                                            </div>
                                            <p className="text-lg sm:text-xl font-bold text-blue-900">{tabStats.featured}</p>
                                        </div>
                                        <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <HiClock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                                <span className="font-semibold text-green-900 text-sm">الجديدة</span>
                                            </div>
                                            <p className="text-lg sm:text-xl font-bold text-green-900">{tabStats.new}</p>
                                        </div>
                                        <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <HiTag className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                                                <span className="font-semibold text-orange-900 text-sm">العروض</span>
                                            </div>
                                            <p className="text-lg sm:text-xl font-bold text-orange-900">{tabStats.offers}</p>
                                        </div>
                                        <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <HiFire className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                                                <span className="font-semibold text-red-900 text-sm">الأكثر مبيعاً</span>
                                            </div>
                                            <p className="text-lg sm:text-xl font-bold text-red-900">{tabStats.bestsellers}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <Link
                                    href={route('admin.products.create')}
                                    className="bg-primary-yellow text-white p-4 rounded-lg hover:bg-yellow-600 transition-colors text-center flex flex-col items-center gap-2"
                                >
                                    <HiShoppingBag className="w-6 h-6" />
                                    <span className="font-medium text-sm sm:text-base">إضافة منتج جديد</span>
                                </Link>

                                <Link
                                    href={route('admin.categories.create')}
                                    className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors text-center flex flex-col items-center gap-2"
                                >
                                    <HiUsers className="w-6 h-6" />
                                    <span className="font-medium text-sm sm:text-base">إضافة فئة جديدة</span>
                                </Link>

                                <Link
                                    href={route('admin.articles.create')}
                                    className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors text-center flex flex-col items-center gap-2"
                                >
                                    <HiDocumentText className="w-6 h-6" />
                                    <span className="font-medium text-sm sm:text-base">إضافة مقال جديد</span>
                                </Link>

                                <Link
                                    href={route('admin.products.index')}
                                    className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors text-center flex flex-col items-center gap-2"
                                >
                                    <HiEye className="w-6 h-6" />
                                    <span className="font-medium text-sm sm:text-base">عرض المنتجات</span>
                                </Link>

                                <Link
                                    href={route('admin.landing-page.index')}
                                    className="bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600 transition-colors text-center flex flex-col items-center gap-2"
                                >
                                    <HiHome className="w-6 h-6" />
                                    <span className="font-medium text-sm sm:text-base">إدارة الصفحة الرئيسية</span>
                                </Link>

                                <Link
                                    href={route('admin.applications.index')}
                                    className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-colors text-center flex flex-col items-center gap-2"
                                >
                                    <HiBriefcase className="w-6 h-6" />
                                    <span className="font-medium text-sm sm:text-base">مراجعة التقديمات</span>
                                </Link>

                                <Link
                                    href={route('admin.contacts.index')}
                                    className="bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600 transition-colors text-center flex flex-col items-center gap-2"
                                >
                                    <HiDocumentText className="w-6 h-6" />
                                    <span className="font-medium text-sm sm:text-base">عرض الرسائل</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard; 